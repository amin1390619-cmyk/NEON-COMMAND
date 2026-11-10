
package com.neoncommand.app

import android.annotation.SuppressLint
import android.content.Intent
import android.graphics.Color
import android.net.Uri
import android.os.Bundle
import android.os.Build
import android.view.WindowManager
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import androidx.webkit.WebViewAssetLoader

class MainActivity : ComponentActivity() {

    private lateinit var webView: WebView

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
            supportMultipleWindows = true
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
        webView.stopLoading()
        webView.loadUrl("about:blank")
        webView.destroy()
        super.onDestroy()
    }
}
