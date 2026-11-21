import React, { useState } from 'react';
import { Network, Activity, AlertCircle } from 'lucide-react';
import { PHYSIOLOGY_SYSTEMS } from '../../data/physiologyData';

const ALL_CELL_NODES = [
  'Epithelio-muscular Cells',
  'Nutritive-muscular Cells',
  'Cnidocytes',
  'Sensory Cells',
  'Nerve Cells',
  'Gland Cells',
  'Interstitial Cells (I-cells)',
  'Germ Cells',
];

const ALL_TISSUE_NODES = ['Epidermis', 'Mesoglea', 'Gastrodermis', 'Gastrovascular Cavity'];

export const PhysiologySection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('feeding-digestion');

  const activeSystem =
    PHYSIOLOGY_SYSTEMS.find((s) => s.id === selectedId) ?? PHYSIOLOGY_SYSTEMS[0];

  return (
    <section id="physiology" className="border-t border-slate-200/80 bg-slate-50/70 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 max-w-3xl space-y-2">
          <div className="text-xs font-mono font-semibold uppercase tracking-widest text-indigo-700">
            EXHIBIT 08 • INTEGRATED PHYSIOLOGY
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            ระบบสรีรวิทยาของ Hydra (7 Functional Systems)
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            ไฮดราเป็นสัตว์ที่<span className="font-bold text-slate-900">ไม่มีระบบไหลเวียนเลือด ไม่มีอวัยวะหายใจ และไม่มีระบบประสาทส่วนกลาง</span>{' '}
            แต่ดำรงชีวิตได้อย่างสมบูรณ์ด้วยการแพร่ (Diffusion) และร่างแหประสาท (Nerve Net)
            เลือกแต่ละระบบเพื่อดูความเชื่อมโยงระหว่างเซลล์และเนื้อเยื่อ
          </p>
        </div>

        {/* 7 System Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {PHYSIOLOGY_SYSTEMS.map((sys) => {
            const active = sys.id === selectedId;
            return (
              <button
                key={sys.id}
                type="button"
                id={`phys-tab-${sys.id}`}
                onClick={() => setSelectedId(sys.id)}
                className={`rounded-xl border px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                  active
                    ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300'
                }`}
              >
                {sys.titleEn}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left 5 cols: System Deep Explanation */}
          <div className="lg:col-span-5 museum-panel rounded-3xl p-6 space-y-4">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-sky-700">
                <Activity className="h-4 w-4" />
                <span>{activeSystem.subtitle}</span>
              </div>
              <h3 className="mt-1 text-2xl font-extrabold text-slate-900">
                {activeSystem.titleEn}
              </h3>
              <p className="text-sm font-semibold text-teal-700">{activeSystem.titleTh}</p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-800">หลักการทำงานสรีรวิทยา</div>
              <p className="text-sm leading-relaxed text-slate-700">{activeSystem.summary}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80 space-y-1.5">
              <div className="text-xs font-bold text-slate-900">กลไกระดับเซลล์และเนื้อเยื่อ</div>
              <p className="text-xs leading-relaxed text-slate-700">{activeSystem.mechanism}</p>
            </div>

            <div className="flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-950">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
              <div>
                <span className="font-bold">ข้อสังเกตเชิงเปรียบเทียบ: </span>
                {activeSystem.noOrganNote}
              </div>
            </div>
          </div>

          {/* Right 7 cols: Interactive Cell-to-Tissue-to-System Connection Map */}
          <div className="lg:col-span-7 museum-panel rounded-3xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Network className="h-5 w-5 text-purple-600" />
                แผนภาพเชื่อมโยงการทำงานของเซลล์ เนื้อเยื่อ และระบบร่างกาย
              </div>
              <span className="font-mono text-[11px] text-slate-500">
                ACTIVE PATHWAYS HIGHLIGHTED
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 items-center pt-2">
              {/* Column 1: Specialized Cells */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono font-bold uppercase text-purple-700 mb-2">
                  1. Cell Types (ระดับเซลล์)
                </div>
                {ALL_CELL_NODES.map((cell) => {
                  const connected = activeSystem.involvedCells.includes(cell);
                  return (
                    <div
                      key={cell}
                      className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                        connected
                          ? 'border-purple-500 bg-purple-50 text-purple-950 shadow-xs'
                          : 'border-slate-200/70 bg-slate-50/50 text-slate-400 opacity-60'
                      }`}
                    >
                      {cell}
                    </div>
                  );
                })}
              </div>

              {/* Column 2: Active System Hub */}
              <div className="flex flex-col items-center justify-center space-y-3 py-4">
                <div className="text-[11px] font-mono font-bold uppercase text-slate-500">
                  2. Active Physiology
                </div>
                <div
                  className="w-full rounded-2xl border-2 p-4 text-center shadow-sm transition-all"
                  style={{
                    borderColor: activeSystem.color,
                    backgroundColor: '#f8fafc',
                  }}
                >
                  <div
                    className="text-xs font-mono font-bold uppercase"
                    style={{ color: activeSystem.color }}
                  >
                    {activeSystem.involvedCells.length} Cell Types Linked
                  </div>
                  <div className="mt-1 text-base font-extrabold text-slate-900">
                    {activeSystem.titleEn}
                  </div>
                  <div className="mt-0.5 text-xs font-medium text-slate-600">
                    {activeSystem.titleTh}
                  </div>
                </div>
                <div className="text-center text-[11px] leading-relaxed text-slate-500 px-2">
                  ทำงานร่วมกันโดยไม่ต้องพึ่งหัวใจ หลอดเลือด หรือสมองส่วนกลาง
                </div>
              </div>

              {/* Column 3: Tissue Layers & Cavity */}
              <div className="space-y-2.5">
                <div className="text-[11px] font-mono font-bold uppercase text-sky-700 mb-2">
                  3. Tissues & Cavity (ระดับเนื้อเยื่อ)
                </div>
                {ALL_TISSUE_NODES.map((layer) => {
                  const connected = activeSystem.involvedLayers.includes(layer);
                  return (
                    <div
                      key={layer}
                      className={`rounded-xl border px-3 py-3 text-xs font-semibold transition-all ${
                        connected
                          ? 'border-sky-500 bg-sky-50 text-sky-950 shadow-xs'
                          : 'border-slate-200/70 bg-slate-50/50 text-slate-400 opacity-60'
                      }`}
                    >
                      {layer}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
