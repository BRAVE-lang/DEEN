// ==============================================================================
// DEEN — Authentic Duas and Adhkar Service
// Sourced from Hisn al-Muslim (Fortress of the Muslim), Sahih Bukhari, Muslim & The Holy Quran
// ==============================================================================

import { DuaItem } from '@/types';

export const DUA_CATEGORIES = [
  { id: 'all', name: { en: 'All Duas', ar: 'جميع الأدعية', hi: 'सभी दुआएं', gu: 'બધી દુઆઓ' } },
  { id: 'morning_evening', name: { en: 'Morning & Evening', ar: 'أذكار الصباح والمساء', hi: 'सुबह और शाम', gu: 'સવાર અને સાંજ' } },
  { id: 'after_prayer', name: { en: 'After Obligatory Prayer', ar: 'أذكار بعد الصلاة', hi: 'नमाज़ के बाद के अज़कार', gu: 'નમાઝ પછીના અઝકાર' } },
  { id: 'protection', name: { en: 'Protection & Ruqyah', ar: 'الحفظ والتحصين', hi: 'हिफ़ाज़त और नज़र', gu: 'રક્ષણ અને નજર' } },
  { id: 'illness', name: { en: 'Illness & Health', ar: 'المرض والشفاء', hi: 'बीमारी और शिफ़ा', gu: 'બીમારી અને શિફા' } },
  { id: 'distress', name: { en: 'Distress & Anxiety', ar: 'الكرب والهم', hi: 'चिंता और परेशानी', gu: 'ચિંતા અને તકલીફ' } },
  { id: 'forgiveness', name: { en: 'Forgiveness & Repentance', ar: 'الاستغفار والتوبة', hi: 'माफ़ी और तौबा', gu: 'માફી અને તૌબા' } },
  { id: 'travel', name: { en: 'Travel & Journeys', ar: 'السفر والركوب', hi: 'सफ़र की दुआएं', gu: 'મુસાફરીની દુઆઓ' } },
  { id: 'parents_family', name: { en: 'Parents & Family', ar: 'الوالدين والذرية', hi: 'माता-पिता और परिवार', gu: 'માતા-પિતા અને પરિવાર' } },
  { id: 'ramadan_fasting', name: { en: 'Fasting & Ramadan', ar: 'الصيام ورمضان', hi: 'रोज़ा और रमज़ान', gu: 'રોઝા અને રમઝાન' } },
  { id: 'rabbana', name: { en: 'Quranic Rabbana Duas', ar: 'أدعية ربنا القرآنية', hi: 'कुरानिक रब्बना दुआएं', gu: 'કુરાનિક રબ્બના દુઆઓ' } }
];

