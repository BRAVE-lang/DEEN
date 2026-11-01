// ==============================================================================
// DEEN — Multi-User Cross-Device Bidirectional Synchronization Service
// Integrates Offline-First IndexedDB with Supabase PostgreSQL (Strict RLS)
// ==============================================================================

import { supabase, isSupabaseConfigured } from './supabaseClient';
import {
  getDeenDB,
  saveQuranBookmark,
  removeQuranBookmark,
  saveLastRead,
  saveQazaCounts,
  saveDailyDeenLog,
  saveTasbeehSession
} from './dbService';
import { Bookmark, QazaRecord, DailyDeenLog, TasbeehSession } from '@/types';

export interface SyncStatus {
  isSyncing: boolean;
  lastSyncedAt: number | null;
  error: string | null;
}

let syncStatusListeners: Array<(status: SyncStatus) => void> = [];
let currentStatus: SyncStatus = {
  isSyncing: false,
  lastSyncedAt: null,
  error: null
};

function updateStatus(statusUpdate: Partial<SyncStatus>) {
  currentStatus = { ...currentStatus, ...statusUpdate };
  syncStatusListeners.forEach(l => l(currentStatus));
}

export function subscribeToSyncStatus(listener: (status: SyncStatus) => void): () => void {
  syncStatusListeners.push(listener);
  listener(currentStatus);
  return () => {
    syncStatusListeners = syncStatusListeners.filter(l => l !== listener);
  };
}

/**
 * Synchronize all personal data between local IndexedDB and Supabase
 * Ensures multi-device consistency for the authenticated user
 */
