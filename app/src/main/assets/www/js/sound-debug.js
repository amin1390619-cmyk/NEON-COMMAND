
(function(){const d=document.getElementById('sndDbg');
 d.onclick=()=>{const a=audio();tone(880,.18,'sine',.25);setTimeout(()=>tone(1320,.18,'sine',.25),180)};
 setInterval(()=>{if(location.hash!=='#debug'||typeof onlineMode==='undefined'||!onlineMode){d.style.display='none';return}
  d.style.display='block';
  d.textContent='🔊 '+(AC?AC.state:'no-ctx')+' · snd:'+(S.sound?'ON':'OFF')+' · '+(onlineMode==='host'?'tx:'+(window._tx||0):'rx:'+(window._rx||0))+' · tap=test'},500)})();
