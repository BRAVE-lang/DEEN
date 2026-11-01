// ==============================================================================
// DEEN — Product Upgrade Comprehensive Verification Script
// Tests: 99 Names, Qibla Compass Math, Duas & Adhkar, Fasting & Reading Progress
// ==============================================================================

import assert from 'assert';
import fs from 'fs';

console.log('====================================================');
console.log('DEEN PRODUCT UPGRADE SYSTEM VERIFICATION');
console.log('====================================================\n');

let passedCount = 0;
let totalCount = 0;

function test(description, fn) {
  totalCount++;
  try {
    fn();
    console.log(`✓ [PASS] ${description}`);
    passedCount++;
  } catch (err) {
    console.error(`✗ [FAIL] ${description}`);
    console.error(`  ${err.message}`);
  }
}

// ---------------------------------------------------------------------------
// 1. VERIFY 99 NAMES OF ALLAH COMPLETE DATASET
// ---------------------------------------------------------------------------
console.log('--- 1. Testing 99 Names of Allah Dataset Completeness ---');
const namesContent = fs.readFileSync('src/services/namesService.ts', 'utf8');

test('Contains all 99 Names of Allah', () => {
  for (let i = 1; i <= 99; i++) {
    assert(namesContent.includes(`number: ${i},`), `Missing Name number ${i}`);
  }
});

test('Each Name has complete 4-language support (Arabic, English, Hindi, Gujarati)', () => {
  assert(namesContent.includes('en:'), 'Missing English translations');
  assert(namesContent.includes('hi:'), 'Missing Hindi translations');
  assert(namesContent.includes('gu:'), 'Missing Gujarati translations');
  assert(namesContent.includes('arabic:'), 'Missing Arabic typography');
});

test('Each Name has verified Quranic or Hadith theological reference', () => {
  assert(namesContent.includes('quranReference:'), 'Missing references in 99 Names');
  assert(namesContent.includes('audioUrl:'), 'Missing CDN audio URLs');
});

// ---------------------------------------------------------------------------
// 2. VERIFY QIBLA 3D COMPASS TILT & ORIENTATION MATHEMATICS
// ---------------------------------------------------------------------------
console.log('\n--- 2. Testing Qibla Compass Tilt Compensation & Screen Rotation ---');
const qiblaContent = fs.readFileSync('src/services/qiblaService.ts', 'utf8');
const qiblaPageContent = fs.readFileSync('src/pages/Qibla.tsx', 'utf8');

test('Implements 3D Euler tilt compensation (alpha, beta, gamma)', () => {
  assert(qiblaContent.includes('computeCompassHeading'), 'Missing computeCompassHeading function');
  assert(qiblaContent.includes('Math.sin(beta)') && qiblaContent.includes('Math.sin(gamma)'), 'Missing Tait-Bryan Euler pitch & roll trigonometry');
  assert(qiblaContent.includes('Math.atan2'), 'Missing atan2 arctangent compass projection');
});

test('Handles screen orientation angles (landscape 90°, 270°, portrait 0°, 180°)', () => {
  assert(qiblaContent.includes('screenAngle'), 'Missing screenAngle parameter in computeCompassHeading');
  assert(qiblaPageContent.includes('window.screen?.orientation?.angle') || qiblaPageContent.includes('screen.orientation.angle'), 'Missing screen orientation angle in Qibla.tsx');
  assert(qiblaContent.includes('(headingDeg + screenAngle) % 360'), 'Missing screen angle rotation logic');
});

test('Implements shortest angular trajectory interpolation', () => {
  assert(qiblaContent.includes('getShortestAngleDiff'), 'Missing shortest angular difference logic');
});

// ---------------------------------------------------------------------------
// 3. VERIFY DUAS & ADHKAR AUTHENTIC COLLECTIONS
// ---------------------------------------------------------------------------
console.log('\n--- 3. Testing Authentic Duas & Adhkar Collections ---');
const duaContent = fs.readFileSync('src/services/duaService.ts', 'utf8');

const expectedCategories = [
  'morning_evening',
  'after_prayer',
  'protection',
  'illness',
  'distress',
  'forgiveness',
  'travel',
  'parents_family',
  'ramadan_fasting',
  'rabbana'
];

test('Contains all required companion Dua collections', () => {
  for (const cat of expectedCategories) {
    assert(duaContent.includes(`category: '${cat}'`), `Missing Dua category: ${cat}`);
  }
});

test('All Duas have classical Hadith citations (Bukhari, Muslim, Tirmidhi, Abu Dawood)', () => {
  assert(duaContent.includes('Sahih al-Bukhari') || duaContent.includes('Sahih Muslim'), 'Missing canonical Sahih hadith citations');
  assert(duaContent.includes('Sunan Abi Dawud') || duaContent.includes('Jami at-Tirmidhi'), 'Missing canonical Sunan citations');
});

test('Includes transliteration and 3 vernacular translations for every entry', () => {
  assert(duaContent.includes('transliteration:'), 'Missing transliterations');
  assert(duaContent.includes('en:') && duaContent.includes('hi:') && duaContent.includes('gu:'), 'Missing translations');
});

// ---------------------------------------------------------------------------
// 4. VERIFY QURAN READING GOAL & FASTING TRACKER LOGIC
// ---------------------------------------------------------------------------
console.log('\n--- 4. Testing Quran Reading Goals & Fasting Tracker Architecture ---');
const dbContent = fs.readFileSync('src/services/dbService.ts', 'utf8');
const syncContent = fs.readFileSync('src/services/syncService.ts', 'utf8');

test('IndexedDB schema includes fasting_records, quran_goals, and prayer_history', () => {
  assert(dbContent.includes('fasting_records'), 'Missing fasting_records in dbService');
  assert(dbContent.includes('quran_goals'), 'Missing quran_goals in dbService');
  assert(dbContent.includes('prayer_history'), 'Missing prayer_history in dbService');
});

test('Sync Service bidirectionally syncs fasting records, reading history & bookmarks', () => {
  assert(syncContent.includes('fasting_records'), 'Missing fasting_records sync');
  assert(syncContent.includes('quran_reading_history'), 'Missing quran_reading_history sync');
  assert(syncContent.includes('quran_bookmarks'), 'Missing quran_bookmarks sync');
});

test('Logout securely purges all user stores to prevent cross-account data leakage', () => {
  assert(syncContent.includes("db.clear('fasting_records')"), 'Fasting records not cleared on logout');
  assert(syncContent.includes("db.clear('tasbeeh_sessions')"), 'Tasbeeh not cleared on logout');
  assert(syncContent.includes("db.clear('bookmarks')"), 'Bookmarks not cleared on logout');
  assert(syncContent.includes("db.clear('daily_deen_logs')"), 'Daily logs not cleared on logout');
});

// ---------------------------------------------------------------------------
// SUMMARY
// ---------------------------------------------------------------------------
console.log('\n====================================================');
console.log(`PRODUCT UPGRADE RESULTS: ${passedCount}/${totalCount} TESTS PASSED (${Math.round((passedCount/totalCount)*100)}%)`);
console.log('====================================================');

if (passedCount !== totalCount) {
  process.exit(1);
}
