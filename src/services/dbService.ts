// ==============================================================================
// DEEN — IndexedDB Offline Persistence Service
// ==============================================================================

import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { DailyDeenLog, QazaRecord, Bookmark, TasbeehSession, FastingRecord, QuranGoal, PrayerHistoryEntry } from '@/types';

interface DeenDBSchema extends DBSchema {
  quran_surahs: {
    key: number;
    value: any;
  };
  quran_verses_cache: {
    key: string; // "surah:page"
    value: {
      key: string;
      surah: number;
      data: any;
      cachedAt: number;
    };
  };
  bookmarks: {
    key: string;
    value: Bookmark;
    indexes: { 'by-surah': number };
  };
  reading_history: {
    key: string;
    value: {
      surahNumber: number;
      ayahNumber: number;
      surahName: string;
      timestamp: number;
    };
  };
  tasbeeh_sessions: {
    key: string;
    value: TasbeehSession;
    indexes: { 'by-date': string };
  };
  custom_dhikr: {
    key: string;
    value: {
      id: string;
      title: string;
      arabic: string;
      transliteration: string;
      target: number;
    };
  };
  qaza_records: {
    key: string; // 'current'
    value: QazaRecord;
  };
  daily_deen_logs: {
    key: string; // 'YYYY-MM-DD'
    value: DailyDeenLog;
  };
  journal_entries: {
    key: string;
    value: {
      id: string;
      date: string;
      title: string;
      content: string;
      tags: string[];
      createdAt: number;
      updatedAt: number;
    };
    indexes: { 'by-date': string };
  };
  favorites: {
    key: string; // 'type:id'
    value: {
      id: string;
      type: 'dua' | 'hadith' | 'name';
      data: any;
      savedAt: number;
    };
  };
  fasting_records: {
    key: string; // date 'YYYY-MM-DD'
    value: FastingRecord;
  };
  quran_goals: {
    key: string; // 'current'
    value: QuranGoal;
  };
  prayer_history: {
    key: string; // 'date:prayer'
    value: PrayerHistoryEntry;
    indexes: { 'by-date': string };
  };
}

const DB_NAME = 'deen_app_offline_db';
const DB_VERSION = 2;

let dbPromise: Promise<IDBPDatabase<DeenDBSchema>> | null = null;

export function getDeenDB(): Promise<IDBPDatabase<DeenDBSchema>> {
  if (!dbPromise) {
    dbPromise = openDB<DeenDBSchema>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('quran_surahs')) {
          db.createObjectStore('quran_surahs', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('quran_verses_cache')) {
          db.createObjectStore('quran_verses_cache', { keyPath: 'key' });
        }
        if (!db.objectStoreNames.contains('bookmarks')) {
          const bookmarkStore = db.createObjectStore('bookmarks', { keyPath: 'verse_key' });
          bookmarkStore.createIndex('by-surah', 'surah_number');
        }
        if (!db.objectStoreNames.contains('reading_history')) {
          db.createObjectStore('reading_history', { keyPath: 'surahNumber' });
        }
        if (!db.objectStoreNames.contains('tasbeeh_sessions')) {
          const tasbeehStore = db.createObjectStore('tasbeeh_sessions', { keyPath: 'id' });
          tasbeehStore.createIndex('by-date', 'date');
        }
        if (!db.objectStoreNames.contains('custom_dhikr')) {
          db.createObjectStore('custom_dhikr', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('qaza_records')) {
          db.createObjectStore('qaza_records');
        }
        if (!db.objectStoreNames.contains('daily_deen_logs')) {
          db.createObjectStore('daily_deen_logs', { keyPath: 'date' });
        }
        if (!db.objectStoreNames.contains('journal_entries')) {
          const journalStore = db.createObjectStore('journal_entries', { keyPath: 'id' });
          journalStore.createIndex('by-date', 'date');
        }
        if (!db.objectStoreNames.contains('favorites')) {
          db.createObjectStore('favorites', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('fasting_records')) {
          db.createObjectStore('fasting_records', { keyPath: 'date' });
        }
        if (!db.objectStoreNames.contains('quran_goals')) {
          db.createObjectStore('quran_goals', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('prayer_history')) {
          const phStore = db.createObjectStore('prayer_history', { keyPath: 'id' });
          phStore.createIndex('by-date', 'date');
        }
      },
    });
  }
  return dbPromise;
}

