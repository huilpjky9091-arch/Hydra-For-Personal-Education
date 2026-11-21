export interface DigestionStep {
  id: string;
  level: 1 | 2;
  levelLabel: string;
  stepNumber: number;
  titleEn: string;
  titleTh: string;
  description: string;
  location: string;
  accentColor: string;
}

export const DIGESTION_STEPS: DigestionStep[] = [
  {
    id: 'ext-1',
    level: 1,
    levelLabel: 'ระดับที่ 1: Extracellular Digestion (นอกเซลล์)',
    stepNumber: 1,
    titleEn: 'Prey Capture & Immobilization',
    titleTh: 'จับเหยื่อด้วยหนวดและเข็มพิษ',
    description:
      'หนวดตรวจจับเหยื่อ (เช่น Daphnia) และยิง Nematocyst ทั้งชนิดเจาะฉีดพิษ (Stenotele) และพันรัด (Desmoneme) ทำให้เหยื่อหยุดเคลื่อนไหว',
    location: 'Tentacles (Epidermis)',
    accentColor: '#EA580C',
  },
  {
    id: 'ext-2',
    level: 1,
    levelLabel: 'ระดับที่ 1: Extracellular Digestion (นอกเซลล์)',
    stepNumber: 2,
    titleEn: 'Mouth Opening & Ingestion',
    titleTh: 'หนวดนำเหยื่อเข้าสู่ช่องปากและช่องย่อยอาหาร',
    description:
      'สารเคมีกลูตาไทโอน (Glutathione) จากบาดแผลของเหยื่อกระตุ้นการตอบสนอง หนวดม้วนนำเหยื่อสู่ยอด Hypostome ปากขยายเปิดกว้างเพื่อนำเหยื่อลงสู่ Gastrovascular Cavity',
    location: 'Hypostome & Mouth',
    accentColor: '#0284C7',
  },
  {
    id: 'ext-3',
    level: 1,
    levelLabel: 'ระดับที่ 1: Extracellular Digestion (นอกเซลล์)',
    stepNumber: 3,
    titleEn: 'Enzyme Secretion into Cavity',
    titleTh: 'Gland Cells หลั่งเอนไซม์เข้าสู่ช่องแกสโทรวาสคิวลาร์',
    description:
      'Gland Cells ในชั้น Gastrodermis ปล่อยเอนไซม์ย่อยอาหาร (เช่น Endopeptidases และโปรติเอส) ออกสู่น้ำในช่อง Gastrovascular Cavity',
    location: 'Gastrodermis -> Gastrovascular Cavity',
    accentColor: '#0D9488',
  },
  {
    id: 'ext-4',
    level: 1,
    levelLabel: 'ระดับที่ 1: Extracellular Digestion (นอกเซลล์)',
    stepNumber: 4,
    titleEn: 'Extracellular Macromolecule Breakdown',
    titleTh: 'การย่อยภายนอกเซลล์ให้เป็นอนุภาคขนาดเล็ก',
    description:
      'เอนไซม์สลายเนื้อเยื่อและโมเลกุลอาหารขนาดใหญ่ของเหยื่อให้แตกตัวเป็นชิ้นส่วนขนาดเล็กและโพลีเพปไทด์สั้น ๆ ภายในช่องว่างกลางลำตัว โดยมีแฟลกเจลลาช่วยกวนผสม',
    location: 'Gastrovascular Cavity',
    accentColor: '#0EA5E9',
  },
  {
    id: 'int-1',
    level: 2,
    levelLabel: 'ระดับที่ 2: Intracellular Digestion (ภายในเซลล์)',
    stepNumber: 5,
    titleEn: 'Phagocytosis by Nutritive-muscular Cells',
    titleTh: 'การกลืนกินอนุภาคอาหารเข้าสู่เซลล์',
    description:
      'Nutritive-muscular Cells ในชั้น Gastrodermis ยื่นส่วนของไซโทพลาซึม (Pseudopodia) โอบล้อมอนุภาคอาหารที่ผ่านการย่อยบางส่วนแล้วเข้าสู่ภายในเซลล์ด้วยกระบวนการ Phagocytosis',
    location: 'Nutritive-muscular Cells (Gastrodermis)',
    accentColor: '#7C3AED',
  },
  {
    id: 'int-2',
    level: 2,
    levelLabel: 'ระดับที่ 2: Intracellular Digestion (ภายในเซลล์)',
    stepNumber: 6,
    titleEn: 'Food Vacuole & Lysosome Fusion',
    titleTh: 'การเกิด Food Vacuole และรวมตัวกับ Lysosome',
    description:
      'อนุภาคอาหารอยู่ในถุง Food Vacuole จากนั้น Lysosome ที่บรรจุเอนไซม์ย่อยสลายภายในเซลล์ (Hydrolytic Enzymes) จะเคลื่อนที่เข้ามารวมตัวเป็น Phagolysosome',
    location: 'Cytoplasm of Nutritive-muscular Cells',
    accentColor: '#9333EA',
  },
  {
    id: 'int-3',
    level: 2,
    levelLabel: 'ระดับที่ 2: Intracellular Digestion (ภายในเซลล์)',
    stepNumber: 7,
    titleEn: 'Nutrient Absorption & Diffusion',
    titleTh: 'การย่อยสมบูรณ์และกระจายสารอาหารระดับเซลล์',
    description:
      'เอนไซม์ในไลโซโซมย่อยอาหารจนได้กรดอะมิโน น้ำตาลโมเลกุลเดี่ยว และกรดไขมัน เพื่อใช้ในเมแทบอลิซึมของเซลล์ และแพร่ผ่านชั้น Mesoglea ไปหล่อเลี้ยงเซลล์ใน Epidermis',
    location: 'Gastrodermis -> Mesoglea -> Epidermis',
    accentColor: '#DB2777',
  },
  {
    id: 'int-4',
    level: 2,
    levelLabel: 'ระดับที่ 2: Intracellular Digestion (ภายในเซลล์)',
    stepNumber: 8,
    titleEn: 'Egestion via Single Mouth Opening',
    titleTh: 'ขับกากอาหารที่ย่อยไม่ได้ออกทางปากเดิม',
    description:
      'เปลือกไคตินแข็งและกากอาหารที่ไม่สามารถย่อยได้จะถูกบีบตัวขับย้อนกลับออกทางช่องปาก (Mouth) เพียงช่องเดียว เนื่องจากไฮดราไม่มีทวารหนักแยกต่างหาก',
    location: 'Gastrovascular Cavity -> Mouth',
    accentColor: '#64748B',
  },
];

