// ==============================================================================
// DEEN — Holy Quran Service
// Powered by Quran Foundation API v4 + Offline IndexedDB Cache
// ==============================================================================

import { SurahMeta, Verse, QuranReciter } from '@/types';
import { getDeenDB } from './dbService';

const QURAN_API_BASE = 'https://api.quran.com/api/v4';

// Verified Reciters
export const QURAN_RECITERS: QuranReciter[] = [
  { id: 7, name: 'Mishari Rashid al-Afasy', style: 'Murattal', serverUrl: 'Alafasy/mp3' },
  { id: 2, name: 'AbdulBaset AbdulSamad', style: 'Murattal', serverUrl: 'Abdul_Basit_Murattal/mp3' },
  { id: 1, name: 'AbdulBaset AbdulSamad', style: 'Mujawwad', serverUrl: 'Abdul_Basit_Mujawwad/mp3' },
  { id: 6, name: 'Mahmoud Khalil Al-Husary', style: 'Murattal', serverUrl: 'Husary/mp3' },
  { id: 12, name: 'Mahmoud Khalil Al-Husary', style: 'Muallim', serverUrl: 'Husary_Muallim/mp3' },
  { id: 9, name: 'Mohamed Siddiq al-Minshawi', style: 'Murattal', serverUrl: 'Minshawi_Murattal/mp3' },
  { id: 8, name: 'Mohamed Siddiq al-Minshawi', style: 'Mujawwad', serverUrl: 'Minshawi_Mujawwad/mp3' },
  { id: 3, name: 'Abdur-Rahman as-Sudais', style: 'Hafs', serverUrl: 'Sudais/mp3' },
  { id: 4, name: 'Abu Bakr al-Shatri', style: 'Murattal', serverUrl: 'Shatri/mp3' }
];

