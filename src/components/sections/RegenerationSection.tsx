import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Dna } from 'lucide-react';
import { REGENERATION_STAGES } from '../../data/physiologyData';
import { Regeneration3DCanvas } from '../three/Regeneration3DCanvas';

export const RegenerationSection: React.FC = () => {
  const [progress, setProgress] = useState(0.5);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    let raf: number;
    let last: number | null = null;
    const totalMs = 9000;

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

  const currentStage =
    REGENERATION_STAGES.reduce((closest, stage) =>
      Math.abs(stage.progress - progress) < Math.abs(closest.progress - progress) ? stage : closest
    ) ?? REGENERATION_STAGES[0];

  return (
    <section id="regeneration" className="border-t border-slate-200/80 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono font-semibold uppercase tracking-widest text-purple-700">
              EXHIBIT 09 • REGENERATION & STEM CELL LINEAGES
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              ความสามารถในการงอกใหม่ (3D Regeneration Explorer)
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              เลื่อน <span className="font-semibold text-purple-800">Timeline Slider</span>{' '}
              เพื่อติดตามการงอกใหม่ตั้งแต่การตัดแบ่งลำตัว การจัดระเบียบเซลล์แบบ Morphallaxis
              จนถึงการพัฒนาเป็นไฮดราตัวสมบูรณ์ภายใน 72 ชั่วโมง
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="regen-play-btn"
              onClick={() => {
                if (progress >= 0.99 && !playing) setProgress(0);
                setPlaying((p) => !p);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-purple-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-purple-800 cursor-pointer"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {playing ? 'Pause Timeline' : 'Play Regeneration'}
            </button>
            <button
              type="button"
              id="regen-reset-btn"
              onClick={() => {
                setPlaying(false);
                setProgress(0);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* 3D Viewport + Timeline Slider */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative h-[430px] sm:h-[500px] w-full overflow-hidden rounded-3xl border border-purple-200/70 bg-purple-50/20 shadow-sm">
              <Regeneration3DCanvas progress={progress} />

              <div className="absolute top-4 left-4 museum-glass rounded-full px-3.5 py-1.5 text-xs font-bold text-slate-900">
                <span className="font-mono text-purple-700 mr-2">{currentStage.hourLabel}</span>
                {currentStage.titleEn}
              </div>

              {/* Timeline Slider Bar */}
              <div className="absolute bottom-4 left-4 right-4 museum-glass rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-700">
                  <span>REGENERATION TIMELINE SLIDER</span>
                  <span className="text-purple-700">{currentStage.hourLabel}</span>
                </div>
                <input
                  type="range"
                  id="regen-timeline-slider"
                  min={0}
                  max={1}
                  step={0.01}
                  value={progress}
                  aria-label="Regeneration Timeline"
                  onChange={(e) => {
                    setPlaying(false);
                    setProgress(parseFloat(e.target.value));
                  }}
                  className="w-full accent-purple-700 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  {REGENERATION_STAGES.map((st) => (
                    <button
                      key={st.hourLabel}
                      type="button"
                      onClick={() => {
                        setPlaying(false);
                        setProgress(st.progress);
                      }}
                      className="hover:text-purple-700 cursor-pointer"
                    >
                      {st.hourLabel}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 cols: Stage Details & Scientific Stem Cell Clarification */}
          <div className="lg:col-span-5 space-y-4">
            <div className="museum-panel rounded-3xl p-5 space-y-2.5">
              {REGENERATION_STAGES.map((stage) => {
                const active = stage.hourLabel === currentStage.hourLabel;
                return (
                  <button
                    key={stage.hourLabel}
                    type="button"
                    onClick={() => {
                      setPlaying(false);
                      setProgress(stage.progress);
                    }}
                    className={`w-full rounded-2xl border p-3.5 text-left transition-all cursor-pointer ${
                      active
                        ? 'border-purple-600 bg-purple-50/70 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900">{stage.titleTh}</span>
                      <span className="rounded-md bg-purple-100 px-2 py-0.5 font-mono text-[10px] font-bold text-purple-900">
                        {stage.hourLabel}
                      </span>
                    </div>
                    {active && (
                      <div className="mt-2 space-y-1.5 border-t border-purple-200/70 pt-2">
                        <p className="text-xs leading-relaxed text-slate-700">{stage.description}</p>
                        <p className="text-[11px] font-medium text-purple-900 bg-white/80 rounded-lg p-2 border border-purple-100">
                          {stage.cellularNote}
                        </p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Scientific Accuracy Box: I-cells vs 3 Stem Cell Lineages */}
            <div className="rounded-3xl border border-purple-200 bg-purple-50/60 p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-sm font-bold text-purple-950">
                <Dna className="h-5 w-5 text-purple-700" />
                บทบาทของ Interstitial Cells (I-cells) กับ 3 สายพันธุ์ต้นกำเนิด
              </div>
              <p className="text-xs leading-relaxed text-slate-700">
                <span className="font-bold text-slate-900">ข้อเท็จจริงทางชีววิทยาสำคัญ: </span>
                แม้ I-cells จะเป็นเซลล์ต้นกำเนิดที่พัฒนาไปเป็น Cnidocytes, Nerve Cells, Gland Cells และ Germ Cells ได้
                แต่ <span className="underline decoration-purple-400">I-cells ไม่ได้เป็นเซลล์ชนิดเดียวที่สร้างทุกส่วนของร่างกาย</span>
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 pt-1">
                <div className="rounded-xl bg-white p-2.5 border border-sky-100">
                  <div className="text-[11px] font-bold text-sky-800">1. Epidermal Epithelial</div>
                  <div className="text-[10px] text-slate-600 mt-0.5">แบ่งตัวสร้างผิวชั้นนอกเอง</div>
                </div>
                <div className="rounded-xl bg-white p-2.5 border border-pink-100">
                  <div className="text-[11px] font-bold text-pink-800">2. Gastrodermal Epithelial</div>
                  <div className="text-[10px] text-slate-600 mt-0.5">แบ่งตัวสร้างเยื่อชั้นในเอง</div>
                </div>
                <div className="rounded-xl bg-white p-2.5 border border-purple-100">
                  <div className="text-[11px] font-bold text-purple-800">3. I-cells Lineages</div>
                  <div className="text-[10px] text-slate-600 mt-0.5">เติมเต็มเซลล์ประสาท/เข็มพิษ/ต่อม</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-purple-900 font-medium pt-1">
                <Sparkles className="h-3.5 w-3.5 shrink-0" />
                ร่วมกับ Morphallaxis ที่จัดระเบียบเซลล์เดิมตามแกน Wnt3 จึงงอกเป็นไฮดราที่สมบูรณ์ได้
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
