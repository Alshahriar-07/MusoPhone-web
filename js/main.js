/**
 * MusoPhone — Main Official Client Script
 * Author & Creator: Al Shahriar Sowan
 * Publisher: Eagox Studio
 * Website: https://musophone.vercel.app/
 * Web Player: https://musophone-web.vercel.app/
 */


/* --- Module 0: Intro overlay --- */
(function(){
  var intro=document.querySelector(".intro");
  if(!intro)return;
  function dismiss(){intro.classList.add("done")}
  intro.addEventListener("animationend",function(e){if(e.target===intro&&e.animationName==="iOut")dismiss()});
  setTimeout(dismiss,3000);
})();

/* Delay (ms) before the hero entrance starts; 0 when the intro is skipped. Mirrors --t0 in CSS. */
var T0=document.documentElement.classList.contains("no-intro")?0:1750;

/* --- Module 1: Icon, Tracks, Sheen, Tilt, Crossfade --- */
try {
(function(){
document.getElementById("yr").textContent=new Date().getFullYear();
var T=[{n:"HISAAB",i:"/img/cover-hisaab.webp",c:["#e8a317","#a8501a","#2a1306"]},{n:"Ae Ajnabee",i:"/img/cover-ae-ajnabee.webp",c:["#c4552f","#6a2218","#1f0b09"]}],
    root=document.documentElement,tr=document.querySelector(".tracks"),imgs=document.querySelectorAll(".main img"),cur=0,auto,manual=false,heroOn=true;
function set(i){cur=i;if(!window.__st)["--c1","--c2","--c3"].forEach(function(k,j){root.style.setProperty(k,T[i].c[j])});
  [].forEach.call(imgs,function(m,j){m.classList.toggle("on",j===i)});[].forEach.call(document.querySelectorAll(".bgc i"),function(m,j){m.classList.toggle("on",j===i)});
  [].forEach.call(tr.children,function(b,j){b.setAttribute("aria-pressed",j===i)})}
T.forEach(function(t,i){var b=document.createElement("button");b.type="button";
  b.innerHTML='<i class="cv" style="--a:'+t.c[0]+';--b:'+t.c[1]+';--d:'+t.c[2]+';--img:url('+t.i+')"></i><span>'+t.n+'</span><b class="tp" aria-hidden="true"><i></i></b>';
  b.onclick=function(){manual=true;clearInterval(auto);clearTimeout(st);tr.classList.add("man");if(i!==cur)set(i)};tr.appendChild(b)});
var mainPh=document.querySelector(".trio .main"),st;
function sheen(){if(!mainPh)return;mainPh.classList.remove("sh");void mainPh.offsetWidth;mainPh.classList.add("sh")}
var _set=set;set=function(i){var ch=i!==cur;_set(i);if(ch)sheen()};
window.__T=T;set(0);window.__hero=function(){_set(cur)};
if(!matchMedia("(prefers-reduced-motion:reduce)").matches){
  setTimeout(sheen,T0+900);
  st=setTimeout(function(){tr.classList.add("go");if(!manual)auto=setInterval(function(){if(heroOn&&!document.hidden)set((cur+1)%T.length)},5500)},T0+600);
  if("IntersectionObserver" in window)new IntersectionObserver(function(en){heroOn=en[0].isIntersecting;document.getElementById("top").classList.toggle("away",!heroOn)}).observe(document.getElementById("top"));
  var hero=document.getElementById("top"),trio=document.querySelector(".trio");
  if(matchMedia("(hover:hover)").matches&&trio){
    hero.addEventListener("pointermove",function(e){var r=hero.getBoundingClientRect();
      trio.style.setProperty("--tx",((e.clientX-r.left)/r.width-.5).toFixed(3));trio.style.setProperty("--ty",((e.clientY-r.top)/r.height-.5).toFixed(3))});
    hero.addEventListener("pointerleave",function(){trio.style.setProperty("--tx",0);trio.style.setProperty("--ty",0)});
  }
}
var cf=document.getElementById("cf"),co=document.getElementById("co"),ca=document.getElementById("ca"),cb=document.getElementById("cb"),ov=document.getElementById("ov");
function draw(){var s=+cf.value,a=300-s*22,b=300+s*22;
  ca.setAttribute("points","6,30 "+a+",30 "+b+",170 594,170");cb.setAttribute("points","6,170 "+a+",170 "+b+",30 594,30");
  ov.setAttribute("x",a);ov.setAttribute("width",Math.max(b-a,0));co.textContent=s===0?"Off":s+" seconds"}
cf.addEventListener("input",draw);draw();
})();
} catch (err) {
  console.error("Module 1 error:", err);
}

