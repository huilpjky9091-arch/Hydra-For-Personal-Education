export interface NematocystPart {
  id: 'cnidocyte' | 'capsule' | 'tubule' | 'operculum' | 'cnidocil';
  nameEn: string;
  nameTh: string;
  description: string;
  role: string;
  color: string;
}

export interface NematocystStep {
  stepNumber: number;
  code: string;
  titleEn: string;
  titleTh: string;
  durationLabel: string;
  description: string;
  biophysicsDetail: string;
  progressRange: [number, number];
}

export interface NematocystTypeInfo {
  id: 'stenotele' | 'desmoneme' | 'holotrichous' | 'atrichous';
  nameEn: string;
  categoryEn: string;
  nameTh: string;
  injectsToxin: boolean;
  mechanismLabel: string;
  description: string;
  structuralFeature: string;
  accentColor: string;
}

export const NEMATOCYST_PARTS: NematocystPart[] = [
  {
    id: 'cnidocyte',
    nameEn: 'Cnidocyte',
    nameTh: 'เซลล์เข็มพิษ (ตัวเซลล์)',
    description:
      'เซลล์เฉพาะทางที่เป็นแหล่งอาศัยของออร์แกเนลล์ Nematocyst มีนิวเคลียส ไมโทคอนเดรีย และเยื่อหุ้มเซลล์ที่รับส่งสัญญาณทางสรีรวิทยา',
    role: 'สังเคราะห์ ดูแลรักษาแรงดัน และเป็นหน่วยรับสัญญาณกระตุ้นเพื่อสั่งการปลดปล่อยแคปซูล',
    color: '#0284C7',
  },
  {
    id: 'capsule',
    nameEn: 'Nematocyst Capsule',
    nameTh: 'แคปซูลเข็มพิษ',
    description:
      'ออร์แกเนลล์ผนังสองชั้นที่ประกอบขึ้นจากโปรตีน Minicollagen มีความทนทานสูงมาก สามารถกักเก็บแรงดันออสโมติกสูงกว่า 150 บรรยากาศ (15 MPa)',
    role: 'สะสมพลังงานศักย์ในรูปแรงดันออสโมติกจากสารละลายโพลีแกมมา-กลูตาเมตและแคลเซียมไอออน',
    color: '#DC2626',
  },
  {
    id: 'tubule',
    nameEn: 'Coiled Tubule',
    nameTh: 'เส้นท่อเข็มพิษที่ขดอยู่ภายใน',
    description:
      'ท่อยาวกลวงที่ขดซ้อนเป็นเกลียวแน่นอยู่ภายในแคปซูลในสภาพพับซ้อนกลับด้าน (Inverted) มักมีเงี่ยง (Barbs/Stylets) เรียงอยู่ที่โคนท่อในบางชนิด',
    role: 'พลิกกลับด้าน (Evert) พุ่งออกไปสัมผัส แทงทะลุ พันเกี่ยว หรือยึดเกาะเป้าหมายตามชนิดของเข็มพิษ',
    color: '#EA580C',
  },
  {
    id: 'operculum',
    nameEn: 'Operculum',
    nameTh: 'ฝาปิดแคปซูล',
    description:
      'แผ่นฝาปิดขนาดจิ๋วที่มีบานพับอยู่บริเวณยอดสุดของแคปซูลเข็มพิษ ทำหน้าที่ปิดกั้นแรงดันภายในไว้จนกว่าจะถึงจังหวะกระตุ้น',
    role: 'เปิดพลิกออกอย่างฉับพลันเมื่อแรงดันภายในทะลุขีดจำกัด เปิดทางให้เส้นท่อพุ่งทะยานออกด้านนอก',
    color: '#F59E0B',
  },
  {
    id: 'cnidocil',
    nameEn: 'Cnidocil',
    nameTh: 'โครงสร้างรับสัมผัส (ตัวจุดชนวน)',
    description:
      'โครงสร้างคล้ายขนแข็ง (Mechanosensory Complex) ยื่นพ้นผิวเซลล์ Cnidocyte ทำงานร่วมกับตัวรับสารเคมีบนเซลล์รองรับรอบข้าง',
    role: 'ตรวจจับแรงกระแทกหรือการสั่นสะเทือนจากเหยื่อที่ว่ายผ่าน ช่วยป้องกันการยิงเข็มพิษโดยไม่จำเป็น',
    color: '#0D9488',
  },
];

