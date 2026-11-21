
/* v1.9.0 — کنترل لودینگ: منتظر بارگذاری واقعی (فونت‌ها، تصاویر، موتور گرافیکی) می‌ماند و بعد بازی را آرام باز می‌کند */
(function(){const ld=document.getElementById('ld');if(!ld)return;
const MIN_MS=2600,HARD_MS=14000,bar=document.getElementById('ldBar'),pct=document.getElementById('ldPct'),st=document.getElementById('ldSt'),tip=document.getElementById('ldTip');
const fa=(typeof S!=='undefined'?S.lang:'fa')!=='en';
const TXT={fonts:fa?'در حال بارگذاری فونت‌ها…':'Loading fonts…',imgs:fa?'در حال بارگذاری تصاویر…':'Loading images…',gfx:fa?'آماده‌سازی موتور گرافیکی…':'Preparing graphics engine…',done:fa?'آماده!':'Ready!'};TXT.warm=TXT.gfx;
const TIPS=fa?['سه خانهٔ بنفش را ۳ نوبت پشت‌سرهم نگه دار تا برنده شوی.','واحد سنگین یک نوبت در میان حمله می‌کند؛ زمان‌بندی‌اش را حساب کن.','خانه‌های ترمیم در ابتدای نوبت به واحدهای زخمی جان برمی‌گردانند.','موانع جلوی حرکت را می‌گیرند اما از روی آن‌ها می‌شود حمله کرد.']
 :['Hold all three purple tiles for 3 turns in a row to win.','The Heavy unit attacks every other turn, so time it well.','Repair tiles heal wounded units at the start of your turn.','Obstacles block movement, but you can still attack over them.'];
tip.dir=st.dir=fa?'rtl':'ltr';tip.textContent=TIPS[Math.floor(Math.random()*TIPS.length)];
const W={fonts:30,imgs:15,gfx:40,warm:15};let real=0,label='fonts',t0=performance.now(),shown=0,fin=false;
const add=(k)=>{real+=W[k]};
const fonts=['400 16px "NC Sans"','700 16px "NC Sans"','400 16px "NC Fa"','400 16px "NC Mi"','700 16px "NC Mi"','800 16px "NC Mi"'];
const pFonts=Promise.all(fonts.map(f=>document.fonts.load(f,'Aa \u0645\u062a').catch(()=>{}))).then(()=>document.fonts.ready).catch(()=>{}).then(()=>{add('fonts');label='imgs'});
const pImgs=pFonts.then(()=>Promise.all([...document.images].map(i=>i.decode?i.decode().catch(()=>{}):0))).then(()=>{add('imgs');label='gfx'});
const pGfx=pImgs.then(()=>new Promise(res=>{const t=performance.now();(function w(){let ok=true;try{ok=(typeof PX==='undefined')||PX===null||!!(PX.T&&PX.T.obj)}catch(e){}
 if(ok||performance.now()-t>6000)res();else setTimeout(w,60)})()})).then(()=>{add('gfx');label='warm'});
const pWarm=pGfx.then(()=>new Promise(res=>requestAnimationFrame(()=>requestAnimationFrame(()=>{try{if(typeof resize==='function')resize()}catch(e){}add('warm');res()}))));
function finish(){if(fin)return;fin=true;st.textContent=TXT.done;bar.style.width='100%';pct.textContent='100%';
 setTimeout(()=>{document.body.classList.add('ld-done');document.body.classList.remove('ld-wait');ld.classList.add('out');
  setTimeout(()=>{ld.style.display='none';document.body.classList.remove('ld-done')},2200);setTimeout(()=>ld.remove(),1200)},350)}
let allDone=false;pWarm.then(()=>{allDone=true});
function tick(){if(fin)return;const el=performance.now()-t0,timeP=Math.min(100,el/MIN_MS*100),goal=allDone?Math.min(100,timeP):Math.min(real,timeP,96);
 shown+=(goal-shown)*.1+.02;if(shown>goal)shown=goal;bar.style.width=shown.toFixed(1)+'%';pct.textContent=Math.floor(shown)+'%';
 if(!allDone)st.textContent=TXT[label]||'';
 if((allDone&&shown>=99.4)||el>HARD_MS){finish();return}requestAnimationFrame(tick)}
requestAnimationFrame(tick);setTimeout(()=>{if(!fin)finish()},HARD_MS+500);
})();