/* --- Module 2: Spotlight Tracker --- */
try {
document.querySelectorAll(".t").forEach(function(t){t.addEventListener("pointermove",function(e){var r=t.getBoundingClientRect();t.style.setProperty("--mx",(e.clientX-r.left)+"px");t.style.setProperty("--my",(e.clientY-r.top)+"px")})})
} catch (err) {
  console.error("Module 2 error:", err);
}

/* --- Module 3: Scroll Progress, Parallax & Scroll Reveal --- */
try {
(function(){
var reduce=matchMedia("(prefers-reduced-motion:reduce)").matches,
    hero=document.getElementById("top"),nav=document.querySelector(".nav"),pr=document.querySelector(".prog"),tick=false,deck=document.querySelector(".wp-deck");
var lastP;
function upd(){tick=false;var y=scrollY,h=innerHeight,m=document.documentElement.scrollHeight-h;
  var p=Math.min(y/h,1).toFixed(3);if(p!==lastP){lastP=p;hero.style.setProperty("--p",p)}
  if(deck&&!reduce){var r=deck.parentElement.getBoundingClientRect();if(r.top<h&&r.bottom>0)deck.style.setProperty("--sp3",Math.max(0,Math.min(1,(r.top-h*.18)/(h*.7))).toFixed(3))}
  pr.style.setProperty("--sp",m>0?(y/m).toFixed(4):0);
  nav.classList.toggle("s",y>12)}
addEventListener("resize",function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});
addEventListener("scroll",function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});upd();
["ca","cb"].forEach(function(id){document.getElementById(id).setAttribute("pathLength","1")});
if(reduce||!("IntersectionObserver" in window))return;
var els=[].slice.call(document.querySelectorAll("main .lead,.facts>div,.bento>.t,.specs>.sp,.wp-intro,.wp-tabs,.wp-notes>div,.creator-grid>article,.platform-badges,.get>*,footer .in"));
els.forEach(function(e){e.style.setProperty("--i",[].indexOf.call(e.parentElement.children,e)%3);e.classList.add("rv")});
var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.12,rootMargin:"0px 0px -6% 0px"});
els.forEach(function(e){io.observe(e)});
/* safety net: nothing may stay hidden once the page bottom is reached */
addEventListener("scroll",function end(){if(innerHeight+scrollY>=document.documentElement.scrollHeight-4){els.forEach(function(e){e.classList.add("in")});removeEventListener("scroll",end)}},{passive:true});
})();
} catch (err) {
  console.error("Module 3 error:", err);
}

/* --- Module 4: Nav Scrollspy, Stagger Heading Reveal & 3D Tilt --- */
try {
(function(){
var reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
var links=[].slice.call(document.querySelectorAll(".nl a[href^='#']")),secs=links.map(function(a){var h=a.getAttribute("href");try{return document.querySelector(h)}catch(e){return null}}).filter(Boolean);
if("IntersectionObserver" in window){
  var so=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting)links.forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+x.target.id)})})},{rootMargin:"-45% 0px -50% 0px"});
  secs.forEach(function(e){so.observe(e)});
}
if(!reduce&&"IntersectionObserver" in window){
  var n=0;
  var sp=function(el){[].slice.call(el.childNodes).forEach(function(c){
    if(c.nodeType===3){var f=document.createDocumentFragment();
      c.textContent.split(/(\s+)/).forEach(function(t){if(!t)return;
        if(/^\s+$/.test(t)){f.appendChild(document.createTextNode(" "))}
        else{var w=document.createElement("span");w.className="wd";var i=document.createElement("span");i.textContent=t;i.style.setProperty("--w",n++);w.appendChild(i);f.appendChild(w)}});
      c.replaceWith(f)}
    else if(c.nodeType===1)sp(c)})};
  var io2=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io2.unobserve(x.target)}})},{threshold:.2});
  document.querySelectorAll("main h2").forEach(function(h){n=0;sp(h);h.classList.add("hw");io2.observe(h)});
}
})();
} catch (err) {
  console.error("Module 4 error:", err);
}

