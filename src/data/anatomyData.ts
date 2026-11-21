export type AnatomyCategory = 'external' | 'tissue' | 'internal' | 'reproductive';

export interface AnatomyPart {
  id: string;
  order: number;
  nameEn: string;
  nameTh: string;
  category: AnatomyCategory;
  categoryLabelTh: string;
  shortTag: string;
  highlightColor: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  anatomicalDesc: string;
  physiologicalFunction: string;
  keyFact: string;
  cellComposition: string[];
  diagramFocus:
    | 'hypostome'
    | 'mouth'
    | 'tentacles'
    | 'cnidocytes'
    | 'nematocysts'
    | 'epidermis'
    | 'gastrodermis'
    | 'mesoglea'
    | 'gastrovascular-cavity'
    | 'bud'
    | 'body-column'
    | 'basal-disc';
}

export const ANATOMY_PARTS: AnatomyPart[] = [
  {
    id: 'hypostome',
    order: 1,
    nameEn: 'Hypostome',
    nameTh: 'บริเวณปากหรือส่วนยอดของลำตัว',
    category: 'external',
    categoryLabelTh: 'โครงสร้างภายนอก',
    shortTag: 'Apical Cone & Head Organizer',
    highlightColor: '#0284C7',
    cameraPosition: [1.9, 2.25, 2.1],
    cameraTarget: [0, 1.38, 0],
    anatomicalDesc:
      'โครงสร้างรูปกรวยนูนอยู่บริเวณส่วนยอดสุดของลำตัวไฮดรา ล้อมรอบด้วยวงของหนวด (Tentacles) และมีช่องปากเปิดอยู่ตรงจุดสูงสุดของกรวย ภายในมีกลุ่มเซลล์ประสาทหนาแน่นเป็นวงแหวน (Hypostomal Nerve Ring) ทำหน้าที่เป็นศูนย์ควบคุมการเคลื่อนไหวของปากและหนวด',
    physiologicalFunction:
      'ควบคุมการอ้าและปิดของช่องปากระหว่างการกินอาหารและการขับกากอาหาร รวมถึงเป็นศูนย์กำหนดแกนร่างกายด้านหัว (Head Organizer) ผ่านสัญญาณโปรตีน Wnt ในกระบวนการงอกใหม่',
    keyFact:
      'หากตัด Hypostome ไปปลูกถ่ายบนลำตัวไฮดราตัวอื่น สามารถเหนี่ยวนำให้เกิดแกนหัวชุดใหม่ได้',
    cellComposition: ['Epithelio-muscular Cells', 'Nerve Cells', 'Mucous Gland Cells', 'Sensory Cells'],
    diagramFocus: 'hypostome',
  },
  {
    id: 'mouth',
    order: 2,
    nameEn: 'Mouth',
    nameTh: 'ช่องปาก (ช่องเปิดเดี่ยว)',
    category: 'external',
    categoryLabelTh: 'โครงสร้างภายนอก',
    shortTag: 'Single Gastrovascular Opening',
    highlightColor: '#0EA5E9',
    cameraPosition: [1.3, 2.6, 1.5],
    cameraTarget: [0, 1.54, 0],
    anatomicalDesc:
      'ช่องเปิดเพียงช่องเดียวตรงยอดสุดของ Hypostome ปกติจะปิดแนบสนิทและสามารถขยายกว้างออกได้มากเมื่อรับเหยื่อที่มีขนาดใหญ่กว่าความกว้างลำตัวในสภาวะปกติ เนื่องจากไฮดรามีทางเดินอาหารแบบไม่สมบูรณ์ (Incomplete Digestive Tract)',
    physiologicalFunction:
      'ทำหน้าที่แบบสองทิศทาง (Bidirectional) คือ ทั้งรับเหยื่อและน้ำเข้าสู่ Gastrovascular Cavity และขับกากอาหารที่ย่อยไม่ได้ (Egestion) รวมถึงน้ำเสียออกสู่ภายนอก ไม่มีทวารหนัก (Anus) แยกต่างหาก',
    keyFact:
      'การเปิดของปากไม่ได้เป็นเพียงช่องว่างถาวร แต่เป็นการคลายตัวและแยกเซลล์เยื่อบุที่ยึดเกาะกันชั่วคราวด้วยการกระตุ้นทางเคมี (เช่น Glutathione จากเหยื่อ)',
    cellComposition: ['Epidermal Epithelio-muscular Cells', 'Gastrodermal Cells', 'Sensory Cells'],
    diagramFocus: 'mouth',
  },
  {
    id: 'tentacles',
    order: 3,
    nameEn: 'Tentacles',
    nameTh: 'หนวดสำหรับจับเหยื่อ',
    category: 'external',
    categoryLabelTh: 'โครงสร้างภายนอก',
    shortTag: '5–8 Hollow Muscular Arms',
    highlightColor: '#0D9488',
    cameraPosition: [2.6, 2.2, 2.6],
    cameraTarget: [0, 1.5, 0],
    anatomicalDesc:
      'ระยางค์กลวงทรงเรียวยาวจำนวนประมาณ 5–8 เส้น เรียงตัวเป็นรัศมีรอบ Hypostome ภายในเป็นท่อกลวงที่เชื่อมต่อกับ Gastrovascular Cavity ประกอบด้วยสองชั้นเนื้อเยื่อเช่นเดียวกับลำตัว และมีกลุ่มเซลล์เข็มพิษเรียงตัวเป็นปุ่มนูน (Cnidocyte Batteries) ตลอดความยาว',
    physiologicalFunction:
      'กางออกเพื่อเพิ่มพื้นที่ตรวจจับเหยื่อในน้ำ ยิงเข็มพิษเพื่อหยุดยั้งเหยื่อ และม้วนงอเข้าหาจุดศูนย์กลางเพื่อส่งเหยื่อเข้าปาก รวมถึงช่วยในการเคลื่อนที่แบบตีลังกา (Somersaulting)',
    keyFact:
      'หนวดสามารถยืดออกได้ยาวกว่าลำตัวหลายเท่าเมื่อใช้แรงดันน้ำภายใน (Hydrostatic Skeleton) ร่วมกับการหดตัวของเซลล์กล้ามเนื้อเยื่อบุ',
    cellComposition: ['Cnidocytes', 'Sensory Cells', 'Epithelio-muscular Cells', 'Nerve Cells'],
    diagramFocus: 'tentacles',
  },
  {
    id: 'cnidocytes',
    order: 4,
    nameEn: 'Cnidocytes',
    nameTh: 'เซลล์เข็มพิษ',
    category: 'external',
    categoryLabelTh: 'เซลล์เฉพาะทางบนหนวด',
    shortTag: 'Specialized Stinging Cells',
    highlightColor: '#EA580C',
    cameraPosition: [1.85, 2.05, 1.75],
    cameraTarget: [0.85, 1.68, 0.35],
    anatomicalDesc:
      'เซลล์เฉพาะของสัตว์ในไฟลัม Cnidaria พบมากที่สุดบริเวณ Epidermis ของหนวดโดยอยู่รวมกันเป็นกลุ่ม (Batteries) มีโครงสร้างรับสัมผัสคล้ายขนเรียกว่า Cnidocil ยื่นออกสู่ภายนอก',
    physiologicalFunction:
      'ทำหน้าที่เป็นหน่วยตรวจจับและตอบสนองต่อสิ่งเร้าทางกลและทางเคมีจากเหยื่อหรือผู้ล่า เมื่อถูกกระตุ้นจะปลดปล่อย Nematocyst ที่อยู่ภายในออกมาเพื่อจับเหยื่อ ยึดเกาะ หรือป้องกันตัว',
    keyFact:
      'Cnidocyte คือ "ตัวเซลล์" ทั้งเซลล์ ไม่ใช่ตัวเข็มพิษ และหลังจากยิงเข็มพิษออกไปแล้ว เซลล์จะถูกดูดสลายและสร้างทดแทนใหม่จาก Interstitial Cells',
    cellComposition: ['Cnidocyte Cell Membrane', 'Cnidocil', 'Intracellular Nematocyst', 'Nucleus'],
    diagramFocus: 'cnidocytes',
  },
  {
    id: 'nematocysts',
    order: 5,
    nameEn: 'Nematocysts',
    nameTh: 'แคปซูลเข็มพิษภายในเซลล์',
    category: 'external',
    categoryLabelTh: 'ออร์แกเนลล์ภายใน Cnidocyte',
    shortTag: 'Pressurized Stinging Organelle',
    highlightColor: '#DC2626',
    cameraPosition: [1.7, 2.0, 1.6],
    cameraTarget: [0.85, 1.68, 0.35],
    anatomicalDesc:
      'ออร์แกเนลล์ (Organelle) ชนิดพิเศษที่สร้างจาก Golgi Apparatus ภายใน Cnidocyte มีลักษณะเป็นแคปซูลผนังหนาที่บรรจุเส้นท่อขดเกลียวและของเหลวแรงดันออสโมติกสูง ปิดปากแคปซูลด้วยฝาปิด (Operculum)',
    physiologicalFunction:
      'เป็นกลไกชีวกลศาสตร์ระดับไมโครวินาที ทำหน้าที่ปลดปล่อยเส้นท่อออกไปด้วยความเร่งสูงเพื่อแทงทะลุ (Stenotele) พันเกี่ยว (Desmoneme) หรือยึดเกาะ (Isorhiza) โดยไม่ใช่ทุกชนิดที่จะฉีดสารพิษ',
    keyFact:
      'การยิงของ Nematocyst เป็นหนึ่งในกระบวนการทางชีววิทยาที่เร็วที่สุดในอาณาจักรสัตว์ โดยเกิดขึ้นภายในเวลาประมาณ 700 นาโนวินาที',
    cellComposition: ['Capsule Wall (Minicollagen)', 'Operculum', 'Coiled Hollow Tubule', 'Barbs / Spines'],
    diagramFocus: 'nematocysts',
  },
  {
    id: 'epidermis',
    order: 6,
    nameEn: 'Epidermis',
    nameTh: 'ชั้นเนื้อเยื่อชั้นนอก',
    category: 'tissue',
    categoryLabelTh: 'ชั้นเนื้อเยื่อ (Diploblastic)',
    shortTag: 'Outer Protective & Sensory Layer',
    highlightColor: '#38BDF8',
    cameraPosition: [2.75, 0.75, 2.75],
    cameraTarget: [0, 0.25, 0],
    anatomicalDesc:
      'ชั้นเนื้อเยื่อชั้นนอกที่เจริญมาจาก Ectoderm ปกคลุมพื้นผิวภายนอกทั้งหมดของไฮดรา ประกอบด้วยเซลล์หลายชนิดเรียงตัวเป็นชั้นเดียวที่มีเสถียรภาพและมีความยืดหยุ่นสูง',
    physiologicalFunction:
      'ทำหน้าที่เป็นเกราะป้องกันร่างกาย รับสัมผัสจากสิ่งแวดล้อมภายนอก หดตัวตามแนวยาวของลำตัว แลกเปลี่ยนก๊าซและกำจัดของเสีย (แอมโมเนีย) ผ่านการแพร่โดยตรงสู่แหล่งน้ำจืด',
    keyFact:
      'ชั้น Epidermis เป็นแหล่งอาศัยสำคัญของ Interstitial Cells (I-cells) ซึ่งเป็นเซลล์ต้นกำเนิดที่ช่วยทดแทนเซลล์เฉพาะทางหลายชนิด',
    cellComposition: ['Epithelio-muscular Cells', 'Interstitial Cells', 'Cnidocytes', 'Sensory & Nerve Cells'],
    diagramFocus: 'epidermis',
  },
  {
    id: 'gastrodermis',
    order: 7,
    nameEn: 'Gastrodermis',
    nameTh: 'ชั้นเนื้อเยื่อชั้นใน',
    category: 'tissue',
    categoryLabelTh: 'ชั้นเนื้อเยื่อ (Diploblastic)',
    shortTag: 'Inner Digestive & Absorptive Layer',
    highlightColor: '#DB2777',
    cameraPosition: [2.65, 0.6, 2.65],
    cameraTarget: [0, 0.2, 0],
    anatomicalDesc:
      'ชั้นเนื้อเยื่อชั้นในที่เจริญมาจาก Endoderm บุด้านในของ Gastrovascular Cavity ทั้งลำตัวและแขนงหนวด เซลล์ส่วนใหญ่มีแฟลกเจลลาและไมโครวิลไลยื่นเข้าสู่ช่องว่างภายใน',
    physiologicalFunction:
      'ทำหน้าที่หลั่งเอนไซม์ย่อยอาหารลงสู่ช่องว่าง (Extracellular Digestion) จับอนุภาคอาหารเข้าสู่เซลล์แบบ Phagocytosis เพื่อย่อยต่อภายในเซลล์ (Intracellular Digestion) และโบกพัดหมุนเวียนน้ำในช่องภายใน',
    keyFact:
      'ในไฮดราพันธุ์สีเขียว (Hydra viridissima) ชั้น Gastrodermis เป็นที่อยู่อาศัยแบบพึ่งพาของสาหร่ายเซลล์เดียว Chlorella',
    cellComposition: ['Nutritive-muscular Cells', 'Enzymatic Gland Cells', 'Nerve Cells', 'Sensory Cells'],
    diagramFocus: 'gastrodermis',
  },
  {
    id: 'mesoglea',
    order: 8,
    nameEn: 'Mesoglea',
    nameTh: 'ชั้นสารคล้ายวุ้นคั่นกลางระหว่างเนื้อเยื่อ',
    category: 'tissue',
    categoryLabelTh: 'เมทริกซ์นอกเซลล์ (ECM)',
    shortTag: 'Acellular Gelatinous Matrix',
    highlightColor: '#14B8A6',
    cameraPosition: [2.55, 0.6, 2.55],
    cameraTarget: [0, 0.2, 0],
    anatomicalDesc:
      'ชั้นสารคล้ายวุ้นใสบาง ๆ ที่ไม่มีเซลล์อาศัยอยู่เป็นโครงสร้างหลัก (Acellular Extracellular Matrix) คั่นกลางระหว่าง Epidermis และ Gastrodermis ประกอบด้วยเส้นใยคอลลาเจน ลามินิน และโปรติโอไกลแคน',
    physiologicalFunction:
      'เป็นแผ่นฐานยึดเกาะ (Basement Membrane) ให้กับเซลล์ทั้งสองชั้น ทำหน้าที่เป็นโครงยืดหยุ่นช่วยให้ลำตัวคืนรูปหลังการหดตัว และยอมให้สารอาหาร ก๊าซ และของเสียแพร่ผ่านระหว่างสองชั้นเนื้อเยื่อได้โดยง่าย',
    keyFact:
      'ความบางของ Mesoglea ทำให้สารอาหารที่ดูดซึมใน Gastrodermis สามารถแพร่ไปเลี้ยง Epidermis ได้โดยไม่ต้องมีระบบไหลเวียนเลือด',
    cellComposition: ['Collagen Fibers', 'Proteoglycans', 'Laminin Matrix (Acellular)'],
    diagramFocus: 'mesoglea',
  },
  {
    id: 'gastrovascular-cavity',
    order: 9,
    nameEn: 'Gastrovascular Cavity',
    nameTh: 'ช่องแกสโทรวาสคิวลาร์',
    category: 'internal',
    categoryLabelTh: 'ช่องว่างภายในลำตัว',
    shortTag: 'Digestion & Hydrostatic Chamber',
    highlightColor: '#9333EA',
    cameraPosition: [2.8, 0.65, 2.8],
    cameraTarget: [0, 0.15, 0],
    anatomicalDesc:
      'ช่องว่างขนาดใหญ่ตรงกลางลำตัวที่ต่อเนื่องเข้าไปยังแกนกลางของหนวดทุกเส้น มีทางเปิดสู่ภายนอกเพียงทางเดียวคือช่องปาก (Mouth) ทำหน้าที่เป็นทั้งทางเดินอาหารและช่องลำเลียงสารภายใน',
    physiologicalFunction:
      'เป็นพื้นที่สำหรับย่อยอาหารภายนอกเซลล์ (Extracellular Digestion) กระจายสารอาหารที่ละลายน้ำไปยังทุกส่วนของร่างกาย และเมื่อปิดปากกักเก็บน้ำไว้ภายในจะทำหน้าที่เป็นโครงกระดูกน้ำ (Hydrostatic Skeleton) ช่วยพยุงลำตัว',
    keyFact:
      'เนื่องจากมีช่องเปิดทางเดียว น้ำและอาหารจึงไหลเข้า-ออกผ่านปากเดียวกัน และช่วยชะล้างแอมโมเนียส่วนเกินออกได้ด้วย',
    cellComposition: ['Fluid Lumen', 'Digestive Enzymes', 'Lined by Gastrodermis'],
    diagramFocus: 'gastrovascular-cavity',
  },
  {
    id: 'bud',
    order: 10,
    nameEn: 'Bud',
    nameTh: 'ตุ่มหน่อจากการสืบพันธุ์แบบไม่อาศัยเพศ',
    category: 'reproductive',
    categoryLabelTh: 'โครงสร้างการสืบพันธุ์',
    shortTag: 'Asexual Clonal Outgrowth',
    highlightColor: '#EC4899',
    cameraPosition: [2.2, -0.1, 2.1],
    cameraTarget: [0.45, -0.32, 0.1],
    anatomicalDesc:
      'ตุ่มเนื้อเยื่อที่ยื่นงอกออกมาด้านข้างของลำตัวบริเวณส่วนล่าง (Budding Zone) เมื่อไฮดราได้รับอาหารอุดมสมบูรณ์ ตุ่มนี้มีโครงสร้างครบทั้ง Epidermis, Mesoglea, Gastrodermis และช่อง Gastrovascular Cavity ที่ยังเชื่อมต่อกับตัวแม่',
    physiologicalFunction:
      'พัฒนาเป็นไฮดราตัวใหม่ที่สมบูรณ์ทางพันธุกรรมเหมือนตัวแม่ทุกประการ (Clone) เมื่อสร้างหนวดและฐานยึดเกาะครบแล้วจะคอดกิ่วและหลุดออกไปดำรงชีวิตอิสระ',
    keyFact:
      'ในภาวะอาหารอุดมสมบูรณ์ ไฮดราหนึ่งตัวสามารถสร้าง Bud พร้อมกันได้มากกว่าหนึ่งตุ่มภายในไม่กี่วัน',
    cellComposition: ['Dividing Epithelial Cells', 'Migrating I-cells', 'Developing Tentacles'],
    diagramFocus: 'bud',
  },
  {
    id: 'body-column',
    order: 11,
    nameEn: 'Body Column',
    nameTh: 'ลำตัวหลักทรงกระบอก',
    category: 'external',
    categoryLabelTh: 'โครงสร้างภายนอก',
    shortTag: 'Cylindrical Two-Layered Stalk',
    highlightColor: '#1E3A8A',
    cameraPosition: [2.7, 0.3, 2.7],
    cameraTarget: [0, 0.1, 0],
    anatomicalDesc:
      'แกนลำตัวหลักลักษณะคล้ายถุงทรงกระบอกกลวง ผนังบางโปร่งแสง ยืดหดตัวได้สูงมาก (ตั้งแต่ 2 มม. เมื่อหดตัว จนถึง 15–25 มม. เมื่อยืดเต็มที่) แบ่งเขตการทำงานออกเป็นส่วนบน ส่วนกลางที่ย่อยอาหาร และบริเวณสร้างหน่อด้านล่าง',
    physiologicalFunction:
      'เป็นที่อยู่ของโครงสร้างย่อยอาหารและระบบประสาทแบบร่างแห (Nerve Net) ทำหน้าที่ยืด-หดตัวเพื่อแสวงหาเหยื่อ ตอบสนองต่อสิ่งเร้า และเป็นแหล่งเซลล์ต้นกำเนิดที่มีการผลัดเปลี่ยนเซลล์ตลอดเวลา',
    keyFact:
      'เซลล์ใน Body Column มีการเคลื่อนตัวไหลตลอดเวลาจากบริเวณกลางลำตัวขึ้นสู่ปลายหนวดและลงสู่ฐาน (Tissue Flow)',
    cellComposition: ['Epidermis', 'Mesoglea', 'Gastrodermis', 'Nerve Net'],
    diagramFocus: 'body-column',
  },
  {
    id: 'basal-disc',
    order: 12,
    nameEn: 'Basal Disc',
    nameTh: 'ฐานสำหรับยึดเกาะพื้นผิว',
    category: 'external',
    categoryLabelTh: 'โครงสร้างภายนอก',
    shortTag: 'Adhesive Pedal Anchor',
    highlightColor: '#0F766E',
    cameraPosition: [2.1, -0.7, 2.2],
    cameraTarget: [0, -1.25, 0],
    anatomicalDesc:
      'แผ่นฐานกลมแบนบริเวณปลายล่างสุดของลำตัว (เรียกอีกชื่อว่า Pedal Disc) มีเซลล์ต่อมชนิดพิเศษในชั้น Epidermis เรียงตัวหนาแน่นทำหน้าที่ผลิตเมือกเหนียว',
    physiologicalFunction:
      'ยึดเกาะลำตัวไฮดราเข้ากับพืชน้ำ ก้อนหิน หรือพื้นผิวใต้น้ำอย่างมั่นคง และสามารถปล่อยฟองก๊าซขนาดเล็กหรือค่อย ๆ คืบคลาน/คลายการยึดเกาะเพื่อย้ายตำแหน่งหาแหล่งอาหารใหม่ได้',
    keyFact:
      'กาวชีวภาพจาก Basal Disc ทำงานได้ดีแม้ในสภาพแวดล้อมใต้น้ำ โดยอาศัยไกลโคโปรตีนที่หลั่งจาก Pedal Gland Cells',
    cellComposition: ['Basal Mucous Gland Cells', 'Epithelio-muscular Cells', 'Nerve Ring'],
    diagramFocus: 'basal-disc',
  },
];
