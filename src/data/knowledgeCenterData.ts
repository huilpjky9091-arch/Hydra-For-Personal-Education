export interface KnowledgeTopic {
  id: string;
  order: number;
  titleEn: string;
  titleTh: string;
  subtitle: string;
  badgeColor: string;
  summaryPoints: string[];
  scientificHighlight: string;
  keyTerms: { en: string; th: string }[];
  taxonomyTable?: { rank: string; value: string; note: string }[];
}

export interface QuizQuestion {
  id: string;
  topicId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const KNOWLEDGE_TOPICS: KnowledgeTopic[] = [
  {
    id: 'classification',
    order: 1,
    titleEn: 'Hydra Classification',
    titleTh: 'การจัดจำแนกทางอนุกรมวิธาน',
    subtitle: 'Kingdom Animalia -> Phylum Cnidaria -> Class Hydrozoa',
    badgeColor: '#1E3A8A',
    summaryPoints: [
      'ไฮดราเป็นสัตว์ไม่มีกระดูกสันหลัง (Invertebrate) ในไฟลัม Cnidaria ซึ่งเป็นกลุ่มเดียวกับแมงกะพรุน ปะการัง และดอกไม้ทะเล',
      'จัดอยู่ใน Class Hydrozoa, Order Anthoathecata, Family Hydridae และสกุล Hydra (เช่น Hydra vulgaris, Hydra oligactis, Hydra viridissima)',
      'มีสมมาตรแบบรัศมี (Radial Symmetry) และมีระดับการจัดเรียงเนื้อเยื่อแบบ Diploblastic คือประกอบด้วยเนื้อเยื่อ 2 ชั้นแท้จริง ได้แก่ Ectoderm (Epidermis) และ Endoderm (Gastrodermis)',
      'มีรูปร่างตลอดชีวิตเฉพาะระยะ Polyp เท่านั้น ไม่พบระยะ Medusa เหมือนไนดาเรียหลายชนิดในทะเล',
    ],
    scientificHighlight:
      'ไฮดราเป็นสมาชิกกลุ่มน้อยของไฟลัม Cnidaria ที่อาศัยอยู่ในแหล่งน้ำจืดได้อย่างสมบูรณ์ตลอดวงจรชีวิต',
    keyTerms: [
      { en: 'Diploblastic', th: 'สัตว์ที่มีเนื้อเยื่อ 2 ชั้น (Epidermis & Gastrodermis)' },
      { en: 'Radial Symmetry', th: 'สมมาตรแบบรัศมีรอบแกนกลางลำตัว' },
      { en: 'Polyp Form', th: 'รูปร่างทรงกระบอกยึดเกาะพื้นผิว' },
    ],
    taxonomyTable: [
      { rank: 'Kingdom', value: 'Animalia', note: 'สัตว์หลายเซลล์ ยูคาริโอต ไม่มีผนังเซลล์' },
      { rank: 'Phylum', value: 'Cnidaria', note: 'มีเซลล์เข็มพิษ Cnidocyte และสมมาตรแบบรัศมี' },
      { rank: 'Class', value: 'Hydrozoa', note: 'ไนดาเรียขนาดเล็ก ส่วนใหญ่เด่นระยะ Polyp' },
      { rank: 'Order', value: 'Anthoathecata', note: 'โพลิปที่ไม่มีปลอกแข็งหุ้มตัว (Athecate)' },
      { rank: 'Family', value: 'Hydridae', note: 'โพลิปน้ำจืดอาศัยเดี่ยว ไม่มีระยะ Medusa' },
      { rank: 'Genus', value: 'Hydra', note: 'ความยาว 2–25 มม. สามารถงอกใหม่และแตกหน่อได้ดีเยี่ยม' },
    ],
  },
  {
    id: 'habitat',
    order: 2,
    titleEn: 'Habitat',
    titleTh: 'ถิ่นอาศัยและนิเวศวิทยา',
    subtitle: 'Clean Freshwater Ponds, Streams & Submerged Vegetation',
    badgeColor: '#0284C7',
    summaryPoints: [
      'อาศัยอยู่ในแหล่งน้ำจืดที่สะอาด เย็น และมีออกซิเจนละลายสูง เช่น บึงน้ำใส ลำธารไหลเอื่อย หรือบ่อน้ำธรรมชาติที่ปราศจากมลพิษ',
      'มักใช้ Basal Disc ยึดเกาะอยู่ใต้ใบพืชน้ำ รากผักตบชวา กิ่งไม้จมน้ำ หรือผิวหินเรียบ เพื่อกางหนวดดักเหยื่อที่ลอยผ่าน',
      'เป็นดัชนีชี้วัดคุณภาพน้ำทางชีวภาพได้ในระดับหนึ่ง เนื่องจากไวต่อโลหะหนัก สารซักฟอก และภาวะขาดออกซิเจน',
      'ในธรรมชาติเป็นผู้ล่าขนาดเล็กที่กินไรน้ำ (Daphnia), โคพีพอด (Copepods), ตัวอ่อนแมลงน้ำ และหนอนขนาดเล็ก',
    ],
    scientificHighlight:
      'Hydra viridissima มีสาหร่ายสีเขียว Chlorella อาศัยแบบพึ่งพากัน (Endosymbiosis) ภายในเซลล์ Gastrodermis ช่วยสังเคราะห์สารอาหารจากแสงแดด',
    keyTerms: [
      { en: 'Freshwater Benthos', th: 'สิ่งมีชีวิตยึดเกาะพื้นผิวในน้ำจืด' },
      { en: 'Daphnia', th: 'ไรน้ำที่เป็นเหยื่อหลักในระบบนิเวศ' },
      { en: 'Endosymbiosis', th: 'การอยู่ร่วมกันภายในเซลล์ (ใน H. viridissima)' },
    ],
  },
  {
    id: 'external-morphology',
    order: 3,
    titleEn: 'External Morphology',
    titleTh: 'สัณฐานวิทยาภายนอก',
    subtitle: 'Hypostome, Tentacles, Body Column & Basal Disc',
    badgeColor: '#0D9488',
    summaryPoints: [
      'ลำตัวเป็นทรงกระบอกกลวงคล้ายถุง ยืดหดได้มาก ด้านบนสุดมียอดรูปกรวยเรียกว่า Hypostome พร้อมช่องปาก (Mouth) อยู่ตรงกลาง',
      'รอบ Hypostome มีหนวด (Tentacles) เรียงตัวเป็นวงประมาณ 5–8 เส้น ยืดออกเพื่อครอบคลุมพื้นที่รอบทิศทางแบบรัศมี',
      'ส่วนล่างสุดเป็นแผ่นฐานแบนเรียกว่า Basal Disc (Pedal Disc) ทำหน้าที่หลั่งเมือกยึดเกาะกับพื้นผิวใต้น้ำ',
      'ในช่วงได้รับอาหารอุดมสมบูรณ์ อาจสังเกตเห็น Bud (ตุ่มหน่อ) งอกยื่นออกมาจากบริเวณ 1/3 ด้านล่างของ Body Column',
    ],
    scientificHighlight:
      'ไฮดราไม่มีส่วนหัว (Cephalization) หรือด้านซ้าย-ขวาที่แท้จริง แต่แบ่งแกนเป็นขั้วปาก (Oral Pole) และขั้วฐาน (Aboral Pole)',
    keyTerms: [
      { en: 'Oral Pole', th: 'ขั้วด้านปาก (Hypostome & Tentacles)' },
      { en: 'Aboral Pole', th: 'ขั้วด้านฐาน (Basal Disc)' },
      { en: 'Cnidocyte Batteries', th: 'ปุ่มกระจุกเซลล์เข็มพิษตามแนวหนวด' },
    ],
  },
  {
    id: 'internal-anatomy',
    order: 4,
    titleEn: 'Internal Anatomy',
    titleTh: 'กายวิภาคศาสตร์ภายใน',
    subtitle: 'Epidermis, Mesoglea, Gastrodermis & Gastrovascular Cavity',
    badgeColor: '#7C3AED',
    summaryPoints: [
      'ผนังลำตัวประกอบด้วยเนื้อเยื่อ 2 ชั้น: ชั้นนอกคือ Epidermis และชั้นในคือ Gastrodermis',
      'คั่นกลางด้วยชั้น Mesoglea ที่บางใสและไม่มีเซลล์ (Acellular Matrix) ประกอบด้วยคอลลาเจนและโปรติโอไกลแคน ทำหน้าที่ยึดเกาะและเป็นตัวกลางให้สารแพร่ผ่าน',
      'ตรงกลางลำตัวเป็นช่อง Gastrovascular Cavity ซึ่งต่อเนื่องเข้าไปในหนวดทุกเส้น ทำหน้าที่ทั้งย่อยอาหาร กระจายสารอาหาร และเป็นโครงกระดูกน้ำ',
      'ทางเดินอาหารเป็นแบบไม่สมบูรณ์ (Incomplete Digestive Tract) มีช่องเปิดเพียงช่องเดียวคือปาก ไม่มีทวารหนัก',
    ],
    scientificHighlight:
      'ช่อง Gastrovascular Cavity ทำหน้าที่แทนทั้ง "ระบบทางเดินอาหาร" และ "ระบบหมุนเวียนสาร" ในโครงสร้างเดียว',
    keyTerms: [
      { en: 'Epidermis', th: 'ชั้นเนื้อเยื่อชั้นนอกป้องกันและรับสัมผัส' },
      { en: 'Mesoglea', th: 'ชั้นวุ้นคอลลาเจนบาง ๆ ไร้เซลล์' },
      { en: 'Gastrovascular Cavity', th: 'ช่องย่อยอาหารและโครงกระดูกน้ำ' },
    ],
  },
  {
    id: 'cell-structure',
    order: 5,
    titleEn: 'Cell Structure',
    titleTh: 'โครงสร้างและชนิดของเซลล์',
    subtitle: '8 Specialized Cell Types Working in Harmony',
    badgeColor: '#9333EA',
    summaryPoints: [
      'Epithelio-muscular Cells เป็นเซลล์โครงสร้างหลักใน Epidermis ที่มีเส้นใยหดตัวแนวยาว ส่วนใน Gastrodermis มี Nutritive-muscular Cells ที่มีเส้นใยแนววงรอบและทำหน้าที่ Phagocytosis',
      'Cnidocytes เป็นเซลล์อาวุธเฉพาะทาง ขณะที่ Sensory Cells และ Nerve Cells สร้างโครงข่ายประสาท Nerve Net ทั่วลำตัว',
      'Gland Cells ใน Gastrodermis สังเคราะห์และหลั่งเอนไซม์ย่อยอาหารเข้าสู่ช่องว่างลำตัว',
      'Interstitial Cells (I-cells) เป็นเซลล์ต้นกำเนิด Multipotent ที่สร้าง Cnidocytes, Nerve, Gland และ Germ Cells ส่วนเซลล์เยื่อบุชั้นนอกและชั้นในแบ่งตัวทดแทนสายพันธุ์ตัวเองแยกอิสระ',
    ],
    scientificHighlight:
      'ไฮดราดำรงชีวิตด้วยเซลล์ต้นกำเนิด 3 สายพันธุ์ที่แยกจากกัน: Epidermal epithelial, Gastrodermal epithelial และ I-cells',
    keyTerms: [
      { en: 'Myonemes', th: 'เส้นใยหดตัวบริเวณฐานเซลล์เยื่อบุ' },
      { en: 'Nerve Net', th: 'ร่างแหเซลล์ประสาทไร้สมองส่วนกลาง' },
      { en: 'I-cells', th: 'เซลล์ต้นกำเนิด Multipotent ในชั้น Epidermis' },
    ],
  },
  {
    id: 'nematocyst-mechanism',
    order: 6,
    titleEn: 'Nematocyst Mechanism',
    titleTh: 'กลไกการทำงานของเข็มพิษ',
    subtitle: 'Ultrafast Osmotic Discharge & Functional Diversity',
    badgeColor: '#DC2626',
    summaryPoints: [
      'ต้องแยกให้ชัดเจนว่า Cnidocyte คือ "เซลล์" ส่วน Nematocyst คือ "ออร์แกเนลล์แคปซูลเข็มพิษ" ที่อยู่ภายในเซลล์',
      'การกระตุ้นต้องอาศัยสิ่งเร้าทางกล (การสัมผัส Cnidocil) ร่วมกับสิ่งเร้าทางเคมี เพื่อป้องกันการยิงผิดพลาด',
      'แรงดันออสโมติกพุ่งสูง ~150 atm ดันให้ฝา Operculum เปิดและเส้นท่อขดเกลียวพลิกกลับด้าน (Eversion) พุ่งออกในระดับไมโคร-นาโนวินาที',
      'ไฮดรามี Nematocyst 4 ชนิดหลัก ไม่ใช่ทุกชนิดที่ฉีดพิษ: Stenoteles เจาะและฉีดพิษ, Desmonemes พันรัดเหยื่อ, Holotrichous & Atrichous Isorhizas ใช้ยึดเกาะ/ป้องกันตัว',
    ],
    scientificHighlight:
      'Cnidocyte ยิงเข็มพิษได้เพียงครั้งเดียวต่อหนึ่งเซลล์ จากนั้นจะถูกกำจัดและแทนที่ด้วยเซลล์ใหม่ที่เคลื่อนที่มาจากลำตัว',
    keyTerms: [
      { en: 'Cnidocil', th: 'โครงสร้างรับสัมผัสตัวจุดชนวน' },
      { en: 'Operculum', th: 'ฝาปิดแคปซูลแรงดันสูง' },
      { en: 'Stenotele vs Desmoneme', th: 'ชนิดเจาะฉีดพิษ เทียบกับชนิดบ่วงพันรัดไร้พิษ' },
    ],
  },
  {
    id: 'feeding-digestion',
    order: 7,
    titleEn: 'Feeding and Digestion',
    titleTh: 'ระบบการกินและการย่อยอาหาร',
    subtitle: 'Extracellular + Intracellular Two-Step Digestion',
    badgeColor: '#EA580C',
    summaryPoints: [
      'เริ่มต้นจากเหยื่อสัมผัสหนวด เกิดการยิง Nematocyst จนเหยื่อเป็นอัมพาต หนวดจึงม้วนส่งเหยื่อเข้าสู่ปาก',
      'ระดับที่ 1 (Extracellular Digestion): Gland Cells หลั่งเอนไซม์เข้าสู่ Gastrovascular Cavity เพื่อย่อยโมเลกุลขนาดใหญ่ภายนอกเซลล์',
      'ระดับที่ 2 (Intracellular Digestion): Nutritive-muscular Cells กลืนอนุภาคอาหารที่ถูกย่อยบางส่วนด้วย Phagocytosis เกิดเป็น Food Vacuole แล้วรวมกับ Lysosome เพื่อย่อยต่อจนสมบูรณ์',
      'กากอาหารที่ไม่ย่อย (เช่น เปลือกไรน้ำ) จะถูกบีบขับออกทางปาก (Egestion) ซึ่งเป็นช่องเปิดเดียวของร่างกาย',
    ],
    scientificHighlight:
      'สาร Glutathione ที่รั่วออกมาจากแผลของเหยื่อเป็นสัญญาณเคมีสำคัญที่กระตุ้นให้ไฮดราอ้าปากและงอหนวดเข้าหาศูนย์กลาง',
    keyTerms: [
      { en: 'Extracellular Digestion', th: 'การย่อยภายนอกเซลล์ในช่อง Gastrovascular Cavity' },
      { en: 'Intracellular Digestion', th: 'การย่อยภายใน Food Vacuole ด้วย Lysosome' },
      { en: 'Egestion', th: 'การขับกากอาหารออกทางช่องปากเดิม' },
    ],
  },
  {
    id: 'enzyme-secretion',
    order: 8,
    titleEn: 'Enzyme Secretion',
    titleTh: 'การหลั่งเอนไซม์ย่อยอาหาร',
    subtitle: 'Zymogen Synthesis, Exocytosis & Hydrolysis',
    badgeColor: '#DB2777',
    summaryPoints: [
      'Enzymatic Gland Cells ในชั้น Gastrodermis มี Rough ER และ Golgi Apparatus พัฒนาสูงเพื่อสร้างเอนไซม์โปรติเอสและไลเปส',
      'เอนไซม์ถูกบรรจุในถุง Secretory Vesicles (Zymogen Granules) และเคลื่อนไปหลั่งออกด้านยอดด้วยกระบวนการ Exocytosis',
      'เอนไซม์แพร่เข้าสู่ช่อง Gastrovascular Cavity และถูกคลุกเคล้าด้วยแรงโบกพัดของ Flagella บนเซลล์ Nutritive-muscular',
      'เมื่อย่อยเหยื่อแตกตัวเป็นโพลีเพปไทด์และชิ้นส่วนขนาดเล็กแล้ว การย่อยขั้นสุดท้ายจะดำเนินต่อภายในเซลล์ด้วยเอนไซม์ของ Lysosome',
    ],
    scientificHighlight:
      'การทำงานร่วมกันระหว่างเอนไซม์นอกเซลล์ (Gland Cells) และเอนไซม์ในไลโซโซม (Nutritive Cells) ช่วยให้ย่อยโปรตีนและไขมันได้อย่างมีประสิทธิภาพ',
    keyTerms: [
      { en: 'Zymogen Granules', th: 'ถุงบรรจุเอนไซม์พร้อมหลั่ง' },
      { en: 'Exocytosis', th: 'การหลั่งสารออกนอกเซลล์ผ่านการหลอมรวมเยื่อหุ้ม' },
      { en: 'Lysosomal Hydrolysis', th: 'การสลายสารอาหารต่อภายในเซลล์' },
    ],
  },
  {
    id: 'excretion',
    order: 9,
    titleEn: 'Excretion',
    titleTh: 'ระบบขับถ่ายและการแพร่',
    subtitle: 'No Excretory Organs — Ammonia Removal by Diffusion',
    badgeColor: '#0EA5E9',
    summaryPoints: [
      'ไฮดราไม่มีอวัยวะขับถ่ายเฉพาะทาง ไม่มีไต ไม่มี Protonephridia และไม่มีท่อขับถ่ายใด ๆ',
      'ของเสียไนโตรเจนหลักคือ แอมโมเนีย (NH₃) ซึ่งเกิดจากการสลายโปรตีนและกรดอะมิโน (จัดเป็นสัตว์กลุ่ม Ammonotelic)',
      'แอมโมเนียและของเสียที่ละลายน้ำได้แพร่ผ่านเยื่อหุ้มเซลล์ออกจาก Epidermis สู่แหล่งน้ำจืดภายนอกโดยตรง',
      'ในทำนองเดียวกัน ก๊าซออกซิเจน (O₂) และคาร์บอนไดออกไซด์ (CO₂) รวมถึงของเสียจาก Gastrodermis จะแพร่ผ่านพื้นผิวและน้ำในช่องลำตัวตลอดเวลา',
    ],
    scientificHighlight:
      'ด้วยสัดส่วนพื้นที่ผิวต่อปริมาตรที่สูงมากและความหนาผนังเพียง 2 ชั้น การแพร่ (Diffusion) จึงเพียงพอต่อทั้งการหายใจและการขับถ่าย',
    keyTerms: [
      { en: 'Diffusion', th: 'การแพร่ของสารจากความเข้มข้นสูงไปต่ำ' },
      { en: 'Ammonotelic', th: 'สิ่งมีชีวิตที่ขับถ่ายของเสียไนโตรเจนในรูปแอมโมเนีย' },
      { en: 'Surface Area-to-Volume', th: 'อัตราส่วนพื้นที่ผิวต่อปริมาตรสูง' },
    ],
  },
  {
    id: 'regeneration',
    order: 10,
    titleEn: 'Regeneration',
    titleTh: 'ความสามารถในการงอกใหม่',
    subtitle: 'Morphallaxis, Wnt Signaling & 3 Stem Cell Lineages',
    badgeColor: '#8B5CF6',
    summaryPoints: [
      'ไฮดราขึ้นชื่อเรื่องความสามารถในการงอกใหม่สูงมาก (แม้ตัดลำตัวเป็นท่อนเล็ก ๆ หรือปั่นแยกเซลล์แล้วรวมกลุ่มใหม่ก็สามารถจัดเรียงเป็นตัวสมบูรณ์ได้)',
      'อาศัยกระบวนการ Morphallaxis เป็นหลัก คือการจัดระเบียบและปรับเปลี่ยนหน้าที่ของเซลล์ที่มีอยู่เดิมเพื่อสร้างสัดส่วนร่างกายใหม่',
      'สัญญาณ Wnt/β-catenin บริเวณแผลด้านบนกระตุ้นให้เกิด Head Organizer สำหรับสร้าง Hypostome และ Tentacles',
      'Interstitial Cells (I-cells) มีบทบาทสำคัญในการสร้างเซลล์ประสาท เซลล์เข็มพิษ และเซลล์ต่อมใหม่ แต่ไม่ใช่เซลล์ชนิดเดียวที่สร้างทุกส่วน เพราะสายพันธุ์เซลล์เยื่อบุ Epidermal และ Gastrodermal ต่างแบ่งตัวซ่อมแซมสายพันธุ์ของตนเองแยกอิสระ',
    ],
    scientificHighlight:
      'เพราะเหตุนี้ไฮดราจึงถูกขนานนามว่า "The Immortal Freshwater Polyp" เนื่องจากเซลล์ต้นกำเนิดทั้ง 3 สายพันธุ์หมุนเวียนทดแทนตัวเองได้อย่างต่อเนื่องโดยไม่เสื่อมชรา',
    keyTerms: [
      { en: 'Morphallaxis', th: 'การงอกใหม่โดยจัดระเบียบเนื้อเยื่อเดิมใหม่' },
      { en: 'Head Organizer (Wnt)', th: 'ศูนย์ส่งสัญญาณกำหนดขั้วหัว' },
      { en: '3 Stem Cell Lineages', th: 'สายเซลล์ต้นกำเนิด 3 กลุ่มแยกกัน' },
    ],
  },
  {
    id: 'reproduction',
    order: 11,
    titleEn: 'Reproduction',
    titleTh: 'การสืบพันธุ์',
    subtitle: 'Asexual Budding & Sexual Gametes with Dormant Cyst',
    badgeColor: '#EC4899',
    summaryPoints: [
      'การสืบพันธุ์แบบไม่อาศัยเพศ (Budding): เกิดตุ่มหน่อบริเวณลำตัวล่าง เมื่อได้รับอาหารเพียงพอ หน่อจะสร้างหนวด ปาก และหลุดออกเป็นตัวใหม่ที่มีพันธุกรรมเหมือนตัวแม่',
      'การสืบพันธุ์แบบอาศัยเพศ (Sexual Reproduction): เกิดขึ้นเมื่ออุณหภูมิลดต่ำหรือขาดแคลนอาหาร โดย I-cells สร้างอัณฑะ (Testes) และรังไข่ (Ovary) ชั่วคราวในชั้น Epidermis',
      'อสุจิว่ายน้ำไปปฏิสนธิกับไข่ที่ติดอยู่บนตัวแม่ เกิดเป็นไซโกตที่มีความหลากหลายทางพันธุกรรม',
      'ตัวอ่อนสร้างเปลือกหนา (Embryotheca) ห่อหุ้มเพื่อจำศีลผ่านฤดูหนาวหรือความแห้งแล้ง แล้วฟักเป็นไฮดราตัวใหม่เมื่อสภาวะเหมาะสม',
    ],
    scientificHighlight:
      'การสลับใช้ทั้ง Budding (ขยายพันธุ์รวดเร็วในภาวะปกติ) และ Sexual Reproduction (สร้างเกราะพักตัวในภาวะวิกฤต) ช่วยให้ประชากรไฮดราอยู่รอดได้ในธรรมชาติ',
    keyTerms: [
      { en: 'Budding', th: 'การแตกหน่อแบบไม่อาศัยเพศ' },
      { en: 'Transient Gonads', th: 'อวัยวะสืบพันธุ์ที่เกิดขึ้นชั่วคราว' },
      { en: 'Embryotheca', th: 'เปลือกแข็งหุ้มตัวอ่อนระยะพักตัว' },
    ],
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // 1. Classification
  {
    id: 'q-class-1',
    topicId: 'classification',
    question: 'ไฮดราจัดอยู่ในไฟลัมและคลาสใดตามหลักอนุกรมวิธาน?',
    options: [
      'Phylum Platyhelminthes, Class Turbellaria',
      'Phylum Cnidaria, Class Hydrozoa',
      'Phylum Cnidaria, Class Scyphozoa',
      'Phylum Porifera, Class Calcarea',
    ],
    correctIndex: 1,
    explanation: 'ไฮดราอยู่ใน Phylum Cnidaria (มีเซลล์เข็มพิษ) และ Class Hydrozoa โดยเป็นโพลิปน้ำจืดที่ไม่มีระยะ Medusa',
  },
  {
    id: 'q-class-2',
    topicId: 'classification',
    question: 'ลักษณะการจัดเรียงเนื้อเยื่อของไฮดราเป็นแบบใด?',
    options: [
      'Triploblastic มีเนื้อเยื่อ 3 ชั้นแท้จริง',
      'Diploblastic มีเนื้อเยื่อ 2 ชั้นคือ Epidermis และ Gastrodermis',
      'ไม่มีเนื้อเยื่อแท้จริง (Parazoa)',
      'มีช่องตัวแท้จริงแบบ Coelomate',
    ],
    correctIndex: 1,
    explanation: 'ไฮดราเป็นสัตว์กลุ่ม Diploblastic มีเนื้อเยื่อ 2 ชั้นคั่นด้วยชั้นวุ้น Mesoglea ที่ไม่มีเซลล์',
  },
  {
    id: 'q-class-3',
    topicId: 'classification',
    question: 'วงจรชีวิตของไฮดราแตกต่างจากแมงกะพรุนทะเลส่วนใหญ่อย่างไร?',
    options: [
      'ไฮดรามีเฉพาะระยะ Medusa เท่านั้น',
      'ไฮดราดำรงชีวิตในระยะ Polyp เท่านั้น ไม่มีระยะ Medusa',
      'ไฮดรามีสมมาตรแบบ Bilateral ตลอดชีวิต',
      'ไฮดราอาศัยอยู่ในทะเลน้ำลึกเท่านั้น',
    ],
    correctIndex: 1,
    explanation: 'ไฮดราสูญเสียระยะ Medusa ไปในสายวิวัฒนาการ จึงพบเฉพาะรูปร่างทรงกระบอกแบบ Polyp ตลอดชีวิต',
  },
  // 2. Habitat
  {
    id: 'q-hab-1',
    topicId: 'habitat',
    question: 'แหล่งอาศัยตามธรรมชาติที่เหมาะสมต่อการดำรงชีวิตของไฮดราคือข้อใด?',
    options: [
      'น้ำทะเลความเค็มสูงบริเวณแนวปะการัง',
      'น้ำจืดสะอาด เย็น มีออกซิเจนสูง และมีพืชน้ำให้ยึดเกาะ',
      'บ่อน้ำเสียที่มีสารอินทรีย์เน่าเปื่อยเข้มข้น',
      'ดินชื้นบนบกใต้กองใบไม้',
    ],
    correctIndex: 1,
    explanation: 'ไฮดราอาศัยในแหล่งน้ำจืดสะอาดที่มีออกซิเจนละลายเพียงพอ และใช้ Basal Disc ยึดเกาะพืชน้ำหรือหินจมน้ำ',
  },
  {
    id: 'q-hab-2',
    topicId: 'habitat',
    question: 'สิ่งมีชีวิตชนิดใดที่มักเป็นเหยื่อหลักของไฮดราในระบบนิเวศน้ำจืด?',
    options: [
      'ไรน้ำ (Daphnia) และโคพีพอดขนาดเล็ก',
      'ปลากินพืชขนาดใหญ่',
      'สาหร่ายสีน้ำตาลขนาดใหญ่',
      'หอยฝาเดียวขนาดใหญ่',
    ],
    correctIndex: 0,
    explanation: 'ไฮดราเป็นผู้ล่าขนาดเล็กที่จับไรน้ำ (Daphnia), โคพีพอด และตัวอ่อนสัตว์น้ำขนาดเล็กที่ว่ายผ่านหนวด',
  },
  {
    id: 'q-hab-3',
    topicId: 'habitat',
    question: 'เหตุใดไฮดราพันธุ์ Hydra viridissima จึงมีลำตัวสีเขียวสด?',
    options: [
      'เพราะสร้างคลอโรฟิลล์ได้เองในนิวเคลียส',
      'เพราะมีสาหร่ายเซลล์เดียว Chlorella อาศัยแบบพึ่งพากันในชั้น Gastrodermis',
      'เพราะกินแต่ตะไคร่น้ำเป็นอาหารหลัก',
      'เพราะสารพิษใน Nematocyst มีสีเขียว',
    ],
    correctIndex: 1,
    explanation: 'Hydra viridissima มีสาหร่าย Chlorella เป็น Endosymbiont ภายในเซลล์ Gastrodermis คอยสังเคราะห์แสงให้สารอาหารบางส่วน',
  },
  // 3. External Morphology
  {
    id: 'q-ext-1',
    topicId: 'external-morphology',
    question: 'โครงสร้างรูปกรวยที่ยอดลำตัวซึ่งมีช่องปากเปิดอยู่และล้อมรอบด้วยหนวดเรียกว่าอะไร?',
    options: ['Basal Disc', 'Mesoglea', 'Hypostome', 'Budding Zone'],
    correctIndex: 2,
    explanation: 'Hypostome คือบริเวณรูปกรวยยอดสุดของลำตัว มีช่องปากเปิดอยู่ตรงกลางและล้อมรอบด้วยวงหนวด (Tentacles)',
  },
  {
    id: 'q-ext-2',
    topicId: 'external-morphology',
    question: 'Basal Disc ทำหน้าที่หลักอย่างไร?',
    options: [
      'ขับกากอาหารที่ไม่ย่อยออกนอกร่างกาย',
      'ยึดเกาะพื้นผิวใต้น้ำด้วยเมือกเหนียวจาก Pedal Gland Cells',
      'ยิงเข็มพิษจับไรน้ำ',
      'หลั่งเอนไซม์ย่อยโปรตีน',
    ],
    correctIndex: 1,
    explanation: 'Basal Disc (Pedal Disc) มีเซลล์ต่อมสร้างเมือกเหนียวเพื่อยึดเกาะลำตัวกับพืชน้ำหรือหินใต้น้ำ',
  },
  {
    id: 'q-ext-3',
    topicId: 'external-morphology',
    question: 'ข้อใดกล่าวถึงหนวด (Tentacles) ของไฮดราได้ถูกต้อง?',
    options: [
      'เป็นแท่งตันไม่มีช่องว่างภายใน',
      'มีลักษณะเป็นท่อกลวงที่เชื่อมต่อกับช่อง Gastrovascular Cavity และเรียงด้วยกลุ่ม Cnidocytes',
      'ใช้สำหรับขับถ่ายแอมโมเนียเป็นหลัก',
      'มีจำนวนคงที่ 2 เส้นเสมอ',
    ],
    correctIndex: 1,
    explanation: 'หนวดของไฮดรามี 5–8 เส้น เป็นโครงสร้างกลวงเชื่อมต่อกับ Gastrovascular Cavity และมี Cnidocytes หนาแน่น',
  },
  // 4. Internal Anatomy
  {
    id: 'q-int-1',
    topicId: 'internal-anatomy',
    question: 'ชั้นใดคั่นอยู่ระหว่าง Epidermis และ Gastrodermis และมีลักษณะอย่างไร?',
    options: [
      'Mesoderm ที่มีกล้ามเนื้อเรียบหนาแน่น',
      'Mesoglea ซึ่งเป็นชั้นสารคล้ายวุ้นใสบาง ๆ ที่ไม่มีเซลล์เป็นโครงสร้างหลัก',
      'Coelom ที่เต็มไปด้วยเลือด',
      'Endothelium ที่สร้างเม็ดเลือดแดง',
    ],
    correctIndex: 1,
    explanation: 'Mesoglea เป็นชั้นเมทริกซ์นอกเซลล์ (Acellular ECM) คล้ายวุ้นบาง ๆ คั่นกลางระหว่าง Epidermis และ Gastrodermis',
  },
  {
    id: 'q-int-2',
    topicId: 'internal-anatomy',
    question: 'ข้อใดถูกต้องเกี่ยวกับทางเดินอาหารของไฮดรา?',
    options: [
      'เป็นทางเดินอาหารสมบูรณ์ มีปากรับอาหารและทวารหนักที่ฐาน',
      'Gastrovascular Cavity มีช่องเปิดเพียงช่องเดียวคือปาก ทำหน้าที่ทั้งรับอาหารและขับกากอาหาร',
      'อาหารไม่ผ่านเข้าสู่ช่องลำตัว แต่ย่อยที่หนวดทั้งหมด',
      'มีลำไส้เล็กสำหรับดูดซึมแยกจากกระเพาะอาหาร',
    ],
    correctIndex: 1,
    explanation: 'ไฮดรามีทางเดินอาหารแบบไม่สมบูรณ์ ช่อง Gastrovascular Cavity มีทางเปิดเพียงช่องเดียวตรง Mouth',
  },
  {
    id: 'q-int-3',
    topicId: 'internal-anatomy',
    question: 'นอกจากย่อยอาหารแล้ว Gastrovascular Cavity ยังมีบทบาทสำคัญอีกข้อหนึ่งคืออะไร?',
    options: [
      'สร้างอสุจิและไข่',
      'ทำหน้าที่เป็นโครงกระดูกน้ำ (Hydrostatic Skeleton) และกระจายสารอาหาร',
      'ผลิตเม็ดเลือดขาว',
      'สร้างเปลือกไคตินหุ้มลำตัว',
    ],
    correctIndex: 1,
    explanation: 'เมื่อปากปิด ของเหลวในช่อง Gastrovascular Cavity จะช่วยพยุงร่างกายเป็น Hydrostatic Skeleton ให้กล้ามเนื้อเยื่อบุออกแรงต้านได้',
  },
  // 5. Cell Structure
  {
    id: 'q-cell-1',
    topicId: 'cell-structure',
    question: 'ความแตกต่างระหว่าง Epithelio-muscular cells ใน Epidermis กับเซลล์ใน Gastrodermis คือข้อใด?',
    options: [
      'ใน Epidermis มีเส้นใยหดตัวตามแนวยาว (Longitudinal) ทำให้ตัวสั้นลง ส่วนใน Gastrodermis เรียงแนววงรอบ (Circular) และช่วยย่อยอาหารด้วย',
      'ใน Epidermis ไม่มีเส้นใยหดตัวเลย',
      'ใน Gastrodermis ทำหน้าที่ยิงเข็มพิษแทนการย่อยอาหาร',
      'ทั้งสองชั้นมีแฟลกเจลลาโบกพัดเหมือนกัน',
    ],
    correctIndex: 0,
    explanation: 'Epidermal epithelio-muscular cells วางเส้นใยตามแนวยาวช่วยหดตัวสั้น ส่วน Gastrodermal nutritive-muscular cells วางแนววงรอบช่วยยืดตัวและทำ Phagocytosis',
  },
  {
    id: 'q-cell-2',
    topicId: 'cell-structure',
    question: 'เซลล์ต้นกำเนิดชนิดใดในชั้น Epidermis ที่สามารถเปลี่ยนสภาพเป็น Cnidocytes, Nerve Cells และ Germ Cells ได้?',
    options: [
      'Gland Cells',
      'Interstitial Cells (I-cells)',
      'Nutritive-muscular Cells',
      'Sensory Cells',
    ],
    correctIndex: 1,
    explanation: 'Interstitial Cells (I-cells) เป็น Multipotent Stem Cells ที่คอยเติมเต็มเซลล์เฉพาะทาง ได้แก่ Cnidocytes, Nerve, Gland และ Germ Cells',
  },
  {
    id: 'q-cell-3',
    topicId: 'cell-structure',
    question: 'ระบบประสาทของไฮดรามีโครงสร้างอย่างไร?',
    options: [
      'มีสมองขนาดเล็กอยู่ภายใน Hypostome',
      'มีไขสันหลังทอดยาวตลอด Body Column',
      'เป็นร่างแหเซลล์ประสาท (Nerve Net) กระจายทั่วร่างกาย ไม่มีสมองส่วนกลาง',
      'ไม่มีเซลล์ประสาท ใช้ฮอร์โมนอย่างเดียว',
    ],
    correctIndex: 2,
    explanation: 'ไฮดราใช้ Nerve Net ซึ่งเชื่อมต่อเซลล์ประสาทเป็นตาข่ายแบบกระจายโดยไม่มีสมองหรือปมประสาทส่วนกลาง',
  },
  // 6. Nematocyst
  {
    id: 'q-nem-1',
    topicId: 'nematocyst-mechanism',
    question: 'ข้อใดกล่าวถึงความสัมพันธ์ระหว่าง Cnidocyte และ Nematocyst ได้ถูกต้องที่สุด?',
    options: [
      'Cnidocyte คือออร์แกเนลล์ ส่วน Nematocyst คือเซลล์',
      'Cnidocyte คือ "ตัวเซลล์" ส่วน Nematocyst คือ "ออร์แกเนลล์แคปซูล" ที่บรรจุอยู่ภายในเซลล์นั้น',
      'ทั้งสองคำมีความหมายเหมือนกันทุกประการ',
      'Nematocyst เป็นแบคทีเรียที่อาศัยอยู่ในตัวไฮดรา',
    ],
    correctIndex: 1,
    explanation: 'Cnidocyte เป็นเซลล์เฉพาะทางทั้งเซลล์ ขณะที่ Nematocyst เป็นออร์แกเนลล์ภายในไซโทพลาซึมของ Cnidocyte',
  },
  {
    id: 'q-nem-2',
    topicId: 'nematocyst-mechanism',
    question: 'Nematocyst ชนิดใดที่ไม่ฉีดสารพิษ แต่ใช้เส้นท่อม้วนพันรัดขนหรือระยางค์ของเหยื่อ?',
    options: ['Stenotele', 'Desmoneme', 'Toxinocyte', 'Operculocyte'],
    correctIndex: 1,
    explanation: 'Desmoneme (Volvent) ไม่มีสารพิษและปลายท่อปิดสนิท ทำหน้าที่ขดม้วนพันรัดขนแข็งของเหยื่อ ไม่ใช่ทุกเข็มพิษที่จะฉีดสารพิษ',
  },
  {
    id: 'q-nem-3',
    topicId: 'nematocyst-mechanism',
    question: 'โครงสร้างใดของ Cnidocyte ที่ทำหน้าที่รับสัมผัสเพื่อกระตุ้นการเปิดของ Operculum?',
    options: ['Cnidocil', 'Flagellum', 'Food Vacuole', 'Basal Disc'],
    correctIndex: 0,
    explanation: 'Cnidocil เป็นโครงสร้างคล้ายขนแข็งรับสัมผัสเชิงกลที่ทำงานร่วมกับสัญญาณเคมีเพื่อจุดชนวนการยิงแคปซูล',
  },
  // 7. Feeding & Digestion
  {
    id: 'q-dig-1',
    topicId: 'feeding-digestion',
    question: 'ลำดับการย่อยอาหารในไฮดราเกิดขึ้นอย่างไร?',
    options: [
      'ย่อยภายในเซลล์ก่อน แล้วจึงย่อยภายนอกเซลล์',
      'ย่อยภายนอกเซลล์ (Extracellular) ในช่อง Gastrovascular Cavity ก่อน แล้วจึงย่อยภายในเซลล์ (Intracellular) ใน Nutritive-muscular cells',
      'ย่อยภายนอกเซลล์เพียงอย่างเดียวเหมือนสัตว์มีกระดูกสันหลัง',
      'ดูดซึมเหยื่อทั้งตัวเข้าในนิวเคลียสโดยตรง',
    ],
    correctIndex: 1,
    explanation: 'ไฮดราใช้การย่อย 2 ระดับ: เริ่มด้วย Extracellular Digestion ในช่องลำตัว แล้ว Nutritive-muscular cells จับชิ้นส่วนเข้ามาย่อยต่อแบบ Intracellular',
  },
  {
    id: 'q-dig-2',
    topicId: 'feeding-digestion',
    question: 'กระบวนการใดที่ Nutritive-muscular cells ใช้กลืนกินอนุภาคอาหารเข้าสู่ภายในเซลล์?',
    options: ['Exocytosis', 'Phagocytosis', 'Osmosis', 'Mitosis'],
    correctIndex: 1,
    explanation: 'Nutritive-muscular cells ยื่นเท้าเทียมโอบล้อมอนุภาคอาหารด้วยกระบวนการ Phagocytosis เกิดเป็น Food Vacuole',
  },
  {
    id: 'q-dig-3',
    topicId: 'feeding-digestion',
    question: 'กากอาหารที่ไม่สามารถย่อยได้ เช่น เปลือกไคตินของไรน้ำ จะถูกกำจัดออกจากร่างกายทางใด?',
    options: [
      'ขับออกทาง Basal Disc',
      'ขับออกทางช่องเปิดปาก (Mouth) เพียงช่องเดียว',
      'แพร่ผ่านชั้น Epidermis ออกสู่น้ำ',
      'สะสมไว้ใน Mesoglea ตลอดชีวิต',
    ],
    correctIndex: 1,
    explanation: 'เนื่องจากไม่มีทวารหนัก กากอาหารที่เหลือจึงถูกบีบขับย้อนออกทางปากเดิม (Egestion)',
  },
  // 8. Enzyme Secretion
  {
    id: 'q-enz-1',
    topicId: 'enzyme-secretion',
    question: 'เซลล์ชนิดใดเป็นผู้หลั่งเอนไซม์เข้าสู่ Gastrovascular Cavity เพื่อเริ่มการย่อยภายนอกเซลล์?',
    options: [
      'Interstitial Cells ใน Epidermis',
      'Gland Cells ใน Gastrodermis',
      'Nerve Cells ใน Mesoglea',
      'Germ Cells ใน Ovary',
    ],
    correctIndex: 1,
    explanation: 'Enzymatic Gland Cells ในชั้น Gastrodermis สังเคราะห์ถุง Zymogen และหลั่งเอนไซม์ออกทาง Exocytosis สู่ช่องลำตัว',
  },
  {
    id: 'q-enz-2',
    topicId: 'enzyme-secretion',
    question: 'ออร์แกเนลล์ใดที่รวมตัวกับ Food Vacuole เพื่อย่อยอาหารต่อภายใน Nutritive-muscular cell?',
    options: ['Lysosome', 'Cnidocil', 'Chloroplast', 'Centriole'],
    correctIndex: 0,
    explanation: 'Lysosome นำเอนไซม์ย่อยสลายภายในเซลล์เข้ามารวมตัวกับ Food Vacuole เพื่อสลายอนุภาคอาหารให้เป็นโมเลกุลขนาดเล็ก',
  },
  {
    id: 'q-enz-3',
    topicId: 'enzyme-secretion',
    question: 'Gland Cells ปลดปล่อยเอนไซม์ออกจากเยื่อหุ้มเซลล์ด้วยกลไกใด?',
    options: ['Phagocytosis', 'Exocytosis', 'Active Ion Pump', 'Endocytosis'],
    correctIndex: 1,
    explanation: 'ถุง Secretory Vesicles เคลื่อนที่ไปเชื่อมรวมกับเยื่อหุ้มเซลล์ด้านยอดแล้วปลดปล่อยเอนไซม์ออกสู่ภายนอกด้วยวิธี Exocytosis',
  },
  // 9. Excretion
  {
    id: 'q-exc-1',
    topicId: 'excretion',
    question: 'ไฮดรากำจัดของเสียไนโตรเจน (แอมโมเนีย) ออกจากร่างกายด้วยวิธีใด?',
    options: [
      'กรองผ่านท่อ Malpighian Tubules',
      'ขับออกผ่านโครงสร้างคล้ายไต (Nephridia)',
      'ใช้กระบวนการแพร่ (Diffusion) ผ่านเยื่อหุ้มเซลล์และผิวลำตัวสู่น้ำโดยตรง',
      'เปลี่ยนเป็นกรดยูริกตกผลึกไว้ที่ Basal Disc',
    ],
    correctIndex: 2,
    explanation: 'ไฮดราไม่มีอวัยวะขับถ่ายเฉพาะทาง ของเสียแอมโมเนียจึงแพร่ (Diffusion) ผ่านเยื่อหุ้มเซลล์ออกสู่แหล่งน้ำจืดรอบตัวโดยตรง',
  },
  {
    id: 'q-exc-2',
    topicId: 'excretion',
    question: 'ของเสียไนโตรเจนหลักที่เกิดจากเมแทบอลิซึมของโปรตีนในไฮดราคือสารใด?',
    options: ['ยูเรีย (Urea)', 'แอมโมเนีย (Ammonia)', 'กรดยูริก (Uric Acid)', 'ครีเอตินิน (Creatinine)'],
    correctIndex: 1,
    explanation: 'สัตว์น้ำจืดที่มีความหนาผนังลำตัวบางอย่างไฮดราขับถ่ายแอมโมเนีย (Ammonotelic) ซึ่งละลายน้ำและแพร่ผ่านเมมเบรนได้ดี',
  },
  {
    id: 'q-exc-3',
    topicId: 'excretion',
    question: 'เหตุใดไฮดราจึงไม่จำเป็นต้องมีระบบหายใจหรือระบบขับถ่ายเฉพาะทาง?',
    options: [
      'เพราะไม่เกิดเมแทบอลิซึมในเซลล์',
      'เพราะมีผนังลำตัวบางเพียง 2 ชั้น ทุกเซลล์จึงอยู่ใกล้น้ำภายนอกหรือช่องภายใน ทำให้การแพร่เพียงพอ',
      'เพราะไฮดราไม่ใช้ออกซิเจน',
      'เพราะ Mesoglea ทำหน้าที่สูบฉีดของเหลวแทนหัวใจ',
    ],
    correctIndex: 1,
    explanation: 'เซลล์ทั้งสองชั้นสัมผัสกับน้ำภายนอกหรือน้ำใน Gastrovascular Cavity โดยตรง ระยะทางการแพร่จึงสั้นมาก',
  },
  // 10. Regeneration
  {
    id: 'q-reg-1',
    topicId: 'regeneration',
    question: 'ข้อความใดถูกต้องเกี่ยวกับบทบาทของเซลล์ในการงอกใหม่ (Regeneration) ของไฮดรา?',
    options: [
      'Interstitial Cells (I-cells) เพียงชนิดเดียวสร้างทั้ง Epidermis, Gastrodermis และทุกส่วนของร่างกาย',
      'อาศัยการแบ่งตัวของสายพันธุ์เซลล์ต้นกำเนิด 3 กลุ่มแยกกัน (Epidermal, Gastrodermal และ I-cells) ร่วมกับ Morphallaxis',
      'ไฮดราไม่สามารถงอกใหม่ส่วน Hypostome ได้หากถูกตัดออก',
      'การงอกใหม่เกิดขึ้นเฉพาะในตัวอ่อนเท่านั้น',
    ],
    correctIndex: 1,
    explanation: 'ความเข้าใจที่ถูกต้องทางชีววิทยาคือ ไฮดรามี 3 สายพันธุ์ต้นกำเนิดอิสระต่อกัน: เซลล์เยื่อบุนอกและในแบ่งตัวซ่อมแซมตัวเอง ส่วน I-cells เติมเต็มเซลล์ประสาท เข็มพิษ และต่อม',
  },
  {
    id: 'q-reg-2',
    topicId: 'regeneration',
    question: 'กระบวนการ Morphallaxis ในไฮดราหมายถึงอะไร?',
    options: [
      'การสลายเนื้อเยื่อเดิมทั้งหมดทิ้งไป',
      'การจัดระเบียบและปรับเปลี่ยนสัดส่วนของเซลล์ที่มีอยู่เดิมให้เกิดเป็นโครงสร้างลำตัวใหม่',
      'การลอกคราบเปลือกแข็งด้านนอก',
      'การปฏิสนธิภายในตัวแม่',
    ],
    correctIndex: 1,
    explanation: 'Morphallaxis คือการงอกใหม่โดยจัดระเบียบเนื้อเยื่อเดิมให้สร้างแกนหัว-ฐานและสัดส่วนร่างกายที่สมบูรณ์ขึ้นใหม่',
  },
  {
    id: 'q-reg-3',
    topicId: 'regeneration',
    question: 'สัญญาณชีวเคมีกลุ่มใดที่มีบทบาทหลักในการกำหนดแกนส่วนหัว (Head Organizer) ของ Hypostome?',
    options: ['สัญญาณ Wnt / β-catenin', 'อินซูลิน', 'ฮีโมโกลบิน', 'ไคติเนส'],
    correctIndex: 0,
    explanation: 'ยีนในวิถี Wnt/β-catenin แสดงออกสูงที่ Hypostome ทำหน้าที่เป็น Head Organizer เหนี่ยวนำการสร้างปากและหนวด',
  },
  // 11. Reproduction
  {
    id: 'q-rep-1',
    topicId: 'reproduction',
    question: 'เมื่อสภาพแวดล้อมเหมาะสมและมีอาหารอุดมสมบูรณ์ ไฮดรามักสืบพันธุ์ด้วยวิธีใด?',
    options: [
      'สร้างสปอร์ทนแล้ง',
      'การแตกหน่อ (Budding) แบบไม่อาศัยเพศ',
      'การแบ่งตัวตามขวางแบบพารามีเซียมเท่านั้น',
      'การวางไข่บนบก',
    ],
    correctIndex: 1,
    explanation: 'เมื่ออาหารสมบูรณ์ ไฮดราจะแตกหน่อ (Budding) สร้างตัวใหม่ที่มียีนเหมือนตัวแม่ได้อย่างรวดเร็ว',
  },
  {
    id: 'q-rep-2',
    topicId: 'reproduction',
    question: 'ปัจจัยใดมักกระตุ้นให้ไฮดราเปลี่ยนเข้าสู่การสืบพันธุ์แบบอาศัยเพศ?',
    options: [
      'อุณหภูมิลดต่ำลงหรือสภาพแวดล้อมขาดแคลนอาหาร/เครียด',
      'มีไรน้ำเพิ่มขึ้นจำนวนมากและน้ำอุ่นคงที่',
      'ได้รับแสงสีฟ้าความเข้มต่ำ 10 นาที',
      'Basal Disc ยึดเกาะก้อนกรวด',
    ],
    correctIndex: 0,
    explanation: 'สภาวะเครียด เช่น อุณหภูมิเย็นลงช่วงฤดูหนาวหรือความหนาแน่นสูง กระตุ้นให้เกิด Testes และ Ovary ชั่วคราว',
  },
  {
    id: 'q-rep-3',
    topicId: 'reproduction',
    question: 'โครงสร้าง Embryotheca ที่ห่อหุ้มตัวอ่อนหลังการปฏิสนธิมีประโยชน์อย่างไร?',
    options: [
      'ช่วยให้ตัวอ่อนลอยตัวไปกินเหยื่อทันที',
      'เป็นเกราะป้องกันตัวอ่อนให้ทนทานต่อสภาพอากาศหนาวเย็นและความแห้งแล้งก่อนฟักเป็นตัวใหม่',
      'ใช้สำหรับยิงพิษป้องกันตัวแม่',
      'เป็นส่วนที่จะพัฒนาเป็นกระดูกสันหลัง',
    ],
    correctIndex: 1,
    explanation: 'Embryotheca เป็นเปลือกหนาช่วยปกป้องตัวอ่อนระยะพักตัวให้รอดชีวิตผ่านพ้นช่วงฤดูที่ไม่เหมาะสม',
  },
];

export interface ScientificReference {
  authors: string;
  year: string;
  title: string;
  source: string;
}

export const SCIENTIFIC_REFERENCES: ScientificReference[] = [
  {
    authors: 'Urry, L. A., Cain, M. L., Wasserman, S. A., Minorsky, P. V., & Orr, R. B.',
    year: '2020',
    title: 'Campbell Biology (12th ed.) — Invertebrates & Cnidaria',
    source: 'Pearson Education',
  },
  {
    authors: 'Ruppert, E. E., Fox, R. S., & Barnes, R. D.',
    year: '2004',
    title: 'Invertebrate Zoology: A Functional Evolutionary Approach (7th ed.)',
    source: 'Brooks/Cole — Chapter 7: Cnidaria',
  },
  {
    authors: 'Bosch, T. C. G.',
    year: '2007',
    title: 'Why polyps regenerate and we don’t: Towards a cellular and molecular framework for Hydra regeneration',
    source: 'Developmental Biology, 303(2), 421–433',
  },
  {
    authors: 'Holstein, T., & Tardent, P.',
    year: '1984',
    title: 'An ultrahigh-speed analysis of exocytosis: Nematocyst discharge',
    source: 'Science, 223(4638), 830–833',
  },
  {
    authors: 'Technau, U., & Steele, R. E.',
    year: '2011',
    title: 'Evolutionary crossroads in developmental biology: Cnidaria',
    source: 'Development, 138(8), 1447–1458',
  },
  {
    authors: 'Wittlieb, J., Khalturin, K., Lohmann, J. U., Anton-Erxleben, F., & Bosch, T. C. G.',
    year: '2006',
    title: 'Transgenic Hydra allow in vivo tracking of individual stem cells during morphogenesis',
    source: 'PNAS, 103(16), 6208–6211',
  },
];
