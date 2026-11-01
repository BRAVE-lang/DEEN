import fs from 'fs';
import path from 'path';

// Construct all 99 Names of Allah with canonical scholarship
const rawNames = [
  {
    num: 1, ar: 'الرَّحْمَنُ', trans: 'Ar-Rahman',
    en: 'The Most Gracious / The Entirely Merciful',
    hi: 'अत्यंत दयालु / बेहद मेहरबान',
    gu: 'અત્યંત દયાળુ / પરમ કૃપાળુ',
    exp_en: 'The One whose boundless mercy encompasses all creation in this world, giving life, sustenance, and guidance to all creatures without exception.',
    exp_hi: 'वह जिसकी असीम दया दुनिया की हर मख़लूक़ को घेरे हुए है, जो बिना किसी भेदभाव के सबको रिज़्क़ और ज़िन्दगी देता है।',
    exp_gu: 'જેની અસીમ દયા આ દુનિયાની સમગ્ર રચનાને ઘેરી લે છે, જે કોઈ પણ ભેદભાવ વિના દરેક જીવને રોજી અને જીવન આપે છે.',
    ref: 'Surah Al-Fatihah 1:1, Surah Ar-Rahman 55:1'
  },
  {
    num: 2, ar: 'الرَّحِيمُ', trans: 'Ar-Raheem',
    en: 'The Especially Merciful',
    hi: 'निहायत रहम फ़रमाने वाला',
    gu: 'ખાસ રહમત કરનાર',
    exp_en: 'The One who bestows continuous, specialized mercy upon the believers, guiding them in faith and rewarding them with eternal Paradise.',
    exp_hi: 'वह जो ईमान वालों पर अपनी ख़ास रहमत बरसाता है और आख़िरत में उन्हें जन्नत का अनन्त सवाब अता करेगा।',
    exp_gu: 'જે મોમિન (વિશ્વાસુઓ) પર વિશેષ રહમત વરસાવે છે અને આખિરતમાં તેઓને કાયમી જન્નતથી નવાજશે.',
    ref: 'Surah Al-Fatihah 1:3, Surah Al-Baqarah 2:143'
  },
  {
    num: 3, ar: 'الْمَلِكُ', trans: 'Al-Malik',
    en: 'The Sovereign Lord / The Absolute King',
    hi: 'हक़ीक़ी बादशाह / सारे जहान का मालिक',
    gu: 'સાચો રાજા / સમગ્ર સૃષ્ટિનો માલિક',
    exp_en: 'The Absolute Ruler and Master of the universe, who needs nothing and without whom nothing can exist. All sovereignty belongs to Him alone.',
    exp_hi: 'सारे ब्रह्मांड का सच्चा और मुस्तक़िल बादशाह, जिसे किसी की ज़रूरत नहीं और जिसके बिना कोई वजूद में नहीं रह सकता।',
    exp_gu: 'સમગ્ર બ્રહ્માંડનો સર્વોચ્ચ શાસક અને સાચો માલિક, જેને કોઈની જરૂર નથી અને જેના વિના કોઈ અસ્તિત્વમાં રહી શકતું નથી.',
    ref: 'Surah Al-Hashr 59:23, Surah Al-Mu’minun 23:116'
  },
  {
    num: 4, ar: 'الْقُدُّوسُ', trans: 'Al-Quddus',
    en: 'The Pure One / The Holy',
    hi: 'निहायत पाक / हर ऐब से मुबर्रा',
    gu: 'અતિ પવિત્ર / તમામ ખામીઓથી મુક્ત',
    exp_en: 'The Absolutely Pure, completely free from any imperfection, error, deficiency, or partner.',
    exp_hi: 'वह जो हर क़िस्म की कमी, नुक़्स और कमज़ोरी से बिल्कुल पाक और साफ़ है।',
    exp_gu: 'જે તમામ પ્રકારની ખામી, નબળાઈ કે અપૂર્ણતાથી સંપૂર્ણપણે પવિત્ર અને મુક્ત છે.',
    ref: 'Surah Al-Jumu’ah 62:1, Surah Al-Hashr 59:23'
  },
  {
    num: 5, ar: 'السَّلاَمُ', trans: 'As-Salam',
    en: 'The Source of Peace and Perfection',
    hi: 'सलामती देने वाला / अमन का स्रोत',
    gu: 'શાંતિનો સ્ત્રોત / સલામતી આપનાર',
    exp_en: 'The Source of all peace and safety, free from any harm or defect, who grants serenity and ultimate peace to His servants in this world and the Hereafter.',
    exp_hi: 'वह जो तमाम नुक़सानों और ऐबों से सलामत है और अपने बन्दों को दुनिया और आख़िरत में अमन और सलामती बख़्शता है।',
    exp_gu: 'જે તમામ નુકસાન અને ખામીઓથી મુક્ત છે અને પોતાના બંદાઓને આ લોક અને પરલોકમાં શાંતિ અને સલામતી અર્પે છે.',
    ref: 'Surah Al-Hashr 59:23'
  },
  {
    num: 6, ar: 'الْمُؤْمِنُ', trans: 'Al-Mu’min',
    en: 'The Guardian of Faith / The Giver of Security',
    hi: 'अमन व अमान देने वाला / यक़ीन बख़्शने वाला',
    gu: 'સુરક્ષા આપનાર / વિશ્વાસ બક્ષનાર',
    exp_en: 'The One who grants security and tranquility to His creation, who keeps His promises to His servants and protects them from injustice.',
    exp_hi: 'वह जो अपने बन्दों को खौफ़ से अमन देता है, अपने वादों को सच्चा साबित करता है और किसी पर ज़ुल्म नहीं करता।',
    exp_gu: 'જે પોતાના બંદાઓને ભયથી મુક્તિ અને શાંતિ આપે છે, વચનો પૂર્ણ કરે છે અને કદી અન્યાય કરતો નથી.',
    ref: 'Surah Al-Hashr 59:23'
  },
  {
    num: 7, ar: 'الْمُهَيْمِنُ', trans: 'Al-Muhaymin',
    en: 'The Sustaining Protector / The Preserver of Safety',
    hi: 'निगहबान / पूरी तरह हिफ़ाज़त करने वाला',
    gu: 'રક્ષક / સદાય દેખરેખ રાખનાર',
    exp_en: 'The Supreme Overseer who witnesses all actions, preserves all deeds, and guards all creation with unfailing vigilance.',
    exp_hi: 'वह जो हर चीज़ की निगरानी करता है, सब कामों का गवाह है और अपनी मख़लूक़ की मुकम्मल हिफ़ाज़त फ़रमाता है।',
    exp_gu: 'જે સર્વ કાર્યોનો સાક્ષી છે અને સમગ્ર સૃષ્ટિની પરિપૂર્ણ સંભાળ અને રક્ષણ રાખે છે.',
    ref: 'Surah Al-Hashr 59:23'
  },
  {
    num: 8, ar: 'الْعَزِيزُ', trans: 'Al-Aziz',
    en: 'The All-Mighty / The Invulnerable',
    hi: 'ग़ालिब व ज़बरदस्त / सब पर हावी',
    gu: 'સર્વશક્તિમાન / અજેય સત્તાધીશ',
    exp_en: 'The Mighty One whom none can overcome, whose strength is invincible and whose honor is inviolable.',
    exp_hi: 'वह ज़बरदस्त ताक़तवर जिसकी बराबरी कोई नहीं कर सकता और जिस पर कोई ग़ालिब नहीं आ सकता।',
    exp_gu: 'તે મહાન શક્તિશાળી જેની બરાબરી કોઈ કરી શકતું નથી અને જેને કોઈ હરાવી શકતું નથી.',
    ref: 'Surah Al-Hashr 59:23, Surah Al-Imran 3:6'
  },
  {
    num: 9, ar: 'الْجَبَّارُ', trans: 'Al-Jabbar',
    en: 'The Compeller / The Restorer of Broken Hearts',
    hi: 'ज़बरदस्त / टूटे दिलों को जोड़ने वाला',
    gu: 'સર્વોપરી / તૂટેલા હૃદયોને સાંત્વના આપનાર',
    exp_en: 'The Omnipotent who restores the weak, mends the broken, and accomplishes His divine will over all without resistance.',
    exp_hi: 'वह जो टूटे हुए दिलों और कमज़ोरों की हालत सुधारता है और जिसकी मर्ज़ी के आगे सब बेबस हैं।',
    exp_gu: 'જે ભાંગેલા હૃદયોને સાજા કરે છે, દુર્બળોને બળ આપે છે અને જેની ઈચ્છા સર્વોપરી છે.',
    ref: 'Surah Al-Hashr 59:23'
  },
  {
    num: 10, ar: 'الْمُتَكَبِّرُ', trans: 'Al-Mutakabbir',
    en: 'The Supremely Great / The Majestic',
    hi: 'बड़ाई और बुज़ुर्गी वाला',
    gu: 'મહાનતા અને ગૌરવના સ્વામી',
    exp_en: 'The One who is truly great, above every imperfection; true majesty belongs exclusively to Him alone.',
    exp_hi: 'वह जो हर बड़ाई और बुज़ुर्गी का हक़ीक़ी मालिक है और तकब्बुर सिर्फ़ उसी की ज़ात को ज़ेब देता है।',
    exp_gu: 'જે સર્વોચ્ચ ગૌરવનો સાચો માલિક છે અને તમામ પ્રકારની અપૂર્ણતાથી પર છે.',
    ref: 'Surah Al-Hashr 59:23'
  },
  {
    num: 11, ar: 'الْخَالِقُ', trans: 'Al-Khaliq',
    en: 'The Creator / The Maker',
    hi: 'पैदा करने वाला / रचयिता',
    gu: 'સર્જનહાર / ઉત્પન્ન કરનાર',
    exp_en: 'The Creator who brings everything into existence from absolute nothingness, designing it according to His divine measure.',
    exp_hi: 'वह जिसने हर चीज़ को अदम (शून्यता) से वजूद बख़्शा और उसे एक ख़ास अंदाज़े पर बनाया।',
    exp_gu: 'જેણે શૂન્યમાંથી સમગ્ર બ્રહ્માંડનું સર્જન કર્યું અને દરેક વસ્તુને ચોક્કસ માપથી ઘડી.',
    ref: 'Surah Al-Hashr 59:24, Surah Ar-Ra’d 13:16'
  },
  {
    num: 12, ar: 'الْبَارِئُ', trans: 'Al-Bari’',
    en: 'The Maker of Order / The Evolver',
    hi: 'ठीक-ठीक बनाने वाला / तख़लीक़कार',
    gu: 'સંપૂર્ણ આકાર આપનાર સર્જક',
    exp_en: 'The Originator who fashions and evolves creation with distinct forms, harmonious proportions, and flawless functionality.',
    exp_hi: 'वह जो अपनी मख़लूक़ को बेजोड़ हुस्न और तनासुब (समानुपात) के साथ बिना किसी कमी के बनाता है।',
    exp_gu: 'જે દરેક રચનાને સુસંગતતા, સુંદરતા અને સંપૂર્ણતા સાથે અસ્તિત્વ આપે છે.',
    ref: 'Surah Al-Hashr 59:24'
  },
  {
    num: 13, ar: 'الْمُصَوِّرُ', trans: 'Al-Musawwir',
    en: 'The Fashioner of Forms',
    hi: 'सूरत और शक्ल देने वाला',
    gu: 'રૂપ અને આકાર આપનાર',
    exp_en: 'The Supreme Artist who bestows unique shapes, features, colors, and physical attributes to every single creature.',
    exp_hi: 'वह जिसने हर मख़लूक़ को एक मुनफ़रिद (अनोखी) सूरत, रंग और बनावट अता की।',
    exp_gu: 'જેણે દરેક જીવને અનન્ય રૂપ, રંગ અને વિશિષ્ટ આકાર પ્રદાન કર્યા.',
    ref: 'Surah Al-Hashr 59:24'
  },
  {
    num: 14, ar: 'الْغَفَّارُ', trans: 'Al-Ghaffar',
    en: 'The Perpetual Forgiver',
    hi: 'बार-बार बख़्शने वाला / क्षमाशील',
    gu: 'વારંવાર માફી આપનાર / અત્યંત ક્ષમાવાન',
    exp_en: 'The One who repeatedly and abundantly forgives the sins of His servants, concealing their faults and sparing them from punishment.',
    exp_hi: 'वह जो अपने बन्दों के गुनाहों को बार-बार माफ़ करता है, उनके ऐबों पर पर्दा डालता है।',
    exp_gu: 'જે ભક્તોના ગુનાહોને વારંવાર માફ કરે છે અને તેમની ભૂલો પર પડદો નાખે છે.',
    ref: 'Surah Nuh 71:10, Surah Taha 20:82'
  },
  {
    num: 15, ar: 'الْقَهَّارُ', trans: 'Al-Qahhar',
    en: 'The Subduer / The All-Dominant',
    hi: 'सब पर ग़ालिब / पूरी तरह क़ाबू रखने वाला',
    gu: 'સર્વ પર પ્રભુત્વ ધરાવનાર',
    exp_en: 'The All-Dominant before whose divine majesty and power everything in the heavens and earth yields and surrenders.',
    exp_hi: 'वह जिसका हर चीज़ पर मुकम्मल क़ाबू है और जिसके जलाल के आगे सारी कायनात झुकी हुई है।',
    exp_gu: 'જેના પ્રતાપ અને શક્તિ સામે આકાશ અને પૃથ્વીની દરેક વસ્તુ નમન કરે છે.',
    ref: 'Surah Ar-Ra’d 13:16, Surah Az-Zumar 39:4'
  },
  {
    num: 16, ar: 'الْوَهَّابُ', trans: 'Al-Wahhab',
    en: 'The Supreme Bestower',
    hi: 'मुफ़्त अता करने वाला / परम दाता',
    gu: 'અખૂટ દાન આપનાર / પરમ દાતા',
    exp_en: 'The Generous Giver who bestows gifts, mercy, and blessings freely and unconditionally without expecting any return.',
    exp_hi: 'वह जो बिना किसी बदले या स्वार्थ के अपनी नेमतें और रहमतें बन्दों पर लुटाता है।',
    exp_gu: 'જે કોઈ પણ બદલાની અપેક્ષા રાખ્યા વિના પોતાના આશીર્વાદ અને કૃપા નિઃશુલ્ક આપે છે.',
    ref: 'Surah Al-Imran 3:8, Surah Sad 38:9'
  },
  {
    num: 17, ar: 'الرَّزَّاقُ', trans: 'Ar-Razzaq',
    en: 'The Total Provider',
    hi: 'रिज़्क़ (आजीविका) देने वाला / अन्नदाता',
    gu: 'રોજી અને આજીવિકા આપનાર',
    exp_en: 'The Provider who creates and guarantees sustenance for every living soul—both physical nourishment and spiritual illumination.',
    exp_hi: 'वह जो तमाम मख़लूक़ात को जिस्मानी और रूहानी दोनों क़िस्म का रिज़्क़ अता करता है।',
    exp_gu: 'જે તમામ જીવોને શારીરિક પોષણ અને આત્મિક આહાર સતત પૂરો પાડે છે.',
    ref: 'Surah Adh-Dhariyat 51:58'
  },
  {
    num: 18, ar: 'الْفَتَّاحُ', trans: 'Al-Fattah',
    en: 'The Opener / The Supreme Judge',
    hi: 'मुश्किलें खोलने वाला / हक़ का फ़ैसला करने वाला',
    gu: 'માર્ગો ખોલનાર / સાચો ન્યાયાધીશ',
    exp_en: 'The Opener who unlocks locked doors of mercy, guidance, knowledge, and victory, and judges truthfully between His creation.',
    exp_hi: 'वह जो बन्द दरवाज़ों को खोलता है, दिलों में हिदायत का रास्ता बनाता है और इंसाफ़ से फ़ैसला फ़रमाता है।',
    exp_gu: 'જે મુશ્કેલીઓના બંધ દ્વાર ખોલે છે, જ્ઞાન અને રહમતના દરવાજા ઉઘાડે છે.',
    ref: 'Surah Saba 34:26'
  },
  {
    num: 19, ar: 'الْعَلِيمُ', trans: 'Al-Aleem',
    en: 'The All-Knowing / Omniscient',
    hi: 'सब कुछ जानने वाला / सर्वज्ञ',
    gu: 'સર્વજ્ઞ / બધું જ જાણનાર',
    exp_en: 'The Omniscient whose comprehensive knowledge encompasses every atom, thought, past, present, future, and the unseen.',
    exp_hi: 'वह जिसका इल्म हर चीज़ को घेरे हुए है; दिलों के राज़, गुज़रे हुए ज़माने और भविष्य की हर बात जानता है।',
    exp_gu: 'જેનું જ્ઞાન સમગ્ર બ્રહ્માંડ, છૂપા વિચારો, ભૂતકાળ અને ભવિષ્યને સંપૂર્ણપણે સમાવી લે છે.',
    ref: 'Surah Al-Baqarah 2:115, Surah Al-An’am 6:59'
  },
  {
    num: 20, ar: 'الْقَابِضُ', trans: 'Al-Qabid',
    en: 'The Constrictor / The Withholder',
    hi: 'तंग करने वाला / क़ब्ज़े में लेने वाला',
    gu: 'સંકોચનાર / સીમિત કરનાર',
    exp_en: 'The One who withholds or restricts sustenance, souls, or ease according to divine wisdom and justice to test His creation.',
    exp_hi: 'वह जो अपनी हिकमत से रिज़्क़ या खुशियों को तंग करता है ताकि बन्दों की आज़माइश करे।',
    exp_gu: 'જે પોતાની દૈવી બુદ્ધિથી કસોટી માટે રોજી કે સુવિધાઓ સીમિત કરે છે.',
    ref: 'Surah Al-Baqarah 2:245'
  },
  {
    num: 21, ar: 'الْبَاسِطُ', trans: 'Al-Basit',
    en: 'The Expander / The Reliever',
    hi: 'कुशादगी देने वाला / फ़ैलाने वाला',
    gu: 'વિસ્તારનાર / પ્રફુલ્લિત કરનાર',
    exp_en: 'The One who expands sustenance, generous provisions, and spiritual joy in the hearts of His servants.',
    exp_hi: 'वह जो दिलों को खोलता है और अपनी रहमत व रिज़्क़ में बेहिसाब वुसअत (फैलाव) अता करता है।',
    exp_gu: 'જે રોજી, ખુશીઓ અને દિલની શાંતિમાં વિપુલતા અને વિસ્તાર બક્ષે છે.',
    ref: 'Surah Al-Baqarah 2:245, Surah Ash-Shura 42:27'
  },
  {
    num: 22, ar: 'الْخَافِضُ', trans: 'Al-Khafid',
    en: 'The Abaser / The Humbler',
    hi: 'पस्त करने वाला / गिराने वाला',
    gu: 'અહંકારીઓને નીચા પાડનાર',
    exp_en: 'The One who lowers the arrogant, the tyrants, and the rejectors of truth, diminishing their earthly power and status.',
    exp_hi: 'वह जो ज़ालिमों, सरकशों और मगरूरों को ज़लील व रुसवा करके गिरा देता है।',
    exp_gu: 'જે ઘમંડીઓ, અત્યાચારીઓ અને અસત્યના માર્ગે ચાલનારાઓને નીચા પાડે છે.',
    ref: 'Surah Al-Waqi’ah 56:3'
  },
  {
    num: 23, ar: 'الرَّافِعُ', trans: 'Ar-Rafi’',
    en: 'The Exalter / The Elevator',
    hi: 'बुलन्द करने वाला / रुतबा बढ़ाने वाला',
    gu: 'સન્માન અને દરજ્જો વધારનાર',
    exp_en: 'The One who raises the ranks of the believers, the righteous, and the humble in both this world and the eternal Hereafter.',
    exp_hi: 'वह जो नेक बन्दों और आजिज़ी करने वालों के दरजात दुनिया और आख़िरत में बुलन्द करता है।',
    exp_gu: 'જે નમ્ર અને સદાચારી ભક્તોના દરજ્જા આ દુનિયા અને પરલોકમાં ઊંચા કરે છે.',
    ref: 'Surah Al-An’am 6:165, Surah Al-Mujadila 58:11'
  },
  {
    num: 24, ar: 'الْمُعِزُّ', trans: 'Al-Mu’izz',
    en: 'The Bestower of Honour',
    hi: 'इज़्ज़त देने वाला / मान-सम्मान दाता',
    gu: 'માન-સન્માન અને પ્રતિષ્ઠા આપનાર',
    exp_en: 'The Giver of true honor and dignity, strengthening those who obey Him with spiritual majesty and righteousness.',
    exp_hi: 'वह जो जिसे चाहे अपनी इताअत की तौफ़ीक़ देकर इज़्ज़त और शराफ़त अता फ़रमाता है।',
    exp_gu: 'જે જેને ઇચ્છે તેને સાચું સન્માન, પ્રતિષ્ઠા અને આદર બક્ષે છે.',
    ref: 'Surah Al-Imran 3:26'
  },
  {
    num: 25, ar: 'الْمُذِلُّ', trans: 'Al-Mudhill',
    en: 'The Giver of Dishonour',
    hi: 'ज़िल्लत देने वाला / अपमानित करने वाला',
    gu: 'અન્યાયીઓને અપમાનિત કરનાર',
    exp_en: 'The One who humiliates the rebellious and proud by exposing their falsehood and stripping them of dignity.',
    exp_hi: 'वह जो नाफ़रमानों और तकब्बुर करने वालों को उनके बुरे आमाल के सबब ज़लील करता है।',
    exp_gu: 'જે અહંકારીઓ અને પાપીઓને તેમના કર્મોને લીધે અપમાનિત કરે છે.',
    ref: 'Surah Al-Imran 3:26'
  },
  {
    num: 26, ar: 'السَّمِيعُ', trans: 'As-Sami’',
    en: 'The All-Hearing',
    hi: 'सब कुछ सुनने वाला / सर्वश्रोता',
    gu: 'સર્વ સાંભળનાર / અંતરનો નાદ સુણનાર',
    exp_en: 'The One who hears every sound, whisper, silent prayer, and heartbeat across the universe without impediment.',
    exp_hi: 'वह जो हर आवाज़, हर कानाफूसी और दिलों की ख़ामोश पुकार को साफ़ सुनता है।',
    exp_gu: 'જે દરેક અવાજ, ધીમો ગણગણાટ અને હૃદયની મૌન પ્રાર્થના સંપૂર્ણપણે સાંભળે છે.',
    ref: 'Surah Al-Baqarah 2:127, Surah Ash-Shura 42:11'
  },
  {
    num: 27, ar: 'الْبَصِيرُ', trans: 'Al-Baseer',
    en: 'The All-Seeing',
    hi: 'सब कुछ देखने वाला / सर्वदृष्टा',
    gu: 'સર્વ નિહાળનાર / સર્વદ્રષ્ટા',
    exp_en: 'The One who observes everything in creation—seen and unseen, in the deepest oceans and darkest nights.',
    exp_hi: 'वह जो हर बारीक से बारीक चीज़ और अंधेरी रात में काले पत्थर पर चलने वाली चींटी को भी देखता है।',
    exp_gu: 'જે પ્રત્યક્ષ અને અપ્રત્યક્ષ સર્વ વસ્તુઓને પૂર્ણ સ્પષ્ટતા સાથે નિહાળે છે.',
    ref: 'Surah Al-Hujurat 49:18, Surah Al-Mulk 67:19'
  },
  {
    num: 28, ar: 'الْحَكَمُ', trans: 'Al-Hakam',
    en: 'The Supreme Arbiter / The Judge',
    hi: 'हक़ीक़ी मुंसिफ़ / सबसे बड़ा फ़ैसलाकुन',
    gu: 'સર્વોચ્ચ ન્યાયાધીશ / પંચ',
    exp_en: 'The Ultimate Judge whose decree cannot be overturned, whose justice is absolute and devoid of any bias.',
    exp_hi: 'सच्चा इंसाफ़ करने वाला हाकिम, जिसके फ़ैसले को कोई रद्द नहीं कर सकता।',
    exp_gu: 'જેના ન્યાયિક ચુકાદાને કોઈ ઉલટાવી શકતું નથી, જેનો ન્યાય પરિપૂર્ણ છે.',
    ref: 'Surah Al-An’am 6:114'
  },
  {
    num: 29, ar: 'الْعَدْلُ', trans: 'Al-Adl',
    en: 'The Utterly Just',
    hi: 'सच्चा इंसाफ़ करने वाला / न्यायप्रिय',
    gu: 'સંપૂર્ણ ન્યાયી / પરમ ન્યાયવાન',
    exp_en: 'The Embodiment of perfect justice and equity, who wrongs no one by even the weight of a mustard seed.',
    exp_hi: 'इंसाफ़ की मूरत जो कभी किसी पर ज़र्रा बराबर भी ज़ुल्म नहीं करता।',
    exp_gu: 'ન્યાયનું મૂર્તિમંત સ્વરૂપ, જે રજકણ જેટલો પણ કોઈ પર અન્યાય કરતો નથી.',
    ref: 'Surah Al-An’am 6:115'
  },
  {
    num: 30, ar: 'اللَّطِيفُ', trans: 'Al-Lateef',
    en: 'The Subtly Kind / The Most Delicate',
    hi: 'निहायत बारीकबीन और मेहरबान',
    gu: 'અતિ સૂક્ષ્મદ્રષ્ટા અને સ્નેહાળ',
    exp_en: 'The One who knows the finest subtleties of all things and treats His servants with delicate, hidden kindness.',
    exp_hi: 'वह जो हर बारीक राज़ को जानता है और अपने बन्दों पर ऐसे गुप्त तरीक़ों से रहम फ़रमाता है जिसका वे गुमान भी नहीं कर सकते।',
    exp_gu: 'જે સર્વ સૂક્ષ્મ રહસ્યોથી માહિતગાર છે અને પોતાના ભક્તો પર અગમ્ય રીતે કૃપા વરસાવે છે.',
    ref: 'Surah Al-Mulk 67:14, Surah Al-An’am 6:103'
  },
  {
    num: 31, ar: 'الْخَبِيرُ', trans: 'Al-Khabeer',
    en: 'The All-Aware',
    hi: 'हर बात की ख़बर रखने वाला / सर्व-જ્ઞાતા',
    gu: 'સર્વથી માહિતગાર / ખબરદાર',
    exp_en: 'The One from whose knowledge nothing is concealed, knowing the inner realities and consequences of all affairs.',
    exp_hi: 'वह जिससे कोई भेद छिपा नहीं, जो हर बात की अंदरूनी हक़ीक़त से पूरी तरह बाख़बर है।',
    exp_gu: 'જેનાથી કોઈ રહસ્ય છૂપું નથી, જે દરેક કાર્યની આંતરિક વાસ્તવિકતા જાણે છે.',
    ref: 'Surah Al-An’am 6:18, Surah Luqman 31:34'
  },
  {
    num: 32, ar: 'الْحَلِيمُ', trans: 'Al-Haleem',
    en: 'The Most Forbearing',
    hi: 'बुर्दबार / सहनशील और सब्र करने वाला',
    gu: 'અત્યંત સહનશીલ / ધૈર્યવાન',
    exp_en: 'The One who does not rush to punish His servants for their transgressions, giving them opportunity to repent.',
    exp_hi: 'वह जो बन्दों की ग़लतियों पर फ़ौरन पकड़ नहीं फ़रमाता बल्कि उन्हें तौबा का मौक़ा देता है।',
    exp_gu: 'જે ગુનાહો છતાં તરત જ સજા આપતો નથી પરંતુ ક્ષમા અને સુધરવાની તક આપે છે.',
    ref: 'Surah Al-Baqarah 2:225, Surah Al-Isra 17:44'
  },
  {
    num: 33, ar: 'الْعَظِيمُ', trans: 'Al-Azeem',
    en: 'The Magnificent / The Supreme',
    hi: 'बड़ी अज़मत वाला / महान और भव्य',
    gu: 'મહાન ગૌરવશાળી / સર્વોચ્ચ ભવ્ય',
    exp_en: 'The One of absolute greatness, majesty, and glory, whose magnificent essence transcends all imagination.',
    exp_hi: 'वह जिसकी बुज़ुर्गी और अज़मत की कोई हद नहीं, जिसकी शान इंसानी समझ से बहुत ऊंची है।',
    exp_gu: 'જેની ભવ્યતા અને ગૌરવ અસીમ છે, જેની મહાનતા માનવીય કલ્પનાથી પર છે.',
    ref: 'Surah Al-Baqarah 2:255 (Ayat al-Kursi), Surah Ash-Shura 42:4'
  },
  {
    num: 34, ar: 'الْغَفُورُ', trans: 'Al-Ghafoor',
    en: 'The Great Forgiver',
    hi: 'बड़ा बख़्शने वाला / क्षमादाता',
    gu: 'વિશાળ ક્ષમા આપનાર',
    exp_en: 'The One who forgives extensively, enveloping sins in His vast veil of pardon and cleansing the penitent.',
    exp_hi: 'वह जिसकी मग़फ़िरत (माफ़ी) बहुत विशाल है, जो सच्चे दिल से तौबा करने वाले के बड़े-बड़े गुनाह माफ़ कर देता है।',
    exp_gu: 'જેની ક્ષમા અપાર છે, જે પસ્તાવો કરનાર ભક્તોના તમામ પાપો ભૂંસી નાખે છે.',
    ref: 'Surah Az-Zumar 39:53, Surah Al-Baqarah 2:218'
  },
  {
    num: 35, ar: 'الشَّكُورُ', trans: 'Ash-Shakoor',
    en: 'The Most Appreciative / The Rewarding',
    hi: 'क़द्रदान / थोड़ी नेकी पर बड़ा सवाब देने वाला',
    gu: 'સતકર્મોની કદર કરનાર / પુષ્કળ ફળ આપનાર',
    exp_en: 'The One who appreciates and generously multiplies the rewards for even the smallest good deeds done for His sake.',
    exp_hi: 'वह जो बन्दे के छोटे से अच्छे अमल की भी पूरी क़द्र फ़रमाता है और कई गुना बदला देता है।',
    exp_gu: 'જે ભક્તના નાનામાં નાના સત્કાર્યની પણ કદર કરે છે અને તેનો અગણિત બદલો આપે છે.',
    ref: 'Surah Fatir 35:30, Surah At-Taghabun 64:17'
  },
  {
    num: 36, ar: 'الْعَلِيُّ', trans: 'Al-Aliyy',
    en: 'The Most High / The Exalted',
    hi: 'सबसे आला व बुलन्द / सर्वोच्च',
    gu: 'સર્વોચ્ચ / પરાત્પર',
    exp_en: 'The Exalted One whose status, power, and essence are elevated above all creation in rank and perfection.',
    exp_hi: 'वह जो अपनी ज़ात, सिफ़ात और मक़ाम में तमाम कायनात से बुलन्द व बाला है।',
    exp_gu: 'જે પોતાના સ્થાન, શક્તિ અને અસ્તિત્વમાં સમગ્ર સૃષ્ટિ કરતાં સર્વોચ્ચ છે.',
    ref: 'Surah Al-Baqarah 2:255, Surah Al-A’la 87:1'
  },
  {
    num: 37, ar: 'الْكَبِيرُ', trans: 'Al-Kabeer',
    en: 'The Most Great',
    hi: 'बड़ी शान वाला / सबसे बड़ा',
    gu: 'અતિ મહાન / સર્વોત્કૃષ્ટ',
    exp_en: 'The Immeasurably Great One, whose grandeur is vast beyond conception and to whom all pride submits.',
    exp_hi: 'वह जिसकी बड़ाई की कोई थाह नहीं, जिसके जलाल के सामने दुनिया की हर चीज़ तुच्छ है।',
    exp_gu: 'જે અનહદ મહાન છે, જેના પ્રતાપ આગળ તમામ અહંકાર ઓગળી જાય છે.',
    ref: 'Surah Ar-Ra’d 13:9, Surah Al-Hajj 22:62'
  },
  {
    num: 38, ar: 'الْحَفِيظُ', trans: 'Al-Hafeez',
    en: 'The Preserver / The Guardian',
    hi: 'निगहबान व मुहाफ़िज़ / रक्षक',
    gu: 'સર્વરક્ષક / રક્ષણ કરનાર',
    exp_en: 'The Vigilant Protector who preserves the universe from chaos, protects His servants, and records all their deeds.',
    exp_hi: 'वह जो ज़मीन व आसमान की हर चीज़ की हिफ़ाज़त करता है और बन्दों के आमाल महफ़ूज़ रखता है।',
    exp_gu: 'જે સમગ્ર બ્રહ્માંડનું સંતુલન જાળવે છે અને દરેક જીવનું રક્ષણ કરે છે.',
    ref: 'Surah Hud 11:57, Surah Saba 34:21'
  },
  {
    num: 39, ar: 'الْمُقِيتُ', trans: 'Al-Muqeet',
    en: 'The Sustainer / The Maintainer',
    hi: 'क़ूवत व ग़िज़ा देने वाला / पालनहार',
    gu: 'શક્તિ અને આહાર પ્રદાતા / પોષક',
    exp_en: 'The Giver of essential nourishment, physical strength, and sustenance that keeps all living entities alive.',
    exp_hi: 'वह जो हर जानदार को जीने के लिए ज़रूरी ताक़त और ग़िज़ा मुहैया करता है।',
    exp_gu: 'જે દરેક જીવને ટકી રહેવા માટે જરૂરી પોષણ અને જીવનશક્તિ અર્પે છે.',
    ref: 'Surah An-Nisa 4:85'
  },
  {
    num: 40, ar: 'الْحَسِيبُ', trans: 'Al-Haseeb',
    en: 'The Reckoner / The Sufficient',
    hi: 'हिसाब लेने वाला / काफ़ी होने वाला',
    gu: 'હિસાબ લેનાર / પૂરતો આધાર',
    exp_en: 'The One who is completely sufficient for those who rely upon Him, and who accounts for all deeds with exactness.',
    exp_hi: 'वह जो अपने भरोसेमंद बन्दों के लिए काफ़ी है और क़ियामत के दिन हर आमाल का बारीक हिसाब लेगा।',
    exp_gu: 'જે પોતાના પર ભરોસો રાખનારાઓ માટે પૂરતો છે અને ન્યાયના દિવસે સચોટ હિસાબ લેશે.',
    ref: 'Surah An-Nisa 4:6, Surah Al-Ahzab 33:39'
  },
  {
    num: 41, ar: 'الْجَلِيلُ', trans: 'Al-Jaleel',
    en: 'The Sublime / The Majestic',
    hi: 'बुज़ुर्गी और जलाल वाला',
    gu: 'અતિ તેજસ્વી અને પ્રતાપી',
    exp_en: 'The Possessor of profound majesty, greatness, and moral sublimity before whom hearts fill with reverence.',
    exp_hi: 'वह जिसकी ज़ात में बेमिसाल हुस्न, जलाल और बुज़ुर्गी है, जिसे देखकर दिल अदब से झुक जाते हैं।',
    exp_gu: 'જે અસીમ પ્રતાપ અને ગરિમાના સ્વામી છે, જેમના ગૌરવથી હૃદય ભક્તિભાવથી ભરાઈ જાય છે.',
    ref: 'Surah Ar-Rahman 55:27'
  },
  {
    num: 42, ar: 'الْكَرِيمُ', trans: 'Al-Kareem',
    en: 'The Most Generous / The Bountiful',
    hi: 'बड़ा करम करने वाला / परम उदार',
    gu: 'પરમ ઉદાર / અખૂટ કૃપાવાન',
    exp_en: 'The Abundantly Generous who gives without being asked, forgives with mercy, and fulfills every promise generously.',
    exp_hi: 'वह जो बिना मांगे भी अपनी रहमतें लुटाता है और क़सूरवारों को बख़्श कर उन पर मेहरबानी करता है।',
    exp_gu: 'જે માંગ્યા વિના પણ પોતાની કૃપા વરસાવે છે અને દોષિતોને ક્ષમા કરી ઉદારતા દાખવે છે.',
    ref: 'Surah Al-Infitar 82:6, Surah An-Naml 27:40'
  },
  {
    num: 43, ar: 'الرَّقِيبُ', trans: 'Ar-Raqeeb',
    en: 'The Watchful / The All-Observant',
    hi: 'निगरानी रखने वाला / देखरेख करने वाला',
    gu: 'સદાય નજર રાખનાર / જાગૃત પ્રહરી',
    exp_en: 'The All-Observant from whose sight not a single motion, heartbeat, or whisper in the entire cosmos escapes.',
    exp_hi: 'वह जो हर लम्हा अपनी मख़लूक़ पर नज़र रखता है और कोई हरकत उससे ओझल नहीं हो सकती।',
    exp_gu: 'જે પ્રત્યેક ક્ષણે સર્વ જીવો પર સજાગ નજર રાખે છે, જેનાથી કશુંય અજાણ્યું નથી.',
    ref: 'Surah An-Nisa 4:1, Surah Al-Ma’idah 5:117'
  },
  {
    num: 44, ar: 'الْمُجِيبُ', trans: 'Al-Mujeeb',
    en: 'The Responsive / Answerer of Prayers',
    hi: 'दुआएं क़ुबूल करने वाला / पुकार सुनने वाला',
    gu: 'પ્રાર્થના સ્વીકારનાર / ઉત્તર આપનાર',
    exp_en: 'The One who responds to the supplications of those in distress, answering their prayers according to His wisdom.',
    exp_hi: 'वह जो परेशान हाल बन्दों की फ़रियाद सुनता है और उनकी दुआओं को अपनी हिकमत से क़ुबूल फ़रमाता है।',
    exp_gu: 'જે મુસીબતમાં પડેલા ભક્તોની પોકાર સાંભળે છે અને તેમની દુઆઓ સ્વીકારે છે.',
    ref: 'Surah Hud 11:61'
  },
  {
    num: 45, ar: 'الْوَاسِعُ', trans: 'Al-Wasi’',
    en: 'The All-Encompassing / The Boundless',
    hi: 'कुशादा / असीम दया व ज्ञान वाला',
    gu: 'અસીમ / સર્વવ્યાપી ક્ષમતાવાળા',
    exp_en: 'The Boundless whose capacity, mercy, abundance, and knowledge encircle all existence without limits.',
    exp_hi: 'वह जिसकी रहमत, रिज़्क़ और इल्म की कोई सीमा नहीं, जो सारी कायनात को घेरे हुए है।',
    exp_gu: 'જેમની દયા, જ્ઞાન અને કૃપાની કોઈ સીમા નથી, જે સર્વવ્યાપક છે.',
    ref: 'Surah Al-Baqarah 2:247, Surah Al-Imran 3:73'
  },
  {
    num: 46, ar: 'الْحَكِيمُ', trans: 'Al-Hakeem',
    en: 'The All-Wise',
    hi: 'हिकमत वाला / तत्वज्ञानी',
    gu: 'તત્વજ્ઞ / પરિપૂર્ણ ડહાપણવાળા',
    exp_en: 'The Supreme in Wisdom, who places everything in its rightful place with flawless divine purpose.',
    exp_hi: 'वह जिसकी हर बात और हर फ़ैसले में मुकम्मल हिकमत व मस्लेहत (भलाई) पोशीदा होती है।',
    exp_gu: 'જેમના દરેક કાર્ય અને નિર્ણયમાં દૈવી શાણપણ અને માનવ કલ્યાણ સમાયેલું છે.',
    ref: 'Surah Al-Baqarah 2:129, Surah Al-An’am 6:18'
  },
  {
    num: 47, ar: 'الْوَدُودُ', trans: 'Al-Wadood',
    en: 'The Most Loving',
    hi: 'बेपनाह मुहब्बत करने वाला / परम स्नेही',
    gu: 'અતિ સ્નેહાળ / પ્રેમનો સાગર',
    exp_en: 'The One who loves His righteous servants with pure affection, drawing them near to His grace and benevolence.',
    exp_hi: 'वह जो अपने नेक बन्दों से ख़ालिस मुहब्बत करता है और उनके दिलों में अपनी मुहब्बत डालता है।',
    exp_gu: 'જે પોતાના સદાચારી ભક્તો પર અખૂટ પ્રેમ વરસાવે છે અને તેમને નિકટતા બક્ષે છે.',
    ref: 'Surah Hud 11:90, Surah Al-Buruj 85:14'
  },
  {
    num: 48, ar: 'الْمَجِيدُ', trans: 'Al-Majeed',
    en: 'The All-Glorious',
    hi: 'बड़ी बुज़ुर्गी और शान वाला / गौरवशाली',
    gu: 'પરમ ગૌરવશાળી / યશસ્વી',
    exp_en: 'The Majestic One whose noble essence and generous deeds are glorified by the inhabitants of heavens and earth.',
    exp_hi: 'वह जिसकी ज़ात बेइंतिहा बुज़ुर्ग है और जिसकी शान की तारीफ़ ज़मीन व आसमान करते हैं।',
    exp_gu: 'જેમનું અસ્તિત્વ અત્યંત પવિત્ર અને યશસ્વી છે, જેમની સ્તુતિ સમગ્ર બ્રહ્માંડ કરે છે.',
    ref: 'Surah Hud 11:73, Surah Al-Buruj 85:15'
  },
  {
    num: 49, ar: 'الْبَاعِثُ', trans: 'Al-Ba’ith',
    en: 'The Resurrector',
    hi: 'मुर्दों को दोबारा ज़िन्दा करने वाला',
    gu: 'પુનર્જીવિત કરનાર / સજીવન કરનાર',
    exp_en: 'The One who will awaken and resurrect all creation from the graves on the Day of Judgment to face reckoning.',
    exp_hi: 'वह जो क़ियामत के दिन तमाम मुर्दों को क़ब्रों से ज़िन्दा करके हिसाब के लिए उठाएगा।',
    exp_gu: 'જે કયામતના દિવસે તમામ મૃતકોને કબરોમાંથી પુનર્જીવિત કરી હિસાબ માટે ઉપસ્થિત કરશે.',
    ref: 'Surah Al-Hajj 22:7, Surah Yasin 36:52'
  },
  {
    num: 50, ar: 'الشَّهِيدُ', trans: 'Ash-Shaheed',
    en: 'The Universal Witness',
    hi: 'हर चीज़ का गवाह / सर्वસાક્ષી',
    gu: 'સર્વસાક્ષી / પ્રત્યક્ષ દર્શી',
    exp_en: 'The Ever-Present Witness who observes all occurrences and from whose divine vision nothing is hidden.',
    exp_hi: 'वह जो हर बात और हर अमल का हाज़िर व नाज़िर गवाह है, जिससे कोई राज़ पोशीदा नहीं।',
    exp_gu: 'જે સર્વ ઘટનાઓનો પ્રત્યક્ષ સાક્ષી છે, જેનાથી કોઈ કર્મ અજાણ્યું રહી શકતું નથી.',
    ref: 'Surah Al-Ma’idah 5:117, Surah Al-Hajj 22:17'
  },
  {
    num: 51, ar: 'الْحَقُّ', trans: 'Al-Haqq',
    en: 'The Absolute Truth',
    hi: 'हक़ / सच्चा और अटल वजूद',
    gu: 'પરમ સત્ય / શાશ્વત વાસ્તવિકતા',
    exp_en: 'The Supreme Reality whose existence, promises, words, and laws are the absolute, immutable truth.',
    exp_hi: 'सच्चा और अटल वजूद, जिसके तमाम वादे, बातें और अहकाम हक़ीक़त पर मबनी हैं।',
    exp_gu: 'જેનું અસ્તિત્વ શાશ્વત સત્ય છે અને જેના તમામ વચનો પરિપૂર્ણ વાસ્તવિકતા છે.',
    ref: 'Surah Al-Hajj 22:6, Surah Taha 20:114'
  },
  {
    num: 52, ar: 'الْوَكِيلُ', trans: 'Al-Wakeel',
    en: 'The Trustee / The Dependable',
    hi: 'कारसाज़ / भरोसे के क़ाबिल रक्षक',
    gu: 'કાર્યસાધક / વિશ્વાસપાત્ર સહાયક',
    exp_en: 'The Ultimate Trustee who manages all affairs with complete perfection for those who entrust themselves to Him.',
    exp_hi: 'वह बेहतरीन कारसाज़ जिस पर अगर बन्दा पूरा भरोसा कर ले तो वह उसकी हर मुश्किल आसान करता है।',
    exp_gu: 'જે શ્રેષ્ઠ કાર્યસાધક છે, જેના પર ભરોસો મૂકનાર કદી નિરાશ થતો નથી.',
    ref: 'Surah Al-Imran 3:173, Surah Al-An’am 6:102'
  },
  {
    num: 53, ar: 'الْقَوِيُّ', trans: 'Al-Qawiyy',
    en: 'The All-Strong',
    hi: 'ताक़तवर / महाबली',
    gu: 'અસીમ બળવાન / સર્વસમર્થ',
    exp_en: 'The Possessor of inexhaustible, absolute strength that experiences neither fatigue nor limitation.',
    exp_hi: 'वह मुकम्मल ताक़त का मालिक जिसकी कुव्वत कभी कमज़ोर नहीं होती और न उसे थकान होती है।',
    exp_gu: 'જે સંપૂર્ણ શક્તિના સ્વામી છે, જેમના બળમાં કદી ઘટાડો કે થાક આવતો નથી.',
    ref: 'Surah Al-Hajj 22:40, Surah Ash-Shura 42:19'
  },
  {
    num: 54, ar: 'الْمَتِينُ', trans: 'Al-Mateen',
    en: 'The Firm / The Steadfast',
    hi: 'मज़बूत / निहायत मुस्तहकम',
    gu: 'અડગ / અતિ સુદ્રઢ',
    exp_en: 'The Steadfast whose power is unshakable and whose determination suffers neither wavering nor alteration.',
    exp_hi: 'वह जिसकी ताक़त इतनी मज़बूत है कि उसे कोई हिला नहीं सकता और न उसका इरादा बदल सकता है।',
    exp_gu: 'જે અત્યંત સુદ્રઢ છે, જેની સત્તા અને સામર્થ્ય સદાય અડગ રહે છે.',
    ref: 'Surah Adh-Dhariyat 51:58'
  },
  {
    num: 55, ar: 'الْوَلِيُّ', trans: 'Al-Waliyy',
    en: 'The Protecting Associate / The Ally',
    hi: 'मददगार दोस्त / कारसाज़ वली',
    gu: 'હિતેચ્છુ મિત્ર / સાચો રક્ષક',
    exp_en: 'The Loyal Protector who befriends and aids the righteous, guiding them from spiritual darkness into radiant light.',
    exp_hi: 'वह जो ईमान वालों का सच्चा दोस्त और मददगार है और उन्हें अंधेरों से नूर की तरफ़ निकालता है।',
    exp_gu: 'જે સદાચારી ભક્તોનો સાચો મિત્ર અને સહાયક છે, તેમને અંધકારમાંથી પ્રકાશ તરફ દોરે છે.',
    ref: 'Surah Al-Baqarah 2:257, Surah Ash-Shura 42:28'
  },
  {
    num: 56, ar: 'الْحَمِيدُ', trans: 'Al-Hameed',
    en: 'The All-Praiseworthy',
    hi: 'लाइक़े हम्द / हर तारीफ़ का हक़दार',
    gu: 'પ્રશંસાને પાત્ર / સ્તુતિવાન',
    exp_en: 'The One who is inherently praised and deserving of all gratitude in every circumstance across all realms.',
    exp_hi: 'वह जो अपनी ज़ात और सिफ़ात में हर क़िस्म की तारीफ़ और शुक्रगुज़ारी का सच्चा हक़दार है।',
    exp_gu: 'જે પોતાની ઉત્કૃષ્ટતાને કારણે દરેક પરિસ્થિતિમાં સાચી પ્રશંસા અને સ્તુતિને પાત્ર છે.',
    ref: 'Surah Ibrahim 14:1, Surah Luqman 31:26'
  },
  {
    num: 57, ar: 'الْمُحْصِي', trans: 'Al-Muhsee',
    en: 'The Appraiser / The Accounter of All',
    hi: 'गिनने वाला / हर चीज़ का हिसाब रखने वाला',
    gu: 'સૂક્ષ્મ ગણતરીકાર / સર્વની નોંધ રાખનાર',
    exp_en: 'The One who counts and records every single leaf, raindrop, deed, and breath across the entirety of time.',
    exp_hi: 'वह जिसने कायनात की हर चीज़ को गिन रखा है और जिसके पास हर ज़र्रे का मुकम्मल हिसाब है।',
    exp_gu: 'જેણે બ્રહ્માંડના દરેક રજકણ, પાંદડા અને શ્વાસની સંપૂર્ણ ગણતરી રાખી છે.',
    ref: 'Surah Maryam 19:94, Surah Al-Jinn 72:28'
  },
  {
    num: 58, ar: 'الْمُبْدِئُ', trans: 'Al-Mubdi’',
    en: 'The Originator',
    hi: 'पहली बार पैदा करने वाला / आदिस्रષ્ટા',
    gu: 'આદિ સર્જક / પ્રથમ વાર રચનાર',
    exp_en: 'The Initiator who originated creation without prior model or precedent through His supreme divine decree.',
    exp_hi: 'वह जिसने कायनात को पहली बार बिना किसी पिछले नमूने के अपने हुक्म से वजूद दिया।',
    exp_gu: 'જેણે કોઈ પણ અગાઉના નમૂના વિના પોતાની ઈચ્છાથી પ્રથમ વાર સૃષ્ટિની રચના કરી.',
    ref: 'Surah Al-Buruj 85:13, Surah Al-Ankabut 29:19'
  },
  {
    num: 59, ar: 'الْمُعِيدُ', trans: 'Al-Mu’eed',
    en: 'The Restorer',
    hi: 'दोबारा पैदा करने वाला / पुनર્સર્જક',
    gu: 'પુનઃનિર્માણ કરનાર / પુનઃસર્જક',
    exp_en: 'The One who restores creation back to life after its passing, proving the resurrection is effortless for Him.',
    exp_hi: 'वह जो मिट जाने के बाद मख़लूक़ को दोबारा ज़िन्दगी बख़्शने पर पूरी तरह क़ादिर है।',
    exp_gu: 'જે મૃત્યુ પછી સૃષ્ટિનું પુનઃનિર્માણ કરવા સંપૂર્ણ સમર્થ છે.',
    ref: 'Surah Al-Buruj 85:13, Surah Ar-Rum 30:27'
  },
  {
    num: 60, ar: 'الْمُحْيِي', trans: 'Al-Muhyee',
    en: 'The Giver of Life',
    hi: 'ज़िन्दगी बख़्शने वाला / જીવનદાતા',
    gu: 'જીવન આપનાર / પ્રાણદાતા',
    exp_en: 'The One who breathes life into barren earth and lifeless matter, granting conscious vitality to souls.',
    exp_hi: 'वह जो बेजान मिट्टी और मुर्दा ज़मीन को ज़िन्दगी और रूह की ताज़गी अता करता है।',
    exp_gu: 'જે નિર્જીવ પદાર્થોમાં પ્રાણ ફૂંકે છે અને સુકી ધરાને નવજીવન આપે છે.',
    ref: 'Surah Ar-Rum 30:50, Surah Fussilat 41:39'
  },
  {
    num: 61, ar: 'الْمُمِيتُ', trans: 'Al-Mumeet',
    en: 'The Bringer of Death',
    hi: 'मौत देने वाला',
    gu: 'મૃત્યુ આપનાર',
    exp_en: 'The One who decrees death for every mortal at its appointed term, transferring souls to the realm of eternity.',
    exp_hi: 'वह जो हर जानदार के लिए उसकी तयशुदा मुद्दत पर मौत का फ़ैसला फ़रमाता है।',
    exp_gu: 'જે નિશ્ચિત સમયે દરેક જીવને મૃત્યુ આપે છે અને આત્માને પરલોક તરફ લઈ જાય છે.',
    ref: 'Surah Al-Baqarah 2:258, Surah Al-An’am 6:61'
  },
  {
    num: 62, ar: 'الْحَيُّ', trans: 'Al-Hayy',
    en: 'The Ever-Living',
    hi: 'ज़िन्दा व जावेद / सदैव જીવંત',
    gu: 'સદા જીવંત / અમર પરમેશ્વર',
    exp_en: 'The Ever-Living whose eternal existence has neither beginning nor end, free from slumber or mortality.',
    exp_hi: 'वह हमेशा ज़िन्दा रहने वाला जिसकी हयात (ज़िन्दगी) की न कोई शुरुआत है और न अंत।',
    exp_gu: 'જે સનાતન કાળથી જીવંત છે, જેને કદી ઊંઘ કે મૃત્યુ સ્પર્શી શકતા નથી.',
    ref: 'Surah Al-Baqarah 2:255, Surah Taha 20:111'
  },
  {
    num: 63, ar: 'الْقَيُّومُ', trans: 'Al-Qayyum',
    en: 'The Self-Subsisting / The Sustainer',
    hi: 'क़ायम रहने वाला / सबको थामने वाला',
    gu: 'સ્વયંભૂ / સમગ્ર સૃષ્ટિને ધારણ કરનાર',
    exp_en: 'The Self-Sustaining upon whom all creations depend, while He is completely independent of all needs.',
    exp_hi: 'वह जो अपनी ज़ात से क़ायम है और जिसने सारी कायनात को अपनी क़ुदरत से थाम रखा है।',
    exp_gu: 'જે સ્વયં અસ્તિત્વ ધરાવે છે અને જેના આધાર પર સમગ્ર બ્રહ્માંડ ટકી રહ્યું છે.',
    ref: 'Surah Al-Baqarah 2:255, Surah Al-Imran 3:2'
  },
  {
    num: 64, ar: 'الْوَاجِدُ', trans: 'Al-Wajid',
    en: 'The Perceiver / The Finder',
    hi: 'सब कुछ पाने वाला / सम्पन्न',
    gu: 'સંપન્ન / સર્વ પ્રાપ્ત કરનાર',
    exp_en: 'The All-Resourceful who lacks nothing, who finds and achieves whatever He wills without deficiency.',
    exp_hi: 'वह जिसे किसी चीज़ की कमी नहीं, जो जब चाहे जो चाहे पा लेता है।',
    exp_gu: 'જેને કોઈ અભાવ નથી, જે પોતાની ઈચ્છા મુજબ સર્વસ્વ મેળવે છે.',
    ref: 'Surah Ad-Duha 93:6-8'
  },
  {
    num: 65, ar: 'الْمَاجِدُ', trans: 'Al-Majid',
    en: 'The Illustrious / The Noble',
    hi: 'बड़ी अज़मत और इज़्ज़त वाला',
    gu: 'તેજસ્વી અને અતિ ગૌરવવંત',
    exp_en: 'The Noble and Magnanimous whose generosity is boundless and whose character is beyond praise.',
    exp_hi: 'वह जो बहुत सख़ी और बुज़ुर्ग है, जिसकी शान और करम की कोई हद नहीं।',
    exp_gu: 'જે અનહદ ઉદાર અને મહિમાવાન છે, જેમનું ઔદાર્ય અસીમ છે.',
    ref: 'Surah Hud 11:73'
  },
  {
    num: 66, ar: 'الْوَاحِدُ', trans: 'Al-Wahid',
    en: 'The Unique / The One',
    hi: 'एक व यकता / अकेला',
    gu: 'અદ્વિતીય / એકમાત્ર',
    exp_en: 'The One and Only, singular in His essence, attributes, and actions, having no equal or peer.',
    exp_hi: 'वह जो अपनी ज़ात और सिफ़ात में अकेला है, जिसका कोई सानी या शरीक नहीं।',
    exp_gu: 'જે પોતાના ગુણો અને સત્તામાં એકમાત્ર છે, જેનો કોઈ સમકક્ષ નથી.',
    ref: 'Surah Al-Baqarah 2:163, Surah Al-Ikhlas 112:1'
  },
  {
    num: 67, ar: 'الأَحَدُ', trans: 'Al-Ahad',
    en: 'The Indivisible / The Absolute One',
    hi: 'अकेला / बेजोड़ और लासानी',
    gu: 'અખંડ એક / અનન્ય',
    exp_en: 'The Absolute Unitary One, indivisible, unbegotten, who begets not and is uniquely transcendent.',
    exp_hi: 'वह जो एक है, जिसका कोई टुकड़ा या हिस्सा नहीं हो सकता, न उसकी कोई औलाद है और न वह किसी की औलाद है।',
    exp_gu: 'જે અવિભાજ્ય અને અજોડ છે, જેણે કોઈને જન્મ આપ્યો નથી કે નથી તે જન્મ્યો.',
    ref: 'Surah Al-Ikhlas 112:1'
  },
  {
    num: 68, ar: 'الصَّمَدُ', trans: 'As-Samad',
    en: 'The Eternal Refuge / The Self-Sufficient',
    hi: 'बेनियाज़ / सब जिसकी ज़रूरत रखते हैं',
    gu: 'સર્વાધાર / નિરાધારનો આધાર',
    exp_en: 'The Eternal Refuge upon whom all creation depends for their needs, while He needs neither food nor sustenance.',
    exp_hi: 'वह बेनियाज़ जिससे सब अपनी ज़रूरतें मांगते हैं और जिसे किसी की कोई हाजत नहीं होती।',
    exp_gu: 'જેના પર તમામ સૃષ્ટિ નિર્ભર છે પરંતુ જેને કોઈની પણ જરૂર નથી.',
    ref: 'Surah Al-Ikhlas 112:2'
  },
  {
    num: 69, ar: 'الْقَادِرُ', trans: 'Al-Qadir',
    en: 'The Capable / The All-Powerful',
    hi: 'क़ुदरत वाला / समर्थ',
    gu: 'સર્વસમર્થ / શક્તિમાન',
    exp_en: 'The All-Capable who possesses absolute power to manifest or withhold whatever He decrees.',
    exp_hi: 'वह जो हर मुमकिन चीज़ पर पूरी तरह क़ादिर है और कोई काम उसके लिए मुश्किल नहीं।',
    exp_gu: 'જે દરેક સંભવ કાર્ય કરવા પૂર્ણ શક્તિશાળી છે, જે અશક્યને શક્ય બનાવે છે.',
    ref: 'Surah Al-Baqarah 2:20, Surah Al-An’am 6:65'
  },
  {
    num: 70, ar: 'الْمُقْتَدِرُ', trans: 'Al-Muqtadir',
    en: 'The Omnipotent / The Prevailing',
    hi: 'ज़बरदस्त इक़्तिदार वाला / प्रभुત્વવાન',
    gu: 'પ્રચંડ પ્રભુત્વશાળી / સત્તાધીશ',
    exp_en: 'The Supreme Dominant whose executive power executes all divine decrees with effortless mastery.',
    exp_hi: 'वह जिसका इक़्तिदार इतना ग़ालिब है कि कायनात की कोई ताक़त उसके फ़ैसले को रोक नहीं सकती।',
    exp_gu: 'જેનું સામર્થ્ય એટલું પ્રચંડ છે કે સમગ્ર સૃષ્ટિમાં કોઈ તેના આદેશને રોકી શકતું નથી.',
    ref: 'Surah Al-Qamar 54:42, Surah Al-Kahf 18:45'
  },
  {
    num: 71, ar: 'الْمُقَدِّمُ', trans: 'Al-Muqaddim',
    en: 'The Advancer / The Expediter',
    hi: 'आगे बढ़ाने वाला / अग्रसर કરનાર',
    gu: 'આગળ ધપાવનાર / પ્રગતિ આપનાર',
    exp_en: 'The One who brings forward what He wills in time, status, and rank according to profound wisdom.',
    exp_hi: 'वह जो अपनी हिकमत से जिसे चाहे इल्म, इज़्ज़त और रुतबे में आगे बढ़ा देता है।',
    exp_gu: 'જે પોતાના દૈવી જ્ઞાનથી જેને ઇચ્છે તેને જ્ઞાન અને પદવીમાં આગળ વધારે છે.',
    ref: 'Surah Qaf 50:28'
  },
  {
    num: 72, ar: 'الْمُؤَخِّرُ', trans: 'Al-Mu’akhkhir',
    en: 'The Delayer / The Postponer',
    hi: 'पीछे करने वाला / વિલંબ કરનાર',
    gu: 'પાછળ રાખનાર / સમય લંબાવનાર',
    exp_en: 'The One who delays what He wills, holding back events or punishments until their appointed divine time.',
    exp_hi: 'वह जो अपनी मस्लेहत से चीज़ों को या गुनहगारों की सज़ा को एक ख़ास वक़्त तक मुल्तवी रखता है।',
    exp_gu: 'જે પોતાની ગૂઢ બુદ્ધિથી ઘટનાઓને કે દંડને યોગ્ય સમય સુધી વિલંબમાં રાખે છે.',
    ref: 'Surah Ibrahim 14:42, Surah Nuh 71:4'
  },
  {
    num: 73, ar: 'الأَوَّلُ', trans: 'Al-Awwal',
    en: 'The Very First',
    hi: 'सबसे पहला / आदि',
    gu: 'સર્વપ્રથમ / અનાદિ',
    exp_en: 'The First whose existence has no beginning, who existed before the cosmos, time, or space were fashioned.',
    exp_hi: 'वह जो सबसे पहले था जब कुछ भी न था, जिसके वजूद की कोई इब्तिदा (शुरुआत) नहीं।',
    exp_gu: 'જે સર્વપ્રથમ હતો જ્યારે કશું જ નહોતું, જે સમય અને અવકાશના સર્જન પહેલાંથી છે.',
    ref: 'Surah Al-Hadid 57:3'
  },
  {
    num: 74, ar: 'الآخِرُ', trans: 'Al-Akhir',
    en: 'The Very Last',
    hi: 'सबके बाद बाक़ी रहने वाला / अनंत',
    gu: 'સર્વાંતે અવિનાશી / અનંત',
    exp_en: 'The Last whose existence has no end, who will remain in full majesty after all creation has vanished.',
    exp_hi: 'वह जो सब कुछ ख़त्म हो जाने के बाद भी हमेशा बाक़ी रहेगा, जिसकी कोई इंतिहा (अंत) नहीं।',
    exp_gu: 'જે બધું જ નષ્ટ થઈ ગયા પછી પણ સદાકાળ રહેશે, જેનો કોઈ અંત નથી.',
    ref: 'Surah Al-Hadid 57:3'
  },
  {
    num: 75, ar: 'الظَّاهِرُ', trans: 'Az-Zahir',
    en: 'The Manifest / The Evident',
    hi: 'ज़ाहिर / जिसकी निशानियां अयां हैं',
    gu: 'પ્રત્યક્ષ / સર્વત્ર દેખાતા પ્રતીકોવાળા',
    exp_en: 'The Manifest whose reality and power are clearly demonstrated through the marvels of His creation.',
    exp_hi: 'वह जो अपनी निशानियों और क़ुदरत के करिश्मों से बिल्कुल साफ़ और ज़ाहिर है।',
    exp_gu: 'જે પોતાના સૃષ્ટિ-ચમત્કારો અને કુદરતી પુરાવાઓ દ્વારા સર્વત્ર પ્રત્યક્ષ છે.',
    ref: 'Surah Al-Hadid 57:3'
  },
  {
    num: 76, ar: 'الْبَاطِنُ', trans: 'Al-Batin',
    en: 'The Hidden / The Immanent',
    hi: 'छुपा हुआ / आँखों से ओझल',
    gu: 'અપ્રત્યક્ષ / દૃષ્ટિથી પર',
    exp_en: 'The Hidden whose essence cannot be perceived by mortal eyes, yet whose presence is closer than life itself.',
    exp_hi: 'वह जो दुनियावी आँखों से ओझल है मगर दिलों के सबसे क़रीब और हर राज़ से वाक़िफ़ है।',
    exp_gu: 'જે સ્થૂળ આંખોથી અદ્રશ્ય છે છતાં માનવ હૃદયની સૌથી નિકટ બિરાજમાન છે.',
    ref: 'Surah Al-Hadid 57:3'
  },
  {
    num: 77, ar: 'الْوَالِي', trans: 'Al-Wali',
    en: 'The Sole Governor / The Ruler',
    hi: 'सच्चा हुक्मरां / स्वामी',
    gu: 'શાસક / સર્વોચ્ચ સંચાલક',
    exp_en: 'The Sole Master and Governor who oversees, manages, and commands all operations of the cosmos.',
    exp_hi: 'वह मुस्तक़िल हाकिम जो पूरे ब्रह्मांड की व्यवस्था और निज़ाम को अकेले चलाता है।',
    exp_gu: 'જે એકમાત્ર સર્વોચ્ચ શાસક છે અને સમગ્ર બ્રહ્માંડનું વ્યવસ્થિત સંચાલન કરે છે.',
    ref: 'Surah Ar-Ra’d 13:11'
  },
  {
    num: 78, ar: 'الْمُتَعَالِي', trans: 'Al-Muta’ali',
    en: 'The Supremely Exalted',
    hi: 'अत्यंत उच्च / सर्वश्रेष्ठ',
    gu: 'પરમ ઉચ્ચ / અતિશય ગૌરવવંત',
    exp_en: 'The One who is elevated far beyond any human conception, defect, or comparison.',
    exp_hi: 'वह जो मख़लूक़ात के ख़यालात, गुमान और हर ऐब से बहुत ज़्यादा बुलन्द व बाला है।',
    exp_gu: 'જે તમામ માનવીય કલ્પનાઓ અને સાંસારિક સરખામણીઓ કરતાં અતિશય પર છે.',
    ref: 'Surah Ar-Ra’d 13:9'
  },
  {
    num: 79, ar: 'الْبَرُّ', trans: 'Al-Barr',
    en: 'The Source of All Goodness',
    hi: 'नेकी और भलाई का स्रोत / परम उपकारी',
    gu: 'સમસ્ત ભલાઈનો સ્ત્રોત / પરમ ઉપકારી',
    exp_en: 'The Source of all virtue and goodness, extremely kind to His creation, showering them with compassion.',
    exp_hi: 'वह जो भलाई और एहसान का स्रोत है और अपने बन्दों पर बेइंतिहा शफ़क़त फ़रमाता है।',
    exp_gu: 'જે તમામ સદ્ગુણો અને દયાનો સ્ત્રોત છે, જે ભક્તો પર પરમ કૃપા વરસાવે છે.',
    ref: 'Surah At-Tur 52:28'
  },
  {
    num: 80, ar: 'التَّوَّابُ', trans: 'At-Tawwab',
    en: 'The Ever-Pardoning / Acceptor of Repentance',
    hi: 'तौबा क़ुबूल करने वाला / क्षमाવાન',
    gu: 'પશ્ચાતાપ સ્વીકારનાર / ક્ષમાશીલ',
    exp_en: 'The One who continually turns toward His servants with mercy and readily accepts sincere repentance.',
    exp_hi: 'वह जो बन्दों को तौबा की तौफ़ीक़ देता है और बार-बार उनकी तौबा को क़ुबूल फ़रमाता है।',
    exp_gu: 'જે ભક્તોને સાચા પશ્ચાતાપની પ્રેરણા આપે છે અને તેમની ક્ષમાયાચના સ્વીકારે છે.',
    ref: 'Surah Al-Baqarah 2:37, Surah An-Nasr 110:3'
  },
  {
    num: 81, ar: 'الْمُنْتَقِمُ', trans: 'Al-Muntaqim',
    en: 'The Just Avenger',
    hi: 'इंतिक़ाम लेने वाला / ज़ालिमों को सज़ा देने वाला',
    gu: 'અન્યાયીઓને ન્યાયિક દંડ આપનાર',
    exp_en: 'The Just Punisher who exacts retribution against obstinate tyrants and persistent transgressors of truth.',
    exp_hi: 'वह जो सरकश ज़ालिमों और हक़ के दुश्मनों से इंसाफ़ के साथ बदला लेने वाला है।',
    exp_gu: 'જે હઠીલા અત્યાચારીઓ અને સત્યના વિરોધીઓને ન્યાયપૂર્ણ દંડ આપે છે.',
    ref: 'Surah As-Sajdah 32:22, Surah Az-Zukhruf 43:41'
  },
  {
    num: 82, ar: 'العَفُوُّ', trans: 'Al-Afuww',
    en: 'The Supreme Pardoner / Effacer of Sins',
    hi: 'गुनाहों को मिटाने वाला / महाक्षमादाता',
    gu: 'પાપોને સંપૂર્ણ ભૂંસી નાખનાર',
    exp_en: 'The One who completely erases sins from the record as though they never occurred, leaving no trace behind.',
    exp_hi: 'वह जो गुनाहों को सिर्फ़ माफ़ ही नहीं करता बल्कि नाम-ए-आमाल से बिल्कुल मिटा देता है।',
    exp_gu: 'જે પાપોને માત્ર માફ નથી કરતો પરંતુ કર્મોની નોંધમાંથી સદંતર ભૂંસી નાખે છે.',
    ref: 'Surah An-Nisa 4:43, Surah Al-Hajj 22:60'
  },
  {
    num: 83, ar: 'الرَّؤُوفُ', trans: 'Ar-Ra’oof',
    en: 'The Most Clement / Most Tender',
    hi: 'निहायत मेहरबान व शफ़ीक़ / परम स्नेહી',
    gu: 'પરમ દયાળુ અને વાત્સલ્યપૂર્ણ',
    exp_en: 'The Tender One whose profound compassion spares His servants from unbearable burdens and hardships.',
    exp_hi: 'वह जो बेइंतिहा शफ़क़त और नरमी फ़रमाने वाला है, जो बन्दों पर उनकी ताक़त से ज़्यादा बोझ नहीं डालता।',
    exp_gu: 'જે પરમ વાત્સલ્યપૂર્ણ છે, જે ભક્તો પર તેમની ક્ષમતા કરતાં વધુ ભાર મૂકતો નથી.',
    ref: 'Surah Al-Baqarah 2:207, Surah At-Tawbah 9:117'
  },
  {
    num: 84, ar: 'مَالِكُ الْمُلْكِ', trans: 'Malik-ul-Mulk',
    en: 'Master of All Sovereignty',
    hi: 'सारे मुल्क व जहान का मालिक',
    gu: 'સમગ્ર સૃષ્ટિના સર્વોચ્ચ સત્તાધીશ',
    exp_en: 'The Owner of all dominion, who bestows authority upon whom He wills and removes it from whom He wills.',
    exp_hi: 'सारी सल्तनत और हुकूमत का हक़ीक़ी मालिक, जिसे चाहे हुकूमत दे और जिससे चाहे छीन ले।',
    exp_gu: 'સમસ્ત સામ્રાજ્યનો સાચો માલિક, જે જેને ઇચ્છે તેને સત્તા આપે અને છીનવી લે.',
    ref: 'Surah Al-Imran 3:26'
  },
  {
    num: 85, ar: 'ذُو الْجَلاَلِ وَالإِكْرَامِ', trans: 'Dhul-Jalali wal-Ikram',
    en: 'Lord of Majesty and Generosity',
    hi: 'जलाल और इज़्ज़त वाला / गौरव અને ઔદાર્યના સ્વામી',
    gu: 'ગૌરવ, પ્રતાપ અને ઉદારતાના સ્વામી',
    exp_en: 'The Lord possessed of absolute glory, grandeur, majesty, and unceasing bounty toward His creation.',
    exp_hi: 'वह जो अज़मत व जलाल और बेपायां करम व नवाज़िश का मालिक है।',
    exp_gu: 'જે પ્રચંડ પ્રતાપ અને અનંત પરોપકારના એકમાત્ર સ્વામી છે.',
    ref: 'Surah Ar-Rahman 55:27, 55:78'
  },
  {
    num: 86, ar: 'الْمُقْسِطُ', trans: 'Al-Muqsit',
    en: 'The Equitable / The Impartial',
    hi: 'अदल व इंसाफ़ क़ायम करने वाला / નિષ્પક્ષ',
    gu: 'સંપૂર્ણ નિષ્પક્ષ અને ન્યાયપ્રિય',
    exp_en: 'The One who acts with complete fairness, rectifying injustice and restoring rights to the wronged.',
    exp_hi: 'वह जो पूरी तरह इंसाफ़ क़ायम करता है और मज़लूम को ज़ालिम से उसका हक़ दिलाता है।',
    exp_gu: 'જે સંપૂર્ણ નિષ્પક્ષતાથી ન્યાય કરે છે અને પીડિતને તેનો સાચો અધિકાર અપાવે છે.',
    ref: 'Surah Al-Imran 3:18, Surah Al-Anbiya 21:47'
  },
  {
    num: 87, ar: 'الْجَامِعُ', trans: 'Al-Jami’',
    en: 'The Gatherer / The Uniter',
    hi: 'जमा करने वाला / इकट्ठा करने वाला',
    gu: 'સર્વને એકત્ર કરનાર / સંયોજક',
    exp_en: 'The One who will gather all mankind on the Day of Resurrection, in which there is no doubt.',
    exp_hi: 'वह जो क़ियामत के दिन तमाम इंसानों को बिना किसी शक के एक मैदान में इकट्ठा करेगा।',
    exp_gu: 'જે કયામતના દિવસે તમામ માનવજાતને નિઃશંકપણે એકત્ર કરશે.',
    ref: 'Surah Al-Imran 3:9, Surah An-Nisa 4:140'
  },
  {
    num: 88, ar: 'الْغَنِيُّ', trans: 'Al-Ghaniyy',
    en: 'The Self-Sufficient / The All-Rich',
    hi: 'बेनियाज़ व धनी / सर्वસંપન્ન',
    gu: 'સ્વયંપૂર્ણ / સર્વસંપન્ન દાતા',
    exp_en: 'The Rich One who is completely independent of everything, while all creation stands in dire need of Him.',
    exp_hi: 'वह बेनियाज़ और ग़नी जिसे किसी की कोई ज़रूरत नहीं, बल्कि सारी कायनात उसकी मोहताज है।',
    exp_gu: 'જે સ્વયંપૂર્ણ છે અને જેને કોઈ જરૂરિયાત નથી, જ્યારે સર્વ સૃષ્ટિ તેમની મોહતાજ છે.',
    ref: 'Surah Al-Baqarah 2:267, Surah Fatir 35:15'
  },
  {
    num: 89, ar: 'الْمُغْنِي', trans: 'Al-Mughni',
    en: 'The Enricher / Bestower of Wealth',
    hi: 'बेनियाज़ बनाने वाला / मालामाल करने वाला',
    gu: 'સંપન્ન બનાવનાર / સમૃદ્ધિ આપનાર',
    exp_en: 'The One who enriches His servants with spiritual contentment, material sustenance, and faith.',
    exp_hi: 'वह जो जिसे चाहे अपनी रहमत से ग़नी व मालामाल कर देता है और दिलों को इत्मीनान बख़्शता है।',
    exp_gu: 'જે જેને ઇચ્છે તેને આત્મિક શાંતિ, શ્રદ્ધા અને સમૃદ્ધિથી સંપન્ન બનાવે છે.',
    ref: 'Surah An-Najm 53:48, Surah At-Tawbah 9:74'
  },
  {
    num: 90, ar: 'الْمَانِعُ', trans: 'Al-Mani’',
    en: 'The Withholder / The Shielding Protector',
    hi: 'रोकने वाला / हिफ़ाज़त करने वाला',
    gu: 'નુકસાનથી બચાવનાર / રોકનાર',
    exp_en: 'The One who prevents harm from reaching His servants and withholds provisions according to divine wisdom.',
    exp_hi: 'वह जो अपनी हिकमत से नुक़सान को रोकता है और बुराइयों से अपने बन्दों की हिफ़ाज़त फ़रमाता है।',
    exp_gu: 'જે પોતાના જ્ઞાન અનુસાર અનિષ્ટને રોકે છે અને ભક્તોનું રક્ષણ કરે છે.',
    ref: 'Surah Al-Mulk 67:21'
  },
  {
    num: 91, ar: 'الضَّارُّ', trans: 'Ad-Darr',
    en: 'The Distressor / Afflicter (for Divine Wisdom)',
    hi: 'नुक़सान पहुँचाने वाला (हिकमत के तहत)',
    gu: 'કસોટી માટે વિપત્તિ મોકલનાર',
    exp_en: 'The One in whose control lies all adversity; none can bring affliction or test except by His divine permission.',
    exp_hi: 'वह जिसकी इजाज़त के बिना कोई नुक़सान नहीं पहुँच सकता, जो आज़माइश के लिए तकलीफ़ भेजता है।',
    exp_gu: 'જેની અનુમતિ વિના કોઈ મુશ્કેલી આવી શકતી નથી, જે કસોટી માટે વિપત્તિ મોકલે છે.',
    ref: 'Surah Al-An’am 6:17, Surah Yunus 10:107'
  },
  {
    num: 92, ar: 'النَّافِعُ', trans: 'An-Nafi’',
    en: 'The Bestower of Benefit',
    hi: 'फ़ायदा पहुँचाने वाला / कल्याणकारी',
    gu: 'લાભ અને કલ્યાણ કરનાર',
    exp_en: 'The Creator of all benefit, advantage, and good, without whose grace no blessing can be attained.',
    exp_hi: 'वह जो हर क़िस्म का फ़ायदा और भलाई अता करता है, जिसके फ़ज़्ल के बिना कोई नेमत नहीं मिल सकती।',
    exp_gu: 'જે તમામ પ્રકારનું કલ્યાણ અને લાભ આપનાર છે, જેના અનુગ્રહ વિના કોઈ ઉપહાર શક્ય નથી.',
    ref: 'Surah Yunus 10:107, Surah Al-Fath 48:11'
  },
  {
    num: 93, ar: 'النُّورُ', trans: 'An-Noor',
    en: 'The Light',
    hi: 'नूर / रौशनी का स्रोत',
    gu: 'દિવ્ય પ્રકાશ / નૂર',
    exp_en: 'The Light of the heavens and the earth, who illuminates the cosmos and guides hearts through spiritual clarity.',
    exp_hi: 'ज़मीन व आसमान का नूर, जो दिलों को हिदायत की रौशनी से मुनव्वर करता है।',
    exp_gu: 'આકાશ અને પૃથ્વીનો દિવ્ય પ્રકાશ, જે હૃદયોને સત્યના નૂરથી પ્રકાશિત કરે છે.',
    ref: 'Surah An-Nur 24:35'
  },
  {
    num: 94, ar: 'الْهَادِي', trans: 'Al-Hadi',
    en: 'The Guide',
    hi: 'हिदायत देने वाला / मार्गदर्शक',
    gu: 'સાચો માર્ગદર્શક / પથપ્રદર્શક',
    exp_en: 'The Supreme Guide who directs creation to their welfare and guides receptive hearts to the straight path.',
    exp_hi: 'वह जो बन्दों को सीधे रास्ते (सिरात-ए-मुस्तक़ीम) की तरफ़ रहनुमाई फ़रमाता है।',
    exp_gu: 'જે ભક્તોને સત્ય અને સદાચારના સીધા માર્ગ તરફ દોરે છે.',
    ref: 'Surah Al-Hajj 22:54, Surah Al-Furqan 25:31'
  },
  {
    num: 95, ar: 'الْبَدِيعُ', trans: 'Al-Badi’',
    en: 'The Incomparable Originator',
    hi: 'अनोखा पैदा करने वाला / અદ્ભુત રચિયતા',
    gu: 'અદ્ભુત રચનાકાર / અનોખો સર્જક',
    exp_en: 'The Originator who creates breathtaking marvels without prior example, possessing unmatched originality.',
    exp_hi: 'वह जिसने कायनात को बिना किसी मिसाल या नमूने के अनोखे और लासानी अंदाज़ में बनाया।',
    exp_gu: 'જેણે કોઈ પણ અગાઉના ઉદાહરણ વિના અદભુત સૌંદર્ય સાથે સૃષ્ટિનું સર્જન કર્યું.',
    ref: 'Surah Al-Baqarah 2:117, Surah Al-An’am 6:101'
  },
  {
    num: 96, ar: 'الْبَاقِي', trans: 'Al-Baqi',
    en: 'The Everlasting / The Imperishable',
    hi: 'हमेशा बाक़ी रहने वाला / અવિનાશી',
    gu: 'સદા અવિનાશી / શાશ્વત',
    exp_en: 'The Imperishable who remains forever after all creation has perished, untethered by time or demise.',
    exp_hi: 'वह जो हमेशा बाक़ी रहेगा जब हर चीज़ फ़ना हो जाएगी।',
    exp_gu: 'જે સદાય કાયમ રહેશે જ્યારે તમામ નશ્વર વસ્તુઓ નાશ પામશે.',
    ref: 'Surah Ar-Rahman 55:27, Surah Al-Qasas 28:88'
  },
  {
    num: 97, ar: 'الْوَارِثُ', trans: 'Al-Warith',
    en: 'The Supreme Inheritor',
    hi: 'सबका वारिस / उत्तराधिकारी',
    gu: 'સાચો વારસદાર / અંતિમ ઉત્તરાધિકારી',
    exp_en: 'The Ultimate Inheritor of all heavens and earth, to whom everything returns after its possessors vanish.',
    exp_hi: 'सारे जहान का हक़ीक़ी वारिस, जिसकी तरफ़ सब कुछ पलट कर आएगा जब इंसान दुनिया छोड़ देंगे।',
    exp_gu: 'સમગ્ર સૃષ્ટિનો અંતિમ વારસદાર, જેની પાસે સર્વસ્વ પાછું ફરીને આવશે.',
    ref: 'Surah Al-Hijr 15:23, Surah Maryam 19:40'
  },
  {
    num: 98, ar: 'الرَّشِيدُ', trans: 'Ar-Rasheed',
    en: 'The Righteous Guide / The Infallible Teacher',
    hi: 'नेक राह दिखाने वाला / हिदायत का शिक्षक',
    gu: 'સન્માર્ગ દર્શાવનાર / સત્યના શિક્ષક',
    exp_en: 'The Infallible Guide whose governance proceeds with unerring righteousness toward ultimate wisdom.',
    exp_hi: 'वह जो सही और नेक रास्ते पर चलाने वाला है, जिसकी तदबीर में कभी कोई ग़लती नहीं होती।',
    exp_gu: 'જે ભૂલરહિત દૈવી શાણપણથી ભક્તોને કલ્યાણકારી સન્માર્ગ તરફ દોરે છે.',
    ref: 'Surah Al-Kahf 18:17, Surah Hud 11:87'
  },
  {
    num: 99, ar: 'الصَّبُورُ', trans: 'As-Saboor',
    en: 'The Most Patient',
    hi: 'असीम सब्र करने वाला / परम धैर्यवान',
    gu: 'અપાર ધૈર્યવાન / અતિ સહનશીલ',
    exp_en: 'The Patient One who does not haste to execute wrath against wrongdoers, granting them endless chances to seek forgiveness.',
    exp_hi: 'वह जिसका सब्र असीम है, जो गुनाहगारों को सज़ा देने में जल्दबाज़ी नहीं करता बल्कि माफ़ी की मोहलत देता है।',
    exp_gu: 'જેનું ધૈર્ય અસીમ છે, જે પાપીઓને દંડ આપવામાં ઉતાવળ નથી કરતો પરંતુ પસ્તાવાની તક આપે છે.',
    ref: 'Surah Al-Baqarah 2:153, Surah An-Nahl 16:127'
  }
];

const fileContent = `// ==============================================================================
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
${rawNames.map(n => `  {
    number: ${n.num},
    arabic: '${n.ar}',
    transliteration: '${n.trans}',
    meaning: {
      en: ${JSON.stringify(n.en)},
      hi: ${JSON.stringify(n.hi)},
      gu: ${JSON.stringify(n.gu)}
    },
    explanation: {
      en: ${JSON.stringify(n.exp_en)},
      hi: ${JSON.stringify(n.exp_hi)},
      gu: ${JSON.stringify(n.exp_gu)}
    },
    quranReference: ${JSON.stringify(n.ref)},
    audioUrl: 'https://cdn.islamic.network/names/audio/${n.num}.mp3'
  }`).join(',\n')}
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
`;

fs.writeFileSync(path.resolve('src/services/namesService.ts'), fileContent, 'utf8');
console.log('Successfully generated complete 99 Names of Allah into src/services/namesService.ts');
