import React from 'react';
import { BookMarked, ArrowUp } from 'lucide-react';
import { SCIENTIFIC_REFERENCES } from '../../data/knowledgeCenterData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-3">
            <div className="text-lg font-extrabold tracking-wider text-white">
              HYDRA — THE IMMORTAL FRESHWATER POLYP
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              พิพิธภัณฑ์ชีววิทยาดิจิทัล 3 มิติเพื่อการศึกษาด้านสัตววิทยาและชีววิทยาของสัตว์ไม่มีกระดูกสันหลัง
              (Phylum Cnidaria, Class Hydrozoa) ออกแบบเพื่อการเรียนรู้เชิงโต้ตอบที่ถูกต้องตามหลักวิชาการ
            </p>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-sky-300 hover:bg-slate-700 cursor-pointer"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              กลับสู่ด้านบนสุด
            </button>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
              <BookMarked className="h-4 w-4" />
              แหล่งอ้างอิงทางวิทยาศาสตร์ (Scientific References)
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {SCIENTIFIC_REFERENCES.map((ref, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-800/50 p-3.5 text-xs"
                >
                  <div className="font-semibold text-white">{ref.title}</div>
                  <div className="mt-1 text-slate-400">
                    {ref.authors} ({ref.year})
                  </div>
                  <div className="mt-0.5 font-mono text-[11px] text-sky-400">{ref.source}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <span>HYDRA Digital Biology Museum • Built with React, TypeScript & Three.js</span>
          <span>Scientific Accuracy: Diploblastic • Incomplete Digestive Tract • Diffusion Excretion</span>
        </div>
      </div>
    </footer>
  );
};
