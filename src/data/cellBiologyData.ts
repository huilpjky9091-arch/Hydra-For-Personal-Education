export type CellTypeId =
  | 'epithelio-muscular'
  | 'cnidocytes'
  | 'sensory'
  | 'nerve'
  | 'gland'
  | 'nutritive-muscular'
  | 'interstitial'
  | 'germ';

export interface HydraCellType {
  id: CellTypeId;
  order: number;
  nameEn: string;
  nameTh: string;
  layer: 'Epidermis' | 'Gastrodermis' | 'Epidermis & Gastrodermis' | 'Epidermis (Interstitial Spaces)';
  layerTh: string;
  sizeMicrons: string;
  accentColor: string;
  secondaryColor: string;
  summary: string;
  morphology: string;
  location: string;
  primaryFunction: string;
  workingProcess: string;
  systemRelationships: string[];
  layerComparison?: {
    epidermalTitle: string;
    epidermalDetail: string;
    gastrodermalTitle: string;
    gastrodermalDetail: string;
  };
  keyMarkers: string[];
}

export const HYDRA_CELL_TYPES: HydraCellType[] = [
  {
    id: 'epithelio-muscular',
    order: 1,
    nameEn: 'Epithelio-muscular Cells',
    nameTh: 'เซลล์เยื่อบุที่มีคุณสมบัติหดตัวได้',
    layer: 'Epidermis & Gastrodermis',
    layerTh: 'พบทั้งในชั้น Epidermis และโครงสร้างคู่ขนานใน Gastrodermis',
    sizeMicrons: '18–35 µm',
    accentColor: '#0284C7',
    secondaryColor: '#7C3AED',
    summary:
      'เซลล์โครงสร้างหลักของลำตัว ทำหน้าที่เป็นทั้งผิวเยื่อบุปกคลุมร่างกายและเส้นใยกล้ามเนื้อในเซลล์เดียวกัน (Bifunctional Cell)',
    morphology:
      'ส่วนยอดเป็นรูปทรงกระบอกหรือทรงลูกบาศก์เรียงชิดกันเป็นเยื่อบุผิว ส่วนฐานยื่นแขนงออกตามแนวยาวขนานกับชั้น Mesoglea ภายในแขนงฐานบรรจุเส้นใยหดตัว (Myonemes / Actin-Myosin Filaments) มีรอยต่อเชื่อมเซลล์ (Septate & Gap Junctions) แข็งแรง',
    location:
      'เรียงตัวชิดกันเป็นโครงสร้างหลักของชั้น Epidermis ตลอดทั้งลำตัวและหนวด (ส่วนใน Gastrodermis ทำหน้าที่คล้ายคลึงกันโดยเซลล์ Nutritive-muscular)',
    primaryFunction:
      'ปกคลุมป้องกันร่างกาย สร้างเกราะกั้นระหว่างน้ำจืดกับเนื้อเยื่อภายใน และหดตัวเพื่อทำให้ลำตัวสั้นลงหรือโค้งงอ',
    workingProcess:
      'เมื่อได้รับสัญญาณจากโครงข่ายประสาท (Nerve Net) แคลเซียมไอออนกระตุ้นเส้นใย Myonemes ที่ฐานเซลล์ให้หดตัวต้านกับแรงดันน้ำใน Gastrovascular Cavity ทำให้เกิดการเคลื่อนไหวหรือหดตัวเป็นก้อนกลมเมื่อถูกคุกคาม',
    systemRelationships: [
      'ระบบโครงกระดูกน้ำ (Hydrostatic Skeleton): ทำงานต้านกับแรงดันน้ำภายใน Gastrovascular Cavity',
      'ระบบประสาท (Nerve Net): รับสัญญาณไฟฟ้าผ่าน Gap Junctions เพื่อประสานการหดตัวพร้อมกัน',
      'ชั้น Mesoglea: ยึดเกาะกับเมทริกซ์คอลลาเจนด้วย Hemidesmosome-like junctions',
    ],
    layerComparison: {
      epidermalTitle: 'Epithelio-muscular Cells ใน Epidermis',
      epidermalDetail:
        'แขนงเส้นใยกล้ามเนื้อ (Myonemes) วางตัวตาม "แนวยาว" (Longitudinal) ขนานกับแกนลำตัว เมื่อหดตัวจะทำให้ลำตัวไฮดรา "สั้นลงและกว้างขึ้น" นอกจากนี้ยังไม่มีแฟลกเจลลาและไม่ทำหน้าที่ย่อยอาหาร',
      gastrodermalTitle: 'เซลล์เยื่อบุหดตัวใน Gastrodermis (Nutritive-muscular)',
      gastrodermalDetail:
        'แขนงเส้นใยกล้ามเนื้อวางตัวตาม "แนววงรอบ" (Circular Orientation) ตั้งฉากกับแนวยาวของลำตัว เมื่อหดตัวจะบีบให้ลำตัว "เรียวยาวขึ้น" และส่วนยอดที่หันเข้าช่องปากยังทำหน้าที่จับกินและย่อยอาหารภายในเซลล์ด้วย',
    },
    keyMarkers: ['Myonemes (Longitudinal)', 'Cuticle Apical Surface', 'Intercellular Junctions'],
  },
  {
    id: 'cnidocytes',
    order: 2,
    nameEn: 'Cnidocytes',
    nameTh: 'เซลล์เข็มพิษ',
    layer: 'Epidermis',
    layerTh: 'ชั้น Epidermis โดยเฉพาะบริเวณหนวด (Tentacles)',
    sizeMicrons: '10–22 µm',
    accentColor: '#EA580C',
    secondaryColor: '#DC2626',
    summary:
      'เซลล์อาวุธเฉพาะตัวของสัตว์กลุ่ม Cnidaria ภายในบรรจุออร์แกเนลล์แคปซูลแรงดันสูงที่เรียกว่า Nematocyst',
    morphology:
      'ตัวเซลล์มีรูปร่างกลมรีหรือทรงหยดน้ำ ฝังตัวอยู่ในช่องระหว่าง Epithelio-muscular cells (Battery Cells) ด้านบนมีโครงสร้างรับสัมผัสคล้ายขนแข็ง (Cnidocil) และฝาปิด (Operculum) ที่ยอดแคปซูล',
    location:
      'กระจายหนาแน่นที่สุดบริเวณ Epidermis ของหนวด (Tentacles) โดยเรียงตัวเป็นกระจุก (Cnidocyte Batteries) และพบบ้างบน Hypostome กับ Body Column แต่ไม่พบบน Basal Disc',
    primaryFunction:
      'ตรวจจับเหยื่อหรือผู้ล่า ปลดปล่อย Nematocyst เพื่อแทงทะลุ พันรัด หรือยึดเกาะเหยื่อ รวมถึงป้องกันอันตรายจากศัตรู',
    workingProcess:
      'รับสิ่งเร้าทั้งทางกล (การสัมผัส Cnidocil) และทางเคมีร่วมกัน กระตุ้นให้แรงดันออสโมติกภายในแคปซูลพุ่งสูงขึ้นอย่างฉับพลัน ฝา Operculum เปิดออกและเส้นท่อขดเกลียวพลิกกลับด้านพุ่งออกด้วยความเร็วสูง',
    systemRelationships: [
      'Interstitial Cells (I-cells): พัฒนามาจาก I-cells ในลำตัวแล้วอพยพขึ้นไปฝังตัวที่หนวด',
      'ระบบจับเหยื่อ (Feeding): หยุดการเคลื่อนไหวของเหยื่อก่อนหนวดลากเข้าปาก',
      'Sensory & Nerve Cells: ปรับระดับความไวในการยิงเข็มพิษตามสภาวะความหิวของไฮดรา',
    ],
    keyMarkers: ['Cnidocil Trigger', 'Nematocyst Organelle', 'Operculum Lid', 'Coiled Tubule'],
  },
  {
    id: 'sensory',
    order: 3,
    nameEn: 'Sensory Cells',
    nameTh: 'เซลล์รับความรู้สึก',
    layer: 'Epidermis & Gastrodermis',
    layerTh: 'กระจายใน Epidermis (หนวด/Hypostome) และ Gastrodermis',
    sizeMicrons: '12–20 µm',
    accentColor: '#0D9488',
    secondaryColor: '#38BDF8',
    summary:
      'เซลล์รับสัญญาณสิ่งแวดล้อม ทำหน้าที่แปลงแรงสัมผัส สารเคมี และแสงให้กลายเป็นสัญญาณไฟฟ้าส่งต่อสู่ Nerve Net',
    morphology:
      'มีรูปร่างเรียวยาวแทรกตัวอยู่ระหว่างเซลล์เยื่อบุ ด้านบนมีซิเลียรับความรู้สึก (Sensory Cilium) ยื่นออกสู่ภายนอกหรือช่องว่างภายใน ส่วนฐานแตกแขนงเป็นแอกซอนสั้น ๆ เชื่อมต่อแบบไซแนปส์กับเซลล์ประสาท',
    location:
      'หนาแน่นเป็นพิเศษรอบ Hypostome บนหนวด และใน Gastrodermis เพื่อตรวจสอบทั้งสิ่งเร้าภายนอกและการมีอยู่ของเหยื่อภายในลำตัว',
    primaryFunction:
      'ตรวจจับแรงสั่นสะเทือนในน้ำ การสัมผัสทางกายภาพ และสารเคมีจากเหยื่อ (เช่น Glutathione จากไรน้ำที่บาดเจ็บ) เพื่อส่งสัญญาณเริ่มต้นการกินอาหาร',
    workingProcess:
      'เมื่อโมเลกุลเคมีจับตัวรับหรือซิเลียถูกรบกวน ช่องไอออนที่เยื่อหุ้มเซลล์เปิดออก เกิดการเปลี่ยนแปลงศักย์ไฟฟ้าและหลั่งสารสื่อประสาท (Neuropeptides) ไปยัง Nerve Cells ข้างเคียง',
    systemRelationships: [
      'Nerve Net: ส่งสัญญาณกระตุ้นให้เกิดพฤติกรรมอ้าปากและงอหนวด (Feeding Response)',
      'Cnidocytes: ทำงานประสานกับ Battery Cells เพื่อลดเกณฑ์การยิงเข็มพิษเมื่อได้กลิ่นเหยื่อ',
    ],
    keyMarkers: ['Apical Sensory Cilium', 'Chemoreceptor Domain', 'Basal Neurite Synapse'],
  },
  {
    id: 'nerve',
    order: 4,
    nameEn: 'Nerve Cells',
    nameTh: 'เซลล์ประสาท (โครงข่าย Nerve Net)',
    layer: 'Epidermis & Gastrodermis',
    layerTh: 'ฐานของ Epidermis และ Gastrodermis ชิดกับ Mesoglea',
    sizeMicrons: '15–40 µm (รวมแขนง)',
    accentColor: '#7C3AED',
    secondaryColor: '#EC4899',
    summary:
      'เซลล์ประสาทที่เชื่อมโยงถึงกันเป็นร่างแหทั่วร่างกาย (Diffuse Nerve Net) โดยไม่มีสมองหรือปมประสาทส่วนกลาง',
    morphology:
      'เซลล์มีลักษณะเป็น Bipolar (2 ขั้ว) หรือ Multipolar (หลายขั้ว) มีตัวเซลล์ขนาดเล็กและยื่นแขนงประสาท (Neurites) แผ่กระจายสานกันเป็นตาข่ายบริเวณฐานเนื้อเยื่อทั้งสองชั้น มีไซแนปส์แบบส่งสัญญาณได้สองทิศทางและใช้ Neuropeptides เป็นหลัก',
    location:
      'เรียงตัวอยู่ชิดแนว Mesoglea ทั้งฝั่ง Epidermis และ Gastrodermis โดยมีความหนาแน่นสูงเป็นวงแหวนบริเวณ Hypostome และ Basal Disc',
    primaryFunction:
      'ส่งผ่านกระแสประสาทและประสานการทำงานของเซลล์กล้ามเนื้อเยื่อบุทั้งร่างกาย ให้สามารถหดตัว หนีภัย ม้วนหนวด และเปิดปากได้อย่างสอดคล้องกัน',
    workingProcess:
      'รับข้อมูลจาก Sensory Cells และวงจรกำเนิดจังหวะในตัว (Pacemaker Networks) แล้วส่งสัญญาณกระจายไปตามตาข่ายประสาท กระตุ้นการหดตัวแบบประสานงานแม้ไม่มีสมอง',
    systemRelationships: [
      'Epithelio-muscular & Nutritive-muscular: ควบคุมจังหวะการหดและคลายตัวของร่างกาย',
      'Interstitial Cells (I-cells): ทดแทนเซลล์ประสาทที่ไหลหลุดตามการผลัดเปลี่ยนเนื้อเยื่อ',
      'Feeding & Movement: คุมพฤติกรรมตีลังกาและการอ้าปากกลืนเหยื่อ',
    ],
    keyMarkers: ['Bipolar/Multipolar Soma', 'Neuropeptide Vesicles', 'Bidirectional Synapses'],
  },
  {
    id: 'gland',
    order: 5,
    nameEn: 'Gland Cells',
    nameTh: 'เซลล์ต่อม',
    layer: 'Gastrodermis',
    layerTh: 'พบมากใน Gastrodermis (ย่อยอาหาร) และบริเวณ Hypostome/Basal Disc (เมือก)',
    sizeMicrons: '14–26 µm',
    accentColor: '#DB2777',
    secondaryColor: '#F59E0B',
    summary:
      'เซลล์ผู้เชี่ยวชาญด้านการสังเคราะห์และหลั่งสารชีวเคมี โดยเฉพาะเอนไซม์ย่อยอาหารในช่องแกสโทรวาสคิวลาร์',
    morphology:
      'รูปร่างทรงขวดหรือทรงกรวยกลับหัว มีนิวเคลียสอยู่ด้านฐาน แน่นไปด้วยร่างแหเอนโดพลาซึมชนิดขรุขระ (Rough ER), Golgi Apparatus ขนาดใหญ่ และถุงบรรจุเอนไซม์ (Secretory / Zymogen Granules) อัดแน่นบริเวณยอดเซลล์',
    location:
      'Enzymatic Gland Cells แทรกตัวอยู่ทั่วไปในชั้น Gastrodermis ตลอดลำตัว ส่วน Mucous Gland Cells พบหนาแน่นบริเวณ Hypostome (ช่วยหล่อลื่นการกลืน) และ Basal Disc (สร้างเมือกยึดเกาะ)',
    primaryFunction:
      'สังเคราะห์และหลั่งเอนไซม์ย่อยอาหาร (เช่น โปรติเอส) เข้าสู่ช่อง Gastrovascular Cavity เพื่อเริ่มการย่อยภายนอกเซลล์',
    workingProcess:
      'เมื่อเหยื่อเข้าสู่ช่องย่อยอาหาร การยืดตัวของผนังลำตัวและสารเคมีกระตุ้นให้ถุงเอนไซม์เคลื่อนที่สู่เยื่อหุ้มด้านยอด แล้วหลั่งออกด้วยวิธี Exocytosis เพื่อย่อยสลายโครงสร้างโปรตีนและเนื้อเยื่อของเหยื่อ',
    systemRelationships: [
      'ระบบย่อยอาหารระดับที่ 1: ริเริ่ม Extracellular Digestion ภายใน Gastrovascular Cavity',
      'Nutritive-muscular Cells: ย่อยเหยื่อให้แตกเป็นชิ้นเล็กพอที่เซลล์ดูดซึมจะกลืนกินต่อได้',
      'Basal Disc Adhesion: ต่อมเมือกที่ฐานช่วยยึดเกาะพื้นผิวใต้น้ำ',
    ],
    keyMarkers: ['Zymogen Granules', 'Abundant Rough ER', 'Exocytotic Apex'],
  },
  {
    id: 'nutritive-muscular',
    order: 6,
    nameEn: 'Nutritive-muscular Cells',
    nameTh: 'เซลล์ดูดซึมอาหารและหดตัวในชั้นแกสโทรเดอร์มิส',
    layer: 'Gastrodermis',
    layerTh: 'ชั้นเนื้อเยื่อ Gastrodermis บุผิวช่อง Gastrovascular Cavity',
    sizeMicrons: '22–42 µm',
    accentColor: '#9333EA',
    secondaryColor: '#EC4899',
    summary:
      'เซลล์หลักของชั้นในที่ทำหน้าที่ย่อยอาหารภายในเซลล์ ดูดซึม ลำเลียงสารอาหาร และสร้างแรงบีบตามแนววงรอบของลำตัว',
    morphology:
      'ลำเซลล์ทรงสูงบุผนังช่องย่อยอาหาร ด้านยอดที่ยื่นเข้าช่องว่างมีแฟลกเจลลา 1–2 เส้น (Flagella) และไมโครวิลไล พร้อมความสามารถในการยื่นเท้าเทียม (Pseudopodia) ด้านฐานมีเส้นใยหดตัวเรียงตามแนววงรอบ (Circular Myonemes)',
    location:
      'เรียงตัวเป็นองค์ประกอบหลักมากกว่าร้อยละ 80 ของชั้น Gastrodermis ตลอดทั้งลำตัวและแกนในของหนวด',
    primaryFunction:
      'โบกพัดหมุนเวียนของเหลวและเอนไซม์ในช่อง Gastrovascular Cavity จับชิ้นส่วนอาหารเข้าสู่เซลล์ด้วยวิธี Phagocytosis ย่อยต่อด้วยไลโซโซม และส่งต่อสารอาหารไปยังเซลล์อื่น',
    workingProcess:
      'หลัง Gland Cells ย่อยเหยื่อหยาบ ๆ แล้ว เซลล์นี้ยื่นเท้าเทียมโอบล้อมอนุภาคอาหารเกิดเป็น Food Vacuole จากนั้น Lysosome เข้ารวมตัวปล่อยเอนไซม์ย่อยจนได้กรดอะมิโนและน้ำตาลโมเลกุลเดี่ยวก่อนกระจายผ่าน Mesoglea',
    systemRelationships: [
      'ระบบย่อยอาหารระดับที่ 2: ขับเคลื่อน Intracellular Digestion อย่างสมบูรณ์',
      'การเคลื่อนไหว: เส้นใยแนววงรอบหดตัวเพื่อให้ลำตัวยืดยาวขึ้น (Antagonistic กับ Epidermis)',
      'Epidermis: แพร่สารอาหารผ่านชั้น Mesoglea ไปเลี้ยงเซลล์ชั้นนอก',
    ],
    keyMarkers: ['Apical Flagella', 'Phagocytic Food Vacuoles', 'Lysosomes', 'Circular Myonemes'],
  },
  {
    id: 'interstitial',
    order: 7,
    nameEn: 'Interstitial Cells (I-cells)',
    nameTh: 'เซลล์ต้นกำเนิด (I-cells)',
    layer: 'Epidermis (Interstitial Spaces)',
    layerTh: 'ซอกช่องว่างระหว่าง Epithelio-muscular Cells ในชั้น Epidermis',
    sizeMicrons: '7–12 µm',
    accentColor: '#8B5CF6',
    secondaryColor: '#06B6D4',
    summary:
      'เซลล์ต้นกำเนิดชนิด Multipotent Stem Cells ที่แบ่งตัวรวดเร็วและพัฒนาไปเป็นเซลล์เฉพาะทางหลายชนิดตลอดชีวิต',
    morphology:
      'เซลล์ขนาดเล็ก ทรงกลมหรือทรงรี อยู่รวมกันเป็นคู่หรือกลุ่มเล็ก ๆ (Nests) มีนิวเคลียสขนาดใหญ่เมื่อเทียบกับไซโทพลาซึม (High Nuclear-to-Cytoplasmic Ratio) และติดสีเบสเข้มภายใต้กล้องจุลทรรศน์',
    location:
      'กระจายอยู่ในช่องว่างระหว่างฐานของเซลล์เยื่อบุในชั้น Epidermis บริเวณ Body Column โดยเฉพาะตอนกลางลำตัว (ไม่พบที่ปลายหนวดและ Basal Disc)',
    primaryFunction:
      'แบ่งตัวและเปลี่ยนสภาพ (Differentiate) ไปเป็น Cnidocytes, Nerve Cells, Gland Cells และ Germ Cells เพื่อทดแทนเซลล์ที่เสื่อมสภาพหรือสูญเสียไป',
    workingProcess:
      'เซลล์แบ่งตัวแบบไมโทซิสอย่างต่อเนื่องเพื่อรักษาประชากรเซลล์ต้นกำเนิด จากนั้นส่วนหนึ่งจะได้รับสัญญาณจำเพาะให้พัฒนาเป็นเซลล์ปลายทาง (เช่น Nematoblasts -> Cnidocytes) แล้วอพยพไปยังตำแหน่งเป้าหมาย',
    systemRelationships: [
      'ระบบประสาทและเข็มพิษ: เติมเต็ม Cnidocytes และ Nerve Cells ที่หลุดหายตลอดเวลา',
      'การงอกใหม่ (Regeneration): เติมเซลล์เฉพาะทางให้เนื้อเยื่อที่สร้างใหม่ แต่ไม่ใช่เซลล์เดียวที่สร้างทั้งตัว (Epidermal และ Gastrodermal Epithelial Cells ต่างก็แบ่งตัวทดแทนสายพันธุ์ตัวเองแยกกัน)',
    ],
    keyMarkers: ['Large Nucleus', 'Multipotent Stem State', 'Mitotic Nests'],
  },
  {
    id: 'germ',
    order: 8,
    nameEn: 'Germ Cells',
    nameTh: 'เซลล์สืบพันธุ์ (ไข่และอสุจิ)',
    layer: 'Epidermis',
    layerTh: 'รังไข่และอัณฑะชั่วคราวในชั้น Epidermis เมื่อเข้าสู่ระยะสืบพันธุ์แบบอาศัยเพศ',
    sizeMicrons: 'Oocyte ~250–400 µm / Sperm ~40 µm',
    accentColor: '#EC4899',
    secondaryColor: '#6366F1',
    summary:
      'เซลล์สืบพันธุ์แบบอาศัยเพศ ได้แก่ เซลล์ไข่ (Ovum) และเซลล์อสุจิ (Spermatozoa) ซึ่งพัฒนาขึ้นชั่วคราวจาก I-cells เมื่อสิ่งแวดล้อมเปลี่ยนแปลง',
    morphology:
      'เซลล์ไข่มีขนาดใหญ่มาก อุดมไปด้วยไข่แดงและเม็ดสารอาหารโดยเกิดจากการหลอมรวมหรือกลืนกิน Nurse Cells รอบข้าง ส่วนอสุจิมีขนาดเล็ก มีส่วนหัวบรรจุสารพันธุกรรมและหางแฟลกเจลลัมสำหรับว่ายน้ำ',
    location:
      'อัณฑะ (Testes) มักพบบริเวณครึ่งบนของ Body Column ใกล้หนวด ส่วนรังไข่ (Ovary) มักพบบริเวณครึ่งล่างใกล้ฐานลำตัว (ไฮดราไม่มีอวัยวะสืบพันธุ์ถาวร)',
    primaryFunction:
      'ถ่ายทอดและแลกเปลี่ยนสารพันธุกรรมระหว่างการสืบพันธุ์แบบอาศัยเพศเพื่อสร้างไซโกตและตัวอ่อนที่มีเกราะหุ้มทนทานต่อฤดูหนาวหรือความแห้งแล้ง',
    workingProcess:
      'I-cells ที่ถูกกำหนดสายพันธุ์สืบพันธุ์เข้าสู่กระบวนการ Meiosis ลดจำนวนโครโมโซมลงครึ่งหนึ่ง อสุจิถูกปล่อยลงน้ำเพื่อว่ายเข้าผสมกับไข่ที่ยังคงติดอยู่บนตัวแม่ เกิดเป็นตัวอ่อนที่มีเปลือกหุ้มแข็ง (Embryotheca)',
    systemRelationships: [
      'Interstitial Cells: เป็นแหล่งกำเนิดของเซลล์สืบพันธุ์ทั้งสองชนิด',
      'การอยู่รอดของประชากร: สร้างเกราะพักตัว (Resting Cyst) เพื่อผ่านพ้นช่วงอุณหภูมิต่ำหรือขาดแคลนอาหาร',
    ],
    keyMarkers: ['Meiotic Haploid Nucleus', 'Yolk Granules (Egg)', 'Flagellum (Sperm)'],
  },
];
