/* NEON COMMAND — نظرسنجی بعد از اولین برد
   استفاده: در لحظهٔ برد بازیکن، یک بار  NCRate.onWin()  صدا زده شود. */
(function () {
  var KEY = 'nc_rate_done';
  var shown = false;

  function done() { try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function markDone() { try { localStorage.setItem(KEY, '1'); } catch (e) {} }

  function storeInfo() {
    try {
      if (!window.NeonRate) return null;
      var s = NeonRate.getStore();
      if (s === 'bazaar') return { name: 'کافه بازار' };
      if (s === 'myket') return { name: 'مایکت' };
    } catch (e) {}
    return null;
  }

  function css() {
    if (document.getElementById('ncRateCss')) return;
    var st = document.createElement('style');
    st.id = 'ncRateCss';
    st.textContent =
      '#ncRate{position:fixed;inset:0;z-index:50;display:flex;align-items:center;justify-content:center;background:#0B0F1Acc;direction:rtl;font-family:inherit}' +
      '#ncRate .rc{width:min(86vw,340px);background:#0B0F1A;border:1px solid #00E5FF;border-radius:16px;box-shadow:0 0 18px #00E5FF55;padding:20px 18px;text-align:center;color:#e8ecf5}' +
      '#ncRate h3{margin:0 0 6px;font-size:18px;color:#00E5FF}' +
      '#ncRate p{margin:0 0 14px;font-size:13px;line-height:1.8;color:#b8c0d4}' +
      '#ncRate .st{display:flex;justify-content:center;gap:6px;direction:ltr;margin-bottom:14px}' +
      '#ncRate .st button{background:none;border:0;font-size:34px;line-height:1;color:#3a4260;cursor:pointer;padding:2px}' +
      '#ncRate .st button.on{color:#FFD166;text-shadow:0 0 10px #FFD16699}' +
      '#ncRate .go{display:block;width:100%;padding:11px;margin-bottom:8px;border-radius:12px;border:1px solid #FFD166;background:#FFD16622;color:#FFD166;font-size:14px;font-weight:700}' +
      '#ncRate .later{background:none;border:0;color:#8b93a7;font-size:12px;padding:6px}';
    document.head.appendChild(st);
  }

  function close() {
    var el = document.getElementById('ncRate');
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function render(info) {
    css();
    var ov = document.createElement('div');
    ov.id = 'ncRate';
    ov.innerHTML =
      '<div class="rc"><h3>بازی چطور بود؟</h3>' +
      '<p>اولین بردت مبارک! به بازی ستاره بده.</p>' +
      '<div class="st"></div><div class="act"></div>' +
      '<button class="later">بعداً</button></div>';
    document.body.appendChild(ov);

    var st = ov.querySelector('.st'), act = ov.querySelector('.act'), p = ov.querySelector('p');
    var btns = [];
    for (var i = 1; i <= 5; i++) (function (n) {
      var b = document.createElement('button');
      b.textContent = '★';
      b.addEventListener('click', function () {
        for (var k = 0; k < 5; k++) btns[k].className = k < n ? 'on' : '';
        markDone();
        if (n >= 4) {
          p.textContent = 'خوشحالیم که بازی را دوست داشتی! نظرت را در ' + info.name + ' هم بنویس تا دیگران هم ببینند.';
          act.innerHTML = '';
          var g = document.createElement('button');
          g.className = 'go';
          g.textContent = 'ثبت نظر در ' + info.name;
          g.addEventListener('click', function () {
            try { NeonRate.openRate(); } catch (e) {}
            close();
          });
          act.appendChild(g);
        } else {
          p.textContent = 'ممنون از نظرت! تلاش می‌کنیم بازی را بهتر کنیم.';
          act.innerHTML = '';
          setTimeout(close, 1800);
        }
      });
      st.appendChild(b);
      btns.push(b);
    })(i);

    ov.querySelector('.later').addEventListener('click', function () { markDone(); close(); });
  }

  window.NCRate = {
    onWin: function () {
      if (shown || done()) return;
      var info = storeInfo();
      if (!info) return;            // نسخهٔ خارج از بازار/مایکت: نمایش نده
      shown = true;
      setTimeout(function () { render(info); }, 1500); // بگذار انیمیشن برد دیده شود
    }
  };
})();
