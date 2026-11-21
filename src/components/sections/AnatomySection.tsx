import React, { useState } from 'react';
import { Scissors, ScanEye, Tag, Sparkles, Layers } from 'lucide-react';
import { ANATOMY_PARTS } from '../../data/anatomyData';
import { Anatomy3DCanvas } from '../three/Anatomy3DCanvas';
import { AnatomyZoomDiagram } from './AnatomyZoomDiagram';

interface AnatomySectionProps {
  selectedId: string;
  onSelectId: (id: string) => void;
}

export const AnatomySection: React.FC<AnatomySectionProps> = ({
  selectedId,
  onSelectId,
}) => {
  const [cutawayMode, setCutawayMode] = useState(false);
  const [xrayMode, setXrayMode] = useState(false);
  const [showPins, setShowPins] = useState(true);
  const [focusTrigger, setFocusTrigger] = useState(0);

  const handleSelect = (id: string) => {
    onSelectId(id);
    setFocusTrigger((n) => n + 1);
    if (id === 'mesoglea' || id === 'gastrodermis' || id === 'gastrovascular-cavity') {
      setCutawayMode(true);
    }
  };

  const activePart = ANATOMY_PARTS.find((p) => p.id === selectedId) ?? ANATOMY_PARTS[0];

  return (
    <section id="anatomy" className="border-t border-slate-200/80 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono font-semibold uppercase tracking-widest text-sky-700">
              EXHIBIT 01 • INTERACTIVE 3D ANATOMY
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              โครงสร้างทางกายวิภาคของ Hydra
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              คลิกเลือกอวัยวะและเนื้อเยื่อทั้ง 12 ส่วนบนโมเดล 3 มิติโดยตรง หรือเลือกจากรายการด้านล่าง
              เพื่อเจาะลึกภาพตัดขวาง <span className="font-semibold text-slate-800">Anatomy Cutaway</span> และหน้าที่ทางสรีรวิทยา
            </p>
          </div>

          {/* Interactive 3D Mode Toggles */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              id="anatomy-toggle-cutaway"
              onClick={() => setCutawayMode((c) => !c)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold border transition-all cursor-pointer ${
                cutawayMode
                  ? 'bg-pink-600 text-white border-pink-600 shadow-sm'
                  : 'bg-white text-slate-800 border-slate-300 hover:border-pink-400'
              }`}
            >
              <Scissors className="h-4 w-4" />
              {cutawayMode ? 'Anatomy Cutaway: เปิดอยู่' : 'เปิดโหมด Anatomy Cutaway'}
            </button>

            <button
              type="button"
              id="anatomy-toggle-xray"
              onClick={() => setXrayMode((x) => !x)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold border transition-all cursor-pointer ${
                xrayMode
                  ? 'bg-slate-900 text-sky-300 border-slate-900 shadow-sm'
                  : 'bg-white text-slate-800 border-slate-300 hover:border-sky-400'
              }`}
            >
              <ScanEye className="h-4 w-4" />
              X-Ray View
            </button>

            <button
              type="button"
              id="anatomy-toggle-pins"
              onClick={() => setShowPins((s) => !s)}
              className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-semibold border transition-all cursor-pointer ${
                showPins
                  ? 'bg-sky-50 text-sky-800 border-sky-300'
                  : 'bg-white text-slate-600 border-slate-300'
              }`}
            >
              <Tag className="h-4 w-4" />
              3D Labels
            </button>
          </div>
        </div>

        {/* Main 3D Stage + Inspector Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* 3D Interactive Specimen Viewport */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative h-[460px] sm:h-[560px] w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
              <Anatomy3DCanvas
                selectedId={selectedId}
                onSelectPart={handleSelect}
                cutawayMode={cutawayMode}
                xrayMode={xrayMode}
                showPins={showPins}
                autoFocusTrigger={focusTrigger}
              />

              {/* Layer Color Key in Cutaway Mode */}
              {cutawayMode && (
                <div className="absolute bottom-4 left-4 museum-glass rounded-2xl px-4 py-2.5 text-xs">
                  <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-pink-600" />
                    ภาพตัดขวางผนังลำตัว 2 ชั้น (Diploblastic Cross-Section)
                  </div>
                  <div className="flex flex-wrap gap-3 text-[11px] font-medium text-slate-700">
                    <span className="inline-flex items-center gap-1">
                      <span className="h-2.5 w-2.5 rounded-full bg-sky-400" /> Epidermis
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="h-2.5 w-2.5 rounded-full bg-teal-400" /> Mesoglea
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="h-2.5 w-2.5 rounded-full bg-pink-500" /> Gastrodermis
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="h-2.5 w-2.5 rounded-full bg-purple-600" /> Gastrovascular Cavity
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* 12-Part Selector Pills Grid */}
            <div className="museum-panel rounded-2xl p-4">
              <div className="mb-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
                โครงสร้างทางกายวิภาคทั้ง 12 ส่วน (คลิกเพื่อไฮไลต์บนโมเดล 3 มิติ)
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {ANATOMY_PARTS.map((part) => {
                  const isActive = part.id === selectedId;
                  return (
                    <button
                      key={part.id}
                      type="button"
                      id={`anatomy-part-${part.id}`}
                      onClick={() => handleSelect(part.id)}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-left transition-all cursor-pointer ${
                        isActive
                          ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                          : 'border-slate-200 bg-slate-50/70 text-slate-800 hover:border-sky-300 hover:bg-sky-50/50'
                      }`}
                    >
                      <span
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                        style={{ backgroundColor: part.highlightColor }}
                      >
                        {part.order}
                      </span>
                      <span className="truncate text-xs font-semibold">{part.nameEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Detailed Anatomical & Physiological Card */}
          <div className="lg:col-span-5">
            <div className="museum-panel sticky top-20 rounded-3xl p-6 space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="min-w-0">
                  <div className="inline-flex flex-wrap items-center gap-2 text-xs font-mono font-semibold text-sky-700">
                    <span>PART #{String(activePart.order).padStart(2, '0')}</span>
                    <span className="text-slate-300">•</span>
                    <span>{activePart.categoryLabelTh}</span>
                  </div>
                  <h3 className="mt-1 text-2xl font-extrabold text-slate-900">
                    {activePart.nameEn}
                  </h3>
                  <p className="text-sm font-semibold text-teal-700">{activePart.nameTh}</p>
                </div>
                <span
                  className="rounded-lg px-2.5 py-1 text-[11px] font-mono font-semibold text-white"
                  style={{ backgroundColor: activePart.highlightColor }}
                >
                  {activePart.shortTag}
                </span>
              </div>

              {/* Enlarged Structural Illustration */}
              <AnatomyZoomDiagram focus={activePart.diagramFocus} nameEn={activePart.nameEn} />

              {/* Anatomical Description */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  คำอธิบายทางกายวิภาค (Anatomical Structure)
                </h4>
                <p className="text-sm leading-relaxed text-slate-700">
                  {activePart.anatomicalDesc}
                </p>
              </div>

              {/* Physiological Function */}
              <div className="space-y-1.5 rounded-2xl bg-sky-50/70 p-4 border border-sky-100">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-900">
                  หน้าที่ทางสรีรวิทยา (Physiological Function)
                </h4>
                <p className="text-sm leading-relaxed text-slate-800">
                  {activePart.physiologicalFunction}
                </p>
              </div>

              {/* Key Scientific Fact */}
              <div className="flex items-start gap-2.5 rounded-xl border border-purple-200/80 bg-purple-50/60 p-3.5 text-xs leading-relaxed text-purple-950">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" />
                <div>
                  <span className="font-bold">ข้อเท็จจริงทางสัตววิทยา: </span>
                  {activePart.keyFact}
                </div>
              </div>

              {/* Cellular Composition */}
              <div>
                <div className="mb-2 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                  องค์ประกอบระดับเซลล์และโครงสร้างย่อย
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activePart.cellComposition.map((cell) => (
                    <span
                      key={cell}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                    >
                      {cell}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
