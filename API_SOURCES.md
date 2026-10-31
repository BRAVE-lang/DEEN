# DEEN — API Sources and Architecture Documentation

This document records all verified external and local data sources, API endpoints, authentication requirements, rate limits, and integration status for the DEEN Islamic Super App.

---

## 1. The Holy Quran & Translations

### Primary Source: Quran Foundation (api.quran.com)
- **Provider**: Quran Foundation
- **Official URL**: https://quran.com / https://api-docs.quran.com
- **API Base Endpoint**: `https://api.quran.com/api/v4`
- **Authentication**: None required for standard v4 endpoints.
- **Rate Limits**: Generous public limit (100 req/min recommended with client caching).
- **Licensing & Copyright**: Open Quranic content under Creative Commons and Quran Foundation open data policy.
- **Attribution**: "Quran data provided by Quran.com / Quran Foundation."
- **Key Endpoints Integrated**:
  - Chapters List: `GET /chapters?language={lang}`
  - Chapter Info: `GET /chapters/{id}/info`
  - Verses (Uthmani Script): `GET /verses/by_chapter/{chapter_id}?language={lang}&fields=text_uthmani,chapter_id,page_number,juz_number&translations={resource_ids}&per_page={limit}`
  - Audio Recitations: `GET /chapter_recitations/{reciter_id}/{chapter_id}` and `GET /recitations/{reciter_id}/by_ayah/{verse_key}`
  - Recitation Audio CDN: `https://verses.quran.com/` and `https://download.quranicaudio.com/`
- **Translation Resource IDs**:
  - English: Saheeh International (ID: 20) & Dr. Mustafa Khattab Clear Quran (ID: 131)
  - Hindi: Maulana Azizul Haque al-Umari (ID: 122)
  - Gujarati: Rabila Al-Umry (ID: 225)
  - Transliteration: Official English transliteration (ID: 57)
- **Integration Status**: Verified, Active, and Tested.

### Secondary / Offline Source: Tanzil Project & QuranEnc
- **Provider**: Tanzil.net & QuranEnc.com
- **Official URL**: https://tanzil.net & https://quranenc.com
- **Licensing**: Tanzil Pure Text License (unaltered text freely redistributable). QuranEnc translation licenses (King Fahd Complex / trusted Islamic publishers).
- **Integration Status**: Verified fallback.

---

## 2. Prayer Times, Hijri Calendar & Qibla

### Primary Online Source: AlAdhan API
- **Provider**: AlAdhan (Major Islamic Prayer Times Service)
- **Official URL**: https://aladhan.com
- **API Base Endpoint**: `https://api.aladhan.com/v1`
- **Authentication**: None required.
- **Rate Limits**: Unlimited public API (cached locally in IndexedDB / Cache API).
- **Licensing**: Public API, Open Islamic utilities.
- **Attribution**: "Prayer times and Qibla calculations powered by AlAdhan API."
- **Key Endpoints Integrated**:
  - Daily Timings by Coordinates: `GET /timings/{timestamp}?latitude={lat}&longitude={lng}&method={method}&school={school}`
  - Timings by City: `GET /timingsByCity?city={city}&country={country}&method={method}&school={school}`
  - Monthly Calendar: `GET /calendar/{year}/{month}?latitude={lat}&longitude={lng}&method={method}`
  - Qibla Direction: `GET /qibla/{latitude}/{longitude}`
  - Gregorian to Hijri: `GET /gToH?date={DD-MM-YYYY}`
- **Integration Status**: Verified, Active, and Tested.

### Standalone Offline Calculation Engine: Adhan Library (Batoul Apps)
- **Provider**: Batoul Apps / adhan (npm)
- **Package**: `adhan` (v4.4.3)
- **Algorithm**: High-precision astronomical calculation (Jean Meeus algorithm) based on exact latitude, longitude, and elevation.
- **Supported Calculation Methods**:
  - Muslim World League (MWL)
  - Islamic Society of North America (ISNA)
  - Egyptian General Authority of Survey
  - Umm al-Qura University, Makkah
  - University of Islamic Sciences, Karachi (Hanafi)
  - Gulf Region
  - Kuwait
  - Qatar
  - Majlis Ugama Islam Singapura, Singapore (MUIS)
  - Union des Organisations Islamiques de France (UOIF)
  - Diyanet İşleri Başkanlığı, Turkey
  - Tehran Institute of Geophysics
  - Shia Ithna-Ashari (Jafari)