// --- Bookmarks Helper ---
export async function saveQuranBookmark(bookmark: Bookmark): Promise<void> {
  const db = await getDeenDB();
  await db.put('bookmarks', bookmark);
}

export async function removeQuranBookmark(verseKey: string): Promise<void> {
  const db = await getDeenDB();
  await db.delete('bookmarks', verseKey);
}

export async function getQuranBookmarks(): Promise<Bookmark[]> {
  const db = await getDeenDB();
  return db.getAll('bookmarks');
}

export async function isVerseBookmarked(verseKey: string): Promise<boolean> {
  const db = await getDeenDB();
  const item = await db.get('bookmarks', verseKey);
  return !!item;
}

// --- Reading History Helper ---
export async function saveLastRead(surahNumber: number, ayahNumber: number, surahName: string): Promise<void> {
  const db = await getDeenDB();
  await db.put('reading_history', {
    surahNumber,
    ayahNumber,
    surahName,
    timestamp: Date.now()
  });
}

export async function getLastRead(): Promise<{ surahNumber: number; ayahNumber: number; surahName: string; timestamp: number } | undefined> {
  const db = await getDeenDB();
  const all = await db.getAll('reading_history');
  if (!all.length) return undefined;
  return all.sort((a, b) => b.timestamp - a.timestamp)[0];
}

// --- Qaza Helper ---
export async function getQazaCounts(): Promise<QazaRecord> {
  const db = await getDeenDB();
  const record = await db.get('qaza_records', 'current');
  if (record) return record;
  const initial: QazaRecord = { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0, witr: 0 };
  await db.put('qaza_records', initial, 'current');
  return initial;
}

export async function saveQazaCounts(record: QazaRecord): Promise<void> {
  const db = await getDeenDB();
  await db.put('qaza_records', record, 'current');
}

// --- Daily Deen Logs Helper ---
export async function getDailyDeenLog(dateStr: string): Promise<DailyDeenLog> {
  const db = await getDeenDB();
  const log = await db.get('daily_deen_logs', dateStr);
  if (log) return log;
  const initial: DailyDeenLog = {
    date: dateStr,
    prayers: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false },
    quranMinutes: 0,
    quranPages: 0,
    dhikrCount: 0,
    fasted: false,
    charity: false,
    sunnahHabits: { tahajjud: false, duha: false, surahMulk: false, surahKahf: false }
  };
  await db.put('daily_deen_logs', initial);
  return initial;
}

export async function saveDailyDeenLog(log: DailyDeenLog): Promise<void> {
  const db = await getDeenDB();
  await db.put('daily_deen_logs', log);
}

export async function getAllDeenLogs(): Promise<DailyDeenLog[]> {
  const db = await getDeenDB();
  return db.getAll('daily_deen_logs');
}

// --- Tasbeeh Sessions Helper ---
export async function saveTasbeehSession(session: TasbeehSession): Promise<void> {
  const db = await getDeenDB();
  await db.put('tasbeeh_sessions', session);
}

export async function getTasbeehSessions(): Promise<TasbeehSession[]> {
  const db = await getDeenDB();
  const all = await db.getAll('tasbeeh_sessions');
  return all.sort((a, b) => b.timestamp - a.timestamp);
}

// --- Favorites (Duas, Hadith, 99 Names) ---
export async function toggleFavorite(type: 'dua' | 'hadith' | 'name', id: string, data: any): Promise<boolean> {
  const db = await getDeenDB();
  const key = `${type}:${id}`;
  const existing = await db.get('favorites', key);
  if (existing) {
    await db.delete('favorites', key);
    return false;
  } else {
    await db.put('favorites', {
      id: key,
      type,
      data,
      savedAt: Date.now()
    });
    return true;
  }
}

