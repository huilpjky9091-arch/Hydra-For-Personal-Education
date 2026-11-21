import React, { useEffect, useRef, useState } from 'react';
import {
  Bug,
  Play,
  Pause,
  RotateCcw,
  Gauge,
  ScanEye,
  Info,
  CheckCircle2,
} from 'lucide-react';
import {
  FeedingLab3DCanvas,
  type FeedingClickablePart,
  type FeedingStage,
} from '../three/FeedingLab3DCanvas';

interface FeedingLogStep {
  id: number;
  stage: FeedingStage;
  range: [number, number];
  title: string;
  detail: string;
}

const FEEDING_SEQUENCE: FeedingLogStep[] = [
  {
    id: 1,
    stage: 'prey-spawned',
    range: [0, 0.01],
    title: '1. Spawn Prey — สร้างเหยื่อไรน้ำ (Daphnia)',
    detail: 'ไรน้ำถูกปล่อยลงสู่น้ำจืดใกล้รัศมีการกางหนวดของไฮดรา',
  },
  {
    id: 2,
    stage: 'approaching',
    range: [0.01, 0.18],
    title: '2. เหยื่อเคลื่อนที่เข้าหาหนวด Hydra',
    detail: 'Daphnia ใช้หนวดคู่โบกว่ายน้ำเข้ามาใกล้หนวดที่กางรอรับสัมผัส',
  },
  {
    id: 3,
    stage: 'contact-discharge',
    range: [0.18, 0.22],
    title: '3. ระบบตรวจจับการสัมผัส (Sensory Detection)',
    detail: 'Cnidocil และ Sensory Cells ตรวจจับแรงสั่นสะเทือนและสารเคมีจากไรน้ำ',
  },
  {
    id: 4,
    stage: 'contact-discharge',
    range: [0.22, 0.28],
    title: '4. แอนิเมชัน Nematocyst Discharge',
    detail: 'แคปซูลเข็มพิษเปิด Operculum และพุ่งเส้นท่อออกแทงทะลุ/พันเกี่ยวไรน้ำ',
  },
  {
    id: 5,
    stage: 'immobilized-dragging',
    range: [0.28, 0.35],
    title: '5. เหยื่อถูกทำให้เคลื่อนไหวไม่ได้',
    detail: 'พิษจาก Stenotele และบ่วง Desmoneme หยุดการว่ายน้ำของ Daphnia ลงทันที',
  },
  {
    id: 6,
    stage: 'immobilized-dragging',
    range: [0.35, 0.44],
    title: '6. หนวดค่อย ๆ ดึงเหยื่อเข้าหาปาก',
    detail: 'Epithelio-muscular cells บนหนวดหดตัวโค้งงอนำเหยื่อตรงไปยังยอด Hypostome',
  },
  {
    id: 7,
    stage: 'ingestion',
    range: [0.44, 0.52],
    title: '7. ปากเปิดและรับเหยื่อเข้าสู่ร่างกาย',
    detail: 'สาร Glutathione กระตุ้นให้ Mouth ขยายตัวกว้างขึ้นเพื่อกลืนเหยื่อทั้งตัว',
  },
  {
    id: 8,
    stage: 'ingestion',
    range: [0.52, 0.58],
    title: '8. เหยื่อเข้าสู่ Gastrovascular Cavity',
    detail: 'เหยื่อเคลื่อนลงสู่ช่องว่างกลางลำตัว จากนั้นช่องปากจะปิดลง',
  },
  {
    id: 9,
    stage: 'extracellular-digestion',
    range: [0.58, 0.66],
    title: '9. Gland Cells หลั่งเอนไซม์',
    detail: 'เซลล์ต่อมในชั้น Gastrodermis ปล่อยเอนไซม์ย่อยสลายลงสู่ช่องลำตัว',
  },
  {
    id: 10,
    stage: 'extracellular-digestion',
    range: [0.66, 0.74],
    title: '10. Extracellular Digestion',
    detail: 'เอนไซม์สลายเนื้อเยื่อเหยื่อภายนอกเซลล์ให้กลายเป็นอนุภาคขนาดเล็ก',
  },
  {
    id: 11,
    stage: 'intracellular-digestion',
    range: [0.74, 0.89],
    title: '11. Intracellular Digestion',
    detail: 'Nutritive-muscular Cells กลืนอนุภาคด้วย Phagocytosis แล้วย่อยต่อใน Food Vacuole + Lysosome',
  },
  {
    id: 12,
    stage: 'egestion-complete',
    range: [0.89, 1.0],
    title: '12. ดูดซึมสารอาหาร & ขับกากออกทางปากเดิม',
    detail: 'สารอาหารโมเลกุลเล็กแพร่เลี้ยงทั่วร่างกาย ส่วนเปลือกไคตินที่ย่อยไม่ได้ถูกขับออกทาง Mouth',
  },
];

const PART_EXPLANATIONS: Record<
  FeedingClickablePart,
  { title: string; subtitle: string; desc: string }
