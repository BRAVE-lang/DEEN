// ==============================================================================
// DEEN — Islamic Learning & Step-by-Step Practical Guides Service
// Visual Guides for Wudu, Ghusl, Salah, Taharah, and Sunnah Etiquettes
// ==============================================================================

import { LearningTopic } from '@/types';

export const LEARNING_TOPICS: LearningTopic[] = [
  {
    id: 'wudu',
    category: 'wudu',
    title: 'How to Perform Wudu (Ablution)',
    shortSummary: 'The essential step-by-step ritual purification required before Salah, following the precise Sunnah of Prophet Muhammad (ﷺ).',
    invalidators: [
      'Natural bodily discharges (urine, stool, passing gas, prostatic fluid).',
      'Deep sleep during which awareness is lost.',
      'Loss of consciousness, fainting, or intoxication.',
      'Flowing blood or bodily matter from a wound (according to Hanafi school; Shafi’i considers only waste exits).',
      'Direct touch of private parts with palm without barrier (according to Shafi’i, Maliki, and Hanbali schools).'
    ],
    madhhabDistinctions: 'Hanafi school considers washing hands, mouth, nose, and ear-wiping as Sunnah, whereas washing face, arms to elbows, wiping 1/4th head, and feet are Fard. Shafi’i school requires the intention (Niyyah) at the exact moment water touches the face, wiping any part of the head, and maintaining strict sequence (Tartib) as Fard.',
    steps: [
      {
        stepNumber: 1,
        title: 'Make Intention (Niyyah) & Say Bismillah',
        description: 'Form the sincere intention in your heart to purify yourself for the sake of Allah and whisper "Bismillah" (In the Name of Allah).',
        arabicPhrase: 'بِسْمِ اللَّهِ',
        transliteration: 'Bismillah',
        meaning: 'In the name of Allah.',
        ruling: 'fard'
      },
      {
        stepNumber: 2,
        title: 'Wash Both Hands up to the Wrists',
        description: 'Wash your right hand thoroughly up to the wrist three times, ensuring water passes between fingers, then repeat with the left hand three times.',
        ruling: 'sunnah'
      },
      {
        stepNumber: 3,
        title: 'Rinse the Mouth (Madmadah)',
        description: 'Take water with your right hand into your mouth, swirl it around to cleanse teeth and gums, and spit it out. Repeat three times.',
        ruling: 'sunnah'
      },
      {
        stepNumber: 4,
        title: 'Cleanse the Nose (Istinshaq & Istinthar)',
        description: 'Inhale a little water gently into your nostrils with your right hand, then blow it out using your left hand. Repeat three times.',
        ruling: 'sunnah'
      },
      {
        stepNumber: 5,
        title: 'Wash the Entire Face',
        description: 'Wash your entire face three times, from the normal hairline at the top of the forehead to the bottom of the chin, and from ear to ear.',
        ruling: 'fard'
      },
      {
        stepNumber: 6,
        title: 'Wash Arms up to the Elbows',
        description: 'Wash your right arm from the fingertips up to and including the elbow three times. Then repeat with your left arm three times.',
        ruling: 'fard'
      },
      {
        stepNumber: 7,
        title: 'Wipe the Head (Masah)',
        description: 'Wet your hands and wipe them over your head once, starting from the forehead moving toward the back of the neck, and bringing them back to the front.',
        ruling: 'fard'
      },
      {
        stepNumber: 8,
        title: 'Wipe the Ears',
        description: 'Using the same wet hands, insert index fingers into the crevices of your ears while wiping the back of the ears with your thumbs.',
        ruling: 'sunnah'
      },
      {
        stepNumber: 9,
        title: 'Wash Both Feet up to the Ankles',
        description: 'Wash your right foot including the ankles and between toes three times with your left hand, then wash the left foot three times.',
        ruling: 'fard'
      },
      {
        stepNumber: 10,
        title: 'Supplication after Wudu',
        description: 'Facing the Qibla, recite the Shahadah and supplication. The Prophet (ﷺ) said all eight gates of Paradise will be opened for one who recites this.',
        arabicPhrase: 'أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ.',
        transliteration: "Ash-hadu alla ilaha illallahu wahdahu la shareeka lah, wa ash-hadu anna Muhammadan 'abduhu wa rasuluh. Allahummaj-'alni minat-tawwabeena waj-'alni minal-mutatahhireen.",
        meaning: 'I bear witness that none has the right to be worshipped except Allah alone, with no partner, and I bear witness that Muhammad is His servant and messenger. O Allah, make me of the repentant and make me of the purified.',
        ruling: 'mustahabb'
      }
    ]
  },
  {
    id: 'salah',
    category: 'salah',
    title: 'Step-by-Step Prayer Tutorial (Salah)',
    shortSummary: 'The physical, spiritual, and verbal movements of the daily Islamic prayer, from the opening Takbir to the final Tasleem.',
    madhhabDistinctions: 'Hand placement: Hanafi places hands below the navel for men, on chest for women. Shafi’i places hands between chest and navel slightly toward the left. Maliki allows Sadl (arms at sides) or Qabd (clasped). Raising hands (Raf al-Yadayn) before Ruku and when rising is practiced in Shafi’i, Hanbali, and Maliki schools.',
    steps: [
      {
        stepNumber: 1,
        title: 'Niyyah & Takbirat al-Ihram',
        description: 'Face the Qibla with focus and humility. Form the intention for the specific prayer in your heart. Raise both hands to earlobes (or shoulder level) and say "Allahu Akbar".',
        arabicPhrase: 'اللَّهُ أَكْبَرُ',
        transliteration: 'Allahu Akbar',
        meaning: 'Allah is the Greatest.',
        ruling: 'fard'
      },
      {
        stepNumber: 2,
        title: 'Qiyam: Recitation of Surah Al-Fatihah',
        description: 'Place your right hand over your left on your chest/navel. Recite the opening Dua (Thana/Du’a al-Istiftah), seek refuge from Shaytan, recite Surah Al-Fatihah, and say "Ameen". Follow with a short Surah (e.g. Al-Ikhlas) in the first two rak’ahs.',
        arabicPhrase: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلاَ إِلَهَ غَيْرُكَ',
        transliteration: 'Subhanakallahumma wa bihamdika wa tabarakasmuka wa ta’ala jadduka wa la ilaha ghayruk.',
        meaning: 'Glory be to You, O Allah, and all praise. Blessed is Your Name and exalted is Your Majesty, and there is no deity besides You.',
        ruling: 'fard'
      },
      {
        stepNumber: 3,
        title: 'Ruku (Bowing Posture)',
        description: 'Say "Allahu Akbar" and bow from the hips with back straight and hands grasping the knees with fingers spread. In bowing, recite three times:',
        arabicPhrase: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
        transliteration: 'Subhana Rabbiyal-’Azeem',
        meaning: 'Glory be to my Lord, the Almighty.',
        ruling: 'fard'
      },
      {
        stepNumber: 4,
        title: 'I’tidal (Rising from Bowing)',
        description: 'Rise back to a completely upright standing position, saying "Sami’ Allahu liman hamidah", then say "Rabbana wa lakal-hamd".',
        arabicPhrase: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ • رَبَّنَا وَلَكَ الْحَمْدُ',
        transliteration: 'Sami’ Allahu liman hamidah. Rabbana wa lakal-hamd.',
        meaning: 'Allah hears whoever praises Him. Our Lord, all praise is due to You.',
        ruling: 'fard'
      },
      {
        stepNumber: 5,
        title: 'Sujud (First Prostration on 7 Limbs)',
        description: 'Say "Allahu Akbar" and prostrate on the ground, ensuring seven limbs make contact: the forehead and nose, both palms, both knees, and the toes of both feet. Recite three times:',
        arabicPhrase: 'سُبْحَانَ رَبِّيَ الأَعْلَى',
        transliteration: 'Subhana Rabbiyal-A’la',
        meaning: 'Glory be to my Lord, the Most High.',
        ruling: 'fard'
      },
      {
        stepNumber: 6,
        title: 'Jalsah (Sitting Between Prostrations)',
        description: 'Say "Allahu Akbar" and rise to a calm seated position with back straight. Sit on your left foot with right foot upright. Recite:',
        arabicPhrase: 'رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي',
        transliteration: 'Rabbighfir li, Rabbighfir li',
        meaning: 'My Lord, forgive me. My Lord, forgive me.',
        ruling: 'fard'
      },
      {
        stepNumber: 7,
        title: 'Second Prostration',
        description: 'Say "Allahu Akbar" and perform the second prostration exactly like the first, reciting "Subhana Rabbiyal-A’la" three times. This completes one Rak’ah.',
        ruling: 'fard'
      },
      {
        stepNumber: 8,
        title: 'Tashahhud (Sitting for Testimony)',
        description: 'After the second rak’ah (and the final rak’ah), sit calmly and recite the Tashahhud (Attahiyyat), raising the right index finger during the Shahadah.',
        arabicPhrase: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلاَمُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ.',
        transliteration: 'At-tahiyyatu lillahi was-salawatu wat-tayyibat. As-salamu ‘alayka ayyuhan-Nabiyyu wa rahmatullahi wa barakatuh. As-salamu ‘alayna wa ‘ala ‘ibadillahis-saliheen. Ash-hadu alla ilaha illallahu wa ash-hadu anna Muhammadan ‘abduhu wa rasuluh.',
        meaning: 'All compliments, prayers, and pure things are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I testify that none has the right to be worshipped except Allah, and Muhammad is His servant and messenger.',
        ruling: 'fard'
      },
      {
        stepNumber: 9,
        title: 'Durood Ibrahim (In the Final Rak’ah)',
        description: 'In the final rak’ah, follow the Tashahhud with Salawat upon Prophet Muhammad (ﷺ) and Prophet Ibrahim (AS).',
        arabicPhrase: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ...',
        transliteration: 'Allahumma salli ‘ala Muhammadin wa ‘ala ali Muhammadin kama sallayta ‘ala Ibraheema wa ‘ala ali Ibraheema innaka Hameedum Majeed...',
        meaning: 'O Allah, bestow Your favor upon Muhammad and upon the family of Muhammad as You bestowed favor upon Ibrahim and upon the family of Ibrahim. Indeed, You are Praiseworthy and Glorious...',
        ruling: 'sunnah'
      },
      {
        stepNumber: 10,
        title: 'Tasleem (Concluding Salam)',
        description: 'Turn your face to the right shoulder and say "As-salamu alaykum wa rahmatullah", then turn to the left shoulder and repeat.',
        arabicPhrase: 'السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
        transliteration: 'As-salamu ‘alaykum wa rahmatullah',
        meaning: 'May the peace and mercy of Allah be upon you.',
        ruling: 'fard'
      }
    ]
  },
  {
    id: 'ghusl',
    category: 'ghusl',
    title: 'How to Perform Ghusl (Full Ritual Bath)',
    shortSummary: 'The comprehensive method of ritual bathing required after major ritual impurity (Janabah, menses, postnatal bleeding).',
    steps: [
      {
        stepNumber: 1,
        title: 'Form Intention (Niyyah)',
        description: 'Form the intention in your heart to cleanse yourself of major impurity for the worship of Allah.',
        ruling: 'fard'
      },
      {
        stepNumber: 2,
        title: 'Wash Hands & Private Areas',
        description: 'Wash your hands three times, then wash your private parts thoroughly with your left hand to remove any impurities.',
        ruling: 'sunnah'
      },
      {
        stepNumber: 3,
        title: 'Perform Full Wudu',
        description: 'Perform a complete wudu exactly as you do for prayer (you may delay washing the feet until the end).',
        ruling: 'sunnah'
      },
      {
        stepNumber: 4,
        title: 'Wash the Head & Scalp',
        description: 'Pour water over your head three times, rubbing the roots of your hair with your fingers to ensure water reaches the scalp completely.',
        ruling: 'fard'
      },
      {
        stepNumber: 5,
        title: 'Wash the Entire Body',
        description: 'Pour water over your entire body, starting with the right side from top to bottom, then the left side, ensuring no spot is left dry.',
        ruling: 'fard'
      }
    ]
  }
];

export function getLearningTopicById(id: string): LearningTopic | undefined {
  return LEARNING_TOPICS.find(t => t.id === id);
}
