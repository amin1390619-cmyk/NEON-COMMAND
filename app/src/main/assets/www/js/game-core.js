
'use strict';
const C={cyan:'#00E5FF',red:'#FF3B5C',violet:'#A855F7',amber:'#FFD166',silver:'#E5E7EB'};
const $=s=>document.querySelector(s);
/* ---------- تنظیمات و صدا ---------- */
const S={sound:true,grid:true};
/* لرزش (اندروید): الگوی ms یا عدد؛ با گزینهٔ تنظیمات خاموش می‌شود */
/* آیکون‌های نئونی دکمهٔ صدا (روشن / خاموش) */
const SND_ON='img/snd-on.png',SND_OFF='img/snd-off.png';
const vib=p=>{try{if(S.vib!==false&&navigator.vibrate)navigator.vibrate(p)}catch(e){}};
try{Object.assign(S,JSON.parse(localStorage.getItem('nc')||'{}'))}catch(e){}
/* ---------- i18n (EN / FA) ---------- */
S.lang=S.lang||'fa';if(S.music===undefined)S.music=S.sound;S.aiLevel=S.aiLevel||'medium';
const LANGS={
en:{mapTitle:'CHOOSE MAP',mapBack:'BACK',mapObs:'obstacles',mapRep:'repair tiles',tut:'INTERACTIVE TUTORIAL',tutAsk:'New here? Try the short interactive tutorial (about 2 minutes).',tutYes:'START TUTORIAL',tutLater:'LATER',tutNext:'NEXT',tutSkip:'SKIP',tutFin:'FINISH',tutStepOf:'STEP',tp0:'Welcome, Commander! Your goal: destroy the enemy core, or hold all 3 purple tiles for 3 turns in a row.',tp1:'Tap your Soldier (the glowing ring) to select it.',tp2:'Each unit moves 1 tile per turn. Tap the highlighted tile to move next to the enemy.',tp3:'Now press ATTACK.',tp4:'Tap the red Soldier to attack it. Moving and attacking each cost 1 action point (you get 2 per turn).',tp5:'You are out of action points. Press END TURN.',tpW:'Enemy turn…',tp6:'Your Support can heal allies. Tap the Support.',tp7:'Now press ABILITY.',tp8:'Tap your wounded Soldier to heal it.',tp9:'Capture the 3 purple tiles and hold them for 3 turns in a row to win. Obstacles block movement; repair tiles heal at the start of your turn.',tp10:'You are ready! Good luck, Commander.',map:'MAP',map_classic:'Classic',map_reactor:'Reactor',local:'2 PLAYER',online:'ONLINE',host:'HOST',join:'JOIN',vsai:'PLAYER VS AI🤖',howBtn:'HOW TO PLAY',settings:'SETTINGS',
 move:'MOVE',attack:'ATTACK',ability:'ABILITY',endTurn:'END TURN',close:'CLOSE',aiThink:'AI IS THINKING...',
 player:'PLAYER',ai:'(AI)',you:'(YOU)',hold:'HOLD',hp:'HP',atk:'ATK',range:'RANGE',mv:'MOVE',cd:'CD',selectUnit:'SELECT A UNIT',
 u_soldier:'SOLDIER',u_archer:'ARCHER',u_heavy:'HEAVY',u_support:'SUPPORT',u_sniper:'SNIPER',u_core:'CORE',
 wins:'WINS',firstTitle:'WHO GOES FIRST?',firstGoes:'STARTS FIRST',whyCore:'CORE DESTROYED',whyObj:'ALL OBJECTIVES HELD ×3',
 connLost:'CONNECTION LOST',oppLeft:'OPPONENT LEFT',
 hostTitle:'🌐 HOST A GAME',hostShare:'Share this code with your opponent (WhatsApp/Telegram):',hostGen:'GENERATING CODE...',hostWait:'WAITING FOR OPPONENT TO JOIN...',
 copy:'📋 COPY',cancel:'CANCEL',err:'ERROR: ',
 joinTitle:'🌐 JOIN A GAME',joinPaste:'Paste the room code from your opponent:',connect:'CONNECT',enterCode:'ENTER A CODE',connecting:'CONNECTING...',
 noNetTitle:'ONLINE UNAVAILABLE',noNetMsg:'PeerJS failed to load or the network is blocked.',
 backTitle:'BACK TO MENU?',backOnline:'The online game will end for both players.',backLocal:'The current game will be lost.',yesLeave:'YES, LEAVE',
 setTitle:'SETTINGS',gAccTitle:'ACCOUNT',gConnect:'Connect Google Account',gConnecting:'Connecting…',gOk:'Account connected',gNone:'No account connected',gErrOffline:'No internet connection. Check your connection and try again.',gErrCancel:'Sign-in cancelled.',gErrNoAcc:'No Google account found on this device. Add one in Android settings and try again.',gErrUnavail:'Google sign-in is not available on this device. Update Google Play services and try again.',gErrFail:'Sign-in failed. Please try again.',gErrApp:'Google sign-in works only in the Android app.',support:'SUPPORT',supportBtn:'CONTACT',setAudio:'AUDIO',vib:'VIBRATION',fs:'FULLSCREEN',gfxOpt:'GRAPHICS ENGINE',fpsOpt:'FPS COUNTER',setDisplay:'DISPLAY',setGame:'GAME',whyTime:'THE OTHER PLAYER RAN OUT OF TIME 3 TIMES',confirmEnd:'CONFIRM END TURN',endAsk1:'You still have ',endAsk2:' AP left. End your turn anyway?',yesEnd:'YES, END TURN',again:'PLAY AGAIN',rmWait:'WAITING FOR OPPONENT...',rmAsk:'OPPONENT WANTS TO PLAY AGAIN!',aiName:'AI',aiLvTitle:'CHOOSE AI DIFFICULTY',lv_easy:'EASY',lv_medium:'NORMAL',lv_hard:'HARD',lvd_easy:'Great for learning. The AI makes many mistakes.',lvd_medium:'A fair fight. The AI sometimes slips.',lvd_hard:'No mercy. The AI plays its best.',m1:'METHOD 1',m1s:'Room code',m2:'METHOD 2',m2s:'Wi-Fi / Hotspot',
 lanNote:'Method 2 works without internet. Both phones must be on the same Wi-Fi, or one phone connects to the other one\'s hotspot.',
 lanHostShare:'Your room is visible to nearby phones. Or tell your opponent this address:',lanStarting:'STARTING...',
 lanRooms:'ROOMS NEAR YOU',lanScanning:'Searching...',lanManual:'Or enter the host address:',
 lanAppOnly:'Wi-Fi mode works only in the Android app.',lanBadAddr:'Invalid address. Example: 192.168.43.1',lanNoNet:'No Wi-Fi or hotspot found. Connect to Wi-Fi or turn on your hotspot.',lanConnFail:'Could not connect. Check the address and make sure both phones are on the same network.',lanSlow:'No answer yet. Make sure Wi-Fi or your hotspot is ON and turn OFF any VPN.',lanVpn:'VPN is ON. Turn it OFF for Wi-Fi mode.',
 sound:'SOUND EFFECTS',music:'MUSIC',grid:'GRID',fxOpt:'VISUAL EFFECTS',language:'LANGUAGE',langName:'فارسی',on:'ON',off:'OFF',menuTip:'Menu',
 how:`<div class="ht">
<h2>HOW TO PLAY</h2>
<div class="sub">Learn the basics in one minute.</div>

<h3>🎯 GOAL</h3>
<div class="goal">You command a squad on a hex battlefield. There are two ways to win:
<ul>
<li><b>Destroy the enemy Core</b> (◆). It has 20 HP.</li>
<li><b>Hold all 3 purple Objective tiles</b> for 3 turns in a row.</li>
</ul></div>

<h3>🎲 STARTING THE GAME</h3>
<div class="t">Before the game starts, a quick draw decides who plays first. In online games, the host does the draw.</div>

<h3>👆 YOUR FIRST TURN, STEP BY STEP</h3>
<ol>
<li><b>Tap one of your units.</b> Its stats appear at the bottom.</li>
<li><b>Tap one of the buttons at the bottom:</b>
<ul>
<li><b style="color:var(--neon-cyan)">MOVE</b>: cyan tiles are where it can go. Tap one.</li>
<li><b style="color:var(--signal-red)">ATTACK</b>: enemies in range turn red. Tap one.</li>
<li><b style="color:var(--ion-violet)">ABILITY</b>: Support only. Heals a wounded teammate.</li>
</ul></li>
<li>When you're done, tap <b>END TURN</b>.</li>
</ol>

<h3>⚡ ACTION POINTS (AP)</h3>
<ul>
<li>Each turn you get <b>2 AP</b> (the two dots at the top of the screen).</li>
<li>Moving, attacking or healing costs <b>1 AP</b> each.</li>
<li>Every unit can <b>move once</b> and <b>attack or use its ability once</b> per turn. It can move first and then attack.</li>
<li>If you still have AP and tap END TURN, the game asks if you're sure. You can turn this off in Settings.</li>
</ul>

<h3>🪖 UNITS</h3>
<div class="u"><b style="color:var(--neon-cyan)">SOLDIER</b><span class="ustat">HP 10 · ATK 3 · RANGE 1</span>Balanced all-rounder.</div>
<div class="u"><b style="color:var(--neon-cyan)">ARCHER</b><span class="ustat">HP 6 · ATK 2 · RANGE 3</span>Strikes from a distance.</div>
<div class="u"><b style="color:var(--neon-cyan)">HEAVY</b><span class="ustat">HP 16 · ATK 4 · RANGE 1</span>Tough, but can only attack every other turn.</div>
<div class="u"><b style="color:var(--neon-cyan)">SUPPORT</b><span class="ustat">HP 8 · ATK 1 · RANGE 2</span>Heals a wounded teammate for 2 HP (not itself). Can heal again after 3 turns.</div>
<div class="u"><b style="color:var(--neon-cyan)">SNIPER</b><span class="ustat">HP 5 · ATK 5 · RANGE 4</span>High damage and range, but very fragile.</div>
<div class="u" style="border-inline-start-color:var(--signal-red)"><b style="color:var(--signal-red)">CORE ◆</b><span class="ustat">HP 20</span>Cannot move or attack. If it is destroyed, you lose.</div>
<div class="t">"Range" is how many tiles away a unit can strike. Every unit moves 1 tile per turn.</div>

<h3>🗺 SPECIAL TILES</h3>
<div class="t"><b style="color:var(--ion-violet)">◆ PURPLE · Objective</b><br>Hold all three with your units at the end of your turn, and keep them for <b>3 turns in a row</b>. The counter at the top (HOLD 1/3) shows your progress.</div>
<div class="t"><b style="color:var(--neon-cyan)">✚ CYAN · Repair</b><br>A unit standing here at the start of its turn heals 2 HP.</div>
<div class="t"><b style="color:#8b93a7">✕ GREY · Obstacle</b><br>Blocks movement, but attacks can fly over it.</div>

<h3>⏱ TURN TIMER (ONLINE ONLY)</h3>
<div class="t">Each turn lasts <b>20 seconds</b>. Every time the timer runs out, you lose a heart ♥. Hearts do not come back, and when you lose all 3, you lose the game.</div>

<h3>PLAYING VS AI🤖</h3>
<div class="t">There are three levels: <b>EASY</b> (great for learning, makes many mistakes), <b>NORMAL</b> (a fair fight) and <b>HARD</b> (plays its best).</div>

<h3>💡 TIPS</h3>
<div class="tip">Bring wounded units to the Repair tiles.</div>
<div class="tip">A red <b style="color:var(--signal-red)">-X</b> above a target shows how much damage you will deal.</div>
<div class="tip">Never leave your Core undefended.</div>
</div>`},
fa:{mapTitle:'انتخاب نقشه',mapBack:'بازگشت',mapObs:'مانع',mapRep:'خانهٔ ترمیم',tut:'آموزش تعاملی',tutAsk:'تازه‌واردی؟ آموزش تعاملی کوتاه رو امتحان کن (حدود ۲ دقیقه).',tutYes:'شروع آموزش',tutLater:'بعداً',tutNext:'بعدی',tutSkip:'رد کردن',tutFin:'پایان',tutStepOf:'مرحله',tp0:'خوش اومدی فرمانده! هدف: نابود کردن هستهٔ دشمن، یا نگه داشتن هر ۳ خانهٔ بنفش در ۳ نوبت پشت‌سرهم.',tp1:'روی سرباز خودت (حلقهٔ زرد) بزن تا انتخاب بشه.',tp2:'هر واحد در هر نوبت یک خانه حرکت می‌کنه. روی خانهٔ مشخص‌شده بزن تا کنار دشمن بری.',tp3:'حالا دکمهٔ «حمله» رو بزن.',tp4:'روی سرباز قرمز بزن تا بهش حمله کنی. حرکت و حمله هرکدوم یک امتیاز عمل مصرف می‌کنن (در هر نوبت ۲ تا داری).',tp5:'امتیاز عملت تموم شد. «پایان نوبت» رو بزن.',tpW:'نوبت دشمن…',tp6:'پشتیبان تو می‌تونه به هم‌تیمی‌ها جان برگردونه. روی پشتیبان بزن.',tp7:'حالا دکمهٔ «توانایی» رو بزن.',tp8:'روی سربازِ زخمی بزن تا ترمیم بشه.',tp9:'خانه‌های بنفش رو بگیر و ۳ نوبت پشت‌سرهم نگه دار تا ببری. موانع جلوی حرکت رو می‌گیرن و خانه‌های ترمیم اول نوبت جان برمی‌گردونن.',tp10:'آماده‌ای! موفق باشی فرمانده.',map:'نقشه',map_classic:'کلاسیک',map_reactor:'راکتور',local:'بازی 2 نفره',online:'بازی آنلاین',host:'ساخت اتاق',join:'ورود به اتاق',vsai:'بازی با AI🤖',howBtn:'آموزش بازی',settings:'تنظیمات',
 move:'حرکت',attack:'حمله',ability:'توانایی',endTurn:'پایان نوبت',close:'بستن',aiThink:'AI در حال فکر کردن...',
 player:'بازیکن',ai:'(AI)',you:'(شما)',hold:'نگه‌داری',hp:'سلامتی',atk:'حمله',range:'برد',mv:'حرکت',cd:'انتظار',selectUnit:'یک واحد انتخاب کنید',
 u_soldier:'سرباز',u_archer:'کماندار',u_heavy:'سنگین',u_support:'پشتیبان',u_sniper:'تک‌تیرانداز',u_core:'پایگاه',
 wins:'برنده شد',firstTitle:'چه کسی اول شروع می‌کند؟',firstGoes:'اول شروع می‌کند',whyCore:'پایگاه نابود شد',whyObj:'هر سه هدف به‌مدت ۳ نوبت نگه داشته شد',
 connLost:'اتصال قطع شد',oppLeft:'حریف از بازی خارج شد',
 hostTitle:'🌐 ساخت اتاق بازی',hostShare:'این کد را برای حریفتان بفرستید (واتساپ / تلگرام):',hostGen:'در حال ساخت کد...',hostWait:'منتظر ورود حریف...',
 copy:'📋 کپی',cancel:'انصراف',err:'خطا: ',
 joinTitle:'🌐 ورود به اتاق بازی',joinPaste:'کد اتاقی را که حریفتان فرستاده وارد کنید:',connect:'اتصال',enterCode:'یک کد وارد کنید',connecting:'در حال اتصال...',
 noNetTitle:'بازی آنلاین در دسترس نیست',noNetMsg:'PeerJS لود نشد یا شبکه مسدود است.',
 backTitle:'بازگشت به منو؟',backOnline:'بازی آنلاین برای هر دو بازیکن تمام می‌شود.',backLocal:'بازی فعلی از دست می‌رود.',yesLeave:'بله، خروج',
 setTitle:'تنظیمات',gAccTitle:'حساب کاربری',gConnect:'اتصال حساب گوگل',gConnecting:'در حال اتصال…',gOk:'حساب متصل است',gNone:'حسابی متصل نیست',gErrOffline:'اینترنت وصل نیست. اتصال را بررسی کنید و دوباره تلاش کنید.',gErrCancel:'ورود لغو شد.',gErrNoAcc:'حساب گوگلی روی این دستگاه پیدا نشد. از تنظیمات اندروید یک حساب اضافه کنید و دوباره تلاش کنید.',gErrUnavail:'ورود با گوگل روی این دستگاه در دسترس نیست. Google Play Services را به‌روزرسانی کنید.',gErrFail:'ورود انجام نشد. لطفاً دوباره تلاش کنید.',gErrApp:'ورود با گوگل فقط در برنامهٔ اندروید کار می‌کند.',support:'پشتیبانی',supportBtn:'ارتباط',setAudio:'صدا',vib:'لرزش',fs:'تمام‌صفحه',gfxOpt:'موتور گرافیکی',fpsOpt:'نمایش FPS',setDisplay:'نمایش',setGame:'بازی',whyTime:'حریف ۳ بار زمان نوبتش را از دست داد',confirmEnd:'تأیید پایان نوبت',endAsk1:'هنوز ',endAsk2:' امتیاز عمل (AP) باقی مانده است. نوبت را تمام می‌کنید؟',yesEnd:'بله، پایان نوبت',again:'بازی دوباره',rmWait:'منتظر تأیید حریف...',rmAsk:'حریف می‌خواهد دوباره بازی کند!',aiName:'AI',aiLvTitle:'سطح AI را انتخاب کنید',lv_easy:'آسان',lv_medium:'متوسط',lv_hard:'سخت',lvd_easy:'مناسب یادگیری. AI زیاد اشتباه می‌کند.',lvd_medium:'مبارزه‌ای منصفانه. گاهی اشتباه می‌کند.',lvd_hard:'بدون ترحم. بهترین بازی خودش را می‌کند.',m1:'روش 1',m1s:'کد اتاق',m2:'روش 2',m2s:'Wi-Fi / هات‌اسپات',
 lanNote:'روش 2 به اینترنت نیاز ندارد. هر دو گوشی باید روی یک Wi-Fi باشند، یا یکی به هات‌اسپات دیگری وصل شود.',
 lanHostShare:'اتاق شما برای گوشی‌های اطراف نمایش داده می‌شود. یا این آدرس را به حریفتان بگویید:',lanStarting:'در حال راه‌اندازی...',
 lanRooms:'اتاق‌های اطراف',lanScanning:'در حال جستجو...',lanManual:'یا آدرس میزبان را وارد کنید:',
 lanAppOnly:'حالت Wi-Fi فقط در برنامهٔ اندروید کار می‌کند.',lanBadAddr:'آدرس نامعتبر است. مثال: 192.168.43.1',lanNoNet:'Wi-Fi یا هات‌اسپات پیدا نشد. به Wi-Fi وصل شوید یا هات‌اسپات را روشن کنید.',lanConnFail:'اتصال برقرار نشد. آدرس را بررسی کنید و مطمئن شوید هر دو گوشی روی یک شبکه‌اند.',lanSlow:'هنوز جوابی نیامده. مطمئن شوید Wi-Fi یا هات‌اسپات روشن است و VPN را خاموش کنید.',lanVpn:'VPN روشن است. برای حالت Wi-Fi آن را خاموش کنید.',
 sound:'افکت‌های صدا',music:'موسیقی',grid:'شبکه',fxOpt:'افکت‌های بصری',language:'زبان',langName:'English',on:'روشن',off:'خاموش',menuTip:'منو',
 how:`<div class="ht">
<h2>آموزش بازی</h2>
<div class="sub">اصول بازی را در یک دقیقه یاد بگیرید.</div>

<h3>🎯 هدف</h3>
<div class="goal">شما فرمانده یک تیم روی نقشه‌ی شش‌ضلعی هستید. دو راه برای بردن دارید:
<ul>
<li><b>پایگاه (◆) حریف را نابود کنید.</b> پایگاه ۲۰ سلامتی دارد.</li>
<li><b>هر ۳ خانه‌ی بنفش را</b> ۳ نوبت پشت‌سرهم نگه دارید.</li>
</ul></div>

<h3>🎲 شروع بازی</h3>
<div class="t">قبل از شروع، یک قرعه‌ی کوتاه معلوم می‌کند چه کسی اول بازی می‌کند. در بازی آنلاین، میزبان قرعه را می‌اندازد.</div>

<h3>👆 اولین نوبت شما، قدم‌به‌قدم</h3>
<ol>
<li><b>روی یکی از واحدهای خودتان بزنید.</b> مشخصاتش پایین صفحه می‌آید.</li>
<li><b>یکی از دکمه‌های پایین را بزنید:</b>
<ul>
<li><b style="color:var(--neon-cyan)">حرکت</b>: خانه‌های فیروزه‌ای جاهای قابل‌رفتن‌اند. روی یکی بزنید.</li>
<li><b style="color:var(--signal-red)">حمله</b>: دشمن‌های داخل برد قرمز می‌شوند. روی یکی بزنید.</li>
<li><b style="color:var(--ion-violet)">توانایی</b>: فقط پشتیبان. هم‌تیمی زخمی را ترمیم می‌کند.</li>
</ul></li>
<li>وقتی کارتان تمام شد، <b>پایان نوبت</b> را بزنید.</li>
</ol>

<h3>⚡ امتیاز عمل (AP)</h3>
<ul>
<li>هر نوبت <b>۲ AP</b> دارید (دو نقطه‌ی بالای صفحه).</li>
<li>حرکت، حمله یا ترمیم هرکدام <b>۱ AP</b> می‌خورد.</li>
<li>هر واحد در هر نوبت <b>یک بار حرکت</b> و <b>یک بار حمله یا توانایی</b> دارد. می‌تواند اول حرکت کند و بعد حمله کند.</li>
<li>اگر AP باقی مانده باشد و پایان نوبت بزنید، بازی می‌پرسد مطمئن هستید. این پرسش از تنظیمات خاموش می‌شود.</li>
</ul>

<h3>🪖 واحدها</h3>
<div class="u"><b style="color:var(--neon-cyan)">سرباز</b><span class="ustat">سلامتی ۱۰ · حمله ۳ · برد ۱</span>متعادل و همه‌فن‌حریف.</div>
<div class="u"><b style="color:var(--neon-cyan)">کماندار</b><span class="ustat">سلامتی ۶ · حمله ۲ · برد ۳</span>از دور می‌زند.</div>
<div class="u"><b style="color:var(--neon-cyan)">سنگین</b><span class="ustat">سلامتی ۱۶ · حمله ۴ · برد ۱</span>محکم است، ولی یک نوبت در میان می‌تواند حمله کند.</div>
<div class="u"><b style="color:var(--neon-cyan)">پشتیبان</b><span class="ustat">سلامتی ۸ · حمله ۱ · برد ۲</span>یک هم‌تیمی زخمی را ۲ سلامتی ترمیم می‌کند (نه خودش را). ۳ نوبت بعد دوباره می‌تواند.</div>
<div class="u"><b style="color:var(--neon-cyan)">تک‌تیرانداز</b><span class="ustat">سلامتی ۵ · حمله ۵ · برد ۴</span>آسیب و برد بالا، ولی خیلی شکننده است.</div>
<div class="u" style="border-inline-start-color:var(--signal-red)"><b style="color:var(--signal-red)">پایگاه ◆</b><span class="ustat">سلامتی ۲۰</span>حرکت و حمله ندارد. اگر نابود شود، می‌بازید.</div>
<div class="t">«برد» یعنی چند خانه آن‌طرف‌تر می‌تواند بزند. همه‌ی واحدها هر نوبت ۱ خانه حرکت می‌کنند.</div>

<h3>🗺 خانه‌های ویژه</h3>
<div class="t"><b style="color:var(--ion-violet)">◆ بنفش · هدف</b><br>در پایان نوبتتان هر سه را با واحدهای خودتان داشته باشید و <b>۳ نوبت پشت‌سرهم</b> نگه دارید. شمارنده‌ی بالا (نگه‌داری ۱/۳) پیشرفت را نشان می‌دهد.</div>
<div class="t"><b style="color:var(--neon-cyan)">✚ فیروزه‌ای · ترمیم</b><br>واحدی که ابتدای نوبتش روی آن باشد ۲ سلامتی می‌گیرد.</div>
<div class="t"><b style="color:#8b93a7">✕ خاکستری · مانع</b><br>جلوی حرکت را می‌گیرد، ولی حمله از رویش رد می‌شود.</div>

<h3>⏱ زمان نوبت (فقط آنلاین)</h3>
<div class="t">هر نوبت <b>۲۰ ثانیه</b> است. هر بار زمان تمام شود، یک قلب ♥ از شما کم می‌شود. قلب‌ها برنمی‌گردند و با از دست‌دادن هر ۳ قلب، بازی را می‌بازید.</div>

<h3>بازی با AI🤖</h3>
<div class="t">سه سطح دارد: <b>آسان</b> (برای یادگیری، زیاد اشتباه می‌کند)، <b>متوسط</b> (مبارزه‌ی منصفانه) و <b>سخت</b> (بهترین بازی خودش را می‌کند).</div>

<h3>💡 نکته‌ها</h3>
<div class="tip">واحدهای زخمی را به خانه‌ی ترمیم ببرید.</div>
<div class="tip">عدد قرمز <b style="color:var(--signal-red)">-X</b> بالای هدف نشان می‌دهد چه آسیبی می‌زنید.</div>
<div class="tip">پایگاهتان را بی‌دفاع نگذارید.</div>
</div>`}};
const tr=k=>{const d=LANGS[S.lang]||LANGS.en;return d[k]!==undefined?d[k]:(LANGS.en[k]!==undefined?LANGS.en[k]:k)};
function applyLang(){
  const fa=S.lang==='fa';
  document.documentElement.lang=fa?'fa':'en';
  document.body.classList.toggle('fa',fa);
  ['#modal','#netModal'].forEach(q=>{const e=$(q);if(e)e.dir=fa?'rtl':'ltr'});
  document.querySelectorAll('[data-i18n]').forEach(e=>{e.textContent=tr(e.dataset.i18n);e.dir=fa?'rtl':'ltr';e.style.unicodeBidi='isolate'});
  const mb=$('#bMenu');if(mb)mb.title=tr('menuTip');
  mapLabel();
}

