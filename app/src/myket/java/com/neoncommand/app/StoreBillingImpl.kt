package com.neoncommand.app

import android.app.Activity
import android.app.PendingIntent
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.ServiceConnection
import android.os.Bundle
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import android.util.Base64
import androidx.activity.ComponentActivity
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.IntentSenderRequest
import androidx.activity.result.contract.ActivityResultContracts
import com.android.vending.billing.IInAppBillingService
import org.json.JSONObject
import java.security.KeyFactory
import java.security.Signature
import java.security.spec.X509EncodedKeySpec
import java.util.concurrent.Executors

/**
 * نسخهٔ مایکت: ارتباط مستقیم با سرویس پرداخت مایکت (پروتکل IAB v3).
 * امضای هر خرید با کلید عمومی RSA مایکت بررسی می‌شود.
 */
@Suppress("DEPRECATION")
class StoreBillingImpl(private val activity: ComponentActivity) : StoreBilling {

    private val main = Handler(Looper.getMainLooper())
    private val io = Executors.newSingleThreadExecutor()

    private var service: IInAppBillingService? = null
    private var connecting = false
    private var bound = false
    private val waiting = mutableListOf<(Boolean) -> Unit>()

    private val conn = object : ServiceConnection {
        override fun onServiceConnected(name: ComponentName?, binder: IBinder?) {
            val s = IInAppBillingService.Stub.asInterface(binder)
            io.execute {
                val ok = try {
                    s.isBillingSupported(3, activity.packageName, "inapp") == 0
                } catch (e: Exception) {
                    false
                }
                main.post {
                    connecting = false
                    service = if (ok) s else null
                    flush(ok)
                }
            }
        }

        override fun onServiceDisconnected(name: ComponentName?) {
            service = null
        }
    }

    private fun flush(ok: Boolean) {
        val list = waiting.toList()
        waiting.clear()
        list.forEach { it(ok) }
    }

    private fun ensureConnected(cb: (Boolean) -> Unit) {
        if (service != null) {
            cb(true)
            return
        }
        waiting += cb
        if (connecting) return
        connecting = true

        if (bound) {
            try {
                activity.unbindService(conn)
            } catch (e: Exception) {
            }
            bound = false
        }

        val intent = Intent("ir.mservices.market.InAppBillingService.BIND")
            .setPackage("ir.mservices.market")
        val started = try {
            activity.bindService(intent, conn, Context.BIND_AUTO_CREATE)
        } catch (e: Exception) {
            false
        }
        if (started) {
            bound = true
        } else {
            connecting = false
            flush(false)
        }
    }

    private fun code(o: Any?): Int = when (o) {
        is Int -> o
        is Long -> o.toInt()
        else -> 0
    }

    private fun verify(data: String, signature: String): Boolean = try {
        val key = KeyFactory.getInstance("RSA")
            .generatePublic(X509EncodedKeySpec(Base64.decode(RSA_PUBLIC_KEY, Base64.DEFAULT)))
        val sig = Signature.getInstance("SHA1withRSA")
        sig.initVerify(key)
        sig.update(data.toByteArray())
        sig.verify(Base64.decode(signature, Base64.DEFAULT))
    } catch (e: Exception) {
        false
    }

    /** شناسهٔ محصول اگر امضا درست و خرید معتبر باشد، وگرنه null. */
    private fun verifiedSku(data: String?, sig: String?): String? {
        if (data.isNullOrEmpty() || sig.isNullOrEmpty()) return null
        if (!verify(data, sig)) return null
        return try {
            val o = JSONObject(data)
            if (o.optInt("purchaseState", 0) != 0) null
            else o.optString("productId").takeIf { it.isNotEmpty() }
        } catch (e: Exception) {
            null
        }
    }

    /** شناسهٔ مایکت را به شناسهٔ مورد استفادهٔ بازی برمی‌گرداند. */
    private fun logicalId(storeId: String): String = FROM_STORE[storeId] ?: storeId

    private fun fetchOwned(s: IInAppBillingService): Set<String>? {
        val owned = HashSet<String>()
        var token: String? = null
        var guard = 0
        do {
            val b = s.getPurchases(3, activity.packageName, "inapp", token) ?: return null
            if (code(b.get("RESPONSE_CODE")) != 0) return null
            val datas = b.getStringArrayList("INAPP_PURCHASE_DATA_LIST") ?: arrayListOf()
            val sigs = b.getStringArrayList("INAPP_DATA_SIGNATURE_LIST") ?: arrayListOf()
            for (i in datas.indices) {
                val sku = verifiedSku(datas[i], sigs.getOrNull(i))
                if (sku != null) owned.add(logicalId(sku))
            }
            token = b.getString("INAPP_CONTINUATION_TOKEN")
            guard++
        } while (!token.isNullOrEmpty() && guard < 10)
        return owned
    }

