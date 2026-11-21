import React, { useEffect, useState } from 'react';
import { GitBranch, HeartHandshake, Play, Pause, RotateCcw } from 'lucide-react';
import {
  ASEXUAL_BUDDING_STAGES,
  SEXUAL_REPRODUCTION_STAGES,
} from '../../data/physiologyData';
import { Reproduction3DCanvas } from '../three/Reproduction3DCanvas';

export const ReproductionSection: React.FC = () => {
  const [mode, setMode] = useState<'asexual' | 'sexual'>('asexual');
  const [progress, setProgress] = useState(0.65);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    let raf: number;
    let last: number | null = null;
    const totalMs = 8500;

    const tick = (now: number) => {
      if (last === null) last = now;
      const dt = now - last;
      last = now;
      setProgress((prev) => {
        const next = prev + dt / totalMs;
        if (next >= 1) {
          setPlaying(false);
          return 1;
        }
        return next;
      });
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const stages = mode === 'asexual' ? ASEXUAL_BUDDING_STAGES : SEXUAL_REPRODUCTION_STAGES;
  const activeStageIdx = Math.min(3, Math.floor(progress * 4));

  return (
    <section id="reproduction" className="border-t border-slate-200/80 bg-slate-50/70 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono font-semibold uppercase tracking-widest text-pink-700">
              EXHIBIT 10 • ASEXUAL & SEXUAL REPRODUCTION
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              การสืบพันธุ์ของ Hydra (Budding & Sexual Cycle)
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              สลับดูโมเดล 3 มิติระหว่างการแตกหน่อแบบไม่อาศัยเพศ (เมื่ออาหารอุดมสมบูรณ์)
              และการสร้างเซลล์สืบพันธุ์ไข่-อสุจิเพื่อสร้างเกราะ Embryotheca (เมื่อสภาพแวดล้อมเปลี่ยนแปลง)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              id="repro-mode-asexual"
              onClick={() => {
                setPlaying(false);
                setMode('asexual');
                setProgress(0.6);
              }}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                mode === 'asexual'
                  ? 'bg-pink-600 text-white border-pink-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              <GitBranch className="h-4 w-4" />
              Asexual — Budding
            </button>

            <button
              type="button"
              id="repro-mode-sexual"
              onClick={() => {
                setPlaying(false);
                setMode('sexual');
                setProgress(0.6);
              }}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                mode === 'sexual'
                  ? 'bg-purple-700 text-white border-purple-700 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              <HeartHandshake className="h-4 w-4" />
              Sexual Reproduction
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* 3D Reproduction Viewport */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative h-[430px] sm:h-[500px] w-full overflow-hidden rounded-3xl border border-pink-200/70 bg-pink-50/20 shadow-sm">
              <Reproduction3DCanvas mode={mode} progress={progress} />

              <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                <div className="museum-glass rounded-full px-3.5 py-1.5 text-xs font-bold text-slate-900">
                  {mode === 'asexual'
                    ? 'Asexual Reproduction: การแตกหน่อ (Budding)'
                    : 'Sexual Reproduction: การสร้างไข่ อสุจิ และ Embryotheca'}
                </div>

                <div className="pointer-events-auto flex items-center gap-1.5">
                  <button
                    type="button"
                    id="repro-play-btn"
                    onClick={() => {
                      if (progress >= 0.99 && !playing) setProgress(0);
                      setPlaying((p) => !p);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white cursor-pointer"
                  >
                    {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                    {playing ? 'Pause' : 'Play'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPlaying(false);
                      setProgress(0);
                    }}
                    className="inline-flex items-center gap-1 rounded-full bg-white/95 border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset
                  </button>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 museum-glass rounded-2xl p-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 mb-1">
                  <span>DEVELOPMENTAL PROGRESS ({Math.round(progress * 100)}%)</span>
                  <span>STAGE {activeStageIdx + 1} / 4</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={progress}
                  aria-label="Reproduction Progress"
                  onChange={(e) => {
                    setPlaying(false);
                    setProgress(parseFloat(e.target.value));
                  }}
                  className="w-full accent-pink-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Right 5 cols: 4 Stage Cards */}
          <div className="lg:col-span-5 museum-panel rounded-3xl p-6 space-y-3">
            <div className="border-b border-slate-100 pb-3">
              <div className="text-xs font-mono font-bold uppercase text-pink-700">
                {mode === 'asexual' ? 'CLONAL PROPAGATION' : 'GAMETOGENESIS & DORMANCY'}
              </div>
              <h3 className="mt-1 text-lg font-extrabold text-slate-900">
                {mode === 'asexual'
                  ? 'ลำดับขั้นการแตกหน่อ (Budding)'
                  : 'ลำดับขั้นการสืบพันธุ์แบบอาศัยเพศ'}
              </h3>
            </div>

            {stages.map((st, idx) => {
              const active = idx === activeStageIdx;
              return (
                <button
                  key={st.step}
                  type="button"
                  onClick={() => {
                    setPlaying(false);
                    setProgress((idx + 0.5) / 4);
                  }}
                  className={`w-full rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                    active
                      ? mode === 'asexual'
                        ? 'border-pink-500 bg-pink-50/70 shadow-xs'
                        : 'border-purple-600 bg-purple-50/70 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-pink-200'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900">{st.titleTh}</div>
                  <div className="mt-0.5 text-[11px] font-mono text-slate-500">{st.titleEn}</div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-700">{st.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
