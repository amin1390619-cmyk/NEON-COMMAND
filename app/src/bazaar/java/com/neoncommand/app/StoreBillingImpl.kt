package com.neoncommand.app

import androidx.activity.ComponentActivity
import ir.cafebazaar.poolakey.Payment
import ir.cafebazaar.poolakey.config.PaymentConfiguration
import ir.cafebazaar.poolakey.config.SecurityCheck
import ir.cafebazaar.poolakey.request.PurchaseRequest

/** نسخهٔ بازار (Poolakey). کلید RSA را از پنل توسعه‌دهندهٔ بازار بگذار. */
class StoreBillingImpl(private val activity: ComponentActivity) : StoreBilling {

    private val payment = Payment(
        context = activity,
        config = PaymentConfiguration(
            localSecurityCheck = SecurityCheck.Enable(rsaPublicKey = RSA_PUBLIC_KEY)
        )
    )

    private var connected = false
    private var connecting = false
    private val waiting = mutableListOf<(Boolean) -> Unit>()

    private fun flush(ok: Boolean) {
        val list = waiting.toList()
        waiting.clear()
        list.forEach { it(ok) }
    }

    private fun ensureConnected(cb: (Boolean) -> Unit) {
        if (connected) {
            cb(true)
            return
        }
        waiting += cb
        if (connecting) return
        connecting = true
        try {
            payment.connect {
                connectionSucceed {
                    connecting = false
                    connected = true
                    flush(true)
                }
                connectionFailed {
                    connecting = false
                    connected = false
                    flush(false)
                }
                disconnected {
                    connected = false
                }
            }
        } catch (e: Exception) {
            connecting = false
            flush(false)
        }
    }

    override fun queryOwned(onResult: (Set<String>?) -> Unit) {
        ensureConnected { ok ->
            if (!ok) {
                onResult(null)
                return@ensureConnected
            }
            var done = false
            payment.getPurchasedProducts {
                querySucceed { purchased ->
                    if (!done) {
                        done = true
                        onResult(purchased.map { it.productId }.toSet())
                    }
                }
                queryFailed {
                    if (!done) {
                        done = true
                        onResult(null)
                    }
                }
            }
        }
    }

    override fun buy(sku: String, onResult: (ok: Boolean, error: String?) -> Unit) {
        ensureConnected { ok ->
            if (!ok) {
                onResult(false, "no_store")
                return@ensureConnected
            }
            var done = false
            val finish = { success: Boolean, err: String? ->
                if (!done) {
                    done = true
                    onResult(success, err)
                }
            }
            payment.purchaseProduct(
                registry = activity.activityResultRegistry,
                request = PurchaseRequest(productId = sku),
                callback = {
                    purchaseFlowBegan { }
                    failedToBeginFlow { finish(false, "failed") }
                    purchaseSucceed { finish(true, null) }
                    purchaseCanceled { finish(false, "cancelled") }
                    purchaseFailed { finish(false, "failed") }
                }
            )
        }
    }

    override fun release() {
        try {
            payment.disconnect()
        } catch (e: Exception) {
        }
    }

    companion object {
        // کلید عمومی RSA از پنل بازار (عمومی است و گذاشتنش داخل کد مشکلی ندارد)
        private const val RSA_PUBLIC_KEY = "MIHNMA0GCSqGSIb3DQEBAQUAA4G7ADCBtwKBrwDC6NL+ilS2a+BiTqthiUQUWGOJ/rni3GhQmt3J2gRxLZNR5/rTUCz4Dv8Zrm4VmVVj2ckH04C/Ac0Pl+C8bTdrjQt+o9krOXEGyVGONRJWtl9LE4VcaiX9+p/cw9D/zb6UvOUUjayjPWEYhOQRG7FB5glS4te6FP6pDbHzKSilrzi6Wkbo9EBZtztaoLTkbS8Enm/O/01rIyBbyZTKoZOC5fKWB3iQKWRXlc7TQ2sCAwEAAQ=="
    }
}
