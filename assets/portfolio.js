/* Shared portfolio store — persisted in localStorage so the Admin panel and the
   public site read/write the same data on the visitor's browser. */
const RTK_STORE_KEY='rtk_products_v2';
const RTK_SEED=[
  {id:1,name:"",industry:"Automotive",slide:true,fit:"contain",img:"images/products/slide01.jpg"},
  {id:2,name:"",industry:"Automotive",slide:true,fit:"contain",img:"images/products/slide02.jpg"},
  {id:3,name:"",industry:"Automotive",slide:true,fit:"contain",img:"images/products/slide03.jpg"},
  {id:4,name:"",industry:"Automotive",slide:true,fit:"contain",img:"images/products/slide04.jpg"},
  {id:5,name:"",industry:"Automotive",slide:true,fit:"contain",img:"images/products/slide05.jpg"},
  {id:6,name:"",industry:"Automotive",slide:true,fit:"contain",img:"images/products/slide06.jpg"},
  {id:7,name:"",industry:"Automotive",slide:true,fit:"contain",img:"images/products/slide07.jpg"},
  {id:8,name:"",industry:"Automotive",slide:true,fit:"contain",img:"images/products/slide08.jpg"},
  {id:9,name:"",industry:"Automotive",slide:true,fit:"contain",img:"images/products/slide09.jpg"},
  {id:10,name:"",industry:"Automotive",slide:true,fit:"contain",img:"images/products/slide10.jpg"},
  {id:11,name:"",industry:"Automotive",slide:true,fit:"contain",img:"images/products/slide11.jpg"},
  {id:12,name:"",industry:"Automotive",slide:true,fit:"contain",img:"images/products/slide12.jpg"},
  {id:13,name:"",industry:"Automotive",slide:true,fit:"contain",img:"images/products/slide13.jpg"},
  {id:14,name:"",industry:"Automotive",slide:true,fit:"contain",img:"images/products/slide14.jpg"},
  {id:15,name:"",industry:"Automotive",slide:true,fit:"contain",img:"images/products/slide15.jpg"},
  {id:16,name:"",industry:"Automotive",slide:true,fit:"contain",img:"images/products/slide16.jpg"}
];
function rtkLoad(){
  try{const v=localStorage.getItem(RTK_STORE_KEY); if(v) return JSON.parse(v);}catch(e){}
  rtkSave(RTK_SEED); return RTK_SEED.slice();
}
function rtkSave(list){ try{localStorage.setItem(RTK_STORE_KEY,JSON.stringify(list));}catch(e){} }
const PART_SVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>';

/* Generic galleries (machinery & QC equipment) */
function rtkLoadKey(key,seed){ try{const v=localStorage.getItem(key); if(v) return JSON.parse(v);}catch(e){} if(seed){rtkSaveKey(key,seed); return seed.slice();} return []; }
function rtkSaveKey(key,list){ localStorage.setItem(key,JSON.stringify(list)); }
const MACH_KEY='rtk_machines_v1', QC_KEY='rtk_qc_v2';
const MACH_SEED=[
  {id:1,name:"CNC Lathe",spec:"Ø6–Ø80 mm · ±0.01 mm",kind:"cnc",img:""},
  {id:2,name:"Conventional Lathe",spec:"Ø6–Ø150 mm · ±0.02 mm",kind:"lathe",img:""},
  {id:3,name:"Drilling / Tapping",spec:"M3–M24",kind:"drill",img:""},
  {id:4,name:"Thread Rolling",spec:"M4–M20 · 6g",kind:"thread",img:""},
  {id:5,name:"Bending / Plate",spec:"up to 6 mm",kind:"bend",img:""}
];
const QC_SEED=[
  {id:1,name:"Measurement & Inspection Tools",fit:"contain",img:"images/qc/qc1.jpg"},
  {id:2,name:"Keyence VR-6000 — 3D Measuring Macroscope",fit:"contain",img:"images/qc/qc2.jpg"}
];

