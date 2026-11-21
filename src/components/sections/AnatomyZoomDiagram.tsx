import React from 'react';
import type { AnatomyPart } from '../../data/anatomyData';

interface AnatomyZoomDiagramProps {
  focus: AnatomyPart['diagramFocus'];
  nameEn: string;
}

export const AnatomyZoomDiagram: React.FC<AnatomyZoomDiagramProps> = ({ focus, nameEn }) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50/70 p-3">
      <div className="mb-1.5 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>ENLARGED MICRO-STRUCTURAL VIEW</span>
        <span className="font-semibold text-sky-700">{nameEn}</span>
      </div>

      <svg
        viewBox="0 0 320 155"
        className="h-36 w-full rounded-lg bg-white border border-slate-100"
        role="img"
        aria-label={`ภาพขยายโครงสร้าง ${nameEn}`}
      >
        {/* Cross-section of 2-layer diploblastic wall */}
        {(focus === 'epidermis' ||
          focus === 'mesoglea' ||
          focus === 'gastrodermis' ||
          focus === 'gastrovascular-cavity' ||
          focus === 'body-column') && (
          <g>
            {/* Outer Freshwater */}
            <rect x="0" y="0" width="320" height="32" fill="#f0f9ff" />
            <text x="12" y="20" fontSize="9" fill="#0369a1" fontWeight="600">
              Freshwater Exterior (แหล่งน้ำจืด)
            </text>

            {/* Epidermis Layer */}
            <rect
              x="0"
              y="32"
              width="320"
              height="34"
              fill={focus === 'epidermis' ? '#38bdf8' : '#bae6fd'}
              opacity={focus === 'epidermis' ? 0.92 : 0.72}
            />
            {[20, 60, 100, 140, 180, 220, 260, 300].map((cx) => (
              <g key={cx}>
                <rect x={cx - 18} y="34" width="36" height="30" rx="4" fill="none" stroke="#0284c7" strokeWidth="1" />
                <circle cx={cx} cy="49" r="4" fill="#7c3aed" />
              </g>
            ))}
            <rect x="6" y="40" width="106" height="16" rx="4" fill="#ffffff" opacity="0.88" />
            <text x="12" y="51" fontSize="9.5" fill="#0c4a6e" fontWeight="700">
              Epidermis (ชั้นนอก)
            </text>

            {/* Mesoglea Acellular Layer */}
            <rect
              x="0"
              y="66"
              width="320"
              height="14"
              fill={focus === 'mesoglea' ? '#14b8a6' : '#99f6e4'}
            />
            <rect x="6" y="67" width="136" height="12" rx="3" fill="#ffffff" opacity="0.82" />
            <text x="12" y="76" fontSize="8.5" fill="#0f766e" fontWeight="700">
              Mesoglea (ชั้นวุ้นไร้เซลล์)
            </text>

            {/* Gastrodermis Layer */}
            <rect
              x="0"
              y="80"
              width="320"
              height="38"
              fill={focus === 'gastrodermis' ? '#ec4899' : '#fbcfe8'}
              opacity={focus === 'gastrodermis' ? 0.9 : 0.78}
            />
            {[20, 60, 100, 140, 180, 220, 260, 300].map((cx) => (
              <g key={`g-${cx}`}>
                <rect x={cx - 18} y="82" width="36" height="34" rx="4" fill="none" stroke="#be185d" strokeWidth="1" />
                <circle cx={cx} cy="98" r="4.5" fill="#9333ea" />
                <path d={`M ${cx} 116 Q ${cx + 5} 124 ${cx - 2} 129`} stroke="#0d9488" strokeWidth="1.2" fill="none" />
              </g>
            ))}
            <rect x="6" y="90" width="154" height="16" rx="4" fill="#ffffff" opacity="0.88" />
            <text x="12" y="101" fontSize="9.5" fill="#831843" fontWeight="700">
              Gastrodermis (ชั้นใน + แฟลกเจลลา)
            </text>

            {/* Gastrovascular Cavity */}
            <rect
              x="0"
              y="118"
              width="320"
              height="37"
              fill={focus === 'gastrovascular-cavity' ? '#ddd6fe' : '#faf5ff'}
            />
            <circle cx="95" cy="137" r="4" fill="#ea580c" opacity="0.7" />
            <circle cx="165" cy="134" r="5" fill="#0d9488" opacity="0.7" />
            <circle cx="240" cy="140" r="3.5" fill="#9333ea" opacity="0.7" />
            <rect x="6" y="128" width="232" height="16" rx="4" fill="#ffffff" opacity="0.88" />
            <text x="12" y="139" fontSize="9.5" fill="#581c87" fontWeight="700">
              Gastrovascular Cavity (ช่องย่อยอาหารและกระจายสารอาหาร)
            </text>
          </g>
        )}

        {/* Hypostome & Mouth Zoom */}
        {(focus === 'hypostome' || focus === 'mouth') && (
          <g>
            <rect x="0" y="0" width="320" height="155" fill="#f8fafc" />
            {/* Tentacle roots */}
            <path d="M 30 95 Q 75 65 110 85" stroke="#38bdf8" strokeWidth="16" strokeLinecap="round" fill="none" />
            <path d="M 290 95 Q 245 65 210 85" stroke="#38bdf8" strokeWidth="16" strokeLinecap="round" fill="none" />
            {/* Hypostome Dome */}
            <path d="M 85 145 L 115 72 Q 160 32 205 72 L 235 145 Z" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
            <path d="M 105 145 L 128 84 Q 160 52 192 84 L 215 145 Z" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.5" />
            {/* Mouth Opening */}
            <ellipse
              cx="160"
              cy="48"
              rx={focus === 'mouth' ? 24 : 14}
              ry={focus === 'mouth' ? 10 : 6}
              fill="#4c1d95"
              stroke="#0ea5e9"
              strokeWidth="2.5"
            />
            {/* Bidirectional Arrow */}
            <path d="M 160 12 L 160 40" stroke="#0284c7" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="180" y="26" fontSize="9" fill="#0369a1" fontWeight="700">
              รับอาหาร / ขับกาก (ทางเดียว)
            </text>
            <text x="125" y="118" fontSize="9.5" fill="#831843" fontWeight="700">
              Hypostome Cone
            </text>
          </g>
        )}

        {/* Tentacles, Cnidocytes, Nematocysts Zoom */}
        {(focus === 'tentacles' || focus === 'cnidocytes' || focus === 'nematocysts') && (
          <g>
            <rect x="0" y="0" width="320" height="155" fill="#fffaf5" />
            {/* Tentacle Epidermis Band */}
            <path d="M 0 110 Q 160 90 320 110 L 320 155 L 0 155 Z" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
            {/* Cnidocyte Host Cell */}
            <ellipse
              cx="160"
              cy="86"
              rx="42"
              ry="34"
              fill={focus === 'cnidocytes' ? '#fed7aa' : '#e0f2fe'}
              stroke="#ea580c"
              strokeWidth={focus === 'cnidocytes' ? 3 : 1.5}
            />
            {/* Cnidocil Trigger */}
            <path d="M 192 60 L 208 32" stroke="#0d9488" strokeWidth="3.5" strokeLinecap="round" />
            <text x="213" y="38" fontSize="8.5" fill="#0f766e" fontWeight="700">
              Cnidocil (รับสัมผัส)
            </text>
            {/* Nematocyst Capsule */}
            <ellipse
              cx="155"
              cy="86"
              rx="22"
              ry="20"
              fill={focus === 'nematocysts' ? '#fecaca' : '#ffedd5'}
              stroke="#dc2626"
              strokeWidth={focus === 'nematocysts' ? 3 : 1.5}
            />
            {/* Coiled Tubule */}
            <path
              d="M 142 84 Q 155 72 168 84 Q 155 96 142 84 Q 155 78 166 90"
              fill="none"
              stroke="#b91c1c"
              strokeWidth="2.5"
            />
            {/* Operculum */}
            <line x1="145" y1="65" x2="168" y2="65" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
            <text x="14" y="32" fontSize="9.5" fill="#9a3412" fontWeight="700">
              Cnidocyte (เซลล์) บรรจุ Nematocyst (ออร์แกเนลล์)
            </text>
            <text x="14" y="138" fontSize="9" fill="#0c4a6e" fontWeight="600">
              Tentacle Epidermis (กระจุก Cnidocyte Battery)
            </text>
          </g>
        )}

        {/* Bud Zoom */}
        {focus === 'bud' && (
          <g>
            <rect x="0" y="0" width="320" height="155" fill="#fdf2f8" />
            {/* Parent wall */}
            <rect x="35" y="15" width="70" height="130" rx="8" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
            <rect x="50" y="25" width="40" height="110" rx="6" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.5" />
            {/* Outgrowing Bud sharing lumen */}
            <path d="M 105 62 L 210 52 L 210 102 L 105 92 Z" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
            <path d="M 90 68 L 195 62 L 195 92 L 90 86 Z" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.5" />
            {/* Bud mini tentacles */}
            <path d="M 210 58 L 245 38" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
            <path d="M 212 72 L 254 68" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
            <path d="M 212 85 L 250 100" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
            <path d="M 210 96 L 240 120" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
            <text x="112" y="34" fontSize="9.5" fill="#9d174d" fontWeight="700">
              Gastrovascular Cavity ของหน่อเชื่อมต่อตัวแม่
            </text>
            <text x="112" y="134" fontSize="9" fill="#0369a1" fontWeight="600">
              หน่อจะคอดกิ่วหลุดออกไปเป็นไฮดราตัวใหม่ (Clone)
            </text>
          </g>
        )}

        {/* Basal Disc Zoom */}
        {focus === 'basal-disc' && (
          <g>
            <rect x="0" y="0" width="320" height="155" fill="#f0fdfa" />
            {/* Rock Substrate */}
            <path d="M 20 124 Q 160 108 300 124 L 300 155 L 20 155 Z" fill="#cbd5e1" />
            {/* Mucous adhesive layer */}
            <rect x="82" y="108" width="156" height="10" rx="5" fill="#14b8a6" opacity="0.6" />
            {/* Basal Disc Epithelium */}
            <path d="M 110 20 L 110 75 Q 92 100 84 108 L 236 108 Q 228 100 210 75 L 210 20 Z" fill="#bae6fd" stroke="#0f766e" strokeWidth="2" />
            {[105, 130, 155, 180, 205].map((gx) => (
              <circle key={gx} cx={gx} cy="95" r="5" fill="#0d9488" />
            ))}
            <text x="90" y="42" fontSize="9.5" fill="#0f766e" fontWeight="700">
              Pedal Gland Cells (สร้างเมือกยึดเกาะ)
            </text>
            <text x="96" y="140" fontSize="9" fill="#334155" fontWeight="700">
              พื้นผิวหิน / พืชน้ำใต้น้ำ
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
