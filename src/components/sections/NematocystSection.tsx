import React, { useEffect, useRef, useState } from 'react';
import { Zap, Gauge, RotateCcw, AlertTriangle, ShieldCheck, Tag } from 'lucide-react';
import {
  NEMATOCYST_PARTS,
  NEMATOCYST_STEPS,
  NEMATOCYST_TYPES,
  type NematocystPart,
  type NematocystTypeInfo,
} from '../../data/nematocystData';
import { Nematocyst3DCanvas } from '../three/Nematocyst3DCanvas';

export const NematocystSection: React.FC = () => {
  const [progress, setProgress] = useState(0); // 0..1
  const [isFiring, setIsFiring] = useState(false);
  const [slowMotion, setSlowMotion] = useState(true);
  const [selectedPartId, setSelectedPartId] = useState<NematocystPart['id']>('capsule');
  const [nematocystType, setNematocystType] = useState<NematocystTypeInfo['id']>('stenotele');
  const [showLabels, setShowLabels] = useState(true);

  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isFiring) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
      return;
    }

    const durationMs = slowMotion ? 8500 : 2400;

    const tick = (now: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = now;
      const dt = now - lastTimeRef.current;
      lastTimeRef.current = now;

      setProgress((prev) => {
        const next = prev + dt / durationMs;
        if (next >= 1) {
          setIsFiring(false);
          return 1;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isFiring, slowMotion]);

  const handleTrigger = () => {
    if (progress >= 0.99) {
      setProgress(0);
    }
    setIsFiring(true);
  };

  const handleReset = () => {
    setIsFiring(false);
    setProgress(0);
  };

  const currentStep =
    NEMATOCYST_STEPS.find(
      (s) => progress >= s.progressRange[0] && progress <= s.progressRange[1]
    ) ?? (progress === 0 ? NEMATOCYST_STEPS[0] : NEMATOCYST_STEPS[NEMATOCYST_STEPS.length - 1]);

  const activePart = NEMATOCYST_PARTS.find((p) => p.id === selectedPartId) ?? NEMATOCYST_PARTS[1];
  const activeTypeInfo = NEMATOCYST_TYPES.find((t) => t.id === nematocystType) ?? NEMATOCYST_TYPES[0];

  return (
    <section id="nematocyst" className="border-t border-slate-200/80 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono font-semibold uppercase tracking-widest text-orange-600">
              EXHIBIT 03 • CNIDOCYTE & NEMATOCYST BIOPHYSICS
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              กลไกการทำงานของเข็มพิษ (Nematocyst Discharge)
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              ภาพตัดขวาง 3 มิติระดับจุลทรรศน์ของเซลล์{' '}
              <span className="font-semibold text-slate-800">Cnidocyte</span> และออร์แกเนลล์{' '}
              <span className="font-semibold text-red-600">Nematocyst</span>{' '}
              จำลองแรงดันออสโมติก ~150 atm และกลไกการพลิกกลับด้านของเส้นท่อทั้ง 6 ขั้นตอน
            </p>
          </div>

          {/* Required Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              id="nematocyst-trigger-btn"
              onClick={handleTrigger}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-red-700 cursor-pointer"
            >
              <Zap className="h-4 w-4" />
              Trigger Nematocyst
            </button>

            <button
              type="button"
              id="nematocyst-slowmo-btn"
              onClick={() => setSlowMotion((s) => !s)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold border transition-all cursor-pointer ${
                slowMotion
                  ? 'bg-orange-50 text-orange-800 border-orange-300 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              <Gauge className="h-4 w-4" />
              Slow Motion: {slowMotion ? 'ON (0.2x)' : 'OFF'}
            </button>

            <button
              type="button"
              id="nematocyst-reset-btn"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Simulation
            </button>

            <button
              type="button"
              onClick={() => setShowLabels((l) => !l)}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold cursor-pointer ${
                showLabels
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-300'
              }`}
            >
              <Tag className="h-3.5 w-3.5" />
              Labels
            </button>
          </div>
        </div>

        {/* Main 3D Stage + Step Timeline */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left 7 cols: 3D Cross-Section Viewport + Part Inspector */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative h-[440px] sm:h-[520px] w-full overflow-hidden rounded-3xl border border-orange-200/70 bg-orange-50/30 shadow-sm">
              <Nematocyst3DCanvas
                progress={progress}
                selectedPart={selectedPartId}
                onSelectPart={setSelectedPartId}
                nematocystType={nematocystType}
                showLabels={showLabels}
              />

              {/* Live Telemetry HUD */}
              <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                <div className="museum-glass rounded-full px-3.5 py-1.5 text-xs font-bold text-slate-900">
                  <span className="text-red-600 font-mono mr-2">{currentStep.code}</span>
                  {currentStep.titleEn} — {currentStep.titleTh}
                </div>
                <div className="museum-glass rounded-full px-3 py-1.5 text-[11px] font-mono font-semibold text-orange-800">
                  {currentStep.durationLabel}
                </div>
              </div>

              {/* Manual Scrubbing Slider Overlay at Bottom */}
              <div className="absolute bottom-4 left-4 right-4 museum-glass rounded-2xl p-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 mb-1.5">
                  <span>MANUAL PHASE SCRUBBER ({Math.round(progress * 100)}%)</span>
                  <span>{activeTypeInfo.nameEn} Mode</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={progress}
                  aria-label="Nematocyst Discharge Progress"
                  onChange={(e) => {
                    setIsFiring(false);
                    setProgress(parseFloat(e.target.value));
                  }}
                  className="w-full accent-red-600 cursor-pointer"
                />
              </div>
            </div>

            {/* 5 Structural Components Selector */}
            <div className="museum-panel rounded-2xl p-4">
              <div className="mb-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
                องค์ประกอบของเซลล์และออร์แกเนลล์เข็มพิษทั้ง 5 ส่วน (คลิกเพื่อดูคำอธิบาย)
              </div>
              <div className="flex flex-wrap gap-2">
                {NEMATOCYST_PARTS.map((part) => {
                  const isActive = part.id === selectedPartId;
                  return (
                    <button
                      key={part.id}
                      type="button"
                      id={`nema-part-${part.id}`}
                      onClick={() => setSelectedPartId(part.id)}
                      className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-orange-300'
                      }`}
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: part.color }}
                      />
                      {part.nameEn}
                    </button>
                  );
                })}
              </div>

              {/* Selected Part Description */}
              <div className="mt-3 rounded-xl bg-slate-50 p-3.5 border border-slate-200/80">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-sm font-bold text-slate-900">
                    {activePart.nameEn}{' '}
                    <span className="font-normal text-orange-700">({activePart.nameTh})</span>
                  </div>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-slate-700">{activePart.description}</p>
                <p className="mt-1.5 text-xs font-medium text-slate-800">
                  <span className="text-orange-700 font-bold">หน้าที่: </span>
                  {activePart.role}
                </p>
              </div>
            </div>
          </div>

          {/* Right 5 cols: 6-Step Mechanism + Nematocyst Functional Diversity */}
          <div className="lg:col-span-5 space-y-5">
            {/* 6 Steps Interactive Stepper */}
            <div className="museum-panel rounded-3xl p-5 space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">
                ลำดับกลไกการยิงเข็มพิษ 6 ขั้นตอน
              </div>
              <div className="space-y-2">
                {NEMATOCYST_STEPS.map((step) => {
                  const active = currentStep.stepNumber === step.stepNumber;
                  return (
                    <button
                      key={step.code}
                      type="button"
                      onClick={() => {
                        setIsFiring(false);
                        setProgress((step.progressRange[0] + step.progressRange[1]) / 2);
                      }}
                      className={`w-full rounded-2xl border p-3 text-left transition-all cursor-pointer ${
                        active
                          ? 'border-red-500 bg-red-50/70 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-orange-200 hover:bg-orange-50/30'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] font-mono font-bold ${
                              active ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {step.code}
                          </span>
                          <span className="text-xs font-bold text-slate-900">
                            {step.titleEn}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">
                          {step.durationLabel}
                        </span>
                      </div>
                      <div className="mt-1 text-xs font-semibold text-orange-800">
                        {step.titleTh}
                      </div>
                      {active && (
                        <div className="mt-2 space-y-1.5 border-t border-red-200/70 pt-2">
                          <p className="text-xs leading-relaxed text-slate-700">{step.description}</p>
                          <p className="text-[11px] leading-relaxed text-red-900/90 bg-white/80 rounded-lg p-2 border border-red-100">
                            <span className="font-bold">Biophysics: </span>
                            {step.biophysicsDetail}
                          </p>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scientific Accuracy Box: Nematocyst Diversity (Not all inject toxins!) */}
            <div className="museum-panel rounded-3xl p-5 space-y-3 border-orange-200/80">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    ความหลากหลายของ Nematocyst (ไม่ได้ฉีดสารพิษทุกชนิด)
                  </h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                    ไฮดรามี Nematocyst 4 ชนิดหลักซึ่งทำหน้าที่ต่างกัน — ทดลองเปลี่ยนชนิดด้านล่างเพื่อดูกลไกบนโมเดล 3D:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {NEMATOCYST_TYPES.map((t) => {
                  const selected = t.id === nematocystType;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      id={`nema-type-${t.id}`}
                      onClick={() => setNematocystType(t.id)}
                      className={`rounded-xl border p-2.5 text-left transition-all cursor-pointer ${
                        selected
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-orange-300'
                      }`}
                    >
                      <div className="text-xs font-bold">{t.nameEn}</div>
                      <div
                        className={`mt-0.5 text-[10px] ${
                          selected ? 'text-orange-300' : 'text-slate-500'
                        }`}
                      >
                        {t.injectsToxin ? 'เจาะทะลุ + ฉีดพิษ' : 'ไม่ฉีดสารพิษ'}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-900">
                    {activeTypeInfo.nameEn} ({activeTypeInfo.nameTh})
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      activeTypeInfo.injectsToxin
                        ? 'bg-red-100 text-red-800'
                        : 'bg-teal-100 text-teal-800'
                    }`}
                  >
                    <ShieldCheck className="h-3 w-3" />
                    {activeTypeInfo.mechanismLabel}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-slate-700">
                  {activeTypeInfo.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
