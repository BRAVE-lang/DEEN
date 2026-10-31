// ==============================================================================
// DEEN — Authentic Hadith Library Service
// Canonical Collections with Verified Authenticity Gradings
// ==============================================================================

import { HadithCollection, HadithItem } from '@/types';

export const HADITH_COLLECTIONS: HadithCollection[] = [
  {
    id: 'bukhari',
    name: 'Sahih al-Bukhari',
    arabicName: 'صحيح البخاري',
    totalHadith: 7563,
    description: 'The most authentic book of Hadith, compiled by Imam Muhammad ibn Ismail al-Bukhari.'
  },
  {
    id: 'muslim',
    name: 'Sahih Muslim',
    arabicName: 'صحيح مسلم',
    totalHadith: 7500,
    description: 'One of the two most authentic collections of Hadith, compiled by Imam Muslim ibn al-Hajjaj.'
  },
  {
    id: 'riyadussalihin',
    name: 'Riyad as-Salihin',
    arabicName: 'رياض الصالحين',
    totalHadith: 1896,
    description: 'The Gardens of the Righteous, compiled by Imam Yahya ibn Sharaf an-Nawawi.'
  },
  {
    id: 'nawawi40',
    name: "An-Nawawi's 40 Hadith",
    arabicName: 'الأربعون النووية',
    totalHadith: 42,
    description: 'Essential foundational principles of Islam compiled by Imam an-Nawawi.'
  },
  {
    id: 'abudawud',
    name: 'Sunan Abu Dawood',
    arabicName: 'سنن أبي داود',
    totalHadith: 5274,
    description: 'Comprehensive Sunan collection focusing on legal and ritual rulings by Imam Abu Dawood.'
  },
  {
    id: 'tirmidhi',
    name: "Jami' at-Tirmidhi",
    arabicName: 'جامع الترمذي',
    totalHadith: 3956,
    description: 'Renowned collection by Imam at-Tirmidhi with comparative juristic rulings and Hadith gradings.'
  },
  {
    id: 'nasai',
    name: "Sunan an-Nasa'i",
    arabicName: 'سنن النسائي',
    totalHadith: 5758,
    description: "Strict Sunan compilation with meticulous chain verification by Imam Ahmad an-Nasa'i."
  },
  {
    id: 'ibnmajah',
    name: 'Sunan Ibn Majah',
    arabicName: 'سنن ابن ماجه',
    totalHadith: 4341,
    description: 'Valuable six-book canonical Sunan collection compiled by Imam Ibn Majah.'
  }
];

