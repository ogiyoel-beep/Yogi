import React, { useState } from 'react';
import { BodyPartRole, QuestMission } from '../types';
import { BODY_ROLES, QUEST_MISSIONS } from '../data/curriculumData';
import { soundManager } from '../utils/audio';
import {
  Users,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export const CollaborativeQuestGame: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<BodyPartRole>('telinga');
  const [currentMissionIndex, setCurrentMissionIndex] = useState<number>(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [hasResolved, setHasResolved] = useState<boolean>(false);
  const [completedMissions, setCompletedMissions] = useState<Record<string, boolean>>({});
  const [teamScore, setTeamScore] = useState<number>(100);

  const currentMission: QuestMission = QUEST_MISSIONS[currentMissionIndex] || QUEST_MISSIONS[0];
  const activeRoleMeta = BODY_ROLES[selectedRole];

  const handleSelectRole = (role: BodyPartRole) => {
    soundManager.playClick();
    setSelectedRole(role);
  };

  const handleExecuteChoice = (choiceId: string) => {
    setSelectedChoiceId(choiceId);
    setHasResolved(true);

    const choice = currentMission.choices.find((c) => c.id === choiceId);
    if (choice?.success) {
      soundManager.playHarmonyChord();
      setCompletedMissions((prev) => ({
        ...prev,
        [currentMission.id]: true
      }));
      setTeamScore((s) => s + 50);
    } else {
      soundManager.playBell(349.23); // F4
    }
  };

  const handleNextMission = () => {
    soundManager.playClick();
    setSelectedChoiceId(null);
    setHasResolved(false);
    if (currentMissionIndex < QUEST_MISSIONS.length - 1) {
      setCurrentMissionIndex((prev) => prev + 1);
    } else {
      // Reached end of all missions
      setCurrentMissionIndex(0);
    }
  };

  const handleResetGame = () => {
    soundManager.playClick();
    setCurrentMissionIndex(0);
    setSelectedChoiceId(null);
    setHasResolved(false);
    setCompletedMissions({});
    setTeamScore(100);
  };

  const currentChoice = currentMission.choices.find((c) => c.id === selectedChoiceId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 tracking-wider uppercase mb-1">
            <span>Simulasi Kolaboratif</span>
            <span aria-hidden="true">·</span>
            <span>1 Korintus 12:21</span>
            <span aria-hidden="true">·</span>
            <span>Sinergi Tubuh Kristus</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Misi Tim Tubuh Kristus
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl leading-relaxed">
            Tidak ada anggota yang dapat menyelesaikan misi sendirian. Satukan karunia Mata, Telinga,
            Tangan, Kaki, dan Hati untuk memecahkan dilema nyata di sekolah dan masyarakat!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-amber-100/70 border border-amber-300 text-xs font-bold text-amber-950 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>Skor Sinergi Tim: {teamScore} Poin</span>
          </div>

          <button
            onClick={handleResetGame}
            className="p-2 text-stone-400 hover:text-stone-700 transition-colors"
            title="Mulai Ulang Misi"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Role Selection Bar: The 5 Essential Members */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Pilih Peran Anggota Tubuhmu:
          </h4>
          <span className="text-xs text-stone-500 italic">
            Peran aktif saat ini: <strong className="text-stone-900 font-semibold">{activeRoleMeta.title}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {(Object.keys(BODY_ROLES) as BodyPartRole[]).map((roleKey) => {
            const role = BODY_ROLES[roleKey];
            const isSelected = selectedRole === roleKey;
            return (
              <button
                key={roleKey}
                onClick={() => handleSelectRole(roleKey)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-amber-950 text-white border-amber-800 shadow-md ring-2 ring-amber-400/60'
                    : 'bg-white text-stone-800 border-stone-200 hover:border-amber-400 hover:bg-amber-50/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{role.symbol}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </div>
                <h5 className={`text-xs font-bold leading-tight ${isSelected ? 'text-amber-200' : 'text-stone-900'}`}>
                  {role.title.split(' ')[1]}
                </h5>
                <p className={`text-[10px] mt-1 line-clamp-2 leading-tight ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                  {role.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Role Scripture & Special Ability Callout */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-lg">{activeRoleMeta.symbol}</span>
            <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
              Keahlian Khusus {activeRoleMeta.title}:
            </span>
          </div>
          <p className="text-xs text-stone-700">
            {activeRoleMeta.specialAbility}
          </p>
        </div>

        <blockquote className="text-xs italic font-serif text-amber-900 border-l-2 border-amber-400 pl-3 sm:max-w-xs shrink-0">
          {activeRoleMeta.scriptureQuote}
        </blockquote>
      </div>

      {/* Main Mission Scenario Box */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        {/* Mission Banner */}
        <div className="bg-stone-900 text-stone-100 p-6 sm:p-8 space-y-3 border-b border-stone-800">
          <div className="flex items-center justify-between text-xs text-amber-400 font-semibold tracking-wide uppercase">
            <span>Kasus {currentMissionIndex + 1} dari {QUEST_MISSIONS.length}</span>
            <span>Lokasi: {currentMission.location}</span>
          </div>

          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
            {currentMission.title}
          </h3>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-3xl">
            {currentMission.context}
          </p>

          <div className="p-3 rounded-lg bg-stone-800/80 border border-stone-700 text-xs text-amber-200/90">
            <strong>Tantangan Bersama:</strong> {currentMission.challengeDescription}
          </div>
        </div>

        {/* Interactive Strategy Choices */}
        <div className="p-6 sm:p-8 space-y-6">
          <h4 className="font-cinzel text-base font-bold text-stone-900">
            Pilihlah Strategi Kolaborasi Tim Tubuh Kristus:
          </h4>

          <div className="grid gap-4">
            {currentMission.choices.map((choice) => {
              const isSelected = selectedChoiceId === choice.id;
              return (
                <div
                  key={choice.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isSelected
                      ? choice.success
                        ? 'bg-emerald-50 border-emerald-400 shadow-sm'
                        : 'bg-rose-50 border-rose-300 shadow-sm'
                      : 'bg-stone-50 border-stone-200 hover:border-amber-400 hover:bg-stone-100/80'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-700">Peran Terlibat:</span>
                        <div className="flex items-center gap-1">
                          {choice.involvedRoles.map((r) => (
                            <span
                              key={r}
                              className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-stone-200 text-stone-800"
                            >
                              {BODY_ROLES[r]?.symbol} {BODY_ROLES[r]?.title.split(' ')[1]}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm font-medium text-stone-900 leading-relaxed">
                        {choice.description}
                      </p>
                    </div>

                    {!hasResolved ? (
                      <button
                        onClick={() => handleExecuteChoice(choice.id)}
                        className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
                      >
                        Jalankan Aksi Ini
                      </button>
                    ) : isSelected ? (
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 ${
                          choice.success ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                        }`}
                      >
                        {choice.success ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Sinergi Berhasil</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Kurang Sinergi</span>
                          </>
                        )}
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Outcome & Theological Reflection Reveal */}
          {hasResolved && currentChoice && (
            <div
              className={`p-5 rounded-xl border animate-fade-in space-y-4 ${
                currentChoice.success
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50/80 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-2">
                {currentChoice.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                )}
                <h4 className="font-bold text-sm">
                  {currentChoice.success ? 'Hasil Tindakan: Berhasil Menghadirkan Kasih Kristus' : 'Hasil Tindakan: Perlu Refleksi Bersama'}
                </h4>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-stone-800">
                {currentChoice.outcomeText}
              </p>

              <div className="p-3.5 rounded-lg bg-white/90 border border-stone-200 text-xs space-y-1">
                <span className="font-bold uppercase tracking-wider text-amber-800 block flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Refleksi Teologis Katolik:</span>
                </span>
                <p className="italic text-stone-700 leading-relaxed font-serif">
                  {currentChoice.spiritualReflection}
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextMission}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>
                    {currentMissionIndex < QUEST_MISSIONS.length - 1
                      ? 'Lanjut ke Kasus Misi Berikutnya'
                      : 'Ulangi Misi Tubuh Kristus'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
