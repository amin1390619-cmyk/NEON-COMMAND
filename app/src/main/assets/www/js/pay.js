'use strict';
/* NEON COMMAND — پرداخت درون‌برنامه‌ای (بازار / مایکت)
   پل: window.NeonPay (کد اندروید) ↔ window.NCPay.onEvent (این فایل).
   این فایل باید بعد از game-core.js لود شود.
   قفل‌ها:
     بازی با هوش مصنوعی  → بسته‌ی هوش مصنوعی یا نسخه‌ی کامل
     بازی آنلاین + نقشه‌ی راکتور → نسخه‌ی کامل (یا بسته‌ی هوش مصنوعی + ارتقا)
   خارج از WebView اندروید (مرورگر معمولی) همه‌چیز باز است. */
(function(){
 const SKU={ai:'neon_command_ai',full:'neon_command_full',up:'neon_command_upgrade'};
 const PRICE={ai:'۲۰,۰۰۰ تومان',full:'۴۰,۰۰۰ تومان',up:'۲۰,۰۰۰ تومان'};
 const T={
  fa:{title:'این بخش قفل است',needAi:'برای بازی با هوش مصنوعی یکی از بسته‌ها رو بخر.',needFull:'این بخش مخصوص نسخه کامل است (نقشه راکتور و بازی آنلاین).',
   ai:'بسته هوش مصنوعی',aiD:'بازی با AI در هر سه سطح',full:'نسخه کامل',fullD:'نقشه راکتور + بازی آنلاین + بازی با AI',
   up:'ارتقا به نسخه کامل',upD:'بسته هوش مصنوعی رو داری؛ فقط مابه‌التفاوت رو می‌دی',
   restore:'بازیابی خریدها',checking:'در حال بررسی خریدها…',none:'خریدی پیدا نشد.',ok:'خرید انجام شد. حالا می‌تونی بازی کنی.',
   errStore:'به {s} وصل نشد. مطمئن شو {s} نصب و اینترنت وصله.',errFail:'خرید انجام نشد. دوباره تلاش کن.',noApp:'خرید فقط داخل برنامه اندروید کار می‌کنه.'},
  en:{title:'This is locked',needAi:'Buy one of the packs to play against the AI.',needFull:'This needs the full version (Reactor map and online play).',
   ai:'AI pack',aiD:'Play vs AI on all three levels',full:'Full version',fullD:'Reactor map + online play + vs AI',
   up:'Upgrade to full version',upD:'You own the AI pack; pay only the difference',
   restore:'Restore purchases',checking:'Checking purchases…',none:'No purchases found.',ok:'Purchase complete. You can play now.',
   errStore:'Could not reach {s}. Make sure {s} is installed and you are online.',errFail:'Purchase failed. Please try again.',noApp:'Purchases only work inside the Android app.'}
 };
 const t=k=>((T[S.lang]||T.fa)[k])||T.fa[k]||k;
 const st={owned:new Set(),store:'',need:null};
 const br=()=>{try{return(window.NeonPay&&typeof window.NeonPay.buy==='function')?window.NeonPay:null}catch(e){return null}};
 const enforced=()=>!!br()||/; wv\)/.test(navigator.userAgent||'');
 const hasFull=()=>!enforced()||st.owned.has(SKU.full)||(st.owned.has(SKU.ai)&&st.owned.has(SKU.up));
 const hasAI=()=>hasFull()||st.owned.has(SKU.ai);
 const storeName=()=>st.store==='myket'?(S.lang==='fa'?'مایکت':'Myket'):(S.lang==='fa'?'بازار':'Bazaar');
 const setMsg=m=>{const e=document.getElementById('payMsg');if(e)e.textContent=m||''};

 function paint(){
  [['#bAI',hasAI()],['#bHost',hasFull()],['#bJoin',hasFull()]].forEach(([q,ok])=>{
   const b=document.querySelector(q);if(!b)return;
   let l=b.querySelector('.nclock');
   if(!ok&&!l){l=document.createElement('span');l.className='nclock';l.textContent=' 🔒';b.appendChild(l)}
   else if(ok&&l)l.remove()})}

 function done(){modal('<b>✔ '+t('ok')+'</b>')}

 function paywall(need){
  st.need=need;
  const row=k=>'<button class="btn" data-sku="'+SKU[k]+'" style="width:100%;margin-top:12px;border-color:var(--amber-core);color:var(--amber-core)">'
   +t(k)+' · '+PRICE[k]+'<br><small style="font-weight:400;opacity:.8;color:var(--hull-silver)">'+t(k+'D')+'</small></button>';
  const offers=need==='ai'?['ai','full']:(st.owned.has(SKU.ai)?['up']:['full']);
  modal('<b>🔒 '+t('title')+'</b><div style="margin-top:8px;font-size:13px;line-height:1.8">'+t(need==='ai'?'needAi':'needFull')+'</div>'
   +offers.map(row).join('')
   +'<button class="btn" id="payRestore" style="width:100%;margin-top:12px">'+t('restore')+'</button>'
   +'<div id="payMsg" style="text-align:center;font-size:12px;color:#8b93a7;margin-top:10px;min-height:18px"></div>');
  document.querySelectorAll('#mtxt [data-sku]').forEach(b=>b.onclick=()=>buy(b.dataset.sku));
  document.getElementById('payRestore').onclick=restore}

 function buy(sku){
  const b=br();if(!b){setMsg(t('noApp'));return}
  if(st.owned.has(sku))return;
  setMsg('…');
  try{b.buy(sku)}catch(e){setMsg(t('errFail'))}}

 function restore(){
  const b=br();if(!b){setMsg(t('noApp'));return}
  setMsg(t('checking'));
  try{b.refresh()}catch(e){setMsg(t('errFail'))}}

 window.NCPay={onEvent:function(p){try{
  if(!p||typeof p!=='object')return;
  if(p.kind==='state'){
   st.owned=new Set(Array.isArray(p.owned)?p.owned.map(String):[]);
   if(p.store)st.store=String(p.store);
   paint();
   if(document.getElementById('payRestore')){
    if(st.need==='ai'?hasAI():hasFull())done();
    else if(p.live)setMsg(t('none'))}}
  else if(p.kind==='stateError'){setMsg(t('errStore').split('{s}').join(storeName()))}
  else if(p.kind==='buy'){
   if(p.ok)done();
   else if(p.error==='cancelled')setMsg('');
   else setMsg(t(p.error==='no_store'?'errStore':'errFail').split('{s}').join(storeName()))}
 }catch(e){}}};

 /* قبل از اجرای دکمه‌های بازی (که با onclick تنظیم شده‌اند) کلیک را می‌گیرد */
 document.addEventListener('click',function(e){
  const el=e.target;if(!el||!el.closest)return;
  let need=null;
  if(el.closest('#bAI')&&!hasAI())need='ai';
  else if((el.closest('#bHost')||el.closest('#bJoin'))&&!hasFull())need='full';
  else{const mc=el.closest('.mapCard');if(mc&&mc.dataset.id==='reactor'&&!hasFull())need='full'}
  if(!need)return;
  e.stopImmediatePropagation();e.preventDefault();paywall(need)},true);

 document.addEventListener('visibilitychange',()=>{
  if(document.hidden)return;
  const b=br();if(b){try{b.refresh()}catch(e){}}});

 paint();
 const b0=br();
 if(b0){try{st.store=String(b0.getStore())}catch(e){}try{b0.refresh()}catch(e){}}
})();