    override fun queryOwned(onResult: (Set<String>?) -> Unit) {
        ensureConnected { ok ->
            val s = service
            if (!ok || s == null) {
                onResult(null)
                return@ensureConnected
            }
            io.execute {
                val result: Set<String>? = try {
                    fetchOwned(s)
                } catch (e: Exception) {
                    null
                }
                main.post { onResult(result) }
            }
        }
    }

    override fun buy(sku: String, onResult: (ok: Boolean, error: String?) -> Unit) {
        val storeSku = TO_STORE[sku] ?: sku
        ensureConnected { ok ->
            val s = service
            if (!ok || s == null) {
                onResult(false, "no_store")
                return@ensureConnected
            }
            io.execute {
                val b: Bundle? = try {
                    s.getBuyIntent(3, activity.packageName, storeSku, "inapp", "")
                } catch (e: Exception) {
                    null
                }
                main.post { launchPurchase(storeSku, b, onResult) }
            }
        }
    }

    private fun launchPurchase(
        sku: String,
        b: Bundle?,
        onResult: (ok: Boolean, error: String?) -> Unit
    ) {
        if (b == null) {
            onResult(false, "failed")
            return
        }
        val c = code(b.get("RESPONSE_CODE"))
        if (c == 7) { // قبلاً خریده شده
            onResult(true, null)
            return
        }
        val pi = b.getParcelable<PendingIntent>("BUY_INTENT")
        if (c != 0 || pi == null) {
            onResult(false, "failed")
            return
        }

        val holder = arrayOfNulls<ActivityResultLauncher<IntentSenderRequest>>(1)
        holder[0] = activity.activityResultRegistry.register(
            "nc_myket_buy_" + System.nanoTime(),
            ActivityResultContracts.StartIntentSenderForResult()
        ) { res ->
            holder[0]?.unregister()
            handleResult(sku, res.resultCode, res.data, onResult)
        }
        try {
            holder[0]?.launch(IntentSenderRequest.Builder(pi.intentSender).build())
        } catch (e: Exception) {
            holder[0]?.unregister()
            onResult(false, "failed")
        }
    }

    private fun handleResult(
        sku: String,
        resultCode: Int,
        data: Intent?,
        onResult: (ok: Boolean, error: String?) -> Unit
    ) {
        if (data == null) {
            onResult(false, "cancelled")
            return
        }
        val c = code(data.extras?.get("RESPONSE_CODE"))
        val purchaseData = data.getStringExtra("INAPP_PURCHASE_DATA")
        val sig = data.getStringExtra("INAPP_DATA_SIGNATURE")
        when {
            c == 7 -> onResult(true, null)
            resultCode == Activity.RESULT_OK && c == 0 ->
                if (verifiedSku(purchaseData, sig) == sku) onResult(true, null)
                else onResult(false, "failed")
            resultCode == Activity.RESULT_CANCELED || c == 1 -> onResult(false, "cancelled")
            else -> onResult(false, "failed")
        }
    }

    override fun release() {
        try {
            if (bound) activity.unbindService(conn)
        } catch (e: Exception) {
        }
        bound = false
        service = null
        io.shutdown()
    }

    companion object {
        // شناسهٔ محصولات در مایکت (شناسه‌ها در مایکت یکتا هستند، پس با بازار فرق دارند).
        // سمت چپ: شناسه‌ای که بازی استفاده می‌کند. سمت راست: شناسهٔ ساخته‌شده در پنل مایکت.
        private val TO_STORE = mapOf(
            "neon_command_full" to "neoncmd_myket_full"
        )
        private val FROM_STORE = TO_STORE.entries.associate { it.value to it.key }

        // کلید عمومی RSA از پنل مایکت (عمومی است و گذاشتنش داخل کد مشکلی ندارد)
        private const val RSA_PUBLIC_KEY =
            "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCOjo/UgC0qpB5898ypmE6ChZx4pgVQ9DBh8q+USnpLHWDvzfcXdz/TScnqYFahGXfiiH2/jNEGBRMWnn2aY3/Tbxbrjdbny+qbMX9ATjurvoz0chirNQQhoKFo+H+jGc5DWiIPgZSak+kEnc4px3X9NeAxwg8G1KqqEJvLTspfSQIDAQAB"
    }
}
