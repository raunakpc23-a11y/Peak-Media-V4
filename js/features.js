// ==========================================
// FEATURES 4 & 11: TIME MACHINE · MOOD RICOCHET
// ==========================================
(function(){
  const $=id=>document.getElementById(id);
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const NOW=new Date().getFullYear();
  let year=null, timer=0;
  const all=()=>allTitles.map(t=>globalDatabase[t]).filter(Boolean);
  // ---------- TIME MACHINE ----------
  window.tmSort=list=>{
    if(year==null) return list;
    return list.map(i=>[i,Math.abs(i.year-year)]).sort((a,b)=>a[1]-b[1]||a[0].rank-b[0].rank).map(x=>x[0]);
  };
  const bar=document.createElement('div');
  bar.id='tmBar';bar.className='hidden';
  bar.innerHTML=`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="glass-card rounded-2xl border border-brand-gold/40 p-4 mt-3 space-y-3">
    <div class="flex items-center gap-3 flex-wrap">
      <i class="fa-solid fa-clock-rotate-left text-brand-gold"></i><span class="text-xs font-extrabold uppercase tracking-widest text-brand-gold">Time Machine</span>
      <button id="tmPlay" class="px-3 py-1.5 rounded-lg bg-brand-gold text-black text-xs font-bold"><i class="fa-solid fa-play"></i> Play</button>
      <span id="tmYear" class="text-3xl font-display font-extrabold text-white tabular-nums">1994</span>
      <input id="tmDial" type="range" min="1930" max="${NOW}" value="1994" class="flex-1 min-w-[10rem] accent-yellow-400" aria-label="Year">
      <button id="tmOff" class="px-3 py-1.5 rounded-lg border border-white/15 text-xs font-bold text-gray-300">Exit</button>
    </div>
    <div id="tmGlance" class="text-xs text-gray-300"></div></div></div>`;
  const header=document.querySelector('header');header.parentNode.insertBefore(bar,header.nextSibling);
  const row=document.createElement('div');row.id='tmRow';row.className='hidden';
  row.innerHTML='<h2 class="text-xl font-display font-bold text-white mb-3"><i class="fa-solid fa-clock-rotate-left text-brand-gold mr-2"></i><span id="tmRowT"></span></h2><div id="tmRowCards" class="hscroll flex gap-4 overflow-x-auto pb-4 pt-1 snap-x"></div>';
  $('tab-discover').insertBefore(row,$('tab-discover').firstChild);
  function era(y){return y<1950?'grain':y<1980?'sepia':y<1990?'neon':y>=2010?'glass':'';}
  function style(){
    ['grain','sepia','neon','glass'].forEach(e=>document.body.classList.remove('tm-'+e));
    if(year!=null){const e=era(year);if(e)document.body.classList.add('tm-'+e);}
  }
  function refresh(){
    style();
    $('tmYear').textContent=year;
    const inYear=all().filter(i=>i.year===year).sort((a,b)=>a.rank-b.rank);
    const near=tmSort(all()).slice(0,14);
    const gc={};inYear.forEach(i=>gc[i.genre]=(gc[i.genre]||0)+1);
    const top=Object.entries(gc).sort((a,b)=>b[1]-a[1]).slice(0,3).map(x=>`${x[0]} (${x[1]})`).join(', ');
    const nb=inYear[0];
    $('tmGlance').innerHTML=inYear.length?`<b class="text-white">Year at a glance:</b> ${inYear.length} titles · top genres ${esc(top)} · notable pick <b class="text-brand-gold">${esc(nb.cleanName||nb.title)}</b> (★ ${nb.rating})`:`<b class="text-white">Year at a glance:</b> nothing in the vault from ${year}, showing the nearest years instead.`;
    $('tmRowT').textContent=`Popular in ${year}`;
    $('tmRowCards').innerHTML=near.map(i=>createCardHTML(i,true)).join('');
    attachThumbObservers($('tmRowCards'));
    addHorizontalArrows($('tmRowCards'));
    filterAndRenderMovies(true);filterAndRenderShows(true);
  }
  function stop(){clearInterval(timer);timer=0;$('tmPlay').innerHTML='<i class="fa-solid fa-play"></i> Play';}
  window.tmOpen=()=>{
    if(year==null)year=1994;
    bar.classList.remove('hidden');row.classList.remove('hidden');$('tmDial').value=year;$('tmState').textContent=year;
    $('vibePanel').classList.add('hidden');refresh();
  };
  $('tmDial').oninput=e=>{year=+e.target.value;$('tmState').textContent=year;refresh();};
  $('tmOff').onclick=()=>{stop();year=null;bar.classList.add('hidden');row.classList.add('hidden');$('tmState').textContent='Off';style();filterAndRenderMovies(true);filterAndRenderShows(true);};
  $('tmPlay').onclick=()=>{
    if(timer){stop();return;}
    if(year>=NOW)year=1930;
    $('tmPlay').innerHTML='<i class="fa-solid fa-pause"></i> Pause';
    timer=setInterval(()=>{year++;$('tmDial').value=year;$('tmState').textContent=year;refresh();if(year>=NOW)stop();},900);
  };
  // ---------- MOOD RICOCHET (MULTI-BALL & PHYSICS LAB) ----------
  const cv=$('rcCv'),c=cv.getContext('2d'),W=520,H=693;
  const ALL_GEN=['Sci-Fi','Drama','Crime','Thriller','Horror','Fantasy','Comedy','Romance','Action','Animation','Western','War','Documentary'];
  const gcol=g=>(typeof genreThemes!=='undefined'&&genreThemes[g]&&genreThemes[g].accent)||'#F5C518';
  const BALL_COLORS=['#FFFFFF','#F5C518','#22d3ee','#f472b6','#4ade80'];
  const COORDS_STANDARD=[[120,130],[260,115],[400,130],[185,235],[335,235],[105,345],[260,340],[415,345],[175,455],[345,455]];
  const COORDS_MEGA=[[105,115],[260,100],[415,115],[175,195],[345,195],[95,285],[260,275],[425,285],[165,375],[355,375],[105,465],[260,460],[415,465],[260,535]];
  let rcBallCount = 1;
  let rcGravMode = 'normal'; // 'normal' | 'moon' | 'hyper'
  let rcLayoutMode = 'standard'; // 'standard' | 'mega'
  let bumpers = [];

  function buildBumpers(shuffleOrder=false){
    const coords = rcLayoutMode === 'mega' ? COORDS_MEGA : COORDS_STANDARD;
    const pool = ALL_GEN.slice();
    if(shuffleOrder){
      for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
    }
    const rad = rcLayoutMode === 'mega' ? 26 : 31;
    bumpers = coords.map(([x,y],i)=>({x,y,r:rad,g:pool[i%pool.length],col:gcol(pool[i%pool.length]),flash:0}));
  }
  buildBumpers(false);

  function updateRcModeBadge(){
    const b = $('rcActiveModeBadge');
    if(!b) return;
    const gLabel = rcGravMode === 'moon' ? 'Moon Low-G' : rcGravMode === 'hyper' ? 'Hyper-Bounce' : 'Normal G';
    b.textContent = `${rcBallCount} Ball${rcBallCount>1?'s':''} · ${gLabel}`;
  }

  function shuffleBumpers(){
    buildBumpers(true);
    if(!balls.length) draw();
  }

  const walls=[{x:0,tag:['a dash of 70s',1975]},{x:W,tag:['a dash of 90s',1995]}];
  const flips=[{x:150,y:600,tag:['extra dark','dark']},{x:370,y:600,tag:['crowd-pleaser','high']}];
  let balls=[],tags=[],aim=null,best=ls_get(),state={genres:[],years:[],rate:[]};
  function ls_get(){try{return JSON.parse(localStorage.getItem('cs_ricochet')||'[]')}catch(e){return[]}}
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

  function draw(){
    c.clearRect(0,0,W,H);
    c.fillStyle='rgba(255,255,255,.35)';c.font='11px sans-serif';c.textAlign='center';
    c.fillStyle='rgba(245,197,24,.5)';c.fillRect(0,0,4,H);c.fillRect(W-4,0,4,H);
    c.save();c.translate(14,H/2);c.rotate(-Math.PI/2);c.fillStyle='rgba(245,197,24,.6)';c.fillText('70s WALL',0,0);c.restore();
    c.save();c.translate(W-8,H/2);c.rotate(Math.PI/2);c.fillStyle='rgba(245,197,24,.6)';c.fillText('90s WALL',0,0);c.restore();
    bumpers.forEach(b=>{
      c.beginPath();c.arc(b.x,b.y,b.r + (b.flash>0?3:0),0,7);
      c.fillStyle=b.col+(b.flash>0?'aa':'55');c.fill();
      c.lineWidth=b.flash>0?4:3;c.strokeStyle=b.col;c.stroke();
      if(b.flash>0) b.flash--;
      c.fillStyle='#fff';c.font='bold 10px sans-serif';c.fillText(b.g==='Documentary'?'Doc':b.g,b.x,b.y+4);
    });
    flips.forEach(f=>{c.fillStyle=f.tag[1]==='dark'?'#6b7280':'#F5C518';c.fillRect(f.x-48,f.y,96,12);c.fillStyle='#fff';c.font='10px sans-serif';c.fillText(f.tag[0],f.x,f.y+26);});
    if(aim&&!balls.length){
      c.strokeStyle='rgba(245,197,24,.65)';c.lineWidth=2;c.setLineDash([5,6]);
      c.beginPath();c.moveTo(W/2,H-40);c.lineTo(aim[0],aim[1]);c.stroke();c.setLineDash([]);
    }
    if(balls.length){
      balls.forEach(b=>{
        c.beginPath();c.arc(b.x,b.y,9,0,7);c.fillStyle=b.color;c.shadowColor=b.color;c.shadowBlur=16;c.fill();c.shadowBlur=0;
      });
    } else {
      for(let i=0;i<rcBallCount;i++){
        const ox = (i - (rcBallCount-1)/2)*16;
        c.beginPath();c.arc(W/2 + ox,H-40,8,0,7);c.fillStyle=BALL_COLORS[i%BALL_COLORS.length];c.fill();
      }
    }
  }

  function addTag(label){
    if(tags.length < 14){
      tags.push(label);
      $('rcTags').insertAdjacentHTML('beforeend',`<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-brand-gold/15 border border-brand-gold/40 text-brand-gold">${esc(label)}</span>`);
    }
  }

  function launch(tx,ty){
    if(balls.length)return;
    tags=[];state={genres:[],years:[],rate:[]};$('rcTags').innerHTML='';
    const p=$('rcPower').value/100;
    const baseDx=(tx??(aim?aim[0]:W/2+(Math.random()-.5)*140))-W/2;
    const baseDy=(ty??(aim?aim[1]:120))-(H-40);
    const m=Math.hypot(baseDx,baseDy)||1;
    const sp=8+p*8;
    balls=[];
    for(let i=0;i<rcBallCount;i++){
      const spread = (i - (rcBallCount-1)/2) * 0.16 + (Math.random()-.5)*0.05;
      const cos = Math.cos(spread), sin = Math.sin(spread);
      const rdx = (baseDx/m)*cos - (baseDy/m)*sin;
      const rdy = (baseDx/m)*sin + (baseDy/m)*cos;
      balls.push({
        id: i,
        x: W/2 + (i - (rcBallCount-1)/2)*14,
        y: H-40,
        vx: rdx*sp,
        vy: rdy*sp,
        t: 0,
        cool: 0,
        color: BALL_COLORS[i%BALL_COLORS.length],
        genres: [],
        years: [],
        rate: []
      });
    }
    requestAnimationFrame(step);
  }

  function step(){
    if(!balls.length)return;
    const grav = rcGravMode === 'moon' ? 0.055 : rcGravMode === 'hyper' ? 0.16 : 0.115;
    const bounceMult = rcGravMode === 'hyper' ? 1.14 : 1.04;
    const active = [];

    for(const b of balls){
      b.vy += grav; b.x += b.vx; b.y += b.vy; b.t++; b.cool--;
      if(b.x<8||b.x>W-8){
        const w=b.x<8?walls[0]:walls[1];
        b.vx*=-.95; b.x=clamp(b.x,8,W-8);
        b.years.push(w.tag[1]); state.years.push(w.tag[1]); addTag(w.tag[0]);
      }
      if(b.y<8){ b.vy=Math.abs(b.vy)*.95; }
      bumpers.forEach(bmp=>{
        const d=Math.hypot(b.x-bmp.x,b.y-bmp.y)||1;
        if(d<bmp.r+9){
          const nx=(b.x-bmp.x)/d,ny=(b.y-bmp.y)/d;
          b.x=bmp.x+nx*(bmp.r+10); b.y=bmp.y+ny*(bmp.r+10);
          if(b.cool<=0){
            const dot=b.vx*nx+b.vy*ny;
            b.vx=(b.vx-2*dot*nx)*bounceMult; b.vy=(b.vy-2*dot*ny)*bounceMult;
            b.cool=5; bmp.flash=8;
            b.genres.push(bmp.g); state.genres.push(bmp.g);
            addTag('a hint of '+bmp.g.toLowerCase());
          }
        }
      });
      flips.forEach(f=>{
        if(b.vy>0&&b.y>=f.y-12&&b.y<=f.y+16&&Math.abs(b.x-f.x)<52){
          b.y=f.y-10; b.vy=-Math.abs(b.vy)*.92-2.2; b.vx+=(b.x-f.x)*.05;
          b.rate.push(f.tag[1]); state.rate.push(f.tag[1]); addTag(f.tag[0]);
        }
      });
      b.vx=clamp(b.vx,-14,14); b.vy=clamp(b.vy,-15,15);
      if(b.y<=H+10 && b.t<=850) active.push(b);
    }

    balls = active;
    draw();
    if(!balls.length){ land(); return; }
    requestAnimationFrame(step);
  }

  function land(){
    draw();
    const gw={};state.genres.forEach(g=>gw[g]=(gw[g]||0)+1);
    const yrs=state.years.length?state.years.reduce((a,b)=>a+b,0)/state.years.length:null;
    const dark=state.rate.includes('dark'),hi=state.rate.includes('high');
    let pool=all().filter(i=>i.thumb&&!watchedTitles.includes(i.title));
    const scored=pool.map(i=>{
      let sc=Math.random()*1.2+(gw[i.genre]||0)*2.4;
      if(yrs!=null)sc+=Math.max(0,3-Math.abs(i.year-yrs)/8);
      if(dark&&['Horror','Thriller','Crime'].includes(i.genre))sc+=2;
      if(hi)sc+=(parseFloat(i.rating)-7)*1.2;
      return[i,sc];
    }).sort((a,b)=>b[1]-a[1]);

    const pickCount = rcBallCount === 1 ? 1 : Math.min(3, rcBallCount);
    const winners = scored.slice(0, pickCount).map(x => x[0]);
    const it = winners[0];
    const trail = tags.length ? tags.slice(0, 6).join(' → ') : 'a clean drop straight down the center';
    const score = Math.round(scored[0][1]*10)/10;

    if(pickCount === 1){
      const fb=generateStylizedPosterDataURI(it),attrT=esc(it.title);
      $('rcResult').innerHTML=`<div class="flex gap-4 items-center"><img src="${posterCache[it.type+':'+it.title]||fb}" data-title="${attrT}" onerror="this.onerror=null;this.src='${fb}';" class="lazy-poster w-24 h-36 object-cover rounded-xl border border-white/10 shrink-0" alt="">
        <div class="space-y-2 min-w-0 flex-1"><div class="text-[11px] font-extrabold uppercase tracking-widest text-brand-gold">Single-Ball Ricochet Winner</div>
        <div class="text-xl font-display font-bold text-white truncate">${esc(it.cleanName||it.title)} <span class="text-gray-500 text-sm font-normal">(${it.year})</span></div>
        <div class="text-xs text-gray-400">${esc(it.genre)} · ★ ${it.rating} · ${esc(it.platformName)}</div>
        <div class="text-xs text-gray-300"><b class="text-white">Pinball path:</b> ${esc(trail)}</div>
        <div class="flex flex-wrap gap-2 pt-1"><button id="rcWish" class="px-3 py-1.5 rounded-lg bg-rose-500 text-white text-xs font-bold"><i class="fa-solid fa-heart mr-1"></i>Add to Watchlist</button><button id="rcOpen" class="px-3 py-1.5 rounded-lg border border-white/15 text-xs font-bold text-gray-200">Inspect Title</button></div></div></div>`;
      attachThumbObservers($('rcResult'));
      $('rcWish').onclick=()=>{if(!wishlistTitles.includes(it.title)){wishlistTitles.push(it.title);showToast(`Added "${it.cleanName||it.title}" to Watchlist!`,'fa-heart','text-rose-400');updateAllCountersAndViews();}};
      $('rcOpen').onclick=()=>openDetailModal(it.title);
    } else {
      $('rcResult').innerHTML=`<div class="space-y-3">
        <div class="flex items-center justify-between">
          <div class="text-xs font-extrabold uppercase tracking-widest text-brand-gold"><i class="fa-solid fa-bolt mr-1"></i>${rcBallCount}-Ball Combo Feature (${winners.length} Picks Unlocked!)</div>
          <span class="text-[11px] text-gray-400">${esc(trail)}</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-${winners.length} gap-3">
          ${winners.map((w, idx) => {
            const fb=generateStylizedPosterDataURI(w),attrT=esc(w.title),escJs=w.title.replace(/'/g,"\'");
            return `<div onclick="openDetailModal('${escJs}')" class="p-3 rounded-2xl bg-black/50 border border-white/10 hover:border-brand-gold/50 flex items-center gap-3 cursor-pointer transition-all">
              <img src="${posterCache[w.type+':'+w.title]||fb}" data-title="${attrT}" onerror="this.onerror=null;this.src='${fb}';" class="lazy-poster w-14 h-20 object-cover rounded-lg border border-white/10 shrink-0" alt="">
              <div class="min-w-0 flex-1">
                <div class="text-[10px] font-bold text-brand-gold">Ball #${idx+1} Pick</div>
                <div class="text-xs font-bold text-white truncate">${esc(w.cleanName||w.title)}</div>
                <div class="text-[11px] text-gray-400">${esc(w.genre)} · ★ ${w.rating}</div>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>`;
      attachThumbObservers($('rcResult'));
    }

    best.push({t:it.cleanName||it.title,trail,score,y:it.year});best=best.sort((a,b)=>b.score-a.score).slice(0,5);
    try{localStorage.setItem('cs_ricochet',JSON.stringify(best));}catch(e){}
    drawBest();
  }

  function drawBest(){
    const el=$('rcBest');
    if(!el)return;
    el.innerHTML=best.length?best.map((b,i)=>`<div><b class="text-white">${i+1}. ${esc(b.t)}</b> <span class="text-gray-500">(${b.y})</span><div class="text-[11px] text-gray-400">${esc(b.trail)}</div></div>`).join(''):'<span class="text-gray-500">No shots recorded yet.</span>';
  }

  // Bind Multi-Ball & Physics Lab Controls
  document.querySelectorAll('.rc-ball-btn').forEach(btn=>{
    btn.onclick=()=>{
      rcBallCount = parseInt(btn.dataset.balls, 10) || 1;
      document.querySelectorAll('.rc-ball-btn').forEach(b=>{
        const on = b === btn;
        b.className = 'rc-ball-btn py-2 rounded-xl text-xs ' + (on ? 'font-extrabold bg-brand-gold text-black shadow' : 'font-bold bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10');
      });
      updateRcModeBadge();
      if(!balls.length) draw();
    };
  });
  document.querySelectorAll('.rc-grav-btn').forEach(btn=>{
    btn.onclick=()=>{
      rcGravMode = btn.dataset.grav || 'normal';
      document.querySelectorAll('.rc-grav-btn').forEach(b=>{
        const on = b === btn;
        b.className = 'rc-grav-btn py-1.5 rounded-lg text-[11px] ' + (on ? 'font-bold bg-cyan-500/25 border border-cyan-400/50 text-cyan-200' : 'font-semibold bg-white/5 text-gray-300 border border-white/10');
      });
      updateRcModeBadge();
    };
  });
  document.querySelectorAll('.rc-layout-btn').forEach(btn=>{
    btn.onclick=()=>{
      rcLayoutMode = btn.dataset.layout || 'standard';
      document.querySelectorAll('.rc-layout-btn').forEach(b=>{
        const on = b === btn;
        b.className = 'rc-layout-btn py-1.5 rounded-lg text-[11px] ' + (on ? 'font-bold bg-purple-500/25 border border-purple-400/50 text-purple-200' : 'font-semibold bg-white/5 text-gray-300 border border-white/10');
      });
      buildBumpers(false);
      if(!balls.length) draw();
    };
  });

  $('rcLaunch').onclick=()=>launch();
  if($('rcShuffle'))$('rcShuffle').onclick=shuffleBumpers;
  cv.addEventListener('pointermove',e=>{if(balls.length)return;const r=cv.getBoundingClientRect();aim=[(e.clientX-r.left)/r.width*W,(e.clientY-r.top)/r.height*H];draw();});
  cv.addEventListener('pointerleave',()=>{aim=null;if(!balls.length)draw();});
  cv.addEventListener('pointerdown',e=>{if(balls.length)return;const r=cv.getBoundingClientRect();launch((e.clientX-r.left)/r.width*W,(e.clientY-r.top)/r.height*H);});
  draw();drawBest();
})();

// ==========================================
// FEATURES 5 & 6: OPPOSITE DAY · SPOILER-PROOF CAPSULE
// ==========================================
(function(){
  const $=id=>document.getElementById(id);
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const jget=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}};
  const jset=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
  const db=t=>globalDatabase[t];
  const img=i=>posterCache[i.type+':'+i.title]||generateStylizedPosterDataURI(i);
  // ---------- OPPOSITE DAY ----------
  const OPPG={'Sci-Fi':'Romance',Drama:'Comedy',Crime:'Animation',Thriller:'Comedy',Horror:'Romance',Fantasy:'Crime',Comedy:'Drama',Romance:'Horror',Action:'Drama',Animation:'Thriller'};
  const ADJ={Romance:'Hopeless Romantic',Comedy:'Cheerful Skeptic',Animation:'Wide-Eyed Dreamer',Drama:'Brooding Poet',Thriller:'Edge-of-Seat Rebel',Crime:'Back-Alley Sleuth',Horror:'Fearless Night Owl'};
  const ERA=y=>y<1970?'Classic Soul':y<1990?'Retro Wanderer':y<2010?'Millennial Drifter':'Modern Maverick';
  let on=jget('cs_opp_on',false), blend=jget('cs_opp_blend',100)/100;
  const NOWY=new Date().getFullYear();
  function profile(){
    const w=watchedTitles.map(db).filter(Boolean), g={};
    w.forEach(i=>g[i.genre]=(g[i.genre]||0)+1);
    const yr=w.length?w.reduce((a,i)=>a+i.year,0)/w.length:2000;
    const rs=Object.values(myRatings);const ar=rs.length?rs.reduce((a,b)=>a+b,0)/rs.length:4;
    return{g,yr,ar,n:w.length};
  }
  function opposite(){
    const p=profile(), top=Object.entries(p.g).sort((a,b)=>b[1]-a[1])[0];
    const tg=top?top[0]:'Drama', og=OPPG[tg]||'Comedy';
    const oy=Math.round(1930+(NOWY-p.yr)); // mirror the era
    const lowBar=p.ar>=3.5; // generous raters -> pick tougher, harsher-rated
    const nm=`The ${ERA(oy)} ${ADJ[og]||'Contrarian'}`;
    const line=`Loves ${og.toLowerCase()} from around ${Math.round(oy/10)*10}s and ${lowBar?'prefers unloved gems over crowd favourites':'only trusts the crowd favourites'}.`;
    return{tg,og,oy,lowBar,nm,line,p};
  }
  function picks(t,n=8){
    const o=opposite(),p=o.p,tot=Math.max(1,p.n);
    return Object.values(globalDatabase).filter(i=>i.thumb&&!watchedTitles.includes(i.title)).map(i=>{
      const mine=(p.g[i.genre]||0)/tot+Math.max(0,1-Math.abs(i.year-p.yr)/40)*.5+(parseFloat(i.rating)-7)*.1;
      const opp=(i.genre===o.og?1:(i.genre===OPPG[o.og]?.2:0))+Math.max(0,1-Math.abs(i.year-o.oy)/40)*.5+(o.lowBar?(8.4-parseFloat(i.rating))*.1:(parseFloat(i.rating)-7)*.1);
      return[i,(1-t)*mine+t*opp+Math.random()*.15];
    }).sort((a,b)=>b[1]-a[1]).slice(0,n).map(x=>x[0]);
  }
  const ban=document.createElement('div');ban.id='oppBar';ban.className='hidden';
  ban.innerHTML=`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="glass-card rounded-2xl border border-fuchsia-400/50 p-4 mt-3 space-y-3">
    <div class="flex items-center gap-3 flex-wrap"><i class="fa-solid fa-shuffle text-fuchsia-300"></i><span class="text-xs font-extrabold uppercase tracking-widest text-fuchsia-300">Opposite Day is on</span>
      <span id="oppName" class="text-lg font-display font-extrabold text-white"></span><span id="oppLine" class="text-xs text-gray-400 flex-1 min-w-[12rem]"></span>
      <button id="oppOff" class="px-3 py-1.5 rounded-lg border border-white/15 text-xs font-bold text-gray-300">Turn off</button></div>
    <div class="flex items-center gap-3 text-xs font-bold text-gray-300"><span>Me</span><input id="oppSlider" type="range" min="0" max="100" class="flex-1 accent-fuchsia-400" aria-label="Me to Opposite"><span>Opposite</span></div>
    <div id="oppPicks" class="hscroll flex gap-3 overflow-x-auto pb-2"></div></div></div>`;
  const hd=document.querySelector('header');hd.parentNode.insertBefore(ban,hd.nextSibling);
  function oppRender(){
    $('oppState').textContent=on?'On':'Off';ban.classList.toggle('hidden',!on);
    if(!on)return;
    const o=opposite();$('oppName').textContent=o.nm;$('oppLine').textContent=o.line;$('oppSlider').value=Math.round(blend*100);
    const opEl=$('oppPicks');
    opEl.innerHTML=picks(blend).map(i=>`<div class="shrink-0 w-28 space-y-1.5"><img src="${img(i)}" data-title="${esc(i.title)}" class="lazy-poster w-28 h-40 object-cover rounded-xl border border-white/10 cursor-pointer" onclick="openDetailModal('${i.title.replace(/'/g,"\\'")}')" alt=""><div class="text-[11px] text-white font-bold truncate">${esc(i.cleanName||i.title)}</div><button data-t="${esc(i.title)}" class="steal w-full py-1 rounded-lg ${wishlistTitles.includes(i.title)?'bg-rose-500 text-white':'bg-fuchsia-500/80 text-white'} text-[11px] font-bold">${wishlistTitles.includes(i.title)?'Stolen ✓':'Steal it'}</button></div>`).join('');
    attachThumbObservers(opEl);
  }
  $('oppPicks').onclick=e=>{const b=e.target.closest('.steal');if(!b)return;const t=b.dataset.t;if(!wishlistTitles.includes(t)){wishlistTitles.push(t);showToast(`Stole "${t}" into your Watchlist!`,'fa-heart','text-fuchsia-300');updateAllCountersAndViews();}b.textContent='Stolen ✓';};
  let oppRaf=0;
  $('oppSlider').oninput=e=>{blend=e.target.value/100;jset('cs_opp_blend',e.target.value);if(!oppRaf){oppRaf=requestAnimationFrame(()=>{oppRaf=0;oppRender();discoverFlip();});}};
  function discoverFlip(){ if(typeof activeMood!=='undefined'&&activeMood)selectMood(activeMood); if(window.cxOpen&&!$('tab-web').classList.contains('hidden'))setTimeout(window.cxOpen,30); }
  window.oppToggle=()=>{on=!on;jset('cs_opp_on',on);$('vibePanel').classList.add('hidden');oppRender();discoverFlip();};
  $('oppOff').onclick=()=>window.oppToggle();
  // mood picks follow the blend
  const _sm=window.selectMood;
  window.selectMood=function(m){
    _sm.apply(this,arguments);
    if(!on)return;
    const gs=moods[m]||[],o=opposite(),flip=[...new Set(gs.map(g=>OPPG[g]||g))];
    const pool=Object.values(globalDatabase).filter(i=>i.thumb&&parseFloat(i.rating)>=7.4);
    const sc=i=>(1-blend)*(gs.includes(i.genre)?1:0)+blend*(flip.includes(i.genre)?1:0)+(Math.random()*.5);
    const row=$('moodRow');row.innerHTML=pool.sort((a,b)=>sc(b)-sc(a)).slice(0,16).map(i=>createCardHTML(i,true)).join('');attachThumbObservers(row);
  };
  // constellation: flip suggested branches by re-opening it with banner visible
  window.oppOn=()=>on; window.oppBlend=()=>blend; window.oppGenre=g=>on&&blend>=.5?(OPPG[g]||g):g;
  // ---------- SPOILER-PROOF CAPSULE ----------
  let caps=jget('cs_capsules',{});
  const stars=n=>'★'.repeat(n)+'☆'.repeat(5-n);
  function saveCaps(){jset('cs_capsules',caps);capRender();}
  const _od=window.openDetailModal;
  window.openDetailModal=async function(title){
    await _od.apply(this,arguments);
    const it=db(title);if(!it)return;
    const host=$('detailModalContent');
    if(!host)return;
    host.querySelectorAll('#capBox').forEach(el=>el.remove());
    const c=caps[title],box=document.createElement('div');
    box.className='mx-6 mb-6 p-4 rounded-2xl border border-red-400/30 bg-red-500/5 space-y-3';box.id='capBox';
    if(c&&!c.opened)box.innerHTML=`<div class="flex items-center justify-between gap-3"><div class="flex items-center gap-3"><div class="wax" style="width:40px;height:40px;font-size:16px"><i class="fa-solid fa-lock"></i></div><div class="text-sm text-gray-300"><b class="text-white">Capsule sealed.</b> It opens when you mark this watched.</div></div><button id="capDel" class="text-xs text-gray-400 hover:text-rose-400 px-2 py-1 rounded border border-white/10">Delete</button></div>`;
    else if(c&&c.opened)box.innerHTML=`<div class="flex items-center justify-between gap-3"><div class="text-sm text-gray-300"><b class="text-white">Capsule opened:</b> you predicted ${stars(c.stars)}, real ${stars(c.real)} · vibe <b>${esc(c.vibe)}</b> → <b>${esc(c.realVibe||'—')}</b>.</div><button id="capDel" class="text-xs text-gray-400 hover:text-rose-400 px-2 py-1 rounded border border-white/10">Reset</button></div>`;
    else if(!watchedTitles.includes(title))box.innerHTML=`<div class="text-[11px] font-extrabold uppercase tracking-widest text-red-300"><i class="fa-solid fa-hourglass-half mr-1"></i>Spoiler-proof capsule</div>
      <input id="capGuess" maxlength="120" placeholder="Guess the ending…" class="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-sm text-white">
      <div class="flex items-center gap-3 flex-wrap"><span id="capStars" class="text-xl text-brand-gold cursor-pointer select-none" data-n="3">★★★☆☆</span><input id="capVibe" maxlength="14" placeholder="One-word vibe" class="px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-sm text-white w-36"><button id="capSeal" class="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold">Seal prediction</button></div>`;
    else return;
    host.appendChild(box);
    const delBtn=box.querySelector('#capDel');
    if(delBtn)delBtn.onclick=()=>{delete caps[title];saveCaps();openDetailModal(title);};
    const st=$('capStars');if(st){st.onclick=e=>{const r=st.getBoundingClientRect(),n=Math.max(1,Math.min(5,Math.ceil((e.clientX-r.left)/r.width*5)));st.dataset.n=n;st.textContent=stars(n);};
      $('capSeal').onclick=()=>{const g=$('capGuess').value.trim(),v=$('capVibe').value.trim();if(!g||!v){showToast('Add a guess and a one-word vibe','fa-pen','text-gray-300');return;}
        caps[title]={guess:g,stars:+st.dataset.n,vibe:v,genre:it.genre,at:Date.now(),opened:false};jset('cs_capsules',caps);
        openDetailModal(title);capRender();};}
  };
  const _tw=window.toggleWatched;
  window.toggleWatched=function(title){
    const was=watchedTitles.includes(title);_tw.apply(this,arguments);
    if(!was&&caps[title]&&!caps[title].opened)setTimeout(()=>capOpen(title),250);
  };
  function capOpen(title){
    const c=caps[title],it=db(title);if(!c||!it)return;
    const ov=document.createElement('div');ov.className='fixed inset-0 z-[120] bg-black/80 flex items-center justify-center p-4';
    ov.innerHTML=`<div class="glass-card crack rounded-3xl border border-red-400/40 p-6 max-w-md w-full space-y-4 relative"><button id="rlCancel" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 flex items-center justify-center" title="Keep sealed for later"><i class="fa-solid fa-xmark"></i></button><div class="flex items-center gap-3"><div class="wax"><i class="fa-solid fa-lock-open"></i></div><div><div class="text-[11px] font-extrabold uppercase tracking-widest text-red-300">Capsule cracked open</div><div class="text-lg font-display font-bold text-white">${esc(it.cleanName||it.title)}</div></div></div>
      <div class="text-sm text-gray-300 space-y-1"><div>You guessed: <i class="text-white">"${esc(c.guess)}"</i></div><div>Predicted ${stars(c.stars)} · vibe <b class="text-brand-gold">${esc(c.vibe)}</b></div></div>
      <div class="text-sm text-gray-300">Now your real reaction:</div>
      <div class="flex items-center gap-3 flex-wrap"><span id="rlStars" class="text-2xl text-brand-gold cursor-pointer select-none" data-n="${myRatings[title]||3}">${stars(myRatings[title]||3)}</span><input id="rlVibe" maxlength="14" placeholder="Real vibe" class="px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-sm text-white w-32"></div>
      <div id="rlOut"></div><div class="flex gap-2"><button id="rlGo" class="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold">Reveal</button><button id="rlLater" class="px-4 py-2.5 rounded-xl border border-white/15 text-gray-300 text-sm font-semibold">Later</button></div></div>`;
    document.body.appendChild(ov);
    ov.querySelector('#rlCancel').onclick=()=>ov.remove();
    ov.querySelector('#rlLater').onclick=()=>ov.remove();
    const st=ov.querySelector('#rlStars');
    st.onclick=e=>{const r=st.getBoundingClientRect(),n=Math.max(1,Math.min(5,Math.ceil((e.clientX-r.left)/r.width*5)));st.dataset.n=n;st.textContent=stars(n);};
    ov.querySelector('#rlGo').onclick=function(){
      if(c.opened){ov.remove();return;}
      const real=+st.dataset.n,v=ov.querySelector('#rlVibe').value.trim()||'—';
      Object.assign(c,{opened:true,real,realVibe:v});myRatings[title]=real;updateAllCountersAndViews();saveCaps();
      const d=c.stars-real;ov.querySelector('#rlOut').innerHTML=`<div class="p-3 rounded-xl bg-black/40 text-sm text-gray-200">${d===0?'Spot on, you read yourself perfectly.':d>0?`You overrated it by ${d} ★.`:`You underrated it by ${-d} ★.`} Vibe: <b>${esc(c.vibe)}</b> → <b>${esc(v)}</b>. Oracle score now <b class="text-brand-gold">${oracle().score}%</b>.</div>`;
      this.textContent='Close';
      const lBtn=ov.querySelector('#rlLater');if(lBtn)lBtn.remove();
    };
  }
  function oracle(){
    const o=Object.entries(caps).filter(([,c])=>c.opened);if(!o.length)return{score:null,n:0,pat:[]};
    const err=o.reduce((a,[,c])=>a+Math.abs(c.stars-c.real),0)/o.length,g={};
    o.forEach(([,c])=>{(g[c.genre]=g[c.genre]||[]).push(c.stars-c.real);});
    const pat=Object.entries(g).map(([k,v])=>[k,v.reduce((a,b)=>a+b,0)/v.length]).filter(x=>Math.abs(x[1])>=.5).map(([k,d])=>`You ${d>0?'overrate':'underrate'} ${k.toLowerCase()} by ${Math.abs(d).toFixed(1)} stars`);
    return{score:Math.round(100-err*25),n:o.length,pat};
  }
  const shelf=document.createElement('div');shelf.className='glass-card rounded-3xl p-6 border border-white/10 space-y-3';shelf.id='capShelf';
  $('hubShelves').parentNode.insertBefore(shelf,$('hubShelves').nextSibling);
  const orc=document.createElement('div');orc.className='glass-card rounded-3xl p-5 border border-red-400/30 space-y-2';orc.id='oracleBox';
  $('tab-web').insertBefore(orc,$('tab-web').firstChild);
  function capRender(){
    const un=Object.entries(caps).filter(([,c])=>!c.opened);
    shelf.innerHTML=`<div class="text-[11px] font-bold uppercase tracking-widest text-red-300">Capsule shelf</div>`+(un.length?`<div class="flex flex-wrap gap-3">${un.map(([t])=>`<button onclick="openDetailModal('${t.replace(/'/g,"\\'")}')" class="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 border border-red-400/30 text-sm text-white"><span class="wax" style="width:26px;height:26px;font-size:11px;animation:none"><i class="fa-solid fa-lock"></i></span>${esc(db(t)?.cleanName||t)}</button>`).join('')}</div>`:'<div class="text-xs text-gray-500">No sealed capsules. Open any title and seal a prediction before you watch.</div>');
    const o=oracle();
    orc.innerHTML=`<div class="text-[11px] font-extrabold uppercase tracking-widest text-red-300">Oracle · how well you predict yourself</div>`+(o.n?`<div class="flex items-end gap-3"><span class="text-4xl font-display font-extrabold text-white">${o.score}%</span><span class="text-xs text-gray-400 pb-1">from ${o.n} opened capsule${o.n>1?'s':''}</span></div>${o.pat.map(p=>`<div class="text-sm text-gray-300">• ${esc(p)}</div>`).join('')||'<div class="text-xs text-gray-500">No strong bias yet.</div>'}`:'<div class="text-xs text-gray-500">Seal and open a capsule to start your Oracle score.</div>');
  }
  capRender();oppRender();if(on)discoverFlip();
})();

(function(){const l=document.getElementById('compatLab'),p=document.getElementById('tab-compat');if(l&&p)p.appendChild(l);})();
