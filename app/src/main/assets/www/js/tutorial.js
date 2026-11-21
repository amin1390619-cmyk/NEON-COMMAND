
/* v1.9.4 — آموزش تعاملی: صحنهٔ ثابت + مراحل راهنما؛ ورودی فقط برای کار موردنظر هر مرحله باز است */
const TUT={on:false,step:0,S:null,E:null,P:null,T1:null,hp0:0,rings:[],tick:0,skipT:0};
const TSTEPS=[
 {t:'tp0',next:true},
 {t:'tp1',ring:()=>[TUT.S],cell:()=>[TUT.S],done:()=>sel===TUT.S},
 {t:'tp2',ring:()=>[TUT.T1],cell:()=>[TUT.T1],done:()=>TUT.S.q===TUT.T1.q&&TUT.S.r===TUT.T1.r},
 {t:'tp3',btn:'attack',mode:['attack'],done:()=>mode==='attack'&&sel===TUT.S},
 {t:'tp4',ring:()=>[TUT.E],cell:()=>[TUT.E],done:()=>TUT.E.hp<TUT.E.maxHp},
 {t:'tp5',btn:'end',end:true,done:()=>turn===2},
 {t:'tpW',wait:true,done:()=>turn===1},
 {t:'tp6',ring:()=>[TUT.P],cell:()=>[TUT.P],done:()=>sel===TUT.P},
 {t:'tp7',btn:'ability',mode:['ability'],done:()=>mode==='ability'&&sel===TUT.P},
 {t:'tp8',ring:()=>[TUT.S],cell:()=>[TUT.S],done:()=>TUT.S.hp>TUT.hp0},
 {t:'tp9',ring:()=>OBJ.map(k=>{const [q,r]=k.split(',').map(Number);return{q,r}}),next:true},
 {t:'tp10',next:true,final:true}
];
const tutSt=()=>TSTEPS[TUT.step];
function tutUnits(){const u=[mk(1,1,'core',0,7),mk(2,1,'soldier',2,5),mk(3,1,'support',3,5),mk(6,2,'core',7,0),mk(7,2,'soldier',1,3)];u[1].hp=6;return u}
function tutNudge(){const b=document.getElementById('tutBox');if(!b)return;b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake');try{vib(20)}catch(e){}}
function tutCell(k){const st=tutSt(),ok=!!(st&&st.cell&&st.cell().some(h=>key(h.q,h.r)===k));if(!ok)tutNudge();return ok}
function tutMode(m){const st=tutSt(),ok=!!(st&&st.mode&&st.mode.includes(m));if(!ok)tutNudge();return ok}
function tutEnd(){const st=tutSt(),ok=!!(st&&st.end);if(!ok)tutNudge();return ok}
function tutClearUI(){TUT.rings.forEach(e=>e.remove());TUT.rings=[];document.querySelectorAll('.tut-hl').forEach(e=>e.classList.remove('tut-hl'))}
function tutGo(i){
 if(i>=TSTEPS.length){tutFinish();return}
 TUT.step=i;const st=TSTEPS[i],box=document.getElementById('tutBox');
 const real=TSTEPS.filter(x=>!x.wait),idx=real.indexOf(st);
 document.getElementById('tbStep').textContent=st.wait?'':tr('tutStepOf')+' '+(idx+1)+'/'+real.length;
 document.getElementById('tbSkip').textContent=tr('tutSkip');
 const nx=document.getElementById('tbNext');nx.textContent=st.final?tr('tutFin'):tr('tutNext');
 box.classList.toggle('nx',!!st.next);
 const tx=document.getElementById('tbTxt');tx.dir=(S.lang==='fa')?'rtl':'ltr';tx.textContent=tr(st.t);
 tutClearUI();
 if(st.ring){st.ring().forEach(h=>{const e=document.createElement('div');e.className='tutRing';e._h=h;document.getElementById('wrap').appendChild(e);TUT.rings.push(e)})}
 if(st.btn){const el=st.btn==='end'?document.getElementById('bEnd'):document.querySelector('#ctrl [data-m="'+st.btn+'"]');if(el)el.classList.add('tut-hl')}
 tutPlace();try{SFX.select()}catch(e){}
}
function tutPlace(){const d=Math.round(size*1.75);TUT.rings.forEach(e=>{const h=e._h.q!==undefined?e._h:null;if(!h||!(size>8)){e.style.display='none';return}
 const p=hexToPixel(h.q,h.r);e.style.display='block';e.style.width=e.style.height=d+'px';e.style.left=p.x+'px';e.style.top=p.y+'px'})}
function tutTick(){
 if(!TUT.on)return;
 if(turn===2&&!over&&!TUT.skipT){TUT.skipT=setTimeout(()=>{TUT.skipT=0;if(TUT.on&&turn===2&&!over)endTurn()},1200)}
 const st=tutSt();if(st&&st.done&&st.done())tutGo(TUT.step+1);
 tutPlace();
}
function tutStop(){TUT.on=false;clearInterval(TUT.tick);clearTimeout(TUT.skipT);TUT.skipT=0;tutClearUI();document.body.classList.remove('tut');requestAnimationFrame(()=>{try{resize()}catch(e){}})}
function tutFinish(){S.tutDone=true;syncSet();tutStop();leaveToMenu()}
function startTutorial(){
 NET.cleanup();onlineMode=null;updateNetStatus();$('#modal').classList.remove('on');
 TUT.on=true;document.body.classList.add('tut');show('game');newGame(false,1,'classic');
 TUT.S=units.find(u=>u.id===2);TUT.P=units.find(u=>u.id===3);TUT.E=units.find(u=>u.id===7);TUT.hp0=TUT.S.hp;
 const t=o2a(2,4);TUT.T1={q:t.q,r:t.r};
 mode='move';sel=null;refresh();
 clearInterval(TUT.tick);TUT.tick=setInterval(tutTick,120);
 requestAnimationFrame(()=>{try{resize()}catch(e){}tutGo(0)});
}
document.getElementById('tbNext').onclick=()=>{if(!TUT.on)return;const st=tutSt();if(st&&st.final)tutFinish();else tutGo(TUT.step+1)};
document.getElementById('tbSkip').onclick=()=>{if(!TUT.on)return;tutStop();leaveToMenu()};
window.addEventListener('resize',()=>{if(TUT.on)setTimeout(tutPlace,150)});
/* پیشنهاد آموزش در اولین اجرا (بعد از پایان لودینگ) */
(function(){if(S.tutAsked||S.tutDone)return;const w=setInterval(()=>{if(document.getElementById('ld'))return;clearInterval(w);setTimeout(()=>{
 if(S.tutAsked||S.tutDone||TUT.on)return;S.tutAsked=true;syncSet();
 modal('<b style="color:var(--amber-core)">🎓 '+tr('tut')+'</b><br><br>'+tr('tutAsk')+'<br><br><button class="btn" id="bTutYes" style="width:100%;border-color:var(--amber-core);color:var(--amber-core)">'+tr('tutYes')+'</button><button class="btn" id="bTutNo" style="width:100%;margin-top:8px">'+tr('tutLater')+'</button>');
 $('#bTutYes').onclick=()=>startTutorial();$('#bTutNo').onclick=()=>$('#modal').classList.remove('on')},1400)},300)})();
