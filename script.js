/* Bubble portfolio prototype — edit projects and links below. */
const projects=[
 {title:'Character Garden',category:'Character Design',symbol:'✿',background:'linear-gradient(135deg,#b3dbe4,#e6b5d0)',description:'A whimsical character design collection exploring personality, silhouettes and costume details.',notes:'Replace this sample with your final artwork, sketches, color studies, and process images.'},
 {title:'Moonlight Friends',category:'Illustration',symbol:'☾',background:'linear-gradient(135deg,#9ca8d7,#e6d3ef)',description:'A dreamy illustration series inspired by soft moonlight and quiet stories.',notes:'Add full-resolution illustrations and a short explanation of your creative process.'},
 {title:'Little Motion',category:'2D Animation',symbol:'♡',background:'linear-gradient(135deg,#f2c7cf,#f7e8b6)',description:'Small expressive movements and animated character experiments.',notes:'Embed a looping animation or show a frame-by-frame breakdown here.'},
 {title:'Aqua Dreams',category:'Visual Development',symbol:'✧',background:'linear-gradient(135deg,#a0d5d6,#b3b4ed)',description:'Underwater-inspired concepts, playful environments and magical textures.',notes:'Show environmental sketches, moodboards and final compositions.'},
 {title:'HanAme',category:'Brand Identity',symbol:'❀',background:'linear-gradient(135deg,#e4acc4,#f6ddcb)',description:'An elegant, sweet fashion identity inspired by nostalgic romantic styling.',notes:'Present your logo exploration, typography, palette, packaging and web mockups.'},
 {title:'Dream Frames',category:'3D & Motion',symbol:'★',background:'linear-gradient(135deg,#a4c9e8,#d8c1ea)',description:'An evolving collection of motion design and 3D experiments.',notes:'Add renders, turntables, motion tests and behind-the-scenes material.'}
];
const grid=document.querySelector('#projectGrid');projects.forEach((p,i)=>{const b=document.createElement('button');b.className='project';b.type='button';b.innerHTML=`<div class="project-art" style="background:${p.background}"><span>${p.symbol}</span></div><div class="project-meta"><strong>${p.title}</strong><small>${p.category} ↗</small></div>`;b.addEventListener('click',()=>openProject(i));grid.append(b)});
const modal=document.querySelector('#projectModal');let currentProject=0,lastFocus=null;function openProject(i){currentProject=i;const p=projects[i];document.querySelector('#modalCover').style.background=p.background;document.querySelector('#modalCover').textContent=p.symbol;document.querySelector('#modalTitle').textContent=p.title;document.querySelector('#modalCategory').textContent=p.category;document.querySelector('#modalDescription').textContent=p.description;document.querySelector('#modalNotes').textContent=p.notes;lastFocus=document.activeElement;modal.hidden=false;document.body.classList.add('modal-open');modal.querySelector('.modal-close').focus()}function closeProject(){modal.hidden=true;document.body.classList.remove('modal-open');lastFocus?.focus()}document.querySelectorAll('[data-close]').forEach(x=>x.addEventListener('click',closeProject));document.querySelector('#nextProject').addEventListener('click',()=>openProject((currentProject+1)%projects.length));document.addEventListener('keydown',e=>{if(modal.hidden)return;if(e.key==='Escape')closeProject();if(e.key==='Tab'){const focusables=[...modal.querySelectorAll('button')];const first=focusables[0],last=focusables[focusables.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
document.querySelector('#year').textContent=new Date().getFullYear();
// This is intentionally a demo counter, not a fabricated real visitor count.
// Connect an analytics API (e.g. Cloudflare Web Analytics + Worker) for actual totals.
// Windows 7 Bubbles-inspired free-roaming motion.
const field=document.querySelector('#bubbleField');
const hero=document.querySelector('.hero');
const navEls=[...field.querySelectorAll('.nav-bubble')];
const bubbles=[];
const pointer={x:0,y:0,active:false};
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let raf=0,last=0;
const rand=(a,b)=>a+Math.random()*(b-a);
function setup(){
 const w=field.clientWidth,h=field.clientHeight;
 field.querySelectorAll('.decor-bubble').forEach(e=>e.remove());bubbles.length=0;
 const compact=w<650;
 navEls.forEach((el,i)=>{
  const size=compact?(i===0?98:80):Number(el.dataset.size);
  el.style.setProperty('--size',size+'px');
  const x=Math.max(5,Math.min(w-size-5,Number(el.dataset.x)*w-size/2));
  const y=Math.max(105,Math.min(h-size-35,Number(el.dataset.y)*h-size/2));
  bubbles.push({el,size,x,y,vx:rand(-.8,.8)||.45,vy:rand(-.65,.65)||.3,nav:true});
 });
 for(let i=0;i<(compact?13:25);i++){
  const size=rand(22,compact?56:84);
  const el=document.createElement('div');el.className='bubble decor-bubble';el.style.setProperty('--size',size+'px');el.setAttribute('aria-hidden','true');field.append(el);
  bubbles.push({el,size,x:rand(0,Math.max(1,w-size)),y:rand(95,Math.max(96,h-size-35)),vx:rand(-1.2,1.2)||.7,vy:rand(-1,1)||.6,nav:false});
 }
 draw();
}
function draw(){for(const b of bubbles)b.el.style.transform=`translate3d(${b.x}px,${b.y}px,0)`}
function animate(now){
 const dt=Math.min((now-(last||now))/16.667,2);last=now;
 const w=field.clientWidth,h=field.clientHeight;
 for(const b of bubbles){
  if(pointer.active){
   const dx=b.x+b.size/2-pointer.x,dy=b.y+b.size/2-pointer.y;
   const d=Math.hypot(dx,dy)||1,range=b.nav?140:110;
   if(d<range){const strength=(1-d/range)*.12;b.vx+=dx/d*strength*dt;b.vy+=dy/d*strength*dt;}
  }
  // Continuous movement across the hero, not oscillation around a fixed anchor.
  const speed=Math.hypot(b.vx,b.vy);
  const minSpeed=b.nav?.45:.6,maxSpeed=b.nav?1.1:1.55;
  if(speed<minSpeed){b.vx=(b.vx||.5)*1.04;b.vy=(b.vy||.4)*1.04;}
  if(speed>maxSpeed){b.vx*=maxSpeed/speed;b.vy*=maxSpeed/speed;}
  b.x+=b.vx*dt;b.y+=b.vy*dt;
  const left=5,right=Math.max(left,w-b.size-5),top=compact?95:105,bottom=Math.max(top,h-b.size-35);
  if(b.x<=left){b.x=left;b.vx=Math.abs(b.vx)}
  if(b.x>=right){b.x=right;b.vx=-Math.abs(b.vx)}
  if(b.y<=top){b.y=top;b.vy=Math.abs(b.vy)}
  if(b.y>=bottom){b.y=bottom;b.vy=-Math.abs(b.vy)}
 }
 draw();raf=requestAnimationFrame(animate);
}
hero.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const r=field.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top;pointer.active=true});
hero.addEventListener('pointerleave',()=>pointer.active=false);
navEls.forEach(el=>el.addEventListener('click',()=>{const target=el.dataset.target;if(target==='resume'){document.querySelector('#resumeLink')?.scrollIntoView({behavior:reduced?'auto':'smooth'});return}document.getElementById(target)?.scrollIntoView({behavior:reduced?'auto':'smooth'})}));
let resizeTimer;addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{cancelAnimationFrame(raf);setup();last=0;if(!reduced)raf=requestAnimationFrame(animate)},200)});
document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(raf);if(!document.hidden&&!reduced){last=0;raf=requestAnimationFrame(animate)}});
setup();if(!reduced)raf=requestAnimationFrame(animate);

