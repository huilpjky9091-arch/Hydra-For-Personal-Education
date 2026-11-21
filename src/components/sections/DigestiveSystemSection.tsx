import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, SkipForward, ArrowRight } from 'lucide-react';
import { DIGESTION_STEPS } from '../../data/physiologyData';

export const DigestiveSystemSection: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0); // 0..7
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= DIGESTION_STEPS.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2200);
    return () => window.clearInterval(timer);
  }, [playing]);

  const currentStep = DIGESTION_STEPS[stepIndex];
  const isLevel1 = currentStep.level === 1;

  return (
    <section id="digestion" className="border-t border-slate-200/80 bg-slate-50/70 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono font-semibold uppercase tracking-widest text-teal-700">
              EXHIBIT 04 • TWO-STAGE DIGESTIVE SYSTEM
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              ระบบการกินและการย่อยอาหาร (Interactive Digestion Simulator)
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              จำลองการทำงานทั้ง 2 ระดับอย่างชัดเจน:{' '}
              <span className="font-semibold text-teal-700">ระดับที่ 1 Extracellular Digestion</span>{' '}
              (สีฟ้า-เขียว) ในช่องแกสโทรวาสคิวลาร์ และ{' '}
              <span className="font-semibold text-purple-700">ระดับที่ 2 Intracellular Digestion</span>{' '}
              (สีม่วง-ชมพู) ภายในเซลล์ Nutritive-muscular พร้อมการขับกากออกทางปากเดิม
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              id="digestion-play-btn"
              onClick={() => {
                if (stepIndex >= DIGESTION_STEPS.length - 1 && !playing) {
                  setStepIndex(0);
                }
                setPlaying((p) => !p);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 cursor-pointer"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {playing ? 'Pause Simulator' : 'Play Digestion Flow'}
            </button>

            <button
              type="button"
              id="digestion-next-btn"
              onClick={() => {
                setPlaying(false);
                setStepIndex((i) => (i + 1) % DIGESTION_STEPS.length);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <SkipForward className="h-4 w-4" />
              Next Step
            </button>

            <button
              type="button"
              id="digestion-reset-btn"
              onClick={() => {
                setPlaying(false);
                setStepIndex(0);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Interactive Animated SVG Diagram */}
          <div className="lg:col-span-7 museum-panel rounded-3xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    isLevel1 ? 'bg-teal-100 text-teal-900' : 'bg-purple-100 text-purple-900'
                  }`}
                >
                  {currentStep.levelLabel}
                </span>
              </div>
              <span className="font-mono text-xs text-slate-500">
                STEP {currentStep.stepNumber} / {DIGESTION_STEPS.length}
              </span>
            </div>

            {/* Dual-Chamber Interactive Visualization */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <svg viewBox="0 0 640 380" className="w-full h-auto" role="img" aria-label="Hydra 2-Stage Digestion Diagram">
                {/* Background Divider: Extracellular vs Intracellular */}
                <rect x="0" y="0" width="335" height="380" fill={isLevel1 ? '#f0fdfa' : '#f8fafc'} />
                <rect x="335" y="0" width="305" height="380" fill={!isLevel1 ? '#faf5ff' : '#f8fafc'} />
                <line x1="335" y1="16" x2="335" y2="364" stroke="#cbd5e1" strokeDasharray="5 5" strokeWidth="1.5" />

                {/* Zone Titles */}
                <text x="18" y="28" fontSize="11" fontWeight="800" fill="#0f766e">
                  LEVEL 1: EXTRACELLULAR DIGESTION
                </text>
                <text x="18" y="43" fontSize="9.5" fill="#0d9488">
                  ภายใน Gastrovascular Cavity (ทางเปิดเดี่ยวตรง Mouth)
                </text>

                <text x="352" y="28" fontSize="11" fontWeight="800" fill="#6b21a8">
                  LEVEL 2: INTRACELLULAR DIGESTION
                </text>
                <text x="352" y="43" fontSize="9.5" fill="#9333ea">
                  ภายใน Nutritive-muscular Cells (Gastrodermis)
                </text>

                {/* LEFT: HYDRA SAC CROSS-SECTION */}
                {/* Outer Epidermis */}
                <path
                  d="M 105 95 L 90 340 L 250 340 L 235 95"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="12"
                  strokeLinejoin="round"
                />
                {/* Inner Gastrodermis */}
                <path
                  d="M 118 105 L 106 326 L 234 326 L 222 105"
                  fill="#fdf2f8"
                  stroke="#ec4899"
                  strokeWidth="10"
                  strokeLinejoin="round"
                />
                {/* Gastrovascular Cavity Lumen */}
                <path d="M 124 108 L 114 318 L 226 318 L 216 108 Z" fill="#f0f9ff" />

                {/* Tentacles */}
                <path
                  d={
                    stepIndex === 1
                      ? 'M 110 95 Q 130 62 162 84'
                      : 'M 110 95 Q 65 55 48 88'
                  }
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d={
                    stepIndex === 1
                      ? 'M 230 95 Q 205 62 178 84'
                      : 'M 230 95 Q 275 55 292 88'
                  }
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="10"
                  strokeLinecap="round"
                />

                {/* Mouth Aperture */}
                <ellipse
                  cx="170"
                  cy="98"
                  rx={stepIndex === 1 || stepIndex === 7 ? 32 : 12}
                  ry="8"
                  fill="#4c1d95"
                  stroke="#0284c7"
                  strokeWidth="2.5"
                />
                <text x="148" y="76" fontSize="9.5" fontWeight="700" fill="#1e3a8a">
                  Mouth (ทางเดียว)
                </text>

                {/* Gland Cells on Left Wall */}
                {[175, 225, 275].map((gy, idx) => (
                  <g key={idx}>
                    <rect x="103" y={gy - 10} width="18" height="20" rx="5" fill="#db2777" />
                    {/* Enzyme dots released in steps 2 & 3 */}
                    {stepIndex >= 2 && stepIndex <= 4 && (
                      <>
                        <circle cx={136 + idx * 8} cy={gy} r="4.5" fill="#0d9488">
                          <animate
                            attributeName="cx"
                            values={`${126};${162};${136}`}
                            dur="1.6s"
                            repeatCount="indefinite"
                          />
                        </circle>
                        <circle cx={148} cy={gy + 6} r="3.5" fill="#14b8a6" />
                      </>
                    )}
                  </g>
                ))}
                <text x="20" y="230" fontSize="9" fontWeight="700" fill="#be185d">
                  Gland Cells
                </text>

                {/* Prey / Daphnia Lifecycle in Left Cavity */}
                {stepIndex === 0 && (
                  <g>
                    <circle cx="52" cy="86" r="12" fill="#f59e0b" />
                    <circle cx="52" cy="86" r="18" fill="none" stroke="#ef4444" strokeDasharray="3 3" strokeWidth="2" />
                    <text x="18" y="122" fontSize="9" fontWeight="700" fill="#dc2626">
                      เข็มพิษยิงเหยื่อ!
                    </text>
                  </g>
                )}

                {stepIndex === 1 && (
                  <g>
                    <ellipse cx="170" cy="116" rx="14" ry="11" fill="#f59e0b" />
                    <path d="M 170 84 L 170 105" stroke="#0284c7" strokeWidth="2.5" />
                  </g>
                )}

                {(stepIndex === 2 || stepIndex === 3) && (
                  <g>
                    <ellipse
                      cx="170"
                      cy="215"
                      rx={stepIndex === 2 ? 18 : 11}
                      ry={stepIndex === 2 ? 14 : 9}
                      fill="#f97316"
                      opacity={stepIndex === 2 ? 0.9 : 0.45}
                    />
                    {/* Fragmenting small particles */}
                    {stepIndex === 3 && (
                      <>
                        <circle cx="150" cy="200" r="5" fill="#fb923c" />
                        <circle cx="192" cy="212" r="5.5" fill="#fb923c" />
                        <circle cx="168" cy="240" r="4.5" fill="#fb923c" />
                        <circle cx="206" cy="232" r="5" fill="#ea580c" />
                      </>
                    )}
                  </g>
                )}

                {/* Egestion back out of Mouth at Step 7 */}
                {stepIndex === 7 && (
                  <g>
                    <path d="M 170 140 L 170 62" stroke="#64748b" strokeWidth="3" strokeDasharray="4 3" />
                    <polygon points="164,66 176,66 170,54" fill="#475569" />
                    <ellipse cx="170" cy="46" rx="11" ry="7" fill="#94a3b8" />
                    <text x="190" y="54" fontSize="9" fontWeight="700" fill="#475569">
                      Egestion: กากออกทางปากเดิม
                    </text>
                  </g>
                )}

                {/* Bridge Arrow from Cavity to Right Nutritive Cell */}
                {stepIndex >= 4 && stepIndex <= 6 && (
                  <g>
                    <path d="M 225 220 L 365 220" stroke="#7c3aed" strokeWidth="3" strokeDasharray="5 4" />
                    <circle cx="295" cy="220" r="6" fill="#fb923c">
                      <animate attributeName="cx" values="230;360" dur="1.4s" repeatCount="indefinite" />
                    </circle>
                  </g>
                )}

                {/* RIGHT: ZOOMED NUTRITIVE-MUSCULAR CELL */}
                <g transform="translate(360, 75)">
                  {/* Cell Membrane Outline */}
                  <rect
                    x="15"
                    y="15"
                    width="240"
                    height="255"
                    rx="24"
                    fill="#fdf4ff"
                    stroke="#a855f7"
                    strokeWidth="2.5"
                  />
                  <text x="30" y="38" fontSize="10.5" fontWeight="700" fill="#6b21a8">
                    Nutritive-muscular Cell
                  </text>

                  {/* Apical Pseudopodia Engulfing at Step 4 */}
                  {stepIndex === 4 && (
                    <g>
                      <path
                        d="M 15 125 Q -12 110 8 145 Q -12 180 15 165"
                        fill="#f3e8ff"
                        stroke="#7c3aed"
                        strokeWidth="2.5"
                      />
                      <circle cx="2" cy="145" r="7" fill="#fb923c" />
                      <text x="26" y="150" fontSize="9.5" fontWeight="700" fill="#6d28d9">
                        Phagocytosis (โอบล้อมอาหาร)
                      </text>
                    </g>
                  )}

                  {/* Food Vacuole + Lysosome Fusion at Step 5 */}
                  <circle
                    cx="115"
                    cy="145"
                    r={stepIndex >= 5 ? 30 : 20}
                    fill={stepIndex >= 5 ? '#f3e8ff' : '#fff7ed'}
                    stroke={stepIndex >= 5 ? '#9333ea' : '#f97316'}
                    strokeWidth="2.5"
                    opacity={stepIndex >= 4 ? 1 : 0.35}
                  />
                  <text x="82" y="188" fontSize="9" fontWeight="700" fill="#7e22ce">
                    Food Vacuole
                  </text>

                  {/* Lysosome */}
                  <circle
                    cx={stepIndex === 5 ? 132 : 195}
                    cy={stepIndex === 5 ? 140 : 108}
                    r="16"
                    fill="#db2777"
                    opacity={stepIndex >= 4 ? 0.9 : 0.35}
                  />
                  <text
                    x={stepIndex === 5 ? 115 : 172}
                    y={stepIndex === 5 ? 118 : 86}
                    fontSize="8.5"
                    fontWeight="700"
                    fill="#be185d"
                  >
                    Lysosome
                  </text>

                  {/* Nutrient absorption diffusion at Step 6 */}
                  {stepIndex >= 6 && (
                    <g>
                      {[0, 1, 2, 3].map((ni) => (
                        <circle key={ni} cx={65 + ni * 45} cy={225} r="5.5" fill="#db2777" />
                      ))}
                      <path d="M 115 190 L 115 245" stroke="#db2777" strokeWidth="2" />
                      <text x="48" y="252" fontSize="9.5" fontWeight="700" fill="#9d174d">
                        สารอาหารโมเลกุลเล็ก (กรดอะมิโน / น้ำตาล) แพร่เลี้ยงทั่วตัว
                      </text>
                    </g>
                  )}

                  {/* Cell Nucleus */}
                  <circle cx="205" cy="212" r="22" fill="#7c3aed" opacity="0.85" />
                  <text x="188" y="216" fontSize="8.5" fill="#ffffff" fontWeight="700">
                    Nucleus
                  </text>
                </g>
              </svg>
            </div>

            {/* Active Step Explanation Box */}
            <div
              className={`rounded-2xl border p-4 ${
                isLevel1 ? 'border-teal-200 bg-teal-50/60' : 'border-purple-200 bg-purple-50/60'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  {currentStep.stepNumber}. {currentStep.titleTh}{' '}
                  <span className="font-normal text-slate-500">({currentStep.titleEn})</span>
                </h3>
                <span className="text-xs font-mono font-semibold text-slate-600">
                  {currentStep.location}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                {currentStep.description}
              </p>
            </div>
          </div>

          {/* Right 5 cols: Two-Level Step Selector List */}
          <div className="lg:col-span-5 space-y-4">
            {/* Level 1 Group */}
            <div className="museum-panel rounded-3xl p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-800">
                <span className="h-3 w-3 rounded-full bg-teal-500" />
                ระดับที่ 1: Extracellular Digestion (การย่อยภายนอกเซลล์)
              </div>
              {DIGESTION_STEPS.filter((s) => s.level === 1).map((step) => {
                const idx = step.stepNumber - 1;
                const active = idx === stepIndex;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => {
                      setPlaying(false);
                      setStepIndex(idx);
                    }}
                    className={`w-full rounded-2xl border p-3 text-left transition-all cursor-pointer ${
                      active
                        ? 'border-teal-500 bg-teal-50 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-teal-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        {step.stepNumber}. {step.titleTh}
                      </span>
                      <ArrowRight className={`h-3.5 w-3.5 ${active ? 'text-teal-700' : 'text-slate-300'}`} />
                    </div>
                    <div className="mt-0.5 text-[11px] font-mono text-slate-500">{step.titleEn}</div>
                  </button>
                );
              })}
            </div>

            {/* Level 2 Group */}
            <div className="museum-panel rounded-3xl p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-800">
                <span className="h-3 w-3 rounded-full bg-purple-600" />
                ระดับที่ 2: Intracellular Digestion (การย่อยภายในเซลล์)
              </div>
              {DIGESTION_STEPS.filter((s) => s.level === 2).map((step) => {
                const idx = step.stepNumber - 1;
                const active = idx === stepIndex;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => {
                      setPlaying(false);
                      setStepIndex(idx);
                    }}
                    className={`w-full rounded-2xl border p-3 text-left transition-all cursor-pointer ${
                      active
                        ? 'border-purple-500 bg-purple-50 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        {step.stepNumber}. {step.titleTh}
                      </span>
                      <ArrowRight className={`h-3.5 w-3.5 ${active ? 'text-purple-700' : 'text-slate-300'}`} />
                    </div>
                    <div className="mt-0.5 text-[11px] font-mono text-slate-500">{step.titleEn}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