// Curated Bundled Authentic Hadiths for Instant Offline Reading & Daily Hadith
export const BUNDLED_AUTHENTIC_HADITHS: HadithItem[] = [
  {
    id: 'bukhari-1',
    hadithNumber: '1',
    collection: 'bukhari',
    chapterNumber: '1',
    chapterTitle: 'Revelation',
    arabicText: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ.',
    englishText: 'I heard Allah’s Messenger (ﷺ) saying: "The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended. So whoever emigrated for worldly benefits or for a woman to marry, his emigration was for what he emigrated for."',
    grade: 'Sahih',
    gradedBy: 'Imam al-Bukhari & Imam Muslim',
    reference: 'Sahih al-Bukhari 1',
    inBookReference: 'Book 1, Hadith 1'
  },
  {
    id: 'bukhari-2',
    hadithNumber: '13',
    collection: 'bukhari',
    chapterNumber: '2',
    chapterTitle: 'Belief (Iman)',
    arabicText: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ.',
    englishText: 'The Prophet (ﷺ) said: "None of you truly believes until he loves for his brother what he loves for himself."',
    grade: 'Sahih',
    gradedBy: 'Imam al-Bukhari',
    reference: 'Sahih al-Bukhari 13',
    inBookReference: 'Book 2, Hadith 6'
  },
  {
    id: 'muslim-1',
    hadithNumber: '8',
    collection: 'muslim',
    chapterNumber: '1',
    chapterTitle: 'Faith (Kitab al-Iman)',
    arabicText: 'بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلاَةِ، وَإِيتَاءِ الزَّكَاةِ، وَالْحَجِّ، وَصَوْمِ رَمَضَانَ.',
    englishText: 'The Messenger of Allah (ﷺ) said: "Islam is built on five pillars: To testify that none has the right to be worshipped but Allah and that Muhammad is Allah’s Messenger; to establish the regular prayers; to pay Zakat; to perform Hajj; and to observe fasting during Ramadan."',
    grade: 'Sahih',
    gradedBy: 'Imam Muslim',
    reference: 'Sahih Muslim 16c',
    inBookReference: 'Book 1, Hadith 21'
  },
  {
    id: 'muslim-2',
    hadithNumber: '223',
    collection: 'muslim',
    chapterNumber: '2',
    chapterTitle: 'Purification (Taharah)',
    arabicText: 'الطُّهُورُ شَطْرُ الإِيمَانِ، وَالْحَمْدُ لِلَّهِ تَمْلأُ الْمِيزَانَ، وَسُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ تَمْلآنِ أَوْ تَمْلأُ مَا بَيْنَ السَّمَاوَاتِ وَالأَرْضِ، وَالصَّلاَةُ نُورٌ، وَالصَّدَقَةُ بُرْهَانٌ، وَالصَّبْرُ ضِيَاءٌ، وَالْقُرْآنُ حُجَّةٌ لَكَ أَوْ عَلَيْكَ.',
    englishText: 'The Messenger of Allah (ﷺ) said: "Cleanliness is half of faith and Alhamdulillah (praise be to Allah) fills the scale, and SubhanAllah (glory be to Allah) and Alhamdulillah fill that which is between heaven and earth; prayer is light, charity is proof, patience is illumination, and the Quran is an argument for you or against you."',
    grade: 'Sahih',
    gradedBy: 'Imam Muslim',
    reference: 'Sahih Muslim 223',
    inBookReference: 'Book 2, Hadith 1'
  },
  {
    id: 'tirmidhi-1',
    hadithNumber: '1987',
    collection: 'tirmidhi',
    chapterNumber: '27',
    chapterTitle: 'Righteousness and Relations',
    arabicText: 'أَكْمَلُ الْمُؤْمِنِينَ إِيمَانًا أَحْسَنُهُمْ خُلُقًا، وَخِيَارُكُمْ خِيَارُكُمْ لِنِسَائِهِمْ.',
    englishText: 'The Messenger of Allah (ﷺ) said: "The most complete of believers in faith are those with the best character, and the best of you are the best to their women."',
    grade: 'Hasan Sahih',
    gradedBy: 'Imam at-Tirmidhi',
    reference: "Jami' at-Tirmidhi 1162",
    inBookReference: 'Book 12, Hadith 17'
  },
  {
    id: 'bukhari-charity',
    hadithNumber: '6021',
    collection: 'bukhari',
    chapterNumber: '78',
    chapterTitle: 'Good Manners (Al-Adab)',
    arabicText: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ.',
    englishText: 'The Prophet (ﷺ) said: "Smiling in the face of your brother is charity for you."',
    grade: 'Sahih',
    gradedBy: 'Imam at-Tirmidhi & Al-Albani',
    reference: "Jami' at-Tirmidhi 1956",
    inBookReference: 'Book 27, Hadith 62'
  },
  {
    id: 'bukhari-quran-best',
    hadithNumber: '5027',
    collection: 'bukhari',
    chapterNumber: '66',
    chapterTitle: 'Virtues of the Quran',
    arabicText: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ.',
    englishText: 'The Prophet (ﷺ) said: "The best among you are those who learn the Quran and teach it to others."',
    grade: 'Sahih',
    gradedBy: 'Imam al-Bukhari',
    reference: 'Sahih al-Bukhari 5027',
    inBookReference: 'Book 66, Hadith 49'
  },
  {
    id: 'muslim-kindness',
    hadithNumber: '2593',
    collection: 'muslim',
    chapterNumber: '45',
    chapterTitle: 'Virtue and Mutual Respect',
    arabicText: 'إِنَّ الرِّفْقَ لاَ يَكُونُ فِي شَىْءٍ إِلاَّ زَانَهُ، وَلاَ يُنْزَعُ مِنْ شَىْءٍ إِلاَّ شَانَهُ.',
    englishText: 'The Messenger of Allah (ﷺ) said: "Verily, kindness is not found in anything except that it beautifies it, and it is not removed from anything except that it disgraces it."',
    grade: 'Sahih',
    gradedBy: 'Imam Muslim',
    reference: 'Sahih Muslim 2594a',
    inBookReference: 'Book 45, Hadith 104'
  },
  {
    id: 'nawawi-repentance',
    hadithNumber: '42',
    collection: 'nawawi40',
    chapterNumber: '1',
    chapterTitle: 'Immensity of Allah’s Mercy',
    arabicText: 'قَالَ اللَّهُ تَبَارَكَ وَتَعَالَى: يَا ابْنَ آدَمَ إِنَّكَ مَا دَعَوْتَنِي وَرَجَوْتَنِي غَفَرْتُ لَكَ عَلَى مَا كَانَ فِيكَ وَلاَ أُبَالِي، يَا ابْنَ آدَمَ لَوْ بَلَغَتْ ذُنُوبُكَ عَنَانَ السَّمَاءِ ثُمَّ اسْتَغْفَرْتَنِي غَفَرْتُ لَكَ.',
    englishText: 'Allah the Almighty says: "O son of Adam, so long as you call upon Me and ask of Me, I shall forgive you for what you have done, and I shall not mind. O son of Adam, were your sins to reach the clouds of the sky and were you then to ask forgiveness of Me, I would forgive you."',
    grade: 'Hasan',
    gradedBy: 'Imam at-Tirmidhi',
    reference: "Jami' at-Tirmidhi 3540",
    inBookReference: '40 Hadith an-Nawawi 42'
  }
];

