package com.neoncommand.app

/** رابط مشترک پرداخت؛ هر فروشگاه (بازار / مایکت) پیاده‌سازی خودش را دارد. */
interface StoreBilling {
    /** null یعنی به فروشگاه وصل نشد؛ در غیر این صورت شناسهٔ محصولاتی که کاربر دارد. */
    fun queryOwned(onResult: (Set<String>?) -> Unit)

    /** error: cancelled | no_store | failed */
    fun buy(sku: String, onResult: (ok: Boolean, error: String?) -> Unit)

    fun release()
}