export interface EnzymePhase {
  phase: number;
  titleEn: string;
  titleTh: string;
  description: string;
  organelleFocus: string;
  color: string;
}

export const ENZYME_PHASES: EnzymePhase[] = [
  {
    phase: 1,
    titleEn: 'Enzyme Synthesis & Packaging',
    titleTh: '1. Gland Cell สังเคราะห์และบรรจุเอนไซม์',
    description:
      'Enzymatic Gland Cells ในชั้น Gastrodermis สังเคราะห์เอนไซม์โปรติเอสและเอนไซม์ย่อยสลายบน Rough ER แล้วส่งต่อไปแต่งเติมที่ Golgi Apparatus จนได้ถุง Zymogen / Secretory Vesicles',
    organelleFocus: 'Rough ER -> Golgi -> Secretory Granules',
    color: '#DB2777',
  },
  {
    phase: 2,
    titleEn: 'Exocytosis across Apical Membrane',
    titleTh: '2. การหลั่งเอนไซม์ออกจากเซลล์',
    description:
      'เมื่อมีอาหารเข้าสู่ลำตัว ถุงบรรจุเอนไซม์เคลื่อนตัวไปรวมกับเยื่อหุ้มเซลล์ด้านยอดที่หันเข้าสู่ช่องว่าง และปลดปล่อยโมเลกุลเอนไซม์ออกมาด้วยวิธี Exocytosis',
    organelleFocus: 'Apical Plasma Membrane (Exocytosis)',
    color: '#F59E0B',
  },
  {
    phase: 3,
    titleEn: 'Diffusion into Gastrovascular Cavity',
    titleTh: '3. เอนไซม์แพร่กระจายเข้าสู่ช่องแกสโทรวาสคิวลาร์',
    description:
      'โมเลกุลเอนไซม์กระจายตัวไปทั่วของเหลวใน Gastrovascular Cavity โดยมีแรงโบกพัดจาก Flagella ของ Nutritive-muscular Cells ช่วยกวนคลุกเคล้าให้สัมผัสอาหารทั่วถึง',
    organelleFocus: 'Gastrovascular Cavity Fluid Mixing',
    color: '#0D9488',
  },
  {
    phase: 4,
    titleEn: 'Enzyme-Substrate Catalysis',
    titleTh: '4. เอนไซม์จับและสลายอนุภาคอาหาร',
    description:
      'เอนไซม์เข้าจับกับโปรตีนและโมเลกุลอาหารของเหยื่อ ทำให้พันธะเคมีถูกตัดขาด (Hydrolysis) โครงสร้างเหยื่อจึงอ่อนตัวและแตกสลายเป็นอนุภาคขนาดเล็ก',
    organelleFocus: 'Extracellular Hydrolysis of Prey Proteins',
    color: '#0284C7',
  },
  {
    phase: 5,
    titleEn: 'Breakdown to Small Molecules & Intracellular Continuation',
    titleTh: '5. ย่อยเป็นโมเลกุลเล็กและส่งต่อการย่อยภายในเซลล์',
    description:
      'ชิ้นส่วนอาหารขนาดเล็กถูก Nutritive-muscular Cells จับเข้าทาง Phagocytosis แล้วใช้เอนไซม์จาก Lysosome ย่อยต่อภายในเซลล์จนได้โมเลกุลพร้อมใช้งานทางเมแทบอลิซึม',
    organelleFocus: 'Food Vacuole + Lysosomal Enzymes',
    color: '#7C3AED',
  },
];