let AC=null;
const audio=()=>{if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)();
 AC.onstatechange=()=>{if(AC.state==='running'&&S.music&&!music&&!over&&document.querySelector('#game.on'))startMusic()}}catch(e){}}
 if(AC&&AC.state!=='running')try{AC.resume()}catch(e){}return AC};
/* وقتی برنامه به پس‌زمینه می‌رود صدا قطع شود و با برگشتن ادامه یابد */
document.addEventListener('visibilitychange',()=>{try{if(!AC)return;if(document.hidden)AC.suspend();else if(S.sound||S.music)AC.resume()}catch(e){}});
/* باز کردن قفل صدا: مرورگر فقط با click/touchend/pointerup/keydown اجازه‌ی پخش می‌دهد (نه pointerdown) */
const _unlockEv=['pointerup','touchend','click','keydown'];
const unlockAudio=()=>{const a=audio();if(a&&a.state==='running')_unlockEv.forEach(ev=>removeEventListener(ev,unlockAudio,true))};
_unlockEv.forEach(ev=>addEventListener(ev,unlockAudio,true));
function tone(f,d,type,v,t0,f2){const a=audio();if(!a||!S.sound)return;const o=a.createOscillator(),g=a.createGain(),t=a.currentTime+(t0||0);
 o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(Math.max(20,f2),t+d);
 g.gain.setValueAtTime(v||.15,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+d+.02)}
function noise(d,v,hp){const a=audio();if(!a||!S.sound)return;const n=a.sampleRate*d|0,b=a.createBuffer(1,n,a.sampleRate),c=b.getChannelData(0);
 for(let i=0;i<n;i++)c[i]=(Math.random()*2-1)*Math.pow(1-i/n,1.4);const s=a.createBufferSource(),g=a.createGain();
 g.gain.setValueAtTime(v||.2,a.currentTime);g.gain.exponentialRampToValueAtTime(.001,a.currentTime+d);
 if(hp){const f=a.createBiquadFilter();f.type='highpass';f.frequency.value=hp;s.connect(f);f.connect(g)}else s.connect(g);
 g.connect(a.destination);s.buffer=b;s.start()}
/* افکت‌های صوتی ارتقایافته – نئون / سایبر / تاکتیکال */
const SFX={
  move:()=>{tone(720,.045,'square',.09);tone(1100,.03,'square',.05,.02)},
  atk:()=>{noise(.14,.32,400);tone(180,.12,'sawtooth',.22);tone(90,.18,'sine',.15)},
  snipe:()=>{tone(2200,.05,'sawtooth',.12);tone(1800,.09,'sawtooth',.08,.03,400);noise(.1,.22,1200);setTimeout(()=>noise(.08,.18,600),90)},
  heal:()=>{tone(520,.4,'sine',.16,0,980);tone(780,.25,'triangle',.1,.08,1200);noise(.06,.08,3000)},
  die:()=>{noise(.22,.35,200);tone(160,.2,'sawtooth',.2,0,40);tone(80,.28,'sine',.18)},
  select:()=>{tone(640,.04,'triangle',.08);tone(960,.03,'sine',.05,.025)},
  click:()=>{tone(880,.035,'square',.07)},
  end:()=>{tone(440,.08,'triangle',.12);tone(660,.1,'triangle',.1,.07)},
  tick:()=>{tone(980,.06,'square',.09)},
  warn:()=>{tone(720,.07,'square',.11);tone(540,.09,'square',.09,.06)},
  win:()=>{[523,659,784,1047,1319].forEach((f,i)=>tone(f,.28,'triangle',.17,i*.11));
           setTimeout(()=>{tone(1047,.4,'sine',.12);tone(1319,.5,'triangle',.1,.05)},550)},
  error:()=>{tone(220,.15,'sawtooth',.14);tone(180,.18,'square',.1,.05)}
};
/* آنلاین: مهمان فقط وضعیت را دریافت می‌کند، پس میزبان رویداد صدا را هم برایش می‌فرستد */
SFX._o={};Object.keys(SFX).forEach(k=>{if(k==='_o')return;const f=SFX[k];SFX._o[k]=f;
 if(k!=='win')SFX[k]=()=>{f();try{if(onlineMode==='host'){NET.send({t:'sfx',n:k});window._tx=(window._tx||0)+1}}catch(e){}}});
function syncSet(){const a=$('#tSound'),b=$('#tGrid');{const fb=$('#tFx');if(fb)fb.textContent=S.fx!==false?tr('on'):tr('off')}if(a)a.textContent=S.sound?tr('on'):tr('off');if(b)b.textContent=S.grid?tr('on'):tr('off');const lg=$('#tLang');if(lg)lg.textContent=tr('langName');const mu=$('#tMusic');if(mu)mu.textContent=S.music?tr('on'):tr('off');const cf=$('#tConfirm');if(cf)cf.textContent=S.confirmEnd!==false?tr('on'):tr('off');const vb=$('#tVib');if(vb)vb.textContent=S.vib!==false?tr('on'):tr('off');const fb=$('#tFs');if(fb)fb.textContent=S.fs!==false?tr('on'):tr('off');const fp=$('#tFps');if(fp)fp.textContent=S.fps!==false?tr('on'):tr('off');const gv=$('#gV');if(gv)gv.textContent=S.gfx==='canvas'?'Canvas':'PixiJS';
 document.querySelectorAll('.mute').forEach(m=>{m.innerHTML='<img src="'+((S.sound||S.music)?SND_ON:SND_OFF)+'" alt="">'});
 [['tSound',S.sound],['tMusic',S.music],['tGrid',S.grid],['tFx',S.fx!==false],['tConfirm',S.confirmEnd!==false],['tVib',S.vib!==false],['tFps',S.fps!==false]].forEach(([id,v])=>{const e=$('#'+id);if(e)e.classList.toggle('on',!!v)});
 try{localStorage.setItem('nc',JSON.stringify(S))}catch(e){}}
/* ---------- موسیقی پس‌زمینه: سینت‌ویو تولیدشده با WebAudio (بدون فایل صوتی؛ نت‌ها بالاتر از ۱۱۰ هرتز تا روی بلندگوی گوشی شنیده شوند) ---------- */
let music=null;
const MIDI=n=>440*Math.pow(2,(n-69)/12);
const PROG=[{r:45,t:[57,60,64],a:[69,72,76,72]},{r:41,t:[53,57,60],a:[65,69,72,69]},{r:48,t:[55,60,64],a:[72,76,79,76]},{r:43,t:[55,59,62],a:[71,74,79,74]}];
const ARP=[0,1,2,1,0,1,2,3],BPM=104,SPB=60/BPM/2;
function startMusic(){
  if(!S.music||music)return;const a=audio();if(!a)return;
  const bus=a.createGain(),lp=a.createBiquadFilter();
  lp.type='lowpass';lp.frequency.value=2400;bus.gain.value=0;
  bus.gain.linearRampToValueAtTime(1,a.currentTime+1.5);bus.connect(lp);lp.connect(a.destination);
  const voice=(type,f,t,dur,vol,att)=>{const o=a.createOscillator(),g=a.createGain();o.type=type;o.frequency.value=f;
    g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(vol,t+(att||.01));g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    o.connect(g);g.connect(bus);o.start(t);o.stop(t+dur+.05)};
  const hat=(t)=>{const n=a.sampleRate*.04|0,b=a.createBuffer(1,n,a.sampleRate),c=b.getChannelData(0);
    for(let i=0;i<n;i++)c[i]=(Math.random()*2-1)*(1-i/n);const src=a.createBufferSource(),hp=a.createBiquadFilter(),g=a.createGain();
    hp.type='highpass';hp.frequency.value=6000;g.gain.value=.05;src.buffer=b;src.connect(hp);hp.connect(g);g.connect(bus);src.start(t)};
  const kick=(t)=>{const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.setValueAtTime(190,t);o.frequency.exponentialRampToValueAtTime(60,t+.12);
    g.gain.setValueAtTime(.35,t);g.gain.exponentialRampToValueAtTime(.001,t+.14);o.connect(g);g.connect(bus);o.start(t);o.stop(t+.16)};
  let step=0,nextT=a.currentTime+.12;
  const play=(st,t)=>{const ch=PROG[(st>>3)&3],k=st&7;
    voice('sawtooth',MIDI(ch.r),t,SPB*.9,.09,.005);                  /* باس */
    voice('square',MIDI(ch.r+12),t,SPB*.6,.025,.005);                 /* هارمونیک باس برای شنیده‌شدن روی بلندگو */
    voice('triangle',MIDI(ch.a[ARP[k]]),t,SPB*1.4,.09,.01);          /* آرپژ */
    if(k===0)ch.t.forEach(n=>voice('triangle',MIDI(n),t,SPB*8,.035,.4)); /* پد */
    if(k===0||k===4)kick(t);if(k===2||k===6)hat(t)};
  const timer=setInterval(()=>{
    if(a.state!=='running'){nextT=a.currentTime+.12;return}
    while(nextT<a.currentTime+.4){play(step,nextT);nextT+=SPB;step++}},100);
  music={bus,timer};
}
function stopMusic(){if(!music)return;const m=music;music=null;clearInterval(m.timer);
  try{const a=AC;m.bus.gain.cancelScheduledValues(a.currentTime);m.bus.gain.setValueAtTime(m.bus.gain.value,a.currentTime);m.bus.gain.linearRampToValueAtTime(0,a.currentTime+.3)}catch(e){}
  setTimeout(()=>{try{m.bus.disconnect()}catch(e){}},500)}
const startAmbient=startMusic,stopAmbient=stopMusic;
const setSound=v=>{S.sound=v;S.music=v;syncSet();if(!v)stopMusic();else if($('#game').classList.contains('on')&&!over)startMusic()};
/* ---------- آمار واحدها ---------- */
const STATS={soldier:{hp:10,atk:3,range:1,move:1},archer:{hp:6,atk:2,range:3,move:1},
 heavy:{hp:16,atk:4,range:1,move:1},support:{hp:8,atk:1,range:2,move:1},sniper:{hp:5,atk:5,range:4,move:1},core:{hp:20,atk:0,range:0,move:0}};
const GLYPH={soldier:'S',archer:'A',heavy:'H',support:'+',sniper:'X',core:'◆'};
/* ---------- مختصات axial ---------- */
const N=8, DIRS=[[1,0],[1,-1],[0,-1],[-1,0],[-1,1],[0,1]];
const o2a=(c,r)=>({q:c-((r-(r&1))>>1),r});
const key=(q,r)=>q+','+r;
const cells=[];for(let r=0;r<N;r++)for(let c=0;c<N;c++)cells.push(o2a(c,r));
const cellSet=new Set(cells.map(h=>key(h.q,h.r)));
/* ---------- نقشه‌ها (v1.8.7) ----------
   مختصات به‌صورت [ستون، ردیف] روی صفحهٔ ۸×۸ است. هر نقشه دقیقاً ۳ خانهٔ هدف دارد.
   bg: تصویر پس‌زمینهٔ نقشه (آدرس یا data:URI)؛ اگر خالی باشد از bgCss استفاده می‌شود. */
const MAPS={
 classic:{obj:[[3,3],[4,3],[3,4]],obs:[[3,2],[4,5],[2,3],[5,4]],rep:[[0,4],[7,3]],bg:'',bgCss:''},
 reactor:{obj:[[4,3],[3,4],[4,4]],obs:[[3,5],[4,2],[2,3],[5,4],[2,1],[5,6]],rep:[[0,2],[7,5]],bg:'',
  bgCss:''}
};
const MAP_IDS=Object.keys(MAPS),MAP_DIM=.5;   /* MAP_DIM: تیرگی روی تصویر برای خوانایی خانه‌ها */
const OBJ=[],OBSTACLES=new Set(),REPAIR=new Set();let curMap='classic';
function setMap(id){
 if(!MAPS[id])id='classic';curMap=id;const m=MAPS[id],k=([c,r])=>{const h=o2a(c,r);return key(h.q,h.r)};
 OBJ.length=0;m.obj.forEach(x=>OBJ.push(k(x)));
 OBSTACLES.clear();m.obs.forEach(x=>OBSTACLES.add(k(x)));
 REPAIR.clear();m.rep.forEach(x=>REPAIR.add(k(x)));
 const w=document.getElementById('wrap');
 if(w){if(m.bg)w.style.background='linear-gradient(rgba(11,15,26,'+MAP_DIM+'),rgba(11,15,26,'+MAP_DIM+')),url('+m.bg+') center/cover no-repeat';
  else w.style.background=m.bgCss||''}
}
setMap('classic');
const neighbors=(q,r)=>DIRS.map(d=>({q:q+d[0],r:r+d[1]})).filter(h=>cellSet.has(key(h.q,h.r)));
/* ---------- وضعیت بازی (hoisted برای رفع TDZ) ---------- */
let units,turn,ap,sel,mode,moveSet,atkSet,healSet,holdStreak,over=false,hover=null,aiMode=false,fx=[],shake=0,shakeT=0,objPrev={},holdPrev={1:0,2:0},lastTurnSeen=0,_pm=null,_pa=null,_ph=null,_ps=null,hlT=0,tileScale=1;
const TURN_SEC=20,MAX_TIMEOUTS=3;let turnEnd=performance.now()+TURN_SEC*1000,_lastBeep=-1,timeouts={1:0,2:0},_auto=false;
let aiGen=0,aiFocus=null,aiLast={},aiActs={},aiRank=null,aiTurnNo=0;
function mk(id,owner,type,c,r){const s=STATS[type],a=o2a(c,r);
 return{id,owner,type,hp:s.hp,maxHp:s.hp,atk:s.atk,range:s.range,move:s.move,hasMoved:false,hasAttacked:false,cooldown:0,q:a.q,r:a.r}}
function newGame(isAI=false,first,mapId){setMap(mapId||S.map||'classic');objPrev={};
 if(PX){try{PX.unitC.removeChildren().forEach(o=>{try{o.destroy({children:true})}catch(e){}})}catch(e){}PX.units=new Map()}   /* بازی تازه: اسپرایت‌های بازی قبل را پاک کن */holdPrev={1:0,2:0};lastTurnSeen=0;aiMode=isAI;timeouts={1:0,2:0};turnEnd=performance.now()+TURN_SEC*1000;rmMine=false;rmTheirs=false;
 units=[mk(1,1,'core',0,7),mk(2,1,'soldier',1,7),mk(3,1,'archer',0,6),mk(4,1,'heavy',1,6),mk(5,1,'support',2,7),mk(11,1,'sniper',1,5),
        mk(6,2,'core',7,0),mk(7,2,'soldier',6,0),mk(8,2,'archer',7,1),mk(9,2,'heavy',6,1),mk(10,2,'support',5,0),mk(12,2,'sniper',6,2)];
 if(typeof TUT!=='undefined'&&TUT.on){units=tutUnits();first=1}   /* آموزش: صحنهٔ ساده و ثابت */
 turn=(first===1||first===2)?first:(Math.random()<.5?1:2);lastTurnSeen=turn;ap=2;sel=null;mode='move';moveSet=new Set();atkSet=new Set();healSet=new Set();holdStreak={1:0,2:0};over=false;fx=[];
 aiGen++;aiFocus=null;aiLast={};aiRank=null;aiTurnNo=0;$('#ai-think').style.display='none';stopAmbient();startAmbient();refresh();
 /* قرعهٔ نوبت اول: انیمیشن، سپس تایمر و (در صورت نوبت AI) شروع AI */
 const introMs=(typeof TUT!=='undefined'&&TUT.on)?(introActive=false,0):playIntro(turn);_qHold=performance.now()+introMs+3000;turnEnd=performance.now()+introMs+TURN_SEC*1000;
 if(isAI&&turn===2){const g=aiGen;setTimeout(()=>{if(g===aiGen)AITurn()},introMs+400)}}
