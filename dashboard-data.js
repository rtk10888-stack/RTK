/* RTK Management Dashboard data — modern manufacturing KPIs (IATF/automotive oriented).
   แก้ตัวเลขที่นี่แล้ว deploy เพื่อให้ขึ้นทุกเครื่อง หรือแก้ชั่วคราวผ่านหน้า Admin > Dashboard.
   ตัวเลขย้อนหลังเป็นค่าตัวอย่าง ปรับให้ตรงจริงได้ */
const DASH_DEFAULT = {
  quarters: ["2025-Q2","2025-Q3","2025-Q4","2026-Q1","2026-Q2"],
  /* targets + ทิศทางที่ดี (up = สูงดี, down = ต่ำดี) สำหรับไฟแสดงสถานะ */
  targets: {
    oee:{t:85,dir:"up"}, otd:{t:98,dir:"up"}, otif:{t:97,dir:"up"},
    ppm:{t:50,dir:"down"}, fpy:{t:99,dir:"up"}, scrap:{t:1.5,dir:"down"},
    capacity:{t:85,dir:"up"}, rfqConv:{t:35,dir:"up"}, complaints:{t:0,dir:"down"},
    output:{t:2.2,dir:"up"}, safetyDays:{t:365,dir:"up"}
  },
  data: {
    "2025-Q2": { businessType:{Automotive:78,Agricultural:11,Electronic:6,Etc:5},
      kpis:{ oee:78, availability:88, performance:90, quality:98.5, otd:96, otif:94, ppm:120, fpy:97.5, scrap:2.4, capacity:80, output:1.8, rfq:31, rfqConv:28, complaints:4, leadDays:2, safetyDays:120 } },
    "2025-Q3": { businessType:{Automotive:79,Agricultural:10,Electronic:6,Etc:5},
      kpis:{ oee:80, availability:89, performance:91, quality:98.8, otd:97, otif:95, ppm:95, fpy:98, scrap:2.0, capacity:82, output:1.9, rfq:35, rfqConv:30, complaints:3, leadDays:2, safetyDays:210 } },
    "2025-Q4": { businessType:{Automotive:80,Agricultural:10,Electronic:5,Etc:5},
      kpis:{ oee:82, availability:90, performance:91.5, quality:99, otd:97, otif:96, ppm:75, fpy:98.3, scrap:1.8, capacity:84, output:2.0, rfq:38, rfqConv:31, complaints:3, leadDays:2, safetyDays:300 } },
    "2026-Q1": { businessType:{Automotive:80,Agricultural:10,Electronic:5,Etc:5},
      kpis:{ oee:84, availability:91, performance:92, quality:99.1, otd:98, otif:96, ppm:60, fpy:98.6, scrap:1.6, capacity:86, output:2.1, rfq:40, rfqConv:33, complaints:2, leadDays:2, safetyDays:390 } },
    "2026-Q2": { businessType:{Automotive:80,Agricultural:10,Electronic:5,Etc:5},
      kpis:{ oee:85, availability:92, performance:92.5, quality:99.3, otd:98, otif:97, ppm:48, fpy:98.9, scrap:1.4, capacity:87, output:2.2, rfq:42, rfqConv:35, complaints:1, leadDays:2, safetyDays:480 } }
  }
};
const DASH_KEY='rtk_dash_v2';
function dashLoad(){
  try{ const v=localStorage.getItem(DASH_KEY); if(v){ const o=JSON.parse(v);
    return {quarters:o.quarters||DASH_DEFAULT.quarters, targets:DASH_DEFAULT.targets, data:Object.assign({},DASH_DEFAULT.data,o.data||{})}; } }catch(e){}
  return JSON.parse(JSON.stringify(DASH_DEFAULT));
}
function dashSave(obj){ localStorage.setItem(DASH_KEY, JSON.stringify(obj)); }
