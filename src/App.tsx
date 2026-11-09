import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CurriculumModules } from './components/CurriculumModules';
import { CollaborativeMosaicGame } from './components/CollaborativeMosaicGame';
import { CollaborativeQuestGame } from './components/CollaborativeQuestGame';
import { TalentRadarQuiz } from './components/TalentRadarQuiz';
import { AffirmationWall } from './components/AffirmationWall';
import { CatholicTeacherGuideModal } from './components/CatholicTeacherGuideModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('pelajaran');
  const [isTeacherGuideOpen, setIsTeacherGuideOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-amber-50/30 text-stone-900 flex flex-col font-sans">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section shown on the primary lesson and mosaic tabs */}
        {activeTab === 'pelajaran' && (
          <HeroSection
            onStartLearning={() => {
              const el = document.getElementById('lesson-modules');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onPlayMosaic={() => setActiveTab('mosaik')}
          />
        )}

        {/* Tab 1: Curriculum Lessons */}
        {activeTab === 'pelajaran' && (
          <div id="lesson-modules">
            <CurriculumModules />
          </div>
        )}

        {/* Tab 2: Collaborative Cathedral Mosaic Game */}
        {activeTab === 'mosaik' && (
          <CollaborativeMosaicGame />
        )}

        {/* Tab 3: Collaborative Body of Christ Quest Game */}
        {activeTab === 'misi-tim' && (
          <CollaborativeQuestGame />
        )}

        {/* Tab 4: Talent Radar & Spiritual Discovery Quiz */}
        {activeTab === 'radar-talenta' && (
          <TalentRadarQuiz />
        )}

        {/* Tab 5: Affirmation Wall */}
        {activeTab === 'apresiasi' && (
          <AffirmationWall />
        )}
      </main>

      {/* Quiet, Human Editorial Footer (Anti-Slop Rule §1.B) */}
      <footer className="mt-20 border-t border-stone-200 bg-white py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-500">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-cinzel font-bold text-stone-900 text-sm tracking-wider">
              IMAGO DEI · PENDIDIKAN AGAMA KATOLIK SMP
            </p>
            <p>
              Media Pembelajaran Interaktif & Gamifikasi Kolaboratif Kelas VII Fase D.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
            <span>Kejadian 1:26-31</span>
            <span aria-hidden="true">·</span>
            <span>Mazmur 139:13-16</span>
            <span aria-hidden="true">·</span>
            <span>1 Korintus 12:12-27</span>
            <span aria-hidden="true">·</span>
            <span>Matius 25:14-30</span>
          </div>

          <div className="text-stone-400 text-[11px] text-center md:text-right">
            &ldquo;Sebab kita ini buatan Allah, diciptakan dalam Kristus Yesus untuk melakukan pekerjaan baik.&rdquo; (Ef 2:10)
          </div>
        </div>
      </footer>

      {/* Teacher Guide (RPP) Modal */}
      <CatholicTeacherGuideModal
        isOpen={isTeacherGuideOpen}
        onClose={() => setIsTeacherGuideOpen(false)}
      />
    </div>
  );
}
