# Preserve Android WebView JavaScript bridge.
-keep class com.neoncommand.app.MainActivity$NeonAuthBridge {
    @android.webkit.JavascriptInterface <methods>;
}

# Preserve JavaScript interface methods.
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