/* --- Module 5: Story Phone Steps Scrollspy --- */
try {
(function(){
var steps=[].slice.call(document.querySelectorAll(".step")),imgs=[].slice.call(document.querySelectorAll(".sphone img")),cnt=document.getElementById("cnt"),root=document.documentElement,sec=document.getElementById("story");
function dk(h,f){var n=parseInt(h.slice(1),16);return "rgb("+Math.round((n>>16&255)*f)+","+Math.round((n>>8&255)*f)+","+Math.round((n&255)*f)+")"}
function show(i){steps.forEach(function(s,k){s.classList.toggle("on",k===i)});imgs.forEach(function(m,k){m.classList.toggle("on",k===i)});
  var c=steps[i].dataset.c;root.style.setProperty("--c1",c);root.style.setProperty("--c2",dk(c,.5));root.style.setProperty("--c3",dk(c,.14));
  cnt.innerHTML="<b>"+String(i+1).padStart(2,"0")+"</b> / "+String(steps.length).padStart(2,"0")}
if(!("IntersectionObserver" in window)){steps.forEach(function(s){s.classList.add("on")});return}
var o=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting)show(steps.indexOf(x.target))})},{rootMargin:"-45% 0px -45% 0px"});
steps.forEach(function(s){o.observe(s)});
new IntersectionObserver(function(en){en.forEach(function(x){window.__st=x.isIntersecting;if(!x.isIntersecting&&window.__hero)window.__hero()})}).observe(sec);
})();
} catch (err) {
  console.error("Module 5 error:", err);
}