export const NEMATOCYST_STEPS: NematocystStep[] = [
  {
    stepNumber: 1,
    code: 'STEP 01',
    titleEn: 'Detection',
    titleTh: 'การตรวจจับเหยื่อ',
    durationLabel: 't = 0 ms',
    description:
      'หนวดสัมผัสกับเหยื่อ เช่น ไรน้ำ (Daphnia) เซลล์รับความรู้สึกและ Cnidocil ตรวจจับทั้งสิ่งเร้าทางกล (การสัมผัส) และสิ่งเร้าทางเคมี (สารเมือก/ไกลโคโปรตีนจากเหยื่อ)',
    biophysicsDetail:
      'ต้องอาศัยการกระตุ้นร่วมกันทั้งสองทาง (Chemo-mechanosensory coincidence) จึงจะเกิดการยิง เพื่อไม่ให้ไฮดรายิงเข็มพิษทิ้งเมื่อชนกับก้อนกรวดหรือกระแสน้ำ',
    progressRange: [0, 0.16],
  },
  {
    stepNumber: 2,
    code: 'STEP 02',
    titleEn: 'Activation',
    titleTh: 'การกระตุ้นและเพิ่มแรงดัน',
    durationLabel: 't < 1 ms',
    description:
      'เกิดสัญญาณกระตุ้นเซลล์เข็มพิษ ทำให้เกิดการปลดปล่อยแคลเซียมไอออน (Ca²⁺) ออกจากเมทริกซ์ภายในแคปซูลอย่างฉับพลัน',
    biophysicsDetail:
      'ความเข้มข้นของไอออนอิสระที่พุ่งสูงขึ้นดึงน้ำจากไซโทพลาซึมเข้าสู่แคปซูลด้วย Osmosis ทำให้แรงดันภายในพุ่งขึ้นสูงถึง ~150 บรรยากาศ',
    progressRange: [0.16, 0.34],
  },
  {
    stepNumber: 3,
    code: 'STEP 03',
    titleEn: 'Discharge',
    titleTh: 'การเปิดฝาและปลดปล่อยเส้นท่อ',
    durationLabel: '~700 ns (ช่วงพุ่งออก)',
    description:
      'ฝาปิด Operculum ดีดเปิดออก แคปซูลเข็มพิษปลดปล่อยเส้นท่อที่ขดอยู่ภายในออกมาอย่างรวดเร็วด้วยการพลิกกลับด้าน (Eversion)',
    biophysicsDetail:
      'พลังงานยืดหยุ่นของผนังแคปซูลและแรงดันออสโมติกสร้างความเร่งระดับล้าน g ทำให้ปลายเงี่ยงแทงออกไปด้วยความเร็วสูง',
    progressRange: [0.34, 0.54],
  },
  {
    stepNumber: 4,
    code: 'STEP 04',
    titleEn: 'Penetration / Entanglement',
    titleTh: 'การแทงทะลุ หรือการพันเกี่ยวเหยื่อ',
    durationLabel: 't ≈ 1–5 ms',
    description:
      'เส้นท่อเข็มพิษเข้าปะทะตัวเหยื่อ: หากเป็นชนิด Stenotele เงี่ยงขนาดใหญ่จะเจาะทะลุเปลือกไคตินของเหยื่อ แต่หากเป็น Desmoneme เส้นท่อจะขดม้วนเป็นบ่วงพันรัดขนหรือขาเหยื่อ',
    biophysicsDetail:
      'กลไกทางกายภาพแตกต่างกันไปตามชนิดของ Nematocyst ไม่ได้ทำงานด้วยรูปแบบเดียวกันทั้งหมด',
    progressRange: [0.54, 0.72],
  },
  {
    stepNumber: 5,
    code: 'STEP 05',
    titleEn: 'Toxin Delivery',
    titleTh: 'การส่งสารพิษ (เฉพาะบางชนิด)',
    durationLabel: 't ≈ 5–50 ms',
    description:
      'ในเข็มพิษชนิดเจาะทะลุ (เช่น Stenoteles) ของเหลวแรงดันสูงจะฉีดสารพิษ (Neurotoxins และ Pore-forming toxins) ผ่านรูตรงปลายท่อเข้าสู่ร่างกายเหยื่อ',
    biophysicsDetail:
      'หมายเหตุทางวิทยาศาสตร์: ไม่ใช่ Nematocyst ทุกชนิดที่ฉีดสารพิษ ชนิด Desmonemes และ Atrichous Isorhizas ทำงานโดยไม่ฉีดสารพิษ',
    progressRange: [0.72, 0.88],
  },
  {
    stepNumber: 6,
    code: 'STEP 06',
    titleEn: 'Immobilization',
    titleTh: 'เหยื่อหมดความสามารถในการเคลื่อนไหว',
    durationLabel: 't > 100 ms',
    description:
      'สารพิษยับยั้งระบบประสาทของเหยื่อร่วมกับบ่วงพันรัด ทำให้เหยื่อเคลื่อนไหวลดลงหรือหยุดนิ่งสนิท ก่อนที่หนวดของไฮดราจะโค้งงอดึงเหยื่อเข้าสู่ปาก',
    biophysicsDetail:
      'Cnidocyte ที่ยิงออกไปแล้วเป็นเซลล์ใช้แล้วทิ้ง (Single-use) ซึ่งจะถูกย่อยสลายและทดแทนใหม่จาก Interstitial Cells',
    progressRange: [0.88, 1.0],
  },
];