// Offline Fallback for Canonical 114 Surahs
export const FALLBACK_SURAHS: SurahMeta[] = [
  { id: 1, name_simple: "Al-Fatihah", name_complex: "Al-Fātiḥah", name_arabic: "الفاتحة", translated_name: { language_name: "english", name: "The Opener" }, revelation_place: "makkah", revelation_order: 5, bismillah_pre: false, verses_count: 7, pages: [1, 1] },
  { id: 2, name_simple: "Al-Baqarah", name_complex: "Al-Baqarah", name_arabic: "البقرة", translated_name: { language_name: "english", name: "The Cow" }, revelation_place: "madinah", revelation_order: 87, bismillah_pre: true, verses_count: 286, pages: [2, 49] },
  { id: 3, name_simple: "Ali 'Imran", name_complex: "Āli 'Imrān", name_arabic: "آل عمران", translated_name: { language_name: "english", name: "Family of Imran" }, revelation_place: "madinah", revelation_order: 89, bismillah_pre: true, verses_count: 200, pages: [50, 76] },
  { id: 4, name_simple: "An-Nisa", name_complex: "An-Nisā", name_arabic: "النساء", translated_name: { language_name: "english", name: "The Women" }, revelation_place: "madinah", revelation_order: 92, bismillah_pre: true, verses_count: 176, pages: [77, 106] },
  { id: 5, name_simple: "Al-Ma'idah", name_complex: "Al-Mā'idah", name_arabic: "المائدة", translated_name: { language_name: "english", name: "The Table Spread" }, revelation_place: "madinah", revelation_order: 112, bismillah_pre: true, verses_count: 120, pages: [106, 127] },
  { id: 6, name_simple: "Al-An'am", name_complex: "Al-An'ām", name_arabic: "الأنعام", translated_name: { language_name: "english", name: "The Cattle" }, revelation_place: "makkah", revelation_order: 55, bismillah_pre: true, verses_count: 165, pages: [128, 150] },
  { id: 7, name_simple: "Al-A'raf", name_complex: "Al-A'rāf", name_arabic: "الأعراف", translated_name: { language_name: "english", name: "The Heights" }, revelation_place: "makkah", revelation_order: 39, bismillah_pre: true, verses_count: 206, pages: [151, 176] },
  { id: 8, name_simple: "Al-Anfal", name_complex: "Al-Anfāl", name_arabic: "الأنفال", translated_name: { language_name: "english", name: "The Spoils of War" }, revelation_place: "madinah", revelation_order: 88, bismillah_pre: true, verses_count: 75, pages: [177, 186] },
  { id: 9, name_simple: "At-Tawbah", name_complex: "At-Tawbah", name_arabic: "التوبة", translated_name: { language_name: "english", name: "The Repentance" }, revelation_place: "madinah", revelation_order: 113, bismillah_pre: false, verses_count: 129, pages: [187, 207] },
  { id: 10, name_simple: "Yunus", name_complex: "Yūnus", name_arabic: "يونس", translated_name: { language_name: "english", name: "Jonah" }, revelation_place: "makkah", revelation_order: 51, bismillah_pre: true, verses_count: 109, pages: [208, 221] },
  { id: 11, name_simple: "Hud", name_complex: "Hūd", name_arabic: "هود", translated_name: { language_name: "english", name: "Hud" }, revelation_place: "makkah", revelation_order: 52, bismillah_pre: true, verses_count: 123, pages: [221, 235] },
  { id: 12, name_simple: "Yusuf", name_complex: "Yūsuf", name_arabic: "يوسف", translated_name: { language_name: "english", name: "Joseph" }, revelation_place: "makkah", revelation_order: 53, bismillah_pre: true, verses_count: 111, pages: [235, 248] },
  { id: 13, name_simple: "Ar-Ra'd", name_complex: "Ar-Ra'd", name_arabic: "الرعد", translated_name: { language_name: "english", name: "The Thunder" }, revelation_place: "madinah", revelation_order: 96, bismillah_pre: true, verses_count: 43, pages: [249, 255] },
  { id: 14, name_simple: "Ibrahim", name_complex: "Ibrāhīm", name_arabic: "إبراهيم", translated_name: { language_name: "english", name: "Abraham" }, revelation_place: "makkah", revelation_order: 72, bismillah_pre: true, verses_count: 52, pages: [255, 261] },
  { id: 15, name_simple: "Al-Hijr", name_complex: "Al-Ḥijr", name_arabic: "الحجر", translated_name: { language_name: "english", name: "The Rocky Tract" }, revelation_place: "makkah", revelation_order: 54, bismillah_pre: true, verses_count: 99, pages: [262, 267] },
  { id: 16, name_simple: "An-Nahl", name_complex: "An-Naḥl", name_arabic: "النحل", translated_name: { language_name: "english", name: "The Bee" }, revelation_place: "makkah", revelation_order: 70, bismillah_pre: true, verses_count: 128, pages: [267, 281] },
  { id: 17, name_simple: "Al-Isra", name_complex: "Al-Isrā", name_arabic: "الإسراء", translated_name: { language_name: "english", name: "The Night Journey" }, revelation_place: "makkah", revelation_order: 50, bismillah_pre: true, verses_count: 111, pages: [282, 293] },
  { id: 18, name_simple: "Al-Kahf", name_complex: "Al-Kahf", name_arabic: "الكهف", translated_name: { language_name: "english", name: "The Cave" }, revelation_place: "makkah", revelation_order: 69, bismillah_pre: true, verses_count: 110, pages: [293, 304] },
  { id: 19, name_simple: "Maryam", name_complex: "Maryam", name_arabic: "مريم", translated_name: { language_name: "english", name: "Mary" }, revelation_place: "makkah", revelation_order: 44, bismillah_pre: true, verses_count: 98, pages: [305, 312] },
  { id: 20, name_simple: "Taha", name_complex: "Ṭāhā", name_arabic: "طه", translated_name: { language_name: "english", name: "Ta-Ha" }, revelation_place: "makkah", revelation_order: 45, bismillah_pre: true, verses_count: 135, pages: [312, 321] },
  { id: 21, name_simple: "Al-Anbiya", name_complex: "Al-Anbiyā", name_arabic: "الأنبياء", translated_name: { language_name: "english", name: "The Prophets" }, revelation_place: "makkah", revelation_order: 73, bismillah_pre: true, verses_count: 112, pages: [322, 331] },
  { id: 22, name_simple: "Al-Hajj", name_complex: "Al-Ḥajj", name_arabic: "الحج", translated_name: { language_name: "english", name: "The Pilgrimage" }, revelation_place: "madinah", revelation_order: 103, bismillah_pre: true, verses_count: 78, pages: [332, 341] },
  { id: 23, name_simple: "Al-Mu'minun", name_complex: "Al-Mu'minūn", name_arabic: "المؤمنون", translated_name: { language_name: "english", name: "The Believers" }, revelation_place: "makkah", revelation_order: 74, bismillah_pre: true, verses_count: 118, pages: [342, 349] },
  { id: 24, name_simple: "An-Nur", name_complex: "An-Nūr", name_arabic: "النور", translated_name: { language_name: "english", name: "The Light" }, revelation_place: "madinah", revelation_order: 102, bismillah_pre: true, verses_count: 64, pages: [350, 359] },
  { id: 25, name_simple: "Al-Furqan", name_complex: "Al-Furqān", name_arabic: "الفرقان", translated_name: { language_name: "english", name: "The Criterion" }, revelation_place: "makkah", revelation_order: 42, bismillah_pre: true, verses_count: 77, pages: [359, 366] },
  { id: 36, name_simple: "Ya-Sin", name_complex: "Yā-Sīn", name_arabic: "يس", translated_name: { language_name: "english", name: "Ya Sin" }, revelation_place: "makkah", revelation_order: 41, bismillah_pre: true, verses_count: 83, pages: [440, 445] },
  { id: 55, name_simple: "Ar-Rahman", name_complex: "Ar-Raḥmān", name_arabic: "الرحمن", translated_name: { language_name: "english", name: "The Beneficent" }, revelation_place: "madinah", revelation_order: 97, bismillah_pre: true, verses_count: 78, pages: [531, 534] },
  { id: 56, name_simple: "Al-Waqi'ah", name_complex: "Al-Wāqi'ah", name_arabic: "الواقعة", translated_name: { language_name: "english", name: "The Inevitable" }, revelation_place: "makkah", revelation_order: 46, bismillah_pre: true, verses_count: 96, pages: [534, 537] },
  { id: 67, name_simple: "Al-Mulk", name_complex: "Al-Mulk", name_arabic: "الملك", translated_name: { language_name: "english", name: "The Sovereignty" }, revelation_place: "makkah", revelation_order: 77, bismillah_pre: true, verses_count: 30, pages: [562, 564] },
  { id: 112, name_simple: "Al-Ikhlas", name_complex: "Al-Ikhlāṣ", name_arabic: "الإخلاص", translated_name: { language_name: "english", name: "The Sincerity" }, revelation_place: "makkah", revelation_order: 22, bismillah_pre: true, verses_count: 4, pages: [604, 604] },
  { id: 113, name_simple: "Al-Falaq", name_complex: "Al-Falaq", name_arabic: "الفلق", translated_name: { language_name: "english", name: "The Daybreak" }, revelation_place: "makkah", revelation_order: 20, bismillah_pre: true, verses_count: 5, pages: [604, 604] },
  { id: 114, name_simple: "An-Nas", name_complex: "An-Nās", name_arabic: "الناس", translated_name: { language_name: "english", name: "Mankind" }, revelation_place: "makkah", revelation_order: 21, bismillah_pre: true, verses_count: 6, pages: [604, 604] }
];

