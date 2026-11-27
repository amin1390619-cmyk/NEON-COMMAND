package com.neoncommand.app

import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.net.wifi.WifiManager
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.webkit.JavascriptInterface
import android.webkit.WebView
import org.json.JSONArray
import org.json.JSONObject
import java.io.BufferedReader
import java.io.IOException
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import java.io.Writer
import java.net.DatagramPacket
import java.net.DatagramSocket
import java.net.Inet4Address
import java.net.InetAddress
import java.net.InetSocketAddress
import java.net.NetworkInterface
import java.net.ServerSocket
import java.net.Socket
import java.net.SocketAddress
import java.util.Collections
import java.util.concurrent.Executors
import java.util.concurrent.ScheduledFuture
import java.util.concurrent.TimeUnit
import kotlin.concurrent.thread

/**
 * پل اتصال محلی (Wi-Fi / هات‌اسپات) بین دو گوشی، بدون اینترنت و بدون سرور.
 * در صفحه: window.NeonLan  (host / join / send / close / scan / stopScan)
 * نتیجه‌ها با window.NeonLanCB.onEvent({k: ...}) به بازی برمی‌گردند:
 *   ready{ip,port} | open | msg{d} | close{why} | error{m} | found{name,ip,port}
 *
 * پروتکل: هر پیام یک خط JSON است. یک خط خالی ضربان (heartbeat) است.
 * پیدا شدن اتاق: میزبان هر ثانیه یک بستهٔ UDP broadcast می‌فرستد (روی هات‌اسپات هم کار می‌کند).
 */