export interface PhysiologySystem {
  id: string;
  titleEn: string;
  titleTh: string;
  subtitle: string;
  summary: string;
  mechanism: string;
  noOrganNote: string;
  involvedCells: string[];
  involvedLayers: string[];
  color: string;
}

export const PHYSIOLOGY_SYSTEMS: PhysiologySystem[] = [
  {
    id: 'feeding-digestion',
    titleEn: 'Feeding and Digestion',
    titleTh: 'การกินและการย่อยอาหาร',
    subtitle: '2-Stage Digestion in Single Opening Cavity',
    subtitleEn: 'Incomplete Gut',
    summary:
      'จับเหยื่อด้วย Cnidocytes บนหนวด นำเข้าทางปากเพียงช่องเดียว แล้วย่อยแบบสองขั้นตอนคือ Extracellular ในช่องลำตัวตามด้วย Intracellular ในเซลล์ดูดซึม',
    mechanism:
      'Gland Cells หลั่งเอนไซม์ย่อยขั้นต้น จากนั้น Nutritive-muscular Cells กลืนกินอนุภาคอาหารด้วย Phagocytosis และย่อยสมบูรณ์ด้วยไลโซโซม กากอาหารขับออกทางปากเดิม',
    noOrganNote: 'ไม่มีกระเพาะอาหาร ลำไส้ หรือทวารหนักแยกกัน',
    involvedCells: ['Cnidocytes', 'Sensory Cells', 'Gland Cells', 'Nutritive-muscular Cells'],
    involvedLayers: ['Epidermis', 'Gastrodermis', 'Gastrovascular Cavity'],
    color: '#0284C7',
  } as PhysiologySystem & { subtitleEn?: string },
  {
    id: 'respiration',
    titleEn: 'Respiration',
    titleTh: 'การแลกเปลี่ยนก๊าซ (การหายใจ)',
    subtitle: 'Direct Gas Diffusion Across Body Surfaces',
    summary:
      'เนื่องจากลำตัวประกอบด้วยเซลล์เพียง 2 ชั้นบาง ๆ ทุกเซลล์จึงสัมผัสน้ำโดยตรง ทั้งน้ำภายนอกที่สัมผัส Epidermis และน้ำในช่องลำตัวที่สัมผัส Gastrodermis',
    mechanism:
      'ออกซิเจน (O₂) ที่ละลายในน้ำจืดแพร่ผ่านเยื่อหุ้มเซลล์เข้าสู่เซลล์โดยตรง และคาร์บอนไดออกไซด์ (CO₂) จากการหายใจระดับเซลล์แพร่ย้อนกลับสู่น้ำภายนอก',
    noOrganNote: 'ไม่มีเหงือก ปอด หลอดลม หรือระบบไหลเวียนเลือดลำเลียงก๊าซ',
    involvedCells: ['Epithelio-muscular Cells', 'Nutritive-muscular Cells'],
    involvedLayers: ['Epidermis', 'Mesoglea', 'Gastrodermis'],
    color: '#0D9488',
  },
  {
    id: 'excretion',
    titleEn: 'Excretion',
    titleTh: 'ระบบขับถ่าย',
    subtitle: 'Ammonotelic Direct Diffusion',
    summary:
      'ไฮดราขับถ่ายของเสียไนโตรเจนในรูปของแอมโมเนีย (NH₃) ซึ่งละลายน้ำได้ดีมาก โดยอาศัยการแพร่โดยตรงผ่านเยื่อหุ้มเซลล์เข้าสู่มวลน้ำจืดรอบตัว',
    mechanism:
      'แอมโมเนียที่เกิดจากเมแทบอลิซึมของโปรตีนและกรดอะมิโนแพร่ผ่าน Epidermis สู่น้ำภายนอก และบางส่วนแพร่เข้าสู่ Gastrovascular Cavity แล้วถูกระบายออกทางปาก',
    noOrganNote: 'ไม่มีไต ท่อขับถ่าย (Nephridia) หรืออวัยวะขับถ่ายเฉพาะทาง',
    involvedCells: ['Epithelio-muscular Cells', 'Nutritive-muscular Cells'],
    involvedLayers: ['Epidermis', 'Gastrodermis', 'Gastrovascular Cavity'],
    color: '#0EA5E9',
  },
  {
    id: 'nervous',
    titleEn: 'Nervous Coordination',
    titleTh: 'การประสานงานของระบบประสาท',
    subtitle: 'Decentralized Diffuse Nerve Net',
    summary:
      'ระบบประสาทแบบร่างแห (Nerve Net) ที่เซลล์ประสาทเชื่อมโยงกันทั่วลำตัวโดยไม่มีสมองหรือศูนย์กลางประสาทสั่งการเพียงจุดเดียว',
    mechanism:
      'ไซแนปส์ส่งสัญญาณได้สองทิศทางใช้ Neuropeptides และ Gap Junctions เชื่อมโยง Sensory Cells กับเซลล์กล้ามเนื้อเยื่อบุ โดยมีกลุ่มวงแหวนประสาทที่ Hypostome และฐานเป็นตัวสร้างจังหวะ',
    noOrganNote: 'ไม่มีสมอง ไขสันหลัง หรือปมประสาทส่วนกลาง (CNS)',
    involvedCells: ['Nerve Cells', 'Sensory Cells', 'Epithelio-muscular Cells'],
    involvedLayers: ['Epidermis', 'Gastrodermis'],
    color: '#7C3AED',
  },
  {
    id: 'movement',
    titleEn: 'Movement',
    titleTh: 'การเคลื่อนไหวและการเคลื่อนที่',
    subtitle: 'Hydrostatic Skeleton & Antagonistic Epithelio-muscular Action',
    summary:
      'อาศัยการทำงานตรงข้ามกันของเส้นใยกล้ามเนื้อแนวยาวใน Epidermis กับแนววงรอบใน Gastrodermis ต้านกับน้ำที่ถูกกักในช่องลำตัว (Hydrostatic Skeleton)',
    mechanism:
      'สามารถยืด-หดลำตัว คืบคลานแบบหนอนคืบ (Looping) เดินด้วยหนวด หรือตีลังกา (Somersaulting) โดยใช้ Basal Disc และสารยึดเกาะจาก Atrichous Isorhizas สลับกันยึดพื้น',
    noOrganNote: 'ไม่มีโครงกระดูกแข็งและไม่มีมัดกล้ามเนื้อแท้จาก Mesoderm',
    involvedCells: ['Epithelio-muscular Cells', 'Nutritive-muscular Cells', 'Nerve Cells', 'Cnidocytes'],
    involvedLayers: ['Epidermis', 'Gastrodermis', 'Gastrovascular Cavity'],
    color: '#1E3A8A',
  },
  {
    id: 'regeneration',
    titleEn: 'Regeneration',
    titleTh: 'ความสามารถในการงอกใหม่',
    subtitle: 'Morphallaxis & Three Independent Stem Cell Lineages',
    summary:
      'ไฮดราสามารถงอกส่วนหัว หนวด หรือฐานใหม่ได้เกือบสมบูรณ์จากชิ้นส่วนลำตัวขนาดเล็ก โดยแทบไม่แสดงความชราทางชีวภาพ (Biological Negligible Senescence)',
    mechanism:
      'ผสานกระบวนการ Morphallaxis (จัดระเบียบเซลล์เยื่อบุเดิมใหม่ตามแกนสัญญาณ Wnt) ร่วมกับการแบ่งตัวของสายพันธุ์เซลล์ต้นกำเนิดทั้ง 3 สายแยกกัน (Epidermal, Gastrodermal และ Interstitial Cells)',
    noOrganNote: 'ไม่ใช่เซลล์ I-cells เพียงชนิดเดียวที่สร้างทั้งตัว แต่ต้องอาศัย 3 สายพันธุ์ต้นกำเนิดร่วมกัน',
    involvedCells: ['Interstitial Cells (I-cells)', 'Epithelio-muscular Cells', 'Nutritive-muscular Cells'],
    involvedLayers: ['Epidermis', 'Mesoglea', 'Gastrodermis'],
    color: '#9333EA',
  },
  {
    id: 'reproduction',
    titleEn: 'Reproduction',
    titleTh: 'การสืบพันธุ์',
    subtitle: 'Asexual Budding & Stress-Induced Sexual Gametogenesis',
    summary:
      'สืบพันธุ์แบบไม่อาศัยเพศด้วยการแตกหน่อ (Budding) เมื่ออาหารสมบูรณ์ และสร้างไข่กับอสุจิสืบพันธุ์แบบอาศัยเพศเมื่อสภาพแวดล้อมแปรปรวน',
    mechanism:
      'Budding เกิดจากเนื้อเยื่อทั้งสองชั้นโป่งออกเป็นตัวใหม่แล้วหลุดออก ส่วน Sexual Reproduction อาศัย I-cells สร้างสเปิร์มและไข่ เกิดไซโกตที่มีเปลือกแข็งทนทาน',
    noOrganNote: 'ไม่มีอัณฑะหรือรังไข่ถาวร สร้างอวัยวะสืบพันธุ์ขึ้นชั่วคราวตามฤดูกาล',
    involvedCells: ['Interstitial Cells (I-cells)', 'Germ Cells', 'Epithelio-muscular Cells', 'Nutritive-muscular Cells'],
    involvedLayers: ['Epidermis', 'Gastrodermis'],
    color: '#EC4899',
  },
];

