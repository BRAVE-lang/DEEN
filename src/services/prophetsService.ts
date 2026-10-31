// ==============================================================================
// DEEN — Stories of the Prophets (Qisas al-Anbiya) Service
// Grounded in Hafiz Ibn Kathir's Classical Scholarship & The Holy Quran
// ==============================================================================

import { ProphetStory } from '@/types';

export const PROPHET_STORIES: ProphetStory[] = [
  {
    id: 'adam',
    nameArabic: 'آدَم (عليه السلام)',
    nameEnglish: 'Prophet Adam (AS)',
    title: 'The Father of Humanity & The First Prophet',
    chronologyOrder: 1,
    quranReferences: ['Al-Baqarah 2:30-39', 'Al-A’raf 7:11-25', 'Al-Hijr 15:26-44', 'Al-Isra 17:61-65', 'Ta-Ha 20:115-123'],
    summary: 'The creation of the first human being by Allah from clay, the honor bestowed upon him through knowledge, the trial with Iblis, sincere repentance, and the descent to earth as Allah’s vicegerent.',
    story: `Allah created Adam (peace be upon him) from clay of altered black mud and breathed into him the spirit created for him. Allah honored Adam by teaching him the names of all things—an honor of divine knowledge that even the noble angels had not been given.

When Allah commanded the angels and Iblis to prostrate to Adam in honor of this divine creation, the angels obeyed immediately in humility. But Iblis refused out of haughty arrogance, saying: "I am better than he: You created me from fire and You created him from clay." Because of this pride and rebellion, Iblis was expelled from the mercy of Allah.

Adam and his wife Hawwa (Eve) dwelled in Paradise with freedom to enjoy its bounties, with a single prohibition: "Do not approach this tree, lest you be among the wrongdoers." Shaytan deceived them with whispers, swearing falsely by Allah that eating from it would grant them immortality or angelic stature. When they tasted from the tree, their vulnerability became apparent and they realized their lapse.

Unlike Iblis who persisted in pride, Adam and Hawwa turned immediately in heartfelt sorrow and repentance to their Creator with the eternal prayer: "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers" (7:23). Allah turned to them in forgiveness, for He is the Oft-Forgiving, the Most Merciful, and appointed them to live on earth as stewards to worship Him and establish righteousness.`,
    keyLessons: [
      'True nobility lies in divine knowledge, humility, and obedience to Allah.',
      'Pride (Kibr) and arrogance were the root causes of Shaytan’s downfall.',
      'Sincere repentance (Tawbah) immediately washes away transgressions and earns divine love.',
      'Never allow the deceptive whispers of Shaytan to shake your trust in Allah’s boundaries.'
    ],
    associatedSurahs: ['Al-Baqarah', 'Al-A’raf', 'Al-Hijr', 'Ta-Ha']
  },
  {
    id: 'nuh',
    nameArabic: 'نُوح (عليه السلام)',
    nameEnglish: 'Prophet Nuh / Noah (AS)',
    title: 'The Grateful Servant & Messenger of Steadfast Patience',
    chronologyOrder: 2,
    quranReferences: ['Al-A’raf 7:59-64', 'Yunus 10:71-73', 'Hud 11:25-49', 'Al-Mu’minun 23:23-30', 'Ash-Shu’ara 26:105-122', 'Al-Qamar 54:9-16', 'Nuh 71:1-28'],
    summary: 'Prophet Nuh called his people to worship Allah alone for 950 years with boundless patience. In response to their mocking rejection, Allah commanded him to construct the Ark and saved the believers from the Great Deluge.',
    story: `Prophet Nuh (peace be upon him) was sent to a society deeply entrenched in idol worship (Wadd, Suwa’, Yaghuth, Ya’uq, and Nasr). For nine hundred and fifty years, he called them day and night, in public and in private, reminding them of Allah’s abundant blessings and the reality of the Hereafter.

His people responded with stubborn arrogance, mocking him and demanding that the punishment be brought if he were truthful. Only a small group of the humble and poor believed in his message. 

When it was revealed to Nuh that no more of his people would believe, Allah commanded him: "Construct the ship under Our eyes and Our inspiration" (11:37). Even as he built the Ark on dry land, the chiefs ridiculed him. When the divine decree arrived, the fountains of the earth gushed forth and the skies opened with torrential rain.

Nuh loaded pairs of every animal and the faithful believers onto the Ark. His own son refused to board, claiming he would seek refuge on a mountain. Nuh called out in fatherly compassion, but the son was drowned among the disbelievers. The Ark rested safely on Mount Judi, and Allah established peace and blessings upon Nuh and the believers.`,
    keyLessons: [
      'Steadfast perseverance (Sabr) in conveying truth, regardless of how long results take.',
      'Faith and righteousness supersede lineage and family ties before Allah.',
      'Salvation in this world and the Hereafter is through sincere obedience to Allah.',
      'Patience in the face of mockery and disbelief is the hallmark of the righteous.'
    ],
    associatedSurahs: ['Hud', 'Al-Mu’minun', 'Nuh', 'Al-Qamar']
  },
  {
    id: 'ibrahim',
    nameArabic: 'إِبْرَاهِيم (عليه السلام)',
    nameEnglish: 'Prophet Ibrahim / Abraham (AS)',
    title: 'Khalilullah — The Intimate Friend of Allah',
    chronologyOrder: 3,
    quranReferences: ['Al-Baqarah 2:124-132', 'Al-An’am 6:74-83', 'Ibrahim 14:35-41', 'Mary 19:41-50', 'Al-Anbiya 21:51-73', 'As-Saffat 37:83-113'],
    summary: 'The champion of pure monotheism (Tawheed) who stood alone against idol worship, was miraculously saved from the blazing fire, rebuilt the Holy Kaaba with his son Ismail, and demonstrated absolute surrender to Allah.',
    story: `Prophet Ibrahim (peace be upon him) was born into a community that worshipped celestial bodies and handcrafted statues. Guided by pure fitrah and intellect, he questioned the stars, moon, and sun, concluding: "Indeed, I have turned my face toward He who created the heavens and the earth, inclining toward truth, and I am not of those who associate partners with Allah" (6:79).

He confronted his people’s idols, smashing them to demonstrate their utter helplessness. When the enraged king and people threw Ibrahim into a raging bonfire, Allah commanded: "O fire, be coolness and safety upon Ibrahim" (21:69), and he walked out completely unhurt.

Ibrahim underwent the ultimate tests of sacrifice: leaving his wife Hajar and infant son Ismail in the barren valley of Makkah, and later being tested to sacrifice Ismail in submission to Allah’s command. Allah ransomed Ismail with a noble sacrifice and commanded them to build the foundations of the Baytullah (the Holy Kaaba) and call mankind to Hajj.`,
    keyLessons: [
      'Unwavering monotheism (Tawheed) with courage to stand for truth even if alone.',
      'Absolute trust (Tawakkul) in Allah when facing life’s greatest trials.',
      'The rituals of Hajj and sacrifice remain an eternal tribute to the devotion of Ibrahim’s family.',
      'A pure heart (Qalb Saleem) is the greatest asset in the sight of Allah.'
    ],
    associatedSurahs: ['Al-Baqarah', 'Al-An’am', 'Ibrahim', 'As-Saffat']
  },
  {
    id: 'yusuf',
    nameArabic: 'يُوسُف (عليه السلام)',
    nameEnglish: 'Prophet Yusuf / Joseph (AS)',
    title: 'As-Siddiq — The Truthful and Forgiving',
    chronologyOrder: 4,
    quranReferences: ['Surah Yusuf 12:1-111'],
    summary: 'The most beautiful story (Ahsan al-Qasas) of a boy cast into a dark well by jealous brothers, sold into slavery, resisting temptation with unwavering chastity, imprisoned wrongfully, and elevated to ruler of Egypt who forgave his brothers.',
    story: `As a youth, Prophet Yusuf saw in a dream eleven stars, the sun, and the moon prostrating to him. His loving father, Prophet Yaqub (AS), recognized his prophetic future and cautioned him against telling his brothers. Envious of their father’s love, his brothers conspired and cast Yusuf into a deep well, lying to their father that a wolf had devoured him.

Caravan travelers rescued Yusuf and sold him in Egypt to the Aziz. When the Aziz’s wife tempted him, Yusuf sought refuge in Allah, declaring: "He is my master who has made my dwelling good. Indeed, wrongdoers will not succeed" (12:23). Choosing prison over sin, he remained incarcerated with patience for years.

Through Allah’s gift of dream interpretation, Yusuf accurately explained the king’s dream of seven fat cows eaten by seven lean cows, foretelling seven years of abundance followed by seven years of severe famine. Released and exonerated, Yusuf was appointed minister of treasuries. When his starving brothers arrived from Canaan seeking grain, Yusuf revealed his identity and spoke the timeless words of forgiveness: "No blame will there be upon you today. Allah will forgive you; and He is the most merciful of the merciful" (12:92).`,
    keyLessons: [
      'Patience in hardship (Sabr Jameel) always leads to divine elevation and honor.',
      'Moral integrity and chastity in the face of private temptation brings divine protection.',
      'Forgiveness and mercy toward those who wronged you is the peak of noble character.',
      'Allah’s divine plan unfolds with absolute perfection even through apparent misfortune.'
    ],
    associatedSurahs: ['Yusuf']
  },
  {
    id: 'musa',
    nameArabic: 'مُوسَى (عليه السلام)',
    nameEnglish: 'Prophet Musa / Moses (AS)',
    title: 'Kalimullah — The One Spoken to by Allah',
    chronologyOrder: 5,
    quranReferences: ['Al-Baqarah 2:40-86', 'Al-A’raf 7:103-162', 'Ta-Ha 20:9-98', 'Al-Qasas 28:3-44', 'Ash-Shu’ara 26:10-68'],
    summary: 'Rescued from the Nile as an infant, raised in Pharaoh’s palace, called to prophethood at Mount Sinai, confronting the tyrant Pharaoh with miracles, parting the Red Sea, and leading Bani Israel to liberation.',
    story: `Prophet Musa was born during Pharaoh’s tyrannical decree slaughtering newborn Israelite boys. Inspired by Allah, his mother placed him in a chest into the river Nile, and he was lovingly taken in by Asiya, Pharaoh’s righteous wife.

Growing into manhood, Musa fled to Madyan after defending an oppressed man, where he lived honorably and married. At Mount Tur (Sinai), Allah spoke directly to Musa, granting him nine clear signs—including his staff that transformed into a living serpent and his hand that shone with bright light.

Commanded to confront Pharaoh and free Bani Israel, Musa stood with his brother Harun with immense courage. Pharaoh arrogantly declared: "I am your greatest lord!" When Pharaoh pursued the Israelites to the shores of the Red Sea, Bani Israel cried out in despair: "Indeed, we are overtaken!" Musa answered with supreme faith: "Nay, indeed! My Lord is with me; He will guide me!" (26:62). Allah parted the sea into towering walls of water, delivering Musa and the believers while drowning Pharaoh and his army.`,
    keyLessons: [
      'No tyrant on earth can overturn the divine protection of Allah.',
      'Supreme courage and trust in Allah when backed against an impossible situation.',
      'Standing up against oppression and fighting for the dignity of the weak.',
      'Direct prayer and supplication to Allah eases speech, anxiety, and hardship.'
    ],
    associatedSurahs: ['Al-Qasas', 'Ta-Ha', 'Al-A’raf', 'Ash-Shu’ara']
  },
  {
    id: 'muhammad',
    nameArabic: 'مُحَمَّد (صلى الله عليه وسلم)',
    nameEnglish: 'Prophet Muhammad (SAW)',
    title: 'Khatam an-Nabiyyin — The Seal of the Prophets & Mercy to All Worlds',
    chronologyOrder: 6,
    quranReferences: ['Ali ‘Imran 3:144', 'Al-Ahzab 33:21, 40', 'Al-Anbiya 21:107', 'Al-Fath 48:28-29', 'Al-Qalam 68:4', 'Ad-Duha 93:1-11'],
    summary: 'The final messenger of Allah to all humanity, known as Al-Amin (the trustworthy), receiving the final revelation of the Holy Quran, enduring 13 years of persecution in Makkah, establishing justice in Madinah, and leaving a legacy of perfect mercy and character.',
    story: `Prophet Muhammad (peace and blessings be upon him) was born an orphan in Makkah in 570 CE. Known from his youth for honesty, integrity, and pure character, he earned the titles Al-Sadiq (the Truthful) and Al-Amin (the Trustworthy).

At age 40, in the Cave of Hira, the Angel Jibreel descended with the first revelation: "Read in the name of your Lord who created" (96:1). For 23 years, the Messenger of Allah conveyed the final revelation with boundless compassion, enduring severe persecution, boycott, and exile from his homeland.

He established the brotherhood of faith in Madinah, drafted the historic Constitution of Madinah guaranteeing rights to all citizens, and defended the community against military aggression. When he liberated Makkah in victory, he pardoned the very enemies who had persecuted him, quoting Prophet Yusuf: "No blame upon you today; go, you are free."

Allah testified to his sublime nature: "And indeed, you are of a great moral character" (68:4) and "And We have not sent you except as a mercy to the worlds" (21:107). On his Farewell Pilgrimage, he delivered a historic declaration of universal human equality: "An Arab has no superiority over a non-Arab nor a non-Arab has any superiority over an Arab... except by piety and good action."`,
    keyLessons: [
      'The epitome of mercy, forgiveness, honesty, and humility in all stations of life.',
      'Equality of all human beings regardless of race, color, tribe, or worldly status.',
      'Patience in adversity, magnanimity in victory, and unwavering love for his Ummah.',
      'The living embodiment of the Holy Quran in daily speech, character, and action.'
    ],
    associatedSurahs: ['Al-Ahzab', 'Muhammad', 'Al-Fath', 'Ad-Duha', 'Al-Inshirah']
  }
];

export function getAllProphetStories(): ProphetStory[] {
  return PROPHET_STORIES;
}

export function getProphetStoryById(id: string): ProphetStory | undefined {
  return PROPHET_STORIES.find(p => p.id === id);
}
