
/* v1.8.2 — اندازهٔ فونت ثابت: اگر گوشی یا WebView متن را با «اندازهٔ فونت سیستم» بزرگ/کوچک کند، همین‌جا خنثی می‌شود.
   برای بزرگ/کوچک‌کردن متن در کل بازی فقط FONT_SCALE را عوض کن (۱ = اندازهٔ طراحی‌شده). */
(function(){const FONT_SCALE=1;
const UNITS=/(px|vw|vh|vmin|vmax|rem|pt)/;let K=1;
const fixVal=v=>'calc(('+v+') / '+K+')';
function fixEl(el){const st=el.style;if(!st||!st.fontSize)return;const v=st.fontSize;if(el.dataset&&el.dataset.fz===v)return;if(!UNITS.test(v))return;
 st.fontSize=fixVal(v);el.dataset.fz=st.fontSize}
function fixTree(n){if(n.nodeType!==1)return;if(n.hasAttribute('style'))fixEl(n);n.querySelectorAll('[style]').forEach(fixEl)}
function fixRules(rules){for(const r of rules){try{if(r.cssRules&&!r.style){fixRules(r.cssRules);continue}
 if(r.type===1&&r.style&&r.style.fontSize){const v=r.style.fontSize;if(UNITS.test(v)&&v.indexOf('calc((')!==0)r.style.fontSize=fixVal(v)}}catch(e){}}}
async function run(){
 try{await Promise.all([document.fonts.load('400 100px "NC Sans"'),document.fonts.load('700 100px "NC Sans"'),document.fonts.load('400 100px "NC Fa"','\u0645\u0646'),document.fonts.load('400 100px "NC Mi"'),document.fonts.load('700 100px "NC Mi"'),document.fonts.load('800 100px "NC Mi"')])}catch(e){}
 let r=1;
 try{const t='Hamburgefonstiv 0123',sp=document.createElement('span');
  sp.style.cssText='position:absolute;left:-9999px;top:0;visibility:hidden;white-space:nowrap;letter-spacing:0;font:400 100px "NC Sans"';sp.textContent=t;document.body.appendChild(sp);
  const dw=sp.getBoundingClientRect().width;sp.remove();
  const cx=document.createElement('canvas').getContext('2d');cx.font='400 100px "NC Sans"';const cw=cx.measureText(t).width;
  if(dw>0&&cw>0)r=dw/cw}catch(e){}
 if(Math.abs(r-1)<.03)r=1;r=Math.min(3,Math.max(.4,r));
 K=r/FONT_SCALE;window._fontFix={sysScale:r,scale:FONT_SCALE};
 if(Math.abs(K-1)<.005)return;
 for(const ss of document.styleSheets){try{fixRules(ss.cssRules)}catch(e){}}
 fixTree(document.body);
 new MutationObserver(ms=>{for(const m of ms){if(m.type==='childList')m.addedNodes.forEach(fixTree);else fixEl(m.target)}})
  .observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['style']});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