- **Asr Juristic Methods**:
  - Standard (Shafi'i, Maliki, Hanbali) — Shadow length = 1x
  - Hanafi — Shadow length = 2x
- **Integration Status**: Fully Bundled. 100% functional offline without internet connection.

---

## 3. Authentic Hadith Collections

### Primary Datasets: Sunnah.com Verified Open Hadith Data
- **Collections Included**:
  - Sahih al-Bukhari (Imam Muhammad al-Bukhari)
  - Sahih Muslim (Imam Muslim ibn al-Hajjaj)
  - Sunan Abu Dawood (Imam Abu Dawood Sulayman ibn al-Ash'ath)
  - Jami' at-Tirmidhi (Imam Abu Isa Muhammad at-Tirmidhi)
  - Sunan an-Nasa'i (Imam Ahmad ibn Shu'ayb an-Nasa'i)
  - Sunan Ibn Majah (Imam Ibn Majah)
  - Riyad as-Salihin (Imam Yahya ibn Sharaf an-Nawawi)
  - 40 Hadith an-Nawawi
- **Data Attributes Preserved**:
  - Arabic text with full Tashkeel
  - English translation
  - In-book reference (Book number, Hadith number)
  - Chapter titles (Arabic and English)
  - Scholarly authenticity grading (Sahih, Hasan, Da'if) and grading scholar attribution (e.g. Al-Albani, Zubair Ali Zai, Darussalam)
- **Hosting / Delivery**:
  - High-speed verified CDN (`cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/...`)
  - Bundled essential hadiths (Daily Hadith, 40 Nawawi, Chapters of Faith, Prayer, and Character) stored locally for instant offline reading.
- **Integration Status**: Verified, Active, and Tested.

---

## 4. Authentic Duas and Adhkar (Fortress of the Muslim)

### Primary Source: Hisn al-Muslim (Sa'id ibn Ali ibn Wahf al-Qahtani) & The Holy Quran
- **Authenticity Standard**: Every single Dua contains exact chapter, verse or Hadith source (Bukhari, Muslim, Abu Dawood, Tirmidhi, etc.).
- **Languages Provided**: Arabic text, Transliteration, English meaning, Hindi meaning, Gujarati meaning.
- **Audio Recitations**: Authentic audio pronunciation tracks.
- **Categories**: Morning, Evening, Sleep, Waking, Food & Drink, Travel, Protection, Istighfar, Anxiety, Parents, Istikhara, Ramadan, Masnoon, Quranic Rabbana Duas.
- **Storage**: Bundled JSON database + IndexedDB offline cache.
- **Integration Status**: 100% complete and verified.

---

## 5. 99 Names of Allah (Asma ul-Husna)

### Source: Authentic Quranic Verses and Sunnah Enumeration (Tirmidhi 3507, Sahih Bukhari 2736, Sahih Muslim 2677)
- **Attributes Provided**:
  - Name # (1–99)
  - Arabic Calligraphy & text
  - Transliteration
  - English Meaning & Comprehensive Theological Explanation
  - Hindi Translation
  - Gujarati Translation
  - Primary Quranic & Hadith References
  - Audio pronunciation
- **Storage**: Bundled and cached for instant zero-latency loading.
- **Integration Status**: Complete and verified.

---

## 6. Hajj & Umrah Interactive Guides

### Official Guidelines: Ministry of Hajj and Umrah (Kingdom of Saudi Arabia) & Nusuk Platform
- **Official References**: https://haj.gov.sa and https://nusuk.sa
- **Content Structure**:
  - Interactive Step-by-Step Pilgrim Workflow (Ihram, Tawaf, Sa'i, Halq/Taqsir, Mina, Arafat, Muzdalifah, Jamarat, Tawaf al-Wada)
  - Talbiyah audio and Duas with transliteration and translation
  - Interactive packing & rites checklist saved to local storage / Supabase
  - Common mistakes and corrective rulings (Dam / Fidyah)
  - Emergency contact hotlines (Saudi Emergency: 911, Hajj Ministry Center: 1966)
- **Integration Status**: Complete and verified.

---

## 7. Zakat Calculator Engine

### Standard: Classical Fiqh Consensus & Modern Shariah Standards (AAOIFI)
- **Nisab Standards Supported**:
  - Gold Nisab: 87.48 grams (or 85 grams standard)
  - Silver Nisab: 612.36 grams (or 595 grams standard)
- **Asset Categories**:
  - Cash on hand & in checking/savings accounts
  - Gold & Silver jewelry/bullion
  - Business merchandise & inventory
  - Shares, mutual funds, 401(k) zakatable portions
  - Receivables & loans given expected back
  - Deductions: Immediate short-term liabilities & due bills
- **Rate**: 2.5% (Lunar/Hijri year) or 2.577% (Solar year)
- **Integration Status**: Complete and mathematically tested.

---

## 8. Backend & Cloud Infrastructure: Supabase

### Project & Organization
- **Organization**: `https://supabase.com/dashboard/org/iophkxldjwsrxhkgoujh`
- **Database Engine**: PostgreSQL 15+
- **Security Features**:
  - Row Level Security (RLS) on all private user tables
  - Client-side uses only public Publishable Anon Key
  - Zero server-role key exposure in frontend or git
  - Full offline fallback in IndexedDB for unauthenticated/guest users
- **Integration Status**: Active.