export interface RegenerationStage {
  hourLabel: string;
  progress: number;
  titleEn: string;
  titleTh: string;
  description: string;
  cellularNote: string;
}

export const REGENERATION_STAGES: RegenerationStage[] = [
  {
    hourLabel: '0 ชม.',
    progress: 0,
    titleEn: 'Intact Adult Hydra',
    titleTh: 'ไฮดราปกติสมบูรณ์',
    description:
      'ลำตัวมีขั้วทางชีวภาพชัดเจน (Body Polarity): ขั้วหัว (Hypostome/Tentacles) ส่งสัญญาณ Wnt สูง และขั้วฐาน (Basal Disc) ยึดเกาะพื้นผิว',
    cellularNote: 'ทั้ง 3 สายพันธุ์ต้นกำเนิด (Epidermal, Gastrodermal, I-cells) แบ่งตัวสมดุลตลอดเวลา',
  },
  {
    hourLabel: '1–6 ชม.',
    progress: 0.25,
    titleEn: 'Fragmentation & Wound Closure',
    titleTh: 'การแยกส่วนของร่างกายและปิดปากแผล',
    description:
      'เมื่อลำตัวถูกตัดแยกเป็นท่อน เซลล์เยื่อบุทั้ง Epidermis และ Gastrodermis บริเวณขอบแผลจะยืดแผ่ตัวเข้าหากันปิดช่องว่างภายในเวลาไม่กี่ชั่วโมงเพื่อรักษาแรงดันภายใน',
    cellularNote: 'เกิดสัญญาณบาดแผล (ROS & MAPK) กระตุ้นการปิดแผลโดยยังไม่ต้องพึ่งการแบ่งเซลล์ปริมาณมาก',
  },
  {
    hourLabel: '12–24 ชม.',
    progress: 0.5,
    titleEn: 'Cellular Reorganization (Morphallaxis)',
    titleTh: 'การจัดระเบียบเซลล์และกำหนดแกนใหม่',
    description:
      'เซลล์เดิมปรับโครงสร้างและตำแหน่งใหม่ (Morphallaxis) พร้อมทั้งกระตุ้นยีนกำหนดขั้วหัว (Wnt3) ที่ปลายด้านบน และกำหนดขั้วฐานที่ปลายด้านล่างอย่างแม่นยำ',
    cellularNote:
      'Epithelial cells สร้างโครงลำตัวใหม่ ขณะที่ I-cells เริ่มแบ่งตัวเตรียมผลิต Nerve cells และ Cnidocytes ชุดใหม่',
  },
  {
    hourLabel: '36–48 ชม.',
    progress: 0.75,
    titleEn: 'Tentacle Budding & Axis Formation',
    titleTh: 'การสร้างโครงสร้างหัว หนวด และแกนลำตัวใหม่',
    description:
      'เกิดตุ่มหนวดขนาดเล็กงอกรอบ Hypostome ที่เพิ่งก่อตัว มีการสร้างเซลล์ประสาทวงแหวนและอพยพของ Cnidocytes สู่หนวดที่กำลังยืดยาวออก',
    cellularNote:
      'I-cells ไม่ได้สร้างทุกส่วนของร่างกาย แต่เติมเต็มเซลล์ประสาท เซลล์ต่อม และเซลล์เข็มพิษให้โครงสร้างเยื่อบุ',
  },
  {
    hourLabel: '72+ ชม.',
    progress: 1.0,
    titleEn: 'Complete Functional Miniature Hydra',
    titleTh: 'พัฒนาเป็นไฮดราสมบูรณ์พร้อมดำรงชีวิต',
    description:
      'ชิ้นส่วนลำตัวพัฒนาเป็นไฮดราขนาดย่อมที่มี Hypostome, Mouth, Tentacles และ Basal Disc ครบถ้วน สามารถจับกินเหยื่อได้ปกติและค่อย ๆ ขยายขนาดเมื่อได้รับอาหาร',
    cellularNote: 'ระบบทั้ง 3 สายพันธุ์ต้นกำเนิดกลับสู่สมดุลถาวร',
  },
];

