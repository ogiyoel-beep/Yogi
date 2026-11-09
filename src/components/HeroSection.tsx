import React from 'react';
import { Sparkles, Users, Award, BookOpen } from 'lucide-react';

interface HeroSectionProps {
  onStartLearning: () => void;
  onPlayMosaic: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartLearning,
  onPlayMosaic
}) => {
  return (
    <section className="relative overflow-hidden bg-stone-900 text-stone-100 border-b border-amber-900/40">
      {/* Background Image with Dark Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_stained_glass_cross_1794193335064.jpg"
          alt="Kaca patri katedral melambangkan tangan-tangan bersatu dalam terang Ilahi"
          className="w-full h-full object-cover opacity-35 filter brightness-90 saturate-120"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/85 to-stone-950/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Unboxed Metadata (Zero-Pill Rule) */}
        <div className="flex items-center gap-2 text-xs md:text-sm text-amber-300 font-medium tracking-wide uppercase mb-4">
          <span>Pendidikan Agama Katolik & Budi Pekerti</span>
          <span aria-hidden="true">·</span>
          <span>Fase D (SMP Kelas 7)</span>
          <span aria-hidden="true">·</span>
          <span>Kurikulum Merdeka</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Aku Pribadi yang Unik & Berharga di Mata Allah
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl">
              Setiap kita diciptakan seturut citra dan rupa Allah (<span className="text-amber-200 italic font-serif">Imago Dei</span>). 
              Perbedaan fisik, sifat, dan talenta bukan untuk memisahkan, melainkan karunia Roh Kudus agar kita saling melengkapi sebagai satu Tubuh Kristus.
            </p>

            {/* Scripture Anchor Quote */}
            <blockquote className="p-4 rounded-xl bg-stone-800/80 border border-amber-500/30 text-amber-100/90 text-sm italic font-serif leading-relaxed">
              &ldquo;Aku bersyukur kepada-Mu oleh karena kejadianku dahsyat dan ajaib; ajaib apa yang Kaubuat, dan jiwaku benar-benar menyadarinya.&rdquo;
              <footer className="mt-1 text-xs font-sans not-italic text-amber-300 font-semibold">
                — Mazmur 139:14
              </footer>
            </blockquote>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onStartLearning}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-all shadow-md hover:shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Pelajari Materi Bab</span>
              </button>

              <button
                onClick={onPlayMosaic}
                className="px-6 py-3 rounded-xl bg-stone-800/90 hover:bg-stone-700/90 text-amber-200 hover:text-white border border-amber-400/40 text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>Game Mosaik Kolaboratif</span>
              </button>
            </div>
          </div>

          {/* Quick Pillar Highlights */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="p-4 rounded-xl bg-stone-900/80 border border-amber-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="p-2 rounded-lg bg-amber-500/20 text-amber-300">
                  <Sparkles className="w-4 h-4" />
                </span>
                <h3 className="font-semibold text-stone-100 text-sm">4 Sub-Bab Katekese Interaktif</h3>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Kejadian 1:26-31, Mazmur 139, 1 Korintus 12, dan Perumpamaan Talenta (Matius 25) disajikan kontekstual bagi remaja SMP.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-900/80 border border-rose-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="p-2 rounded-lg bg-rose-500/20 text-rose-300">
                  <Users className="w-4 h-4" />
                </span>
                <h3 className="font-semibold text-stone-100 text-sm">2 Game Kolaboratif Visual</h3>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Bangun Mosaik Katedral bercahaya bersama sekelas dan selesaikan Misi Tim Tubuh Kristus (Mata, Telinga, Tangan, Kaki, Hati).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-900/80 border border-blue-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="p-2 rounded-lg bg-blue-500/20 text-blue-300">
                  <Award className="w-4 h-4" />
                </span>
                <h3 className="font-semibold text-stone-100 text-sm">Radar Talenta & Dinding Apresiasi</h3>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Temukan spektrum karunia unikmu dan bagikan kartu apresiasi kasih untuk mengikis perilaku perundungan (anti-bullying).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