export const AUTHENTIC_DUAS: DuaItem[] = [
  // ---------------------------------------------------------------------------
  // 1. FORGIVENESS & REPENTANCE (ISTIGHFAR)
  // ---------------------------------------------------------------------------
  {
    id: 'sayyid-al-istighfar',
    category: 'forgiveness',
    title: {
      en: 'The Master Supplication for Forgiveness (Sayyid al-Istighfar)',
      ar: 'سيد الاستغفار',
      hi: 'माफ़ी की सबसे अफ़ज़ल दुआ (सैय्यिदुल इस्तिग़फ़ार)',
      gu: 'માફી માટેની શ્રેષ્ઠ દુઆ (સૈયિદુલ ઇસ્તિગફાર)'
    },
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ.',
    transliteration: "Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bini'matika 'alayya, wa abu'u laka bidhanbi faghfir li, fa-innahu la yaghfiru dh-dhunuba illa anta.",
    translations: {
      en: "O Allah, You are my Lord, none has the right to be worshipped but You. You created me and I am Your servant, and I abide to Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favors upon me, and I confess my sins to You; so forgive me, for none can forgive sins except You.",
      hi: "ऐ अल्लाह! तू ही मेरा रब है, तेरे सिवा कोई माबूद नहीं। तूने ही मुझे पैदा किया और मैं तेरा बन्दा हूँ। मैं अपनी ताक़त के मुताबिक तेरे अहद और वादे पर क़ायम हूँ। जो बुराई मैंने की, उसके शर से तेरी पनाह मांगता हूँ। अपने ऊपर तेरी नेमतों का इक़रार करता हूँ और अपने गुनाहों का एतराफ़ करता हूँ, पस मुझे बख़्श दे, क्योंकि तेरे सिवा गुनाहों को कोई माफ़ नहीं कर सकता।",
      gu: "હે અલ્લાહ! તું જ મારો રબ છે, તારા સિવાય કોઈ ઇબાદતને લાયક નથી. તેં જ મને પેદા કર્યો અને હું તારો બંદો છું. હું મારી શક્તિ મુજબ તારા કરાર અને વચન પર કાયમ છું. મેં કરેલા ખરાબ કામોના અનિષ્ટથી તારી પનાહ માંગું છું. મારી પરની તારી નેઅમતોનો સ્વીકાર કરું છું અને મારા ગુનાહોનો એકરાર કરું છું, માટે મને માફ કરી દે, કારણ કે તારા સિવાય કોઈ ગુનાહોને માફ કરી શકતું નથી."
    },
    reference: 'Sahih al-Bukhari 6306',
    repetitionCount: 1,
    isSunnahCount: true,
    benefits: 'The Prophet (ﷺ) said: "Whoever recites it during the day with firm faith and dies before evening will be from the people of Paradise; and whoever recites it at night with firm faith and dies before morning will be from the people of Paradise."',
    audioUrl: 'https://cdn.islamic.network/audio/sayyid_al_istighfar.mp3'
  },
  {
    id: 'repentance-rabbighfir-li',
    category: 'forgiveness',
    title: {
      en: 'Supplication for Forgiveness Repeated 100 Times Daily',
      ar: 'دعاء رب اغفر لي وتب علي',
      hi: 'सौ मर्तबा इस्तिग़फ़ार की दुआ',
      gu: 'રોજ સો વખત પઢવાની માફીની દુઆ'
    },
    arabic: 'رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ.',
    transliteration: "Rabbighfir li wa tub 'alayya innaka Antat-Tawwabur-Raheem.",
    translations: {
      en: "My Lord! Forgive me and accept my repentance, for You are the Accepter of Repentance, the Most Merciful.",
      hi: "ऐ मेरे रब! मुझे बख़्श दे और मेरी तौबा क़बूल फ़रमा, बेशक तू ही तौबा क़बूल करने वाला, बेहद रहम करने वाला है।",
      gu: "હે મારા રબ! મને માફ કરી દે અને મારી તૌબા સ્વીકાર, નિઃશંક તું જ તૌબા સ્વીકારનાર, અત્યંત દયાળુ છે."
    },
    reference: 'Jami at-Tirmidhi 3434, Sunan Abi Dawud 1516 (Sahih)',
    repetitionCount: 100,
    isSunnahCount: true,
    benefits: 'Ibn Umar (RA) narrated: "We counted the Messenger of Allah (ﷺ) saying this one hundred times in a single gathering."'
  },

  // ---------------------------------------------------------------------------
  // 2. MORNING & EVENING ADHKAR
  // ---------------------------------------------------------------------------
  {
    id: 'morning-protection-bismillah',
    category: 'morning_evening',
    title: {
      en: 'Supplication for Divine Protection against All Harm',
      ar: 'دعاء الحفظ من كل سوء',
      hi: 'तमाम बुराईयों से हिफ़ाज़त की दुआ',
      gu: 'તમામ અનિષ્ટથી રક્ષણ મેળવવાની દુઆ'
    },
    arabic: 'بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.',
    transliteration: "Bismillahil-ladhi la yadurru ma'as-mihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Alim.",
    translations: {
      en: "In the name of Allah, with whose name nothing on earth or in the heavens can cause harm, and He is the All-Hearing, the All-Knowing.",
      hi: "अल्लाह के नाम से, जिसके नाम की बरकत से ज़मीन और आसमान की कोई चीज़ नुक़सान नहीं पहुंचा सकती, और वही सब कुछ सुनने वाला, सब कुछ जानने वाला है।",
      gu: "અલ્લાહના નામ સાથે, જેના નામની બરકતથી જમીન અને આકાશની કોઈ ચીજ નુકસાન પહોંચાડી શકતી નથી, અને તે સર્વસાંભળનાર, સર્વજ્ઞ છે."
    },
    reference: 'Sunan Abi Dawud 5088, Jami at-Tirmidhi 3388 (Sahih)',
    repetitionCount: 3,
    isSunnahCount: true,
    benefits: 'Recited 3 times in the morning and 3 times in the evening. Nothing shall harm the reciter on that day or night.'
  },
  {
    id: 'morning-radheetu-billah',
    category: 'morning_evening',
    title: {
      en: 'Contentment with Allah, Islam, and the Prophet (ﷺ)',
      ar: 'رضيت بالله رباً وبالإسلام ديناً',
      hi: 'ईमान और रज़ा की अज़ीम दुआ',
      gu: 'ઈમાન અને સંતોષની અઝીમ દુઆ'
    },
    arabic: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالإِسْلاَمِ دِينًا، وَبِمُحَمَّدٍ صلى الله عليه وسلم نَبِيًّا.',
    transliteration: "Radheetu billahi Rabba, wa bil-Islami deena, wa bi Muhammadin sallallahu 'alayhi wa sallama Nabiyya.",
    translations: {
      en: "I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (ﷺ) as my Prophet.",
      hi: "मैं अल्लाह के रब होने पर, इस्लाम के दीन होने पर और हज़रत मुहम्मद (ﷺ) के नबी होने पर राज़ी और ख़ुश हूँ।",
      gu: "હું અલ્લાહના રબ હોવા પર, ઇસ્લામના દીન હોવા પર અને હઝરત મુહમ્મદ (ﷺ) ના નબી હોવા પર રાજી અને ખુશ છું."
    },
    reference: 'Sunan Abi Dawud 5072, Jami at-Tirmidhi 3389 (Sahih)',
    repetitionCount: 3,
    isSunnahCount: true,
    benefits: 'The Prophet (ﷺ) said: "Allah has promised that anyone who says this in the morning and evening will be pleased on the Day of Resurrection."'
  },
  {
    id: 'morning-asbahna-wa-asbahal-mulk',
    category: 'morning_evening',
    title: {
      en: 'Morning Remembrance of Sovereignty and Praise',
      ar: 'أصبحنا وأصبح الملك لله',
      hi: 'सुबह की बादशाही और तारीफ़ का ज़िक्र',
      gu: 'સવારની બાદશાહત અને સ્તુતિનો ઝિક્ર'
    },
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.',
    transliteration: "Asbahna wa asbahal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamdu wa Huwa 'ala kulli shay'in Qadeer.",
    translations: {
      en: "We have reached the morning and the dominion belongs to Allah, and all praise belongs to Allah. None has the right to be worshipped except Allah, alone, without partner. To Him belongs all sovereignty and to Him belongs all praise, and He has power over all things.",
      hi: "हमने सुबह की और सारी बादशाही अल्लाह ही की है, और सब तारीफ़ अल्लाह ही के लिए है। अल्लाह के सिवा कोई माबूद नहीं, वह अकेला है, उसका कोई शरीक नहीं, उसी की सल्तनत है और उसी के लिए सारी तारीफ़ है, और वह हर चीज़ पर क़ादिर है।",
      gu: "અમે સવાર કરી અને તમામ બાદશાહત અલ્લાહની જ છે, અને તમામ પ્રશંસા અલ્લાહ માટે જ છે. અલ્લાહ સિવાય કોઈ પૂજનીય નથી, તે એકલો છે, તેનો કોઈ ભાગીદાર નથી, તેની જ બાદશાહત છે અને તેના માટે જ સઘળી સ્તુતિ છે, અને તે દરેક વસ્તુ પર સમર્થ છે."
    },
    reference: 'Sahih Muslim 2723',
    repetitionCount: 1,
    isSunnahCount: true,
    benefits: 'Sunnah morning recitation for affirming Tawheed and submitting all affairs to the Almighty.'
  },

  // ---------------------------------------------------------------------------
  // 3. AFTER OBLIGATORY PRAYER (ADHKAR BA'DA AS-SALAH)
  // ---------------------------------------------------------------------------
  {
    id: 'after-prayer-istighfar-salam',
    category: 'after_prayer',
    title: {
      en: 'Seeking Forgiveness and Divine Peace immediately after Tasleem',
      ar: 'الاستغفار والسلام بعد الصلاة المفروضة',
      hi: 'फ़र्ज़ नमाज़ के तुरंत बाद का इस्तिग़फ़ार व सलाम',
      gu: 'ફર્ઝ નમાઝ બાદ તુરંત માફી અને સલામ'
    },
    arabic: 'أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ. اللَّهُمَّ أَنْتَ السَّلاَمُ وَمِنْكَ السَّلاَمُ، تَبَارَكْتَ يَا ذَا الْجَلاَلِ وَالإِكْرَامِ.',
    transliteration: "Astaghfirullah, Astaghfirullah, Astaghfirullah. Allahumma Antas-Salamu wa minkas-salam, tabarakta ya Dhal-Jalali wal-Ikram.",
    translations: {
      en: "I seek forgiveness from Allah (3 times). O Allah, You are Peace and from You comes peace. Blessed are You, O Owner of Majesty and Honor.",
      hi: "मैं अल्लाह से मग़फ़िरत मांगता हूँ (3 बार)। ऐ अल्लाह! तू ही सलामती वाला है और तेरी ही तरफ़ से सलामती है, तू बड़ी बरकत वाला है, ऐ जलाल और इज़्ज़त के मालिक!",
      gu: "હું અલ્લાહ પાસે માફી માંગું છું (3 વખત). હે અલ્લાહ! તું જ સલામતીવાળો છે અને તારી તરફથી જ શાંતિ-સલામતી છે, તું ખૂબ જ બરકતવાળો છે, હે મોટાઈ અને સન્માનના માલિક!"
    },
    reference: 'Sahih Muslim 591',
    repetitionCount: 1,
    isSunnahCount: true,
    benefits: 'Whenever the Prophet (ﷺ) finished his obligatory prayer, he sought forgiveness three times and uttered this invocation.'
  },
  {
    id: 'after-prayer-tasbeeh-fatima',
    category: 'after_prayer',
    title: {
      en: 'The 33-33-33 Tasbeeh after Obligatory Prayer',
      ar: 'تسبيح ما بعد الصلاة (33 سبحان الله)',
      hi: 'नमाज़ के बाद 33 मर्तबा तस्बीह',
      gu: 'નમાઝ પછી 33 વખત તસ્બીહ'
    },
    arabic: 'سُبْحَانَ اللَّهِ (٣٣)، وَالْحَمْدُ لِلَّهِ (٣٣)، وَاللَّهُ أَكْبَرُ (٣٣)، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.',
    transliteration: "SubhanAllah (33x), Alhamdulillah (33x), Allahu Akbar (33x). La ilaha illallahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamdu wa Huwa 'ala kulli shay'in Qadeer.",
    translations: {
      en: "Glory be to Allah (33 times), Praise be to Allah (33 times), Allah is the Greatest (33 times). None has the right to be worshipped but Allah alone, without partner; to Him belongs all sovereignty and to Him belongs all praise, and He has power over all things.",
      hi: "सुब्हानअल्लाह (33 बार), अल्हम्दुलिल्लाह (33 बार), अल्लाहु अकबर (33 बार)। अल्लाह के सिवा कोई माबूद नहीं, वह अकेला है, उसका कोई साझीदार नहीं, उसी की सल्तनत है और उसी के लिए सारी तारीफ़ है, और वह हर चीज़ पर क़ादिर है।",
      gu: "સુબ્હાનઅલ્લાહ (33 વખત), અલ્હમદુલિલ્લાહ (33 વખત), અલ્લાહુ અકબર (33 વખત). અલ્લાહ સિવાય કોઈ પૂજનીય નથી, તે એકલો છે, તેનો કોઈ ભાગીદાર નથી, તેની જ બાદશાહત છે અને તેના માટે જ સઘળી સ્તુતિ છે, અને તે દરેક વસ્તુ પર સામર્થ્યવાન છે."
    },
    reference: 'Sahih Muslim 597',
    repetitionCount: 1,
    isSunnahCount: true,
    benefits: 'The Prophet (ﷺ) said: "Whoever recites this after every prayer, his sins will be forgiven even if they are like the foam of the sea."'
  },
  {
    id: 'after-prayer-help-worship',
    category: 'after_prayer',
    title: {
      en: 'Supplication for Assistance in Remembering and Worshipping Allah',
      ar: 'اللهم أعني على ذكرك وشكرك وحسن عبادتك',
      hi: 'अल्लाह के ज़िक्र, शुक्र और बेहतरीन इबादत की तौफ़ीक़ की दुआ',
      gu: 'અલ્લાહના ઝિક્ર, શુક્ર અને ઉત્તમ ઇબાદત માટે સહાયતાની દુઆ'
    },
    arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ.',
    transliteration: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatik.",
    translations: {
      en: "O Allah, help me to remember You, to thank You, and to worship You in an excellent manner.",
      hi: "ऐ अल्लाह! मेरी मदद फ़रमा अपने ज़िक्र पर, अपने शुक्र पर और अपनी बेहतरीन इबादत पर।",
      gu: "હે અલ્લાહ! મારી સહાય કર તારા ઝિક્ર (સ્મરણ) પર, તારા શુક્ર (આભાર) પર અને તારી ઉત્તમ ઇબાદત પર."
    },
    reference: 'Sunan Abi Dawud 1522, Riyad as-Salihin 384 (Sahih)',
    repetitionCount: 1,
    isSunnahCount: true,
    benefits: 'Prophet Muhammad (ﷺ) took Mu’adh (RA) by the hand and told him: "O Mu’adh, by Allah I love you! Do not forget to recite this at the end of every prayer."'
  },

  // ---------------------------------------------------------------------------
  // 4. PROTECTION & RUQYAH
  // ---------------------------------------------------------------------------
  {
    id: 'ayat-al-kursi',
    category: 'protection',
    title: {
      en: 'Ayat al-Kursi (The Verse of the Throne)',
      ar: 'آية الكرسي',
      hi: 'आयतल कुर्सी (हिफ़ाज़त की अज़ीम आयत)',
      gu: 'આયતુલ કુરસી (રક્ષણ માટેની મહાન આયત)'
    },
    arabic: 'اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ.',
    transliteration: "Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta'khudhuhu sinatun wa la nawm. Lahu ma fis-samawati wa ma fil-ard. Man dhal-ladhi yashfa'u 'indahu illa bi-idhnih. Ya'lamu ma bayna aydihim wa ma khalfahum, wa la yuhituna bi-shay'im-min 'ilmihi illa bima sha'a. Wasi'a kursiyyuhus-samawati wal-arda, wa la ya'uduhu hifzuhuma, wa Huwal-'Aliyyul-'Azim.",
    translations: {
      en: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
      hi: "अल्लाह! उसके सिवा कोई सच्चा माबूद नहीं, वह हमेशा ज़िंदा रहने वाला, सब को क़ायम रखने वाला है। उसे न कभी ऊंघ आती है और न नींद। जो कुछ आसमानों में है और जो कुछ ज़मीन में है, सब उसी का है। कौन है जो उसकी इजाज़त के बिना उसके पास सिफ़ारिश कर सके? वह जानता है जो कुछ उनके आगे है और जो कुछ उनके पीछे है, और वे उसके इल्म में से किसी चीज़ का अहाता नहीं कर सकते सिवाय जितना वह चाहे। उसकी कुर्सी तमाम आसमानों और ज़मीन को घेरे हुए है, और उन दोनों की हिफ़ाज़त उसे थकाती नहीं, और वह बहुत आलीशान, बड़ा बुज़ुर्ग है।",
      gu: "અલ્લાહ! તેના સિવાય કોઈ પૂજનીય નથી, તે હમેશા જીવંત, સર્વનું નિયંત્રણ કરનાર છે. તેને ન તો ઝોકું આવે છે કે ન ઊંઘ. જે કંઈ આકાશોમાં અને જે કંઈ ધરતી પર છે તે બધું તેનું જ છે. કોણ છે જે તેની પરવાનગી વિના તેની પાસે ભલામણ કરી શકે? તે જાણે છે જે કંઈ તેમની સામે છે અને જે કંઈ તેમની પાછળ છે, અને તેઓ તેના જ્ઞાનમાંથી કોઈ વસ્તુનો ઘેરાવ કરી શકતા નથી સિવાય કે જે તે ઇચ્છે. તેની કુરસી આકાશો અને ધરતી પર વિસ્તરેલી છે, અને તે બંનેનું રક્ષણ તેને થકવતું નથી, અને તે સર્વોચ્ચ, મહાન છે."
    },
    reference: 'The Holy Quran, Surah Al-Baqarah (2:255)',
    repetitionCount: 1,
    isSunnahCount: true,
    benefits: 'Recited after every obligatory prayer and before sleep. The Prophet (ﷺ) said whoever recites it after prayer, nothing stands between him and Paradise except death (An-Nasa\'i).'
  },
  {
    id: 'protection-perfect-words',
    category: 'protection',
    title: {
      en: 'Seeking Refuge in the Perfect Words of Allah from All Creation Evil',
      ar: 'أعوذ بكلمات الله التامات من شر ما خلق',
      hi: 'अल्लाह के मुकम्मल कलिमात के ज़रिये पनाह की दुआ',
      gu: 'અલ્લાહના સંપૂર્ણ કલિમાત દ્વારા રક્ષણ મેળવવાની દુઆ'
    },
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.',
    transliteration: "A'udhu bi-kalimatillahit-tammati min sharri ma khalaq.",
    translations: {
      en: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
      hi: "मैं पनाह मांगता हूँ अल्लाह के तमाम मुकम्मल कलिमात के ज़रिये हर उस चीज़ के शर से जो उसने पैदा की।",
      gu: "હું આશ્રય માંગું છું અલ્લાહના સંપૂર્ણ કલિમાત દ્વારા, તેણે સર્જેલી તમામ વસ્તુઓના અનિષ્ટથી."
    },
    reference: 'Sahih Muslim 2708',
    repetitionCount: 3,
    isSunnahCount: true,
    benefits: 'Recited three times in the evening or when stopping at any place. Nothing harmful, venomous or evil will touch the person until they depart.'
  },

  // ---------------------------------------------------------------------------
  // 5. ILLNESS & HEALTH (SHIFA & VISITING THE SICK)
  // ---------------------------------------------------------------------------
  {
    id: 'illness-supplication-visiting-sick',
    category: 'illness',
    title: {
      en: 'Supplication for Healing When Visiting the Sick (7 Times)',
      ar: 'دعاء زيارة المريض (أسأل الله العظيم)',
      hi: 'मरीज़ की अयादत (बीमारपुर्सी) के वक़्त 7 बार की दुआ',
      gu: 'બીમારની ખબરઅંતર પૂછતી વખતે 7 વખત પઢવાની દુઆ'
    },
    arabic: 'أَسْأَلُ اللَّهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ.',
    transliteration: "As'alullahal-'Azeema Rabbal-'Arshil-'Azeemi an yashfiyak.",
    translations: {
      en: "I ask Allah the Almighty, Lord of the Mighty Throne, to heal you.",
      hi: "मैं अज़ीम अल्लाह से, जो अज़ीम अर्श का रब है, सवाल करता हूँ कि वह तुम्हें शिफ़ा अता फ़रमाए।",
      gu: "હું મહાન અલ્લાહ પાસે, જે ભવ્ય અર્શનો રબ છે, યાચના કરું છું કે તે તમને સાજા (શિફા) કરે."
    },
    reference: 'Sunan Abi Dawud 3106, Jami at-Tirmidhi 2083 (Sahih)',
    repetitionCount: 7,
    isSunnahCount: true,
    benefits: 'The Prophet (ﷺ) said: "No Muslim visits a sick person whose time has not arrived and recites this seven times, except that Allah will cure him."'
  },
  {
    id: 'illness-ruqyah-prophet',
    category: 'illness',
    title: {
      en: 'The Prophet’s Invocational Ruqyah for Pain and Disease',
      ar: 'رقية النبي ﷺ لشفاء الأمراض والآلام',
      hi: 'बीमारी और दर्द दूर करने की नबवी रुक़्याह दुआ',
      gu: 'દર્દ અને બીમારી દૂર કરવા માટેની નબવી દુઆ'
    },
    arabic: 'اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَأْسَ، وَاشْفِ أَنْتَ الشَّافِي، لاَ شِفَاءَ إِلاَّ شِفَاؤُكَ، شِفَاءً لاَ يُغَادِرُ سَقَمًا.',
    transliteration: "Allahumma Rabban-nas, adhhibil-ba's, washfi Antash-Shafi, la shifa'a illa shifa'uk, shifa'an la yughadiru saqama.",
    translations: {
      en: "O Allah, Lord of mankind, remove the affliction and cure him; You are the Healer, there is no healing except Your healing—a healing that leaves behind no disease.",
      hi: "ऐ अल्लाह! इंसानों के रब, तकलीफ़ को दूर फ़रमा और शिफ़ा दे, तू ही शिफ़ा देने वाला है, तेरी शिफ़ा के सिवा कोई शिफ़ा नहीं, ऐसी शिफ़ा जो किसी बीमारी को बाक़ी न छोड़े।",
      gu: "હે અલ્લાહ! માનવજાતના રબ, મુશ્કેલીને દૂર કર અને સાજા કર; તું જ શિફા આપનાર છે, તારી શિફા સિવાય કોઈ શિફા નથી—એવી શિફા જે કોઈ રોગને બાકી ન રાખે."
    },
    reference: 'Sahih al-Bukhari 5743, Sahih Muslim 2191',
    repetitionCount: 1,
    isSunnahCount: true,
    benefits: 'Recited while wiping the area of discomfort or illness with the right hand.'
  },

  // ---------------------------------------------------------------------------
  // 6. DISTRESS & ANXIETY (AL-KARB WAL-HAMM)
  // ---------------------------------------------------------------------------
  {
    id: 'distress-yunus-as',
    category: 'distress',
    title: {
      en: 'The Invocation of Prophet Yunus (AS) in the Belly of the Whale',
      ar: 'دعاء ذي النون يونس عليه السلام في بطن الحوت',
      hi: 'हज़रत यूनुस (अलै.) की मछली के पेट वाली दुआ',
      gu: 'હઝરત યૂનુસ (અ.સ.) ની માછલીના પેટમાં કરેલી અઝીમ દુઆ'
    },
    arabic: 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ.',
    transliteration: "La ilaha illa Anta subhanaka inni kuntu minaz-zalimin.",
    translations: {
      en: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
      hi: "तेरे सिवा कोई सच्चा माबूद नहीं, तू पाक है, बेशक मैं ही क़ुसूरवारों (ज़ालिमों) में से था।",
      gu: "તારા સિવાય કોઈ પૂજનીય નથી, તું પવિત્ર છે, ખરેખર હું જ કસૂરવારોમાંથી હતો."
    },
    reference: 'The Holy Quran, Surah Al-Anbiya (21:87) / Jami at-Tirmidhi 3505 (Sahih)',
    repetitionCount: 1,
    isSunnahCount: true,
    benefits: 'The Prophet (ﷺ) said: "No Muslim ever supplicates with this for any hardship or sorrow except that Allah answers his prayer."'
  },
  {
    id: 'dua-distress-anxiety',
    category: 'distress',
    title: {
      en: 'Supplication for Relief from Anxiety, Sorrow and Debt Burden',
      ar: 'دعاء الهم والحزن والدين',
      hi: 'रंज, ग़म, सुस्ती और क़र्ज़ से निजात की दुआ',
      gu: 'ચિંતા, ઉદાસી અને દેવામાંથી મુક્તિની દુઆ'
    },
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ.',
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazani, wal-'ajzi wal-kasali, wal-bukhli wal-jubni, wa dala'id-dayni, wa ghalabatir-rijal.",
    translations: {
      en: "O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debt and from being overpowered by men.",
      hi: "ऐ अल्लाह! मैं तेरी पनाह मांगता हूँ फ़िक्र और ग़म से, लाचारी और सुस्ती से, कंजूसी और बुज़दिली से, क़र्ज़ के बोझ से और लोगों के ज़ुल्म व ग़लबा से।",
      gu: "હે અલ્લાહ! હું તારી પનાહ માંગું છું ચિંતા અને દુઃખથી, લાચારી અને આળસથી, કંજૂસી અને કાયરતાથી, દેવાના બોજથી અને લોકોના પ્રભાવ/દમનથી."
    },
    reference: 'Sahih al-Bukhari 6369',
    repetitionCount: 1,
    isSunnahCount: true,
    benefits: 'The Prophet (ﷺ) made this supplication daily for serenity and protection against overwhelming psychological and financial distress.'
  },
  {
    id: 'distress-hasbunallah',
    category: 'distress',
    title: {
      en: 'Sufficiency of Allah: Hasbunallahu wa Ni’mal Wakeel',
      ar: 'حسبنا الله ونعم الوكيل',
      hi: 'अल्लाह हमारे लिए काफ़ी है',
      gu: 'અલ્લાહ અમારા માટે પૂરતો છે'
    },
    arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ.',
    transliteration: "Hasbunallahu wa ni'mal-wakeel.",
    translations: {
      en: "Sufficient for us is Allah, and [He is] the best Disposer of affairs.",
      hi: "हमारे लिए अल्लाह काफ़ी है और वह बेहतरीन कारसाज़ है।",
      gu: "અમારા માટે અલ્લાહ પૂરતો છે અને તે શ્રેષ્ઠ કાર્યસાધક છે."
    },
    reference: 'The Holy Quran, Surah Ali \'Imran (3:173) / Sahih al-Bukhari 4563',
    repetitionCount: 1,
    isSunnahCount: true,
    benefits: 'Ibn Abbas (RA) stated: "This was uttered by Ibrahim (AS) when he was thrown into the fire, and by Muhammad (ﷺ) when the people said: \'Verily, a great army is gathering against you.\'"'
  },

  // ---------------------------------------------------------------------------
  // 7. TRAVEL & CONVEYANCE
  // ---------------------------------------------------------------------------
  {
    id: 'travel-dua',
    category: 'travel',
    title: {
      en: 'Supplication for Boarding a Vehicle and Traveling',
      ar: 'دعاء السفر وركوب الدابة',
      hi: 'सफ़र पर निकलने और सवारी पर बैठने की दुआ',
      gu: 'મુસાફરી શરૂ કરતી વખતે અને સવારી પર બેસવાની દુઆ'
    },
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ.',
    transliteration: "Subhanal-ladhi sakh-khara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina lamunqalibun.",
    translations: {
      en: "Glory be to Him who has subjected this to us, and we could never have achieved it by ourselves. And indeed, to our Lord we will surely return.",
      hi: "पाक है वह ज़ात जिसने इसे हमारे ताबे कर दिया, हालाँकि हम इसे क़ाबू में लाने वाले नहीं थे, और यक़ीनन हम अपने रब ही की तरफ़ लौटने वाले हैं।",
      gu: "પવિત્ર છે તે સત્તા જેણે આને અમારા વશમાં કરી આપ્યું, નહીં તો અમે તેને વશ કરવા સમર્થ ન હતા, અને નિઃશંકપણે આપણે આપણા રબ તરફ જ પાછા ફરવાના છીએ."
    },
    reference: 'The Holy Quran, Surah Az-Zukhruf (43:13-14) / Sahih Muslim 1342',
    repetitionCount: 1,
    isSunnahCount: true,
    benefits: 'Recited when mounting any conveyance (car, airplane, train, boat) before embarking on a journey.'
  },

  // ---------------------------------------------------------------------------
  // 8. PARENTS & FAMILY
  // ---------------------------------------------------------------------------
  {
    id: 'parents-dua',
    category: 'parents_family',
    title: {
      en: 'Supplication for Mercy upon Mother and Father',
      ar: 'دعاء للوالدين بالرحمة',
      hi: 'वालिदैन (माता-पिता) के लिए रहमत की दुआ',
      gu: 'માતા-પિતા માટે રહમતની દુઆ'
    },
    arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا.',
    transliteration: "Rabbi irhamhuma kama rabbayani sagheera.",
    translations: {
      en: "My Lord! Have mercy upon them both as they brought me up when I was small.",
      hi: "ऐ मेरे रब! उन दोनों (वालिदैन) पर रहम फ़रमा जैसा कि उन्होंने मुझे बचपन में पाला पोसा।",
      gu: "હે મારા રબ! તે બંને (માતા-પિતા) પર દયા કર જેવી રીતે તેઓએ મને બાળપણમાં પ્રેમથી ઉછેર્યો."
    },
    reference: 'The Holy Quran, Surah Al-Isra (17:24)',
    repetitionCount: 1,
    isSunnahCount: true,
    benefits: 'Commanded in the Quran as an enduring prayer of gratitude and love for one’s parents.'
  },
  {
    id: 'family-righteous-spouse-children',
    category: 'parents_family',
    title: {
      en: 'Supplication for Righteous Spouse and Offspring (Coolness of the Eyes)',
      ar: 'دعاء لصلاح الزوجة والذرية',
      hi: 'नेक औलाद और नेक जीवनसाथी की दुआ',
      gu: 'નેક સંતાન અને નેક જીવનસાથી માટેની દુઆ'
    },
    arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا.',
    transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lil-muttaqina imama.",
    translations: {
      en: "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.",
      hi: "ऐ हमारे रब! हमें हमारे जीवनसाथियों और हमारी औलादों से आँखों की ठंडक अता फ़रमा, और हमें परहेज़गारों का इमाम बना।",
      gu: "હે અમારા રબ! અમને અમારા જીવનસાથીઓ અને સંતાનોમાંથી આંખોની ઠંડક આપ અને અમને પરહેઝગારોના આગેવાન બનાવ."
    },
    reference: 'The Holy Quran, Surah Al-Furqan (25:74)',
    repetitionCount: 1,
    isSunnahCount: true,
    benefits: 'Endearing Quranic prayer for marital peace, family piety and visionary spiritual leadership.'
  },

  // ---------------------------------------------------------------------------
  // 9. FASTING & RAMADAN
  // ---------------------------------------------------------------------------
  {
    id: 'fasting-iftar-dua',
    category: 'ramadan_fasting',
    title: {
      en: 'Supplication when Breaking the Fast (Iftar)',
      ar: 'دعاء الإفطار عند الصوم',
      hi: 'इफ़्तार के वक़्त (रोज़ा खोलते समय) की दुआ',
      gu: 'ઇફતાર વખતે (રોઝો ખોલતી વેળા)ની દુઆ'
    },
    arabic: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ.',
    transliteration: "Dhahabadh-dhama'u wabtallatil-'uruqu wa thabatal-ajru in sha' Allah.",
    translations: {
      en: "The thirst is gone, the veins are moistened, and the reward is confirmed, if Allah wills.",
      hi: "प्यास चली गई, नसें तर-ओ-ताज़ा हो गईं, और अगर अल्लाह ने चाहा तो सवाब साबित हो गया।",
      gu: "તરસ છીપાઈ ગઈ, નસો ભીની થઈ ગઈ, અને જો અલ્લાહ ઇચ્છશે તો અજર (બદલો) નિશ્ચિત થઈ ગયો."
    },
    reference: 'Sunan Abi Dawud 2357 (Hasan)',
    repetitionCount: 1,
    isSunnahCount: true,
    benefits: 'Recited upon taking the first sip of water or date when opening the fast at Maghrib.'
  },
  {
    id: 'laylat-al-qadr-dua',
    category: 'ramadan_fasting',
    title: {
      en: 'Supplication for Laylat al-Qadr (Night of Power)',
      ar: 'دعاء ليلة القدر',
      hi: 'शब-ए-क़द्र (लैलतुल क़द्र) की दुआ',
      gu: 'શબ-એ-કદર (લયલતુલ કદર)ની દુઆ'
    },
    arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي.',
    transliteration: "Allahumma innaka 'Afuwwun tuhibbul-'afwa fa'fu 'anni.",
    translations: {
      en: "O Allah, You are Pardoning and You love pardon, so pardon me.",
      hi: "ऐ अल्लाह! बेशक तू बहुत माफ़ करने वाला है, माफ़ करने को पसंद फ़रमाता है, पस मुझे माफ़ फ़रमा दे।",
      gu: "હે અલ્લાહ! ખરેખર તું અત્યંત ક્ષમા કરનાર છે, ક્ષમા કરવાનું પસંદ કરે છે, માટે મને ક્ષમા કર."
    },
    reference: 'Jami at-Tirmidhi 3513 (Sahih)',
    repetitionCount: 1,
    isSunnahCount: true,
    benefits: 'Taught directly by Prophet Muhammad (ﷺ) to Aisha (RA) when she asked what to pray on Laylat al-Qadr.'
  },

  // ---------------------------------------------------------------------------
  // 10. QURANIC RABBANA DUAS
  // ---------------------------------------------------------------------------
  {
    id: 'rabbana-dunya-akhirah',
    category: 'rabbana',
    title: {
      en: 'Supplication for Goodness in This World and the Hereafter',
      ar: 'دعاء ربنا آتنا في الدنيا حسنة',
      hi: 'दुनिया और आख़िरत की भलाई की दुआ',
      gu: 'દુનિયા અને આખિરતની ભલાઈની દુઆ'
    },
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ.',
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar.",
    translations: {
      en: "Our Lord! Grant us in this world that which is good and in the Hereafter that which is good, and protect us from the punishment of the Fire.",
      hi: "ऐ हमारे रब! हमें दुनिया में भी भलाई अता फ़रमा और आख़िरत में भी भलाई अता फ़रमा, और हमें दोज़ख़ के अज़ाब से बचा।",
      gu: "હે અમારા રબ! અમને આ દુનિયામાં પણ ભલાઈ આપ અને આખિરતમાં પણ ભલાઈ આપ, અને અમને નરકની યાતનાથી બચાવ."
    },
    reference: 'The Holy Quran, Surah Al-Baqarah (2:201) / Sahih al-Bukhari 6389',
    repetitionCount: 1,
    isSunnahCount: true,
    benefits: 'Anas (RA) reported that this was the most frequent supplication made by Prophet Muhammad (ﷺ).'
  }
];

/**
 * Returns the Daily Dua for today's date
 */
export function getDailyDua(): DuaItem {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const index = Math.abs(dayOfYear) % AUTHENTIC_DUAS.length;
  return AUTHENTIC_DUAS[index];
}

/**
 * Filter Duas by category, search keyword, and favorites
 */
export function filterDuas(
  categoryId: string = 'all',
  searchQuery: string = '',
  favoriteIds?: Set<string>
): DuaItem[] {
  let list = AUTHENTIC_DUAS;

  if (categoryId === 'favorites' && favoriteIds) {
    list = list.filter(d => favoriteIds.has(d.id));
  } else if (categoryId !== 'all') {
    list = list.filter(d => d.category === categoryId);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(d =>
      d.title.en.toLowerCase().includes(q) ||
      d.translations.en.toLowerCase().includes(q) ||
      d.transliteration.toLowerCase().includes(q) ||
      d.arabic.includes(q) ||
      d.reference.toLowerCase().includes(q)
    );
  }

  return list;
}
