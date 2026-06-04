/* RTK public site interactions */
document.getElementById('year').textContent=new Date().getFullYear();
initLang();

/* Language dropdown */
const langBtn=document.getElementById('langBtn'), langMenu=document.getElementById('langMenu');
function toggleLang(){ langMenu.classList.toggle('open'); }
langBtn.addEventListener('click',e=>{e.stopPropagation();toggleLang();});
document.addEventListener('click',()=>langMenu.classList.remove('open'));

/* Mobile menu */
const hamb=document.getElementById('hamb'), navLinks=document.getElementById('navLinks');
hamb.addEventListener('click',()=>navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

/* Service tabs */
document.querySelectorAll('#svcTabs .tab').forEach(t=>{
  t.addEventListener('click',()=>{
    document.querySelectorAll('#svcTabs .tab').forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    const id=t.dataset.tab;
    document.querySelectorAll('[data-panel]').forEach(p=>p.classList.toggle('active',p.dataset.panel===id));
  });
});

/* Portfolio render + filter */
let portFilter='all';
function renderPortfolio(){
  const grid=document.getElementById('portGrid');
  const lang=document.documentElement.lang||'en'; const d=I18N[lang]||I18N.en;
  const list=rtkLoad().filter(p=>portFilter==='all'||p.industry===portFilter);
  grid.innerHTML=list.map(p=> p.slide
    ? `<div class="product">${phHtml(p)}</div>`
    : `<div class="product">
      ${phHtml(p)}
      <div class="body">
        <h4>${esc(p.name)}</h4>
        ${p.maker?`<div class="row"><span>MAKER</span><b>${esc(p.maker)}</b></div>`:''}
        ${p.material&&p.material!=='—'?`<div class="row"><span>${d.p_material}</span><b>${esc(p.material)}</b></div>`:''}
        ${p.process&&p.process!=='—'?`<div class="row"><span>${d.p_process}</span><b>${esc(p.process)}</b></div>`:''}
        ${p.industry?`<span class="tag">${esc(p.industry)}</span>`:''}${p.sr?`<span class="tag" style="background:#fde7d6;color:#b45309">S&amp;R</span>`:''}
      </div>
    </div>`).join('') || `<p style="color:var(--muted)">—</p>`;
}
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}

/* product/gallery image cell: shows photo if set, else technical illustration */
function phHtml(p){
  var icon=(p.kind&&typeof ICONS!=="undefined"&&ICONS[p.kind])?ICONS[p.kind]:PART_SVG;
  var src=(typeof rtkImgs!=='undefined'?rtkImgs(p)[0]:(p.img||'')); var fit=p.fit||'cover';
  return '<div class="ph" style="position:relative;background:#fff">'+icon+(src?'<img src="'+esc(src)+'" alt="'+esc(p.name||'RTK')+'" loading="lazy" onerror="this.remove()" style="position:absolute;inset:0;width:100%;height:100%;object-fit:'+fit+'">':'')+'</div>';
}

document.querySelectorAll('#portTabs .tab').forEach(t=>{
  t.addEventListener('click',()=>{
    document.querySelectorAll('#portTabs .tab').forEach(x=>x.classList.remove('active'));
    t.classList.add('active'); portFilter=t.dataset.ptab; renderPortfolio();
  });
});
renderPortfolio();
const _setLang=setLang;
window.setLang=function(l){ _setLang(l); renderPortfolio(); };

/* File input label */
const fileInput=document.getElementById('fileInput');
fileInput.addEventListener('change',()=>{document.getElementById('fileName').textContent=fileInput.files[0]?fileInput.files[0].name:'';});

/* Toast */
function toast(msg,err){
  const t=document.getElementById('toast'); t.textContent=msg;
  t.className='toast show'+(err?' err':''); setTimeout(()=>t.className='toast',4000);
}

/* RFQ submit via EmailJS -> russamitongtrakul@hotmail.com
   SETUP (free at https://www.emailjs.com): get SERVICE ID, TEMPLATE ID, PUBLIC KEY
   and paste them into EMAILJS_CFG below. See emailjs-template.txt for the template.
   If left as placeholders, the form falls back to the visitor's email client (mailto). */
const SALES_EMAIL='russamitongtrakul@hotmail.com';
/* RFQ via FormSubmit.co — no signup, emails to russamitongtrakul@hotmail.com with the drawing attached.
   First submission triggers a one-time activation email to that inbox (click to confirm). */
const rfqForm=document.getElementById('rfqForm');
if(rfqForm){
  rfqForm.addEventListener('submit',function(e){
    var lang=document.documentElement.lang||'en'; var d=I18N[lang]||I18N.en; var f=e.target;
    var req=['company','person','email'];
    for(var i=0;i<req.length;i++){ if(!f[req[i]].value.trim()){ e.preventDefault(); f[req[i]].focus(); toast(d.toast_err,true); return; } }
    var btn=f.querySelector('button[type=submit]'); if(btn){ btn.disabled=true; btn.textContent='...'; }
    /* valid -> allow native POST to FormSubmit (sends email + file attachment) */
  });
}
/* show success toast after FormSubmit redirects back with ?rfq=success */
(function(){ try{ if(location.search.indexOf('rfq=success')>-1){ var lang=document.documentElement.lang||'en'; toast((I18N[lang]||I18N.en).toast_ok); history.replaceState(null,'',location.pathname); } }catch(e){} })();

/* Machinery & QC equipment galleries (seed in portfolio.js, editable in Admin) */
function renderGallery(key,seed,elId,withSpec){
  var el=document.getElementById(elId); if(!el) return;
  var list=rtkLoadKey(key,seed);
  el.innerHTML=list.map(function(p){
    return '<div class="product">'+phHtml(p)+'<div class="body"><h4>'+esc(p.name)+'</h4>'+
      ((withSpec&&p.spec)?('<div class="row"><span></span><b>'+esc(p.spec)+'</b></div>'):'')+'</div></div>';
  }).join('') || '';
}
renderGallery(MACH_KEY,MACH_SEED,'machineGallery',true);
renderGallery(QC_KEY,QC_SEED,'qcGallery',false);