/* ---------- قرعهٔ نوبت اول (انیمیشن) ---------- */
let _introT=[],introActive=false,firstIntroDone=false;
const FIRST_INTRO_LEAD_MS=300;   /* فقط اولین قرعه بعد از باز شدن برنامه: چند لحظه دیرتر شروع شود تا نقشه کامل باز شود */   /* تا پایان قرعه، نوار بالا و کنترل‌ها نباید نشان دهند چه کسی شروع می‌کند */
function playIntro(first){
 _introT.forEach(clearTimeout);_introT=[];
 const ov=$('#firstOv');if(!ov)return 0;
 introActive=true;refresh();
 const w=[$('#foP1'),$('#foP2')],nm=p=>(aiMode&&p===2)?tr('aiName'):tr('player')+' '+p;
 const sub=p=>(onlineMode&&((onlineMode==='host')===(p===1)))?tr('you'):'';
 [1,2].forEach(p=>{w[p-1].querySelector('.fo-c').innerHTML='<div>'+nm(p)+(sub(p)?'<br><small>'+sub(p)+'</small>':'')+'</div>';w[p-1].classList.remove('hi','win')});
 $('#foT').textContent=tr('firstTitle');$('#foT').classList.remove('res');$('#foT').dir=(S.lang==='fa')?'rtl':'ltr';   /* جهت متن با زبان: AI و فارسی درست کنار هم بنشینند */$('#foR').textContent='';
 const lead=firstIntroDone?0:FIRST_INTRO_LEAD_MS;firstIntroDone=true;
 ov.classList.remove('out');
 if(lead)_introT.push(setTimeout(()=>ov.classList.add('on'),lead));else ov.classList.add('on');
 const fast=RM||S.fx===false,delays=fast?[]:[70,70,70,80,95,115,140,175,225,290,380],n=delays.length;
 const off=(((first-1)-(n-1))%2+2)%2;   /* آخرین قدم دقیقاً روی برنده می‌نشیند */
 let t=lead;
 delays.forEach((d,s)=>{const side=(s+off)%2;
  _introT.push(setTimeout(()=>{w[0].classList.toggle('hi',side===0);w[1].classList.toggle('hi',side===1);try{tone(520+s*35,.04,'square',.05)}catch(e){}},t));t+=d});
 const land=t+(fast?0:120);
 _introT.push(setTimeout(()=>{w[0].classList.toggle('hi',first===1);w[1].classList.toggle('hi',first===2);w[first-1].classList.add('win');
  introActive=false;refresh();   /* قرعه تمام شد: حالا نوار بالا واقعی می‌شود */
  $('#foT').textContent=nm(first)+' · '+tr('firstGoes');$('#foT').classList.add('res');try{tone(784,.12,'triangle',.15);tone(1047,.22,'triangle',.15,.1)}catch(e){}},land));
 _introT.push(setTimeout(()=>ov.classList.add('out'),land+800));
 _introT.push(setTimeout(()=>ov.classList.remove('on'),land+1100));
 return land+1100}
const unitAt=(q,r)=>units.find(u=>u.q===q&&u.r===r&&u.hp>0);
/* BFS — فاز ۵: موانع مسدودکننده هستند */
function getMoves(u){
 const out=new Set(),seen=new Set([key(u.q,u.r)]);let fr=[{q:u.q,r:u.r}];
 for(let d=0;d<u.move;d++){const nx=[];
  for(const h of fr)for(const n of neighbors(h.q,h.r)){const k=key(n.q,n.r);
   if(seen.has(k)||unitAt(n.q,n.r)||OBSTACLES.has(k))continue;
   seen.add(k);out.add(k);nx.push(n)}
  fr=nx}
 return out;
}
const dist=(a,b)=>{const dq=a.q-b.q,dr=a.r-b.r;return(Math.abs(dq)+Math.abs(dr)+Math.abs(dq+dr))/2};
const canAttack=u=>u.atk>0&&!u.hasAttacked&&!(u.type==='heavy'&&u.cooldown>0);
const canHeal=u=>u.type==='support'&&!u.hasAttacked&&u.cooldown===0;
function select(u){sel=u;moveSet=new Set();atkSet=new Set();healSet=new Set();
 if(!u||u.hp<=0||u.owner!==turn||ap<1||over)return;
 if(mode==='move'&&!u.hasMoved&&u.move>0)moveSet=getMoves(u);
 if(mode==='attack'&&canAttack(u))units.forEach(t=>{if(t.hp>0&&t.owner!==u.owner&&dist(u,t)<=u.range)atkSet.add(key(t.q,t.r))});
 if(mode==='ability'&&canHeal(u))units.forEach(t=>{if(t.hp>0&&t!==u&&t.owner===u.owner&&t.hp<t.maxHp&&dist(u,t)<=u.range)healSet.add(key(t.q,t.r))});
 if(u&&u.owner===turn)SFX.select()}
function attack(u,t){
 const a=hexToPixel(u.q,u.r),b=hexToPixel(t.q,t.r);
 const dmg=Math.min(u.atk,t.hp);
 {const dx=b.x-a.x,dy=b.y-a.y,L=Math.hypot(dx,dy)||1,nw=performance.now(),pd=u.type==='sniper'?300:180;
  u.lunge={t0:nw,ux:dx/L,uy:dy/L,amp:u.range>1?.12:.34};t.kb={t0:nw+pd,ux:dx/L,uy:dy/L}}
 fx.push({k:'proj',x1:a.x,y1:a.y,x2:b.x,y2:b.y,t0:performance.now(),col:u.owner===1?C.cyan:C.red,dur:u.type==='sniper'?300:180});
 fx.push({k:'dmg',x:b.x,y:b.y,txt:'-'+dmg,t0:performance.now(),col:C.red,dur:750});
 t.hp=Math.max(0,t.hp-u.atk);t.hitT=performance.now();if(t.hp===0)t.dieT=t.hitT;
 {const pd=u.type==='sniper'?300:180,ac=u.owner===1?C.cyan:C.red;fxMuzzle(a.x,a.y,ac);fxImpact(b.x,b.y,ac,t.hp===0,t.type==='core',u.type==='sniper'||u.type==='heavy',pd)}
 if(u.type==='sniper')SFX.snipe();else SFX.atk();
 if(t.hp===0)SFX.die();
 
 vib(t.hp===0?[40,30,90]:30);
 u.hasAttacked=true;ap--;if(u.type==='heavy')u.cooldown=2;
 if(t.hp===0&&t.type==='core'){over=true;gameOver(u.owner,'core')}
 broadcastState();}
function heal(u,t){
 const h=Math.min(2,t.maxHp-t.hp);t.hp=Math.min(t.maxHp,t.hp+2);
 const p=hexToPixel(t.q,t.r);fx.push({k:'dmg',x:p.x,y:p.y,txt:'+'+h,t0:performance.now(),col:C.cyan,dur:750});
 SFX.heal();vib(15);{const a=hexToPixel(u.q,u.r);fx.push({k:'beam',x1:a.x,y1:a.y,x2:p.x,y2:p.y,t0:performance.now(),col:C.violet,dur:460});
  for(let i=0;i<7;i++){const q=Math.random();fx.push({k:'spark',x:a.x+(p.x-a.x)*q,y:a.y+(p.y-a.y)*q,vx:(Math.random()-.5)*size*.6,vy:(Math.random()-.5)*size*.6-size*.4,fr:2,t0:performance.now()+i*34,dur:520,col:i%2?'#ffffff':C.violet,r:size*.06})}
  fxRing(a.x,a.y,C.violet,size*.9,420,2,0);fxHeal(p.x,p.y,240)}
 u.hasAttacked=true;u.cooldown=3;ap--;broadcastState()}
function gameOver(w,why){SFX.win();vib([80,40,80,40,160]);try{fxVictory(w,why)}catch(e){}stopAmbient();if(onlineMode==='host')setTimeout(()=>NET.send({t:'over',w,why}),60);modal('<b style="font-size:24px;color:'+(w===1?C.cyan:C.red)+'">'+tr('player')+' '+w+' '+tr('wins')+'</b><br>'+tr(why==='obj'?'whyObj':why==='time'?'whyTime':'whyCore')+'<br><br><button class="btn" id="bAgain" style="width:100%;border-color:var(--amber-core);color:var(--amber-core)">'+tr('again')+'</button><div id="rmStatus" style="text-align:center;font-size:12px;color:#8b93a7;margin-top:8px;min-height:18px"></div>');
 $('#bAgain').onclick=rematchTap;setRmStatus();if(S.fx!==false)$('#modal').style.background='#0B0F1A88'}
/* ---- بازی دوباره (محلی / AI / آنلاین) ---- */
let rmMine=false,rmTheirs=false;
function setRmStatus(){const st=$('#rmStatus');if(!st)return;st.textContent=rmMine?tr('rmWait'):(rmTheirs?tr('rmAsk'):'')}
function hostStartRematch(){const first=Math.random()<.5?1:2;NET.send({t:'start',first,map:curMap});$('#modal').classList.remove('on');newGame(false,first,curMap);broadcastState()}
function rematchTap(){
 if(!onlineMode){$('#modal').classList.remove('on');newGame(aiMode,undefined,curMap);return}
 rmMine=true;NET.send({t:'rematch'});
 const b=$('#bAgain');if(b){b.disabled=true;b.style.opacity=.6}
 setRmStatus();
 if(rmTheirs&&onlineMode==='host')hostStartRematch()}
/* فاز ۵: hold 3 نوبت متوالی + ترمیم روی خانه‌های Repair */
function endTurn(){if(over)return;
 if(!_auto)SFX.end();
 const held=OBJ.every(k=>{const x=units.find(u=>u.hp>0&&key(u.q,u.r)===k);return x&&x.owner===turn});
 /* برد با نگه‌داشتن هر ۳ خانهٔ بنفش در ۳ نوبت پشت‌سرهم (قانون contested حذف شد) */
 if(held)holdStreak[turn]++;else holdStreak[turn]=0;
 if(holdStreak[turn]>=3){over=true;refresh();return gameOver(turn,'obj')}
 turn=turn===1?2:1;ap=2;turnEnd=performance.now()+TURN_SEC*1000;sel=null;moveSet=new Set();atkSet=new Set();healSet=new Set();
 units.forEach(u=>{if(u.owner===turn&&u.hp>0){u.hasMoved=false;u.hasAttacked=false;if(u.cooldown>0)u.cooldown--;
   if(REPAIR.has(key(u.q,u.r))&&u.hp<u.maxHp){const h=Math.min(2,u.maxHp-u.hp);u.hp+=h;
     const p=hexToPixel(u.q,u.r);fx.push({k:'dmg',x:p.x,y:p.y,txt:'+'+h,t0:performance.now(),col:C.cyan,dur:750});fxHeal(p.x,p.y)}}});
 refresh();
 broadcastState();   /* همگام‌سازی پس از تعویض نوبت */
 if(aiMode&&turn===2&&!over)setTimeout(AITurn,400);}
/* ---------- رندر Canvas ---------- */
const cv=$('#cv'),ctx=cv.getContext('2d');let size=30,ox=0,oy=0,W=0,H=0;
/* ===== v1.7 — Visual FX: particles, shockwaves, shake, move trails ===== */
const RM=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
function fxBurst(x,y,col,n,spd,dur,r,d){if(S.fx===false)return;if(_q>=1)n=Math.ceil(n*.6);const t0=performance.now()+(d||0);
 for(let i=0;i<n;i++){const a=Math.random()*6.283,s=spd*(.35+Math.random()*.9);
  fx.push({k:'spark',x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,t0,dur:dur*(.6+Math.random()*.6),col,r:r*(.6+Math.random()*.8)})}}
function fxRing(x,y,col,mr,dur,w,d){if(S.fx===false)return;fx.push({k:'ring',x,y,col,mr,w:w||3,t0:performance.now()+(d||0),dur})}
function fxShakeLater(a,d){if(RM||S.fx===false)return;const f=()=>{shake=Math.max(shake,a);shakeT=performance.now()};d?setTimeout(f,d):f()}
function fxMuzzle(x,y,col){fxBurst(x,y,col,6,size*3,230,size*.07,0);fxRing(x,y,col,size*.5,200,2,0)}
function fxImpact(x,y,col,kill,core,big,d){
 if(kill){
  fxBurst(x,y,col,30,size*8,760,size*.11,d);
  fxBurst(x,y,'#ffffff',12,size*5,480,size*.07,d);
  fxRing(x,y,col,size*(core?2.8:1.9),640,4,d);
  fxRing(x,y,'#ffffff',size*1.1,380,2,d);
  if(core){fxRing(x,y,col,size*3.6,900,3,(d||0)+120);fxBurst(x,y,col,24,size*10,1000,size*.12,(d||0)+80)}
  fxShakeLater(size*(core?.95:.5),d);
  if(core){doFlash(.5,d);doPunch(.045,d)}else doPunch(.012,d);
 }else{
  fxBurst(x,y,col,big?18:10,size*(big?6.5:4.5),big?520:390,size*.09,d);
  fxRing(x,y,col,size*(big?1.25:.85),big?420:300,3,d);
  fxShakeLater(size*(big?.3:.14),d);
 }}
function fxHeal(x,y,d){if(S.fx===false)return;const t0=performance.now()+(d||0);
 for(let i=0;i<14;i++)fx.push({k:'spark',x:x+(Math.random()-.5)*size*.9,y:y+size*.35,vx:(Math.random()-.5)*size*.9,vy:-size*(1.8+Math.random()*1.8),fr:1.2,
  t0:t0+i*38,dur:750+Math.random()*350,col:i%2?C.cyan:'#9dffd0',r:size*.07,plus:i%3===0});
 fxRing(x,y+size*.3,C.cyan,size*.95,520,2,d)}
function fxTrail(x,y,u,now){if(S.fx===false)return;
 if(!u._tr||now-u._tr>42){u._tr=now;
  fx.push({k:'ghost',x,y,type:u.type,owner:u.owner,t0:now,dur:300});
  fxBurst(x,y+size*.45,'#8b93a7',1,size*.9,380,size*.06,0)}}
/* ===== v2.1 — انیمیشن‌های بهتر: پرش با کمان، فشردگی هنگام فرود، حملهٔ پرتابی (lunge)، عقب‌نشینی ضربه، پالس خانه ===== */
const _eo=t=>1-Math.pow(1-t,3),_eio=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
let cellFl={},_pxFxDrawn=false,punchFx=null,sweepFx=null,_q=0,_qBad=0,_qGood=0,_qRec=0,_qHold=0;
/* ===== v2.2 — مرحلهٔ ۳: موج نوری شروع نوبت، شعاع ترمیم، فلش و ضربهٔ دوربین هنگام نابودی، کیفیت خودکار ===== */
function punchZoom(now){if(!punchFx)return 1;const k=(now-punchFx.t0)/punchFx.dur;if(k<0)return 1;if(k>=1){punchFx=null;return 1}return 1+punchFx.amp*Math.sin(k*Math.PI)*(1-k)}
function doPunch(amp,d){if(S.fx===false||RM)return;punchFx={t0:performance.now()+(d||0),dur:520,amp}}
function doFlash(a,d,col){if(S.fx===false||RM)return;fx.push({k:'flash',t0:performance.now()+(d||0),dur:520,col:col||'#ffffff',a})}
function doSweep(owner){if(S.fx===false||RM)return;sweepFx={t0:performance.now(),owner}}
/* کیفیت خودکار: اگر چند نیم‌ثانیه پشت‌سرهم FPS کم بود، فیلتر درخشش را سبک‌تر/خاموش می‌کند */
function applyQ(){if(!PX)return;
 if(_q>=2){PX.glowC.filters=null;return}
 let f=PX.glowC.filters&&PX.glowC.filters[0];
 if(!f){f=new PIXI.BlurFilter(5,2);f.blendMode=PIXI.BLEND_MODES.ADD;PX.glowC.filters=[f]}
 if(_q===1){f.quality=1;f.resolution=.35}else{f.quality=2;f.resolution=.5}}
function autoQ(v,now){
 if(!PX||introActive||over||document.hidden||now<_qHold)return;
 if(v<38)_qBad++;else _qBad=Math.max(0,_qBad-1);
 if(_qBad>=4&&_q<2){_qBad=0;_qGood=0;_q++;applyQ();return}
 /* بازگشت به کیفیت بالاتر: اگر ۲۰ ثانیه FPS خوب بود (حداکثر دو بار) تا افت لحظه‌ای کیفیت را برای همیشه پایین نگه ندارد */
 if(v>=50)_qGood++;else _qGood=0;
 if(_q>0&&_qGood>=40&&_qRec<2){_qGood=0;_qRec++;_q--;applyQ()}}
function cellPulse(k,col){if(S.fx===false||RM)return;cellFl[k]={t0:performance.now(),col}}
function animOff(u,now){let dx=0,dy=0,ay=0,sx=1,sy=1;
 if(S.fx===false||RM)return{dx,dy,ay,sx,sy};
 if(u.mv){const k=Math.min(1,(now-u.mv.t)/200),w=Math.sin(k*Math.PI);ay-=w*size*.28;sy=1+.08*w;sx=1-.05*w}
 else if(u._land){const k=(now-u._land)/240;if(k<1){const q=Math.sin(Math.min(1,k*2)*Math.PI/2)*(1-k);sy=1-.2*q;sx=1+.12*q}else u._land=0}
 if(u.lunge){const L=u.lunge,k=(now-L.t0)/300;if(k>=1)u.lunge=null;else if(k>=0){const a=k<.35?_eo(k/.35):1-_eio((k-.35)/.65);dx+=L.ux*a*size*L.amp;dy+=L.uy*a*size*L.amp}}
 if(u.kb){const B=u.kb,k=(now-B.t0)/300;if(k>=1)u.kb=null;else if(k>=0){const a=Math.pow(1-k,2)*Math.min(1,k*6);dx+=B.ux*a*size*.26;dy+=B.uy*a*size*.26}}
 return{dx,dy,ay,sx,sy}}
function fxLand(x,y,u){u._land=performance.now();cellPulse(key(u.q,u.r),PAL[u.owner].m);fxRing(x,y+size*.35,PAL[u.owner].m,size*.8,300,2,0);fxBurst(x,y+size*.45,'#9aa3b8',6,size*1.7,360,size*.06,0)}
function drawGhost(type,owner,x,y){const pal=PAL[owner],bx=size*1.55;ctx.translate(x-bx/2,y-bx/2-size*.1);ctx.scale(bx/100,bx/100);
 for(const[p,t]of ICON[type]){ctx.fillStyle=pal[t];ctx.fill(p)}}

/* ===== v1.8 — turn banner, objective pulses, victory confetti, idle motion, tile pop-in ===== */
function fxWatch(){
 if(!units||over||S.fx===false)return;
 if(turn!==lastTurnSeen){lastTurnSeen=turn;if(!(aiMode&&turn===2)&&(!onlineMode||myTurn()))vib(60);
  const nm=(aiMode&&turn===2)?tr('aiName'):tr('player')+' '+turn;
  fx.push({k:'banner',owner:turn,txt:nm,sub:(onlineMode&&myTurn())?tr('you'):'',t0:performance.now(),dur:1100});
  const core=units.find(u=>u.hp>0&&u.type==='core'&&u.owner===turn);
  if(core){const p=hexToPixel(core.q,core.r),c=turn===1?C.cyan:C.red;fxRing(p.x,p.y,c,size*1.7,800,3,0);fxRing(p.x,p.y,c,size*1.1,600,2,150)}
  doSweep(turn)}
 OBJ.forEach(k=>{const o=units.find(u=>u.hp>0&&key(u.q,u.r)===k),ow=o?o.owner:0;
  if(objPrev[k]!==undefined&&ow&&objPrev[k]!==ow){const[q,r]=k.split(',').map(Number),p=hexToPixel(q,r),c=ow===1?C.cyan:C.red;
   fxRing(p.x,p.y,c,size*1.5,650,3,200);fxBurst(p.x,p.y,c,12,size*4,550,size*.07,200)}
  objPrev[k]=ow});
 for(const o of[1,2]){
  if(holdStreak[o]>holdPrev[o]){const c=o===1?C.cyan:C.red;
   OBJ.forEach((k,i)=>{const[q,r]=k.split(',').map(Number),p=hexToPixel(q,r);
    fxRing(p.x,p.y,c,size*(1.4+.35*holdStreak[o]),800,3,i*130);fxBurst(p.x,p.y,c,8+4*holdStreak[o],size*4.5,650,size*.08,i*130)});
   fxShakeLater(size*.12*holdStreak[o],0)}
  holdPrev[o]=holdStreak[o]}
 if(moveSet!==_pm||atkSet!==_pa||healSet!==_ph||sel!==_ps){_pm=moveSet;_pa=atkSet;_ph=healSet;_ps=sel;hlT=performance.now()}}
function popK(h){if(S.fx===false)return 1;const d=sel?dist(sel,h):0,t=Math.max(0,Math.min(1,(performance.now()-hlT-d*40)/230)),c1=1.70158,c3=c1+1;
 return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2)}
