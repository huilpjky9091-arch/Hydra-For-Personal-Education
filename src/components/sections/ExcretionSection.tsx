import React, { useState } from 'react';
import { Droplets, Wind, Ban, ArrowRightLeft } from 'lucide-react';

export const ExcretionSection: React.FC = () => {
  const [waterFlowSpeed, setWaterFlowSpeed] = useState<'normal' | 'fast'>('normal');
  const [showGasExchange, setShowGasExchange] = useState(true);

  const animDuration = waterFlowSpeed === 'fast' ? '1.8s' : '3.4s';

  return (
    <section id="excretion" className="border-t border-slate-200/80 bg-slate-50/70 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 max-w-3xl space-y-3">
          <div className="text-xs font-mono font-semibold uppercase tracking-widest text-sky-700">
            EXHIBIT 06 • EXCRETION & SIMPLE DIFFUSION
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            ระบบขับถ่ายของเสีย (Excretion via Diffusion)
          </h2>

          {/* Required Scientific Callout */}
          <div className="rounded-2xl border border-sky-300 bg-sky-50 px-5 py-4 shadow-xs">
            <p className="text-base font-bold text-sky-950 sm:text-lg">
              “Hydra ไม่มีอวัยวะขับถ่ายเฉพาะทาง แต่ใช้กระบวนการ Diffusion ในการกำจัดของเสีย”
            </p>
            <p className="mt-1 text-xs leading-relaxed text-sky-800 sm:text-sm">
              ไม่มีไต (Kidneys), ไม่มีท่อขับถ่าย (Nephridia) หรืออวัยวะกรองของเสียใด ๆ
              เพราะร่างกายหนาเพียง 2 ชั้นเซลล์ จึงใช้การแพร่โดยตรงผ่านเยื่อหุ้มเซลล์สู่น้ำจืดโดยรอบ
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left 7 cols: Animated Diffusion Simulation */}
          <div className="lg:col-span-7 museum-panel rounded-3xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs font-bold text-slate-800">
                แบบจำลองการแพร่ของแอมโมเนีย (NH₃) และก๊าซผ่านเยื่อหุ้มเซลล์
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="excretion-gas-toggle"
                  onClick={() => setShowGasExchange((g) => !g)}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                    showGasExchange
                      ? 'bg-teal-600 text-white border-teal-600'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  <Wind className="h-3.5 w-3.5" />
                  {showGasExchange ? 'แสดง O₂ / CO₂ ด้วย' : 'แสดงเฉพาะ NH₃'}
                </button>
                <button
                  type="button"
                  id="excretion-flow-toggle"
                  onClick={() => setWaterFlowSpeed((s) => (s === 'normal' ? 'fast' : 'normal'))}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <Droplets className="h-3.5 w-3.5 text-sky-600" />
                  กระแสน้ำ: {waterFlowSpeed === 'fast' ? 'ไหลเร็ว' : 'ปกติ'}
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <svg viewBox="0 0 640 350" className="w-full h-auto" role="img" aria-label="Hydra Ammonia Diffusion Simulation">
                {/* Freshwater Environment (Top) */}
                <rect x="0" y="0" width="640" height="125" fill="#e0f2fe" />
                <text x="20" y="24" fontSize="11" fontWeight="800" fill="#0369a1">
                  FRESHWATER ENVIRONMENT (สิ่งแวดล้อมน้ำจืดภายนอก)
                </text>

                {/* Epidermis Cell Layer */}
                <rect x="0" y="125" width="640" height="82" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
                {[80, 220, 360, 500].map((cx, i) => (
                  <g key={i}>
                    <rect
                      x={cx - 60}
                      y="130"
                      width="120"
                      height="72"
                      rx="10"
                      fill="#ffffff"
                      stroke="#7dd3fc"
                      strokeWidth="1.5"
                    />
                    <circle cx={cx} cy="166" r="14" fill="#7c3aed" opacity="0.22" />
                    <text x={cx - 48} y="148" fontSize="8.5" fontWeight="700" fill="#0c4a6e">
                      Epidermal Cell
                    </text>
                  </g>
                ))}

                {/* Phospholipid Bilayer Membrane highlight */}
                <line x1="0" y1="125" x2="640" y2="125" stroke="#0284c7" strokeWidth="3" strokeDasharray="6 4" />
                <text x="415" y="116" fontSize="9.5" fontWeight="700" fill="#0369a1">
                  เยื่อหุ้มเซลล์ (Plasma Membrane)
                </text>

                {/* Mesoglea & Gastrodermis (Bottom) */}
                <rect x="0" y="207" width="640" height="16" fill="#99f6e4" />
                <text x="20" y="218" fontSize="8.5" fontWeight="700" fill="#0f766e">
                  Mesoglea
                </text>
                <rect x="0" y="223" width="640" height="72" fill="#fdf2f8" stroke="#ec4899" strokeWidth="1.5" />
                <text x="20" y="242" fontSize="9.5" fontWeight="700" fill="#9d174d">
                  Gastrodermis (โปรตีน &amp; กรดอะมิโน → สร้างแอมโมเนีย NH₃)
                </text>

                {/* Gastrovascular Cavity Water */}
                <rect x="0" y="295" width="640" height="55" fill="#f5f3ff" />
                <text x="20" y="325" fontSize="10" fontWeight="800" fill="#6b21a8">
                  GASTROVASCULAR CAVITY WATER (น้ำภายในช่องลำตัว — ระบายออกทางปาก)
                </text>

                {/* Animated NH3 Ammonia Molecules diffusing OUTWARD to Freshwater */}
                {[95, 195, 295, 420, 520].map((mx, idx) => (
                  <g key={`nh3-out-${idx}`}>
                    <circle cx={mx} cy="168" r="8.5" fill="#0284c7">
                      <animate
                        attributeName="cy"
                        values="178;125;42"
                        dur={animDuration}
                        begin={`${idx * 0.45}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="cx"
                        values={`${mx};${mx + 14};${mx + 48}`}
                        dur={animDuration}
                        begin={`${idx * 0.45}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.95;1;0.15"
                        dur={animDuration}
                        begin={`${idx * 0.45}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                    <text x={mx - 8} y="171" fontSize="7.5" fill="#fff" fontWeight="700">
                      <animate
                        attributeName="y"
                        values="181;128;45"
                        dur={animDuration}
                        begin={`${idx * 0.45}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="x"
                        values={`${mx - 8};${mx + 6};${mx + 40}`}
                        dur={animDuration}
                        begin={`${idx * 0.45}s`}
                        repeatCount="indefinite"
                      />
                      NH₃
                    </text>
                  </g>
                ))}

                {/* Animated NH3 diffusing from Gastrodermis into Cavity Water */}
                {[150, 340, 480].map((gx, idx) => (
                  <g key={`nh3-cav-${idx}`}>
                    <circle cx={gx} cy="262" r="7.5" fill="#7c3aed">
                      <animate
                        attributeName="cy"
                        values="262;316"
                        dur={animDuration}
                        begin={`${idx * 0.6}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                ))}

                {/* Optional Gas Exchange (O2 inward, CO2 outward) */}
                {showGasExchange && (
                  <g>
                    {[140, 370].map((ox, idx) => (
                      <g key={`o2-${idx}`}>
                        <circle cx={ox} cy="48" r="7" fill="#0d9488">
                          <animate
                            attributeName="cy"
                            values="45;162"
                            dur={animDuration}
                            begin={`${idx * 0.8}s`}
                            repeatCount="indefinite"
                          />
                        </circle>
                        <text x={ox + 10} y="82" fontSize="9" fontWeight="700" fill="#0f766e">
                          O₂ แพร่เข้า
                        </text>
                      </g>
                    ))}
                    {[255, 560].map((cx, idx) => (
                      <g key={`co2-${idx}`}>
                        <circle cx={cx} cy="162" r="7" fill="#f97316">
                          <animate
                            attributeName="cy"
                            values="166;48"
                            dur={animDuration}
                            begin={`${idx * 0.7}s`}
                            repeatCount="indefinite"
                          />
                        </circle>
                        <text x={cx + 10} y="92" fontSize="9" fontWeight="700" fill="#c2410c">
                          CO₂ แพร่ออก
                        </text>
                      </g>
                    ))}
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Right 5 cols: Key Biological Mechanisms */}
          <div className="lg:col-span-5 space-y-4">
            <div className="museum-panel rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <ArrowRightLeft className="h-5 w-5 text-sky-600" />
                กลไกการกำจัดของเสียและแลกเปลี่ยนก๊าซ
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-bold text-slate-900">
                    1. แหล่งกำเนิดของเสียแอมโมเนีย (Ammonia Production)
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    เกิดจากการสลายโปรตีนและกรดอะมิโนภายในเซลล์ (Deamination) ของทั้ง Epidermis และ Gastrodermis
                    ได้ก๊าซแอมโมเนีย (NH₃ / NH₄⁺) ที่ละลายน้ำได้สูง
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-bold text-slate-900">
                    2. การแพร่ผ่านเยื่อหุ้มเซลล์ (Transmembrane Diffusion)
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    เนื่องจากความเข้มข้นของ NH₃ ภายในเซลล์สูงกว่าน้ำจืดภายนอก แอมโมเนียจึงแพร่ (Passive Diffusion)
                    ผ่านเยื่อหุ้มเซลล์ออกสู่สิ่งแวดล้อมทางน้ำอย่างต่อเนื่องโดยไม่ต้องใช้พลังงาน ATP ในการขับถ่ายแบบกรอง
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-bold text-slate-900">
                    3. พื้นผิวลำตัวและช่องแกสโทรวาสคิวลาร์
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    ของเสียส่วนหนึ่งแพร่ผ่านผิว Epidermis สู่น้ำโดยตรง และอีกส่วนจาก Gastrodermis
                    แพร่เข้าสู่น้ำใน Gastrovascular Cavity ก่อนถูกระบายออกทางปากพร้อมกับการแลกเปลี่ยนก๊าซ O₂ / CO₂
                  </p>
                </div>

                <div className="flex items-start gap-2.5 rounded-2xl border border-rose-200 bg-rose-50/70 p-4 text-xs text-rose-950">
                  <Ban className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                  <div>
                    <span className="font-bold">ข้อควรระวังทางวิทยาศาสตร์: </span>
                    ห้ามเข้าใจผิดว่าไฮดรามีไต ท่อมัลพิเกียน หรือโปรโตเนฟริเดีย (Protonephridia)
                    โครงสร้างเหล่านั้นพบในสัตว์กลุ่มที่ซับซ้อนกว่า ไม่ใช่ในไนดาเรีย
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