class NeonLan(
    ctx: Context,
    private val webView: () -> WebView,
    private val isTrusted: () -> Boolean
) {
    private val app = ctx.applicationContext
    private val main = Handler(Looper.getMainLooper())
    private val lock = Any()

    @Volatile private var released = false
    @Volatile private var session = 0       // با هر close/host/join عوض می‌شود؛ رویدادهای قدیمی نادیده گرفته می‌شوند
    @Volatile private var scanSession = 0

    private var server: ServerSocket? = null
    private var sock: Socket? = null
    @Volatile private var out: Writer? = null
    private var udpTx: DatagramSocket? = null
    private var udpRx: DatagramSocket? = null
    private var mcLock: WifiManager.MulticastLock? = null
    private var beat: ScheduledFuture<*>? = null

    // نوشتن روی سوکت و ضربان، همیشه روی یک ترد (ترتیب پیام‌ها حفظ می‌شود)
    private val io = Executors.newSingleThreadScheduledExecutor()

    // ------------------------------------------------------------------
    // API برای جاوااسکریپت
    // ------------------------------------------------------------------

    @JavascriptInterface
    fun host() {
        main.post { if (!released && isTrusted()) startHost() }
    }

    @JavascriptInterface
    fun join(addr: String) {
        main.post { if (!released && isTrusted()) startJoin(addr) }
    }

    @JavascriptInterface
    fun send(line: String) {
        val w = out ?: return
        if (line.length > MAX_LINE) return
        val my = session
        val clean = line.replace('\n', ' ').replace('\r', ' ')
        try {
            io.execute { writeLine(my, w, clean) }
        } catch (e: Exception) {
            // executor بسته شده
        }
    }

    @JavascriptInterface
    fun close() {
        closeAll()
    }

    @JavascriptInterface
    fun scan() {
        main.post { if (!released && isTrusted()) startScan() }
    }

    @JavascriptInterface
    fun stopScan() {
        stopScanInternal()
    }

    /** برای عیب‌یابی: اینترفیس‌های شبکه و وضعیت VPN (JSON). */
    @JavascriptInterface
    fun info(): String {
        val arr = JSONArray()
        try {
            for (ni in Collections.list(NetworkInterface.getNetworkInterfaces())) {
                try {
                    if (ni.isLoopback) continue
                    val ips = JSONArray()
                    for (ia in ni.interfaceAddresses) {
                        val a = ia.address
                        if (a is Inet4Address) ips.put(a.hostAddress)
                    }
                    if (ips.length() == 0) continue
                    val n = ni.name.lowercase()
                    arr.put(
                        JSONObject()
                            .put("n", ni.name)
                            .put("a", ips)
                            .put("up", ni.isUp)
                            .put("skip", BAD_IF.any { n.startsWith(it) })
                    )
                } catch (_: Exception) {}
            }
        } catch (_: Exception) {}
        return JSONObject().put("ifs", arr).put("vpn", isVpnActive()).toString()
    }

    /** از onDestroy صدا زده شود. */
    fun release() {
        released = true
        stopScanInternal()
        closeAll()
        io.shutdownNow()
    }

    // ------------------------------------------------------------------
    // ارسال رویداد به صفحه (فقط صفحهٔ مطمئن)
    // ------------------------------------------------------------------

    private fun emit(o: JSONObject) {
        main.post {
            if (released || !isTrusted()) return@post
            val quoted = JSONObject.quote(o.toString())
            webView().evaluateJavascript(
                "(function(){try{var a=window.NeonLanCB;if(a&&a.onEvent){a.onEvent(JSON.parse($quoted));}}catch(e){}})();",
                null
            )
        }
    }

    private fun emit(my: Int, o: JSONObject) {
        if (my == session) emit(o)
    }

    private fun emitScan(my: Int, o: JSONObject) {
        if (my == scanSession) emit(o)
    }

    private fun err(code: String) = JSONObject().put("k", "error").put("m", code)

    // ------------------------------------------------------------------
    // میزبان
    // ------------------------------------------------------------------

    private fun startHost() {
        val my = newSession()
        thread(name = "nc-lan-host") {
            try {
                val addrs = localAddrs()
                if (addrs.isEmpty()) {
                    emit(my, err("no_network"))
                    return@thread
                }

                val ss = try {
                    ServerSocket().apply {
                        reuseAddress = true
                        bind(InetSocketAddress(PORT))
                    }
                } catch (e: IOException) {
                    ServerSocket(0)
                }

                synchronized(lock) {
                    if (my != session) {
                        ss.close()
                        return@thread
                    }
                    server = ss
                }

                emit(my, JSONObject().put("k", "ready").put("ip", addrs[0].ip).put("port", ss.localPort))
                startBroadcast(my, ss.localPort, addrs)

                val c = ss.accept()           // فقط یک بازیکن دوم
                try { ss.close() } catch (_: Exception) {}
                stopBroadcast()
                attach(my, c)
            } catch (e: Exception) {
                // اگر نشست عوض شده باشد (close شده)، emit چیزی نمی‌فرستد
                emit(my, err("io"))
            }
        }
    }

    private fun startBroadcast(my: Int, port: Int, addrs: List<LocalAddr>) {
        val targets = LinkedHashSet<InetAddress>()
        addrs.forEach { a -> a.bcast?.let { targets.add(it) } }
        try { targets.add(InetAddress.getByName("255.255.255.255")) } catch (_: Exception) {}

        val payload = "$DISC_MAGIC|${deviceName()}|$port".toByteArray(Charsets.UTF_8)
        val tx = try {
            DatagramSocket().apply { setBroadcast(true) }
        } catch (e: Exception) {
            return
        }
        synchronized(lock) {
            if (my != session) {
                tx.close()
                return
            }
            udpTx = tx
        }
        thread(name = "nc-lan-bc") {
            while (my == session && !tx.isClosed) {
                for (t in targets) {
                    try {
                        tx.send(DatagramPacket(payload, payload.size, t, DISC_PORT))
                    } catch (_: Exception) {}
                }
                try { Thread.sleep(1000) } catch (_: InterruptedException) { break }
            }
        }
    }

    private fun stopBroadcast() {
        synchronized(lock) {
            try { udpTx?.close() } catch (_: Exception) {}
            udpTx = null
        }
    }

    // ------------------------------------------------------------------
    // مهمان
    // ------------------------------------------------------------------

    private fun startJoin(addr: String) {
        val my = newSession()
        val target = parseAddr(addr)
        if (target == null) {
            emit(my, err("bad_addr"))
            return
        }
        thread(name = "nc-lan-join") {
            try {
                val c = Socket()
                synchronized(lock) {
                    if (my != session) {
                        c.close()
                        return@thread
                    }
                    sock = c            // تا close() بتواند connect را قطع کند
                }
                bindToWifi(c)
                c.connect(target, CONNECT_TIMEOUT_MS)
                attach(my, c)
            } catch (e: Exception) {
                if (my == session) {
                    emit(my, err("connect_failed"))
                    closeAll()
                }
            }
        }
    }

    /** فقط آی‌پی خصوصی (شبکهٔ محلی)؛ "ip" یا "ip:port". */
    private fun parseAddr(raw: String): InetSocketAddress? {
        val m = Regex("^(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})\\.(\\d{1,3})(?::(\\d{1,5}))?$").find(raw.trim())
            ?: return null
        val bytes = ByteArray(4)
        for (i in 0..3) {
            val v = m.groupValues[i + 1].toInt()
            if (v !in 0..255) return null
            bytes[i] = v.toByte()
        }
        val port = m.groupValues[5].ifEmpty { PORT.toString() }.toInt()
        if (port !in 1024..65535) return null
        val ip = InetAddress.getByAddress(bytes)        // بدون DNS
        if (!(ip.isSiteLocalAddress || ip.isLinkLocalAddress)) return null
        return InetSocketAddress(ip, port)
    }

    // ------------------------------------------------------------------
    // اتصال برقرار شد (برای هر دو طرف)
    // ------------------------------------------------------------------

    private fun attach(my: Int, c: Socket) {
        val reader = setupStreams(my, c)
        if (reader == null) {
            try { c.close() } catch (_: Exception) {}
            if (my == session) {
                emit(my, err("io"))
                closeAll()
            }
            return
        }

        emit(my, JSONObject().put("k", "open"))

        val sb = StringBuilder()
        try {
            while (my == session) {
                val ch = reader.read()
                if (ch < 0) break
                if (ch == '\n'.code) {
                    if (sb.isNotEmpty()) {
                        emit(my, JSONObject().put("k", "msg").put("d", sb.toString()))
                        sb.setLength(0)
                    }
                } else if (ch != '\r'.code) {
                    if (sb.length >= MAX_LINE) throw IOException("line too long")
                    sb.append(ch.toChar())
                }
            }
        } catch (e: Exception) {
            // قطع شدن یا timeout
        }
        dropped(my, "closed")
    }

    /** سوکت را آماده می‌کند؛ اگر نشست عوض شده یا خطایی باشد null برمی‌گرداند. */
    private fun setupStreams(my: Int, c: Socket): BufferedReader? {
        return try {
            c.tcpNoDelay = true
            c.keepAlive = true
            c.soTimeout = READ_TIMEOUT_MS
            val w = OutputStreamWriter(c.getOutputStream(), Charsets.UTF_8)
            val r = BufferedReader(InputStreamReader(c.getInputStream(), Charsets.UTF_8), 8192)
            synchronized(lock) {
                if (my != session) return null
                sock = c
                out = w
                beat = try {
                    io.scheduleWithFixedDelay({ writeLine(my, w, "") }, 3, 3, TimeUnit.SECONDS)
                } catch (e: Exception) {
                    null
                }
            }
            r
        } catch (e: Exception) {
            null
        }
    }

    private fun writeLine(my: Int, w: Writer, line: String) {
        try {
            w.write(line)
            w.write("\n")
            w.flush()
        } catch (e: Exception) {
            dropped(my, "io")
        }
    }

    private fun dropped(my: Int, why: String) {
        if (my != session) return
        emit(my, JSONObject().put("k", "close").put("why", why))
        closeAll()
    }

    // ------------------------------------------------------------------
    // جستجوی اتاق‌ها
    // ------------------------------------------------------------------

    private fun startScan() {
        stopScanInternal()
        val my = scanSession

        try {
            val wm = app.getSystemService(Context.WIFI_SERVICE) as? WifiManager
            val l = wm?.createMulticastLock("neoncmd")
            l?.setReferenceCounted(false)
            l?.acquire()
            synchronized(lock) { mcLock = l }
        } catch (_: Exception) {}

        thread(name = "nc-lan-scan") {
            val rx = try {
                DatagramSocket(null as SocketAddress?).apply {
                    reuseAddress = true
                    bind(InetSocketAddress(DISC_PORT))
                }
            } catch (e: Exception) {
                emitScan(my, err("scan_failed"))
                return@thread
            }
            synchronized(lock) {
                if (my != scanSession) {
                    rx.close()
                    return@thread
                }
                udpRx = rx
            }
            val buf = ByteArray(256)
            try {
                while (my == scanSession) {
                    val p = DatagramPacket(buf, buf.size)
                    rx.receive(p)                 // با stopScan بسته می‌شود و می‌شکند
                    val src = p.address ?: continue
                    if (src !is Inet4Address || !src.isSiteLocalAddress) continue
                    val parts = String(p.data, 0, p.length, Charsets.UTF_8).split("|")
                    if (parts.size != 3 || parts[0] != DISC_MAGIC) continue
                    val port = parts[2].toIntOrNull() ?: continue
                    if (port !in 1024..65535) continue
                    emitScan(
                        my,
                        JSONObject()
                            .put("k", "found")
                            .put("name", parts[1].take(24))
                            .put("ip", src.hostAddress)
                            .put("port", port)
                    )
                }
            } catch (e: Exception) {
                // سوکت بسته شد
            } finally {
                try { rx.close() } catch (_: Exception) {}
            }
        }
    }

    private fun stopScanInternal() {
        synchronized(lock) {
            scanSession++
            try { udpRx?.close() } catch (_: Exception) {}
            udpRx = null
            try { mcLock?.release() } catch (_: Exception) {}
            mcLock = null
        }
    }

    // ------------------------------------------------------------------
    // ابزارها
    // ------------------------------------------------------------------

    private fun newSession(): Int {
        closeAll()
        return session
    }

    private fun closeAll() {
        synchronized(lock) {
            session++
            try { server?.close() } catch (_: Exception) {}
            try { sock?.close() } catch (_: Exception) {}
            try { udpTx?.close() } catch (_: Exception) {}
            server = null
            sock = null
            out = null
            udpTx = null
            beat?.cancel(false)
            beat = null
        }
    }

    private class LocalAddr(val ip: String, val bcast: InetAddress?)

    /** آی‌پی‌های IPv4 خصوصی روی Wi-Fi / هات‌اسپات؛ اینترفیس‌های دیتای موبایل و VPN حذف می‌شوند. */
    private fun localAddrs(): List<LocalAddr> {
        val preferred = ArrayList<LocalAddr>()
        val others = ArrayList<LocalAddr>()
        val ifaces = try {
            Collections.list(NetworkInterface.getNetworkInterfaces())
        } catch (e: Exception) {
            return emptyList()
        }
        for (ni in ifaces) {
            try {
                if (!ni.isUp || ni.isLoopback) continue
                val n = ni.name.lowercase()
                if (BAD_IF.any { n.startsWith(it) }) continue
                for (ia in ni.interfaceAddresses) {
                    val a = ia.address
                    if (a !is Inet4Address || !a.isSiteLocalAddress) continue
                    val ip = a.hostAddress ?: continue
                    val item = LocalAddr(ip, ia.broadcast ?: directedBroadcast(a, ia.networkPrefixLength.toInt()))
                    if (GOOD_IF.any { n.startsWith(it) }) preferred.add(item) else others.add(item)
                }
            } catch (_: Exception) {}
        }
        return preferred + others
    }

    @Suppress("DEPRECATION")
    private fun isVpnActive(): Boolean = try {
        val cm = app.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        cm.allNetworks.any {
            cm.getNetworkCapabilities(it)?.hasTransport(NetworkCapabilities.TRANSPORT_VPN) == true
        }
    } catch (e: Exception) {
        false
    }

    /** مهمان: سوکت را به شبکهٔ Wi-Fi واقعی می‌بندد تا VPN یا دیتای موبایل مسیرش را عوض نکند. */
    @Suppress("DEPRECATION")
    private fun bindToWifi(c: Socket) {
        try {
            val cm = app.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
            for (n in cm.allNetworks) {
                val caps = cm.getNetworkCapabilities(n) ?: continue
                if (caps.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) &&
                    !caps.hasTransport(NetworkCapabilities.TRANSPORT_VPN)
                ) {
                    n.bindSocket(c)
                    return
                }
            }
        } catch (_: Exception) {}
    }

    /** آدرس broadcast شبکه را از آی‌پی و طول پیشوند می‌سازد (وقتی سیستم نمی‌دهد). */
    private fun directedBroadcast(a: Inet4Address, prefix: Int): InetAddress? {
        if (prefix !in 1..30) return null
        val b = a.address
        val ip = ((b[0].toInt() and 255) shl 24) or ((b[1].toInt() and 255) shl 16) or
            ((b[2].toInt() and 255) shl 8) or (b[3].toInt() and 255)
        val bc = ip or (-1 shl (32 - prefix)).inv()
        return InetAddress.getByAddress(
            byteArrayOf((bc ushr 24).toByte(), (bc ushr 16).toByte(), (bc ushr 8).toByte(), bc.toByte())
        )
    }

    private fun deviceName(): String {
        val n = (Build.MODEL ?: "").filter { it.isLetterOrDigit() || it == ' ' || it == '-' }.trim().take(20)
        return if (n.isEmpty()) "Player" else n
    }

    private companion object {
        const val PORT = 7777
        const val DISC_PORT = 7778
        const val DISC_MAGIC = "NEONCMD1"
        const val MAX_LINE = 256 * 1024
        const val CONNECT_TIMEOUT_MS = 5000
        const val READ_TIMEOUT_MS = 10000      // ضربان هر ۳ ثانیه؛ ۱۰ ثانیه سکوت = قطع
        val BAD_IF = listOf("rmnet", "ccmni", "pdp", "v4-", "dummy", "tun", "ppp", "clat")
        val GOOD_IF = listOf("wlan", "swlan", "softap", "ap", "eth", "p2p")
    }
}