function objGlow(x,y,k){if(S.fx===false)return;const o=units.find(u=>u.hp>0&&key(u.q,u.r)===k);if(!o)return;
 const c=o.owner===1?C.cyan:C.red,p=.5+.5*Math.sin(performance.now()/260);
 ctx.save();hexPath(x,y,size*.94);ctx.globalAlpha=.10+.12*p;ctx.fillStyle=c;ctx.fill();
 ctx.globalAlpha=.55+.4*p;ctx.strokeStyle=c;ctx.lineWidth=2.5;ctx.stroke();ctx.restore()}
function fxVictory(w,why){if(S.fx===false)return;
 const col=w===1?C.cyan:C.red,cols=[col,C.amber,'#ffffff',C.violet],b=why==='core'?700:0,t0=performance.now()+b;
 for(let i=0;i<110;i++)fx.push({k:'conf',x:Math.random()*W,y:-size*(.5+Math.random()*6),vx:(Math.random()-.5)*size*2.2,vy:size*(2.2+Math.random()*2.4),
  sw:2+Math.random()*3,rot:Math.random()*6.28,vr:(Math.random()-.5)*10,col:cols[i%4],w:size*(.14+Math.random()*.12),h:size*(.24+Math.random()*.2),
  t0:t0+Math.random()*900,dur:3800+Math.random()*1400});
 for(let i=0;i<6;i++){const x=W*(.15+Math.random()*.7),y=H*(.15+Math.random()*.5),d=b+250+i*320;
  fxBurst(x,y,cols[i%4],22,size*7,900,size*.1,d);fxRing(x,y,cols[i%4],size*2.2,700,3,d)}
 if(why==='obj')OBJ.forEach((k,i)=>{const[q,r]=k.split(',').map(Number),p=hexToPixel(q,r);
  fxRing(p.x,p.y,col,size*2,800,3,i*140);fxBurst(p.x,p.y,col,16,size*6,800,size*.09,i*140)})}
function drawFx(e,k,now){ctx.save();
 if(e.k==='spark'){const t=(now-e.t0)/1000,fr=e.fr||4,d=(1-Math.exp(-fr*t))/fr,x=e.x+e.vx*d,y=e.y+e.vy*d,a=Math.pow(1-k,1.3),r=e.r*(1-.55*k);
  ctx.globalCompositeOperation='lighter';ctx.fillStyle=e.col;
  ctx.globalAlpha=a*.28;ctx.beginPath();ctx.arc(x,y,r*2.4,0,7);ctx.fill();
  ctx.globalAlpha=a;
  if(e.plus){const w=r*3;ctx.fillRect(x-w,y-w*.3,w*2,w*.6);ctx.fillRect(x-w*.3,y-w,w*.6,w*2)}
  else{ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill()}}
 else if(e.k==='ring'){const q=1-Math.pow(1-k,3);ctx.globalCompositeOperation='lighter';ctx.strokeStyle=e.col;
  ctx.globalAlpha=(1-k)*.9;ctx.lineWidth=Math.max(.6,e.w*(1-k));ctx.beginPath();ctx.arc(e.x,e.y,e.mr*q,0,7);ctx.stroke()}
 else if(e.k==='ghost'){ctx.globalAlpha=.32*(1-k);drawGhost(e.type,e.owner,e.x,e.y)}
 else if(e.k==='conf'){const t=(now-e.t0)/1000,x=e.x+e.vx*t+Math.sin(t*e.sw)*size*.5,y=e.y+e.vy*t;
  if(y>-size&&y<H+size){ctx.globalAlpha=Math.min(1,(1-k)*4);ctx.translate(x,y);ctx.rotate(e.rot+e.vr*t);ctx.scale(1,Math.cos(t*e.sw*2));
   ctx.fillStyle=e.col;ctx.fillRect(-e.w/2,-e.h/2,e.w,e.h)}}
 else if(e.k==='banner'){const col=e.owner===1?C.cyan:C.red,eIn=.22,eOut=.72;let off=0;
  if(k<eIn){const q=k/eIn;off=-Math.pow(1-q,3)*W}else if(k>eOut){const q=(k-eOut)/(1-eOut);off=q*q*q*W}
  const h=size*1.7,cy=H*.4;ctx.translate(off,0);
  const g=ctx.createLinearGradient(0,0,W,0);g.addColorStop(0,col+'00');g.addColorStop(.2,col+'55');g.addColorStop(.8,col+'55');g.addColorStop(1,col+'00');
  ctx.fillStyle='#0B0F1A99';ctx.fillRect(0,cy-h/2,W,h);ctx.fillStyle=g;ctx.fillRect(0,cy-h/2,W,h);
  ctx.fillStyle=col;ctx.globalAlpha=.9;ctx.fillRect(0,cy-h/2,W,2);ctx.fillRect(0,cy+h/2-2,W,2);ctx.globalAlpha=1;
  ctx.textAlign='center';ctx.textBaseline='middle';ctx.shadowColor=col;ctx.shadowBlur=size*.5;ctx.fillStyle='#fff';
  try{ctx.letterSpacing=Math.round(size*.08)+'px'}catch(_){}
  ctx.font='800 '+Math.round(size*.8)+'px "NC Fa","NC Mi","NC Sans",system-ui';ctx.fillText(e.txt,W/2,cy-(e.sub?size*.15:0));
  if(e.sub){ctx.shadowBlur=0;ctx.fillStyle=col;ctx.font='700 '+Math.round(size*.4)+'px "NC Fa","NC Mi","NC Sans",system-ui';ctx.fillText(e.sub,W/2,cy+size*.5)}}
 ctx.restore()}

function resize(){const b=$('#wrap').getBoundingClientRect(),d=PX?Math.min(devicePixelRatio||1,2):(devicePixelRatio||1);
 W=b.width;H=b.height;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0);
 size=Math.min(W/(Math.sqrt(3)*(N+.5)),H/(1.5*(N-1)+2));
 ox=(W-Math.sqrt(3)*size*(N+.5))/2+Math.sqrt(3)*size/2;oy=(H-(1.5*(N-1)+2)*size)/2+size;
 if(PX){try{PX.app.renderer.resize(Math.max(2,W),Math.max(2,H));PX.glowC.filterArea=new PIXI.Rectangle(-20,-20,W+40,H+40);pxCheck()}catch(e){pxDisable()}}else pxInit();
 draw();}
const hexToPixel=(q,r)=>({x:ox+size*Math.sqrt(3)*(q+r/2),y:oy+size*1.5*r});
function pixelToHex(x,y){x-=ox;y-=oy;const fq=(Math.sqrt(3)/3*x-y/3)/size,fr=2/3*y/size;
 let q=Math.round(fq),r=Math.round(fr),s=Math.round(-fq-fr);
 const dq=Math.abs(q-fq),dr=Math.abs(r-fr),ds=Math.abs(s+fq+fr);
 if(dq>dr&&dq>ds)q=-r-s;else if(dr>ds)r=-q-s;return{q,r};}
function hexPath(x,y,s){ctx.beginPath();for(let i=0;i<6;i++){const a=Math.PI/180*(60*i-30);
 const px=x+s*Math.cos(a),py=y+s*Math.sin(a);i?ctx.lineTo(px,py):ctx.moveTo(px,py)}ctx.closePath();}
function tile(x,y,stroke,fill,glow){hexPath(x,y,size*.94*tileScale);
 const pl=.7+.3*Math.sin(performance.now()/280);
 if(fill){ctx.fillStyle=fill;ctx.fill()}
 if(glow){ctx.save();ctx.strokeStyle=stroke;ctx.lineJoin='round';ctx.globalAlpha=.10*pl;ctx.lineWidth=11;ctx.stroke();ctx.globalAlpha=.18*pl;ctx.lineWidth=6;ctx.stroke();ctx.restore()}
 ctx.strokeStyle=stroke;ctx.lineWidth=1.5;ctx.stroke();}
const _c=(x,y,r)=>`M${x-r} ${y}a${r} ${r} 0 1 0 ${2*r} 0a${r} ${r} 0 1 0 ${-2*r} 0`,_r=(x,y,w,h)=>`M${x} ${y}h${w}v${h}h${-w}z`;
const _h=r=>[0,1,2,3,4,5].map(i=>{const a=Math.PI/180*(60*i-90);return(i?'L':'M')+(50+r*Math.cos(a)).toFixed(1)+' '+(50+r*Math.sin(a)).toFixed(1)}).join('')+'Z';
const ICON={
 soldier:[[_r(40,62,7,18),'d'],[_r(53,62,7,18),'d'],[_r(38,36,24,26),'m'],[_c(36,42,6),'m'],[_r(58,41,26,6),'m'],[_c(86,44,4),'l'],[_c(50,25,11),'l'],[_r(44,23,12,4),'d']],
 archer:[[_r(42,62,6,18),'d'],[_r(52,62,6,18),'d'],[_r(40,36,19,27),'l'],[_c(38,42,5),'m'],[_r(66,12,5,68),'m'],[_c(68.5,10,5),'l'],[_c(49,26,10),'l'],[_r(43,24,11,3),'d']],
 heavy:[[_r(36,66,11,20),'d'],[_r(54,66,11,20),'d'],[_r(33,34,34,33),'d'],[_r(22,30,17,18),'m'],[_r(62,30,17,18),'m'],[_r(38,48,24,4),'m'],[_r(70,44,16,28),'l'],[_c(90,60,3),'l'],[_c(50,22,11),'l'],[_r(44,20,12,4),'d']],
 support:[[_r(42,64,6,18),'d'],[_r(52,64,6,18),'d'],[_r(40,38,20,27),'m'],[_c(28,50,8),'d'],[_c(28,50,3.5),'l'],[_c(72,50,8),'d'],[_c(72,50,3.5),'l'],[_r(48,44,4,14),'l'],[_r(43,49,14,4),'l'],[_c(50,26,10),'l']],
 sniper:[[_r(43,68,6,16),'d'],[_r(52,68,6,16),'d'],[_r(41,42,19,28),'m'],[_c(38,48,6),'m'],[_r(58,44,38,3),'m'],[_c(74,39,7),'d'],[_c(74,39,3.5),'l'],[_r(95,43,4,5),'l'],[_c(50,30,10),'l'],[_r(44,27,12,4),'d']],
 core:[[_r(49,4,2,16),'m'],[_r(49,80,2,16),'m'],[_r(4,49,16,2),'m'],[_r(80,49,16,2),'m'],[_h(28),'m'],[_h(17),'l'],[_c(50,50,6),'w']]};
for(const k in ICON)ICON[k]=ICON[k].map(([d,t])=>[new Path2D(d),t]);
const PAL={1:{m:C.cyan,d:'#0088A0',l:'#8CF4FF',w:'#E8FDFF'},2:{m:C.red,d:'#A8203C',l:'#FF9CAD',w:'#FFE8EC'}};
function drawUnit(u,x,y,fl){const col=u.owner===1?C.cyan:C.red,pal=PAL[u.owner],bx=size*1.55;
 ctx.fillStyle=col+'33';ctx.beginPath();ctx.ellipse(x,y+size*.5,size*.6,size*.24,0,0,7);ctx.fill();
 ctx.save();const done=(u.hasMoved?1:0)+(u.hasAttacked?1:0);
 if(u.owner===turn&&u.type!=='core'&&done>0)ctx.globalAlpha*=(1-done*.15);
 if(u.type==='core'){const g=ctx.createRadialGradient(x,y,0,x,y,size*(.8+(S.fx===false?0:.1*Math.sin(performance.now()/400))));g.addColorStop(0,col+'88');g.addColorStop(1,col+'00');ctx.fillStyle=g;ctx.fillRect(x-size,y-size,size*2,size*2)}
 ctx.translate(x-bx/2,y-bx/2-size*.1);ctx.scale(bx/100,bx/100);
 for(const[p,t]of ICON[u.type]){ctx.fillStyle=pal[t];ctx.fill(p)}
 ctx.restore();
 if(fl>0){ctx.save();ctx.globalAlpha*=fl;ctx.fillStyle=C.red+'99';ctx.strokeStyle=C.red;ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y,size*.62,0,7);ctx.fill();ctx.stroke();ctx.restore()}
 if(u.type!=='core'){const w=size*.9;ctx.fillStyle='#0008';ctx.fillRect(x-w/2,y+size*.66,w,4);ctx.fillStyle=col;ctx.fillRect(x-w/2,y+size*.66,w*u.hp/u.maxHp,4)}}

/* ===== v2.0 — موتور گرافیکی PixiJS (WebGL) =====
   خانه‌ها، واحدها، نوار سلامت و درخشش واقعی (bloom) با Pixi؛ افکت‌ها (گلوله، ذرات، بنر، اعداد) روی Canvas بالای آن.
   اگر WebGL نبود یا خطایی رخ داد، خودکار به رسم قبلی (Canvas) برمی‌گردد. */
let PX=null;
const _hx=c=>parseInt(c.slice(1,7),16);
function pxSupported(){try{return typeof PIXI!=='undefined'&&PIXI.utils.isWebGLSupported()}catch(e){return false}}
function pxDisable(){const c=$('#pcv');if(PX){try{PX.app.destroy(false,{children:true,texture:true,baseTexture:true})}catch(e){}}PX=null;if(c)c.style.display='none'}
function pxInit(){
 if(PX||S.gfx==='canvas'||!pxSupported())return;
 try{
  const old=$('#pcv'),c=document.createElement('canvas');c.id='pcv';c.style.display='block';old.replaceWith(c);
  const app=new PIXI.Application({view:c,width:Math.max(2,W),height:Math.max(2,H),backgroundAlpha:0,antialias:true,
   resolution:Math.min(devicePixelRatio||1,2),autoDensity:true,autoStart:false,sharedTicker:false});
  app.ticker.stop();
  const world=new PIXI.Container(),baseC=new PIXI.Container(),ownC=new PIXI.Container(),hiC=new PIXI.Container(),
   glowC=new PIXI.Container(),unitC=new PIXI.Container(),ring=new PIXI.Graphics(),ghostC=new PIXI.Container(),fxC=new PIXI.Container(),fxG=new PIXI.Graphics();
  fxG.blendMode=PIXI.BLEND_MODES.ADD;fxC.addChild(fxG);
  const blur=new PIXI.BlurFilter(5,2);blur.resolution=.5;blur.blendMode=PIXI.BLEND_MODES.ADD;glowC.filters=[blur];   /* درخشش نئونی واقعی؛ کیفیت و رزولوشن پایین برای سبک ماندن روی گوشی */
  world.addChild(baseC,ownC,hiC,glowC,unitC,ghostC,fxC,ring);app.stage.addChild(world);
  PX={app,world,baseC,ownC,hiC,glowC,unitC,ring,ghostC,fxC,fxG,cs:{},units:new Map(),T:{},UT:{},CG:{},SH:{},FL:null,spPool:[],gPool:[],size:0,ox:0,oy:0};
  c.addEventListener('webglcontextlost',e=>{e.preventDefault();pxDisable()});
  applyQ();
  glowC.filterArea=new PIXI.Rectangle(-20,-20,Math.max(2,W)+40,Math.max(2,H)+40);   /* ناحیهٔ ثابت: بدون محاسبهٔ مرزها در هر فریم */
  if(size>8)pxBuild();
 }catch(err){console.warn('PIXI init failed',err);pxDisable()}}
