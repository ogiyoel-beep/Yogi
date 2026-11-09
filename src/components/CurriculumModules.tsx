import React, { useState } from 'react';
import { LESSONS } from '../data/curriculumData';
import { BookOpen, Volume2, VolumeX, CheckCircle, Sparkles, ChevronRight, MessageSquareQuote } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const CurriculumModules: React.FC = () => {
  const [selectedLessonId, setSelectedLessonId] = useState<string>(LESSONS[0].id);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [reflectionAnswer, setReflectionAnswer] = useState<Record<string, string>>({});
  const [completedActions, setCompletedActions] = useState<Record<string, boolean>>({});

  const currentLesson = LESSONS.find((l) => l.id === selectedLessonId) || LESSONS[0];

  const handleReadScripture = (text: string) => {
    if (typeof window === 'undefined') return;

    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.9; // peaceful educational rate
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleToggleAction = (lessonId: string) => {
    soundManager.playBell(659.25);
    setCompletedActions((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Editorial Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 tracking-wider uppercase mb-2">
          <span>Modul Pembelajaran</span>
          <span aria-hidden="true">·</span>
          <span>Fase D SMP Kelas VII</span>
          <span aria-hidden="true">·</span>
          <span>4 Pembahasan Pokok</span>
        </div>
        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          Materi Pelajaran: Aku Pribadi yang Unik
        </h2>
        <p className="mt-2 text-sm sm:text-base text-stone-600 leading-relaxed">
          Pelajari bagaimana iman Katolik memandang keunikan setiap insan, menghormati keterbatasan,
          dan memanggil kita bekerjasama sebagai satu persekutuan Tubuh Kristus.
        </p>
      </div>

      {/* Chapter Selection Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {LESSONS.map((lesson) => {
          const isActive = lesson.id === selectedLessonId;
          const isDone = completedActions[lesson.id];
          return (
            <button
              key={lesson.id}
              onClick={() => {
                soundManager.playClick();
                setSelectedLessonId(lesson.id);
                if (isSpeaking && typeof window !== 'undefined') {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                }
              }}
              className={`p-4 rounded-xl text-left transition-all border cursor-pointer relative overflow-hidden ${
                isActive
                  ? 'bg-amber-900 text-amber-50 border-amber-800 shadow-md ring-2 ring-amber-400/50'
                  : 'bg-white text-stone-800 border-stone-200 hover:border-amber-400 hover:bg-amber-50/50 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono font-semibold ${isActive ? 'text-amber-300' : 'text-amber-800'}`}>
                  BAB {lesson.number}
                </span>
                {isDone && (
                  <span className={`text-xs flex items-center gap-1 ${isActive ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Selesai</span>
                  </span>
                )}
              </div>
              <h3 className={`text-sm font-bold line-clamp-2 leading-snug ${isActive ? 'text-white' : 'text-stone-900'}`}>
                {lesson.title}
              </h3>
              <p className={`mt-2 text-xs line-clamp-1 ${isActive ? 'text-stone-300' : 'text-stone-500'}`}>
                {lesson.scripturePassage.reference}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Selected Lesson Stage */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        {/* Lesson Banner with Generated Art */}
        <div className="relative h-48 sm:h-64 overflow-hidden bg-stone-900">
          <img
            src={currentLesson.imagePath}
            alt={currentLesson.title}
            className="w-full h-full object-cover filter brightness-85 saturate-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent flex flex-col justify-end p-6 sm:p-8">
            <span className="text-xs font-semibold text-amber-300 tracking-wider uppercase mb-1">
              Bab {currentLesson.number} · {currentLesson.scripturePassage.reference}
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
              {currentLesson.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl font-light">
              {currentLesson.subtitle}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Scripture Reading Section */}
          <div className="p-5 rounded-xl bg-amber-50/80 border border-amber-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-800" />
                <h4 className="text-sm font-bold text-amber-900 font-cinzel tracking-wide">
                  Bacaan Kitab Suci: {currentLesson.scripturePassage.reference}
                </h4>
              </div>

              <button
                onClick={() => handleReadScripture(currentLesson.scripturePassage.text)}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 transition-colors cursor-pointer"
                title="Dengarkan pembacaan ayat"
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                    <span>Hentikan Audio</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                    <span>Dengarkan Ayat</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-stone-800 text-sm leading-relaxed font-serif italic pl-3 border-l-2 border-amber-500">
              &ldquo;{currentLesson.scripturePassage.text}&rdquo;
            </p>

            <div className="text-xs font-semibold text-amber-900 pt-1">
              Inti Firman: <span className="font-normal text-stone-700">{currentLesson.scripturePassage.highlightVerse}</span>
            </div>
          </div>

          {/* Theological Core Breakdown */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-stone-900 font-cinzel">
              Dasar Teologis & Makna Iman Katolik
            </h4>
            <div className="grid gap-3">
              {currentLesson.theologicalCore.map((point, index) => (
                <div key={index} className="flex items-start gap-3 p-3.5 rounded-lg bg-stone-50 border border-stone-200/60">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-xs font-bold shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Uniqueness Aspects */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-stone-900 font-cinzel">
              Mengenali Dimensi Keunikan Pribadi
            </h4>
            <div className="grid sm:grid-cols-3 gap-4">
              {currentLesson.practicalAspects.map((aspect, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-stone-50/80 border border-stone-200 space-y-2">
                  <h5 className="font-semibold text-sm text-stone-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{aspect.category}</span>
                  </h5>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {aspect.explanation}
                  </p>
                  <div className="p-2.5 rounded-lg bg-white border border-stone-200 text-xs text-amber-900 font-medium">
                    <span className="text-stone-500 block text-[10px] uppercase tracking-wider mb-0.5">Contoh Nyata:</span>
                    {aspect.example}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reflective Questions & Journaling */}
          <div className="space-y-4 p-5 rounded-xl bg-stone-100/70 border border-stone-200">
            <div className="flex items-center gap-2">
              <MessageSquareQuote className="w-4 h-4 text-amber-700" />
              <h4 className="text-sm font-bold text-stone-900 font-cinzel">
                Refleksi Pribadi Remaja Katolik
              </h4>
            </div>

            <div className="space-y-4">
              {currentLesson.reflectiveQuestions.map((q, idx) => (
                <div key={idx} className="space-y-2">
                  <p className="text-xs sm:text-sm font-medium text-stone-800">
                    {idx + 1}. {q}
                  </p>
                  <textarea
                    rows={2}
                    value={reflectionAnswer[`${selectedLessonId}-${idx}`] || ''}
                    onChange={(e) =>
                      setReflectionAnswer((prev) => ({
                        ...prev,
                        [`${selectedLessonId}-${idx}`]: e.target.value
                      }))
                    }
                    placeholder="Tuliskan renungan batinmu di sini..."
                    className="w-full text-xs p-3 rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 text-stone-800 placeholder-stone-400"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Action Call & Commitment */}
          <div className="p-4 sm:p-5 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                Panggilan Aksi Nyata Pekan Ini
              </span>
              <p className="text-xs sm:text-sm font-medium text-emerald-950">
                {currentLesson.actionCall}
              </p>
            </div>

            <button
              onClick={() => handleToggleAction(currentLesson.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                completedActions[currentLesson.id]
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>
                {completedActions[currentLesson.id] ? 'Telah Diberkati & Dijalankan' : 'Komitmen Jalankan'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
