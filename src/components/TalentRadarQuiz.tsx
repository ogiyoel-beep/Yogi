import React, { useState } from 'react';
import { QUIZ_QUESTIONS, TALENT_CATEGORIES } from '../data/curriculumData';
import { TalentCategory } from '../types';
import { soundManager } from '../utils/audio';
import { Sparkles, Award, RotateCcw, Share2, Check, Download, Bookmark } from 'lucide-react';

export const TalentRadarQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, TalentCategory>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('Siswa SMP 7');

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (category: TalentCategory) => {
    soundManager.playClick();
    const updated = {
      ...selectedAnswers,
      [currentQ.id]: category
    };
    setSelectedAnswers(updated);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      soundManager.playHarmonyChord();
    }
  };

  // Calculate scores across the 5 dimensions (scale 0 - 100)
  const scores: Record<string, number> = {
    kasih_empati: 20,
    seni_kreasi: 20,
    hikmat_nalar: 20,
    pelayanan_aksi: 20,
    spiritualitas_doa: 20
  };

  Object.values(selectedAnswers).forEach((cat) => {
    if (scores[cat] !== undefined) {
      scores[cat] += 40;
    }
  });

  // Find dominant talent
  const dominantTalentKey = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));
  const dominantTalent = TALENT_CATEGORIES[dominantTalentKey] || TALENT_CATEGORIES.kasih_empati;

  // Patron Saint suggestion based on dominant talent
  const saintSuggestions: Record<string, { saint: string; title: string; motto: string }> = {
    kasih_empati: {
      saint: 'Santa Teresa dari Kalkuta',
      title: 'Ibu Kaum Miskin & Paling Tersingkir',
      motto: '"Lakukanlah hal-hal kecil dengan cinta yang besar."'
    },
    seni_kreasi: {
      saint: 'Santo Fransiskus dari Asisi',
      title: 'Pencinta Alam Ciptaan & Penggubah Pujian',
      motto: '"Tuhan, jadikanlah aku pembawa damai-Mu."'
    },
    hikmat_nalar: {
      saint: 'Santo Thomas Aquinas',
      title: 'Pujangga Gereja & Terang Akal Budi',
      motto: '"Iman dan akal budi adalah dua sayap yang mengangkat manusia memandang kebenaran."'
    },
    pelayanan_aksi: {
      saint: 'Santo Yusuf Sang Pekerja',
      title: 'Pelindung Pekerja & Teladan Ketekunan Senyap',
      motto: '"Setia dalam karya sederhana sehari-hari demi memuliakan Allah."'
    },
    kepemimpinan: {
      saint: 'Santo Yohanes Paulus II',
      title: 'Gembala Sejati Kaum Muda Dunia',
      motto: '"Jangan takut! Bukalah pintu lebar-lebar bagi Kristus!"'
    },
    spiritualitas_doa: {
      saint: 'Santa Theresia dari Kanak-Kanak Yesus',
      title: 'Jalan Kecil Penuh Kepercayaan Pasrah',
      motto: '"Di dalam jantung Gereja, Ibuku, aku akan menjadi Cinta."'
    }
  };

  const patronSaint = saintSuggestions[dominantTalentKey] || saintSuggestions.kasih_empati;

  const handleResetQuiz = () => {
    soundManager.playClick();
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
  };

  // SVG Radar coordinates generator for 5 vertices
  const dimensions = [
    { key: 'kasih_empati', label: 'Kasih & Empati' },
    { key: 'seni_kreasi', label: 'Kreasi Seni' },
    { key: 'hikmat_nalar', label: 'Hikmat Nalar' },
    { key: 'pelayanan_aksi', label: 'Pelayanan Aksi' },
    { key: 'spiritualitas_doa', label: 'Doa Spiritualitas' }
  ];

  const centerX = 160;
  const centerY = 160;
  const maxRadius = 110;

  const points = dimensions.map((dim, i) => {
    const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
    const value = (scores[dim.key] || 20) / 100;
    const r = maxRadius * value;
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  const gridCircles = [0.25, 0.5, 0.75, 1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 tracking-wider uppercase mb-1">
          <span>Eksplorasi Pribadi</span>
          <span aria-hidden="true">·</span>
          <span>Kenali Karuniamu</span>
          <span aria-hidden="true">·</span>
          <span>Imago Dei Profile</span>
        </div>
        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          Radar & Peta Talenta Unikku
        </h2>
        <p className="mt-2 text-sm sm:text-base text-stone-600 leading-relaxed">
          Temukan bagaimana Allah merancang dirimu secara spesifik melalui pertanyaan diagnostik sederhana,
          serta dapatkan inspirasi teladan Santo/Santa pelindung bagi perjalanan imanmu.
        </p>
      </div>

      {!isCompleted ? (
        /* Quiz Active Container */
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6 max-w-3xl">
          <div className="flex items-center justify-between text-xs text-stone-500 border-b border-stone-100 pb-3">
            <span className="font-semibold text-amber-800">
              Pertanyaan {currentQuestionIndex + 1} dari {QUIZ_QUESTIONS.length}
            </span>
            <div className="flex items-center gap-1">
              {QUIZ_QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-1.5 rounded-full transition-all ${
                    i <= currentQuestionIndex ? 'bg-amber-600' : 'bg-stone-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
            {currentQ.question}
          </h3>

          <div className="grid gap-3 pt-2">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(option.category)}
                className="p-4 rounded-xl border border-stone-200 hover:border-amber-500 bg-stone-50 hover:bg-amber-50/50 text-left transition-all cursor-pointer group space-y-1"
              >
                <p className="text-xs sm:text-sm font-medium text-stone-900 group-hover:text-amber-950 leading-relaxed">
                  {option.text}
                </p>
                <span className="text-[11px] text-stone-500 block">
                  Ciri: {option.trait}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Completed Results: SVG Radar Chart + Spiritual Identity Card */
        <div className="grid lg:grid-cols-12 gap-8 items-start animate-fade-in">
          {/* Left: Interactive SVG Radar Chart (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5 text-center">
            <h4 className="font-cinzel text-base font-bold text-stone-900">
              Visualisasi Spektrum Karunia
            </h4>

            {/* SVG Polygon Radar */}
            <div className="flex justify-center py-2">
              <svg width="320" height="320" className="overflow-visible">
                {/* Background Concentric Circles */}
                {gridCircles.map((factor, i) => (
                  <circle
                    key={i}
                    cx={centerX}
                    cy={centerY}
                    r={maxRadius * factor}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeDasharray={i < 3 ? '2 2' : 'none'}
                  />
                ))}

                {/* Axis lines to each dimension vertex */}
                {dimensions.map((dim, i) => {
                  const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
                  const x = centerX + maxRadius * Math.cos(angle);
                  const y = centerY + maxRadius * Math.sin(angle);
                  return (
                    <line
                      key={dim.key}
                      x1={centerX}
                      y1={centerY}
                      x2={x}
                      y2={y}
                      stroke="#CBD5E1"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Colored Talent Polygon */}
                <polygon
                  points={points}
                  fill="rgba(217, 119, 6, 0.35)"
                  stroke="#D97706"
                  strokeWidth="2.5"
                />

                {/* Vertex Points & Labels */}
                {dimensions.map((dim, i) => {
                  const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
                  const val = (scores[dim.key] || 20) / 100;
                  const x = centerX + maxRadius * val * Math.cos(angle);
                  const y = centerY + maxRadius * val * Math.sin(angle);

                  // Label positions slightly further out
                  const labelR = maxRadius + 22;
                  const labelX = centerX + labelR * Math.cos(angle);
                  const labelY = centerY + labelR * Math.sin(angle);

                  return (
                    <g key={dim.key}>
                      <circle cx={x} cy={y} r="4" fill="#B45309" stroke="#fff" strokeWidth="1.5" />
                      <text
                        x={labelX}
                        y={labelY}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-[10px] font-sans font-semibold fill-stone-700"
                      >
                        {dim.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <p className="text-xs text-stone-500">
              Setiap sudut mewakili salah satu dari karunia yang dirajut Allah dalam dirimu sejak dalam kandungan.
            </p>

            <button
              onClick={handleResetQuiz}
              className="px-4 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Jalankan Ulang Diagnostik</span>
            </button>
          </div>

          {/* Right: Spiritual Identity Card (7 cols) */}
          <div className="lg:col-span-7 bg-amber-950 text-amber-50 rounded-2xl border border-amber-800 shadow-xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            <div className="flex items-start justify-between border-b border-amber-800/80 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block mb-1">
                  KARTU IDENTITAS ROHANI · CITRA ALLAH
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="font-cinzel text-xl sm:text-2xl font-bold text-white bg-transparent border-b border-amber-500/50 focus:border-amber-300 focus:outline-none"
                    title="Klik untuk ubah nama"
                  />
                </div>
              </div>

              <span className="p-3 rounded-xl bg-amber-500/20 text-amber-300">
                <Award className="w-6 h-6" />
              </span>
            </div>

            {/* Dominant Gift Profile */}
            <div className="space-y-2">
              <span className="text-xs text-amber-300/80 uppercase font-semibold">
                Karunia Utama yang Menonjol:
              </span>
              <div className="p-4 rounded-xl bg-stone-900/60 border border-amber-500/30 space-y-2">
                <h4 className="font-cinzel text-lg font-bold text-amber-300">
                  {dominantTalent.name}
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {dominantTalent.description}
                </p>
              </div>
            </div>

            {/* Patron Saint Mentor */}
            <div className="p-4 rounded-xl bg-stone-900/40 border border-amber-700/40 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Teladan Orang Kudus Pelindung:
              </span>
              <h5 className="font-bold text-sm text-white">
                {patronSaint.saint} ({patronSaint.title})
              </h5>
              <p className="text-xs italic font-serif text-stone-300">
                {patronSaint.motto}
              </p>
            </div>

            {/* Personalized Thanksgiving Prayer */}
            <div className="p-4 rounded-xl bg-amber-900/40 border border-amber-600/30 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                Doa Syukur Talenta Pribadi:
              </span>
              <p className="text-xs sm:text-sm italic font-serif leading-relaxed text-amber-100/90">
                &ldquo;Tuhan Yesus Kristus, terima kasih Engkau telah menciptakanku secara dahsyat dan ajaib. 
                Secara istimewa Engkau menganugerahiku {dominantTalent.name.toLowerCase()}. 
                Jauhkan aku dari rasa sombong maupun rasa rendah diri. 
                Pakailah hidupku untuk membahagiakan orang tua, guru, dan teman-temanku, 
                sebab hanya dalam kasih-Mu hidupku bermakna. Amin.&rdquo;
              </p>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-stone-400 text-[11px]">
                Mazmur 139:14 · 1 Korintus 12:4-7
              </span>

              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.print();
                  }
                }}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Cetak / Simpan Kartu</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