function pxCheck(){if(PX&&size>8&&(PX.size!==size||PX.ox!==ox||PX.oy!==oy))pxBuild()}
function pxBuild(){
 if(!PX||!(size>8))return;
 const A=PX.app,R=Math.ceil(size*1.05)+4,reg=new PIXI.Rectangle(-R,-R,2*R,2*R);
 for(const m of[PX.T,PX.UT,PX.CG,PX.SH])for(const t of Object.values(m))try{t.destroy(true)}catch(e){}
 if(PX.FL)try{PX.FL.destroy(true)}catch(e){}
 for(const c of[PX.baseC,PX.ownC,PX.hiC,PX.glowC,PX.unitC,PX.ghostC])c.removeChildren().forEach(o=>{try{o.destroy({children:true})}catch(e){}});
 PX.fxC.removeChildren().forEach(o=>{if(o!==PX.fxG)try{o.destroy()}catch(e){}});PX.fxC.addChild(PX.fxG);PX.spPool=[];PX.gPool=[];
 PX.units=new Map();PX.cs={};
 const r0=size*.94,pts=[];for(let i=0;i<6;i++){const a=Math.PI/180*(60*i-30);pts.push(r0*Math.cos(a),r0*Math.sin(a))}
 const gen=fn=>{const g=new PIXI.Graphics();fn(g);const t=A.renderer.generateTexture(g,{region:reg,resolution:2});g.destroy();return t};
 const H6=(g,sc,sa,fc,fa,w)=>{g.lineStyle({width:w||1.5,color:_hx(sc),alpha:sa,join:PIXI.LINE_JOIN.ROUND});if(fc)g.beginFill(_hx(fc),fa);g.drawPolygon(pts);if(fc)g.endFill()};
 const T=PX.T={};
 T.norm=gen(g=>H6(g,C.cyan,.30));
 T.g1a=gen(g=>H6(g,C.cyan,.10));
 T.obj=gen(g=>{H6(g,C.violet,1,C.violet,.25);g.lineStyle(0);g.beginFill(_hx(C.violet));const d=size*.22;g.drawPolygon([0,-d,d,0,0,d,-d,0]);g.endFill()});
 T.obst=gen(g=>{H6(g,'#5a6276',1,'#1a2030',1);const d=size*.3;g.lineStyle({width:2.5,color:0x8b93a7,cap:PIXI.LINE_CAP.ROUND});g.moveTo(-d,-d);g.lineTo(d,d);g.moveTo(d,-d);g.lineTo(-d,d)});
 T.rep=gen(g=>{H6(g,C.cyan,1,C.cyan,.10);g.lineStyle(0);g.beginFill(_hx(C.cyan));g.drawRect(-size*.22,-size*.05,size*.44,size*.1);g.drawRect(-size*.05,-size*.22,size*.1,size*.44);g.endFill()});
 T.sel=gen(g=>H6(g,C.amber,1,C.amber,.20));
 T.move=gen(g=>H6(g,C.cyan,1,C.cyan,.15));
 T.atk=gen(g=>H6(g,C.red,1,C.red,.15));
 T.heal=gen(g=>H6(g,C.violet,1,C.violet,.25));
 T.strokeW=gen(g=>H6(g,'#ffffff',1,null,0,3));
 T.ownS=gen(g=>H6(g,'#ffffff',1,null,0,2.5));
 T.ownF=gen(g=>{g.lineStyle(0);g.beginFill(0xffffff,1);g.drawPolygon(pts);g.endFill()});
 /* بافت واحدها: از همان آیکون‌های برداری (Path2D) روی بوم موقت، ۲× */
 const res=2,Sz=Math.ceil(size*3);
 const mkc=(w,h)=>{const c=document.createElement('canvas');c.width=Math.ceil(w*res);c.height=Math.ceil(h*res);const x=c.getContext('2d');x.scale(res,res);return[c,x]};
 for(const o of[1,2])for(const type of Object.keys(ICON)){
  const[c,x]=mkc(Sz,Sz),col=o===1?C.cyan:C.red,pal=PAL[o],bx=size*1.55,cx=Sz/2,cy=Sz/2;
  x.translate(cx-bx/2,cy-bx/2-size*.1);x.scale(bx/100,bx/100);for(const[p,t]of ICON[type]){x.fillStyle=pal[t];x.fill(p)}
  PX.UT[type+o]=PIXI.Texture.from(c,{resolution:res})}
 PX.SH={};for(const o of[1,2]){const col=o===1?C.cyan:C.red,[c,x]=mkc(size*1.4,size*.6);x.fillStyle=col+'33';x.beginPath();x.ellipse(size*.7,size*.3,size*.6,size*.24,0,0,7);x.fill();PX.SH[o]=PIXI.Texture.from(c,{resolution:res})}
 {const[c,x]=mkc(64,64),g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.22,'rgba(255,255,255,.85)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);T.soft=PIXI.Texture.from(c,{resolution:res})}
 {const[c,x]=mkc(128,8),g=x.createLinearGradient(0,0,128,0);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.5,'rgba(255,255,255,1)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,128,8);T.sweep=PIXI.Texture.from(c,{resolution:res})}
 {const[c,x]=mkc(64,64);x.shadowColor='#fff';x.shadowBlur=3;x.fillStyle='#fff';x.fillRect(12,29,40,6);x.fillRect(29,12,6,40);T.plus=PIXI.Texture.from(c,{resolution:res})}
 for(const o of[1,2]){const col=o===1?C.cyan:C.red,[c,x]=mkc(size*2,size*2),g=x.createRadialGradient(size,size,0,size,size,size*.9);
  g.addColorStop(0,col+'88');g.addColorStop(1,col+'00');x.fillStyle=g;x.fillRect(0,0,size*2,size*2);PX.CG[o]=PIXI.Texture.from(c,{resolution:res})}
 {const[c,x]=mkc(size*2,size*2);x.fillStyle=C.red+'99';x.strokeStyle=C.red;x.lineWidth=3;x.beginPath();x.arc(size,size,size*.62,0,7);x.fill();x.stroke();PX.FL=PIXI.Texture.from(c,{resolution:res})}
 /* اسپرایت هر خانه */
 const SP=t=>{const s=new PIXI.Sprite(t);s.anchor.set(.5);return s};
 PX.selS=SP(T.sel);PX.selG=SP(T.strokeW);PX.selS.visible=PX.selG.visible=false;PX.hiC.addChild(PX.selS);PX.glowC.addChild(PX.selG);
 for(const h of cells){const k=key(h.q,h.r),p=hexToPixel(h.q,h.r),cs={base:SP(T.norm),ownF:SP(T.ownF),ownS:SP(T.ownS),hi:SP(T.move),gl:SP(T.strokeW),fl:SP(T.ownF)};
  for(const s of Object.values(cs))s.position.set(p.x,p.y);
  cs.ownF.visible=cs.ownS.visible=cs.hi.visible=cs.gl.visible=cs.fl.visible=false;
  PX.baseC.addChild(cs.base);PX.ownC.addChild(cs.ownF,cs.ownS,cs.fl);PX.hiC.addChild(cs.hi);PX.glowC.addChild(cs.gl);PX.cs[k]=cs}
 PX.hiC.addChildAt(PX.selS,0);
 PX.sweepS=SP(T.sweep);PX.sweepS.blendMode=PIXI.BLEND_MODES.ADD;PX.sweepS.visible=false;PX.ownC.addChild(PX.sweepS);
 PX.size=size;PX.ox=ox;PX.oy=oy;
 try{A.renderer.render(A.stage)}catch(e){}   /* گرم‌کردن شیدرها قبل از اولین بازی */
}
function pxMakeUnit(u){
 const c=new PIXI.Container();let cg=null;
 if(u.type==='core'){cg=new PIXI.Sprite(PX.CG[u.owner]);cg.anchor.set(.5);c.addChild(cg)}
 const sh=new PIXI.Sprite(PX.SH[u.owner]);sh.anchor.set(.5);sh.position.set(0,size*.5);c.addChild(sh);
 const body=new PIXI.Sprite(PX.UT[u.type+u.owner]);body.anchor.set(.5);c.addChild(body);
 const wg=new PIXI.Sprite(PX.T.soft);wg.anchor.set(.5);wg.blendMode=PIXI.BLEND_MODES.ADD;wg.visible=false;c.addChild(wg);
 const flash=new PIXI.Sprite(PX.FL);flash.anchor.set(.5);flash.visible=false;c.addChild(flash);
 const hpG=u.type==='core'?null:new PIXI.Graphics();if(hpG)c.addChild(hpG);
 PX.unitC.addChild(c);const U={c,sh,body,wg,flash,hpG,cg,hp:-1,mhp:-1,sz:size};PX.units.set(u.id,U);return U}
function pxFrame(now){
 if(!(size>8))return;   /* صفحهٔ بازی پنهان است (مثلاً منو): واحدی با اندازهٔ صفر نساز */
 const T=PX.T,pl=.7+.3*Math.sin(now/280),gp=.5+.5*Math.sin(now/260),own={};
 for(const u of units)if(u.hp>0){const k=key(u.q,u.r);if(OBJ.includes(k))own[k]=u}
 for(const h of cells){const k=key(h.q,h.r),s=PX.cs[k],mv=moveSet.has(k),at=atkSet.has(k),hl=healSet.has(k),any=mv||at||hl;
  let bt=null,gcol=null;
  if(OBJ.includes(k)){bt=T.obj;gcol=C.violet}else if(OBSTACLES.has(k))bt=T.obst;else if(REPAIR.has(k)){bt=T.rep;gcol=C.cyan}else if(S.grid)bt=T.norm;else if(any)bt=T.g1a;
  s.base.visible=!!bt;if(bt)s.base.texture=bt;
  const o=own[k],so=!!o&&S.fx!==false;s.ownF.visible=s.ownS.visible=so;
  if(so){const c=_hx(o.owner===1?C.cyan:C.red);s.ownF.tint=s.ownS.tint=c;s.ownF.alpha=.10+.12*gp;s.ownS.alpha=.55+.4*gp}
  if(any){const ts=popK(h);s.hi.texture=hl?T.heal:at?T.atk:T.move;s.hi.scale.set(ts);s.hi.visible=true;gcol=hl?C.violet:at?C.red:C.cyan;s.gl.scale.set(ts)}
  else{s.hi.visible=false;s.gl.scale.set(1)}
  s.gl.visible=!!gcol;if(gcol){s.gl.tint=_hx(gcol);s.gl.alpha=.9*pl}
  const cf=cellFl[k];if(cf){const q=(now-cf.t0)/380;if(q>=1){delete cellFl[k];s.fl.visible=false}else{s.fl.visible=true;s.fl.tint=_hx(cf.col);s.fl.alpha=.5*Math.pow(1-q,2)}}else s.fl.visible=false}
 if(sel){const p=hexToPixel(sel.q,sel.r);PX.selS.position.set(p.x,p.y);PX.selG.position.set(p.x,p.y);PX.selS.visible=PX.selG.visible=true;PX.selG.tint=_hx(C.amber);PX.selG.alpha=.9*pl}
 else PX.selS.visible=PX.selG.visible=false;
 if(sweepFx&&PX.sweepS){const k=(now-sweepFx.t0)/1000,sw=PX.sweepS;   /* موج نوری شروع نوبت: از سمت بازیکن فعال به سمت مقابل */
  if(k>=1){sweepFx=null;sw.visible=false}else{const p1=sweepFx.owner===1,x0=p1?-.15*W:1.15*W,y0=p1?1.15*H:-.15*H,x1=p1?1.15*W:-.15*W,y1=p1?-.15*H:1.15*H,e=_eio(k);
   sw.visible=true;sw.position.set(x0+(x1-x0)*e,y0+(y1-y0)*e);sw.rotation=Math.atan2(y1-y0,x1-x0);sw.scale.set(size*6/128,Math.hypot(W,H)*1.4/8);
   sw.tint=_hx(p1?C.cyan:C.red);sw.alpha=.3*Math.sin(k*Math.PI)}}
 else if(PX.sweepS)PX.sweepS.visible=false;
 const seen=new Set();let ringAt=null;
 for(const u of units){const dying=u.hp<=0;if(dying&&!u.dieT)continue;
  let p=hexToPixel(u.q,u.r);
  if(u.mv){const k=Math.min(1,(now-u.mv.t)/200),e=k*k*(3-2*k),f=hexToPixel(u.mv.q,u.mv.r);
   p={x:f.x+(p.x-f.x)*e,y:f.y+(p.y-f.y)*e};if(k>=1){u.mv=null;fxLand(p.x,p.y,u)}else fxTrail(p.x,p.y,u,now)}
  const hit=u.hitT&&now-u.hitT<300,tt=now-(u.hitT||0),damp=hit?1-tt/300:0,ao=animOff(u,now),calm=(dying||u.mv||u.type==='core'||RM||S.fx===false);
  const x=p.x+ao.dx+(hit?Math.sin(tt*.05)*6*damp:0),y=p.y+ao.dy+(hit?Math.cos(tt*.06)*3*damp:0);
  const bob=calm?0:Math.sin(now/520+u.q*1.3+u.r*.7)*size*.04,isSel=(u===sel&&u.hp>0),
   lift=(isSel&&S.fx!==false&&!RM)?-size*.07-Math.sin(now/300)*size*.015:0;
  let U=PX.units.get(u.id);if(!U)U=pxMakeUnit(u);seen.add(u.id);
   if(U.sz!==size){U.sz=size;U.sh.position.y=size*.5;U.hp=-1}   /* اگر اندازه عوض شد، سایه و نوار جان دوباره جایگذاری شوند */
  U.c.position.set(x,y);
  const kd=dying?Math.min(1,(now-u.dieT)/400):0;
  let sc=1,al=1,rot=0;   /* مرگ: درخشش سفید، بزرگ‌شدن کوتاه، بعد کوچک‌شدن و چرخش */
  if(dying){sc=kd<.2?1+kd*1.2:Math.max(0,1.24*(1-Math.pow((kd-.2)/.8,2)));al=1-Math.max(0,(kd-.45)/.55);rot=kd*kd*1.4*(u.owner===1?1:-1)}
  U.c.alpha=al;U.c.scale.set(sc);
  const sx=ao.sx*(isSel?1.04:1),sy=ao.sy*(isSel?1.04:1),air=bob+lift+ao.ay;
  U.body.rotation=rot;U.body.scale.set(sx,sy);U.body.position.set(0,air+(1-sy)*size*.55);
  U.sh.scale.set(Math.max(.55,1+Math.min(0,air)/size*2.2));   /* هرچه واحد بالاتر، سایه کوچک‌تر */
  U.wg.visible=dying&&kd<.35;if(U.wg.visible){U.wg.alpha=Math.max(0,1-kd/.35);U.wg.scale.set(size*2.4/64)}
  const done=(u.hasMoved?1:0)+(u.hasAttacked?1:0);U.body.alpha=(u.owner===turn&&u.type!=='core'&&done>0)?(1-done*.15):1;
  const fl=hit?1-(now-u.hitT)/300:0;U.flash.visible=fl>0;U.flash.alpha=Math.max(0,fl);
  if(U.cg)U.cg.scale.set(S.fx===false?1:(.8+.1*Math.sin(now/400))/.9);
  if(U.hpG&&(U.hp!==u.hp||U.mhp!==u.maxHp)){U.hp=u.hp;U.mhp=u.maxHp;const w=size*.9,col=_hx(u.owner===1?C.cyan:C.red);
   U.hpG.clear().beginFill(0x000000,.53).drawRect(-w/2,size*.66,w,4).endFill().beginFill(col).drawRect(-w/2,size*.66,w*u.hp/u.maxHp,4).endFill()}
  if(isSel)ringAt={x,y}}
 for(const[id,U]of PX.units)if(!seen.has(id)){try{PX.unitC.removeChild(U.c);U.c.destroy({children:true})}catch(e){}PX.units.delete(id)}
 PX.ring.clear();if(ringAt){const pu=.5+.5*Math.sin(now/250);PX.ring.lineStyle(2,_hx(C.amber),pu);PX.ring.drawCircle(ringAt.x,ringAt.y,size*(.7+.1*pu))}}
/* ذرات، حلقه‌ها و سایه‌های حرکت روی GPU (additive): اسپرایت‌های قابل‌استفادهٔ مجدد */
function pxFx(now){
 const T=PX.T;let si=0,gi=0;PX.fxG.clear();
 for(const e of fx){if(now<e.t0)continue;const k=(now-e.t0)/e.dur;if(k>=1)continue;
  if(e.k==='spark'){const t=(now-e.t0)/1000,fr=e.fr||4,d=(1-Math.exp(-fr*t))/fr,x=e.x+e.vx*d,y=e.y+e.vy*d,a=Math.pow(1-k,1.3),r=e.r*(1-.55*k);
   let s=PX.spPool[si];if(!s){s=new PIXI.Sprite(T.soft);s.anchor.set(.5);s.blendMode=PIXI.BLEND_MODES.ADD;PX.fxC.addChild(s);PX.spPool.push(s)}si++;
   s.visible=true;s.texture=e.plus?T.plus:T.soft;s.position.set(x,y);s.tint=_hx(e.col);s.alpha=a;s.scale.set(e.plus?r*6/40:r*4.8/64)}
  else if(e.k==='beam'){const a=Math.sin(k*Math.PI)*.9,w=1+.25*Math.sin(now/40);
   PX.fxG.lineStyle({width:9*w,color:_hx(e.col),alpha:a*.28,cap:PIXI.LINE_CAP.ROUND});PX.fxG.moveTo(e.x1,e.y1);PX.fxG.lineTo(e.x2,e.y2);
   PX.fxG.lineStyle({width:3,color:0xffffff,alpha:a,cap:PIXI.LINE_CAP.ROUND});PX.fxG.moveTo(e.x1,e.y1);PX.fxG.lineTo(e.x2,e.y2)}
  else if(e.k==='ring'){PX.fxG.lineStyle({width:Math.max(.6,e.w*(1-k)),color:_hx(e.col),alpha:(1-k)*.9});PX.fxG.drawCircle(e.x,e.y,e.mr*(1-Math.pow(1-k,3)))}
  else if(e.k==='ghost'){let g=PX.gPool[gi];if(!g){g=new PIXI.Sprite(PX.UT[e.type+e.owner]);g.anchor.set(.5);PX.ghostC.addChild(g);PX.gPool.push(g)}gi++;
   g.visible=true;g.texture=PX.UT[e.type+e.owner];g.position.set(e.x,e.y);g.alpha=.32*(1-k)}}
 for(let i=si;i<PX.spPool.length;i++)PX.spPool[i].visible=false;
 for(let i=gi;i<PX.gPool.length;i++)PX.gPool[i].visible=false}
function _drawScenePx(){
 ctx.clearRect(0,0,W,H);fxWatch();
 const nowT=performance.now();
 if(units.some(u=>u.hp<=0&&u.dieT&&nowT-u.dieT>=500))units=units.filter(u=>!(u.hp<=0&&u.dieT&&nowT-u.dieT>=500));
 const now=performance.now();
 try{pxFrame(now);pxFx(now);_pxFxDrawn=true;PX.app.renderer.render(PX.app.stage)}catch(e){console.warn('Pixi frame error → Canvas',e);_pxFxDrawn=false;pxDisable();return}
 _drawFxAndHover(now)}
function draw(){if(!units)return;   /* قبل از شروع بازی چیزی برای رسم نیست */
 const n=performance.now(),dk=shake*Math.max(0,1-(n-shakeT)/380);ctx.clearRect(0,0,W,H);ctx.save();
 const sx=dk>.3?(Math.random()-.5)*2*dk:0,sy=dk>.3?(Math.random()-.5)*2*dk:0;   /* لرزش دوربین: هم روی Canvas هم Pixi */
 const pz=punchZoom(n);ctx.translate(sx,sy);if(pz!==1){ctx.translate(W/2,H/2);ctx.scale(pz,pz);ctx.translate(-W/2,-H/2)}   /* ضربهٔ زوم دوربین */
 const usePx=!!(PX&&PX.T&&PX.T.obj);if(usePx){PX.world.scale.set(pz);PX.world.position.set(sx+W/2*(1-pz),sy+H/2*(1-pz))}
 try{usePx?_drawScenePx():_drawScene()}finally{ctx.restore()}}
function _drawScene(){_pxFxDrawn=false;ctx.clearRect(0,0,W,H);fxWatch();
 /* فاز ۵: پاک‌سازی واحدهای مرده پس از پایان انیمیشن */
 const nowT=performance.now();
 if(units.some(u=>u.hp<=0&&u.dieT&&nowT-u.dieT>=500))units=units.filter(u=>!(u.hp<=0&&u.dieT&&nowT-u.dieT>=500));
 for(const h of cells){const {x,y}=hexToPixel(h.q,h.r),k=key(h.q,h.r);
  /* OBJ اول رندر می‌شود تا زیر OBSTACLE دفن نشود */
  if(OBJ.includes(k)){tile(x,y,C.violet,C.violet+'40',true);objGlow(x,y,k);
   ctx.fillStyle=C.violet;ctx.beginPath();const d=size*.22;ctx.moveTo(x,y-d);ctx.lineTo(x+d,y);ctx.lineTo(x,y+d);ctx.lineTo(x-d,y);ctx.fill()}
  else if(OBSTACLES.has(k)){tile(x,y,'#5a6276','#1a2030',false);
   ctx.strokeStyle='#8b93a7';ctx.lineWidth=2.5;ctx.lineCap='round';
   const d=size*.3;ctx.beginPath();ctx.moveTo(x-d,y-d);ctx.lineTo(x+d,y+d);ctx.moveTo(x+d,y-d);ctx.lineTo(x-d,y+d);ctx.stroke()}
  else if(REPAIR.has(k)){tile(x,y,C.cyan,C.cyan+'1A',true);
   ctx.fillStyle=C.cyan;ctx.fillRect(x-size*.22,y-size*.05,size*.44,size*.1);ctx.fillRect(x-size*.05,y-size*.22,size*.1,size*.44)}
  else if(S.grid)tile(x,y,C.cyan+'4D');
  else if(moveSet.has(k)||atkSet.has(k)||healSet.has(k))tile(x,y,C.cyan+'1A');
  if(sel&&sel.q===h.q&&sel.r===h.r)tile(x,y,C.amber,C.amber+'33',true);
  {if(moveSet.has(k)||atkSet.has(k)||healSet.has(k))tileScale=popK(h);
   if(moveSet.has(k))tile(x,y,C.cyan,C.cyan+'26',true);
   if(atkSet.has(k))tile(x,y,C.red,C.red+'26',true);if(healSet.has(k))tile(x,y,C.violet,C.violet+'40',true);tileScale=1}}
 const now=performance.now();
 for(const u of units){const dying=u.hp<=0;
  if(dying){if(!u.dieT)continue}
  let p=hexToPixel(u.q,u.r);
  if(u.mv){const k=Math.min(1,(now-u.mv.t)/200),e=k*k*(3-2*k),f=hexToPixel(u.mv.q,u.mv.r);
   p={x:f.x+(p.x-f.x)*e,y:f.y+(p.y-f.y)*e};if(k>=1){u.mv=null;fxLand(p.x,p.y,u)}else fxTrail(p.x,p.y,u,now)}
  const hit=u.hitT&&now-u.hitT<300,tt=now-(u.hitT||0),damp=hit?1-tt/300:0;
  const x=p.x+(hit?Math.sin(tt*.05)*6*damp:0),y=p.y+(hit?Math.cos(tt*.06)*3*damp:0)+((dying||u.mv||u.type==='core'||RM||S.fx===false)?0:Math.sin(now/520+u.q*1.3+u.r*.7)*size*.04);
  ctx.save();
  if(dying){const k=Math.min(1,(now-u.dieT)/400);ctx.globalAlpha=1-k;ctx.translate(x,y);ctx.scale(1+.3*k,1+.3*k);ctx.translate(-x,-y)}
  drawUnit(u,x,y,hit?1-(now-u.hitT)/300:0);ctx.restore();
  if(u===sel&&u.hp>0){const pu=.5+.5*Math.sin(now/250);
   ctx.save();ctx.strokeStyle=C.amber;ctx.lineWidth=2;ctx.globalAlpha=pu;ctx.beginPath();ctx.arc(x,y,size*(.7+.1*pu),0,7);ctx.stroke();ctx.restore()}}
 _drawFxAndHover(now)}
function _drawFxAndHover(now){
 /* فاز ۵: FX — گلوله و اعداد آسیب */
 fx=fx.filter(e=>{if(now<e.t0)return true;const k=(now-e.t0)/e.dur;if(k>=1)return false;
  if(e.k==='banner'||e.k==='conf'){drawFx(e,k,now);return true}
  if(e.k==='spark'||e.k==='ring'||e.k==='ghost'){if(!_pxFxDrawn)drawFx(e,k,now);return true}   /* با Pixi، این‌ها روی GPU کشیده می‌شوند */
  if(e.k==='proj'){const x=e.x1+(e.x2-e.x1)*k,y=e.y1+(e.y2-e.y1)*k,dx=e.x2-e.x1,dy=e.y2-e.y1,L=Math.hypot(dx,dy)||1,tl=Math.min(k*L,size*2.4),tx=x-dx/L*tl,ty=y-dy/L*tl;
   ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineCap='round';
   const g=ctx.createLinearGradient(tx,ty,x,y);g.addColorStop(0,e.col+'00');g.addColorStop(1,e.col);ctx.strokeStyle=g;
   ctx.globalAlpha=(1-k*.3)*.35;ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(x,y);ctx.stroke();
   ctx.globalAlpha=1-k*.3;ctx.lineWidth=3.5;ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(x,y);ctx.stroke();
   const rg=ctx.createRadialGradient(x,y,0,x,y,9);rg.addColorStop(0,'#ffffff');rg.addColorStop(.35,e.col);rg.addColorStop(1,e.col+'00');
   ctx.fillStyle=rg;ctx.beginPath();ctx.arc(x,y,9,0,7);ctx.fill();ctx.restore()}
  else if(e.k==='dmg'){const pop=k<.18?.6+(k/.18)*.9:1.5-.5*Math.min(1,(k-.18)/.3),yy=e.y-size*.8-_eo(k)*size*.95;
   ctx.save();ctx.globalAlpha=k<.7?1:1-(k-.7)/.3;ctx.translate(e.x,yy);ctx.scale(pop,pop);
   ctx.fillStyle=e.col;ctx.strokeStyle='#000';ctx.lineWidth=3;ctx.font='bold '+Math.round(size*.55)+'px "NC Fa","NC Mi","NC Sans",system-ui';ctx.textAlign='center';
   ctx.strokeText(e.txt,0,0);ctx.fillText(e.txt,0,0);ctx.restore()}
  else if(e.k==='beam'){if(!_pxFxDrawn){ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineCap='round';const a=Math.sin(k*Math.PI)*.9;
   ctx.strokeStyle=e.col;ctx.globalAlpha=a*.28;ctx.lineWidth=9;ctx.beginPath();ctx.moveTo(e.x1,e.y1);ctx.lineTo(e.x2,e.y2);ctx.stroke();
   ctx.strokeStyle='#ffffff';ctx.globalAlpha=a;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(e.x1,e.y1);ctx.lineTo(e.x2,e.y2);ctx.stroke();ctx.restore()}}
  else if(e.k==='flash'){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=e.a*Math.pow(1-k,2);ctx.fillStyle=e.col;ctx.fillRect(-60,-60,W+120,H+120);ctx.restore()}
  return true});
 /* پیش‌نمایش آسیب */
 if(hover&&atkSet.has(hover)&&sel){const[hq,hr]=hover.split(',').map(Number),t=unitAt(hq,hr);
  if(t){const p=hexToPixel(t.q,t.r),dmg=Math.min(sel.atk,t.hp);
   ctx.fillStyle=C.red;ctx.strokeStyle='#000';ctx.lineWidth=3;ctx.font='bold '+Math.round(size*.55)+'px "NC Fa","NC Mi","NC Sans",system-ui';ctx.textAlign='center';
   ctx.strokeText('-'+dmg,p.x,p.y-size*.8);ctx.fillText('-'+dmg,p.x,p.y-size*.8)}}}
function refresh(){
 if(sel&&sel.hp<=0)sel=null;   /* انتخاب واحد مرده پاک شود */
 const c=turn===1?C.cyan:C.red;$('#pdot').style.cssText='background:'+c+';color:'+c;
 const aiT=aiMode&&turn===2;   /* نوبت AI: فقط «AI · سطح» (بدون «بازیکن ۲») */
 $('#pname').dir=(S.lang==='fa')?'rtl':'ltr';
 $('#pname').textContent=(aiT?tr('aiName')+' · '+tr('lv_'+S.aiLevel):tr('player')+' '+turn)+(onlineMode&&myTurn()?' '+tr('you'):'')+(holdStreak[turn]?' · '+tr('hold')+' '+holdStreak[turn]+'/3':'');
 $('#pname').style.color=c;
 if(introActive){$('#pdot').style.cssText='background:#3a4256;color:#3a4256';$('#pname').textContent='…';$('#pname').style.color='#8b93a7'}   /* قرعه در جریان است */
 $('#ap').innerHTML=[0,1].map(i=>'<i class="'+(i<ap?'on':'')+'"></i>').join('');
 for(const o of[1,2]){const k=units.find(u=>u.owner===o&&u.type==='core');$('#hp'+o).style.width=(100*k.hp/k.maxHp)+'%'}
 {
 const aiLock = aiMode && turn===2;
 const netLock = onlineMode && (
   (onlineMode==='guest' && turn!==2) ||
   (onlineMode==='host'  && turn!==1)
 );
 const lock = aiLock || netLock;
 $('#ctrl').style.pointerEvents = lock?'none':'';
 $('#ctrl').style.opacity = lock?.4:1;
 if(introActive){$('#ctrl').style.pointerEvents='none';$('#ctrl').style.opacity=.6}
}
 document.querySelectorAll('.obj i').forEach((el,i)=>{const x=units.find(u=>u.hp>0&&key(u.q,u.r)===OBJ[i]);el.style.background=x?(x.owner===1?C.cyan:C.red):C.violet;el.style.opacity=x?1:.35});
 document.querySelectorAll('#ctrl [data-m]').forEach(b=>b.classList.toggle('act',b.dataset.m===mode));
 const u=sel;$('#panel').innerHTML=u?
  '<div class="ustat">'+tr('hp')+'<b>'+u.hp+'/'+u.maxHp+'</b></div><div class="ustat">'+tr('atk')+'<b>'+u.atk+'</b></div><div class="ustat">'+tr('range')+'<b>'+u.range+'</b></div><div class="ustat">'+tr('mv')+'<b>'+u.move+'</b></div><div id="uname" style="color:'+(u.owner===1?C.cyan:C.red)+'">'+tr('u_'+u.type)+(u.cooldown?'<small style="display:block;font-size:10px;color:#8b93a7">'+tr('cd')+' '+u.cooldown+'</small>':'')+'</div>'
  :'<div class="ustat" style="width:100%">'+tr('selectUnit')+'</div>';
 draw();}
/* ================= فاز ۵: AI با Sniper kiting ================= */
const AI_DELAY=550,sleep=ms=>new Promise(r=>setTimeout(r,ms));
const AI_ORDER={support:0,sniper:1,archer:2,soldier:3,heavy:4,core:5};
const nearest=(from,list)=>{let b=null,bs=1e9;for(const c of list){const d=dist(from,c);if(d<bs){bs=d;b=c}}return b};
/* ترتیب واحدها هر نوبت چرخشی است: واحدی که نوبت قبل کمتر بازی کرده اول می‌آید (تعادل بین واحدها) */
const aiUnits=(all)=>units.filter(u=>u.owner===2&&u.hp>0&&!(u.type==='sniper'&&S.aiLevel!=='hard'&&(aiActs[u.id]>=1||(!all&&aiLast[u.id]===aiTurnNo-1)))).sort((a,b)=>aiRank?((aiRank[a.id]??99)-(aiRank[b.id]??99)):AI_ORDER[a.type]-AI_ORDER[b.type]);
function aiMakeRank(){aiTurnNo++;aiRank={};aiActs={};
 units.filter(u=>u.owner===2&&u.hp>0).map(u=>[u.id,(u.type==='core'?99:(aiLast[u.id]||0))+Math.random()*.5])
  .sort((a,b)=>a[1]-b[1]).forEach(([id],i)=>aiRank[id]=i)}
const foesOf=o=>units.filter(u=>u.owner!==o&&u.hp>0);
function threatScore(t){let s=t.atk*3+t.hp*0.6;
 if(t.type==='support')s+=4;if(t.type==='sniper')s+=2;if(t.type==='core')s+=40;if(t.hp<=2)s+=6;return s}
function deadliest(list){return list.reduce((a,b)=>threatScore(b)>threatScore(a)?b:a,list[0])}
function threatAt(q,r,owner){let dmg=0;
 for(const f of units){if(f.hp<=0||f.owner===owner||f.atk<=0)continue;
  if(f.type==='heavy'&&f.cooldown>0)continue;
  if(dist(f,{q,r})<=f.range)dmg+=f.atk}
 return dmg}
function computeFocus(foes){if(!foes.length)return null;let best=null,bestSc=-1e9;
 for(const t of foes){const sc=threatScore(t)-t.hp*1.5;if(sc>bestSc){bestSc=sc;best=t}}return best}
function canAIAttack(u){if(!canAttack(u))return false;
 if(u.type==='support'){return units.some(t=>t.hp>0&&t.owner!==u.owner&&dist(u,t)<=u.range&&t.hp<=u.atk)}
 return true}
function myObj(){return OBJ.filter(k=>{const x=units.find(u=>u.hp>0&&key(u.q,u.r)===k);return !x||x.owner!==2})}
function holdAll(){return OBJ.every(k=>{const x=units.find(u=>u.hp>0&&key(u.q,u.r)===k);return x&&x.owner===2})}
function findPath(from,to,maxSteps){const par=new Map([[key(from.q,from.r),null]]);let fr=[{q:from.q,r:from.r}],
 best={q:from.q,r:from.r},bd=dist(from,to);
 for(let st=0;st<maxSteps;st++){const nx=[];
  for(const h of fr)for(const n of neighbors(h.q,h.r)){const k=key(n.q,n.r);
   if(par.has(k)||unitAt(n.q,n.r)||OBSTACLES.has(k))continue;
   par.set(k,h);nx.push(n);const d=dist(n,to);if(d<bd){bd=d;best=n}}
  fr=nx}
 const path=[];let c=best;while(c){path.unshift(c);c=par.get(key(c.q,c.r))}
 return path}
function bestAttackSpot(u,moves,foes){let best=null,bestScore=0;
 for(const k of moves){const[q,r]=k.split(',').map(Number),cand={q,r};
  for(const t of foes){
   if(dist(u,t)<=u.range)continue;
   if(dist(cand,t)>u.range)continue;
   const kill=(t.hp<=u.atk)?15:0;
   const focusBonus=(t===aiFocus)?8:0;
   const danger=threatAt(q,r,2)*1.2;
   const sc=threatScore(t)-dist(cand,t)*0.5+kill+focusBonus-danger;
   if(sc>bestScore){bestScore=sc;best=cand}}}
 return best}
function bestHealSpot(u,moves,wounded){let best=null,bestScore=0;
 for(const k of moves){const[q,r]=k.split(',').map(Number),cand={q,r};
  for(const t of wounded){
   if(dist(u,t)<=u.range)continue;
   if(dist(cand,t)>u.range)continue;
   const sc=(t.maxHp-t.hp)*2+(t.type==='core'?8:0)-dist(cand,t)*0.3-threatAt(q,r,2)*0.6;
   if(sc>bestScore){bestScore=sc;best=cand}}}
 return best}
/* فاز ۵: عقب‌نشینی Sniper — دور از دشمن نزدیک */
function bestKiteSpot(u,moves,foes){
 if(!foes.length)return null;
 let best=null,bestD=0;
 for(const k of moves){const[q,r]=k.split(',').map(Number);
  let minD=1e9;for(const f of foes)minD=Math.min(minD,dist({q,r},f));
  if(minD>bestD){bestD=minD;best={q,r}}}
 return bestD>2?best:null}
/* fallback اسنایپر: نزدیک‌تر به هدف ولی وارد برد دشمن نشو */
function bestSniperFallback(u,moves,target,foes){
 if(!target)return null;
 let best=null,bestScore=-1e9;
 for(const k of moves){const[q,r]=k.split(',').map(Number);
  const dToTarget=dist({q,r},target);
  const safety=foes.length?Math.min(...foes.map(f=>dist({q,r},f))):99;
  const sc=-Math.abs(dToTarget-(u.range-1))*3+safety*2;
  if(sc>bestScore){bestScore=sc;best={q,r}}}
 return best}
function pickAIAction(){
 const us=aiUnits(),foes=foesOf(2),own=units.filter(u=>u.owner===2&&u.hp>0);
 const myCore=own.find(u=>u.type==='core'&&u.hp>0);
 if(!foes.length)return null;
 const allHeld=holdAll();
 if(!aiFocus||aiFocus.hp<=0)aiFocus=computeFocus(foes);
 /* ۱) کشتن فوری */
 for(const u of us){if(u.type==='support')continue;if(!canAIAttack(u))continue;
  const k=foes.filter(t=>dist(u,t)<=u.range&&t.hp<=u.atk);
  if(k.length)return{type:'attack',unit:u,target:deadliest(k)}}
 /* ۱b) heal بحرانی */
 for(const u of us){if(!canHeal(u))continue;
  const w=own.filter(t=>t!==u&&t.hp<t.maxHp&&dist(u,t)<=u.range);
  if(!w.length)continue;
  const core=w.find(t=>t.type==='core');
  const tgt=core||w.reduce((a,b)=>(a.hp/a.maxHp<=b.hp/b.maxHp)?a:b);
  if(core||tgt.hp/tgt.maxHp<0.5)return{type:'heal',unit:u,target:tgt}}
 /* ۲) تاکتیکی */
 for(const u of us){
  if(u.hasMoved){
   if(canAIAttack(u)){const inR=foes.filter(x=>dist(u,x)<=u.range);
    if(inR.length){const kill=inR.filter(x=>x.hp<=u.atk);
     if(kill.length)return{type:'attack',unit:u,target:deadliest(kill)};
     if(aiFocus&&inR.includes(aiFocus))return{type:'attack',unit:u,target:aiFocus};
     return{type:'attack',unit:u,target:deadliest(inR)}}}
   if(u.type==='support'&&canHeal(u)){const w=own.filter(t=>t!==u&&t.hp<t.maxHp&&dist(u,t)<=u.range);
    if(w.length)return{type:'heal',unit:u,target:w.reduce((a,b)=>(a.hp/a.maxHp<=b.hp/b.maxHp)?a:b)}}
   continue}
  if(u.move<1||u.type==='core')continue;
  if(allHeld&&OBJ.includes(key(u.q,u.r)))continue;
  const moves=getMoves(u);if(!moves.size)continue;
  /* Sniper kiting — پیش از منطق عمومی */
  if(u.type==='sniper'){
   const close=foes.filter(f=>dist(u,f)<=2);
   if(close.length){const kite=bestKiteSpot(u,moves,foes);if(kite)return{type:'move',unit:u,dest:kite}}
   if(canAIAttack(u)&&aiFocus&&dist(u,aiFocus)>u.range){
    const spot=bestAttackSpot(u,moves,[aiFocus]);
    if(spot)return{type:'move',unit:u,dest:spot}}
   /* fallback — نزدیک‌تر بشو ولی وارد range نشو */
   const tg=aiFocus||nearest(u,foes);
   const fb=bestSniperFallback(u,moves,tg,foes);
   if(fb)return{type:'move',unit:u,dest:fb};
   continue}
  /* عقب‌نشینی امن */
  if(u.hp<=u.maxHp*0.25&&myCore&&myCore!==u){
   if(foes.some(t=>dist(u,t)<=2)&&dist(u,myCore)>3){
    const path=findPath(u,myCore,12);if(path.length>1)return{type:'move',unit:u,dest:path[1]}}}
  if(u.type==='support'&&canHeal(u)){
   const w=own.filter(t=>t!==u&&t.hp<t.maxHp);
   if(w.length&&!w.some(t=>dist(u,t)<=u.range)){
    const spot=bestHealSpot(u,moves,w);if(spot)return{type:'move',unit:u,dest:spot}}}
  if(canAIAttack(u)){const spot=bestAttackSpot(u,moves,foes);if(spot)return{type:'move',unit:u,dest:spot}}
  if(u.type!=='support'){
   const objs=myObj();
   if(objs.length){const held=3-objs.length;let cObj=null,cD=1e9;
    for(const k of objs){const[oq,orr]=k.split(',').map(Number);
     const d=dist(u,{q:oq,r:orr});if(d<cD){cD=d;cObj={q:oq,r:orr}}}
    const nd=nearest(u,foes),ndD=nd?dist(u,nd):1e9;
    if(cObj&&cD<=6&&(held>=2||cD<=ndD)){
     const path=findPath(u,cObj,12);if(path.length>1)return{type:'move',unit:u,dest:path[1]}}}}}
 /* ۳) حمله / heal از موقعیت فعلی */
 for(const u of us){
  if(canHeal(u)){const w=own.filter(t=>t!==u&&t.hp<t.maxHp&&dist(u,t)<=u.range);
   if(w.length)return{type:'heal',unit:u,target:w.reduce((a,b)=>(a.hp/a.maxHp<=b.hp/b.maxHp)?a:b)}}
  if(canAIAttack(u)){const t=foes.filter(x=>dist(u,x)<=u.range);
   if(t.length){const kill=t.filter(x=>x.hp<=u.atk);
    if(kill.length)return{type:'attack',unit:u,target:deadliest(kill)};
    if(aiFocus&&t.includes(aiFocus))return{type:'attack',unit:u,target:aiFocus};
    return{type:'attack',unit:u,target:deadliest(t)}}}}
 /* ۴) پیشروی */
 for(const u of us){
  if(u.hasMoved||u.move<1||u.type==='core'||u.type==='sniper')continue;
  if(allHeld&&OBJ.includes(key(u.q,u.r)))continue;
  const moves=getMoves(u);if(!moves.size)continue;
  const enemyCore=foes.find(t=>t.type==='core');
  let tg=nearest(u,foes);
  if(enemyCore&&(!tg||dist(u,enemyCore)<dist(u,tg)+2))tg=enemyCore;
  if(!tg||dist(u,tg)<=u.range)continue;
  const path=findPath(u,tg,12);
  if(path.length>1)return{type:'move',unit:u,dest:path[1]}}
 return null}
function aiPerformAction(a){const u=a.unit;aiLast[u.id]=aiTurnNo;aiActs[u.id]=(aiActs[u.id]||0)+1;sel=u;moveSet=new Set();atkSet=new Set();healSet=new Set();
 if(a.type==='move'){u.mv={q:u.q,r:u.r,t:performance.now()};SFX.move();u.q=a.dest.q;u.r=a.dest.r;u.hasMoved=true;ap--}
 else if(a.type==='attack')attack(u,a.target);else heal(u,a.target)}
/* ---- سطح سختی AI: آسان / متوسط / سخت ---- */
const AI_LEVELS={easy:{mistake:.55,quit:.25},medium:{mistake:.2,quit:.08},hard:{mistake:0,quit:0}};
function randomAIAction(lv){
 const us=aiUnits(),foes=foesOf(2),atk=[],oth=[];
 for(const u of us){
  if(canAttack(u))foes.filter(t=>dist(u,t)<=u.range).forEach(t=>atk.push({type:'attack',unit:u,target:t}));
  if(canHeal(u))units.filter(t=>t.owner===2&&t.hp>0&&t!==u&&t.hp<t.maxHp&&dist(u,t)<=u.range).forEach(t=>oth.push({type:'heal',unit:u,target:t}));
  if(!u.hasMoved&&u.move>=1&&u.type!=='core')getMoves(u).forEach(k=>{const[q,r]=k.split(',').map(Number);oth.push({type:'move',unit:u,dest:{q,r}})});
 }
 const pick=a=>a[Math.floor(Math.random()*a.length)];
 if(atk.length&&(lv==='easy'?Math.random()<.4:Math.random()<.6))return pick(atk);
 const all=atk.concat(oth);return all.length?pick(all):null}
function aiChoose(){
 const lv=AI_LEVELS[S.aiLevel]?S.aiLevel:'medium',P=AI_LEVELS[lv];
 if(Math.random()<P.quit)return null;
 if(Math.random()<P.mistake){const r=randomAIAction(lv);if(r)return r}
 const r0=pickAIAction();
 /* اسنایپر در سطح آسان و متوسط ساده‌تر بازی می‌کند */
 if(r0&&r0.unit.type==='sniper'&&lv!=='hard'&&Math.random()<(lv==='easy'?.7:.35)){const r=randomAIAction(lv);if(r)return r}
 return r0}
async function AITurn(){
 if(over||turn!==2||!aiMode)return;const gen=aiGen,ind=$('#ai-think');ind.style.display='block';
 aiFocus=null;aiMakeRank();await sleep(AI_DELAY);
 while(ap>0&&!over&&gen===aiGen){const a=aiChoose();if(!a)break;aiPerformAction(a);refresh();await sleep(AI_DELAY)}
 ind.style.display='none';if(over||gen!==aiGen)return;
 await sleep(AI_DELAY/2);if(gen!==aiGen)return;sel=null;endTurn()}
/* پنجرهٔ مخصوص آنلاین */
function netShow(html,acts){$('#netBody').innerHTML=html;const box=$('#netActions');box.innerHTML='';
 (acts||[]).forEach(([label,fn])=>{const b=document.createElement('button');b.className='btn';b.style.flex='1';b.textContent=label;b.onclick=fn;box.appendChild(b)});
 $('#netModal').style.display='flex'}
const netHide=()=>{$('#netModal').style.display='none'};
const noNet=()=>netShow('<b>'+tr('noNetTitle')+'</b><br>'+tr('noNetMsg'),[[tr('close'),netHide]]);
/* host = Player 1، guest = Player 2 */
const myTurn=()=>onlineMode==='host'?turn===1:onlineMode==='guest'?turn===2:true;

/* ================= NET — Online multiplayer via PeerJS (host authoritative) ================= */
let onlineMode = null; // null | 'host' | 'guest'

const NET = (()=>{
  let peer=null, conn=null, connected=false, isHost=false, roomCode=null;
  const CH='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const genCode=()=>{let s='NC-';for(let i=0;i<5;i++)s+=CH[Math.floor(Math.random()*CH.length)];return s};
  function cleanup(){
    try{if(conn)conn.close()}catch(e){}
    try{if(peer)peer.destroy()}catch(e){}
    lanReset();
    peer=null;conn=null;connected=false;
  }
  /* ---- روش ۲: وای‌فای / هات‌اسپات (سوکت بومی اندروید؛ بدون اینترنت و بدون سرور) ---- */
  const hasLan=()=>typeof window.NeonLan!=='undefined';
  const lan={h:{},rooms:new Map(),timer:null};
  window.NeonLanCB={onEvent(e){const f=e&&lan.h[e.k];if(f)f(e)}};
  function lanReset(){
    lan.h={};clearInterval(lan.timer);lan.timer=null;lan.rooms.clear();
    try{if(hasLan()){NeonLan.stopScan();NeonLan.close()}}catch(e){}
  }
  function mkLanConn(){
    const h={};
    lan.h.open=()=>h.open&&h.open();
    lan.h.msg=e=>{let m;try{m=JSON.parse(e.d)}catch(x){return}h.data&&h.data(m)};
    lan.h.close=()=>h.close&&h.close();
    lan.h.error=e=>h.error&&h.error({message:e.m});
    return {on(ev,f){h[ev]=f},send(m){NeonLan.send(JSON.stringify(m))},close(){try{NeonLan.close()}catch(e){}}};
  }
  function hostLan(onReady,onOpen,onError){
    isHost=true;roomCode=null;cleanup();
    if(!hasLan()){onError&&onError({message:'app_only'});return}
    conn=mkLanConn();wire(onOpen,onError);
    lan.h.ready=e=>{roomCode=e.ip+(e.port===7777?'':':'+e.port);onReady(roomCode)};
    NeonLan.host();
  }
  function joinLan(addr,onOpen,onError){
    isHost=false;roomCode=(addr||'').trim();cleanup();
    if(!hasLan()){onError&&onError({message:'app_only'});return}
    conn=mkLanConn();wire(onOpen,onError);
    NeonLan.join(roomCode);
  }
  /* جستجوی اتاق‌های اطراف؛ onList هر بار که فهرست عوض شود با آرایهٔ {name,ip,port} صدا زده می‌شود */
  function lanScan(onList){
    lanReset();
    if(!hasLan())return false;
    const push=()=>onList([...lan.rooms.values()].sort((x,y)=>x.name<y.name?-1:x.name>y.name?1:0));
    lan.h.found=e=>{const k=e.ip+':'+e.port,had=lan.rooms.has(k);
      lan.rooms.set(k,{name:String(e.name||''),ip:e.ip,port:e.port,t:Date.now()});if(!had)push()};
    lan.timer=setInterval(()=>{const now=Date.now();let ch=false;
      lan.rooms.forEach((v,k)=>{if(now-v.t>4000){lan.rooms.delete(k);ch=true}});if(ch)push()},1000);
    NeonLan.scan();return true;
  }
  function wire(onOpen,onError){
    conn.on('open',()=>{connected=true;onOpen()});
    conn.on('data',d=>{try{handleMsg(d)}catch(e){console.warn('netmsg',e)}});
    conn.on('close',()=>{if(connected){connected=false;netEnd('oppLeft')}});
    conn.on('error',e=>onError&&onError(e));
  }
  function host(onReady,onOpen,onError){
    isHost=true;roomCode=genCode();cleanup();
    peer=new Peer(roomCode,{debug:0});
    peer.on('open',()=>onReady(roomCode));
    peer.on('error',e=>{
      if(e.type==='unavailable-id'){setTimeout(()=>host(onReady,onOpen,onError),200);return}
      onError&&onError(e);
    });
    peer.on('connection',c=>{
      if(conn){c.close();return}
      conn=c;
      wire(onOpen,onError);
    });
  }
  function join(code,onOpen,onError){
    isHost=false;roomCode=(code||'').trim().toUpperCase();cleanup();
    peer=new Peer({debug:0});
    peer.on('open',()=>{
      conn=peer.connect(roomCode,{reliable:true});
      wire(onOpen,onError);
    });
    peer.on('error',e=>onError&&onError(e));
  }
  function send(msg){if(conn&&connected){try{conn.send(msg)}catch(e){console.warn(e)}}}
  return {
    host,join,hostLan,joinLan,lanScan,hasLan,send,cleanup,
    get isHost(){return isHost},
    get connected(){return connected},
    get roomCode(){return roomCode}
  };
})();

/* ---------- Snapshot / Sync ---------- */
function snapshot(){
  return {
    units: units.map(u=>({id:u.id,owner:u.owner,type:u.type,hp:u.hp,maxHp:u.maxHp,
      atk:u.atk,range:u.range,move:u.move,hasMoved:u.hasMoved,hasAttacked:u.hasAttacked,
      cooldown:u.cooldown,q:u.q,r:u.r})),
    turn, ap, holdStreak:{...holdStreak}, over, tl:Math.max(0,Math.round((turnEnd-performance.now())/1000)), to:{...timeouts}
  };
}
function applySnapshot(s){
  /* مهمان فقط وضعیت را می‌گیرد؛ انیمیشن‌ها را با مقایسه‌ی وضعیت قبلی و جدید می‌سازد */
  const now=performance.now(),old=new Map((units||[]).map(u=>[u.id,u]));
  const nu=s.units.map(u=>({...u})),attackers=[],hurt=[];
  nu.forEach(u=>{const o=old.get(u.id);if(!o)return;
    const same=o.q===u.q&&o.r===u.r;
    if(!same)u.mv={q:o.q,r:o.r,t:now};else if(o.mv)u.mv=o.mv;
    if(o.hitT)u.hitT=o.hitT;if(o.dieT)u.dieT=o.dieT;
    const p=hexToPixel(u.q,u.r);
    if(u.hp<o.hp){u.hitT=now;if(u.hp<=0)u.dieT=now;hurt.push(u);
      fx.push({k:'dmg',x:p.x,y:p.y,txt:'-'+(o.hp-u.hp),t0:now,col:C.red,dur:750})}
    else if(u.hp>o.hp&&u.hp>0){fx.push({k:'dmg',x:p.x,y:p.y,txt:'+'+(u.hp-o.hp),t0:now,col:C.cyan,dur:750});fxHeal(p.x,p.y)}
    if(u.hasAttacked&&!o.hasAttacked)attackers.push(u)});
  if(hurt.length)vib(hurt.some(h=>h.hp<=0)?[40,30,90]:30);   /* مهمان: لرزش با دریافت وضعیت */
  hurt.forEach(t=>{const a=attackers.find(x=>x.owner!==t.owner&&dist(x,t)<=x.range)||attackers.find(x=>x.owner!==t.owner);
    if(a){const A=hexToPixel(a.q,a.r),B=hexToPixel(t.q,t.r);
      fx.push({k:'proj',x1:A.x,y1:A.y,x2:B.x,y2:B.y,t0:now,col:a.owner===1?C.cyan:C.red,dur:a.type==='sniper'?300:180});
      const ac=a.owner===1?C.cyan:C.red;fxMuzzle(A.x,A.y,ac);fxImpact(B.x,B.y,ac,t.hp<=0,t.type==='core',a.type==='sniper'||a.type==='heavy',a.type==='sniper'?300:180)}
    else{const B=hexToPixel(t.q,t.r);fxImpact(B.x,B.y,C.red,t.hp<=0,t.type==='core',false,0)}});
  old.forEach(o=>{if(!nu.some(u=>u.id===o.id)&&o.hp>0)nu.push({...o,hp:0,hitT:now,dieT:now,mv:null})});
  units=nu;if(s.tl!=null)turnEnd=performance.now()+s.tl*1000;if(s.to)timeouts={...s.to};
  turn=s.turn;ap=s.ap;holdStreak={...s.holdStreak};over=s.over;
  sel=null;moveSet=new Set();atkSet=new Set();healSet=new Set();
  refresh();
}
function broadcastState(){ if(onlineMode==='host') NET.send({t:'state',s:snapshot()}); }

/* تایمر نوبت (آنلاین): میزبان مرجع است و وقتی زمان تمام شود نوبت را خودکار تمام می‌کند */
setInterval(()=>{
  const el=$('#tmr');if(!el)return;
  const on=onlineMode&&!over&&$('#game').classList.contains('on');
  el.style.display=on?'block':'none';
  if(!on){_lastBeep=-1;return}
  const ms=turnEnd-performance.now(),left=Math.max(0,Math.ceil(ms/1000));
  $('#tmrN').textContent='⏱ '+left;el.classList.toggle('low',left<=5);
  const heart=(p,col)=>{let h='';for(let i=0;i<MAX_TIMEOUTS;i++)h+=i<MAX_TIMEOUTS-timeouts[p]?'♥':'♡';return '<span class="lv" style="color:'+col+'">'+h+'</span>'};
  $('#lv1').innerHTML=heart(1,C.cyan);$('#lv2').innerHTML=heart(2,C.red);
  const y=document.getElementById('bEndYes');if(y&&!myTurn())$('#modal').classList.remove('on');
  if(onlineMode==='host'&&ms<=0){
    /* هر بار زمان نوبت تمام شود یک قلب از بازیکن کم می‌شود (حتی اگر در آن نوبت کاری کرده باشد) و هیچ‌وقت برنمی‌گردد */
    timeouts[turn]++;
    if(timeouts[turn]>=MAX_TIMEOUTS){over=true;refresh();broadcastState();gameOver(turn===1?2:1,'time');return}
    _auto=true;try{endTurn()}finally{_auto=false}return}
  if(myTurn()&&left>0&&left<=3&&left!==_lastBeep){_lastBeep=left;try{left<=1?SFX.warn():SFX.tick()}catch(e){}}
},250);
function updateNetStatus(){
  const el=$('#netStatus'); if(!el) return;
  if(!onlineMode){el.textContent='';return}
  const role=NET.isHost?'HOST':'GUEST';
  const ok=NET.connected?'🟢':'🔴';
  el.textContent=ok+' '+role+(NET.roomCode?' · '+NET.roomCode:'');
}
const netReset=()=>{NET.cleanup();onlineMode=null;updateNetStatus()};

/* ---------- Host: apply guest action ---------- */
function applyGuestAction(msg){
  if(over) return;
  if(msg.kind==='move'){
    if(turn!==2||ap<1) return;
    const u=units.find(x=>x.id===msg.unitId);
    if(!u||u.hp<=0||u.owner!==2||u.hasMoved) return;
    if(!getMoves(u).has(key(msg.q,msg.r))) return;
    u.mv={q:u.q,r:u.r,t:performance.now()};
    SFX.move();u.q=msg.q;u.r=msg.r;u.hasMoved=true;ap--;
    refresh();
  } else if(msg.kind==='attack'){
    if(turn!==2||ap<1) return;
    const u=units.find(x=>x.id===msg.unitId);
    const t=units.find(x=>x.id===msg.targetId);
    if(!u||!t||u.hp<=0||t.hp<=0||u.owner!==2||t.owner===2||!canAttack(u)) return;
    if(dist(u,t)>u.range) return;
    attack(u,t);refresh();
  } else if(msg.kind==='heal'){
    if(turn!==2||ap<1) return;
    const u=units.find(x=>x.id===msg.unitId);
    const t=units.find(x=>x.id===msg.targetId);
    if(!u||!t||u.hp<=0||t.hp<=0||u.owner!==2||t.owner!==2||!canHeal(u)) return;
    if(dist(u,t)>u.range||t.hp>=t.maxHp) return;
    heal(u,t);refresh();
  } else if(msg.kind==='endTurn'){
    if(turn!==2) return;
    endTurn();
  }
}

/* ---------- Message handler ---------- */
function handleMsg(msg){
  if(msg.t==='hello'){
    if(NET.isHost){
      const first=Math.random()<.5?1:2;   /* میزبان قرعه را می‌اندازد */
      NET.send({t:'start',first,map:S.map||'classic'});
      $('#netModal').style.display='none';
      onlineMode='host';
      newGame(false,first,S.map);
      show('game');
      updateNetStatus();
      broadcastState();   /* همگام‌سازی اولیه با مهمان */
    }
  } else if(msg.t==='rematch'){
    rmTheirs=true;setRmStatus();if(rmMine&&NET.isHost)hostStartRematch();
  } else if(msg.t==='start'){
    if(!NET.isHost){
      $('#netModal').style.display='none';$('#modal').classList.remove('on');
      onlineMode='guest';
      newGame(false,msg.first,msg.map||'classic');
      show('game');
      updateNetStatus();
    }
  } else if(msg.t==='sfx'){
    if(!NET.isHost){window._rx=(window._rx||0)+1;if(SFX._o[msg.n])SFX._o[msg.n]()}
  } else if(msg.t==='state'){
    if(!NET.isHost&&!over) applySnapshot(msg.s);
  } else if(msg.t==='action'){
    if(NET.isHost){ applyGuestAction(msg); broadcastState(); }
  } else if(msg.t==='over'){
    if(!NET.isHost){over=true;gameOver(msg.w,msg.why)}
  } else if(msg.t==='bye'){
    netEnd('oppLeft');
  }
}

function netEnd(reason){
  if(!onlineMode) return;
  if(over){   /* بازی تمام شده: پیام برد را با «اتصال قطع شد» جایگزین نکن */
    NET.cleanup();onlineMode=null;updateNetStatus();
    const b=$('#bAgain');if(b){b.disabled=true;b.style.opacity=.4}
    const st=$('#rmStatus');if(st)st.textContent=tr(reason);
    return;
  }
  over=true;stopAmbient();
  onlineMode=null;
  updateNetStatus();
  modal('<b style="color:var(--signal-red)">'+tr('connLost')+'</b><br>'+tr(reason));
}

/* ---------- Modals ---------- */
const netTabs=cur=>`<div style="display:flex;gap:8px;margin:10px 0 6px">
  <button class="btn ntab ${cur===1?'on':''}" data-m="1" style="flex:1;padding:8px 4px;font-size:13px;line-height:1.4">${tr('m1')}<br><small>${tr('m1s')}</small></button>
  <button class="btn ntab ${cur===2?'on':''}" data-m="2" style="flex:1;padding:8px 4px;font-size:13px;line-height:1.4;border-color:var(--amber-core)">${tr('m2')}<br><small>${tr('m2s')}</small></button></div>`;
const lanErr=e=>{const c=(e&&(e.message||e.type))||'';
  const m={no_network:'lanNoNet',bad_addr:'lanBadAddr',app_only:'lanAppOnly',connect_failed:'lanConnFail'};
  return m[c]?tr(m[c]):tr('err')+c};
/* خط عیب‌یابی شبکه (برای صفحهٔ روش ۲): اینترفیس‌ها و وضعیت VPN */
function lanInfo(){
  try{
    const o=JSON.parse(NeonLan.info());
    const ifs=o.ifs.map(i=>i.n+' '+i.a.join(',')+(i.skip?' (x)':'')).join('  |  ')||'no network';
    return {vpn:!!o.vpn,text:(o.vpn?'VPN ON  |  ':'')+ifs};
  }catch(e){return {vpn:false,text:'info: n/a'}}
}
function leaveNet(){NET.cleanup();onlineMode=null;$('#netModal').style.display='none';updateNetStatus()}

function renderHost(method){
  NET.cleanup();onlineMode=null;
  let html=`<b>${tr('hostTitle')}</b>${netTabs(method)}`;
  if(method===1){
    html+=`${tr('hostShare')}<br><br>
    <div id="roomCodeBig" style="font-size:30px;letter-spacing:6px;color:var(--amber-core);text-align:center;padding:18px;background:#000;border-radius:12px;font-weight:800">········</div>
    <div id="hostStatus" style="text-align:center;color:#8b93a7;margin-top:14px;font-size:12px">${tr('hostGen')}</div>`;
    $('#netActions').innerHTML=`<button class="btn" id="bCopyCode" style="flex:1">${tr('copy')}</button>
      <button class="btn" id="bCancelHost" style="flex:1;border-color:var(--signal-red)">${tr('cancel')}</button>`;
  }else{
    html+=`<div style="font-size:12px;color:#8b93a7">${tr('lanNote')}</div><br>${tr('lanHostShare')}<br><br>
    <div id="lanAddr" style="font-size:26px;letter-spacing:2px;color:var(--amber-core);text-align:center;padding:18px;background:#000;border-radius:12px;font-weight:800;direction:ltr">········</div>
    <div id="lanSt" style="text-align:center;color:#8b93a7;margin-top:14px;font-size:12px">${tr('lanStarting')}</div>
    <div id="lanInfo" style="text-align:center;color:#5d667f;margin-top:10px;font:10px/1.5 monospace;direction:ltr;word-break:break-all"></div>`;
    $('#netActions').innerHTML=`<button class="btn" id="bCancelHost" style="flex:1;border-color:var(--signal-red)">${tr('cancel')}</button>`;
  }
  $('#netBody').innerHTML=html;$('#netModal').style.display='flex';
  document.querySelectorAll('#netBody .ntab').forEach(b=>b.onclick=()=>renderHost(+b.dataset.m));
  $('#bCancelHost').onclick=leaveNet;
  if(method===1){
    if(typeof Peer==='undefined'){$('#hostStatus').textContent=tr('noNetMsg');return}
    onlineMode='host';
    NET.host(
      code=>{const el=document.getElementById('roomCodeBig');if(el)el.textContent=code;
        const st=document.getElementById('hostStatus');if(st)st.textContent=tr('hostWait')},
      ()=>{},
      err=>{const st=document.getElementById('hostStatus');if(st)st.textContent=tr('err')+(err.message||err.type)});
    $('#bCopyCode').onclick=()=>{if(NET.roomCode&&navigator.clipboard)navigator.clipboard.writeText(NET.roomCode)};
  }else{
    const st=$('#lanSt'),ad=$('#lanAddr'),inf=$('#lanInfo');
    if(!NET.hasLan()){st.textContent=tr('lanAppOnly');return}
    onlineMode='host';
    const li=lanInfo();inf.textContent=li.text;
    NET.hostLan(addr=>{ad.textContent=addr;st.textContent=tr('hostWait')},()=>{},
      err=>{st.textContent=lanErr(err)});
    setTimeout(()=>{if(!/\d/.test(ad.textContent)&&document.body.contains(ad)){
      const l2=lanInfo();inf.textContent=l2.text;st.textContent=l2.vpn?tr('lanVpn'):tr('lanSlow')}},2500);
  }
}
function renderJoin(method){
  NET.cleanup();onlineMode=null;
  let html=`<b>${tr('joinTitle')}</b>${netTabs(method)}`;
  if(method===1){
    html+=`${tr('joinPaste')}<br><br>
    <input id="joinCodeInput" placeholder="NC-XXXXX" autocomplete="off"
      style="width:100%;box-sizing:border-box;padding:16px;font-size:22px;letter-spacing:4px;text-align:center;background:#000;border:2px solid var(--amber-core);border-radius:12px;color:var(--amber-core);font-weight:800;text-transform:uppercase;outline:none">
    <div id="joinStatus" style="text-align:center;color:#8b93a7;margin-top:14px;font-size:12px"></div>`;
    $('#netActions').innerHTML=`<button class="btn" id="bDoJoin" style="flex:1;border-color:var(--amber-core)">${tr('connect')}</button>
      <button class="btn" id="bCancelJoin" style="flex:1;border-color:var(--signal-red)">${tr('cancel')}</button>`;
  }else{
    html+=`<div style="font-size:12px;color:#8b93a7">${tr('lanNote')}</div>
    <div class="mstep">${tr('lanRooms')}</div>
    <div id="lanRooms" style="display:flex;flex-direction:column;gap:8px;margin-top:6px"></div>
    <div class="mstep">${tr('lanManual')}</div>
    <input id="lanInput" placeholder="192.168.43.1" inputmode="decimal" autocomplete="off"
      style="width:100%;box-sizing:border-box;margin-top:6px;padding:14px;font-size:20px;letter-spacing:2px;text-align:center;direction:ltr;background:#000;border:2px solid var(--amber-core);border-radius:12px;color:var(--amber-core);font-weight:800;outline:none">
    <div id="joinStatus" style="text-align:center;color:#8b93a7;margin-top:14px;font-size:12px"></div>
    <div id="lanInfo" style="text-align:center;color:#5d667f;margin-top:10px;font:10px/1.5 monospace;direction:ltr;word-break:break-all"></div>`;
    $('#netActions').innerHTML=`<button class="btn" id="bDoJoin" style="flex:1;border-color:var(--amber-core)">${tr('connect')}</button>
      <button class="btn" id="bCancelJoin" style="flex:1;border-color:var(--signal-red)">${tr('cancel')}</button>`;
  }
  $('#netBody').innerHTML=html;$('#netModal').style.display='flex';
  document.querySelectorAll('#netBody .ntab').forEach(b=>b.onclick=()=>renderJoin(+b.dataset.m));
  $('#bCancelJoin').onclick=leaveNet;
  if(method===1){
    const doJoin=()=>{
      if(typeof Peer==='undefined'){$('#joinStatus').textContent=tr('noNetMsg');return}
      const code=($('#joinCodeInput').value||'').trim().toUpperCase();
      if(!code){$('#joinStatus').textContent=tr('enterCode');return}
      onlineMode='guest';$('#joinStatus').textContent=tr('connecting');
      NET.join(code,()=>{NET.send({t:'hello'})},
        err=>{$('#joinStatus').textContent=tr('err')+(err.message||err.type);onlineMode=null});
    };
    $('#bDoJoin').onclick=doJoin;
    $('#joinCodeInput').addEventListener('keydown',e=>{if(e.key==='Enter')doJoin()});
  }else{
    const st=$('#joinStatus'),list=$('#lanRooms'),inp=$('#lanInput');
    const go=addr=>{
      addr=(addr||'').trim();
      if(!addr){st.textContent=tr('lanBadAddr');return}
      if(!NET.hasLan()){st.textContent=tr('lanAppOnly');return}
      onlineMode='guest';st.textContent=tr('connecting');
      NET.joinLan(addr,()=>{NET.send({t:'hello'})},
        err=>{st.textContent=lanErr(err);onlineMode=null});
    };
    const showRooms=rooms=>{
      list.textContent='';
      if(!rooms.length){const d=document.createElement('div');d.style.cssText='color:#8b93a7;font-size:12px';d.textContent=tr('lanScanning');list.appendChild(d);return}
      rooms.forEach(r=>{const b=document.createElement('button');b.className='btn';
        b.style.cssText='width:100%;border-color:var(--amber-core);color:var(--amber-core);direction:ltr';
        b.textContent=r.name+' · '+r.ip;b.onclick=()=>go(r.ip+':'+r.port);list.appendChild(b)});
    };
    $('#bDoJoin').onclick=()=>go(inp.value);
    inp.addEventListener('keydown',e=>{if(e.key==='Enter')go(inp.value)});
    if(NET.lanScan(showRooms))showRooms([]);else st.textContent=tr('lanAppOnly');
    if(NET.hasLan()){const li=lanInfo();$('#lanInfo').textContent=li.text;if(li.vpn)st.textContent=tr('lanVpn')}
  }
}
const openHostModal=()=>renderHost(1);
const openJoinModal=()=>renderJoin(1);
/* END TURN: guest اکشن را به host می‌فرستد، host مستقیم اجرا و همگام می‌کند */
function localEnd(){if(!myTurn()||(aiMode&&turn===2))return;
 if(onlineMode==='guest'){NET.send({t:'action',kind:'endTurn'});return}
 endTurn();broadcastState()}
/* ---------- تعامل لمسی ---------- */
cv.addEventListener('pointermove',e=>{const b=cv.getBoundingClientRect(),h=pixelToHex(e.clientX-b.left,e.clientY-b.top);hover=key(h.q,h.r)});
cv.addEventListener('pointerleave',()=>hover=null);
cv.addEventListener('pointerdown',e=>{
 const b=cv.getBoundingClientRect(),h=pixelToHex(e.clientX-b.left,e.clientY-b.top),k=key(h.q,h.r);
 if(over||introActive||!cellSet.has(k))return;
 if(typeof TUT!=='undefined'&&TUT.on&&!tutCell(k))return;
 if(aiMode&&turn===2)return;
 // online: فقط نوبت خودت
 if(onlineMode==='guest'&&turn!==2)return;
 if(onlineMode==='host'&&turn!==1)return;
 const t=unitAt(h.q,h.r);

 // GUEST: فقط intent می‌فرستد
 if(onlineMode==='guest'){
   if(moveSet.has(k)&&sel){
     NET.send({t:'action',kind:'move',unitId:sel.id,q:h.q,r:h.r});return}
   if(atkSet.has(k)&&t){
     NET.send({t:'action',kind:'attack',unitId:sel.id,targetId:t.id});return}
   if(healSet.has(k)&&t){
     NET.send({t:'action',kind:'heal',unitId:sel.id,targetId:t.id});return}
   if(t&&t.owner===2)select(t);else select(null);
   refresh();return;
 }

 // LOCAL یا HOST: اعمال مستقیم (attack/heal خودشان broadcast می‌کنند)
 if(moveSet.has(k)&&sel){sel.mv={q:sel.q,r:sel.r,t:performance.now()};SFX.move();
   sel.q=h.q;sel.r=h.r;sel.hasMoved=true;ap--;select(sel);refresh();broadcastState();return}
 if(atkSet.has(k)&&t){attack(sel,t);if(!over)select(sel);refresh();return}
 if(healSet.has(k)&&t){heal(sel,t);select(sel);refresh();return}
 if(t&&t.owner===turn)select(t);
 else if(t){sel=t;moveSet=new Set();atkSet=new Set();healSet=new Set()}
 else select(null);
 refresh();
});
document.querySelectorAll('#ctrl [data-m]').forEach(b=>b.onclick=()=>{if(typeof TUT!=='undefined'&&TUT.on&&!tutMode(b.dataset.m))return;mode=b.dataset.m;select(sel);refresh()});
const doEnd=()=>{
  if(onlineMode==='guest'){ NET.send({t:'action',kind:'endTurn'}); return }
  endTurn(); // broadcast داخل خودش هست
};
$('#bEnd').onclick=()=>{
  if(over)return;
  if(typeof TUT!=='undefined'&&TUT.on&&!tutEnd())return;
  /* تأیید پایان نوبت وقتی AP باقی مانده (در تنظیمات قابل خاموش‌کردن) */
  if(S.confirmEnd!==false&&ap>0&&myTurn()&&!(aiMode&&turn===2)&&!(typeof TUT!=='undefined'&&TUT.on)){
    modal('<b>'+tr('endAsk1')+ap+tr('endAsk2')+'</b><br><br><button class="btn" id="bEndYes" style="width:100%;border-color:var(--signal-red);color:var(--signal-red)">'+tr('yesEnd')+'</button>');
    $('#bEndYes').onclick=()=>{$('#modal').classList.remove('on');if(!over&&myTurn())doEnd()};
    return}
  doEnd();
};
const show=id=>{if(id!=='game'&&typeof TUT!=='undefined'&&TUT.on)tutStop();document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('on',s.id===id));if(id==='game')requestAnimationFrame(resize);else{_introT.forEach(clearTimeout);introActive=false;const o=$('#firstOv');if(o)o.classList.remove('on')}};
function mapLabel(){const e=$('#mapLbl');if(e)e.textContent=tr('map_'+(S.map||'classic'))}
/* ---------- انتخاب نقشه قبل از شروع بازی (v1.9.5) ---------- */
function mapSvg(id){const m=MAPS[id],sz=9,w=Math.sqrt(3)*sz,W=w*8.5+2,H=sz*12.5+2,set=a=>new Set(a.map(x=>x[0]+','+x[1])),ob=set(m.obs),rp=set(m.rep),oj=set(m.obj);
 let o='<svg viewBox="0 0 '+W.toFixed(1)+' '+H.toFixed(1)+'" style="width:100%;display:block">';
 for(let r=0;r<8;r++)for(let c=0;c<8;c++){const x=1+w*(c+.5*(r&1)+.5),y=1+sz+r*1.5*sz,k=c+','+r;let f='#111826',st='#1c6e80';
  if(ob.has(k)){f='#4a5163';st='#8b93a7'}else if(rp.has(k)){f='#0b5560';st='#00E5FF'}else if(oj.has(k)){f='#4a2478';st='#A855F7'}
  else if(c===0&&r===7){f='#006c7a';st='#00E5FF'}else if(c===7&&r===0){f='#7a1a2c';st='#FF3B5C'}
  let pts='';for(let a=0;a<6;a++){const t=(-90+60*a)*Math.PI/180;pts+=(x+sz*.93*Math.cos(t)).toFixed(1)+','+(y+sz*.93*Math.sin(t)).toFixed(1)+' '}
  o+='<polygon points="'+pts+'" fill="'+f+'" stroke="'+st+'" stroke-width="1"/>'}
 return o+'</svg>'}
function pickMap(cb){const cur=S.map||'classic';
 modal('<b>🗺 '+tr('mapTitle')+'</b><div class="mapRow">'+MAP_IDS.map(id=>{const m=MAPS[id];
  return '<button class="mapCard'+(id===cur?' cur':'')+'" data-id="'+id+'">'+mapSvg(id)+'<div class="mc-n">'+tr('map_'+id)+'</div><small>'+(m.obs.length+' '+tr('mapObs')+' · '+m.rep.length+' '+tr('mapRep'))+'</small></button>'}).join('')
  +'</div>');$('#modal').classList.add('bgm');
 document.querySelectorAll('#mtxt .mapCard').forEach(b=>b.onclick=()=>{S.map=b.dataset.id;syncSet();$('#modal').classList.remove('on');cb()});}
$('#bLocal').onclick=()=>pickMap(()=>{ NET.cleanup();onlineMode=null;updateNetStatus(); show('game');newGame(false) });
const startAI=lv=>{S.aiLevel=lv;syncSet();pickMap(()=>{NET.cleanup();onlineMode=null;updateNetStatus();show('game');newGame(true)})};
$('#bAI').onclick=()=>{
  const col={easy:'var(--neon-cyan)',medium:'var(--amber-core)',hard:'var(--signal-red)'};
  modal('<b>'+tr('aiLvTitle')+'</b>'+['easy','medium','hard'].map(l=>'<button class="btn" data-lv="'+l+'" style="width:100%;margin-top:12px;border-color:'+col[l]+';color:'+col[l]+(S.aiLevel===l?';box-shadow:0 0 12px '+col[l]+' inset':'')+'">'+(S.aiLevel===l?'✓ ':'')+tr('lv_'+l)+'<br><small style="font-weight:400;opacity:.8;color:var(--hull-silver)">'+tr('lvd_'+l)+'</small></button>').join(''));
  $('#modal').classList.add('bgm');document.querySelectorAll('#mtxt [data-lv]').forEach(b=>b.onclick=()=>startAI(b.dataset.lv));
};
$('#bOnline').onclick=()=>{
  const st='width:100%;margin-top:12px;border-color:var(--amber-core);color:var(--amber-core)';
  modal('<b>🌐 '+tr('online')+'</b><button class="btn" id="oHost" style="'+st+'">'+tr('host')+'</button><button class="btn" id="oJoin" style="'+st+'">'+tr('join')+'</button>');
  $('#modal').classList.add('bgm');
  $('#oHost').onclick=()=>pickMap(openHostModal);
  $('#oJoin').onclick=()=>{$('#modal').classList.remove('on');openJoinModal()};
};
const modal=t=>{$('#modal').style.background='';const _m=$('#mtxt');_m.style.transition='none';_m.style.transform='';_m.innerHTML=t;_m.scrollTop=0;$('#modal').classList.remove('wide','scr','bgm');$('#modal').classList.add('on')};
/* v1.8.1 — کشش لاستیکی هنگام اسکرول در پنجره‌های تنظیمات و راهنما */
(function(){const mt=document.getElementById('mtxt'),md=document.getElementById('modal'),CAP=150;
let y0=0,raw=0,on=false;
const act=()=>md.classList.contains('scr')||md.classList.contains('wide');
const res=r=>{const a=Math.abs(r);return Math.sign(r)*CAP*a/(a+CAP*2)};
mt.addEventListener('touchstart',e=>{if(!act()||e.touches.length!==1)return;y0=e.touches[0].clientY;raw=0;on=true;mt.style.transition='none'},{passive:true});
mt.addEventListener('touchmove',e=>{if(!on||!act())return;const y=e.touches[0].clientY,d=y-y0;y0=y;
 const top=mt.scrollTop<=0,bot=mt.scrollTop+mt.clientHeight>=mt.scrollHeight-1;
 if(raw===0&&!((top&&d>0)||(bot&&d<0)))return;
 let n=raw+d;if((raw>0&&n<0)||(raw<0&&n>0))n=0;raw=n;
 if(e.cancelable)e.preventDefault();
 mt.style.transform=raw?'translateY('+res(raw).toFixed(1)+'px)':''},{passive:false});
const end=()=>{if(!on)return;on=false;if(raw){mt.style.transition='transform .6s cubic-bezier(.22,1.45,.36,1)';mt.style.transform=''}raw=0};
mt.addEventListener('touchend',end,{passive:true});mt.addEventListener('touchcancel',end,{passive:true});
})();
$('#bHow').onclick=()=>{modal('<button class="btn" id="bTutHow" style="display:block;width:100%;margin:0 0 14px;border-color:var(--amber-core);color:var(--amber-core)">🎓 &nbsp;'+tr('tut')+'</button>'+tr('how'));$('#modal').classList.add('wide');$('#mtxt').scrollTop=0;const tb=$('#bTutHow');if(tb)tb.onclick=()=>startTutorial()};
/* ===== v1.8.3 — اتصال حساب گوگل (پل اندروید: window.NeonAuth ↔ window.NCAuth) ===== */
const NCA={st:{signedIn:false},busy:false,err:null};
const ncBridge=()=>{try{return(window.NeonAuth&&typeof window.NeonAuth.connectGoogle==='function')?window.NeonAuth:null}catch(e){return null}};
const ncGIcon='<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';
const NC_ERR={offline:'gErrOffline',cancelled:'gErrCancel',no_account:'gErrNoAcc',unavailable:'gErrUnavail',failed:'gErrFail',no_app:'gErrApp'};
function ncAuthHtml(){return '<div class="sg">'+tr('gAccTitle')+'</div><div class="gacc" id="gAcc"><button class="gbtn" id="tGoogle">'+ncGIcon+'<span id="gTxt"></span></button><div class="gst" id="gSt"></div></div>'}
function ncAuthRender(){
 const b=$('#tGoogle'),t=$('#gTxt'),s=$('#gSt');if(!b||!t||!s)return;
 t.textContent=NCA.busy?tr('gConnecting'):tr('gConnect');b.disabled=!!NCA.busy;
 s.textContent='';
 const add=(c,x)=>{const d=document.createElement('div');d.className=c;d.textContent=x;s.appendChild(d)};
 if(NCA.err&&!NCA.busy)add('gs1 e',tr(NC_ERR[NCA.err]||'gErrFail'));
 if(NCA.st&&NCA.st.signedIn){add('gs1 ok','✔ '+tr('gOk'));if(NCA.st.name)add('gs2',NCA.st.name);if(NCA.st.email)add('gs3',NCA.st.email)}
 else if(!NCA.err||NCA.busy)add('gs1',tr('gNone'));
}
window.NCAuth={onEvent:function(p){try{
 if(!p||typeof p!=='object')return;
 const us=()=>p.signedIn?{signedIn:true,uid:String(p.uid||''),email:String(p.email||''),name:String(p.name||'')}:{signedIn:false};
 if(p.kind==='state'){NCA.st=us()}
 else if(p.kind==='signin'){NCA.busy=false;if(p.ok){NCA.err=null;NCA.st=us()}else NCA.err=String(p.error||'failed')}
 ncAuthRender()}catch(e){}}};
function ncAuthBind(){
 const b=$('#tGoogle');if(!b)return;
 NCA.err=null;ncAuthRender();
 b.onclick=()=>{vib(8);const br=ncBridge();
  if(!br){NCA.err='no_app';ncAuthRender();return}
  if(NCA.busy)return;
  NCA.busy=true;NCA.err=null;ncAuthRender();
  try{br.connectGoogle()}catch(e){NCA.busy=false;NCA.err='failed';ncAuthRender()}};
 const br=ncBridge();if(br){try{br.getAuthState()}catch(e){}}
}
function openSettings(){const row=(k,id)=>'<div class="sr"><span>'+tr(k)+'</span><button class="tg" id="'+id+'"></button></div>';
 modal('<div class="sh">⚙ '+tr('setTitle')+'</div>'
  +'<div class="sg">'+tr('setAudio')+'</div>'+row('sound','tSound')+row('music','tMusic')
  +'<div class="sg">'+tr('setDisplay')+'</div>'+row('grid','tGrid')+row('fxOpt','tFx')+row('fpsOpt','tFps')+(pxSupported()?'<div class="sr"><span>'+tr('gfxOpt')+'</span><div class="sel" id="tGfx"><button class="ar" id="gL" aria-label="prev"><svg viewBox="0 0 10 10"><path d="M6.5 1.5 3 5l3.5 3.5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg></button><span id="gV"></span><button class="ar" id="gR" aria-label="next"><svg viewBox="0 0 10 10"><path d="M3.5 1.5 7 5 3.5 8.5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div></div>':'')
  +'<div class="sg">'+tr('setGame')+'</div>'+row('confirmEnd','tConfirm')+(navigator.vibrate?row('vib','tVib'):'')+''+row('language','tLang')
+'<div class="sr"><span>'+tr('support')+'</span><button class="tg" id="tSupport">'+tr('supportBtn')+'</button></div>'+ncAuthHtml());
 $('#modal').classList.add('scr');$('#modal').style.background='#0B0F1A';syncSet();
 $('#tSound').onclick=()=>{S.sound=!S.sound;syncSet()};$('#tMusic').onclick=()=>{S.music=!S.music;syncSet();if(!S.music)stopMusic();else if($('#game').classList.contains('on')&&!over)startMusic()};$('#tGrid').onclick=()=>{S.grid=!S.grid;syncSet()};$('#tFx').onclick=()=>{S.fx=(S.fx===false);syncSet()};{const tv=$('#tVib');if(tv)tv.onclick=()=>{S.vib=(S.vib===false);syncSet();vib(40)}}
 {const tp=$('#tFps');if(tp)tp.onclick=()=>{S.fps=(S.fps===false);syncSet()}}
 {const GFX=['pixi','canvas'],step=d=>{const i=GFX.indexOf(S.gfx==='canvas'?'canvas':'pixi');S.gfx=GFX[(i+d+GFX.length)%GFX.length];syncSet();if(S.gfx==='canvas')pxDisable();else{_q=0;_qBad=0;_qGood=0;_qRec=0;pxInit();resize()}vib(8)},l=$('#gL'),r=$('#gR');if(l)l.onclick=()=>step(-1);if(r)r.onclick=()=>step(1)}$('#tConfirm').onclick=()=>{S.confirmEnd=(S.confirmEnd===false);syncSet()};
$('#tLang').onclick=()=>{S.lang=S.lang==='fa'?'en':'fa';syncSet();applyLang();openSettings();if(units)refresh()};
$('#tSupport').onclick=()=>{vib(8);const u='https://rubika.ir/NEONCOMMAND';try{const w=window.open(u,'_blank');if(!w)location.href=u}catch(e){location.href=u}};ncAuthBind();
}
$('#bSet').onclick=openSettings;
document.querySelectorAll('.mute').forEach(m=>m.onclick=()=>setSound(!(S.sound||S.music)));syncSet();applyLang();
$('#bClose').onclick=()=>{
  $('#modal').classList.remove('on');
  if(over){
    aiMode=false;stopAmbient();
    $('#ai-think').style.display='none';
    if(onlineMode){NET.cleanup();onlineMode=null;updateNetStatus()}
    show('menu');
  }
};
/* برگشت به منو از وسط بازی (محلی / AI / آنلاین) */
function leaveToMenu(){
  aiGen++;aiMode=false;over=true;fx=[];stopAmbient();
  $('#ai-think').style.display='none';
  $('#modal').classList.remove('on');$('#netModal').style.display='none';
  if(onlineMode){const m=onlineMode;onlineMode=null;try{NET.send({t:'bye'})}catch(e){}setTimeout(()=>NET.cleanup(),200)}
  updateNetStatus();show('menu');
}
$('#bMenu').onclick=()=>{
  modal('<b>'+tr('backTitle')+'</b><br>'+(onlineMode?tr('backOnline'):tr('backLocal'))+'<br><br><button class="btn" id="bLeaveYes" style="width:100%;border-color:var(--signal-red);color:var(--signal-red)">'+tr('yesLeave')+'</button>');
  $('#bLeaveYes').onclick=leaveToMenu;
};
/* قفل زوم: جلوگیری از pinch / double-tap zoom در WebView */
['gesturestart','gesturechange','gestureend'].forEach(ev=>document.addEventListener(ev,e=>e.preventDefault(),{passive:false}));
document.addEventListener('touchmove',e=>{if(e.touches.length>1)e.preventDefault()},{passive:false});
document.addEventListener('wheel',e=>{if(e.ctrlKey)e.preventDefault()},{passive:false});
/* موج لمس: با خاموش‌بودن «افکت‌های بصری» یا حرکت کاهش‌یافته نشان داده نمی‌شود */
document.addEventListener('pointerdown',e=>{
 if(S.fx===false||RM)return;
 const b=e.target.closest&&e.target.closest('button');if(!b||b.disabled)return;
 const r=b.getBoundingClientRect(),d=Math.max(r.width,r.height)*2,sp=document.createElement('span');
 sp.className='rip';
 sp.style.cssText='width:'+d+'px;height:'+d+'px;left:'+(e.clientX-r.left-d/2)+'px;top:'+(e.clientY-r.top-d/2)+'px';
 const bc=getComputedStyle(b).borderTopColor;   /* موج به رنگ حاشیهٔ خود دکمه */
 if(bc&&!/rgba\(0, 0, 0, 0\)|transparent/.test(bc))sp.style.background=bc;
 b.appendChild(sp);setTimeout(()=>sp.remove(),600)},true);
addEventListener('resize',resize);
/* حلقهٔ رندر + شمارندهٔ FPS (گوشهٔ بالا-راست؛ سبز ≥۵۰، کهربایی ≥۳۰، قرمز کمتر) */
setTimeout(pxInit,0);   /* Pixi از همان منو آماده می‌شود (گرم‌کردن شیدرها) */
let _fF=0,_fT=performance.now(),_fShow=false;const _fEl=$('#fps');
(function loop(){const on=$('#game').classList.contains('on');if(on)draw();
 const want=on&&S.fps!==false;
 if(want!==_fShow){_fShow=want;_fEl.style.display=want?'block':'none'}
 if(on){_fF++;const n=performance.now();if(n-_fT>=500){const v=Math.round(_fF*1000/(n-_fT));
   if(want){_fEl.textContent=v+' FPS'+(_q?' · Q'+_q:'');_fEl.style.color=v>=50?C.cyan:v>=30?C.amber:C.red}
   autoQ(v,n);_fF=0;_fT=n}}
 else{_fF=0;_fT=performance.now()}
 requestAnimationFrame(loop)})();
