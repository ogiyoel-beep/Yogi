import React, { useState, useEffect, useRef } from 'react';
import { AffirmationCard, TalentCategory } from '../types';
import { INITIAL_AFFIRMATIONS, TALENT_CATEGORIES } from '../data/curriculumData';
import { soundManager } from '../utils/audio';
import { Heart, Send, Sparkles, MessageCircle, ShieldCheck, UserCheck } from 'lucide-react';

const AFFIRMATION_KEY = 'imago_dei_affirmations_v1';

export const AffirmationWall: React.FC = () => {
  const [cards, setCards] = useState<AffirmationCard[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(AFFIRMATION_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return INITIAL_AFFIRMATIONS;
  });

  const [fromName, setFromName] = useState<string>('');
  const [toName, setToName] = useState<string>('');
  const [talent, setTalent] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [category, setCategory] = useState<TalentCategory>('kasih_empati');
  const [verse, setVerse] = useState<string>('Yohanes 13:34');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const bc = new BroadcastChannel('imago_dei_affirmations');
      channelRef.current = bc;

      bc.onmessage = (event) => {
        if (event.data?.type === 'AFFIRMATIONS_UPDATED') {
          setCards(event.data.payload);
        }
      };

      return () => {
        bc.close();
      };
    }
  }, []);

  const handlePostAffirmation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromName.trim() || !toName.trim() || !message.trim()) return;

    soundManager.playBell(587.33);

    const newCard: AffirmationCard = {
      id: `aff-${Date.now()}`,
      fromStudent: fromName.trim(),
      toStudent: toName.trim(),
      talentRecognized: talent.trim() || 'Kebaikan Hati Sahabat',
      message: message.trim(),
      verseAnchor: verse,
      timestamp: Date.now(),
      category: category
    };

    const nextCards = [newCard, ...cards];
    setCards(nextCards);

    if (typeof window !== 'undefined') {
      localStorage.setItem(AFFIRMATION_KEY, JSON.stringify(nextCards));
      channelRef.current?.postMessage({
        type: 'AFFIRMATIONS_UPDATED',
        payload: nextCards
      });
    }

    // Reset fields
    setMessage('');
    setTalent('');
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 tracking-wider uppercase mb-1">
          <span>Budaya Kasih Kristiani</span>
          <span aria-hidden="true">·</span>
          <span>Saling Menghargai</span>
          <span aria-hidden="true">·</span>
          <span>Hentikan Perundungan (Anti-Bullying)</span>
        </div>
        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          Dinding Apresiasi Citra Allah
        </h2>
        <p className="mt-2 text-sm sm:text-base text-stone-600 leading-relaxed">
          Seringkali kita mudah melihat kekurangan teman, namun lupa memuji kebaikannya.
          Kirimkan apresiasi tulus untuk menguatkan saudara-saudari kita di kelas!
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Form Card (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h3 className="font-cinzel text-base font-bold text-stone-900">
              Kirim Apresiasi Kasih
            </h3>
          </div>

          <form onSubmit={handlePostAffirmation} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Namamu:</label>
                <input
                  type="text"
                  required
                  value={fromName}
                  onChange={(e) => setFromName(e.target.value)}
                  placeholder="Contoh: Maria"
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Untuk Teman:</label>
                <input
                  type="text"
                  required
                  value={toName}
                  onChange={(e) => setToName(e.target.value)}
                  placeholder="Contoh: Gabriel"
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Karunia / Sikap Baik yang Kamu Kagumi:</label>
              <input
                type="text"
                required
                value={talent}
                onChange={(e) => setTalent(e.target.value)}
                placeholder="Contoh: Selalu menyapa dengan senyum tulus..."
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Pesan Penguatan / Ucapan Terima Kasih:</label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan apresiasi yang tulus dan membangun..."
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Ayat Pengikat Kasih:</label>
              <select
                value={verse}
                onChange={(e) => setVerse(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
              >
                <option value="Yohanes 13:34">Yohanes 13:34 (Saling Mengasihi Seperti Aku Telah Mengasihi Kamu)</option>
                <option value="1 Korintus 12:26">1 Korintus 12:26 (Satu Anggota Bersukacita, Semua Bersukacita)</option>
                <option value="Mazmur 139:14">Mazmur 139:14 (Kejadianmu Dahsyat dan Ajaib)</option>
                <option value="Efesus 4:32">Efesus 4:32 (Ramah Seorang Terhadap yang Lain, Penuh Kasih Mesra)</option>
                <option value="Amsal 17:17">Amsal 17:17 (Seorang Sahabat Menaruh Kasih Setiap Waktu)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Tempelkan di Dinding Apresiasi</span>
            </button>

            {isSuccess && (
              <div className="p-2.5 rounded-lg bg-emerald-100 border border-emerald-300 text-xs text-emerald-900 text-center font-medium animate-fade-in">
                Apresiasi kasihmu telah berhasil dibagikan!
              </div>
            )}
          </form>
        </div>

        {/* Right: Wall of Posted Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Menampilkan {cards.length} Pesan Apresiasi Sahabat</span>
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Ruang Damai & Positif</span>
            </span>
          </div>

          <div className="grid gap-4 max-h-[640px] overflow-y-auto pr-1">
            {cards.map((card) => {
              const meta = TALENT_CATEGORIES[card.category] || TALENT_CATEGORIES.kasih_empati;
              return (
                <div
                  key={card.id}
                  className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs hover:shadow-md transition-shadow space-y-3 relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center">
                        {card.toStudent.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                          Untuk: {card.toStudent}
                        </h4>
                        <span className="text-[11px] text-stone-500">
                          Dari: {card.fromStudent}
                        </span>
                      </div>
                    </div>

                    <span
                      className="px-2.5 py-0.5 rounded text-[10px] font-semibold text-white whitespace-nowrap"
                      style={{ backgroundColor: meta.color }}
                    >
                      {card.talentRecognized}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 italic font-serif leading-relaxed pl-3 border-l-2 border-amber-300">
                    &ldquo;{card.message}&rdquo;
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-2 border-t border-stone-100">
                    <span className="font-semibold text-amber-800">
                      Firman: {card.verseAnchor}
                    </span>
                    <span>
                      {new Date(card.timestamp).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
