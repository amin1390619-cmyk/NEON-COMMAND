
package com.neoncommand.app

import android.annotation.SuppressLint
import android.content.Intent
import android.graphics.Color
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.net.Uri
import android.os.Bundle
import android.os.Build
import android.os.CancellationSignal
import android.view.WindowManager
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.core.content.ContextCompat
import androidx.credentials.CredentialManager
import androidx.credentials.CredentialManagerCallback
import androidx.credentials.CustomCredential
import androidx.credentials.GetCredentialRequest
import androidx.credentials.GetCredentialResponse
import androidx.credentials.exceptions.GetCredentialCancellationException
import androidx.credentials.exceptions.GetCredentialException
import androidx.credentials.exceptions.GetCredentialProviderConfigurationException
import androidx.credentials.exceptions.GetCredentialUnsupportedException
import androidx.credentials.exceptions.NoCredentialException
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import androidx.webkit.WebViewAssetLoader
import com.google.android.libraries.identity.googleid.GetSignInWithGoogleOption
import com.google.android.libraries.identity.googleid.GoogleIdTokenCredential
import com.google.android.libraries.identity.googleid.GoogleIdTokenParsingException
import com.google.firebase.FirebaseNetworkException
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.auth.GoogleAuthProvider
import org.json.JSONObject

class MainActivity : ComponentActivity() {

    private lateinit var webView: WebView

    // ---------------------------------------------------------------
    // ورود با حساب گوگل (Credential Manager + Firebase Authentication)
    // ---------------------------------------------------------------

    private val credentialManager by lazy { CredentialManager.create(this) }

    private var signInBusy = false
    private var signInCancel: CancellationSignal? = null

    /** فقط صفحهٔ محلی بازی (WebViewAssetLoader) اجازهٔ استفاده از پل را دارد. باید روی ترد اصلی صدا زده شود. */
    private fun isTrustedPage(): Boolean {
        val raw = webView.url ?: return false
        val uri = Uri.parse(raw)
        return uri.scheme == "https" && uri.host == TRUSTED_HOST
    }

    private fun isOnline(): Boolean {
        val cm = getSystemService(ConnectivityManager::class.java) ?: return false
        val network = cm.activeNetwork ?: return false
        val caps = cm.getNetworkCapabilities(network) ?: return false
        return caps.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
    }

    /** فقط UID، ایمیل و نام نمایشی؛ هیچ توکنی به جاوااسکریپت داده نمی‌شود. */
    private fun userPayload(kind: String, user: FirebaseUser?): JSONObject {
        val o = JSONObject().put("kind", kind)
        if (user == null) return o.put("signedIn", false)

        val email = user.email?.takeIf { it.isNotBlank() }
            ?: user.providerData.firstOrNull { !it.email.isNullOrBlank() }?.email
        val name = user.displayName?.takeIf { it.isNotBlank() }
            ?: user.providerData.firstOrNull { !it.displayName.isNullOrBlank() }?.displayName

        return o.put("signedIn", true)
            .put("uid", user.uid)
            .put("email", email ?: "")
            .put("name", name ?: "")
    }

    /** ارسال امن JSON: رشتهٔ JSON با JSONObject.quote به‌صورت literal امن جاوااسکریپت درمی‌آید و در صفحه JSON.parse می‌شود. */
    private fun sendToWeb(payload: JSONObject) {
        if (isFinishing || isDestroyed || !isTrustedPage()) return
        val quoted = JSONObject.quote(payload.toString())
        webView.evaluateJavascript(
            "(function(){try{var a=window.NCAuth;if(a&&a.onEvent){a.onEvent(JSON.parse($quoted));}}catch(e){}})();",
            null
        )
    }

    private fun finishSignInError(code: String) {
        signInBusy = false
        signInCancel = null
        sendToWeb(
            JSONObject()
                .put("kind", "signin")
                .put("ok", false)
                .put("error", code)
        )
    }