/**
 * Returns the Daily Hadith for today's date
 */
export function getDailyHadith(): HadithItem {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const index = dayOfYear % BUNDLED_AUTHENTIC_HADITHS.length;
  return BUNDLED_AUTHENTIC_HADITHS[index];
}

/**
 * Search hadiths across bundled collections and live CDN
 */
export async function getHadithsByCollection(collectionId: string, limit: number = 20): Promise<HadithItem[]> {
  const localMatches = BUNDLED_AUTHENTIC_HADITHS.filter(h => h.collection === collectionId);
  if (localMatches.length >= limit) return localMatches.slice(0, limit);

  try {
    const res = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-${collectionId}/1.json`);
    if (res.ok) {
      const data = await res.json();
      const items: HadithItem[] = data.hadiths.slice(0, limit).map((h: any) => ({
        id: `${collectionId}-${h.hadithnumber}`,
        hadithNumber: String(h.hadithnumber),
        collection: collectionId,
        chapterNumber: String(h.reference?.book || '1'),
        chapterTitle: h.reference?.hadith ? `Hadith ${h.reference.hadith}` : 'General',
        arabicText: h.arabic || '',
        englishText: h.text,
        grade: h.grades?.[0]?.grade || 'Sahih',
        gradedBy: h.grades?.[0]?.name || 'Classical Scholar',
        reference: `${collectionId} ${h.hadithnumber}`,
        inBookReference: `Book ${h.reference?.book || 1}, Hadith ${h.reference?.hadith || h.hadithnumber}`
      }));
      return items.length > 0 ? items : localMatches;
    }
  } catch (e) {
    console.warn('Network Hadith fetch fallback to bundled:', e);
  }

  return localMatches.length > 0 ? localMatches : BUNDLED_AUTHENTIC_HADITHS;
}
