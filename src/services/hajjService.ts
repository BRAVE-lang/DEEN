// ==============================================================================
// DEEN — Hajj & Umrah Interactive Pilgrim Companion Service
// Grounded in Ministry of Hajj and Umrah (KSA) & Nusuk Platform Guidelines
// ==============================================================================

import { HajjRitualStep } from '@/types';

export const TALBIYAH = {
  arabic: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لاَ شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لاَ شَرِيكَ لَكَ.',
  transliteration: 'Labbayk Allahumma labbayk, labbayka la shareeka laka labbayk. Innal-hamda wan-ni’mata laka wal-mulk, la shareeka lak.',
  meaning: 'Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise, grace, and sovereignty belong to You. You have no partner.'
};

export const EMERGENCY_NUMBERS = [
  { service: 'Unified Emergency Services (Saudi Arabia)', number: '911' },
  { service: 'Ministry of Hajj & Umrah Care Center', number: '1966' },
  { service: 'Red Crescent Medical Ambulance', number: '997' },
  { service: 'Civil Defense (Disaster Response)', number: '998' },
  { service: 'Traffic Police', number: '993' }
];

export const HAJJ_STEPS: HajjRitualStep[] = [
  {
    stepNumber: 1,
    name: 'Entering Ihram & Niyyah at the Miqat',
    arabicName: 'الإحرام والميقات',
    day: 'Before 8th Dhul-Hijjah',
    location: 'Designated Miqat Boundary',
    description: 'Perform ghusl, trim nails, apply scent to body (not garments), and put on the two unstitched white garments for men (ordinary modest clothes for women). Make the intention for Hajj (or Umrah) at the Miqat and chant the Talbiyah continuously.',
    duaArabic: 'لَبَّيْكَ حَجًّا • لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ...',
    duaTransliteration: 'Labbayka Hajjan. Labbayk Allahumma labbayk...',
    duaMeaning: 'Here I am, O Allah, answering Your call for Hajj. Here I am, You have no partner...',
    obligations: [
      'Enter state of Ihram before crossing the designated geographic Miqat.',
      'Sincere intention in the heart for Hajj.',
      'Avoid all prohibitions of Ihram (no cutting hair or nails, no perfume, no hunting, no marital intimacy, no head covering for men).'
    ],
    commonMistakes: [
      'Crossing the Miqat on an airplane without having entered Ihram.',
      'Assuming that accidentally brushing against a scented soap after Ihram ruins the Hajj (repent and wash it off immediately).'
    ],
    sunnahPractices: [
      'Performing Ghusl before wearing the Ihram garments.',
      'Praying two Rak’ahs of Sunnah if not in a disliked time of prayer.',
      'Reciting the Talbiyah audibly for men and softly for women.'
    ]
  },
  {
    stepNumber: 2,
    name: 'Day of Tarwiyah in Mina',
    arabicName: 'يوم التروية بمِنى',
    day: '8th of Dhul-Hijjah',
    location: 'Mina Valley',
    description: 'Pilgrims depart for Mina before Dhuhr. Stay in the tents of Mina, praying Dhuhr, Asr, Maghrib, Isha, and Fajr of the 9th. Prayers of four rak’ahs (Dhuhr, Asr, Isha) are shortened to two rak’ahs (Qasr) but not combined, each offered in its due time.',
    obligations: [
      'Remaining in Mina overnight on the night of the 9th Dhul-Hijjah (strongly established Sunnah).'
    ],
    commonMistakes: [
      'Rushing prematurely to Arafat on the 8th without valid reason.',
      'Combining prayers unnecessarily when the Sunnah is to shorten without combining in Mina.'
    ],
    sunnahPractices: [
      'Spending the entire day and night engaged in Dhikr, Quran recitation, and Talbiyah.',
      'Resting well in preparation for the great Day of Arafat.'
    ]
  },
  {
    stepNumber: 3,
    name: 'The Day of Arafat (Wuquf) — The Core Pillar of Hajj',
    arabicName: 'يوم عرفة (الوقوف بعرفة)',
    day: '9th of Dhul-Hijjah',
    location: 'Plain of Arafat (outside the boundary of the Haram)',
    description: 'The Prophet (ﷺ) declared: "Al-Hajj ‘Arafah" (Hajj is Arafat). After sunrise, pilgrims travel to Arafat. At Namirah Mosque or in your tent, listen to the Khutbah and pray Dhuhr and Asr combined and shortened at the time of Dhuhr. Devote the entire afternoon until sunset to sincere Du’a, tears, and repentance.',
    duaArabic: 'لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.',
    duaTransliteration: 'La ilaha illallahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamdu, wa Huwa ‘ala kulli shay’in Qadeer.',
    duaMeaning: 'There is no deity except Allah alone with no partner. To Him belongs all sovereignty and all praise, and He is over all things capable.',
    obligations: [
      'Being physically present within the recognized geographic boundaries of Arafat between zawal (midday) and sunset on the 9th.',
      'Staying until after the sun has completely set.'
    ],
    commonMistakes: [
      'Standing outside the designated boundaries of Arafat (check boundary signage carefully).',
      'Leaving Arafat before sunset.',
      'Spending precious hours taking photos instead of tearful supplication.'
    ],
    sunnahPractices: [
      'Facing the Qibla while raising both hands in supplication continuously.',
      'Making frequent Istighfar for oneself, parents, family, and the entire Ummah.'
    ]
  },
  {
    stepNumber: 4,
    name: 'Overnight in Muzdalifah & Gathering Pebbles',
    arabicName: 'المبيت بمزدلفة وجمع الحصى',
    day: 'Night of 10th Dhul-Hijjah',
    location: 'Muzdalifah (between Arafat and Mina)',
    description: 'After sunset, proceed calmly to Muzdalifah. Upon arrival, pray Maghrib (3 rak’ahs) and Isha (shortened to 2 rak’ahs) combined. Sleep under the open sky until Fajr. Gather 49 to 70 small pebbles (size of a chickpea) for the stoning rites.',
    obligations: [
      'Spending the night in Muzdalifah until at least after midnight (elderly and weak are permitted to depart after midnight).'
    ],
    commonMistakes: [
      'Praying Maghrib on the road before reaching Muzdalifah without necessity.',
      'Gathering massive stones or washing the pebbles (unnecessary hardship contrary to Sunnah).'
    ],
    sunnahPractices: [
      'Sleeping immediately after prayer to gain energy for the heavy rites of Day 10.',
      'Standing at Al-Mash’ar al-Haram at dawn supplicating until the sky becomes bright.'
    ]
  },
  {
    stepNumber: 5,
    name: 'Yawm an-Nahr: Jamarat, Qurbani, Shaving & Tawaf al-Ifadah',
    arabicName: 'يوم النحر (العقبة الكبرى والتحلل)',
    day: '10th of Dhul-Hijjah (Eid Day)',
    location: 'Mina & Makkah (Haram)',
    description: 'The busiest and greatest day of Hajj. Four major rites occur: 1) Stone Jamarat al-Aqaba with 7 pebbles saying "Allahu Akbar" with each throw. 2) Slaughter sacrificial animal (Hadya). 3) Shave (Halq) or trim (Taqsir) hair (entering Tahallul al-Asghar, lifting all Ihram restrictions except intimacy). 4) Go to Makkah for Tawaf al-Ifadah and Sa’i.',
    obligations: [
      'Stoning Jamarat al-Aqaba (the largest pillar) with 7 pebbles.',
      'Shaving or evenly trimming the hair (shaving is superior for men; women cut a fingertip length from the end of their braid).',
      'Tawaf al-Ifadah (fundamental pillar of Hajj).'
    ],
    commonMistakes: [
      'Throwing shoes, umbrellas, or large rocks at the pillars instead of small pebbles with humility.',
      'Throwing all 7 pebbles at once (counts as only one throw).'
    ],
    sunnahPractices: [
      'Stopping the Talbiyah with the first pebble thrown at Jamarat al-Aqaba.',
      'Spraying fragrance on oneself after shaving/trimming before going for Tawaf al-Ifadah.'
    ]
  },
  {
    stepNumber: 6,
    name: 'Ayyam at-Tashreeq: Days of Mina & Stoning the 3 Jamarat',
    arabicName: 'أيام التشريق ورَمي الجمرات الثلاث',
    day: '11th, 12th (and optionally 13th) of Dhul-Hijjah',
    location: 'Mina Valley',
    description: 'Stay in Mina. Each afternoon after Zawal (midday), stone all three pillars in sequence: 1) Jamarat as-Sughra (Small) with 7 pebbles, then pause facing Qibla to make long Du’a. 2) Jamarat al-Wusta (Middle) with 7 pebbles and long Du’a. 3) Jamarat al-Kubra (Aqaba) with 7 pebbles with no Du’a afterward. You may depart Mina on the 12th before sunset (Ta’ajjul) or stay for the 13th (Afdal).',
    obligations: [
      'Overnight stay in Mina for most of the night.',
      'Stoning all three Jamarat in proper chronological order after midday.'
    ],
    commonMistakes: [
      'Stoning before midday (Zawal) during the Tashreeq days.'
    ],
    sunnahPractices: [
      'Making extensive supplication after the first and second Jamarat.'
    ]
  },
  {
    stepNumber: 7,
    name: 'Tawaf al-Wada (The Farewell Tawaf)',
    arabicName: 'طواف الوداع',
    day: 'Final day before departure from Makkah',
    location: 'The Holy Kaaba, Masjid al-Haram',
    description: 'Before departing Makkah to return home, perform seven circuits of Tawaf around the Kaaba without Sa’i. Make your last memory in Makkah one of gazing upon the Baytullah with gratitude, tears, and longing to return. Women in menses are excused without penalty.',
    obligations: [
      'Performing the Farewell Tawaf as the final act before leaving Makkah.'
    ],
    commonMistakes: [
      'Lingering in Makkah for shopping or tourism after performing the Farewell Tawaf (if you delay, you must repeat it).'
    ],
    sunnahPractices: [
      'Drinking Zamzam water to fulfillment and praying for accepted Hajj and righteousness.'
    ]
  }
];

export const UMRAH_STEPS = [
  { step: 1, title: 'Ihram & Niyyah', desc: 'Wear Ihram garments, formulate intention at Miqat, and chant Talbiyah.' },
  { step: 2, title: 'Tawaf al-Umrah', desc: 'Perform 7 circuits around the Kaaba starting from the Black Stone line counter-clockwise.' },
  { step: 3, title: 'Pray 2 Rak’ahs & Drink Zamzam', desc: 'Pray 2 rak’ahs behind Maqam Ibrahim (or anywhere in the Haram) and drink Zamzam.' },
  { step: 4, title: 'Sa’i of Safa and Marwah', desc: 'Walk 7 laps between Mount Safa and Mount Marwah, starting at Safa and ending at Marwah.' },
  { step: 5, title: 'Halq or Taqsir', desc: 'Shave head or trim hair. With this, all Ihram restrictions are lifted and Umrah is complete.' }
];
