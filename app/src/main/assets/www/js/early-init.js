(function(){var l='fa';try{l=JSON.parse(localStorage.getItem('nc')||'{}').lang||'fa'}catch(e){}
document.documentElement.setAttribute('data-l',l);document.body.classList.add('ld-wait');
setTimeout(function(){document.body.classList.remove('ld-wait');var e=document.getElementById('ld');if(e&&e.className.indexOf(' out')<0)e.className+=' out'},25000)})();