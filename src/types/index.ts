export type TalentCategory = 
  | 'kasih_empati'
  | 'seni_kreasi'
  | 'hikmat_nalar'
  | 'pelayanan_aksi'
  | 'kepemimpinan'
  | 'spiritualitas_doa';

export interface TalentMeta {
  id: TalentCategory;
  name: string;
  color: string;
  bgClass: string;
  borderClass: string;
  iconName: string;
  description: string;
  biblicalExample: string;
}

export interface MosaicTile {
  id: string;
  x: number;
  y: number;
  authorName: string;
  schoolRole: string; // e.g. "SMP 7A", "Siswa", "Guru"
  talentCategory: TalentCategory;
  talentName: string; // e.g. "Mampu mendengarkan teman yang sedih"
  affirmation: string; // "Aku bersyukur Tuhan memberi hati yang sabar"
  timestamp: number;
  likes: number;
}

export type BodyPartRole = 'mata' | 'telinga' | 'tangan' | 'kaki' | 'hati';

export interface BodyRoleMeta {
  id: BodyPartRole;
  title: string;
  symbol: string;
  description: string;
  scriptureQuote: string;
  specialAbility: string;
  color: string;
}

export interface QuestMission {
  id: string;
  title: string;
  context: string;
  location: string;
  requiredRoles: BodyPartRole[];
  challengeDescription: string;
  choices: {
    id: string;
    description: string;
    involvedRoles: BodyPartRole[];
    outcomeText: string;
    success: boolean;
    spiritualReflection: string;
  }[];
}

export interface LessonContent {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  scripturePassage: {
    reference: string;
    text: string;
    highlightVerse: string;
  };
  theologicalCore: string[];
  practicalAspects: {
    category: string;
    explanation: string;
    example: string;
  }[];
  reflectiveQuestions: string[];
  actionCall: string;
  imagePath: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    category: TalentCategory;
    trait: string;
  }[];
}

export interface AffirmationCard {
  id: string;
  fromStudent: string;
  toStudent: string;
  talentRecognized: string;
  message: string;
  verseAnchor: string;
  timestamp: number;
  category: TalentCategory;
}