/* Technical line illustrations per machine / QC type (default, replaceable via Admin) */
const ICONS={
 cnc:`<svg viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><rect x="20" y="22" width="62" height="50" rx="3"/><rect x="28" y="30" width="32" height="26" rx="2"/><rect x="82" y="30" width="18" height="42" rx="2"/><path d="M86 38h10M86 46h10M86 54h10"/><path d="M30 72v8M70 72v8"/></svg>`,
 lathe:`<svg viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><rect x="14" y="60" width="92" height="12" rx="2"/><rect x="16" y="34" width="22" height="26" rx="2"/><circle cx="27" cy="47" r="6"/><rect x="40" y="43" width="44" height="10" rx="2"/><rect x="86" y="40" width="18" height="20" rx="2"/><path d="M20 72v6M100 72v6"/></svg>`,
 drill:`<svg viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><rect x="22" y="70" width="76" height="8" rx="2"/><path d="M78 70V20h13v50"/><rect x="40" y="20" width="38" height="14" rx="2"/><path d="M52 34v12"/><path d="M47 46h11l-5.5 9z" fill="currentColor"/><rect x="36" y="58" width="32" height="6" rx="1"/></svg>`,
 thread:`<svg viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><path d="M28 33l11-6 11 6v14l-11 6-11-6z"/><path d="M50 34h46M50 46h46"/><path d="M60 36v8M70 36v8M80 36v8M90 36v8"/></svg>`,
 bend:`<svg viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><path d="M24 62h34l30-26"/><path d="M82 30l11 2-2 11"/><path d="M24 62v10h70"/><rect x="50" y="14" width="12" height="13" rx="2"/></svg>`,
 cmm:`<svg viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><rect x="24" y="64" width="72" height="10" rx="2"/><path d="M34 64V26h52v38"/><path d="M60 26v20"/><circle cx="60" cy="50" r="4"/></svg>`,
 projector:`<svg viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><circle cx="60" cy="38" r="22"/><path d="M60 28v20M50 38h20"/><rect x="40" y="66" width="40" height="9" rx="2"/><path d="M60 60v6"/></svg>`,
 hardness:`<svg viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><rect x="30" y="60" width="60" height="14" rx="2"/><path d="M60 30v22"/><path d="M54 52h12l-6 8z" fill="currentColor"/><rect x="44" y="18" width="32" height="11" rx="2"/></svg>`,
 micrometer:`<svg viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><path d="M46 28a26 26 0 100 34"/><path d="M46 38h16M46 52h16"/><rect x="62" y="36" width="14" height="18" rx="2"/><rect x="76" y="40" width="20" height="10" rx="2"/></svg>`,
 gauge:`<svg viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><rect x="34" y="39" width="42" height="16" rx="3"/><circle cx="86" cy="47" r="10"/><path d="M34 47H22"/></svg>`
};


/* ---- helpers for Admin: image compression, LINE share, export/import ---- */
function rtkImgs(p){ return (p.imgs&&p.imgs.length)?p.imgs : (p.img?[p.img]:[]); }
function rtkCompress(dataUrl, cb){
  var img=new Image();
  img.onload=function(){
    var max=1000, w=img.width, h=img.height;
    if(w>max||h>max){ if(w>=h){ h=Math.round(h*max/w); w=max; } else { w=Math.round(w*max/h); h=max; } }
    var cv=document.createElement('canvas'); cv.width=w; cv.height=h;
    cv.getContext('2d').drawImage(img,0,0,w,h);
    try{ cb(cv.toDataURL('image/jpeg',0.82)); }catch(e){ cb(dataUrl); }
  };
  img.onerror=function(){ cb(dataUrl); };
  img.src=dataUrl;
}
function rtkFileToImg(file, cb){ var r=new FileReader(); r.onload=function(){ rtkCompress(r.result, cb); }; r.readAsDataURL(file); }
function rtkLineText(p){
  var L=[]; if(p.name)L.push('สินค้า: '+p.name); if(p.maker)L.push('ผู้ผลิต/MAKER: '+p.maker);
  if(p.material)L.push('วัสดุ: '+p.material); if(p.process)L.push('กระบวนการ: '+p.process);
  if(p.industry)L.push('อุตสาหกรรม: '+p.industry);
  if(p.sr){ L.push('Sorting & Rework: ใช่'); if(p.tempAction)L.push('Temp action: '+p.tempAction); }
  return L.join('\n');
}
function rtkLineShare(p){ window.open('https://line.me/R/msg/text/?'+encodeURIComponent(rtkLineText(p)),'_blank'); }
