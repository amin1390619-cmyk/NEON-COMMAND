
# Preserve JavaScript interface methods used by Android WebView.
-keepclassmembers class com.neoncommand.app.MainActivity$NeonAuthBridge {
    @android.webkit.JavascriptInterface <methods>;
}

# Preserve Firebase and Google authentication functionality.
-keep class com.google.firebase.auth.** { *; }
-keep class com.google.android.libraries.identity.googleid.** { *; }
-keep class androidx.credentials.** { *; }
