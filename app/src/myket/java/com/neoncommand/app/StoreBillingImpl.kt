package com.neoncommand.app

import androidx.activity.ComponentActivity

/**
 * نسخهٔ مایکت: فعلاً جایگزین موقت است تا هر دو فلیور بیلد شوند.
 * بعد از تأیید بخش بازار، کتابخانهٔ رسمی مایکت را اینجا وصل می‌کنیم.
 */
class StoreBillingImpl(@Suppress("UNUSED_PARAMETER") activity: ComponentActivity) : StoreBilling {

    override fun queryOwned(onResult: (Set<String>?) -> Unit) {
        onResult(null)
    }

    override fun buy(sku: String, onResult: (ok: Boolean, error: String?) -> Unit) {
        onResult(false, "no_store")
    }

    override fun release() {}
}
