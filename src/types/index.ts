// ==============================================================================
// DEEN — TypeScript Types and Interfaces
// ==============================================================================

export type SupportedLanguage = 'en' | 'ar' | 'hi' | 'gu';
export type AppTheme = 'dark' | 'light' | 'system';

// --- Quran Types ---
export interface SurahMeta {
  id: number;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  translated_name: {
    language_name: string;
    name: string;
  };
  revelation_place: 'makkah' | 'madinah';
  revelation_order: number;
  bismillah_pre: boolean;
  verses_count: number;
  pages: [number, number];
}

export interface VerseTranslation {
  id: number;
  resource_id: number;
  text: string;
  language_name?: string;
  author_name?: string;
}

export interface Verse {
  id: number;
  verse_number: number;
  verse_key: string;
  text_uthmani: string;
  page_number: number;
  juz_number: number;
  translations: VerseTranslation[];
  transliteration?: string;
  audio_url?: string;
}

export interface QuranReciter {
  id: number;
  name: string;
  style?: string | null;
  serverUrl?: string;
}

export interface Bookmark {
  id?: string;
  surah_number: number;
  ayah_number: number;
  verse_key: string;
  surah_name?: string;
  text_uthmani?: string;
  translation_text?: string;
  note?: string;
  created_at?: string;
}

// --- Prayer Times & Qibla Types ---
export interface PrayerTimesData {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Imsak?: string;
  Midnight?: string;
}

export interface HijriDateInfo {
  date: string;
  day: string;
  month: {
    number: number;
    en: string;
    ar: string;
  };
  year: string;
  designation: {
    abbreviated: string;
    expanded: string;
  };
  holidays: string[];
}

export interface PrayerAdjustment {
  fajr: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
}

export interface QazaRecord {
  fajr: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
  witr: number;
  updated_at?: string;
}

export interface QiblaCompassData {
  directionDegrees: number;
  distanceKm: number;
  currentLatitude: number;
  currentLongitude: number;
  city?: string;
}

// --- Dhikr & Tasbeeh Types ---
export interface DhikrPreset {
  id: string;
  arabic: string;
  transliteration: string;
  translation: {
    en: string;
    hi: string;
    gu: string;
  };
  target: number;
  isSunnah: boolean;
  reward: string;
  reference: string;
}

export interface TasbeehSession {
  id: string;
  dhikrId: string;
  dhikrTitle: string;
  count: number;
  target: number;
  date: string;
  timestamp: number;
}

// --- Duas & Adhkar Types ---
export interface DuaItem {
  id: string;
  category: string;
  title: {
    en: string;
    ar: string;
    hi: string;
    gu: string;
  };
  arabic: string;
  transliteration: string;
  translations: {
    en: string;
    hi: string;
    gu: string;
  };
  reference: string;
  repetitionCount: number;
  isSunnahCount: boolean;
  benefits?: string;
  audioUrl?: string;
}

// --- 99 Names of Allah Types ---
export interface DivineName {
  number: number;
  arabic: string;
  transliteration: string;
  meaning: {
    en: string;
    hi: string;
    gu: string;
  };
  explanation: {
    en: string;
    hi: string;
    gu: string;
  };
  quranReference: string;
  audioUrl?: string;
}

// --- Hadith Types ---
export interface HadithCollection {
  id: string;
  name: string;
  arabicName: string;
  totalHadith: number;
  description: string;
}

export interface HadithItem {
  id: number | string;
  hadithNumber: string;
  collection: string;
  chapterNumber?: string;
  chapterTitle?: string;
  arabicText: string;
  englishText: string;
  grade?: string;
  gradedBy?: string;
  reference: string;
  inBookReference?: string;
}

// --- Prophet Story Types ---
export interface ProphetStory {
  id: string;
  nameArabic: string;
  nameEnglish: string;
  title: string;
  chronologyOrder: number;
  quranReferences: string[];
  summary: string;
  story: string;
  keyLessons: string[];
  associatedSurahs: string[];
}

// --- Islamic Learning Types ---
export interface LearningGuideStep {
  stepNumber: number;
  title: string;
  description: string;
  arabicPhrase?: string;
  transliteration?: string;
  meaning?: string;
  ruling?: 'fard' | 'sunnah' | 'mustahabb';
  illustrationIcon?: string;
  madhhabNotes?: string;
}

export interface LearningTopic {
  id: string;
  category: 'wudu' | 'ghusl' | 'salah' | 'taharah' | 'sunnah' | 'halal';
  title: string;
  shortSummary: string;
  steps: LearningGuideStep[];
  invalidators?: string[];
  madhhabDistinctions?: string;
}

// --- Hajj & Umrah Types ---
export interface HajjRitualStep {
  stepNumber: number;
  name: string;
  arabicName: string;
  day?: string;
  location: string;
  description: string;
  duaArabic?: string;
  duaTransliteration?: string;
  duaMeaning?: string;
  obligations: string[];
  commonMistakes: string[];
  sunnahPractices: string[];
}

// --- Zakat Types ---
export interface ZakatCalculationInput {
  cashInHand: number;
  bankSavings: number;
  goldGrams: number;
  goldPricePerGram: number;
  silverGrams: number;
  silverPricePerGram: number;
  tradeGoods: number;
  investments: number;
  receivables: number;
  dueLiabilities: number;
  nisabStandard: 'gold' | 'silver';
  currency: string;
}

export interface ZakatCalculationResult {
  totalAssets: number;
  netZakatableWealth: number;
  nisabThreshold: number;
  isEligibleForZakat: boolean;
  zakatPayable: number;
  breakdown: {
    cashTotal: number;
    goldTotal: number;
    silverTotal: number;
    businessTotal: number;
    investmentsTotal: number;
    deductions: number;
  };
}

// --- Deen Tracker Types ---
export interface DailyDeenLog {
  date: string; // YYYY-MM-DD
  prayers: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };
  quranMinutes: number;
  quranPages: number;
  dhikrCount: number;
  fasted: boolean;
  fastType?: string;
  charity: boolean;
  sunnahHabits: {
    tahajjud: boolean;
    duha: boolean;
    surahMulk: boolean;
    surahKahf: boolean;
  };
  journalReflection?: string;
}

export interface FastingRecord {
  id?: string;
  date: string;
  fastType: 'ramadan' | 'sunnah_monday_thursday' | 'white_days' | 'ashura' | 'arafah' | 'qaza' | 'voluntary';
  completed: boolean;
  notes?: string;
}

export interface QuranGoal {
  id: string;
  targetPagesDaily: number;
  totalTargetPages: number; // 604 pages in Madina Mushaf
  completedPagesTotal: number;
  startDate: string;
  targetDays?: number;
}

export interface PrayerHistoryEntry {
  id?: string;
  date: string;
  prayerName: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
  status: 'completed' | 'missed' | 'qaza' | 'excused';
  inCongregation?: boolean;
  prayedAt?: string;
}