export async function isFavorite(type: 'dua' | 'hadith' | 'name', id: string): Promise<boolean> {
  const db = await getDeenDB();
  const key = `${type}:${id}`;
  const existing = await db.get('favorites', key);
  return !!existing;
}

export async function getFavoritesByType(type: 'dua' | 'hadith' | 'name'): Promise<any[]> {
  const db = await getDeenDB();
  const all = await db.getAll('favorites');
  return all.filter(f => f.type === type).map(f => f.data);
}

// --- Fasting Records Helper ---
export async function saveFastingRecord(record: FastingRecord): Promise<void> {
  const db = await getDeenDB();
  await db.put('fasting_records', record);
}

export async function getFastingRecords(): Promise<FastingRecord[]> {
  const db = await getDeenDB();
  const all = await db.getAll('fasting_records');
  return all.sort((a, b) => b.date.localeCompare(a.date));
}

export async function deleteFastingRecord(date: string): Promise<void> {
  const db = await getDeenDB();
  await db.delete('fasting_records', date);
}

// --- Quran Goal & Reading Progress Helper ---
export async function getQuranGoal(): Promise<QuranGoal> {
  const db = await getDeenDB();
  const goal = await db.get('quran_goals', 'current');
  if (goal) return goal;
  const defaultGoal: QuranGoal = {
    id: 'current',
    targetPagesDaily: 4,
    totalTargetPages: 604,
    completedPagesTotal: 0,
    startDate: new Date().toISOString().split('T')[0]
  };
  await db.put('quran_goals', defaultGoal);
  return defaultGoal;
}

export async function saveQuranGoal(goal: Partial<QuranGoal>): Promise<QuranGoal> {
  const db = await getDeenDB();
  const current = await getQuranGoal();
  const updated: QuranGoal = { ...current, ...goal, id: 'current' };
  await db.put('quran_goals', updated);
  return updated;
}

export async function recordQuranPagesRead(pagesCount: number): Promise<void> {
  const db = await getDeenDB();
  const todayStr = new Date().toISOString().split('T')[0];
  
  // 1. Update daily deen log
  const todayLog = await getDailyDeenLog(todayStr);
  todayLog.quranPages = Math.max(0, (todayLog.quranPages || 0) + pagesCount);
  await saveDailyDeenLog(todayLog);

  // 2. Update Quran overall goal progress
  const goal = await getQuranGoal();
  goal.completedPagesTotal = Math.min(604, Math.max(0, goal.completedPagesTotal + pagesCount));
  await db.put('quran_goals', goal);
}

export async function getQuranReadingStats(): Promise<{
  completedPagesTotal: number;
  percentageCompleted: number;
  targetPagesDaily: number;
  todayPagesRead: number;
  lastRead?: { surahNumber: number; ayahNumber: number; surahName: string; timestamp: number };
}> {
  const goal = await getQuranGoal();
  const todayStr = new Date().toISOString().split('T')[0];
  const todayLog = await getDailyDeenLog(todayStr);
  const lastRead = await getLastRead();

  const percentage = Math.min(100, Math.round((goal.completedPagesTotal / 604) * 100));

  return {
    completedPagesTotal: goal.completedPagesTotal,
    percentageCompleted: percentage,
    targetPagesDaily: goal.targetPagesDaily || 4,
    todayPagesRead: todayLog.quranPages || 0,
    lastRead
  };
}

// --- Prayer History Helper ---
export async function savePrayerRecord(entry: PrayerHistoryEntry): Promise<void> {
  const db = await getDeenDB();
  const id = `${entry.date}:${entry.prayerName}`;
  await db.put('prayer_history', { ...entry, id });
}

export async function getPrayerHistory(days: number = 30): Promise<PrayerHistoryEntry[]> {
  const db = await getDeenDB();
  const all = await db.getAll('prayer_history');
  return all.sort((a, b) => b.date.localeCompare(a.date));
}

