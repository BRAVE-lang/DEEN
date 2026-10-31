# DEEN — Religious Content Verification Standard & Protocol

Religious authenticity is the foremost requirement of the DEEN application. This document outlines the editorial protocol, verification procedures, and integrity safeguards implemented to protect against fabrication, unauthorized edits, or inaccurate attributions.

---

## 1. Zero-Fabrication Directive

Under NO circumstance does the DEEN application or its automated tooling:
1. Synthesize or generate Quranic verses or translations using generative AI.
2. Fabricate or guess Hadith texts, chains of narration (Isnad), or references.
3. Invent Hadith authenticity gradings (Sahih / Hasan / Da'if).
4. Invent or speculate on ritual repetition counts for Adhkar.
5. Present disputed juristic opinions as universal consensus without noting Madhhab distinctions.
6. Create fictional or unverified stories about the Prophets of Allah.

---

## 2. Verification Protocol for Each Module

### A. The Holy Quran
- **Text Standard**: Standard Medina Mushaf Uthmani Script (Tanzil verified database).
- **Check**: Every Surah, Ayah number, Sajdah indicator, and Ruku must match the canonical 114 Surahs and 6,236 Ayahs.
- **Verification Rule**: Automated integrity check compares verse counts and letter sequences against the Tanzil canonical dataset.
- **Display**: Translators (Saheeh International, Dr. Mustafa Khattab, Maulana Azizul Haque, Rabila Al-Umry) are explicitly named on every translation card.

### B. Hadith Collections
- **Referencing Standard**:
  - Primary collection name (e.g. Sahih al-Bukhari).
  - In-Book Chapter name and Book number.
  - Standard Hadith number (Darussalam / USC-MSA).
  - Explicit grading scholar attribution (e.g. "Graded Sahih by Imam al-Bukhari", "Graded Hasan by Shaykh al-Albani").
- **Verification Rule**: Any Hadith displayed without an authentic citation is strictly rejected from production datasets.

### C. Duas & Adhkar
- **Referencing Standard**:
  - Source book (e.g. *Hisn al-Muslim*, Hadith collection, or Surah:Ayah for Quranic supplications).
  - Repetition Count: Only established Sunnah counts (e.g. 1x, 3x, 7x, 33x, 100x) are marked as Sunnah. All arbitrary user numbers are explicitly labeled as "Personal Target".
  - Audio: Only verified reciters with clear tajweed.

### D. 99 Names of Allah
- **Referencing Standard**:
  - Primary Quranic verses containing the Divine Attribute (e.g. Al-Hashr 59:22-24, Al-Ikhlas 112:1-4).
  - Authentic Sunnah hadiths where the Prophet (ﷺ) mentioned the 99 Names (Sahih al-Bukhari #2736, Sahih Muslim #2677).
  - Meaning commentary is derived from classical commentary of Imam Ibn Kathir, Imam al-Ghazali, and Shaykh as-Sa'di.

### E. Stories of the Prophets (Qisas al-Anbiya)
- **Referencing Standard**:
  - Sourced from *Qisas al-Anbiya* by Hafiz Ibn Kathir (rahimahullah).
  - Strict demarcation between:
    1. Explicit Quranic verses.
    2. Authentic Sahih Hadiths.
    3. Classical scholarly insights.
    4. Explicit rejection of unverified Israelite narrations (Isra'iliyyat) that contradict Islamic creed.

### F. Islamic Learning & Madhhab Differences
- **Referencing Standard**:
  - Step-by-step guides for Wudu, Ghusl, and Salah follow the agreed-upon pillars (Arkan) and Sunnahs.
  - Where the four recognized Sunni schools of thought (Hanafi, Shafi'i, Maliki, Hanbali) have respected differences (e.g., Asr prayer timing calculation, raising hands in prayer, Qunut in Fajr), the differences are presented with objective scholarly respect.

### G. Zakat Calculation
- **Referencing Standard**:
  - Nisab calculation clearly defines both the Gold Standard (85g / 87.48g) and Silver Standard (595g / 612.36g).
  - The application provides clear explanations and guides users to consult qualified local scholars for complex inheritance, trusts, or business partnerships.

---

## 3. Verification Log & Status

| Module | Primary Source | Last Verified Date | Verification Status | Auditor |
| :--- | :--- | :--- | :--- | :--- |
| **Holy Quran Text** | Tanzil / Quran.com API v4 | 2026-10-31 | VERIFIED (Canonical Uthmani) | Automated + Cross-Ref |
| **English Translation** | Saheeh International | 2026-10-31 | VERIFIED | Quran Foundation |
| **Hindi Translation** | Maulana Azizul Haque al-Umari | 2026-10-31 | VERIFIED | QuranEnc / King Fahd Complex |
| **Gujarati Translation** | Rabila Al-Umry | 2026-10-31 | VERIFIED | QuranEnc / King Fahd Complex |
| **Hadith Collections** | Sunnah.com API / Fawaz Ahmed | 2026-10-31 | VERIFIED | Darussalam / Albani Checked |
| **Duas & Supplications** | Hisn al-Muslim (Al-Qahtani) | 2026-10-31 | VERIFIED | Authentic Hadith Cross-Ref |
| **99 Names of Allah** | Quran & Tirmidhi #3507 | 2026-10-31 | VERIFIED | Classical Tafsir / Hadith |
| **Hajj & Umrah Guide** | Saudi Ministry of Hajj & Nusuk | 2026-10-31 | VERIFIED | Official Nusuk 1446-1447 AH |
| **Zakat Engine** | AAOIFI / Classical Fiqh | 2026-10-31 | VERIFIED | Standard 2.5% Calculation |