/**
 * Fetch all 114 chapters with automatic IndexedDB caching
 */
export async function getAllSurahs(): Promise<SurahMeta[]> {
  try {
    const db = await getDeenDB();
    const cached = await db.getAll('quran_surahs');
    if (cached && cached.length === 114) {
      return cached.sort((a, b) => a.id - b.id);
    }

    const res = await fetch(`${QURAN_API_BASE}/chapters?language=en`);
    if (!res.ok) throw new Error(`Quran API error: ${res.status}`);
    const data = await res.json();
    const chapters: SurahMeta[] = data.chapters;

    // Cache in IndexedDB
    const tx = db.transaction('quran_surahs', 'readwrite');
    for (const chapter of chapters) {
      await tx.store.put(chapter);
    }
    await tx.done;

    return chapters;
  } catch (error) {
    console.warn('Falling back to local surah data:', error);
    const db = await getDeenDB();
    const cached = await db.getAll('quran_surahs');
    if (cached && cached.length > 0) return cached.sort((a, b) => a.id - b.id);
    return FALLBACK_SURAHS;
  }
}

/**
 * Fetch verses of a chapter with Uthmani Arabic script, English, Hindi, Gujarati translations, and Transliteration
 */
export async function getSurahVerses(
  chapterId: number, 
  page: number = 1, 
  perPage: number = 50
): Promise<{ verses: Verse[]; totalVerses: number; totalPages: number }> {
  const cacheKey = `surah:${chapterId}:p:${page}:l:${perPage}`;
  const db = await getDeenDB();

  try {
    const cached = await db.get('quran_verses_cache', cacheKey);
    // If cached within last 14 days, return immediately
    if (cached && Date.now() - cached.cachedAt < 14 * 24 * 60 * 60 * 1000) {
      return cached.data;
    }

    // Translation IDs: 20 (English Saheeh), 122 (Hindi Azizul Haque), 225 (Gujarati Rabila Al-Umry), 57 (English Transliteration)
    const url = `${QURAN_API_BASE}/verses/by_chapter/${chapterId}?language=en&words=false&translations=20,122,225,57&fields=text_uthmani,chapter_id,page_number,juz_number&page=${page}&per_page=${perPage}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();

    const result = {
      verses: data.verses.map((v: any): Verse => {
        // Extract transliteration if present in translations array (ID 57)
        const translitObj = v.translations?.find((t: any) => t.resource_id === 57);
        const normalTranslations = v.translations?.filter((t: any) => t.resource_id !== 57) || [];

        return {
          id: v.id,
          verse_number: v.verse_number,
          verse_key: v.verse_key,
          text_uthmani: v.text_uthmani,
          page_number: v.page_number,
          juz_number: v.juz_number,
          translations: normalTranslations,
          transliteration: translitObj?.text?.replace(/<[^>]+>/g, ''),
        };
      }),
      totalVerses: data.pagination.total_records,
      totalPages: data.pagination.total_pages
    };

    // Store in IndexedDB cache
    await db.put('quran_verses_cache', {
      key: cacheKey,
      surah: chapterId,
      data: result,
      cachedAt: Date.now()
    });

    return result;
  } catch (error) {
    console.error('Failed to fetch from Quran API:', error);
    // Try returning stale cache if available
    const stale = await db.get('quran_verses_cache', cacheKey);
    if (stale) return stale.data;
    throw error;
  }
}

/**
 * Generate verse audio playback URL
 */
export function getAyahAudioUrl(verseKey: string, reciter: QuranReciter = QURAN_RECITERS[0]): string {
  const [surahStr, ayahStr] = verseKey.split(':');
  const surahPad = surahStr.padStart(3, '0');
  const ayahPad = ayahStr.padStart(3, '0');
  return `https://verses.quran.com/${reciter.serverUrl || 'Alafasy/mp3'}/${surahPad}${ayahPad}.mp3`;
}

/**
 * Clean Quran translation text removing footnote HTML tags
 */
export function cleanTranslationText(text: string): string {
  if (!text) return '';
  return text.replace(/<sup[^>]*>.*?<\/sup>/gi, '').trim();
}
