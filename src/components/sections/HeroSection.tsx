import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScanEye, RotateCw, Compass, FlaskConical, ArrowDownRight, MousePointerClick } from 'lucide-react';
import { HeroHydraCanvas } from '../three/HeroHydraCanvas';
import { ANATOMY_PARTS } from '../../data/anatomyData';

interface HeroSectionProps {
  onJumpToAnatomyPart: (partId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onJumpToAnatomyPart }) => {
  const [xrayMode, setXrayMode] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [heroSelectedPart, setHeroSelectedPart] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const quickPartInfo = ANATOMY_PARTS.find((p) => p.id === heroSelectedPart);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden museum-stage-bg pt-16"
    >
      {/* Full-viewport 3D Interactive Hydra Specimen */}
      <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-12 items-center mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 gap-6">
        {/* Left Editorial / Museum Typography Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 lg:col-span-5 flex flex-col justify-center space-y-5 pointer-events-auto"
        >
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-3.5 py-1 text-xs font-mono font-medium text-sky-900 shadow-xs">
            <span>PHYLUM CNIDARIA</span>
            <span className="text-slate-300">•</span>
            <span>CLASS HYDROZOA</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              HYDRA
            </h1>
            <p className="text-xl font-semibold tracking-tight text-sky-800 sm:text-2xl">
              The Remarkable Freshwater Predator
            </p>
          </div>

          <blockquote className="border-l-2 border-teal-500 pl-4 text-base leading-relaxed text-slate-700 sm:text-lg">
            “สิ่งมีชีวิตขนาดเล็กที่มีระบบร่างกายเรียบง่าย แต่เต็มไปด้วยความมหัศจรรย์ทางชีววิทยา”
          </blockquote>

          <p className="text-sm leading-relaxed text-slate-600">
            สำรวจนิทรรศการชีววิทยาดิจิทัล 3 มิติของโพลิปน้ำจืดอมตะ ตั้งแต่โครงสร้างโปร่งแสง 2 ชั้นเนื้อเยื่อ
            กลไกการยิงเข็มพิษระดับไมโครวินาที การย่อยอาหารสองระดับ ไปจนถึงการงอกใหม่ของร่างกาย
          </p>

          {/* Required 3 Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              id="hero-btn-anatomy"
              onClick={() => scrollToSection('anatomy')}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:-translate-y-0.5 cursor-pointer"
            >
              <Compass className="h-4 w-4 text-sky-400" />
              Explore Anatomy
            </button>

            <button
              type="button"
              id="hero-btn-lab"
              onClick={() => scrollToSection('feeding-lab')}
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-sky-700 hover:-translate-y-0.5 cursor-pointer"
            >
              <FlaskConical className="h-4 w-4" />
              Enter 3D Laboratory
            </button>

            <button
              type="button"
              id="hero-btn-feeds"
              onClick={() => scrollToSection('digestion')}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-800 shadow-xs transition-all hover:border-teal-400 hover:bg-teal-50/60 hover:-translate-y-0.5 cursor-pointer"
            >
              <ArrowDownRight className="h-4 w-4 text-teal-600" />
              Discover How Hydra Feeds
            </button>
          </div>

          {/* Specimen Spec Metrics */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-200/80">
            <div>
              <div className="text-[11px] font-mono uppercase text-slate-500">Body Plan</div>
              <div className="text-sm font-bold text-slate-900">Diploblastic</div>
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase text-slate-500">Body Length</div>
              <div className="text-sm font-bold text-slate-900">2 – 25 mm</div>
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase text-slate-500">Tentacles</div>
              <div className="text-sm font-bold text-slate-900">5 – 8 Arms</div>
            </div>
          </div>
        </motion.div>

        {/* Center / Right Interactive 3D Specimen Viewport */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.1 }}
          className="relative lg:col-span-7 h-[460px] sm:h-[560px] lg:h-[640px] w-full rounded-3xl border border-slate-200/80 bg-white/50 shadow-sm overflow-hidden"
        >
          <HeroHydraCanvas
            xrayMode={xrayMode}
            autoRotate={autoRotate}
            onSelectQuickPart={(partId) => setHeroSelectedPart(partId)}
          />

          {/* Top Floating Specimen Controls */}
          <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
            <div className="museum-glass pointer-events-auto inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-slate-700">
              <MousePointerClick className="h-3.5 w-3.5 text-sky-600" />
              <span>ลากเพื่อหมุน 360° • ซูม • คลิกโครงสร้าง</span>
            </div>

            <div className="pointer-events-auto flex items-center gap-2">
              <button
                type="button"
                id="hero-toggle-rotate"
                onClick={() => setAutoRotate((r) => !r)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-all cursor-pointer ${
                  autoRotate
                    ? 'bg-white/95 text-slate-800 border-slate-300 shadow-xs'
                    : 'bg-slate-100/90 text-slate-500 border-slate-200'
                }`}
              >
                <RotateCw className={`h-3.5 w-3.5 ${autoRotate ? 'text-teal-600' : ''}`} />
                {autoRotate ? 'Auto-Rotate On' : 'Auto-Rotate Off'}
              </button>

              <button
                type="button"
                id="hero-toggle-xray"
                onClick={() => setXrayMode((x) => !x)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold border transition-all cursor-pointer ${
                  xrayMode
                    ? 'bg-slate-900 text-sky-300 border-slate-900 shadow-md'
                    : 'bg-white/95 text-slate-800 border-slate-300 hover:border-sky-400 shadow-xs'
                }`}
              >
                <ScanEye className="h-3.5 w-3.5" />
                {xrayMode ? 'ปิดโหมด X-Ray' : 'เปิดโหมด X-Ray'}
              </button>
            </div>
          </div>

          {/* Bottom Live Part Inspector Toast if User Clicks Hero 3D Model */}
          {quickPartInfo && (
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm museum-glass rounded-2xl p-3.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-[11px] font-mono font-semibold text-sky-700">
                    {quickPartInfo.categoryLabelTh}
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {quickPartInfo.nameEn} — {quickPartInfo.nameTh}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setHeroSelectedPart(null)}
                  className="text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <p className="mt-1.5 text-xs text-slate-600 line-clamp-2">
                {quickPartInfo.physiologicalFunction}
              </p>
              <button
                type="button"
                onClick={() => {
                  onJumpToAnatomyPart(quickPartInfo.id);
                  scrollToSection('anatomy');
                }}
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-900 cursor-pointer"
              >
                ศึกษาเจาะลึกในหน้า Anatomy →
              </button>
            </div>
          )}

          {/* X-Ray Legend Indicator */}
          {xrayMode && !quickPartInfo && (
            <div className="absolute bottom-4 left-4 museum-glass rounded-xl px-3.5 py-2 text-xs text-slate-700">
              <span className="font-semibold text-sky-800">โหมด X-Ray:</span>{' '}
              เผยให้เห็น Gastrovascular Cavity (สีม่วง), Nerve Net, Mesoglea และโครงสร้างภายในหนวด
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
