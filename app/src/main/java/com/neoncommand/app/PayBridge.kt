package com.neoncommand.app

import android.content.Context
import android.webkit.JavascriptInterface
import android.webkit.WebView
import androidx.activity.ComponentActivity
import org.json.JSONArray
import org.json.JSONObject

/**
 * پل پرداخت: window.NeonPay در صفحهٔ بازی.
 * وضعیت خرید فقط از فروشگاه می‌آید و در SharedPreferences (نه localStorage) کش می‌شود،
 * تا بدون اینترنت هم کاربری که خریده قفل نشود.
 */
class PayBridge(
    private val activity: ComponentActivity,
    private val webView: () -> WebView,
    private val isTrusted: () -> Boolean
) {
    private val billing: StoreBilling = StoreBillingImpl(activity)
    private val prefs = activity.getSharedPreferences("nc_pay", Context.MODE_PRIVATE)
    private var busy = false

    private fun cached(): Set<String> =
        (prefs.getStringSet("owned", emptySet()) ?: emptySet()).filter { it in SKUS }.toSet()

    private fun save(owned: Set<String>) {
        prefs.edit().putStringSet("owned", HashSet(owned)).apply()
    }

    private fun send(payload: JSONObject) {
        activity.runOnUiThread {
            if (activity.isFinishing || activity.isDestroyed || !isTrusted()) return@runOnUiThread
            val quoted = JSONObject.quote(payload.toString())
            webView().evaluateJavascript(
                "(function(){try{var a=window.NCPay;if(a&&a.onEvent){a.onEvent(JSON.parse($quoted));}}catch(e){}})();",
                null
            )
        }
    }

    private fun sendState(owned: Set<String>, live: Boolean) {
        send(
            JSONObject()
                .put("kind", "state")
                .put("store", BuildConfig.STORE)
                .put("live", live)
                .put("owned", JSONArray(owned.toList()))
        )
    }

    @JavascriptInterface
    fun getStore(): String = BuildConfig.STORE

    /** اول وضعیت کش‌شده را می‌فرستد، بعد از فروشگاه می‌پرسد. */
    @JavascriptInterface
    fun refresh() {
        activity.runOnUiThread {
            if (activity.isFinishing || activity.isDestroyed || !isTrusted()) return@runOnUiThread
            sendState(cached(), false)
            billing.queryOwned { fresh ->
                if (fresh != null) {
                    val owned = fresh.filter { it in SKUS }.toSet()
                    save(owned)
                    sendState(owned, true)
                } else {
                    send(JSONObject().put("kind", "stateError"))
                }
            }
        }
    }

    @JavascriptInterface
    fun buy(sku: String) {
        activity.runOnUiThread {
            if (activity.isFinishing || activity.isDestroyed || !isTrusted()) return@runOnUiThread
            if (sku !in SKUS || busy) return@runOnUiThread
            busy = true
            billing.buy(sku) { ok, error ->
                busy = false
                if (ok) {
                    val owned = cached() + sku
                    save(owned)
                    sendState(owned, false)
                }
                send(
                    JSONObject()
                        .put("kind", "buy")
                        .put("ok", ok)
                        .put("sku", sku)
                        .put("error", error ?: "")
                )
            }
        }
    }

    fun release() {
        billing.release()
    }

    companion object {
        private val SKUS = setOf("neon_command_ai", "neon_command_full", "neon_command_upgrade")
    }
}