> = {
  daphnia: {
    title: 'Daphnia (ไรน้ำ — เหยื่อ)',
    subtitle: 'Freshwater Crustacean Prey',
    desc: 'สัตว์ไม่มีกระดูกสันหลังขนาดเล็กในน้ำจืดที่มีเปลือกไคตินหุ้มตัว เมื่อว่ายชนหนวดไฮดรา สารเมือกและแรงสัมผัสจะจุดชนวนการยิงเข็มพิษทันที',
  },
  tentacles: {
    title: 'Tentacles (หนวดจับเหยื่อ)',
    subtitle: 'Coordinated Muscular Arms',
    desc: 'บรรจุกระจุกเซลล์ Cnidocytes และทำงานประสานกับ Nerve Net เมื่อจับเหยื่อได้ หนวดจะโค้งเข้าหาปากอย่างพร้อมเพรียง',
  },
  nematocysts: {
    title: 'Nematocyst Discharge (การยิงเข็มพิษ)',
    subtitle: 'Ultrafast Capture Mechanism',
    desc: 'แคปซูลแรงดันสูงยิงเส้นท่อออกมาแทงทะลุ (Stenotele) และพันรัดระยางค์ของไรน้ำ (Desmoneme) เพื่อยึดและทำให้เหยื่อเป็นอัมพาต',
  },
  mouth: {
    title: 'Mouth & Hypostome (ช่องปากเปิดปิด)',
    subtitle: 'Bidirectional Single Opening',
    desc: 'เปิดขยายกว้างเมื่อได้รับสัญญาณเคมี Glutathione เพื่อนำไรน้ำเข้าสู่ช่องลำตัว และเปิดอีกครั้งเมื่อต้องขับกากเปลือกไคตินออกทางเดิม',
  },
  'gastrovascular-cavity': {
    title: 'Gastrovascular Cavity (ช่องย่อยอาหาร)',
    subtitle: 'Extracellular Digestion Chamber',
    desc: 'พื้นที่สำหรับย่อยเหยื่อภายนอกเซลล์โดยอาศัยเอนไซม์จาก Gland Cells และใช้แฟลกเจลลากวนสารอาหารให้กระจายทั่วช่องลำตัว',
  },
  gastrodermis: {
    title: 'Gastrodermis (Gland & Nutritive Cells)',
    subtitle: 'Enzyme Secretion & Intracellular Uptake',
    desc: 'ชั้นเนื้อเยื่อด้านในที่เป็นทั้งผู้หลั่งเอนไซม์ (Gland Cells) และผู้กลืนกินอนุภาคอาหารเข้าสู่ Food Vacuole (Nutritive-muscular Cells)',
  },
};

