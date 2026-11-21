import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Gauge } from 'lucide-react';
import { ENZYME_PHASES } from '../../data/physiologyData';

export const EnzymeSecretionSection: React.FC = () => {
  const [progress, setProgress] = useState(0); // 0..1 continuous animation loop
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState<number>(1);

  useEffect(() => {
    if (!playing) return;
    let raf: number;
    let last: number | null = null;
    const cycleMs = 9500;

    const tick = (now: number) => {
      if (last === null) last = now;
      const dt = now - last;
      last = now;
      setProgress((prev) => (prev + (dt * speed) / cycleMs) % 1);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, speed]);

  const activePhaseIndex = Math.min(4, Math.floor(progress * 5));
  const activePhase = ENZYME_PHASES[activePhaseIndex];

  // Smooth coordinates for secretory vesicles & enzymes
  const vesicleY = 185 - Math.min(1, (progress % 0.4) / 0.4) * 58;
  const cavitySpread = Math.max(0, (progress - 0.28) / 0.72);

  return (
    <section id="enzymes" className="border-t border-slate-200/80 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header + Controls */}
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono font-semibold uppercase tracking-widest text-pink-700">
              EXHIBIT 05 • ANIMATED ENZYME SECRETION DIAGRAM
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              การหลั่งเอนไซม์ย่อยอาหาร (Enzyme Secretion)
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              แผนภาพเคลื่อนไหวแสดงการทำงานของ{' '}
              <span className="font-semibold text-pink-700">Gland Cells</span> ในชั้น Gastrodermis
              ตั้งแต่การสร้างถุงเอนไซม์ การหลั่งแบบ Exocytosis การย่อยโปรตีนในช่องว่าง
              จนถึงการส่งต่อเพื่อย่อยภายในเซลล์ด้วยไลโซโซม
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              id="enzyme-play-btn"
              onClick={() => setPlaying((p) => !p)}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 cursor-pointer"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {playing ? 'Pause' : 'Play'}
            </button>

            <button
              type="button"
              id="enzyme-reset-btn"
              onClick={() => {
                setPlaying(false);
                setProgress(0);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>

            <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs">
              <Gauge className="h-4 w-4 text-pink-600" />
              <span className="font-semibold text-slate-700">Speed:</span>
              {[0.5, 1, 2].map((sp) => (
                <button
                  key={sp}
                  type="button"
                  onClick={() => setSpeed(sp)}
                  className={`rounded-lg px-2 py-0.5 font-mono text-xs font-bold cursor-pointer ${
                    speed === sp ? 'bg-pink-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  {sp}x
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Animated Scientific SVG Diagram */}
          <div className="lg:col-span-7 museum-panel rounded-3xl p-5">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <svg viewBox="0 0 640 360" className="w-full h-auto" role="img" aria-label="Enzyme Secretion Diagram">
                {/* Cavity Fluid Top */}
                <rect x="0" y="0" width="640" height="145" fill="#f0fdfa" />
                <text x="18" y="24" fontSize="11" fontWeight="800" fill="#0f766e">
                  GASTROVASCULAR CAVITY (ช่องแกสโทรวาสคิวลาร์)
                </text>

                {/* Gastrodermis Tissue Bottom */}
                <rect x="0" y="145" width="640" height="180" fill="#fdf2f8" />
                <line x1="0" y1="145" x2="640" y2="145" stroke="#db2777" strokeWidth="2.5" />

                {/* Mesoglea & Epidermis at very bottom */}
                <rect x="0" y="325" width="640" height="10" fill="#99f6e4" />
                <rect x="0" y="335" width="640" height="25" fill="#bae6fd" />
                <text x="18" y="352" fontSize="9" fontWeight="700" fill="#0369a1">
                  Mesoglea & Epidermis Layer
                </text>

                {/* Gland Cell (Left-Center) */}
                <g transform="translate(80, 145)">
                  <path
                    d="M 20 0 L 140 0 L 115 170 L 45 170 Z"
                    fill="#fce7f3"
                    stroke="#db2777"
                    strokeWidth="2.5"
                  />
                  <text x="38" y="160" fontSize="10" fontWeight="800" fill="#9d174d">
                    Gland Cell
                  </text>
                  {/* Nucleus */}
                  <circle cx="80" cy="128" r="18" fill="#7c3aed" />
                  <text x="64" y="132" fontSize="8.5" fill="#fff" fontWeight="700">
                    Nucleus
                  </text>
                  {/* Rough ER + Golgi */}
                  <path d="M 54 96 Q 80 86 106 96" stroke="#9333ea" strokeWidth="3" fill="none" />
                  <path d="M 56 86 Q 80 76 104 86" stroke="#9333ea" strokeWidth="3" fill="none" />
                  <text x="114" y="92" fontSize="8.5" fill="#6b21a8" fontWeight="600">
                    ER / Golgi
                  </text>
                </g>

                {/* Secretory Vesicles moving upward to Exocytosis */}
                <circle cx="145" cy={vesicleY} r="10" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
                <circle cx="176" cy={Math.max(150, vesicleY + 18)} r="8.5" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />

                {/* Enzymes diffusing into Cavity and attacking Protein/Food Particle */}
                {cavitySpread > 0.05 &&
                  [0, 1, 2, 3, 4, 5].map((i) => {
                    const ex = 158 + cavitySpread * (95 + i * 32);
                    const ey = 128 - Math.sin(cavitySpread * Math.PI + i) * 52;
                    return (
                      <g key={i} transform={`translate(${ex}, ${ey})`}>
                        <circle r="6" fill="#0d9488" />
                        <text x="-3" y="3" fontSize="8" fill="#ffffff" fontWeight="700">
                          E
                        </text>
                      </g>
                    );
                  })}

                {/* Target Macromolecule / Food Fragment in Cavity breaking down */}
                <g transform="translate(360, 72)">
                  {activePhaseIndex < 3 ? (
                    <g>
                      <ellipse cx="0" cy="0" rx="44" ry="24" fill="#fb923c" stroke="#c2410c" strokeWidth="2" />
                      <text x="-32" y="4" fontSize="9.5" fontWeight="800" fill="#fff">
                        Protein / Prey
                      </text>
                    </g>
                  ) : (
                    <g>
                      {/* Broken into small peptides & molecules */}
                      <circle cx="-26" cy="-8" r="10" fill="#fb923c" />
                      <circle cx="6" cy="10" r="9" fill="#f97316" />
                      <circle cx="32" cy="-6" r="8" fill="#fb923c" />
                      <circle cx="65" cy="34" r="6.5" fill="#0284c7" />
                      <circle cx="95" cy="52" r="6" fill="#7c3aed" />
                      <text x="-36" y="-26" fontSize="9.5" fontWeight="700" fill="#c2410c">
                        แตกตัวเป็นโมเลกุลเล็ก!
                      </text>
                    </g>
                  )}
                </g>

                {/* Nutritive-muscular Cell on Right continuing Intracellular Digestion */}
                <g transform="translate(440, 145)">
                  <rect x="0" y="0" width="145" height="172" rx="14" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2.5" />
                  <text x="12" y="22" fontSize="9.5" fontWeight="800" fill="#5b21b6">
                    Nutritive-muscular Cell
                  </text>
                  {/* Flagellum */}
                  <path d="M 35 0 Q 25 -26 42 -42" stroke="#0d9488" strokeWidth="2.5" fill="none" />
                  {/* Food Vacuole + Lysosome */}
                  <circle cx="55" cy="82" r="20" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
                  <circle cx="98" cy="75" r="13" fill="#db2777" />
                  <text x="26" y="114" fontSize="8.5" fontWeight="700" fill="#6d28d9">
                    Food Vacuole + Lysosome
                  </text>
                  <text x="20" y="148" fontSize="8.5" fill="#4c1d95">
                    ย่อยต่อภายในเซลล์ด้วยไลโซโซม
                  </text>
                </g>
              </svg>
            </div>

            {/* Phase Progress Strip */}
            <div className="mt-4 grid grid-cols-5 gap-2">
              {ENZYME_PHASES.map((ph, idx) => {
                const isActive = idx === activePhaseIndex;
                return (
                  <button
                    key={ph.phase}
                    type="button"
                    onClick={() => {
                      setPlaying(false);
                      setProgress((idx + 0.1) / 5);
                    }}
                    className={`rounded-xl border px-2 py-2 text-center transition-all cursor-pointer ${
                      isActive
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-[10px] font-mono font-bold">STEP 0{ph.phase}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right 5 cols: 5 Phase Cards */}
          <div className="lg:col-span-5 space-y-2.5">
            {ENZYME_PHASES.map((ph, idx) => {
              const isActive = idx === activePhaseIndex;
              return (
                <button
                  key={ph.phase}
                  type="button"
                  onClick={() => {
                    setPlaying(false);
                    setProgress((idx + 0.1) / 5);
                  }}
                  className={`w-full rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                    isActive
                      ? 'border-pink-500 bg-pink-50/70 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-pink-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-slate-900">{ph.titleTh}</span>
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: ph.color }}
                    />
                  </div>
                  <div className="mt-0.5 text-[11px] font-mono text-pink-700">{ph.organelleFocus}</div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-700">{ph.description}</p>
                </button>
              );
            })}

            <div className="rounded-2xl bg-slate-900 p-4 text-xs text-slate-200">
              <span className="font-bold text-sky-300">กำลังแสดงผล: </span>
              {activePhase.titleEn} — {activePhase.titleTh}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
