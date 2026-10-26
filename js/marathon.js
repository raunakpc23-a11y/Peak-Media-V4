// ==========================================
// FEATURE 7: MARATHON ARCHITECT
// ==========================================
(function(){
  const $=id=>document.getElementById(id);
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const db=t=>globalDatabase[t];
  const hash=s=>{let h=7;for(const c of s)h=(h*31+c.charCodeAt(0))>>>0;return h;};
  const mins=i=>i.type==='show'?100:85+hash(i.title)%75;      // estimated runtime (2 episodes for series)
  const INT={Horror:.95,Thriller:.85,Action:.9,Crime:.75,'Sci-Fi':.7,Fantasy:.65,Drama:.5,Romance:.35,Comedy:.25,Animation:.2};
  const MOODG={cosy:['Comedy','Animation','Romance','Fantasy'],thrilling:['Thriller','Crime','Action','Horror'],thoughtful:['Drama','Sci-Fi','Crime'],epic:['Fantasy','Action','Sci-Fi'],funny:['Comedy','Animation']};
  let plan=[];
  let slotEnergy=[];
  const getStartMins=()=>{const v=($('mhStart')&&$('mhStart').value)||'18:00';const [hh,mm]=v.split(':').map(Number);return (isNaN(hh)?18:hh)*60+(isNaN(mm)?0:mm);};
  const fmt=m=>{const tot=(getStartMins()+Math.round(m))%1440;const h=Math.floor(tot/60),mn=tot%60;return`${String(h).padStart(2,'0')}:${String(mn).padStart(2,'0')}`;};
  const getBreakMins=()=>Math.max(0,parseInt(($('mhBreakLen')&&$('mhBreakLen').value)||'15',10));
  function computeArcTarget(k, n, shape){
    if(n<2) return 0.65;
    const u = k/(n-1);
    if(shape==='escalate') return Math.min(0.95, 0.30 + 0.65*u);
    if(shape==='frontload') return Math.max(0.25, 0.92 - 0.65*u);
    if(shape==='coaster') return k%2===0 ? 0.88 : 0.35;
    if(shape==='latepeak') return u < 0.7 ? (0.35 + u*0.7) : (0.95 - (u-0.7)*0.8);
    return Math.sin(Math.PI*(.15+.7*u));
  }
  function itemEnergy(i){
    const base = INT[i.genre] || 0.55;
    const rBoost = Math.max(-0.08, Math.min(0.08, (parseFloat(i.rating||8)-8.0)*0.06));
    return Math.max(0.18, Math.min(0.98, base + rBoost));
  }
  function build(){
    const total=Math.max(2,+$('mhHours').value||8)*60,mood=$('mhMood').value,no=$('mhNo').value,mg=MOODG[mood]||MOODG.epic;
    const shape=($('mhArcShape')&&$('mhArcShape').value)||'wave';
    const brk=getBreakMins();
    let pool=Object.values(globalDatabase).filter(i=>i.thumb&&!watchedTitles.includes(i.title)&&parseFloat(i.rating)>=7.3&&i.genre!==no);
    const sc=i=>(mg.includes(i.genre)?2:0)+parseFloat(i.rating)*.3+Math.random()*1.5;
    pool=pool.sort((a,b)=>sc(b)-sc(a)).slice(0,140);
    const picked=[];let used=0;
    for(const i of pool){const need=mins(i)+(picked.length?brk:0);if(used+need>total+25)continue;picked.push(i);used+=need;if(used>total-45)break;}
    const n=picked.length;
    const rem=picked.slice(),ordered=[];
    slotEnergy=[];
    for(let k=0;k<n;k++){
      const t=computeArcTarget(k,n,shape);
      rem.sort((a,b)=>Math.abs(itemEnergy(a)-t)-Math.abs(itemEnergy(b)-t));
      const chosen=rem.shift();
      ordered.push(chosen);
      slotEnergy.push(Math.round(itemEnergy(chosen)*100));
    }
    plan=ordered;draw(true);
  }
  window.mhAdjustSlotEnergy = function(idx, newPct, swapMatch){
    idx = +idx;
    if(!plan[idx]) return;
    const clamped = Math.max(20, Math.min(98, +newPct || 55));
    slotEnergy[idx] = clamped;
    if(swapMatch){
      const target = clamped / 100;
      const no = ($('mhNo')&&$('mhNo').value)||'';
      const usedTitles = new Set(plan.map(x=>x.title));
      const candidates = Object.values(globalDatabase).filter(i=>i.thumb && !usedTitles.has(i.title) && i.genre!==no && parseFloat(i.rating)>=7.4);
      candidates.sort((a,b)=>Math.abs(itemEnergy(a)-target)-Math.abs(itemEnergy(b)-target));
      if(candidates.length){
        const pickPool = candidates.slice(0, Math.min(8, candidates.length));
        plan[idx] = pickPool[Math.floor(Math.random()*pickPool.length)];
      }
    }
    draw(false);
  };
  window.mhSwapSlotTitle = function(idx){
    idx = +idx;
    if(!plan[idx]) return;
    const target = (slotEnergy[idx] || 60) / 100;
    window.mhAdjustSlotEnergy(idx, Math.round(target*100), true);
    showToast(`Swapped Slot #${idx+1} to "${plan[idx].cleanName||plan[idx].title}"`, 'fa-arrows-rotate', 'text-brand-gold');
  };
  window.mhAddSlot = function(){
    const usedTitles = new Set(plan.map(x=>x.title));
    const no = ($('mhNo')&&$('mhNo').value)||'';
    const mood = ($('mhMood')&&$('mhMood').value)||'epic';
    const mg = MOODG[mood] || MOODG.epic;
    const candidates = Object.values(globalDatabase).filter(i=>i.thumb && !usedTitles.has(i.title) && i.genre!==no && mg.includes(i.genre));
    if(candidates.length){
      const pick = candidates[Math.floor(Math.random()*Math.min(25, candidates.length))];
      plan.push(pick);
      slotEnergy.push(Math.round(itemEnergy(pick)*100));
      draw(false);
    }
  };
  window.mhRemoveSlot = function(){
    if(plan.length <= 1) return;
    plan.pop();
    slotEnergy.pop();
    draw(false);
  };
  function blocks(){
    const out=[];let t=0;
    const brk=getBreakMins();
    plan.forEach((i,k)=>{
      out.push({kind:'film',i,start:t,len:mins(i),idx:k,energy:slotEnergy[k]||Math.round(itemEnergy(i)*100)});t+=mins(i);
      if(k<plan.length-1 && brk>0){const br=k%2?{n:'Stretch & Refill Break',len:brk,ic:'fa-person-walking'}:{n:'Snack & Intermission Break',len:brk,ic:'fa-bowl-food'};out.push({kind:'break',...br,start:t});t+=br.len;}
    });
    return{out,end:t};
  }
  function draw(anim){
    const {out,end}=blocks();$('mhOut').classList.remove('hidden');
    const stVal=($('mhStart')&&$('mhStart').value)||'18:00';
    const filmBlocks = out.filter(b=>b.kind==='film');
    $('mhList').innerHTML=out.map(b=>b.kind==='film'?`<div class="mh-row mh-glow glass-card rounded-2xl p-3 sm:p-4 border border-brand-gold/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-grab" draggable="true" data-i="${b.idx}">
      <div class="flex items-center gap-3 min-w-0 flex-1">
        <div class="px-2 py-1 rounded-lg bg-brand-gold/15 border border-brand-gold/35 text-brand-gold font-extrabold text-xs tabular-nums shrink-0 text-center">
          <div>#${b.idx+1}</div>
          <div class="text-[10px] text-white">${fmt(b.start)}</div>
        </div>
        <img src="${posterCache[b.i.type+':'+b.i.title]||generateStylizedPosterDataURI(b.i)}" data-title="${esc(b.i.title)}" class="lazy-poster w-12 h-[4.5rem] object-cover rounded-lg cursor-pointer shrink-0" onclick="openDetailModal('${b.i.title.replace(/'/g,"\'")}')" alt="">
        <div class="min-w-0 flex-1 cursor-pointer" onclick="openDetailModal('${b.i.title.replace(/'/g,"\'")}')">
          <div class="text-sm font-bold text-white hover:text-brand-gold transition-colors truncate">${esc(b.i.cleanName||b.i.title)} <span class="text-gray-500 font-normal">(${b.i.year})</span></div>
          <div class="text-[11px] text-gray-400">${esc(b.i.genre)} · ★ ${b.i.rating} · ~${b.len} min · ${esc(b.i.platformName)}</div>
          <div class="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold ${b.energy>=80?'text-rose-300':b.energy>=55?'text-brand-gold':'text-cyan-300'}">
            <i class="fa-solid fa-bolt"></i> Moment Intensity: ${b.energy}% (${b.energy>=80?'Peak Climax':b.energy>=55?'Balanced Groove':'Chill / Warm'})
          </div>
        </div>
      </div>
      <div class="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10 shrink-0">
        <div class="flex items-center gap-1.5 bg-black/50 px-2.5 py-1.5 rounded-xl border border-white/10">
          <button type="button" onclick="mhAdjustSlotEnergy(${b.idx}, ${Math.max(20, b.energy-18)}, true)" title="Make this moment calmer/chiller" class="px-1.5 py-0.5 rounded bg-cyan-500/15 hover:bg-cyan-500/30 text-cyan-300 text-[10px] font-bold">Chill −</button>
          <input type="range" min="20" max="95" value="${b.energy}" onchange="mhAdjustSlotEnergy(${b.idx}, this.value, true)" class="w-16 sm:w-20 accent-sky-400 cursor-pointer" title="Slide to change this moment's energy & auto-match film">
          <button type="button" onclick="mhAdjustSlotEnergy(${b.idx}, ${Math.min(96, b.energy+18)}, true)" title="Make this moment higher energy/peak" class="px-1.5 py-0.5 rounded bg-rose-500/15 hover:bg-rose-500/30 text-rose-300 text-[10px] font-bold">Peak +</button>
        </div>
        <button type="button" onclick="mhSwapSlotTitle(${b.idx})" class="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-xs font-bold text-gray-200 flex items-center gap-1" title="Swap this slot's title"><i class="fa-solid fa-arrows-rotate text-brand-gold"></i><span>Swap</span></button>
        <div class="flex flex-col"><button data-mv="-1" data-i="${b.idx}" class="text-gray-400 hover:text-white text-xs px-1" aria-label="Move up">▲</button><button data-mv="1" data-i="${b.idx}" class="text-gray-400 hover:text-white text-xs px-1" aria-label="Move down">▼</button></div>
      </div></div>`
      :`<div class="text-center text-xs text-gray-400 py-1"><i class="fa-solid ${b.ic} mr-1.5 text-brand-gold"></i>${b.n} · ${b.len} min · ${fmt(b.start)}</div>`).join('')+`<div class="text-center text-xs text-gray-400 pt-1 font-semibold">Total Marathon: ${(end/60).toFixed(1)} hrs · Starts ${esc(stVal)} → Lights out around ${fmt(end)}</div>`;
    attachThumbObservers($('mhList'));
    // Interactive SVG energy curve with labeled slot nodes
    const pts=filmBlocks.map((b,k)=>[k/(Math.max(1,filmBlocks.length-1))*260+20, 52-(b.energy/100)*42, b]);
    $('mhCurve').innerHTML=`
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="text-[11px] font-extrabold uppercase tracking-widest text-brand-gold"><i class="fa-solid fa-wave-square mr-1.5"></i>Interactive Energy Timeline · Click or slide any moment to boost or chill</div>
        <div class="text-[11px] text-gray-400">${filmBlocks.length} Slots · Peak at Slot #${(filmBlocks.reduce((best,b,idx)=>b.energy>(filmBlocks[best]?.energy||0)?idx:best,0))+1}</div>
      </div>
      <svg viewBox="0 0 300 68" class="w-full h-24 overflow-visible">
        <defs>
          <linearGradient id="mhLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#38bdf8"/>
            <stop offset="50%" stop-color="#f43f5e"/>
            <stop offset="100%" stop-color="#a855f7"/>
          </linearGradient>
        </defs>
        <line x1="15" y1="14" x2="285" y2="14" stroke="rgba(255,255,255,0.06)" stroke-dasharray="3 3" stroke-width="1"/>
        <line x1="15" y1="34" x2="285" y2="34" stroke="rgba(255,255,255,0.06)" stroke-dasharray="3 3" stroke-width="1"/>
        <line x1="15" y1="52" x2="285" y2="52" stroke="rgba(255,255,255,0.06)" stroke-dasharray="3 3" stroke-width="1"/>
        <polyline fill="none" stroke="url(#mhLineGrad)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="transition:all .4s" points="${pts.map(p=>p[0]+','+p[1]).join(' ')}"/>
        ${pts.map((p,idx)=>`
          <g class="cursor-pointer" onclick="mhAdjustSlotEnergy(${idx}, ${p[2].energy>=80?35:p[2].energy>=55?90:65}, true)">
            <circle cx="${p[0]}" cy="${p[1]}" r="5" fill="${p[2].energy>=80?'#f43f5e':p[2].energy>=55?'#38bdf8':'#34d399'}" stroke="#fff" stroke-width="1.5"/>
            <text x="${p[0]}" y="${Math.max(9, p[1]-7)}" text-anchor="middle" fill="#e2e8f0" font-size="6.5" font-weight="700">${p[2].energy}%</text>
            <text x="${p[0]}" y="64" text-anchor="middle" fill="#94a3b8" font-size="6">${fmt(p[2].start)}</text>
          </g>
        `).join('')}
      </svg>`;
    if(anim)document.querySelectorAll('.mh-row').forEach((r,k)=>{r.style.opacity=0;r.style.transform='translateY(12px)';setTimeout(()=>{r.style.opacity=1;r.style.transform='none';},k*70);});
  }
  function move(a,b){if(b<0||b>=plan.length||a===b)return;const rows=[...document.querySelectorAll('.mh-row')],y0=rows.map(r=>r.getBoundingClientRect().top);const [x]=plan.splice(a,1);plan.splice(b,0,x);draw(false);
    // FLIP animation
    document.querySelectorAll('.mh-row').forEach((r,k)=>{const old=y0[plan.indexOf(plan[k])]; const from=y0[(k===b)?a:(a<b?(k>=a&&k<b?k+1:k):(k>b&&k<=a?k-1:k))];if(from!=null){const d=from-r.getBoundingClientRect().top;r.style.transition='none';r.style.transform=`translateY(${d}px)`;requestAnimationFrame(()=>{r.style.transition='transform .4s';r.style.transform='none';});}});}
  $('mhBuild').onclick=build;
  if($('mhArcShape')) $('mhArcShape').onchange=build;
  if($('mhBreakLen')) $('mhBreakLen').onchange=()=>draw(false);
  if($('mhStart')) $('mhStart').onchange=()=>draw(false);
  window.applyMarathonPreset = function(hours, startTime, mood, excludeGenre) {
    if($('mhHours')) $('mhHours').value = hours;
    if($('mhStart')) $('mhStart').value = startTime;
    if($('mhMood')) $('mhMood').value = mood;
    if($('mhNo')) $('mhNo').value = excludeGenre || '';
    build();
    showToast(`Built ${hours}-hour ${mood} marathon schedule!`, 'fa-hourglass-half', 'text-brand-gold');
  };
  // Auto-build default marathon schedule so Marathon Architect is full and visual immediately!
  setTimeout(() => { if (!plan.length) build(); }, 80);
  $('mhList').onclick=e=>{const b=e.target.closest('[data-mv]');if(b){const i=+b.dataset.i;move(i,i+ +b.dataset.mv);}};
  let dragI=null;
  $('mhList').addEventListener('dragstart',e=>{const r=e.target.closest('.mh-row');if(!r)return;dragI=+r.dataset.i;r.classList.add('drag');e.dataTransfer.effectAllowed='move';});
  $('mhList').addEventListener('dragend',e=>{document.querySelectorAll('.mh-row').forEach(r=>r.classList.remove('drag'));});
  $('mhList').addEventListener('dragover',e=>{if(dragI!=null)e.preventDefault();});
  $('mhList').addEventListener('drop',e=>{const r=e.target.closest('.mh-row');if(!r||dragI==null)return;e.preventDefault();const to=+r.dataset.i,from=dragI;dragI=null;move(from,to);});
  $('mhCopy').onclick=()=>{const {out}=blocks();const t='My Watch Marathon\n'+out.map(b=>b.kind==='film'?`${fmt(b.start)}  ${b.i.cleanName||b.i.title} (${b.i.year}) ~${b.len}m`:`${fmt(b.start)}  -- ${b.n} (${b.len}m)`).join('\n');
    (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>showToast('Plan copied','fa-copy','text-brand-gold'),()=>{const ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');showToast('Plan copied','fa-copy','text-brand-gold');}catch(e){}ta.remove();});};
  $('mhWish').onclick=()=>{let n=0;plan.forEach(i=>{if(!wishlistTitles.includes(i.title)){wishlistTitles.push(i.title);n++;}});showToast(`Added ${n} titles to your Watchlist in order`,'fa-heart','text-rose-400');updateAllCountersAndViews();};

})();