export const FeedingSimulationSection: React.FC = () => {
  const [hasPrey, setHasPrey] = useState(false);
  const [running, setRunning] = useState(false);
  const [slowMotion, setSlowMotion] = useState(false);
  const [xrayMode, setXrayMode] = useState(true);
  const [progress, setProgress] = useState(0); // 0..1
  const [selectedPart, setSelectedPart] = useState<FeedingClickablePart>('tentacles');

  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastRef.current = null;
      return;
    }

    const totalMs = slowMotion ? 22000 : 12000;

    const tick = (now: number) => {
      if (lastRef.current === null) lastRef.current = now;
      const dt = now - lastRef.current;
      lastRef.current = now;

      setProgress((prev) => {
        const next = prev + dt / totalMs;
        if (next >= 1) {
          setRunning(false);
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
  }, [running, slowMotion]);

  const handleSpawnPrey = () => {
    setRunning(false);
    setHasPrey(true);
    setProgress(0.005);
    setSelectedPart('daphnia');
  };

  const handleStart = () => {
    if (!hasPrey) {
      setHasPrey(true);
      setProgress(0.01);
    } else if (progress >= 0.99) {
      setProgress(0.01);
    }
    setRunning(true);
  };

  const handlePause = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setRunning(false);
    setHasPrey(false);
    setProgress(0);
  };

  const currentLog =
    FEEDING_SEQUENCE.find((s) => progress >= s.range[0] && progress <= s.range[1]) ??
    FEEDING_SEQUENCE[0];

  const currentStage: FeedingStage = !hasPrey ? 'idle' : currentLog.stage;
  const partInfo = PART_EXPLANATIONS[selectedPart];

  return (
    <section id="feeding-lab" className="border-t border-slate-200/80 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono font-semibold uppercase tracking-widest text-sky-700">
              EXHIBIT 07 • 3D INTERACTIVE FEEDING LABORATORY
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              ห้องทดลอง 3 มิติ: จำลองการจับและกินเหยื่อ (Feeding Simulation)
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              ทดลองปล่อยไรน้ำ (<span className="font-semibold text-slate-800">Daphnia</span>)
              แล้วสังเกตการทำงานประสานกันของหนวด เข็มพิษ ช่องปาก และระบบย่อยอาหารแบบเรียลไทม์
              (คลิกส่วนต่าง ๆ ในฉาก 3 มิติเพื่อดูคำอธิบายได้ทันที)
            </p>
          </div>

          {/* All 6 Required Control Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              id="lab-spawn-prey"
              onClick={handleSpawnPrey}
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-2.5 text-xs font-bold text-slate-950 shadow-xs hover:bg-amber-400 cursor-pointer"
            >
              <Bug className="h-4 w-4" />
              Spawn Prey
            </button>

            <button
              type="button"
              id="lab-start-sim"
              onClick={handleStart}
              className="inline-flex items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-sky-700 cursor-pointer"
            >
              <Play className="h-4 w-4" />
              Start Simulation
            </button>

            <button
              type="button"
              id="lab-pause-sim"
              onClick={handlePause}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <Pause className="h-4 w-4" />
              Pause
            </button>

            <button
              type="button"
              id="lab-reset-sim"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>

            <button
              type="button"
              id="lab-slowmo-btn"
              onClick={() => setSlowMotion((s) => !s)}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                slowMotion
                  ? 'bg-orange-50 text-orange-800 border-orange-300'
                  : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              <Gauge className="h-4 w-4" />
              Slow Motion
            </button>

            <button
              type="button"
              id="lab-xray-btn"
              onClick={() => setXrayMode((x) => !x)}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                xrayMode
                  ? 'bg-slate-900 text-sky-300 border-slate-900'
                  : 'bg-white text-slate-700 border-slate-300'
              }`}
            >
              <ScanEye className="h-4 w-4" />
              X-Ray View
            </button>
          </div>
        </div>

        {/* 3D Feeding Canvas + Event Log & Interactive Part Explainer */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-4">
            <div className="relative h-[460px] sm:h-[540px] w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
              <FeedingLab3DCanvas
                stage={currentStage}
                stageProgress={progress}
                xrayMode={xrayMode}
                selectedPart={selectedPart}
                onSelectPart={setSelectedPart}
              />

              {/* Live Event Banner */}
              <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                <div className="museum-glass rounded-2xl px-4 py-2 text-xs">
                  <span className="font-mono font-bold text-sky-700 mr-2">
                    {!hasPrey ? 'READY' : `EVENT ${currentLog.id}/12`}
                  </span>
                  <span className="font-bold text-slate-900">
                    {!hasPrey
                      ? 'กด "Spawn Prey" หรือ "Start Simulation" เพื่อปล่อยไรน้ำ'
                      : currentLog.title}
                  </span>
                </div>
              </div>

              {/* Manual Timeline Scrubber */}
              <div className="absolute bottom-4 left-4 right-4 museum-glass rounded-2xl p-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 mb-1">
                  <span>FEEDING SEQUENCE TIMELINE ({Math.round(progress * 100)}%)</span>
                  <span>{slowMotion ? '0.5x Slow Motion' : '1.0x Normal'}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={progress}
                  aria-label="Feeding Simulation Progress"
                  onChange={(e) => {
                    setRunning(false);
                    setHasPrey(true);
                    setProgress(parseFloat(e.target.value));
                  }}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Quick Clickable Component Bar */}
            <div className="museum-panel rounded-2xl p-4">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Info className="h-4 w-4 text-sky-600" />
                คลิกองค์ประกอบในการจำลอง (บนโมเดล 3D หรือปุ่มด้านล่าง) เพื่ออ่านคำอธิบาย:
              </div>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(PART_EXPLANATIONS) as FeedingClickablePart[]).map((key) => {
                  const active = key === selectedPart;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedPart(key)}
                      className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                        active
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-sky-300'
                      }`}
                    >
                      {PART_EXPLANATIONS[key].title.split(' (')[0]}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-sm font-bold text-slate-900">{partInfo.title}</div>
                  <span className="font-mono text-[11px] font-semibold text-sky-800">
                    {partInfo.subtitle}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-700">{partInfo.desc}</p>
              </div>
            </div>
          </div>

          {/* Right 5 cols: 12-Step Live Sequence Tracker */}
          <div className="lg:col-span-5 museum-panel rounded-3xl p-5">
            <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-sky-700">
                  REAL-TIME BIOLOGICAL LOG
                </div>
                <h3 className="text-base font-bold text-slate-900">ลำดับเหตุการณ์ทั้ง 12 ขั้นตอน</h3>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 font-mono text-xs font-semibold text-slate-700">
                {hasPrey ? `${currentLog.id} / 12` : '0 / 12'}
              </span>
            </div>

            <div className="space-y-1.5 max-h-[540px] overflow-y-auto pr-1">
              {FEEDING_SEQUENCE.map((step) => {
                const isCurrent = hasPrey && currentLog.id === step.id;
                const isDone = hasPrey && progress > step.range[1];
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => {
                      setRunning(false);
                      setHasPrey(true);
                      setProgress((step.range[0] + step.range[1]) / 2);
                    }}
                    className={`w-full rounded-xl border p-2.5 text-left transition-all cursor-pointer ${
                      isCurrent
                        ? 'border-sky-500 bg-sky-50 shadow-xs'
                        : isDone
                        ? 'border-teal-200 bg-teal-50/35'
                        : 'border-slate-200/80 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-xs font-bold ${
                          isCurrent ? 'text-sky-900' : isDone ? 'text-teal-900' : 'text-slate-800'
                        }`}
                      >
                        {step.title}
                      </span>
                      {isDone && <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-teal-600" />}
                    </div>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-slate-600">{step.detail}</p>
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