export interface ReproductionStage {
  step: number;
  titleEn: string;
  titleTh: string;
  description: string;
}

export const ASEXUAL_BUDDING_STAGES: ReproductionStage[] = [
  {
    step: 1,
    titleEn: 'Budding Zone Initiation',
    titleTh: '1. เกิดตุ่มนูนบริเวณลำตัว (Budding Zone)',
    description:
      'เมื่ออาหารอุดมสมบูรณ์ เซลล์จากตอนกลางลำตัวเคลื่อนลงสู่บริเวณ 1/3 ด้านล่าง ทำให้ผนังทั้ง Epidermis และ Gastrodermis โป่งนูนออกเป็นตุ่มเล็ก ๆ',
  },
  {
    step: 2,
    titleEn: 'Outgrowth & Shared Lumen',
    titleTh: '2. เซลล์แบ่งตัวและขยายแกนหน่อ',
    description:
      'เซลล์เยื่อบุแบ่งตัวและจัดเรียงเป็นท่อทรงกระบอกยื่นออกมา โดยช่อง Gastrovascular Cavity ของหน่อยังคงเชื่อมต่อรับสารอาหารจากตัวแม่โดยตรง',
  },
  {
    step: 3,
    titleEn: 'Tentacle & Hypostome Development',
    titleTh: '3. พัฒนาหนวดและปากบนตัวหน่อ',
    description:
      'ปลายสุดของตุ่มหน่อเริ่มสร้าง Hypostome ช่องปาก และปุ่มหนวดงอกเรียงเป็นรัศมี พร้อมทั้งสร้าง Basal Disc ที่โคนหน่อฝั่งติดกับตัวแม่',
  },
  {
    step: 4,
    titleEn: 'Constriction & Detachment',
    titleTh: '4. คอดกิ่วและหลุดออกเป็นไฮดราตัวใหม่',
    description:
      'เมื่อหน่อมีโครงสร้างสมบูรณ์ รอยต่อบริเวณฐานหน่อจะคอดแคบลงและแยกขาดออกจากตัวแม่ เกิดเป็นไฮดราตัวใหม่ที่มีพันธุกรรมเหมือนกัน (Clone)',
  },
];