export const NEMATOCYST_TYPES: NematocystTypeInfo[] = [
  {
    id: 'stenotele',
    nameEn: 'Stenotele',
    categoryEn: 'Penetrant (ชนิดเจาะทะลุและฉีดพิษ)',
    nameTh: 'สตีโนทีล — เข็มเจาะทะลุ',
    injectsToxin: true,
    mechanismLabel: 'แทงทะลุผิว + ฉีดสารพิษ',
    description:
      'เป็น Nematocyst ขนาดใหญ่ที่สุดและทรงพลังที่สุดของไฮดรา โคนท่อมีเงี่ยงแหลม 3 อันใหญ่ (Stylets) ที่รวมตัวกันเหมือนหัวสว่านเจาะทะลุเกราะเปลือกของไรน้ำหรือตัวอ่อนสัตว์น้ำ ก่อนเปิดช่องฉีดสารพิษอัมพาตเข้าสู่ตัวเหยื่อ',
    structuralFeature: 'แคปซูลรูปไข่กว้าง มีเงี่ยงฐาน 3 แฉก และท่อกลวงเปิดปลายเพื่อส่งพิษ',
    accentColor: '#DC2626',
  },
  {
    id: 'desmoneme',
    nameEn: 'Desmoneme',
    categoryEn: 'Volvent (ชนิดพันรัดเหยื่อ — ไม่ฉีดสารพิษ)',
    nameTh: 'เดสโมนีม — บ่วงเชือกพันเกี่ยว',
    injectsToxin: false,
    mechanismLabel: 'ขดม้วนพันรัดเชิงกล (ไม่มีสารพิษ)',
    description:
      'แคปซูลขนาดเล็กที่มีเส้นท่อสั้นหนาและปลายท่อปิดสนิท เมื่อยิงออก เส้นท่อจะม้วนตัวกลับเป็นเกลียวสปริงอย่างรวดเร็วเพื่อพันรัดขนแข็ง (Bristles/Setae) หรือขาของเหยื่อไว้ไม่ให้หลุดหนี ไม่มีการเจาะและไม่ฉีดสารพิษ',
    structuralFeature: 'ท่อปลายปิด ไร้เงี่ยง ม้วนตัวเป็นวงเกลียวพันรัดแน่นเหมือนบ่วงบาศก์',
    accentColor: '#EA580C',
  },
  {
    id: 'holotrichous',
    nameEn: 'Holotrichous Isorhiza',
    categoryEn: 'Large Glutinant (ชนิดท่อยาวมีหนามและสารเหนียว)',
    nameTh: 'โฮโลทริคัส ไอโซไรซา — ยึดเกาะและป้องกันตัว',
    injectsToxin: false,
    mechanismLabel: 'ปลดปล่อยท่อยาวมีหนามเล็ก + เมือกเหนียว',
    description:
      'เส้นท่อยาวมีหนามละเอียดเรียงตลอดความยาวและมีสารเหนียว ช่วยทั้งในการจับยึดเหยื่อและป้องกันตัวจากผู้ล่าขนาดเล็ก มักใช้ร่วมในการตอบสนองเชิงป้องกัน',
    structuralFeature: 'แคปซูลทรงรี เส้นท่อขนาดสม่ำเสมอมีหนามละเอียดตลอดเส้น',
    accentColor: '#0284C7',
  },
  {
    id: 'atrichous',
    nameEn: 'Atrichous Isorhiza',
    categoryEn: 'Small Glutinant (ชนิดหลั่งสารเหนียว — ไม่ฉีดสารพิษ)',
    nameTh: 'อะทริคัส ไอโซไรซา — เข็มยึดเกาะเพื่อการเคลื่อนที่',
    injectsToxin: false,
    mechanismLabel: 'ปล่อยสารยึดเกาะพื้นผิว (ช่วยในการตีลังกา)',
    description:
      'เข็มขนาดเล็กที่สุด เส้นท่อเรียบไม่มีหนามและไม่ฉีดสารพิษ แต่ปล่อยสารยึดเกาะ (Adhesive Substance) ช่วยให้ปลายหนวดสามารถยึดติดกับพื้นผิวใต้น้ำชั่วคราวขณะที่ไฮดราเคลื่อนที่แบบตีลังกา (Somersaulting)',
    structuralFeature: 'แคปซูลขนาดเล็ก ท่อเรียบไร้หนาม เน้นการยึดเกาะพื้นผิว',
    accentColor: '#0D9488',
  },
];