    private fun finishSignInSuccess(user: FirebaseUser?) {
        signInBusy = false
        signInCancel = null
        if (user == null) {
            sendToWeb(
                JSONObject()
                    .put("kind", "signin")
                    .put("ok", false)
                    .put("error", "failed")
            )
            return
        }
        sendToWeb(userPayload("signin", user).put("ok", true))
    }

    private fun errorCodeFor(e: GetCredentialException): String {
        return when (e) {
            is GetCredentialCancellationException -> "cancelled"
            is NoCredentialException -> "no_account"
            is GetCredentialProviderConfigurationException,
            is GetCredentialUnsupportedException -> "unavailable"
            else -> if (isOnline()) "failed" else "offline"
        }
    }

    private fun startGoogleSignIn() {
        if (signInBusy) return

        if (!isOnline()) {
            finishSignInError("offline")
            return
        }

        signInBusy = true

        try {
            val option = GetSignInWithGoogleOption
                .Builder(getString(R.string.default_web_client_id))
                .build()

            val request = GetCredentialRequest.Builder()
                .addCredentialOption(option)
                .build()

            val signal = CancellationSignal()
            signInCancel = signal

            credentialManager.getCredentialAsync(
                this,
                request,
                signal,
                ContextCompat.getMainExecutor(this),
                object : CredentialManagerCallback<GetCredentialResponse, GetCredentialException> {
                    override fun onResult(result: GetCredentialResponse) {
                        handleCredential(result)
                    }

                    override fun onError(e: GetCredentialException) {
                        finishSignInError(errorCodeFor(e))
                    }
                }
            )
        } catch (e: Exception) {
            finishSignInError("failed")
        }
    }

    private fun handleCredential(result: GetCredentialResponse) {
        val credential = result.credential

        if (credential !is CustomCredential ||
            credential.type != GoogleIdTokenCredential.TYPE_GOOGLE_ID_TOKEN_CREDENTIAL
        ) {
            finishSignInError("failed")
            return
        }

        val idToken: String = try {
            GoogleIdTokenCredential.createFrom(credential.data).idToken
        } catch (e: GoogleIdTokenParsingException) {
            finishSignInError("failed")
            return
        }

        if (!isOnline()) {
            finishSignInError("offline")
            return
        }

        try {
            val firebaseCredential = GoogleAuthProvider.getCredential(idToken, null)

            FirebaseAuth.getInstance()
                .signInWithCredential(firebaseCredential)
                .addOnCompleteListener { task ->
                    if (task.isSuccessful) {
                        finishSignInSuccess(
                            task.result?.user ?: FirebaseAuth.getInstance().currentUser
                        )
                    } else {
                        val offline = task.exception is FirebaseNetworkException || !isOnline()
                        finishSignInError(if (offline) "offline" else "failed")
                    }
                }
        } catch (e: Exception) {
            finishSignInError("failed")
        }
    }

    /** پل JavaScript ↔ Kotlin. نام در صفحه: window.NeonAuth */
    private inner class NeonAuthBridge {

        @JavascriptInterface
        fun connectGoogle() {
            runOnUiThread {
                if (isFinishing || isDestroyed) return@runOnUiThread
                if (isTrustedPage()) startGoogleSignIn()
            }
        }

        @JavascriptInterface
        fun getAuthState() {
            runOnUiThread {
                if (isFinishing || isDestroyed) return@runOnUiThread
                if (isTrustedPage()) {
                    sendToWeb(userPayload("state", FirebaseAuth.getInstance().currentUser))
                }
            }
        }
    }

    companion object {
        private const val TRUSTED_HOST = "appassets.androidplatform.net"
    }

    private fun enableImmersiveMode() {
        WindowCompat.setDecorFitsSystemWindows(
            window,
            false
        )

        window.statusBarColor = Color.TRANSPARENT
        window.navigationBarColor = Color.TRANSPARENT

        val controller = WindowInsetsControllerCompat(
            window,
            window.decorView
        )

        controller.hide(
            WindowInsetsCompat.Type.systemBars()
        )

        controller.systemBarsBehavior =
            WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
    }