/* --- Module 6: Wave, Karaoke Lyrics, Covers & Counters --- */
try {
(function(){
var reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
/* wave */
var w=document.getElementById("wave");
for(var i=0;i<48;i++){var e=document.createElement("i");e.style.height=(22+70*Math.abs(Math.sin(i*.47)*Math.cos(i*.21)))+"%";e.style.animationDelay=(-i*0.09)+"s";w.appendChild(e)}
/* lyrics */
var L=["the water learned your name","and never gave it back","so I’ll sing it slow","until the river listens","every word you left here","comes home with the tide"];
var box=document.getElementById("lyx"),ps=[],li=0,lt;
L.forEach(function(l){var p=document.createElement("p");var ws=l.split(" ");p.style.setProperty("--n",ws.length);
  ws.forEach(function(x,k){var s=document.createElement("span");s.textContent=x;s.style.setProperty("--i",k);p.appendChild(s);if(k<ws.length-1)p.appendChild(document.createTextNode(" "))});
  box.appendChild(p);ps.push(p)});
function lyr(i){li=i;ps.forEach(function(p,k){p.classList.toggle("now",k===i);p.classList.toggle("done",k<i)});
  var prev=ps[Math.max(i-1,0)],off=i===0?-ps[0].offsetHeight:prev.offsetTop-ps[0].offsetTop;box.style.transform="translateY("+(-off)+"px)"}
/* covers */
var T=window.__T||[],albs=document.querySelectorAll(".orbs .alb"),sw=document.querySelectorAll(".sw i"),col=document.querySelector(".tl-col"),ci=0;
[].forEach.call(albs,function(a,k){if(T[k])a.style.backgroundImage="url("+T[k].i+")"});
function cov(i){ci=i;[].forEach.call(albs,function(a,k){a.classList.toggle("f",k===i)});if(T[i]){col.style.setProperty("--tc",T[i].c[0]);[].forEach.call(sw,function(s,k){s.style.background=T[i].c[k]})}}
cov(0);
function visible(el){return !document.hidden&&el.classList.contains("live")}
/* counters */
function count(el){var f=+el.dataset.from,to=+el.dataset.to,t0=performance.now();(function st(n){var p=Math.min((n-t0)/1400,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(f+(to-f)*e);if(p<1)requestAnimationFrame(st)})(t0)}
/* download */
function dl(){var b=document.getElementById("dlb"),p=document.getElementById("dlp"),r=b.closest(".dr"),t0=performance.now();
  (function st(n){var q=Math.min((n-t0)/4200,1),e=q<.5?2*q*q:1-Math.pow(-2*q+2,2)/2,v=Math.round(e*100);b.style.width=v+"%";p.textContent=v+"%";
    if(q<1)requestAnimationFrame(st);else{r.classList.add("ok");p.textContent="Saved"}})(t0)}
/* sleep timer */
function sleep(){var s=1800,el=document.getElementById("slp"),tile=el.closest(".t");setInterval(function(){if(!visible(tile))return;s=s>0?s-1:1800;el.textContent=Math.floor(s/60)+":"+String(s%60).padStart(2,"0")},1000)}
if(reduce||!("IntersectionObserver" in window)){lyr(1);document.querySelectorAll(".bento>.t").forEach(function(t){t.classList.add("live")});return}
var started={};
var io=new IntersectionObserver(function(en){en.forEach(function(x){var t=x.target;
  if(x.isIntersecting){t.classList.add("live");
    if(started[t.className.split(" ").filter(function(c){return c.indexOf("tl-")===0})[0]])return;
    if(t.classList.contains("tl-lyr")){started["tl-lyr"]=1;lyr(0);setTimeout(function(){lyr(1);lt=setInterval(function(){if(!visible(t))return;var n=li+1;if(n>=ps.length){box.style.transition="none";lyr(0);void box.offsetWidth;box.style.transition="";n=1;setTimeout(function(){lyr(1)},60);return}lyr(n)},2900)},500)}
    if(t.classList.contains("tl-hr")){started["tl-hr"]=1;t.querySelectorAll(".cnt-n").forEach(count)}
    if(t.classList.contains("tl-col")){started["tl-col"]=1;setInterval(function(){if(visible(t))cov((ci+1)%Math.max(T.length,1))},3400)}
    if(t.classList.contains("tl-off")){started["tl-off"]=1;setTimeout(dl,700)}
    if(t.classList.contains("tl-tune")){started["tl-tune"]=1;setTimeout(sleep,1200)}
  }else t.classList.remove("live")})},{threshold:.3});
document.querySelectorAll(".bento>.t").forEach(function(t){io.observe(t)});
})();
} catch (err) {
  console.error("Module 6 error:", err);
}

/* --- Module 7: Web Player showcase --- */
try {
(function(){
  var deck=document.querySelector(".wp-deck");
  if(!deck)return;
  var shots=[].slice.call(deck.querySelectorAll(".wp-shot")),
      tabs=[].slice.call(document.querySelectorAll(".wp-tabs [role=tab]")),
      note=document.getElementById("wp-caption"),n=shots.length,cur=0;

  function show(i,focus){
    cur=(i+n)%n;
    shots.forEach(function(s,k){
      var d=(k-cur+n)%n;
      s.dataset.pos=d===0?"front":d===1?"right":d===n-1?"left":"back";
      if(d===0)s.removeAttribute("aria-hidden");else s.setAttribute("aria-hidden","true");
    });
    tabs.forEach(function(t,k){t.setAttribute("aria-selected",k===cur);t.tabIndex=k===cur?0:-1});
    deck.setAttribute("aria-labelledby",tabs[cur].id);
    note.textContent=tabs[cur].dataset.caption;
    var bar=tabs[cur].parentElement;
    bar.scrollTo({left:tabs[cur].offsetLeft-bar.offsetLeft-(bar.clientWidth-tabs[cur].offsetWidth)/2,behavior:"smooth"});
    if(focus)tabs[cur].focus({preventScroll:true});
  }

  tabs.forEach(function(t,k){
    t.addEventListener("click",function(){show(k)});
    t.addEventListener("keydown",function(e){
      var to={ArrowRight:k+1,ArrowLeft:k-1,Home:0,End:n-1}[e.key];
      if(to===undefined)return;
      e.preventDefault();show(to,true);
    });
  });
  shots.forEach(function(s,k){s.addEventListener("click",function(){if(s.dataset.pos!=="front")show(k)})});

  var x0=null,y0=0;
  deck.addEventListener("touchstart",function(e){x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
  deck.addEventListener("touchend",function(e){
    if(x0===null)return;
    var dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;x0=null;
    if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))show(cur+(dx<0?1:-1));
  },{passive:true});

  /* If a .webp is absent, fall back to the .png; if both are, show a plain notice. */
  shots.forEach(function(s){
    var img=s.querySelector("img");
    function fail(){
      var src=s.querySelector("source");
      if(src){src.remove();img.src=img.getAttribute("src")}else s.classList.add("missing");
    }
    img.addEventListener("error",fail);
    if(img.complete&&img.getAttribute("loading")!=="lazy"&&!img.naturalWidth)fail();
  });
})();
} catch (err) {
  console.error("Module 7 error:", err);
}

/* --- Module 8: Mobile navigation --- */
try {
(function(){
  var btn=document.querySelector(".burger"),menu=document.getElementById("menu");
  if(!btn||!menu)return;
  function set(open){btn.setAttribute("aria-expanded",open);menu.classList.toggle("open",open)}
  btn.addEventListener("click",function(){set(btn.getAttribute("aria-expanded")!=="true")});
  menu.addEventListener("click",function(e){if(e.target.closest("a"))set(false)});
  document.addEventListener("click",function(e){if(!e.target.closest(".nav"))set(false)});
  document.addEventListener("keydown",function(e){if(e.key==="Escape"&&menu.classList.contains("open")){set(false);btn.focus()}});
  matchMedia("(min-width:861px)").addEventListener("change",function(){set(false)});
})();
} catch (err) {
  console.error("Module 8 error:", err);
}