export const SEXUAL_REPRODUCTION_STAGES: ReproductionStage[] = [
  {
    step: 1,
    titleEn: 'Gonad Induction by Stress',
    titleTh: '1. การกระตุ้นสร้างอวัยวะสืบพันธุ์ชั่วคราว',
    description:
      'เมื่ออุณหภูมิน้ำลดลงหรือสภาพแวดล้อมเปลี่ยน I-cells ในชั้น Epidermis จะถูกกระตุ้นให้สร้างตุ่มอัณฑะ (Testes) ด้านบน และรังไข่ (Ovary) ด้านล่างของลำตัว',
  },
  {
    step: 2,
    titleEn: 'Gametogenesis (Egg & Sperm)',
    titleTh: '2. การสร้างเซลล์ไข่และอสุจิ',
    description:
      'I-cells แบ่งตัวแบบ Meiosis พัฒนาเป็นอสุจิมีหางว่ายน้ำได้จำนวนมากใน Testes และพัฒนาเป็นเซลล์ไข่ขนาดใหญ่ที่สะสมสารอาหารบน Ovary',
  },
  {
    step: 3,
    titleEn: 'Fertilization in Freshwater',
    titleTh: '3. การปฏิสนธิ',
    description:
      'อัณฑะปล่อยอสุจิลงสู่น้ำเพื่อว่ายเข้าผสมกับไข่ที่ยังคงติดอยู่บนตัวแม่ (มักผสมข้ามตัวเพื่อเพิ่มความหลากหลายทางพันธุกรรม) เกิดเป็นไซโกต',
  },
  {
    step: 4,
    titleEn: 'Protective Embryotheca & Hatching',
    titleTh: '4. การสร้างเกราะหุ้มตัวอ่อนและฟักตัว',
    description:
      'ไซโกตแบ่งตัวเป็นตัวอ่อนและสร้างเปลือกไคตินหนาที่มีหนาม (Embryotheca) ห่อหุ้มไว้ หลุดจมลงก้นบ่อเพื่อจำศีลผ่านฤดูหนาว ก่อนฟักเป็นไฮดราตัวใหม่เมื่อน้ำอบอุ่น',
  },
];
