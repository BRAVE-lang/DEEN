// ==============================================================================
// DEEN — Authentic Duas and Adhkar Service
// Sourced from Hisn al-Muslim (Fortress of the Muslim) & The Holy Quran
// ==============================================================================

import { DuaItem } from '@/types';

export const DUA_CATEGORIES = [
  { id: 'all', name: { en: 'All Duas', ar: 'جميع الأدعية', hi: 'सभी दुआएं', gu: 'બધી દુઆઓ' } },
  { id: 'morning_evening', name: { en: 'Morning & Evening', ar: 'أذكار الصباح والمساء', hi: 'सुबह और शाम', gu: 'સવાર અને સાંજ' } },
  { id: 'sleep', name: { en: 'Sleep & Waking', ar: 'النوم والاستيقاظ', hi: 'सोने और जागने', gu: 'ઊંઘવા અને જાગવા' } },
  { id: 'prayer', name: { en: 'Prayer & Adhan', ar: 'الصلاة والأذان', hi: 'नमाज़ और अज़ान', gu: 'નમાઝ અને અઝાન' } },
  { id: 'food_drink', name: { en: 'Food & Drink', ar: 'الطعام والشراب', hi: 'खाने और पीने', gu: 'ખાવા અને પીવા' } },
  { id: 'travel', name: { en: 'Travel & Journeys', ar: 'السفر', hi: 'सफ़र की दुआएं', gu: 'મુસાફરીની દુઆઓ' } },
  { id: 'forgiveness', name: { en: 'Forgiveness & Repentance', ar: 'الاستغفار والتوبة', hi: 'माफ़ी और तौबा', gu: 'માફી અને તૌબા' } },
  { id: 'protection', name: { en: 'Protection & Evil Eye', ar: 'الحفظ والتحصين', hi: 'हिफ़ाज़त और नज़र', gu: 'રક્ષણ અને નજર' } },
  { id: 'anxiety', name: { en: 'Anxiety & Distress', ar: 'الكرب والهم', hi: 'चिंता और परेशानी', gu: 'ચિંતા અને તકલીફ' } },
  { id: 'parents_family', name: { en: 'Parents & Children', ar: 'الوالدين والأهل', hi: 'माता-पिता और परिवार', gu: 'માતા-પિતા અને પરિવાર' } },
  { id: 'ramadan_fasting', name: { en: 'Fasting & Ramadan', ar: 'الصيام ورمضان', hi: 'रोज़ा और रमज़ान', gu: 'રોઝા અને રમઝાન' } },
  { id: 'rabbana', name: { en: 'Quranic Rabbana Duas', ar: 'أدعية ربنا القرآنية', hi: 'कुरानिक रब्बना दुआएं', gu: 'કુરાનિક રબ્બના દુઆઓ' } }
];

export const AUTHENTIC_DUAS: DuaItem[] = [
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
    benefits: 'The Prophet (ﷺ) said: "Whoever recites it during the day with firm faith and dies before evening will be from the people of Paradise; and whoever recites it at night with firm faith and dies before morning will be from the people of Paradise."'
  },
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
    reference: 'Sunan Abu Dawood 5088, Jami at-Tirmidhi 3388 (Graded Sahih)',
    repetitionCount: 3,
    isSunnahCount: true,
    benefits: 'Recited 3 times in the morning and 3 times in the evening. Nothing shall harm the reciter.'
  },
  {
    id: 'ayat-al-kursi',
    category: 'protection',
    title: {
      en: 'Ayat al-Kursi (The Verse of the Throne)',
      ar: 'آية الكرسي',
      hi: 'आयतल कुर्सी',
      gu: 'આયતુલ કુરસી'
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
    benefits: 'Recited after every obligatory prayer and before sleeping. Protects from shaytan until morning.'
  },
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
  },
  {
    id: 'dua-distress-anxiety',
    category: 'anxiety',
    title: {
      en: 'Supplication in Times of Anxiety and Depression',
      ar: 'دعاء الهم والحزن',
      hi: 'रंज, ग़म और क़र्ज़ से निजात की दुआ',
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
    benefits: 'The Prophet (ﷺ) frequently supplicated with these words for relief from mental burden and oppression.'
  },
  {
    id: 'parents-dua',
    category: 'parents_family',
    title: {
      en: 'Supplication for Parents',
      ar: 'دعاء للوالدين',
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
    benefits: 'Commanded in the Quran as an enduring prayer of gratitude and love for one’s mother and father.'
  },
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
    benefits: 'Recited when mounting any conveyance (car, plane, train, boat) before embarking on a journey.'
  },
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
    reference: 'Sunan Abu Dawood 2357 (Graded Hasan by Al-Albani)',
    repetitionCount: 1,
    isSunnahCount: true,
    benefits: 'Recited upon taking the first date or sip of water when opening the fast at Maghrib.'
  }
];

/**
 * Returns the Daily Dua for today's date
 */
export function getDailyDua(): DuaItem {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const index = dayOfYear % AUTHENTIC_DUAS.length;
  return AUTHENTIC_DUAS[index];
}

/**
 * Filter Duas by category and search keyword
 */
export function filterDuas(categoryId: string = 'all', searchQuery: string = ''): DuaItem[] {
  let list = AUTHENTIC_DUAS;
  if (categoryId !== 'all') {
    list = list.filter(d => d.category === categoryId);
  }
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
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