export async function syncUserData(userId: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase || !userId) {
    return false;
  }

  updateStatus({ isSyncing: true, error: null });

  try {
    const db = await getDeenDB();

    // -------------------------------------------------------------
    // 1. SYNC TASBEEH SESSIONS
    // -------------------------------------------------------------
    // A. Pull remote sessions
    const { data: remoteTasbeeh, error: tasbeehErr } = await supabase
      .from('tasbeeh_sessions')
      .select('*')
      .eq('user_id', userId);

    if (!tasbeehErr && remoteTasbeeh) {
      for (const row of remoteTasbeeh) {
        const localSession: TasbeehSession = {
          id: row.id,
          dhikrId: row.dhikr_identifier,
          dhikrTitle: row.dhikr_title,
          count: row.count_completed,
          target: row.target_count || 33,
          date: row.session_date,
          timestamp: new Date(row.created_at).getTime()
        };
        await db.put('tasbeeh_sessions', localSession);
      }
    }

    // B. Push unsynced local sessions
    const localSessions = await db.getAll('tasbeeh_sessions');
    const remoteIds = new Set((remoteTasbeeh || []).map(r => r.id));
    for (const session of localSessions) {
      if (!remoteIds.has(session.id)) {
        await supabase.from('tasbeeh_sessions').upsert({
          id: session.id.startsWith('session-') ? undefined : session.id,
          user_id: userId,
          dhikr_identifier: session.dhikrId,
          dhikr_title: session.dhikrTitle,
          count_completed: session.count,
          target_count: session.target,
          session_date: session.date || new Date().toISOString().split('T')[0]
        });
      }
    }

    // -------------------------------------------------------------
    // 2. SYNC QURAN BOOKMARKS
    // -------------------------------------------------------------
    const { data: remoteBookmarks, error: bmErr } = await supabase
      .from('quran_bookmarks')
      .select('*')
      .eq('user_id', userId);

    if (!bmErr && remoteBookmarks) {
      for (const b of remoteBookmarks) {
        await db.put('bookmarks', {
          id: b.id,
          surah_number: b.surah_number,
          ayah_number: b.ayah_number,
          verse_key: b.verse_key,
          note: b.note,
          created_at: b.created_at
        });
      }
    }

    // Push local bookmarks to Supabase
    const localBookmarks = await db.getAll('bookmarks');
    for (const b of localBookmarks) {
      await supabase.from('quran_bookmarks').upsert({
        user_id: userId,
        surah_number: b.surah_number,
        ayah_number: b.ayah_number,
        verse_key: b.verse_key,
        note: b.note || null
      }, { onConflict: 'user_id,verse_key' });
    }

    // -------------------------------------------------------------
    // 3. SYNC QAZA COUNTS
    // -------------------------------------------------------------
    const { data: remoteQaza, error: qazaErr } = await supabase
      .from('qaza_records')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    const localQaza = await db.get('qaza_records', 'current');

    if (!qazaErr && remoteQaza) {
      // Remote exists, merge highest numbers or update local
      const merged: QazaRecord = {
        fajr: Math.max(remoteQaza.fajr_count || 0, localQaza?.fajr || 0),
        dhuhr: Math.max(remoteQaza.dhuhr_count || 0, localQaza?.dhuhr || 0),
        asr: Math.max(remoteQaza.asr_count || 0, localQaza?.asr || 0),
        maghrib: Math.max(remoteQaza.maghrib_count || 0, localQaza?.maghrib || 0),
        isha: Math.max(remoteQaza.isha_count || 0, localQaza?.isha || 0),
        witr: Math.max(remoteQaza.witr_count || 0, localQaza?.witr || 0)
      };
      await db.put('qaza_records', merged, 'current');

      // Update remote with merged
      await supabase.from('qaza_records').upsert({
        user_id: userId,
        fajr_count: merged.fajr,
        dhuhr_count: merged.dhuhr,
        asr_count: merged.asr,
        maghrib_count: merged.maghrib,
        isha_count: merged.isha,
        witr_count: merged.witr
      }, { onConflict: 'user_id' });
    } else if (localQaza) {
      // Push local to remote
      await supabase.from('qaza_records').upsert({
        user_id: userId,
        fajr_count: localQaza.fajr,
        dhuhr_count: localQaza.dhuhr,
        asr_count: localQaza.asr,
        maghrib_count: localQaza.maghrib,
        isha_count: localQaza.isha,
        witr_count: localQaza.witr
      }, { onConflict: 'user_id' });
    }

    // -------------------------------------------------------------
    // 4. SYNC DAILY DEEN LOGS
    // -------------------------------------------------------------
    const { data: remoteDeen, error: deenErr } = await supabase
      .from('deen_daily_records')
      .select('*')
      .eq('user_id', userId);

    if (!deenErr && remoteDeen) {
      for (const row of remoteDeen) {
        const localLog: DailyDeenLog = {
          date: row.record_date,
          prayers: {
            fajr: row.prayers_completed >= 1,
            dhuhr: row.prayers_completed >= 2,
            asr: row.prayers_completed >= 3,
            maghrib: row.prayers_completed >= 4,
            isha: row.prayers_completed >= 5
          },
          quranMinutes: 0,
          quranPages: row.quran_pages_read || 0,
          dhikrCount: row.dhikr_count || 0,
          fasted: row.fasted || false,
          charity: row.charity_given || false,
          sunnahHabits: {
            tahajjud: false,
            duha: false,
            surahMulk: false,
            surahKahf: false
          }
        };
        await db.put('daily_deen_logs', localLog);
      }
    }

    // -------------------------------------------------------------
    // 5. SYNC FASTING RECORDS
    // -------------------------------------------------------------
    const { data: remoteFasting, error: fastErr } = await supabase
      .from('fasting_records')
      .select('*')
      .eq('user_id', userId);

    if (!fastErr && remoteFasting) {
      for (const row of remoteFasting) {
        await db.put('fasting_records', {
          id: row.id,
          date: row.fast_date,
          fastType: row.fast_type,
          completed: row.completed,
          notes: row.notes || undefined
        });
      }
    }

    const localFasting = await db.getAll('fasting_records');
    for (const f of localFasting) {
      await supabase.from('fasting_records').upsert({
        user_id: userId,
        fast_date: f.date,
        fast_type: f.fastType,
        completed: f.completed,
        notes: f.notes || null
      }, { onConflict: 'user_id,fast_date' });
    }

    // -------------------------------------------------------------
    // 6. SYNC QURAN READING POSITION & GOAL
    // -------------------------------------------------------------
    const { data: remoteReading } = await supabase
      .from('quran_reading_history')
      .select('*')
      .eq('user_id', userId)
      .order('read_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (remoteReading) {
      await db.put('reading_history', {
        surahNumber: remoteReading.surah_number,
        ayahNumber: remoteReading.ayah_number,
        surahName: `Surah ${remoteReading.surah_number}`,
        timestamp: new Date(remoteReading.read_at).getTime()
      });
    }

    const localLastRead = await db.getAll('reading_history');
    if (localLastRead.length > 0) {
      const top = localLastRead.sort((a, b) => b.timestamp - a.timestamp)[0];
      await supabase.from('quran_reading_history').insert({
        user_id: userId,
        surah_number: top.surahNumber,
        ayah_number: top.ayahNumber,
        page_number: 1,
        juz_number: 1
      });
    }

    updateStatus({
      isSyncing: false,
      lastSyncedAt: Date.now(),
      error: null
    });
    return true;
  } catch (err: any) {
    console.error('Error during cloud sync:', err);
    updateStatus({
      isSyncing: false,
      error: err.message || 'Sync failed'
    });
    return false;
  }
}

/**
 * Clear user-specific data from local storage when logging out
 * Ensures Account B does not see Account A's personal data
 */
export async function clearLocalUserData(): Promise<void> {
  const db = await getDeenDB();
  await db.clear('tasbeeh_sessions');
  await db.clear('bookmarks');
  await db.clear('reading_history');
  await db.clear('qaza_records');
  await db.clear('daily_deen_logs');
  await db.clear('journal_entries');
  await db.clear('favorites');
  await db.clear('fasting_records');
  await db.clear('quran_goals');
  await db.clear('prayer_history');
  localStorage.removeItem('deen_local_user');
  localStorage.removeItem('deen_memorized_names');
  updateStatus({
    isSyncing: false,
    lastSyncedAt: null,
    error: null
  });
}