    private fun openExternalUrl(uri: Uri): Boolean {
        return try {
            val intent = Intent(
                Intent.ACTION_VIEW,
                uri
            )
            startActivity(intent)
            true
        } catch (e: Exception) {
            false
        }
    }

    private fun isRubikaUrl(uri: Uri): Boolean {
        val host = uri.host?.lowercase() ?: return false

        return host == "rubika.ir" ||
               host.endsWith(".rubika.ir")
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            window.attributes = window.attributes.apply {
                layoutInDisplayCutoutMode =
                    WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES
            }
        }

        window.addFlags(
            WindowManager.LayoutParams.FLAG_FULLSCREEN
        )

        window.addFlags(
            WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
        )

        enableImmersiveMode()

        val assetLoader = WebViewAssetLoader.Builder()
            .addPathHandler(
                "/assets/",
                WebViewAssetLoader.AssetsPathHandler(this)
            )
            .build()

        webView = WebView(this)

        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            allowFileAccess = false
            allowContentAccess = false

            mixedContentMode =
                WebSettings.MIXED_CONTENT_NEVER_ALLOW

            mediaPlaybackRequiresUserGesture = false
            cacheMode = WebSettings.LOAD_DEFAULT

            javaScriptCanOpenWindowsAutomatically = true
        }

        webView.webViewClient = object : WebViewClient() {

            override fun shouldInterceptRequest(
                view: WebView,
                request: WebResourceRequest
            ): WebResourceResponse? {
                return assetLoader.shouldInterceptRequest(
                    request.url
                )
            }

            override fun shouldOverrideUrlLoading(
                view: WebView,
                request: WebResourceRequest
            ): Boolean {

                val uri = request.url

                if (isRubikaUrl(uri)) {
                    return openExternalUrl(uri)
                }

                return uri.scheme != "https" &&
                       uri.scheme != "http"
            }
        }

        webView.webChromeClient = object : WebChromeClient() {

            override fun onCreateWindow(
                view: WebView,
                isDialog: Boolean,
                isUserGesture: Boolean,
                resultMsg: android.os.Message
            ): Boolean {

                val popupWebView = WebView(this@MainActivity)

                popupWebView.settings.javaScriptEnabled = true

                popupWebView.webViewClient = object : WebViewClient() {

                    override fun shouldOverrideUrlLoading(
                        view: WebView,
                        request: WebResourceRequest
                    ): Boolean {

                        val uri = request.url

                        if (uri.scheme == "https" ||
                            uri.scheme == "http") {
                            openExternalUrl(uri)
                        }

                        view.stopLoading()
                        view.destroy()

                        return true
                    }
                }

                val transport =
                    resultMsg.obj as WebView.WebViewTransport

                transport.webView = popupWebView
                resultMsg.sendToTarget()

                return true
            }
        }

        webView.addJavascriptInterface(NeonAuthBridge(), "NeonAuth")

        webView.setBackgroundColor(Color.TRANSPARENT)

        setContentView(webView)

        enableImmersiveMode()

        val gameUrl =
            "https://appassets.androidplatform.net/assets/www/index.html"

        if (savedInstanceState == null) {
            webView.loadUrl(gameUrl)
        } else {
            webView.restoreState(savedInstanceState)
        }

        onBackPressedDispatcher.addCallback(
            this,
            object : OnBackPressedCallback(true) {

                override fun handleOnBackPressed() {
                    if (webView.canGoBack()) {
                        webView.goBack()
                    } else {
                        finish()
                    }
                }
            }
        )
    }

    override fun onWindowFocusChanged(hasFocus: Boolean) {
        super.onWindowFocusChanged(hasFocus)

        if (hasFocus) {
            enableImmersiveMode()
        }
    }

    override fun onSaveInstanceState(outState: Bundle) {
        webView.saveState(outState)
        super.onSaveInstanceState(outState)
    }

    override fun onDestroy() {
        signInCancel?.cancel()
        webView.stopLoading()
        webView.loadUrl("about:blank")
        webView.destroy()
        super.onDestroy()
    }
}