// Ambient bubbles across the full viewport. Decorative only: never block clicks.
(function initAmbientBubbles(){
 if(reduced)return;
 const layer=document.createElement('div');layer.id='ambientBubbles';layer.setAttribute('aria-hidden','true');document.body.append(layer);
 let ambient=[],frame=0,previous=0,resizeHandle;
 const between=(a,b)=>a+Math.random()*(b-a);
 function rebuild(){
  layer.replaceChildren();ambient=[];
  const w=innerWidth,h=innerHeight,small=w<650;
  const count=small?10:19;
  for(let i=0;i<count;i++){
   const size=between(small?20:25,small?55:85);
   const el=document.createElement('div');el.className='ambient-bubble';
   el.style.setProperty('--bubble-size',size+'px');
   el.style.setProperty('--bubble-opacity',between(.13,.28).toFixed(2));
   layer.append(el);
   ambient.push({el,size,x:between(0,Math.max(0,w-size)),y:between(0,Math.max(0,h-size)),vx:between(-.48,.48),vy:between(-.42,.42)});
  }
 }
 function tick(t){
  const dt=Math.min((t-(previous||t))/16.667,2);previous=t;
  const w=innerWidth,h=innerHeight;
  for(const b of ambient){
   if(Math.abs(b.vx)<.12)b.vx=b.vx<0?-.12:.12;
   if(Math.abs(b.vy)<.1)b.vy=b.vy<0?-.1:.1;
   b.x+=b.vx*dt;b.y+=b.vy*dt;
   if(b.x<=0){b.x=0;b.vx=Math.abs(b.vx)}
   if(b.x>=w-b.size){b.x=Math.max(0,w-b.size);b.vx=-Math.abs(b.vx)}
   if(b.y<=0){b.y=0;b.vy=Math.abs(b.vy)}
   if(b.y>=h-b.size){b.y=Math.max(0,h-b.size);b.vy=-Math.abs(b.vy)}
   b.el.style.transform=`translate3d(${b.x}px,${b.y}px,0)`;
  }
  frame=requestAnimationFrame(tick);
 }
 rebuild();frame=requestAnimationFrame(tick);
 addEventListener('resize',()=>{clearTimeout(resizeHandle);resizeHandle=setTimeout(()=>{rebuild();previous=0},200)});
 document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(frame);if(!document.hidden){previous=0;frame=requestAnimationFrame(tick)}});
})();
