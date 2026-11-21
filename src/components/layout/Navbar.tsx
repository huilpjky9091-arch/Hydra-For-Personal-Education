import React, { useEffect, useState } from 'react';
import { Menu, X, Microscope } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'หน้าแรก' },
  { id: 'anatomy', label: 'กายวิภาค 3D' },
  { id: 'cells', label: 'เซลล์วิทยา' },
  { id: 'nematocyst', label: 'เข็มพิษ' },
  { id: 'digestion', label: 'การย่อยอาหาร' },
  { id: 'enzymes', label: 'เอนไซม์' },
  { id: 'excretion', label: 'การขับถ่าย' },
  { id: 'feeding-lab', label: 'ห้องทดลอง 3D' },
  { id: 'physiology', label: 'สรีรวิทยา' },
  { id: 'regeneration', label: 'การงอกใหม่' },
  { id: 'reproduction', label: 'การสืบพันธุ์' },
  { id: 'knowledge', label: 'คลังความรู้ & Quiz' },
];

export const Navbar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeId, setActiveId] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)) : 0;
      setScrollProgress(pct);

      // Determine active section
      let current = 'hero';
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            current = item.id;
          }
        }
      }
      setActiveId(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80 bg-white/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2.5 text-left cursor-pointer group"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sky-400 shadow-sm transition-transform group-hover:scale-105">
            <Microscope className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-extrabold tracking-wider text-slate-900">
              HYDRA
            </div>
            <div className="text-[10px] font-medium tracking-wide text-slate-500">
              IMMORTAL FRESHWATER POLYP
            </div>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-0.5" aria-label="Primary Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className={`whitespace-nowrap rounded-lg px-2 py-1.5 text-[11px] font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-sky-50 text-sky-800 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Tablet Compact Jump + Mobile Menu Toggle */}
        <div className="flex items-center gap-2 xl:hidden">
          <button
            type="button"
            onClick={() => scrollTo('feeding-lab')}
            className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-700 cursor-pointer"
          >
            3D Lab
          </button>
          <button
            type="button"
            aria-label="Toggle Menu"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white/96 px-4 py-3 xl:hidden">
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className={`rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-sky-50 text-sky-800 font-semibold border border-sky-200'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Scroll Progress Indicator Bar */}
      <div className="h-[2.5px] w-full bg-slate-100">
        <div
          className="h-full bg-gradient-to-r from-sky-500 via-teal-500 to-purple-600 transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
};
