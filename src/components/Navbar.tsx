import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenTeacherGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenTeacherGuide
}) => {
  return (
    <header className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur-md text-amber-50 border-b border-amber-900/30 px-6 py-3.5 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); setActiveTab('pelajaran'); }}
          className="font-cinzel text-xl font-bold tracking-wider text-amber-300 hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>IMAGO DEI</span>
          <span className="text-xs font-sans tracking-normal font-normal text-amber-200/60 uppercase hidden sm:inline">
            · Katolik Y7
          </span>
        </a>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('pelajaran')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'pelajaran'
                ? 'text-amber-300 border-b-2 border-amber-400 font-semibold'
                : 'text-stone-300 hover:text-amber-200'
            }`}
          >
            Materi Pelajaran
          </button>

          <button
            onClick={() => setActiveTab('mosaik')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'mosaik'
                ? 'text-amber-300 border-b-2 border-amber-400 font-semibold'
                : 'text-stone-300 hover:text-amber-200'
            }`}
          >
            Mosaik Kolaboratif
          </button>

          <button
            onClick={() => setActiveTab('misi-tim')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'misi-tim'
                ? 'text-amber-300 border-b-2 border-amber-400 font-semibold'
                : 'text-stone-300 hover:text-amber-200'
            }`}
          >
            Misi Tubuh Kristus
          </button>

          <button
            onClick={() => setActiveTab('radar-talenta')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'radar-talenta'
                ? 'text-amber-300 border-b-2 border-amber-400 font-semibold'
                : 'text-stone-300 hover:text-amber-200'
            }`}
          >
            Radar Talenta
          </button>

          <button
            onClick={() => setActiveTab('apresiasi')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'apresiasi'
                ? 'text-amber-300 border-b-2 border-amber-400 font-semibold'
                : 'text-stone-300 hover:text-amber-200'
            }`}
          >
            Dinding Apresiasi
          </button>
        </nav>

        {/* Zone 3: Exactly 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenTeacherGuide}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-500/20 text-amber-200 hover:bg-amber-500/30 border border-amber-400/40 transition-all whitespace-nowrap shrink-0"
          >
            Panduan Guru (RPP)
          </button>
        </div>
      </div>

      {/* Mobile nav bar below on small screens */}
      <div className="lg:hidden flex items-center justify-start gap-3 overflow-x-auto pt-3 pb-1 mt-2 border-t border-stone-800 text-xs no-scrollbar">
        <button
          onClick={() => setActiveTab('pelajaran')}
          className={`whitespace-nowrap px-2.5 py-1 rounded ${activeTab === 'pelajaran' ? 'bg-amber-500 text-stone-900 font-semibold' : 'text-stone-300'}`}
        >
          Pelajaran
        </button>
        <button
          onClick={() => setActiveTab('mosaik')}
          className={`whitespace-nowrap px-2.5 py-1 rounded ${activeTab === 'mosaik' ? 'bg-amber-500 text-stone-900 font-semibold' : 'text-stone-300'}`}
        >
          Mosaik Katedral
        </button>
        <button
          onClick={() => setActiveTab('misi-tim')}
          className={`whitespace-nowrap px-2.5 py-1 rounded ${activeTab === 'misi-tim' ? 'bg-amber-500 text-stone-900 font-semibold' : 'text-stone-300'}`}
        >
          Misi Tubuh Kristus
        </button>
        <button
          onClick={() => setActiveTab('radar-talenta')}
          className={`whitespace-nowrap px-2.5 py-1 rounded ${activeTab === 'radar-talenta' ? 'bg-amber-500 text-stone-900 font-semibold' : 'text-stone-300'}`}
        >
          Radar Talenta
        </button>
        <button
          onClick={() => setActiveTab('apresiasi')}
          className={`whitespace-nowrap px-2.5 py-1 rounded ${activeTab === 'apresiasi' ? 'bg-amber-500 text-stone-900 font-semibold' : 'text-stone-300'}`}
        >
          Apresiasi
        </button>
      </div>
    </header>
  );
};
