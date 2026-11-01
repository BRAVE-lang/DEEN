// ==============================================================================
// DEEN — 99 Names of Allah (Asma ul-Husna) Complete Service
// Classical Scholarly Enumeration (Tirmidhi #3507, Bukhari #2736, Muslim #2677)
// Full 99 Names with Arabic, Transliteration, English, Hindi, Gujarati,
// Theological Explanations, Quranic References, and Pronunciation URLs.
// ==============================================================================

import { DivineName } from '@/types';

/**
 * Scholarly Documentation:
 * Abu Huraira reported: The Messenger of Allah, peace and blessings be upon him, said:
 * "Allah has ninety-nine names, one hundred less one. Whoever memorizes them will enter Paradise."
 * (Sahih al-Bukhari 2736, Sahih Muslim 2677)
 * The famous enumeration was preserved by Imam at-Tirmidhi (Jami' at-Tirmidhi #3507)
 * and analyzed by classical masters including Imam Al-Ghazali (Al-Maqsad Al-Asna).
 */
export const NAMES_OF_ALLAH: DivineName[] = [
  {
    number: 1,
    arabic: 'الرَّحْمَنُ',
    transliteration: 'Ar-Rahman',
    meaning: {
      en: "The Most Gracious / The Entirely Merciful",
      hi: "अत्यंत दयालु / बेहद मेहरबान",
      gu: "અત્યંત દયાળુ / પરમ કૃપાળુ"
    },
    explanation: {
      en: "The One whose boundless mercy encompasses all creation in this world, giving life, sustenance, and guidance to all creatures without exception.",
      hi: "वह जिसकी असीम दया दुनिया की हर मख़लूक़ को घेरे हुए है, जो बिना किसी भेदभाव के सबको रिज़्क़ और ज़िन्दगी देता है।",
      gu: "જેની અસીમ દયા આ દુનિયાની સમગ્ર રચનાને ઘેરી લે છે, જે કોઈ પણ ભેદભાવ વિના દરેક જીવને રોજી અને જીવન આપે છે."
    },
    quranReference: "Surah Al-Fatihah 1:1, Surah Ar-Rahman 55:1",
    audioUrl: 'https://cdn.islamic.network/names/audio/1.mp3'
  },
  {
    number: 2,
    arabic: 'الرَّحِيمُ',
    transliteration: 'Ar-Raheem',
    meaning: {
      en: "The Especially Merciful",
      hi: "निहायत रहम फ़रमाने वाला",
      gu: "ખાસ રહમત કરનાર"
    },
    explanation: {
      en: "The One who bestows continuous, specialized mercy upon the believers, guiding them in faith and rewarding them with eternal Paradise.",
      hi: "वह जो ईमान वालों पर अपनी ख़ास रहमत बरसाता है और आख़िरत में उन्हें जन्नत का अनन्त सवाब अता करेगा।",
      gu: "જે મોમિન (વિશ્વાસુઓ) પર વિશેષ રહમત વરસાવે છે અને આખિરતમાં તેઓને કાયમી જન્નતથી નવાજશે."
    },
    quranReference: "Surah Al-Fatihah 1:3, Surah Al-Baqarah 2:143",
    audioUrl: 'https://cdn.islamic.network/names/audio/2.mp3'
  },
  {
    number: 3,
    arabic: 'الْمَلِكُ',
    transliteration: 'Al-Malik',
    meaning: {
      en: "The Sovereign Lord / The Absolute King",
      hi: "हक़ीक़ी बादशाह / सारे जहान का मालिक",
      gu: "સાચો રાજા / સમગ્ર સૃષ્ટિનો માલિક"
    },
    explanation: {
      en: "The Absolute Ruler and Master of the universe, who needs nothing and without whom nothing can exist. All sovereignty belongs to Him alone.",
      hi: "सारे ब्रह्मांड का सच्चा और मुस्तक़िल बादशाह, जिसे किसी की ज़रूरत नहीं और जिसके बिना कोई वजूद में नहीं रह सकता।",
      gu: "સમગ્ર બ્રહ્માંડનો સર્વોચ્ચ શાસક અને સાચો માલિક, જેને કોઈની જરૂર નથી અને જેના વિના કોઈ અસ્તિત્વમાં રહી શકતું નથી."
    },
    quranReference: "Surah Al-Hashr 59:23, Surah Al-Mu’minun 23:116",
    audioUrl: 'https://cdn.islamic.network/names/audio/3.mp3'
  },
  {
    number: 4,
    arabic: 'الْقُدُّوسُ',
    transliteration: 'Al-Quddus',
    meaning: {
      en: "The Pure One / The Holy",
      hi: "निहायत पाक / हर ऐब से मुबर्रा",
      gu: "અતિ પવિત્ર / તમામ ખામીઓથી મુક્ત"
    },
    explanation: {
      en: "The Absolutely Pure, completely free from any imperfection, error, deficiency, or partner.",
      hi: "वह जो हर क़िस्म की कमी, नुक़्स और कमज़ोरी से बिल्कुल पाक और साफ़ है।",
      gu: "જે તમામ પ્રકારની ખામી, નબળાઈ કે અપૂર્ણતાથી સંપૂર્ણપણે પવિત્ર અને મુક્ત છે."
    },
    quranReference: "Surah Al-Jumu’ah 62:1, Surah Al-Hashr 59:23",
    audioUrl: 'https://cdn.islamic.network/names/audio/4.mp3'
  },
  {
    number: 5,
    arabic: 'السَّلاَمُ',
    transliteration: 'As-Salam',
    meaning: {
      en: "The Source of Peace and Perfection",
      hi: "सलामती देने वाला / अमन का स्रोत",
      gu: "શાંતિનો સ્ત્રોત / સલામતી આપનાર"
    },
    explanation: {
      en: "The Source of all peace and safety, free from any harm or defect, who grants serenity and ultimate peace to His servants in this world and the Hereafter.",
      hi: "वह जो तमाम नुक़सानों और ऐबों से सलामत है और अपने बन्दों को दुनिया और आख़िरत में अमन और सलामती बख़्शता है।",
      gu: "જે તમામ નુકસાન અને ખામીઓથી મુક્ત છે અને પોતાના બંદાઓને આ લોક અને પરલોકમાં શાંતિ અને સલામતી અર્પે છે."
    },
    quranReference: "Surah Al-Hashr 59:23",
    audioUrl: 'https://cdn.islamic.network/names/audio/5.mp3'
  },
  {
    number: 6,
    arabic: 'الْمُؤْمِنُ',
    transliteration: 'Al-Mu’min',
    meaning: {
      en: "The Guardian of Faith / The Giver of Security",
      hi: "अमन व अमान देने वाला / यक़ीन बख़्शने वाला",
      gu: "સુરક્ષા આપનાર / વિશ્વાસ બક્ષનાર"
    },
    explanation: {
      en: "The One who grants security and tranquility to His creation, who keeps His promises to His servants and protects them from injustice.",
      hi: "वह जो अपने बन्दों को खौफ़ से अमन देता है, अपने वादों को सच्चा साबित करता है और किसी पर ज़ुल्म नहीं करता।",
      gu: "જે પોતાના બંદાઓને ભયથી મુક્તિ અને શાંતિ આપે છે, વચનો પૂર્ણ કરે છે અને કદી અન્યાય કરતો નથી."
    },
    quranReference: "Surah Al-Hashr 59:23",
    audioUrl: 'https://cdn.islamic.network/names/audio/6.mp3'
  },
  {
    number: 7,
    arabic: 'الْمُهَيْمِنُ',
    transliteration: 'Al-Muhaymin',
    meaning: {
      en: "The Sustaining Protector / The Preserver of Safety",
      hi: "निगहबान / पूरी तरह हिफ़ाज़त करने वाला",
      gu: "રક્ષક / સદાય દેખરેખ રાખનાર"
    },
    explanation: {
      en: "The Supreme Overseer who witnesses all actions, preserves all deeds, and guards all creation with unfailing vigilance.",
      hi: "वह जो हर चीज़ की निगरानी करता है, सब कामों का गवाह है और अपनी मख़लूक़ की मुकम्मल हिफ़ाज़त फ़रमाता है।",
      gu: "જે સર્વ કાર્યોનો સાક્ષી છે અને સમગ્ર સૃષ્ટિની પરિપૂર્ણ સંભાળ અને રક્ષણ રાખે છે."
    },
    quranReference: "Surah Al-Hashr 59:23",
    audioUrl: 'https://cdn.islamic.network/names/audio/7.mp3'
  },
  {
    number: 8,
    arabic: 'الْعَزِيزُ',
    transliteration: 'Al-Aziz',
    meaning: {
      en: "The All-Mighty / The Invulnerable",
      hi: "ग़ालिब व ज़बरदस्त / सब पर हावी",
      gu: "સર્વશક્તિમાન / અજેય સત્તાધીશ"
    },
    explanation: {
      en: "The Mighty One whom none can overcome, whose strength is invincible and whose honor is inviolable.",
      hi: "वह ज़बरदस्त ताक़तवर जिसकी बराबरी कोई नहीं कर सकता और जिस पर कोई ग़ालिब नहीं आ सकता।",
      gu: "તે મહાન શક્તિશાળી જેની બરાબરી કોઈ કરી શકતું નથી અને જેને કોઈ હરાવી શકતું નથી."
    },
    quranReference: "Surah Al-Hashr 59:23, Surah Al-Imran 3:6",
    audioUrl: 'https://cdn.islamic.network/names/audio/8.mp3'
  },
  {
    number: 9,
    arabic: 'الْجَبَّارُ',
    transliteration: 'Al-Jabbar',
    meaning: {
      en: "The Compeller / The Restorer of Broken Hearts",
      hi: "ज़बरदस्त / टूटे दिलों को जोड़ने वाला",
      gu: "સર્વોપરી / તૂટેલા હૃદયોને સાંત્વના આપનાર"
    },
    explanation: {
      en: "The Omnipotent who restores the weak, mends the broken, and accomplishes His divine will over all without resistance.",
      hi: "वह जो टूटे हुए दिलों और कमज़ोरों की हालत सुधारता है और जिसकी मर्ज़ी के आगे सब बेबस हैं।",
      gu: "જે ભાંગેલા હૃદયોને સાજા કરે છે, દુર્બળોને બળ આપે છે અને જેની ઈચ્છા સર્વોપરી છે."
    },
    quranReference: "Surah Al-Hashr 59:23",
    audioUrl: 'https://cdn.islamic.network/names/audio/9.mp3'
  },
  {
    number: 10,
    arabic: 'الْمُتَكَبِّرُ',
    transliteration: 'Al-Mutakabbir',
    meaning: {
      en: "The Supremely Great / The Majestic",
      hi: "बड़ाई और बुज़ुर्गी वाला",
      gu: "મહાનતા અને ગૌરવના સ્વામી"
    },
    explanation: {
      en: "The One who is truly great, above every imperfection; true majesty belongs exclusively to Him alone.",
      hi: "वह जो हर बड़ाई और बुज़ुर्गी का हक़ीक़ी मालिक है और तकब्बुर सिर्फ़ उसी की ज़ात को ज़ेब देता है।",
      gu: "જે સર્વોચ્ચ ગૌરવનો સાચો માલિક છે અને તમામ પ્રકારની અપૂર્ણતાથી પર છે."
    },
    quranReference: "Surah Al-Hashr 59:23",
    audioUrl: 'https://cdn.islamic.network/names/audio/10.mp3'
  },
  {
    number: 11,
    arabic: 'الْخَالِقُ',
    transliteration: 'Al-Khaliq',
    meaning: {
      en: "The Creator / The Maker",
      hi: "पैदा करने वाला / रचयिता",
      gu: "સર્જનહાર / ઉત્પન્ન કરનાર"
    },
    explanation: {
      en: "The Creator who brings everything into existence from absolute nothingness, designing it according to His divine measure.",
      hi: "वह जिसने हर चीज़ को अदम (शून्यता) से वजूद बख़्शा और उसे एक ख़ास अंदाज़े पर बनाया।",
      gu: "જેણે શૂન્યમાંથી સમગ્ર બ્રહ્માંડનું સર્જન કર્યું અને દરેક વસ્તુને ચોક્કસ માપથી ઘડી."
    },
    quranReference: "Surah Al-Hashr 59:24, Surah Ar-Ra’d 13:16",
    audioUrl: 'https://cdn.islamic.network/names/audio/11.mp3'
  },
  {
    number: 12,
    arabic: 'الْبَارِئُ',
    transliteration: 'Al-Bari’',
    meaning: {
      en: "The Maker of Order / The Evolver",
      hi: "ठीक-ठीक बनाने वाला / तख़लीक़कार",
      gu: "સંપૂર્ણ આકાર આપનાર સર્જક"
    },
    explanation: {
      en: "The Originator who fashions and evolves creation with distinct forms, harmonious proportions, and flawless functionality.",
      hi: "वह जो अपनी मख़लूक़ को बेजोड़ हुस्न और तनासुब (समानुपात) के साथ बिना किसी कमी के बनाता है।",
      gu: "જે દરેક રચનાને સુસંગતતા, સુંદરતા અને સંપૂર્ણતા સાથે અસ્તિત્વ આપે છે."
    },
    quranReference: "Surah Al-Hashr 59:24",
    audioUrl: 'https://cdn.islamic.network/names/audio/12.mp3'
  },
  {
    number: 13,
    arabic: 'الْمُصَوِّرُ',
    transliteration: 'Al-Musawwir',
    meaning: {
      en: "The Fashioner of Forms",
      hi: "सूरत और शक्ल देने वाला",
      gu: "રૂપ અને આકાર આપનાર"
    },
    explanation: {
      en: "The Supreme Artist who bestows unique shapes, features, colors, and physical attributes to every single creature.",
      hi: "वह जिसने हर मख़लूक़ को एक मुनफ़रिद (अनोखी) सूरत, रंग और बनावट अता की।",
      gu: "જેણે દરેક જીવને અનન્ય રૂપ, રંગ અને વિશિષ્ટ આકાર પ્રદાન કર્યા."
    },
    quranReference: "Surah Al-Hashr 59:24",
    audioUrl: 'https://cdn.islamic.network/names/audio/13.mp3'
  },
  {
    number: 14,
    arabic: 'الْغَفَّارُ',
    transliteration: 'Al-Ghaffar',
    meaning: {
      en: "The Perpetual Forgiver",
      hi: "बार-बार बख़्शने वाला / क्षमाशील",
      gu: "વારંવાર માફી આપનાર / અત્યંત ક્ષમાવાન"
    },
    explanation: {
      en: "The One who repeatedly and abundantly forgives the sins of His servants, concealing their faults and sparing them from punishment.",
      hi: "वह जो अपने बन्दों के गुनाहों को बार-बार माफ़ करता है, उनके ऐबों पर पर्दा डालता है।",
      gu: "જે ભક્તોના ગુનાહોને વારંવાર માફ કરે છે અને તેમની ભૂલો પર પડદો નાખે છે."
    },
    quranReference: "Surah Nuh 71:10, Surah Taha 20:82",
    audioUrl: 'https://cdn.islamic.network/names/audio/14.mp3'
  },
  {
    number: 15,
    arabic: 'الْقَهَّارُ',
    transliteration: 'Al-Qahhar',
    meaning: {
      en: "The Subduer / The All-Dominant",
      hi: "सब पर ग़ालिब / पूरी तरह क़ाबू रखने वाला",
      gu: "સર્વ પર પ્રભુત્વ ધરાવનાર"
    },
    explanation: {
      en: "The All-Dominant before whose divine majesty and power everything in the heavens and earth yields and surrenders.",
      hi: "वह जिसका हर चीज़ पर मुकम्मल क़ाबू है और जिसके जलाल के आगे सारी कायनात झुकी हुई है।",
      gu: "જેના પ્રતાપ અને શક્તિ સામે આકાશ અને પૃથ્વીની દરેક વસ્તુ નમન કરે છે."
    },
    quranReference: "Surah Ar-Ra’d 13:16, Surah Az-Zumar 39:4",
    audioUrl: 'https://cdn.islamic.network/names/audio/15.mp3'
  },
  {
    number: 16,
    arabic: 'الْوَهَّابُ',
    transliteration: 'Al-Wahhab',
    meaning: {
      en: "The Supreme Bestower",
      hi: "मुफ़्त अता करने वाला / परम दाता",
      gu: "અખૂટ દાન આપનાર / પરમ દાતા"
    },
    explanation: {
      en: "The Generous Giver who bestows gifts, mercy, and blessings freely and unconditionally without expecting any return.",
      hi: "वह जो बिना किसी बदले या स्वार्थ के अपनी नेमतें और रहमतें बन्दों पर लुटाता है।",
      gu: "જે કોઈ પણ બદલાની અપેક્ષા રાખ્યા વિના પોતાના આશીર્વાદ અને કૃપા નિઃશુલ્ક આપે છે."
    },
    quranReference: "Surah Al-Imran 3:8, Surah Sad 38:9",
    audioUrl: 'https://cdn.islamic.network/names/audio/16.mp3'
  },
  {
    number: 17,
    arabic: 'الرَّزَّاقُ',
    transliteration: 'Ar-Razzaq',
    meaning: {
      en: "The Total Provider",
      hi: "रिज़्क़ (आजीविका) देने वाला / अन्नदाता",
      gu: "રોજી અને આજીવિકા આપનાર"
    },
    explanation: {
      en: "The Provider who creates and guarantees sustenance for every living soul—both physical nourishment and spiritual illumination.",
      hi: "वह जो तमाम मख़लूक़ात को जिस्मानी और रूहानी दोनों क़िस्म का रिज़्क़ अता करता है।",
      gu: "જે તમામ જીવોને શારીરિક પોષણ અને આત્મિક આહાર સતત પૂરો પાડે છે."
    },
    quranReference: "Surah Adh-Dhariyat 51:58",
    audioUrl: 'https://cdn.islamic.network/names/audio/17.mp3'
  },
  {
    number: 18,
    arabic: 'الْفَتَّاحُ',
    transliteration: 'Al-Fattah',
    meaning: {
      en: "The Opener / The Supreme Judge",
      hi: "मुश्किलें खोलने वाला / हक़ का फ़ैसला करने वाला",
      gu: "માર્ગો ખોલનાર / સાચો ન્યાયાધીશ"
    },
    explanation: {
      en: "The Opener who unlocks locked doors of mercy, guidance, knowledge, and victory, and judges truthfully between His creation.",
      hi: "वह जो बन्द दरवाज़ों को खोलता है, दिलों में हिदायत का रास्ता बनाता है और इंसाफ़ से फ़ैसला फ़रमाता है।",
      gu: "જે મુશ્કેલીઓના બંધ દ્વાર ખોલે છે, જ્ઞાન અને રહમતના દરવાજા ઉઘાડે છે."
    },
    quranReference: "Surah Saba 34:26",
    audioUrl: 'https://cdn.islamic.network/names/audio/18.mp3'
  },
  {
    number: 19,
    arabic: 'الْعَلِيمُ',
    transliteration: 'Al-Aleem',
    meaning: {
      en: "The All-Knowing / Omniscient",
      hi: "सब कुछ जानने वाला / सर्वज्ञ",
      gu: "સર્વજ્ઞ / બધું જ જાણનાર"
    },
    explanation: {
      en: "The Omniscient whose comprehensive knowledge encompasses every atom, thought, past, present, future, and the unseen.",
      hi: "वह जिसका इल्म हर चीज़ को घेरे हुए है; दिलों के राज़, गुज़रे हुए ज़माने और भविष्य की हर बात जानता है।",
      gu: "જેનું જ્ઞાન સમગ્ર બ્રહ્માંડ, છૂપા વિચારો, ભૂતકાળ અને ભવિષ્યને સંપૂર્ણપણે સમાવી લે છે."
    },
    quranReference: "Surah Al-Baqarah 2:115, Surah Al-An’am 6:59",
    audioUrl: 'https://cdn.islamic.network/names/audio/19.mp3'
  },
  {
    number: 20,
    arabic: 'الْقَابِضُ',
    transliteration: 'Al-Qabid',
    meaning: {
      en: "The Constrictor / The Withholder",
      hi: "तंग करने वाला / क़ब्ज़े में लेने वाला",
      gu: "સંકોચનાર / સીમિત કરનાર"
    },
    explanation: {
      en: "The One who withholds or restricts sustenance, souls, or ease according to divine wisdom and justice to test His creation.",
      hi: "वह जो अपनी हिकमत से रिज़्क़ या खुशियों को तंग करता है ताकि बन्दों की आज़माइश करे।",
      gu: "જે પોતાની દૈવી બુદ્ધિથી કસોટી માટે રોજી કે સુવિધાઓ સીમિત કરે છે."
    },
    quranReference: "Surah Al-Baqarah 2:245",
    audioUrl: 'https://cdn.islamic.network/names/audio/20.mp3'
  },
  {
    number: 21,
    arabic: 'الْبَاسِطُ',
    transliteration: 'Al-Basit',
    meaning: {
      en: "The Expander / The Reliever",
      hi: "कुशादगी देने वाला / फ़ैलाने वाला",
      gu: "વિસ્તારનાર / પ્રફુલ્લિત કરનાર"
    },
    explanation: {
      en: "The One who expands sustenance, generous provisions, and spiritual joy in the hearts of His servants.",
      hi: "वह जो दिलों को खोलता है और अपनी रहमत व रिज़्क़ में बेहिसाब वुसअत (फैलाव) अता करता है।",
      gu: "જે રોજી, ખુશીઓ અને દિલની શાંતિમાં વિપુલતા અને વિસ્તાર બક્ષે છે."
    },
    quranReference: "Surah Al-Baqarah 2:245, Surah Ash-Shura 42:27",
    audioUrl: 'https://cdn.islamic.network/names/audio/21.mp3'
  },
  {
    number: 22,
    arabic: 'الْخَافِضُ',
    transliteration: 'Al-Khafid',
    meaning: {
      en: "The Abaser / The Humbler",
      hi: "पस्त करने वाला / गिराने वाला",
      gu: "અહંકારીઓને નીચા પાડનાર"
    },
    explanation: {
      en: "The One who lowers the arrogant, the tyrants, and the rejectors of truth, diminishing their earthly power and status.",
      hi: "वह जो ज़ालिमों, सरकशों और मगरूरों को ज़लील व रुसवा करके गिरा देता है।",
      gu: "જે ઘમંડીઓ, અત્યાચારીઓ અને અસત્યના માર્ગે ચાલનારાઓને નીચા પાડે છે."
    },
    quranReference: "Surah Al-Waqi’ah 56:3",
    audioUrl: 'https://cdn.islamic.network/names/audio/22.mp3'
  },
  {
    number: 23,
    arabic: 'الرَّافِعُ',
    transliteration: 'Ar-Rafi’',
    meaning: {
      en: "The Exalter / The Elevator",
      hi: "बुलन्द करने वाला / रुतबा बढ़ाने वाला",
      gu: "સન્માન અને દરજ્જો વધારનાર"
    },
    explanation: {
      en: "The One who raises the ranks of the believers, the righteous, and the humble in both this world and the eternal Hereafter.",
      hi: "वह जो नेक बन्दों और आजिज़ी करने वालों के दरजात दुनिया और आख़िरत में बुलन्द करता है।",
      gu: "જે નમ્ર અને સદાચારી ભક્તોના દરજ્જા આ દુનિયા અને પરલોકમાં ઊંચા કરે છે."
    },
    quranReference: "Surah Al-An’am 6:165, Surah Al-Mujadila 58:11",
    audioUrl: 'https://cdn.islamic.network/names/audio/23.mp3'
  },
  {
    number: 24,
    arabic: 'الْمُعِزُّ',
    transliteration: 'Al-Mu’izz',
    meaning: {
      en: "The Bestower of Honour",
      hi: "इज़्ज़त देने वाला / मान-सम्मान दाता",
      gu: "માન-સન્માન અને પ્રતિષ્ઠા આપનાર"
    },
    explanation: {
      en: "The Giver of true honor and dignity, strengthening those who obey Him with spiritual majesty and righteousness.",
      hi: "वह जो जिसे चाहे अपनी इताअत की तौफ़ीक़ देकर इज़्ज़त और शराफ़त अता फ़रमाता है।",
      gu: "જે જેને ઇચ્છે તેને સાચું સન્માન, પ્રતિષ્ઠા અને આદર બક્ષે છે."
    },
    quranReference: "Surah Al-Imran 3:26",
    audioUrl: 'https://cdn.islamic.network/names/audio/24.mp3'
  },
  {
    number: 25,
    arabic: 'الْمُذِلُّ',
    transliteration: 'Al-Mudhill',
    meaning: {
      en: "The Giver of Dishonour",
      hi: "ज़िल्लत देने वाला / अपमानित करने वाला",
      gu: "અન્યાયીઓને અપમાનિત કરનાર"
    },
    explanation: {
      en: "The One who humiliates the rebellious and proud by exposing their falsehood and stripping them of dignity.",
      hi: "वह जो नाफ़रमानों और तकब्बुर करने वालों को उनके बुरे आमाल के सबब ज़लील करता है।",
      gu: "જે અહંકારીઓ અને પાપીઓને તેમના કર્મોને લીધે અપમાનિત કરે છે."
    },
    quranReference: "Surah Al-Imran 3:26",
    audioUrl: 'https://cdn.islamic.network/names/audio/25.mp3'
  },
  {
    number: 26,
    arabic: 'السَّمِيعُ',
    transliteration: 'As-Sami’',
    meaning: {
      en: "The All-Hearing",
      hi: "सब कुछ सुनने वाला / सर्वश्रोता",
      gu: "સર્વ સાંભળનાર / અંતરનો નાદ સુણનાર"
    },
    explanation: {
      en: "The One who hears every sound, whisper, silent prayer, and heartbeat across the universe without impediment.",
      hi: "वह जो हर आवाज़, हर कानाफूसी और दिलों की ख़ामोश पुकार को साफ़ सुनता है।",
      gu: "જે દરેક અવાજ, ધીમો ગણગણાટ અને હૃદયની મૌન પ્રાર્થના સંપૂર્ણપણે સાંભળે છે."
    },
    quranReference: "Surah Al-Baqarah 2:127, Surah Ash-Shura 42:11",
    audioUrl: 'https://cdn.islamic.network/names/audio/26.mp3'
  },
  {
    number: 27,
    arabic: 'الْبَصِيرُ',
    transliteration: 'Al-Baseer',
    meaning: {
      en: "The All-Seeing",
      hi: "सब कुछ देखने वाला / सर्वदृष्टा",
      gu: "સર્વ નિહાળનાર / સર્વદ્રષ્ટા"
    },
    explanation: {
      en: "The One who observes everything in creation—seen and unseen, in the deepest oceans and darkest nights.",
      hi: "वह जो हर बारीक से बारीक चीज़ और अंधेरी रात में काले पत्थर पर चलने वाली चींटी को भी देखता है।",
      gu: "જે પ્રત્યક્ષ અને અપ્રત્યક્ષ સર્વ વસ્તુઓને પૂર્ણ સ્પષ્ટતા સાથે નિહાળે છે."
    },
    quranReference: "Surah Al-Hujurat 49:18, Surah Al-Mulk 67:19",
    audioUrl: 'https://cdn.islamic.network/names/audio/27.mp3'
  },
  {
    number: 28,
    arabic: 'الْحَكَمُ',
    transliteration: 'Al-Hakam',
    meaning: {
      en: "The Supreme Arbiter / The Judge",
      hi: "हक़ीक़ी मुंसिफ़ / सबसे बड़ा फ़ैसलाकुन",
      gu: "સર્વોચ્ચ ન્યાયાધીશ / પંચ"
    },
    explanation: {
      en: "The Ultimate Judge whose decree cannot be overturned, whose justice is absolute and devoid of any bias.",
      hi: "सच्चा इंसाफ़ करने वाला हाकिम, जिसके फ़ैसले को कोई रद्द नहीं कर सकता।",
      gu: "જેના ન્યાયિક ચુકાદાને કોઈ ઉલટાવી શકતું નથી, જેનો ન્યાય પરિપૂર્ણ છે."
    },
    quranReference: "Surah Al-An’am 6:114",
    audioUrl: 'https://cdn.islamic.network/names/audio/28.mp3'
  },
  {
    number: 29,
    arabic: 'الْعَدْلُ',
    transliteration: 'Al-Adl',
    meaning: {
      en: "The Utterly Just",
      hi: "सच्चा इंसाफ़ करने वाला / न्यायप्रिय",
      gu: "સંપૂર્ણ ન્યાયી / પરમ ન્યાયવાન"
    },
    explanation: {
      en: "The Embodiment of perfect justice and equity, who wrongs no one by even the weight of a mustard seed.",
      hi: "इंसाफ़ की मूरत जो कभी किसी पर ज़र्रा बराबर भी ज़ुल्म नहीं करता।",
      gu: "ન્યાયનું મૂર્તિમંત સ્વરૂપ, જે રજકણ જેટલો પણ કોઈ પર અન્યાય કરતો નથી."
    },
    quranReference: "Surah Al-An’am 6:115",
    audioUrl: 'https://cdn.islamic.network/names/audio/29.mp3'
  },
  {
    number: 30,
    arabic: 'اللَّطِيفُ',
    transliteration: 'Al-Lateef',
    meaning: {
      en: "The Subtly Kind / The Most Delicate",
      hi: "निहायत बारीकबीन और मेहरबान",
      gu: "અતિ સૂક્ષ્મદ્રષ્ટા અને સ્નેહાળ"
    },
    explanation: {
      en: "The One who knows the finest subtleties of all things and treats His servants with delicate, hidden kindness.",
      hi: "वह जो हर बारीक राज़ को जानता है और अपने बन्दों पर ऐसे गुप्त तरीक़ों से रहम फ़रमाता है जिसका वे गुमान भी नहीं कर सकते।",
      gu: "જે સર્વ સૂક્ષ્મ રહસ્યોથી માહિતગાર છે અને પોતાના ભક્તો પર અગમ્ય રીતે કૃપા વરસાવે છે."
    },
    quranReference: "Surah Al-Mulk 67:14, Surah Al-An’am 6:103",
    audioUrl: 'https://cdn.islamic.network/names/audio/30.mp3'
  },
  {
    number: 31,
    arabic: 'الْخَبِيرُ',
    transliteration: 'Al-Khabeer',
    meaning: {
      en: "The All-Aware",
      hi: "हर बात की ख़बर रखने वाला / सर्व-જ્ઞાતા",
      gu: "સર્વથી માહિતગાર / ખબરદાર"
    },
    explanation: {
      en: "The One from whose knowledge nothing is concealed, knowing the inner realities and consequences of all affairs.",
      hi: "वह जिससे कोई भेद छिपा नहीं, जो हर बात की अंदरूनी हक़ीक़त से पूरी तरह बाख़बर है।",
      gu: "જેનાથી કોઈ રહસ્ય છૂપું નથી, જે દરેક કાર્યની આંતરિક વાસ્તવિકતા જાણે છે."
    },
    quranReference: "Surah Al-An’am 6:18, Surah Luqman 31:34",
    audioUrl: 'https://cdn.islamic.network/names/audio/31.mp3'
  },
  {
    number: 32,
    arabic: 'الْحَلِيمُ',
    transliteration: 'Al-Haleem',
    meaning: {
      en: "The Most Forbearing",
      hi: "बुर्दबार / सहनशील और सब्र करने वाला",
      gu: "અત્યંત સહનશીલ / ધૈર્યવાન"
    },
    explanation: {
      en: "The One who does not rush to punish His servants for their transgressions, giving them opportunity to repent.",
      hi: "वह जो बन्दों की ग़लतियों पर फ़ौरन पकड़ नहीं फ़रमाता बल्कि उन्हें तौबा का मौक़ा देता है।",
      gu: "જે ગુનાહો છતાં તરત જ સજા આપતો નથી પરંતુ ક્ષમા અને સુધરવાની તક આપે છે."
    },
    quranReference: "Surah Al-Baqarah 2:225, Surah Al-Isra 17:44",
    audioUrl: 'https://cdn.islamic.network/names/audio/32.mp3'
  },
  {
    number: 33,
    arabic: 'الْعَظِيمُ',
    transliteration: 'Al-Azeem',
    meaning: {
      en: "The Magnificent / The Supreme",
      hi: "बड़ी अज़मत वाला / महान और भव्य",
      gu: "મહાન ગૌરવશાળી / સર્વોચ્ચ ભવ્ય"
    },
    explanation: {
      en: "The One of absolute greatness, majesty, and glory, whose magnificent essence transcends all imagination.",
      hi: "वह जिसकी बुज़ुर्गी और अज़मत की कोई हद नहीं, जिसकी शान इंसानी समझ से बहुत ऊंची है।",
      gu: "જેની ભવ્યતા અને ગૌરવ અસીમ છે, જેની મહાનતા માનવીય કલ્પનાથી પર છે."
    },
    quranReference: "Surah Al-Baqarah 2:255 (Ayat al-Kursi), Surah Ash-Shura 42:4",
    audioUrl: 'https://cdn.islamic.network/names/audio/33.mp3'
  },
  {
    number: 34,
    arabic: 'الْغَفُورُ',
    transliteration: 'Al-Ghafoor',
    meaning: {
      en: "The Great Forgiver",
      hi: "बड़ा बख़्शने वाला / क्षमादाता",
      gu: "વિશાળ ક્ષમા આપનાર"
    },
    explanation: {
      en: "The One who forgives extensively, enveloping sins in His vast veil of pardon and cleansing the penitent.",
      hi: "वह जिसकी मग़फ़िरत (माफ़ी) बहुत विशाल है, जो सच्चे दिल से तौबा करने वाले के बड़े-बड़े गुनाह माफ़ कर देता है।",
      gu: "જેની ક્ષમા અપાર છે, જે પસ્તાવો કરનાર ભક્તોના તમામ પાપો ભૂંસી નાખે છે."
    },
    quranReference: "Surah Az-Zumar 39:53, Surah Al-Baqarah 2:218",
    audioUrl: 'https://cdn.islamic.network/names/audio/34.mp3'
  },
  {
    number: 35,
    arabic: 'الشَّكُورُ',
    transliteration: 'Ash-Shakoor',
    meaning: {
      en: "The Most Appreciative / The Rewarding",
      hi: "क़द्रदान / थोड़ी नेकी पर बड़ा सवाब देने वाला",
      gu: "સતકર્મોની કદર કરનાર / પુષ્કળ ફળ આપનાર"
    },
    explanation: {
      en: "The One who appreciates and generously multiplies the rewards for even the smallest good deeds done for His sake.",
      hi: "वह जो बन्दे के छोटे से अच्छे अमल की भी पूरी क़द्र फ़रमाता है और कई गुना बदला देता है।",
      gu: "જે ભક્તના નાનામાં નાના સત્કાર્યની પણ કદર કરે છે અને તેનો અગણિત બદલો આપે છે."
    },
    quranReference: "Surah Fatir 35:30, Surah At-Taghabun 64:17",
    audioUrl: 'https://cdn.islamic.network/names/audio/35.mp3'
  },
  {
    number: 36,
    arabic: 'الْعَلِيُّ',
    transliteration: 'Al-Aliyy',
    meaning: {
      en: "The Most High / The Exalted",
      hi: "सबसे आला व बुलन्द / सर्वोच्च",
      gu: "સર્વોચ્ચ / પરાત્પર"
    },
    explanation: {
      en: "The Exalted One whose status, power, and essence are elevated above all creation in rank and perfection.",
      hi: "वह जो अपनी ज़ात, सिफ़ात और मक़ाम में तमाम कायनात से बुलन्द व बाला है।",
      gu: "જે પોતાના સ્થાન, શક્તિ અને અસ્તિત્વમાં સમગ્ર સૃષ્ટિ કરતાં સર્વોચ્ચ છે."
    },
    quranReference: "Surah Al-Baqarah 2:255, Surah Al-A’la 87:1",
    audioUrl: 'https://cdn.islamic.network/names/audio/36.mp3'
  },
  {
    number: 37,
    arabic: 'الْكَبِيرُ',
    transliteration: 'Al-Kabeer',
    meaning: {
      en: "The Most Great",
      hi: "बड़ी शान वाला / सबसे बड़ा",
      gu: "અતિ મહાન / સર્વોત્કૃષ્ટ"
    },
    explanation: {
      en: "The Immeasurably Great One, whose grandeur is vast beyond conception and to whom all pride submits.",
      hi: "वह जिसकी बड़ाई की कोई थाह नहीं, जिसके जलाल के सामने दुनिया की हर चीज़ तुच्छ है।",
      gu: "જે અનહદ મહાન છે, જેના પ્રતાપ આગળ તમામ અહંકાર ઓગળી જાય છે."
    },
    quranReference: "Surah Ar-Ra’d 13:9, Surah Al-Hajj 22:62",
    audioUrl: 'https://cdn.islamic.network/names/audio/37.mp3'
  },
  {
    number: 38,
    arabic: 'الْحَفِيظُ',
    transliteration: 'Al-Hafeez',
    meaning: {
      en: "The Preserver / The Guardian",
      hi: "निगहबान व मुहाफ़िज़ / रक्षक",
      gu: "સર્વરક્ષક / રક્ષણ કરનાર"
    },
    explanation: {
      en: "The Vigilant Protector who preserves the universe from chaos, protects His servants, and records all their deeds.",
      hi: "वह जो ज़मीन व आसमान की हर चीज़ की हिफ़ाज़त करता है और बन्दों के आमाल महफ़ूज़ रखता है।",
      gu: "જે સમગ્ર બ્રહ્માંડનું સંતુલન જાળવે છે અને દરેક જીવનું રક્ષણ કરે છે."
    },
    quranReference: "Surah Hud 11:57, Surah Saba 34:21",
    audioUrl: 'https://cdn.islamic.network/names/audio/38.mp3'
  },
  {
    number: 39,
    arabic: 'الْمُقِيتُ',
    transliteration: 'Al-Muqeet',
    meaning: {
      en: "The Sustainer / The Maintainer",
      hi: "क़ूवत व ग़िज़ा देने वाला / पालनहार",
      gu: "શક્તિ અને આહાર પ્રદાતા / પોષક"
    },
    explanation: {
      en: "The Giver of essential nourishment, physical strength, and sustenance that keeps all living entities alive.",
      hi: "वह जो हर जानदार को जीने के लिए ज़रूरी ताक़त और ग़िज़ा मुहैया करता है।",
      gu: "જે દરેક જીવને ટકી રહેવા માટે જરૂરી પોષણ અને જીવનશક્તિ અર્પે છે."
    },
    quranReference: "Surah An-Nisa 4:85",
    audioUrl: 'https://cdn.islamic.network/names/audio/39.mp3'
  },
  {
    number: 40,
    arabic: 'الْحَسِيبُ',
    transliteration: 'Al-Haseeb',
    meaning: {
      en: "The Reckoner / The Sufficient",
      hi: "हिसाब लेने वाला / काफ़ी होने वाला",
      gu: "હિસાબ લેનાર / પૂરતો આધાર"
    },
    explanation: {
      en: "The One who is completely sufficient for those who rely upon Him, and who accounts for all deeds with exactness.",
      hi: "वह जो अपने भरोसेमंद बन्दों के लिए काफ़ी है और क़ियामत के दिन हर आमाल का बारीक हिसाब लेगा।",
      gu: "જે પોતાના પર ભરોસો રાખનારાઓ માટે પૂરતો છે અને ન્યાયના દિવસે સચોટ હિસાબ લેશે."
    },
    quranReference: "Surah An-Nisa 4:6, Surah Al-Ahzab 33:39",
    audioUrl: 'https://cdn.islamic.network/names/audio/40.mp3'
  },
  {
    number: 41,
    arabic: 'الْجَلِيلُ',
    transliteration: 'Al-Jaleel',
    meaning: {
      en: "The Sublime / The Majestic",
      hi: "बुज़ुर्गी और जलाल वाला",
      gu: "અતિ તેજસ્વી અને પ્રતાપી"
    },
    explanation: {
      en: "The Possessor of profound majesty, greatness, and moral sublimity before whom hearts fill with reverence.",
      hi: "वह जिसकी ज़ात में बेमिसाल हुस्न, जलाल और बुज़ुर्गी है, जिसे देखकर दिल अदब से झुक जाते हैं।",
      gu: "જે અસીમ પ્રતાપ અને ગરિમાના સ્વામી છે, જેમના ગૌરવથી હૃદય ભક્તિભાવથી ભરાઈ જાય છે."
    },
    quranReference: "Surah Ar-Rahman 55:27",
    audioUrl: 'https://cdn.islamic.network/names/audio/41.mp3'
  },
  {
    number: 42,
    arabic: 'الْكَرِيمُ',
    transliteration: 'Al-Kareem',
    meaning: {
      en: "The Most Generous / The Bountiful",
      hi: "बड़ा करम करने वाला / परम उदार",
      gu: "પરમ ઉદાર / અખૂટ કૃપાવાન"
    },
    explanation: {
      en: "The Abundantly Generous who gives without being asked, forgives with mercy, and fulfills every promise generously.",
      hi: "वह जो बिना मांगे भी अपनी रहमतें लुटाता है और क़सूरवारों को बख़्श कर उन पर मेहरबानी करता है।",
      gu: "જે માંગ્યા વિના પણ પોતાની કૃપા વરસાવે છે અને દોષિતોને ક્ષમા કરી ઉદારતા દાખવે છે."
    },
    quranReference: "Surah Al-Infitar 82:6, Surah An-Naml 27:40",
    audioUrl: 'https://cdn.islamic.network/names/audio/42.mp3'
  },
  {
    number: 43,
    arabic: 'الرَّقِيبُ',
    transliteration: 'Ar-Raqeeb',
    meaning: {
      en: "The Watchful / The All-Observant",
      hi: "निगरानी रखने वाला / देखरेख करने वाला",
      gu: "સદાય નજર રાખનાર / જાગૃત પ્રહરી"
    },
    explanation: {
      en: "The All-Observant from whose sight not a single motion, heartbeat, or whisper in the entire cosmos escapes.",
      hi: "वह जो हर लम्हा अपनी मख़लूक़ पर नज़र रखता है और कोई हरकत उससे ओझल नहीं हो सकती।",
      gu: "જે પ્રત્યેક ક્ષણે સર્વ જીવો પર સજાગ નજર રાખે છે, જેનાથી કશુંય અજાણ્યું નથી."
    },
    quranReference: "Surah An-Nisa 4:1, Surah Al-Ma’idah 5:117",
    audioUrl: 'https://cdn.islamic.network/names/audio/43.mp3'
  },
  {
    number: 44,
    arabic: 'الْمُجِيبُ',
    transliteration: 'Al-Mujeeb',
    meaning: {
      en: "The Responsive / Answerer of Prayers",
      hi: "दुआएं क़ुबूल करने वाला / पुकार सुनने वाला",
      gu: "પ્રાર્થના સ્વીકારનાર / ઉત્તર આપનાર"
    },
    explanation: {
      en: "The One who responds to the supplications of those in distress, answering their prayers according to His wisdom.",
      hi: "वह जो परेशान हाल बन्दों की फ़रियाद सुनता है और उनकी दुआओं को अपनी हिकमत से क़ुबूल फ़रमाता है।",
      gu: "જે મુસીબતમાં પડેલા ભક્તોની પોકાર સાંભળે છે અને તેમની દુઆઓ સ્વીકારે છે."
    },
    quranReference: "Surah Hud 11:61",
    audioUrl: 'https://cdn.islamic.network/names/audio/44.mp3'
  },
  {
    number: 45,
    arabic: 'الْوَاسِعُ',
    transliteration: 'Al-Wasi’',
    meaning: {
      en: "The All-Encompassing / The Boundless",
      hi: "कुशादा / असीम दया व ज्ञान वाला",
      gu: "અસીમ / સર્વવ્યાપી ક્ષમતાવાળા"
    },
    explanation: {
      en: "The Boundless whose capacity, mercy, abundance, and knowledge encircle all existence without limits.",
      hi: "वह जिसकी रहमत, रिज़्क़ और इल्म की कोई सीमा नहीं, जो सारी कायनात को घेरे हुए है।",
      gu: "જેમની દયા, જ્ઞાન અને કૃપાની કોઈ સીમા નથી, જે સર્વવ્યાપક છે."
    },
    quranReference: "Surah Al-Baqarah 2:247, Surah Al-Imran 3:73",
    audioUrl: 'https://cdn.islamic.network/names/audio/45.mp3'
  },
  {
    number: 46,
    arabic: 'الْحَكِيمُ',
    transliteration: 'Al-Hakeem',
    meaning: {
      en: "The All-Wise",
      hi: "हिकमत वाला / तत्वज्ञानी",
      gu: "તત્વજ્ઞ / પરિપૂર્ણ ડહાપણવાળા"
    },
    explanation: {
      en: "The Supreme in Wisdom, who places everything in its rightful place with flawless divine purpose.",
      hi: "वह जिसकी हर बात और हर फ़ैसले में मुकम्मल हिकमत व मस्लेहत (भलाई) पोशीदा होती है।",
      gu: "જેમના દરેક કાર્ય અને નિર્ણયમાં દૈવી શાણપણ અને માનવ કલ્યાણ સમાયેલું છે."
    },
    quranReference: "Surah Al-Baqarah 2:129, Surah Al-An’am 6:18",
    audioUrl: 'https://cdn.islamic.network/names/audio/46.mp3'
  },
  {
    number: 47,
    arabic: 'الْوَدُودُ',
    transliteration: 'Al-Wadood',
    meaning: {
      en: "The Most Loving",
      hi: "बेपनाह मुहब्बत करने वाला / परम स्नेही",
      gu: "અતિ સ્નેહાળ / પ્રેમનો સાગર"
    },
    explanation: {
      en: "The One who loves His righteous servants with pure affection, drawing them near to His grace and benevolence.",
      hi: "वह जो अपने नेक बन्दों से ख़ालिस मुहब्बत करता है और उनके दिलों में अपनी मुहब्बत डालता है।",
      gu: "જે પોતાના સદાચારી ભક્તો પર અખૂટ પ્રેમ વરસાવે છે અને તેમને નિકટતા બક્ષે છે."
    },
    quranReference: "Surah Hud 11:90, Surah Al-Buruj 85:14",
    audioUrl: 'https://cdn.islamic.network/names/audio/47.mp3'
  },
  {
    number: 48,
    arabic: 'الْمَجِيدُ',
    transliteration: 'Al-Majeed',
    meaning: {
      en: "The All-Glorious",
      hi: "बड़ी बुज़ुर्गी और शान वाला / गौरवशाली",
      gu: "પરમ ગૌરવશાળી / યશસ્વી"
    },
    explanation: {
      en: "The Majestic One whose noble essence and generous deeds are glorified by the inhabitants of heavens and earth.",
      hi: "वह जिसकी ज़ात बेइंतिहा बुज़ुर्ग है और जिसकी शान की तारीफ़ ज़मीन व आसमान करते हैं।",
      gu: "જેમનું અસ્તિત્વ અત્યંત પવિત્ર અને યશસ્વી છે, જેમની સ્તુતિ સમગ્ર બ્રહ્માંડ કરે છે."
    },
    quranReference: "Surah Hud 11:73, Surah Al-Buruj 85:15",
    audioUrl: 'https://cdn.islamic.network/names/audio/48.mp3'
  },
  {
    number: 49,
    arabic: 'الْبَاعِثُ',
    transliteration: 'Al-Ba’ith',
    meaning: {
      en: "The Resurrector",
      hi: "मुर्दों को दोबारा ज़िन्दा करने वाला",
      gu: "પુનર્જીવિત કરનાર / સજીવન કરનાર"
    },
    explanation: {
      en: "The One who will awaken and resurrect all creation from the graves on the Day of Judgment to face reckoning.",
      hi: "वह जो क़ियामत के दिन तमाम मुर्दों को क़ब्रों से ज़िन्दा करके हिसाब के लिए उठाएगा।",
      gu: "જે કયામતના દિવસે તમામ મૃતકોને કબરોમાંથી પુનર્જીવિત કરી હિસાબ માટે ઉપસ્થિત કરશે."
    },
    quranReference: "Surah Al-Hajj 22:7, Surah Yasin 36:52",
    audioUrl: 'https://cdn.islamic.network/names/audio/49.mp3'
  },
  {
    number: 50,
    arabic: 'الشَّهِيدُ',
    transliteration: 'Ash-Shaheed',
    meaning: {
      en: "The Universal Witness",
      hi: "हर चीज़ का गवाह / सर्वસાક્ષી",
      gu: "સર્વસાક્ષી / પ્રત્યક્ષ દર્શી"
    },
    explanation: {
      en: "The Ever-Present Witness who observes all occurrences and from whose divine vision nothing is hidden.",
      hi: "वह जो हर बात और हर अमल का हाज़िर व नाज़िर गवाह है, जिससे कोई राज़ पोशीदा नहीं।",
      gu: "જે સર્વ ઘટનાઓનો પ્રત્યક્ષ સાક્ષી છે, જેનાથી કોઈ કર્મ અજાણ્યું રહી શકતું નથી."
    },
    quranReference: "Surah Al-Ma’idah 5:117, Surah Al-Hajj 22:17",
    audioUrl: 'https://cdn.islamic.network/names/audio/50.mp3'
  },
  {
    number: 51,
    arabic: 'الْحَقُّ',
    transliteration: 'Al-Haqq',
    meaning: {
      en: "The Absolute Truth",
      hi: "हक़ / सच्चा और अटल वजूद",
      gu: "પરમ સત્ય / શાશ્વત વાસ્તવિકતા"
    },
    explanation: {
      en: "The Supreme Reality whose existence, promises, words, and laws are the absolute, immutable truth.",
      hi: "सच्चा और अटल वजूद, जिसके तमाम वादे, बातें और अहकाम हक़ीक़त पर मबनी हैं।",
      gu: "જેનું અસ્તિત્વ શાશ્વત સત્ય છે અને જેના તમામ વચનો પરિપૂર્ણ વાસ્તવિકતા છે."
    },
    quranReference: "Surah Al-Hajj 22:6, Surah Taha 20:114",
    audioUrl: 'https://cdn.islamic.network/names/audio/51.mp3'
  },
  {
    number: 52,
    arabic: 'الْوَكِيلُ',
    transliteration: 'Al-Wakeel',
    meaning: {
      en: "The Trustee / The Dependable",
      hi: "कारसाज़ / भरोसे के क़ाबिल रक्षक",
      gu: "કાર્યસાધક / વિશ્વાસપાત્ર સહાયક"
    },
    explanation: {
      en: "The Ultimate Trustee who manages all affairs with complete perfection for those who entrust themselves to Him.",
      hi: "वह बेहतरीन कारसाज़ जिस पर अगर बन्दा पूरा भरोसा कर ले तो वह उसकी हर मुश्किल आसान करता है।",
      gu: "જે શ્રેષ્ઠ કાર્યસાધક છે, જેના પર ભરોસો મૂકનાર કદી નિરાશ થતો નથી."
    },
    quranReference: "Surah Al-Imran 3:173, Surah Al-An’am 6:102",
    audioUrl: 'https://cdn.islamic.network/names/audio/52.mp3'
  },
  {
    number: 53,
    arabic: 'الْقَوِيُّ',
    transliteration: 'Al-Qawiyy',
    meaning: {
      en: "The All-Strong",
      hi: "ताक़तवर / महाबली",
      gu: "અસીમ બળવાન / સર્વસમર્થ"
    },
    explanation: {
      en: "The Possessor of inexhaustible, absolute strength that experiences neither fatigue nor limitation.",
      hi: "वह मुकम्मल ताक़त का मालिक जिसकी कुव्वत कभी कमज़ोर नहीं होती और न उसे थकान होती है।",
      gu: "જે સંપૂર્ણ શક્તિના સ્વામી છે, જેમના બળમાં કદી ઘટાડો કે થાક આવતો નથી."
    },
    quranReference: "Surah Al-Hajj 22:40, Surah Ash-Shura 42:19",
    audioUrl: 'https://cdn.islamic.network/names/audio/53.mp3'
  },
  {
    number: 54,
    arabic: 'الْمَتِينُ',
    transliteration: 'Al-Mateen',
    meaning: {
      en: "The Firm / The Steadfast",
      hi: "मज़बूत / निहायत मुस्तहकम",
      gu: "અડગ / અતિ સુદ્રઢ"
    },
    explanation: {
      en: "The Steadfast whose power is unshakable and whose determination suffers neither wavering nor alteration.",
      hi: "वह जिसकी ताक़त इतनी मज़बूत है कि उसे कोई हिला नहीं सकता और न उसका इरादा बदल सकता है।",
      gu: "જે અત્યંત સુદ્રઢ છે, જેની સત્તા અને સામર્થ્ય સદાય અડગ રહે છે."
    },
    quranReference: "Surah Adh-Dhariyat 51:58",
    audioUrl: 'https://cdn.islamic.network/names/audio/54.mp3'
  },
  {
    number: 55,
    arabic: 'الْوَلِيُّ',
    transliteration: 'Al-Waliyy',
    meaning: {
      en: "The Protecting Associate / The Ally",
      hi: "मददगार दोस्त / कारसाज़ वली",
      gu: "હિતેચ્છુ મિત્ર / સાચો રક્ષક"
    },
    explanation: {
      en: "The Loyal Protector who befriends and aids the righteous, guiding them from spiritual darkness into radiant light.",
      hi: "वह जो ईमान वालों का सच्चा दोस्त और मददगार है और उन्हें अंधेरों से नूर की तरफ़ निकालता है।",
      gu: "જે સદાચારી ભક્તોનો સાચો મિત્ર અને સહાયક છે, તેમને અંધકારમાંથી પ્રકાશ તરફ દોરે છે."
    },
    quranReference: "Surah Al-Baqarah 2:257, Surah Ash-Shura 42:28",
    audioUrl: 'https://cdn.islamic.network/names/audio/55.mp3'
  },
  {
    number: 56,
    arabic: 'الْحَمِيدُ',
    transliteration: 'Al-Hameed',
    meaning: {
      en: "The All-Praiseworthy",
      hi: "लाइक़े हम्द / हर तारीफ़ का हक़दार",
      gu: "પ્રશંસાને પાત્ર / સ્તુતિવાન"
    },
    explanation: {
      en: "The One who is inherently praised and deserving of all gratitude in every circumstance across all realms.",
      hi: "वह जो अपनी ज़ात और सिफ़ात में हर क़िस्म की तारीफ़ और शुक्रगुज़ारी का सच्चा हक़दार है।",
      gu: "જે પોતાની ઉત્કૃષ્ટતાને કારણે દરેક પરિસ્થિતિમાં સાચી પ્રશંસા અને સ્તુતિને પાત્ર છે."
    },
    quranReference: "Surah Ibrahim 14:1, Surah Luqman 31:26",
    audioUrl: 'https://cdn.islamic.network/names/audio/56.mp3'
  },
  {
    number: 57,
    arabic: 'الْمُحْصِي',
    transliteration: 'Al-Muhsee',
    meaning: {
      en: "The Appraiser / The Accounter of All",
      hi: "गिनने वाला / हर चीज़ का हिसाब रखने वाला",
      gu: "સૂક્ષ્મ ગણતરીકાર / સર્વની નોંધ રાખનાર"
    },
    explanation: {
      en: "The One who counts and records every single leaf, raindrop, deed, and breath across the entirety of time.",
      hi: "वह जिसने कायनात की हर चीज़ को गिन रखा है और जिसके पास हर ज़र्रे का मुकम्मल हिसाब है।",
      gu: "જેણે બ્રહ્માંડના દરેક રજકણ, પાંદડા અને શ્વાસની સંપૂર્ણ ગણતરી રાખી છે."
    },
    quranReference: "Surah Maryam 19:94, Surah Al-Jinn 72:28",
    audioUrl: 'https://cdn.islamic.network/names/audio/57.mp3'
  },
  {
    number: 58,
    arabic: 'الْمُبْدِئُ',
    transliteration: 'Al-Mubdi’',
    meaning: {
      en: "The Originator",
      hi: "पहली बार पैदा करने वाला / आदिस्रષ્ટા",
      gu: "આદિ સર્જક / પ્રથમ વાર રચનાર"
    },
    explanation: {
      en: "The Initiator who originated creation without prior model or precedent through His supreme divine decree.",
      hi: "वह जिसने कायनात को पहली बार बिना किसी पिछले नमूने के अपने हुक्म से वजूद दिया।",
      gu: "જેણે કોઈ પણ અગાઉના નમૂના વિના પોતાની ઈચ્છાથી પ્રથમ વાર સૃષ્ટિની રચના કરી."
    },
    quranReference: "Surah Al-Buruj 85:13, Surah Al-Ankabut 29:19",
    audioUrl: 'https://cdn.islamic.network/names/audio/58.mp3'
  },
  {
    number: 59,
    arabic: 'الْمُعِيدُ',
    transliteration: 'Al-Mu’eed',
    meaning: {
      en: "The Restorer",
      hi: "दोबारा पैदा करने वाला / पुनર્સર્જક",
      gu: "પુનઃનિર્માણ કરનાર / પુનઃસર્જક"
    },
    explanation: {
      en: "The One who restores creation back to life after its passing, proving the resurrection is effortless for Him.",
      hi: "वह जो मिट जाने के बाद मख़लूक़ को दोबारा ज़िन्दगी बख़्शने पर पूरी तरह क़ादिर है।",
      gu: "જે મૃત્યુ પછી સૃષ્ટિનું પુનઃનિર્માણ કરવા સંપૂર્ણ સમર્થ છે."
    },
    quranReference: "Surah Al-Buruj 85:13, Surah Ar-Rum 30:27",
    audioUrl: 'https://cdn.islamic.network/names/audio/59.mp3'
  },
  {
    number: 60,
    arabic: 'الْمُحْيِي',
    transliteration: 'Al-Muhyee',
    meaning: {
      en: "The Giver of Life",
      hi: "ज़िन्दगी बख़्शने वाला / જીવનદાતા",
      gu: "જીવન આપનાર / પ્રાણદાતા"
    },
    explanation: {
      en: "The One who breathes life into barren earth and lifeless matter, granting conscious vitality to souls.",
      hi: "वह जो बेजान मिट्टी और मुर्दा ज़मीन को ज़िन्दगी और रूह की ताज़गी अता करता है।",
      gu: "જે નિર્જીવ પદાર્થોમાં પ્રાણ ફૂંકે છે અને સુકી ધરાને નવજીવન આપે છે."
    },
    quranReference: "Surah Ar-Rum 30:50, Surah Fussilat 41:39",
    audioUrl: 'https://cdn.islamic.network/names/audio/60.mp3'
  },
  {
    number: 61,
    arabic: 'الْمُمِيتُ',
    transliteration: 'Al-Mumeet',
    meaning: {
      en: "The Bringer of Death",
      hi: "मौत देने वाला",
      gu: "મૃત્યુ આપનાર"
    },
    explanation: {
      en: "The One who decrees death for every mortal at its appointed term, transferring souls to the realm of eternity.",
      hi: "वह जो हर जानदार के लिए उसकी तयशुदा मुद्दत पर मौत का फ़ैसला फ़रमाता है।",
      gu: "જે નિશ્ચિત સમયે દરેક જીવને મૃત્યુ આપે છે અને આત્માને પરલોક તરફ લઈ જાય છે."
    },
    quranReference: "Surah Al-Baqarah 2:258, Surah Al-An’am 6:61",
    audioUrl: 'https://cdn.islamic.network/names/audio/61.mp3'
  },
  {
    number: 62,
    arabic: 'الْحَيُّ',
    transliteration: 'Al-Hayy',
    meaning: {
      en: "The Ever-Living",
      hi: "ज़िन्दा व जावेद / सदैव જીવંત",
      gu: "સદા જીવંત / અમર પરમેશ્વર"
    },
    explanation: {
      en: "The Ever-Living whose eternal existence has neither beginning nor end, free from slumber or mortality.",
      hi: "वह हमेशा ज़िन्दा रहने वाला जिसकी हयात (ज़िन्दगी) की न कोई शुरुआत है और न अंत।",
      gu: "જે સનાતન કાળથી જીવંત છે, જેને કદી ઊંઘ કે મૃત્યુ સ્પર્શી શકતા નથી."
    },
    quranReference: "Surah Al-Baqarah 2:255, Surah Taha 20:111",
    audioUrl: 'https://cdn.islamic.network/names/audio/62.mp3'
  },
  {
    number: 63,
    arabic: 'الْقَيُّومُ',
    transliteration: 'Al-Qayyum',
    meaning: {
      en: "The Self-Subsisting / The Sustainer",
      hi: "क़ायम रहने वाला / सबको थामने वाला",
      gu: "સ્વયંભૂ / સમગ્ર સૃષ્ટિને ધારણ કરનાર"
    },
    explanation: {
      en: "The Self-Sustaining upon whom all creations depend, while He is completely independent of all needs.",
      hi: "वह जो अपनी ज़ात से क़ायम है और जिसने सारी कायनात को अपनी क़ुदरत से थाम रखा है।",
      gu: "જે સ્વયં અસ્તિત્વ ધરાવે છે અને જેના આધાર પર સમગ્ર બ્રહ્માંડ ટકી રહ્યું છે."
    },
    quranReference: "Surah Al-Baqarah 2:255, Surah Al-Imran 3:2",
    audioUrl: 'https://cdn.islamic.network/names/audio/63.mp3'
  },
  {
    number: 64,
    arabic: 'الْوَاجِدُ',
    transliteration: 'Al-Wajid',
    meaning: {
      en: "The Perceiver / The Finder",
      hi: "सब कुछ पाने वाला / सम्पन्न",
      gu: "સંપન્ન / સર્વ પ્રાપ્ત કરનાર"
    },
    explanation: {
      en: "The All-Resourceful who lacks nothing, who finds and achieves whatever He wills without deficiency.",
      hi: "वह जिसे किसी चीज़ की कमी नहीं, जो जब चाहे जो चाहे पा लेता है।",
      gu: "જેને કોઈ અભાવ નથી, જે પોતાની ઈચ્છા મુજબ સર્વસ્વ મેળવે છે."
    },
    quranReference: "Surah Ad-Duha 93:6-8",
    audioUrl: 'https://cdn.islamic.network/names/audio/64.mp3'
  },
  {
    number: 65,
    arabic: 'الْمَاجِدُ',
    transliteration: 'Al-Majid',
    meaning: {
      en: "The Illustrious / The Noble",
      hi: "बड़ी अज़मत और इज़्ज़त वाला",
      gu: "તેજસ્વી અને અતિ ગૌરવવંત"
    },
    explanation: {
      en: "The Noble and Magnanimous whose generosity is boundless and whose character is beyond praise.",
      hi: "वह जो बहुत सख़ी और बुज़ुर्ग है, जिसकी शान और करम की कोई हद नहीं।",
      gu: "જે અનહદ ઉદાર અને મહિમાવાન છે, જેમનું ઔદાર્ય અસીમ છે."
    },
    quranReference: "Surah Hud 11:73",
    audioUrl: 'https://cdn.islamic.network/names/audio/65.mp3'
  },
  {
    number: 66,
    arabic: 'الْوَاحِدُ',
    transliteration: 'Al-Wahid',
    meaning: {
      en: "The Unique / The One",
      hi: "एक व यकता / अकेला",
      gu: "અદ્વિતીય / એકમાત્ર"
    },
    explanation: {
      en: "The One and Only, singular in His essence, attributes, and actions, having no equal or peer.",
      hi: "वह जो अपनी ज़ात और सिफ़ात में अकेला है, जिसका कोई सानी या शरीक नहीं।",
      gu: "જે પોતાના ગુણો અને સત્તામાં એકમાત્ર છે, જેનો કોઈ સમકક્ષ નથી."
    },
    quranReference: "Surah Al-Baqarah 2:163, Surah Al-Ikhlas 112:1",
    audioUrl: 'https://cdn.islamic.network/names/audio/66.mp3'
  },
  {
    number: 67,
    arabic: 'الأَحَدُ',
    transliteration: 'Al-Ahad',
    meaning: {
      en: "The Indivisible / The Absolute One",
      hi: "अकेला / बेजोड़ और लासानी",
      gu: "અખંડ એક / અનન્ય"
    },
    explanation: {
      en: "The Absolute Unitary One, indivisible, unbegotten, who begets not and is uniquely transcendent.",
      hi: "वह जो एक है, जिसका कोई टुकड़ा या हिस्सा नहीं हो सकता, न उसकी कोई औलाद है और न वह किसी की औलाद है।",
      gu: "જે અવિભાજ્ય અને અજોડ છે, જેણે કોઈને જન્મ આપ્યો નથી કે નથી તે જન્મ્યો."
    },
    quranReference: "Surah Al-Ikhlas 112:1",
    audioUrl: 'https://cdn.islamic.network/names/audio/67.mp3'
  },
  {
    number: 68,
    arabic: 'الصَّمَدُ',
    transliteration: 'As-Samad',
    meaning: {
      en: "The Eternal Refuge / The Self-Sufficient",
      hi: "बेनियाज़ / सब जिसकी ज़रूरत रखते हैं",
      gu: "સર્વાધાર / નિરાધારનો આધાર"
    },
    explanation: {
      en: "The Eternal Refuge upon whom all creation depends for their needs, while He needs neither food nor sustenance.",
      hi: "वह बेनियाज़ जिससे सब अपनी ज़रूरतें मांगते हैं और जिसे किसी की कोई हाजत नहीं होती।",
      gu: "જેના પર તમામ સૃષ્ટિ નિર્ભર છે પરંતુ જેને કોઈની પણ જરૂર નથી."
    },
    quranReference: "Surah Al-Ikhlas 112:2",
    audioUrl: 'https://cdn.islamic.network/names/audio/68.mp3'
  },
  {
    number: 69,
    arabic: 'الْقَادِرُ',
    transliteration: 'Al-Qadir',
    meaning: {
      en: "The Capable / The All-Powerful",
      hi: "क़ुदरत वाला / समर्थ",
      gu: "સર્વસમર્થ / શક્તિમાન"
    },
    explanation: {
      en: "The All-Capable who possesses absolute power to manifest or withhold whatever He decrees.",
      hi: "वह जो हर मुमकिन चीज़ पर पूरी तरह क़ादिर है और कोई काम उसके लिए मुश्किल नहीं।",
      gu: "જે દરેક સંભવ કાર્ય કરવા પૂર્ણ શક્તિશાળી છે, જે અશક્યને શક્ય બનાવે છે."
    },
    quranReference: "Surah Al-Baqarah 2:20, Surah Al-An’am 6:65",
    audioUrl: 'https://cdn.islamic.network/names/audio/69.mp3'
  },
  {
    number: 70,
    arabic: 'الْمُقْتَدِرُ',
    transliteration: 'Al-Muqtadir',
    meaning: {
      en: "The Omnipotent / The Prevailing",
      hi: "ज़बरदस्त इक़्तिदार वाला / प्रभुત્વવાન",
      gu: "પ્રચંડ પ્રભુત્વશાળી / સત્તાધીશ"
    },
    explanation: {
      en: "The Supreme Dominant whose executive power executes all divine decrees with effortless mastery.",
      hi: "वह जिसका इक़्तिदार इतना ग़ालिब है कि कायनात की कोई ताक़त उसके फ़ैसले को रोक नहीं सकती।",
      gu: "જેનું સામર્થ્ય એટલું પ્રચંડ છે કે સમગ્ર સૃષ્ટિમાં કોઈ તેના આદેશને રોકી શકતું નથી."
    },
    quranReference: "Surah Al-Qamar 54:42, Surah Al-Kahf 18:45",
    audioUrl: 'https://cdn.islamic.network/names/audio/70.mp3'
  },
  {
    number: 71,
    arabic: 'الْمُقَدِّمُ',
    transliteration: 'Al-Muqaddim',
    meaning: {
      en: "The Advancer / The Expediter",
      hi: "आगे बढ़ाने वाला / अग्रसर કરનાર",
      gu: "આગળ ધપાવનાર / પ્રગતિ આપનાર"
    },
    explanation: {
      en: "The One who brings forward what He wills in time, status, and rank according to profound wisdom.",
      hi: "वह जो अपनी हिकमत से जिसे चाहे इल्म, इज़्ज़त और रुतबे में आगे बढ़ा देता है।",
      gu: "જે પોતાના દૈવી જ્ઞાનથી જેને ઇચ્છે તેને જ્ઞાન અને પદવીમાં આગળ વધારે છે."
    },
    quranReference: "Surah Qaf 50:28",
    audioUrl: 'https://cdn.islamic.network/names/audio/71.mp3'
  },
  {
    number: 72,
    arabic: 'الْمُؤَخِّرُ',
    transliteration: 'Al-Mu’akhkhir',
    meaning: {
      en: "The Delayer / The Postponer",
      hi: "पीछे करने वाला / વિલંબ કરનાર",
      gu: "પાછળ રાખનાર / સમય લંબાવનાર"
    },
    explanation: {
      en: "The One who delays what He wills, holding back events or punishments until their appointed divine time.",
      hi: "वह जो अपनी मस्लेहत से चीज़ों को या गुनहगारों की सज़ा को एक ख़ास वक़्त तक मुल्तवी रखता है।",
      gu: "જે પોતાની ગૂઢ બુદ્ધિથી ઘટનાઓને કે દંડને યોગ્ય સમય સુધી વિલંબમાં રાખે છે."
    },
    quranReference: "Surah Ibrahim 14:42, Surah Nuh 71:4",
    audioUrl: 'https://cdn.islamic.network/names/audio/72.mp3'
  },
  {
    number: 73,
    arabic: 'الأَوَّلُ',
    transliteration: 'Al-Awwal',
    meaning: {
      en: "The Very First",
      hi: "सबसे पहला / आदि",
      gu: "સર્વપ્રથમ / અનાદિ"
    },
    explanation: {
      en: "The First whose existence has no beginning, who existed before the cosmos, time, or space were fashioned.",
      hi: "वह जो सबसे पहले था जब कुछ भी न था, जिसके वजूद की कोई इब्तिदा (शुरुआत) नहीं।",
      gu: "જે સર્વપ્રથમ હતો જ્યારે કશું જ નહોતું, જે સમય અને અવકાશના સર્જન પહેલાંથી છે."
    },
    quranReference: "Surah Al-Hadid 57:3",
    audioUrl: 'https://cdn.islamic.network/names/audio/73.mp3'
  },
  {
    number: 74,
    arabic: 'الآخِرُ',
    transliteration: 'Al-Akhir',
    meaning: {
      en: "The Very Last",
      hi: "सबके बाद बाक़ी रहने वाला / अनंत",
      gu: "સર્વાંતે અવિનાશી / અનંત"
    },
    explanation: {
      en: "The Last whose existence has no end, who will remain in full majesty after all creation has vanished.",
      hi: "वह जो सब कुछ ख़त्म हो जाने के बाद भी हमेशा बाक़ी रहेगा, जिसकी कोई इंतिहा (अंत) नहीं।",
      gu: "જે બધું જ નષ્ટ થઈ ગયા પછી પણ સદાકાળ રહેશે, જેનો કોઈ અંત નથી."
    },
    quranReference: "Surah Al-Hadid 57:3",
    audioUrl: 'https://cdn.islamic.network/names/audio/74.mp3'
  },
  {
    number: 75,
    arabic: 'الظَّاهِرُ',
    transliteration: 'Az-Zahir',
    meaning: {
      en: "The Manifest / The Evident",
      hi: "ज़ाहिर / जिसकी निशानियां अयां हैं",
      gu: "પ્રત્યક્ષ / સર્વત્ર દેખાતા પ્રતીકોવાળા"
    },
    explanation: {
      en: "The Manifest whose reality and power are clearly demonstrated through the marvels of His creation.",
      hi: "वह जो अपनी निशानियों और क़ुदरत के करिश्मों से बिल्कुल साफ़ और ज़ाहिर है।",
      gu: "જે પોતાના સૃષ્ટિ-ચમત્કારો અને કુદરતી પુરાવાઓ દ્વારા સર્વત્ર પ્રત્યક્ષ છે."
    },
    quranReference: "Surah Al-Hadid 57:3",
    audioUrl: 'https://cdn.islamic.network/names/audio/75.mp3'
  },
  {
    number: 76,
    arabic: 'الْبَاطِنُ',
    transliteration: 'Al-Batin',
    meaning: {
      en: "The Hidden / The Immanent",
      hi: "छुपा हुआ / आँखों से ओझल",
      gu: "અપ્રત્યક્ષ / દૃષ્ટિથી પર"
    },
    explanation: {
      en: "The Hidden whose essence cannot be perceived by mortal eyes, yet whose presence is closer than life itself.",
      hi: "वह जो दुनियावी आँखों से ओझल है मगर दिलों के सबसे क़रीब और हर राज़ से वाक़िफ़ है।",
      gu: "જે સ્થૂળ આંખોથી અદ્રશ્ય છે છતાં માનવ હૃદયની સૌથી નિકટ બિરાજમાન છે."
    },
    quranReference: "Surah Al-Hadid 57:3",
    audioUrl: 'https://cdn.islamic.network/names/audio/76.mp3'
  },
  {
    number: 77,
    arabic: 'الْوَالِي',
    transliteration: 'Al-Wali',
    meaning: {
      en: "The Sole Governor / The Ruler",
      hi: "सच्चा हुक्मरां / स्वामी",
      gu: "શાસક / સર્વોચ્ચ સંચાલક"
    },
    explanation: {
      en: "The Sole Master and Governor who oversees, manages, and commands all operations of the cosmos.",
      hi: "वह मुस्तक़िल हाकिम जो पूरे ब्रह्मांड की व्यवस्था और निज़ाम को अकेले चलाता है।",
      gu: "જે એકમાત્ર સર્વોચ્ચ શાસક છે અને સમગ્ર બ્રહ્માંડનું વ્યવસ્થિત સંચાલન કરે છે."
    },
    quranReference: "Surah Ar-Ra’d 13:11",
    audioUrl: 'https://cdn.islamic.network/names/audio/77.mp3'
  },
  {
    number: 78,
    arabic: 'الْمُتَعَالِي',
    transliteration: 'Al-Muta’ali',
    meaning: {
      en: "The Supremely Exalted",
      hi: "अत्यंत उच्च / सर्वश्रेष्ठ",
      gu: "પરમ ઉચ્ચ / અતિશય ગૌરવવંત"
    },
    explanation: {
      en: "The One who is elevated far beyond any human conception, defect, or comparison.",
      hi: "वह जो मख़लूक़ात के ख़यालात, गुमान और हर ऐब से बहुत ज़्यादा बुलन्द व बाला है।",
      gu: "જે તમામ માનવીય કલ્પનાઓ અને સાંસારિક સરખામણીઓ કરતાં અતિશય પર છે."
    },
    quranReference: "Surah Ar-Ra’d 13:9",
    audioUrl: 'https://cdn.islamic.network/names/audio/78.mp3'
  },
  {
    number: 79,
    arabic: 'الْبَرُّ',
    transliteration: 'Al-Barr',
    meaning: {
      en: "The Source of All Goodness",
      hi: "नेकी और भलाई का स्रोत / परम उपकारी",
      gu: "સમસ્ત ભલાઈનો સ્ત્રોત / પરમ ઉપકારી"
    },
    explanation: {
      en: "The Source of all virtue and goodness, extremely kind to His creation, showering them with compassion.",
      hi: "वह जो भलाई और एहसान का स्रोत है और अपने बन्दों पर बेइंतिहा शफ़क़त फ़रमाता है।",
      gu: "જે તમામ સદ્ગુણો અને દયાનો સ્ત્રોત છે, જે ભક્તો પર પરમ કૃપા વરસાવે છે."
    },
    quranReference: "Surah At-Tur 52:28",
    audioUrl: 'https://cdn.islamic.network/names/audio/79.mp3'
  },
  {
    number: 80,
    arabic: 'التَّوَّابُ',
    transliteration: 'At-Tawwab',
    meaning: {
      en: "The Ever-Pardoning / Acceptor of Repentance",
      hi: "तौबा क़ुबूल करने वाला / क्षमाવાન",
      gu: "પશ્ચાતાપ સ્વીકારનાર / ક્ષમાશીલ"
    },
    explanation: {
      en: "The One who continually turns toward His servants with mercy and readily accepts sincere repentance.",
      hi: "वह जो बन्दों को तौबा की तौफ़ीक़ देता है और बार-बार उनकी तौबा को क़ुबूल फ़रमाता है।",
      gu: "જે ભક્તોને સાચા પશ્ચાતાપની પ્રેરણા આપે છે અને તેમની ક્ષમાયાચના સ્વીકારે છે."
    },
    quranReference: "Surah Al-Baqarah 2:37, Surah An-Nasr 110:3",
    audioUrl: 'https://cdn.islamic.network/names/audio/80.mp3'
  },
  {
    number: 81,
    arabic: 'الْمُنْتَقِمُ',
    transliteration: 'Al-Muntaqim',
    meaning: {
      en: "The Just Avenger",
      hi: "इंतिक़ाम लेने वाला / ज़ालिमों को सज़ा देने वाला",
      gu: "અન્યાયીઓને ન્યાયિક દંડ આપનાર"
    },
    explanation: {
      en: "The Just Punisher who exacts retribution against obstinate tyrants and persistent transgressors of truth.",
      hi: "वह जो सरकश ज़ालिमों और हक़ के दुश्मनों से इंसाफ़ के साथ बदला लेने वाला है।",
      gu: "જે હઠીલા અત્યાચારીઓ અને સત્યના વિરોધીઓને ન્યાયપૂર્ણ દંડ આપે છે."
    },
    quranReference: "Surah As-Sajdah 32:22, Surah Az-Zukhruf 43:41",
    audioUrl: 'https://cdn.islamic.network/names/audio/81.mp3'
  },
  {
    number: 82,
    arabic: 'العَفُوُّ',
    transliteration: 'Al-Afuww',
    meaning: {
      en: "The Supreme Pardoner / Effacer of Sins",
      hi: "गुनाहों को मिटाने वाला / महाक्षमादाता",
      gu: "પાપોને સંપૂર્ણ ભૂંસી નાખનાર"
    },
    explanation: {
      en: "The One who completely erases sins from the record as though they never occurred, leaving no trace behind.",
      hi: "वह जो गुनाहों को सिर्फ़ माफ़ ही नहीं करता बल्कि नाम-ए-आमाल से बिल्कुल मिटा देता है।",
      gu: "જે પાપોને માત્ર માફ નથી કરતો પરંતુ કર્મોની નોંધમાંથી સદંતર ભૂંસી નાખે છે."
    },
    quranReference: "Surah An-Nisa 4:43, Surah Al-Hajj 22:60",
    audioUrl: 'https://cdn.islamic.network/names/audio/82.mp3'
  },
  {
    number: 83,
    arabic: 'الرَّؤُوفُ',
    transliteration: 'Ar-Ra’oof',
    meaning: {
      en: "The Most Clement / Most Tender",
      hi: "निहायत मेहरबान व शफ़ीक़ / परम स्नेહી",
      gu: "પરમ દયાળુ અને વાત્સલ્યપૂર્ણ"
    },
    explanation: {
      en: "The Tender One whose profound compassion spares His servants from unbearable burdens and hardships.",
      hi: "वह जो बेइंतिहा शफ़क़त और नरमी फ़रमाने वाला है, जो बन्दों पर उनकी ताक़त से ज़्यादा बोझ नहीं डालता।",
      gu: "જે પરમ વાત્સલ્યપૂર્ણ છે, જે ભક્તો પર તેમની ક્ષમતા કરતાં વધુ ભાર મૂકતો નથી."
    },
    quranReference: "Surah Al-Baqarah 2:207, Surah At-Tawbah 9:117",
    audioUrl: 'https://cdn.islamic.network/names/audio/83.mp3'
  },
  {
    number: 84,
    arabic: 'مَالِكُ الْمُلْكِ',
    transliteration: 'Malik-ul-Mulk',
    meaning: {
      en: "Master of All Sovereignty",
      hi: "सारे मुल्क व जहान का मालिक",
      gu: "સમગ્ર સૃષ્ટિના સર્વોચ્ચ સત્તાધીશ"
    },
    explanation: {
      en: "The Owner of all dominion, who bestows authority upon whom He wills and removes it from whom He wills.",
      hi: "सारी सल्तनत और हुकूमत का हक़ीक़ी मालिक, जिसे चाहे हुकूमत दे और जिससे चाहे छीन ले।",
      gu: "સમસ્ત સામ્રાજ્યનો સાચો માલિક, જે જેને ઇચ્છે તેને સત્તા આપે અને છીનવી લે."
    },
    quranReference: "Surah Al-Imran 3:26",
    audioUrl: 'https://cdn.islamic.network/names/audio/84.mp3'
  },
  {
    number: 85,
    arabic: 'ذُو الْجَلاَلِ وَالإِكْرَامِ',
    transliteration: 'Dhul-Jalali wal-Ikram',
    meaning: {
      en: "Lord of Majesty and Generosity",
      hi: "जलाल और इज़्ज़त वाला / गौरव અને ઔદાર્યના સ્વામી",
      gu: "ગૌરવ, પ્રતાપ અને ઉદારતાના સ્વામી"
    },
    explanation: {
      en: "The Lord possessed of absolute glory, grandeur, majesty, and unceasing bounty toward His creation.",
      hi: "वह जो अज़मत व जलाल और बेपायां करम व नवाज़िश का मालिक है।",
      gu: "જે પ્રચંડ પ્રતાપ અને અનંત પરોપકારના એકમાત્ર સ્વામી છે."
    },
    quranReference: "Surah Ar-Rahman 55:27, 55:78",
    audioUrl: 'https://cdn.islamic.network/names/audio/85.mp3'
  },
  {
    number: 86,
    arabic: 'الْمُقْسِطُ',
    transliteration: 'Al-Muqsit',
    meaning: {
      en: "The Equitable / The Impartial",
      hi: "अदल व इंसाफ़ क़ायम करने वाला / નિષ્પક્ષ",
      gu: "સંપૂર્ણ નિષ્પક્ષ અને ન્યાયપ્રિય"
    },
    explanation: {
      en: "The One who acts with complete fairness, rectifying injustice and restoring rights to the wronged.",
      hi: "वह जो पूरी तरह इंसाफ़ क़ायम करता है और मज़लूम को ज़ालिम से उसका हक़ दिलाता है।",
      gu: "જે સંપૂર્ણ નિષ્પક્ષતાથી ન્યાય કરે છે અને પીડિતને તેનો સાચો અધિકાર અપાવે છે."
    },
    quranReference: "Surah Al-Imran 3:18, Surah Al-Anbiya 21:47",
    audioUrl: 'https://cdn.islamic.network/names/audio/86.mp3'
  },
  {
    number: 87,
    arabic: 'الْجَامِعُ',
    transliteration: 'Al-Jami’',
    meaning: {
      en: "The Gatherer / The Uniter",
      hi: "जमा करने वाला / इकट्ठा करने वाला",
      gu: "સર્વને એકત્ર કરનાર / સંયોજક"
    },
    explanation: {
      en: "The One who will gather all mankind on the Day of Resurrection, in which there is no doubt.",
      hi: "वह जो क़ियामत के दिन तमाम इंसानों को बिना किसी शक के एक मैदान में इकट्ठा करेगा।",
      gu: "જે કયામતના દિવસે તમામ માનવજાતને નિઃશંકપણે એકત્ર કરશે."
    },
    quranReference: "Surah Al-Imran 3:9, Surah An-Nisa 4:140",
    audioUrl: 'https://cdn.islamic.network/names/audio/87.mp3'
  },
  {
    number: 88,
    arabic: 'الْغَنِيُّ',
    transliteration: 'Al-Ghaniyy',
    meaning: {
      en: "The Self-Sufficient / The All-Rich",
      hi: "बेनियाज़ व धनी / सर्वસંપન્ન",
      gu: "સ્વયંપૂર્ણ / સર્વસંપન્ન દાતા"
    },
    explanation: {
      en: "The Rich One who is completely independent of everything, while all creation stands in dire need of Him.",
      hi: "वह बेनियाज़ और ग़नी जिसे किसी की कोई ज़रूरत नहीं, बल्कि सारी कायनात उसकी मोहताज है।",
      gu: "જે સ્વયંપૂર્ણ છે અને જેને કોઈ જરૂરિયાત નથી, જ્યારે સર્વ સૃષ્ટિ તેમની મોહતાજ છે."
    },
    quranReference: "Surah Al-Baqarah 2:267, Surah Fatir 35:15",
    audioUrl: 'https://cdn.islamic.network/names/audio/88.mp3'
  },
  {
    number: 89,
    arabic: 'الْمُغْنِي',
    transliteration: 'Al-Mughni',
    meaning: {
      en: "The Enricher / Bestower of Wealth",
      hi: "बेनियाज़ बनाने वाला / मालामाल करने वाला",
      gu: "સંપન્ન બનાવનાર / સમૃદ્ધિ આપનાર"
    },
    explanation: {
      en: "The One who enriches His servants with spiritual contentment, material sustenance, and faith.",
      hi: "वह जो जिसे चाहे अपनी रहमत से ग़नी व मालामाल कर देता है और दिलों को इत्मीनान बख़्शता है।",
      gu: "જે જેને ઇચ્છે તેને આત્મિક શાંતિ, શ્રદ્ધા અને સમૃદ્ધિથી સંપન્ન બનાવે છે."
    },
    quranReference: "Surah An-Najm 53:48, Surah At-Tawbah 9:74",
    audioUrl: 'https://cdn.islamic.network/names/audio/89.mp3'
  },
  {
    number: 90,
    arabic: 'الْمَانِعُ',
    transliteration: 'Al-Mani’',
    meaning: {
      en: "The Withholder / The Shielding Protector",
      hi: "रोकने वाला / हिफ़ाज़त करने वाला",
      gu: "નુકસાનથી બચાવનાર / રોકનાર"
    },
    explanation: {
      en: "The One who prevents harm from reaching His servants and withholds provisions according to divine wisdom.",
      hi: "वह जो अपनी हिकमत से नुक़सान को रोकता है और बुराइयों से अपने बन्दों की हिफ़ाज़त फ़रमाता है।",
      gu: "જે પોતાના જ્ઞાન અનુસાર અનિષ્ટને રોકે છે અને ભક્તોનું રક્ષણ કરે છે."
    },
    quranReference: "Surah Al-Mulk 67:21",
    audioUrl: 'https://cdn.islamic.network/names/audio/90.mp3'
  },
  {
    number: 91,
    arabic: 'الضَّارُّ',
    transliteration: 'Ad-Darr',
    meaning: {
      en: "The Distressor / Afflicter (for Divine Wisdom)",
      hi: "नुक़सान पहुँचाने वाला (हिकमत के तहत)",
      gu: "કસોટી માટે વિપત્તિ મોકલનાર"
    },
    explanation: {
      en: "The One in whose control lies all adversity; none can bring affliction or test except by His divine permission.",
      hi: "वह जिसकी इजाज़त के बिना कोई नुक़सान नहीं पहुँच सकता, जो आज़माइश के लिए तकलीफ़ भेजता है।",
      gu: "જેની અનુમતિ વિના કોઈ મુશ્કેલી આવી શકતી નથી, જે કસોટી માટે વિપત્તિ મોકલે છે."
    },
    quranReference: "Surah Al-An’am 6:17, Surah Yunus 10:107",
    audioUrl: 'https://cdn.islamic.network/names/audio/91.mp3'
  },
  {
    number: 92,
    arabic: 'النَّافِعُ',
    transliteration: 'An-Nafi’',
    meaning: {
      en: "The Bestower of Benefit",
      hi: "फ़ायदा पहुँचाने वाला / कल्याणकारी",
      gu: "લાભ અને કલ્યાણ કરનાર"
    },
    explanation: {
      en: "The Creator of all benefit, advantage, and good, without whose grace no blessing can be attained.",
      hi: "वह जो हर क़िस्म का फ़ायदा और भलाई अता करता है, जिसके फ़ज़्ल के बिना कोई नेमत नहीं मिल सकती।",
      gu: "જે તમામ પ્રકારનું કલ્યાણ અને લાભ આપનાર છે, જેના અનુગ્રહ વિના કોઈ ઉપહાર શક્ય નથી."
    },
    quranReference: "Surah Yunus 10:107, Surah Al-Fath 48:11",
    audioUrl: 'https://cdn.islamic.network/names/audio/92.mp3'
  },
  {
    number: 93,
    arabic: 'النُّورُ',
    transliteration: 'An-Noor',
    meaning: {
      en: "The Light",
      hi: "नूर / रौशनी का स्रोत",
      gu: "દિવ્ય પ્રકાશ / નૂર"
    },
    explanation: {
      en: "The Light of the heavens and the earth, who illuminates the cosmos and guides hearts through spiritual clarity.",
      hi: "ज़मीन व आसमान का नूर, जो दिलों को हिदायत की रौशनी से मुनव्वर करता है।",
      gu: "આકાશ અને પૃથ્વીનો દિવ્ય પ્રકાશ, જે હૃદયોને સત્યના નૂરથી પ્રકાશિત કરે છે."
    },
    quranReference: "Surah An-Nur 24:35",
    audioUrl: 'https://cdn.islamic.network/names/audio/93.mp3'
  },
  {
    number: 94,
    arabic: 'الْهَادِي',
    transliteration: 'Al-Hadi',
    meaning: {
      en: "The Guide",
      hi: "हिदायत देने वाला / मार्गदर्शक",
      gu: "સાચો માર્ગદર્શક / પથપ્રદર્શક"
    },
    explanation: {
      en: "The Supreme Guide who directs creation to their welfare and guides receptive hearts to the straight path.",
      hi: "वह जो बन्दों को सीधे रास्ते (सिरात-ए-मुस्तक़ीम) की तरफ़ रहनुमाई फ़रमाता है।",
      gu: "જે ભક્તોને સત્ય અને સદાચારના સીધા માર્ગ તરફ દોરે છે."
    },
    quranReference: "Surah Al-Hajj 22:54, Surah Al-Furqan 25:31",
    audioUrl: 'https://cdn.islamic.network/names/audio/94.mp3'
  },
  {
    number: 95,
    arabic: 'الْبَدِيعُ',
    transliteration: 'Al-Badi’',
    meaning: {
      en: "The Incomparable Originator",
      hi: "अनोखा पैदा करने वाला / અદ્ભુત રચિયતા",
      gu: "અદ્ભુત રચનાકાર / અનોખો સર્જક"
    },
    explanation: {
      en: "The Originator who creates breathtaking marvels without prior example, possessing unmatched originality.",
      hi: "वह जिसने कायनात को बिना किसी मिसाल या नमूने के अनोखे और लासानी अंदाज़ में बनाया।",
      gu: "જેણે કોઈ પણ અગાઉના ઉદાહરણ વિના અદભુત સૌંદર્ય સાથે સૃષ્ટિનું સર્જન કર્યું."
    },
    quranReference: "Surah Al-Baqarah 2:117, Surah Al-An’am 6:101",
    audioUrl: 'https://cdn.islamic.network/names/audio/95.mp3'
  },
  {
    number: 96,
    arabic: 'الْبَاقِي',
    transliteration: 'Al-Baqi',
    meaning: {
      en: "The Everlasting / The Imperishable",
      hi: "हमेशा बाक़ी रहने वाला / અવિનાશી",
      gu: "સદા અવિનાશી / શાશ્વત"
    },
    explanation: {
      en: "The Imperishable who remains forever after all creation has perished, untethered by time or demise.",
      hi: "वह जो हमेशा बाक़ी रहेगा जब हर चीज़ फ़ना हो जाएगी।",
      gu: "જે સદાય કાયમ રહેશે જ્યારે તમામ નશ્વર વસ્તુઓ નાશ પામશે."
    },
    quranReference: "Surah Ar-Rahman 55:27, Surah Al-Qasas 28:88",
    audioUrl: 'https://cdn.islamic.network/names/audio/96.mp3'
  },
  {
    number: 97,
    arabic: 'الْوَارِثُ',
    transliteration: 'Al-Warith',
    meaning: {
      en: "The Supreme Inheritor",
      hi: "सबका वारिस / उत्तराधिकारी",
      gu: "સાચો વારસદાર / અંતિમ ઉત્તરાધિકારી"
    },
    explanation: {
      en: "The Ultimate Inheritor of all heavens and earth, to whom everything returns after its possessors vanish.",
      hi: "सारे जहान का हक़ीक़ी वारिस, जिसकी तरफ़ सब कुछ पलट कर आएगा जब इंसान दुनिया छोड़ देंगे।",
      gu: "સમગ્ર સૃષ્ટિનો અંતિમ વારસદાર, જેની પાસે સર્વસ્વ પાછું ફરીને આવશે."
    },
    quranReference: "Surah Al-Hijr 15:23, Surah Maryam 19:40",
    audioUrl: 'https://cdn.islamic.network/names/audio/97.mp3'
  },
  {
    number: 98,
    arabic: 'الرَّشِيدُ',
    transliteration: 'Ar-Rasheed',
    meaning: {
      en: "The Righteous Guide / The Infallible Teacher",
      hi: "नेक राह दिखाने वाला / हिदायत का शिक्षक",
      gu: "સન્માર્ગ દર્શાવનાર / સત્યના શિક્ષક"
    },
    explanation: {
      en: "The Infallible Guide whose governance proceeds with unerring righteousness toward ultimate wisdom.",
      hi: "वह जो सही और नेक रास्ते पर चलाने वाला है, जिसकी तदबीर में कभी कोई ग़लती नहीं होती।",
      gu: "જે ભૂલરહિત દૈવી શાણપણથી ભક્તોને કલ્યાણકારી સન્માર્ગ તરફ દોરે છે."
    },
    quranReference: "Surah Al-Kahf 18:17, Surah Hud 11:87",
    audioUrl: 'https://cdn.islamic.network/names/audio/98.mp3'
  },
  {
    number: 99,
    arabic: 'الصَّبُورُ',
    transliteration: 'As-Saboor',
    meaning: {
      en: "The Most Patient",
      hi: "असीम सब्र करने वाला / परम धैर्यवान",
      gu: "અપાર ધૈર્યવાન / અતિ સહનશીલ"
    },
    explanation: {
      en: "The Patient One who does not haste to execute wrath against wrongdoers, granting them endless chances to seek forgiveness.",
      hi: "वह जिसका सब्र असीम है, जो गुनाहगारों को सज़ा देने में जल्दबाज़ी नहीं करता बल्कि माफ़ी की मोहलत देता है।",
      gu: "જેનું ધૈર્ય અસીમ છે, જે પાપીઓને દંડ આપવામાં ઉતાવળ નથી કરતો પરંતુ પસ્તાવાની તક આપે છે."
    },
    quranReference: "Surah Al-Baqarah 2:153, Surah An-Nahl 16:127",
    audioUrl: 'https://cdn.islamic.network/names/audio/99.mp3'
  }
];

/**
 * Filter names of Allah by query (search English, Arabic, Hindi, Gujarati, or number)
 */
export function searchDivineNames(query: string): DivineName[] {
  if (!query.trim()) return NAMES_OF_ALLAH;
  const q = query.toLowerCase().trim();
  return NAMES_OF_ALLAH.filter(n =>
    n.number.toString() === q ||
    n.transliteration.toLowerCase().includes(q) ||
    n.arabic.includes(q) ||
    n.meaning.en.toLowerCase().includes(q) ||
    n.meaning.hi.includes(q) ||
    n.meaning.gu.includes(q) ||
    n.explanation.en.toLowerCase().includes(q)
  );
}

/**
 * Get Name of the Day based on day of year
 */
export function getNameOfTheDay(): DivineName {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const index = (dayOfYear - 1) % NAMES_OF_ALLAH.length;
  return NAMES_OF_ALLAH[Math.max(0, index)];
}
