export type LanguageMode = 'pahadi' | 'hindi' | 'english';

export interface LocalizedText {
  pahadi: string;
  hindi: string;
  english: string;
}

export interface PipelineStage {
  id: string;
  order: number;
  title: LocalizedText;
  analogy: LocalizedText;
  techConcept: LocalizedText;
  kitchenEquivalent: LocalizedText;
  hardwareExamples: LocalizedText[];
  iconName: string;
  statusBadge: string;
}

export interface HardwarePart {
  id: string;
  name: LocalizedText;
  metaphorTitle: LocalizedText;
  analogy: LocalizedText;
  technicalRole: LocalizedText;
  simpleExplanation: LocalizedText;
  keySpecs: string[];
  funFact: LocalizedText;
  category: 'core' | 'memory' | 'graphics' | 'power' | 'io';
  slotType: string;
}

export interface GlossaryItem {
  id: string;
  techTerm: string;
  metaphorName: LocalizedText;
  explanation: LocalizedText;
  technicalDef: LocalizedText;
  realWorldExample: LocalizedText;
  category: 'hardware' | 'software' | 'internet' | 'troubleshoot';
}

export interface QuizQuestion {
  id: string;
  question: LocalizedText;
  options: {
    id: string;
    text: LocalizedText;
    isCorrect: boolean;
  }[];
  explanation: LocalizedText;
}

export interface AssemblyPart {
  id: string;
  name: LocalizedText;
  metaphorName: LocalizedText;
  hint: LocalizedText;
  iconName: string;
}

export interface LearningProgress {
  pipeline: boolean;
  hardware: boolean;
  dataflow: boolean;
  assembly: boolean;
  quiz: boolean;
}

export interface ProgressMilestone {
  id: keyof LearningProgress;
  sectionId: string;
  label: LocalizedText;
  description: LocalizedText;
}

export interface PahadiBadge {
  id: string;
  title: LocalizedText;
  metaphor: LocalizedText;
  description: LocalizedText;
  praisePahadi: LocalizedText;
  category: 'pipeline' | 'hardware' | 'dataflow' | 'assembly' | 'dictionary' | 'quiz';
  icon: string;
  moduleRequirement: LocalizedText;
  accentColor: string;
}

export interface StreakData {
  count: number;
  lastActiveDate: string;
  isActiveToday: boolean;
  activeDates: string[];
  longestStreak: number;
}


