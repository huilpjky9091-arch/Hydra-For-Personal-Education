import React, { useState } from 'react';
import { Microscope, ZoomIn, Sparkles, GitCompare, Eye } from 'lucide-react';
import { HYDRA_CELL_TYPES, type CellTypeId } from '../../data/cellBiologyData';
import { CellMicroscope3DCanvas } from '../three/CellMicroscope3DCanvas';

export const CellBiologySection: React.FC = () => {
  const [selectedCellId, setSelectedCellId] = useState<CellTypeId>('epithelio-muscular');
  const [magnification, setMagnification] = useState<100 | 400 | 1000>(400);
  const [fluorescenceStain, setFluorescenceStain] = useState(true);
  const [layerFilter, setLayerFilter] = useState<'all' | 'Epidermis' | 'Gastrodermis'>('all');

  const filteredCells = HYDRA_CELL_TYPES.filter((cell) => {
    if (layerFilter === 'all') return true;
    return cell.layer.includes(layerFilter);
  });

  const activeCell = HYDRA_CELL_TYPES.find((c) => c.id === selectedCellId) ?? HYDRA_CELL_TYPES[0];

  return (
    <section id="cells" className="border-t border-slate-200/80 bg-slate-50/70 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono font-semibold uppercase tracking-widest text-purple-700">
              EXHIBIT 02 • INTERACTIVE MICROSCOPIC EXPLORER
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              ชีววิทยาระดับเซลล์ (Cell Biology of Hydra)
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              สำรวจเซลล์ทั้ง 8 ชนิดของไฮดราผ่าน{' '}
              <span className="font-semibold text-purple-800">Microscope Mode 3D</span> ปรับกำลังขยายระดับจุลภาค
              ย้อมสีโครงสร้างเซลล์ และศึกษาความสัมพันธ์ระหว่างเนื้อเยื่อ Epidermis และ Gastrodermis
            </p>
          </div>

          {/* Layer Filter */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xs">
            {(['all', 'Epidermis', 'Gastrodermis'] as const).map((layer) => (
              <button
                key={layer}
                type="button"
                onClick={() => setLayerFilter(layer)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  layerFilter === layer
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {layer === 'all' ? 'ทั้งหมด (8 ชนิด)' : `ชั้น ${layer}`}
              </button>
            ))}
          </div>
        </div>

        {/* Cell Selector Strip */}
        <div className="mb-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-8">
          {filteredCells.map((cell) => {
            const isSelected = cell.id === selectedCellId;
            return (
              <button
                key={cell.id}
                type="button"
                id={`cell-select-${cell.id}`}
                onClick={() => setSelectedCellId(cell.id)}
                className={`flex flex-col items-start rounded-2xl border p-3 text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-purple-600 bg-purple-700 text-white shadow-md -translate-y-0.5'
                    : 'border-slate-200 bg-white text-slate-800 hover:border-purple-300 hover:bg-purple-50/40'
                }`}
              >
                <span
                  className={`mb-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-800'
                  }`}
                >
                  {cell.order}
                </span>
                <span className="text-xs font-bold leading-snug line-clamp-2">{cell.nameEn}</span>
                <span
                  className={`mt-1 text-[10px] line-clamp-1 ${
                    isSelected ? 'text-purple-100' : 'text-slate-500'
                  }`}
                >
                  {cell.layer.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main 3D Microscope + Deep Cellular Profile */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: Interactive 3D Microscope Viewport */}
          <div className="lg:col-span-6">
            <div className="museum-panel overflow-hidden rounded-3xl">
              {/* Microscope Top Control Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                    <Microscope className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Microscope Mode</div>
                    <div className="text-[11px] font-mono text-slate-500">
                      SCALE: {activeCell.sizeMicrons} • {magnification}x OBJECTIVE
                    </div>
                  </div>
                </div>

                {/* Zoom Objective Presets */}
                <div className="flex items-center gap-1.5">
                  <ZoomIn className="h-3.5 w-3.5 text-slate-400 mr-0.5" />
                  {([100, 400, 1000] as const).map((mag) => (
                    <button
                      key={mag}
                      type="button"
                      id={`cell-zoom-${mag}`}
                      onClick={() => setMagnification(mag)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-mono font-semibold border transition-all cursor-pointer ${
                        magnification === mag
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {mag}x
                    </button>
                  ))}

                  <button
                    type="button"
                    id="cell-toggle-stain"
                    onClick={() => setFluorescenceStain((s) => !s)}
                    className={`ml-1 inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold border transition-all cursor-pointer ${
                      fluorescenceStain
                        ? 'bg-pink-600 text-white border-pink-600'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    {fluorescenceStain ? 'Fluorescence' : 'Natural'}
                  </button>
                </div>
              </div>

              {/* 3D Canvas */}
              <div className="relative h-[400px] sm:h-[460px] w-full">
                <CellMicroscope3DCanvas
                  cellType={activeCell.id}
                  magnification={magnification}
                  fluorescenceStain={fluorescenceStain}
                />

                {/* Optical Circular Microscope Vignette Ring */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="h-[88%] w-[88%] rounded-full border border-purple-300/40 shadow-[inset_0_0_40px_rgba(124,58,237,0.06)]" />
                </div>

                {/* Key Organelle Chips */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5 pointer-events-none">
                  {activeCell.keyMarkers.map((marker) => (
                    <span
                      key={marker}
                      className="museum-glass rounded-full px-2.5 py-1 text-[11px] font-mono font-medium text-slate-800"
                    >
                      • {marker}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Structured Scientific Details */}
          <div className="lg:col-span-6 space-y-4">
            <div className="museum-panel rounded-3xl p-6 space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-900">
                    {activeCell.layer}
                  </span>
                  <span className="font-mono text-xs text-slate-500">
                    Size: {activeCell.sizeMicrons}
                  </span>
                </div>
                <h3 className="mt-2.5 text-2xl font-extrabold text-slate-900">
                  {activeCell.nameEn}
                </h3>
                <p className="text-sm font-semibold text-pink-700">{activeCell.nameTh}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{activeCell.summary}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-700">
                    รูปร่างและลักษณะเฉพาะ
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-700">
                    {activeCell.morphology}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-700">
                    ตำแหน่งที่พบ
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-700">
                    {activeCell.location}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-pink-100 bg-pink-50/50 p-4 space-y-2">
                <div>
                  <span className="text-xs font-bold text-pink-900">หน้าที่ทางชีววิทยา: </span>
                  <span className="text-xs leading-relaxed text-slate-700">
                    {activeCell.primaryFunction}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold text-purple-900">กระบวนการทำงาน: </span>
                  <span className="text-xs leading-relaxed text-slate-700">
                    {activeCell.workingProcess}
                  </span>
                </div>
              </div>

              {/* Epidermis vs Gastrodermis Explicit Comparison for Epithelio-muscular */}
              {activeCell.layerComparison && (
                <div className="rounded-2xl border border-sky-200 bg-sky-50/60 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-950">
                    <GitCompare className="h-4 w-4 text-sky-700" />
                    เปรียบเทียบความแตกต่างระหว่างชั้น Epidermis และ Gastrodermis
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-white p-3 border border-sky-100">
                      <div className="text-xs font-bold text-sky-800">
                        {activeCell.layerComparison.epidermalTitle}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">
                        {activeCell.layerComparison.epidermalDetail}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white p-3 border border-pink-100">
                      <div className="text-xs font-bold text-pink-800">
                        {activeCell.layerComparison.gastrodermalTitle}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">
                        {activeCell.layerComparison.gastrodermalDetail}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* System Relationships */}
              <div>
                <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                  ความสัมพันธ์กับระบบอื่นในร่างกาย
                </div>
                <ul className="space-y-1.5">
                  {activeCell.systemRelationships.map((rel) => (
                    <li
                      key={rel}
                      className="flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-700 border border-slate-100"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-600" />
                      <span>{rel}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
