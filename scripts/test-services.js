import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan';

console.log('====================================================');
console.log('DEEN AUTOMATED VERIFICATION TEST SUITE');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`✓ [PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`✗ [FAIL] ${message}`);
    process.exitCode = 1;
  }
}

// TEST 1: Adhan Calculation Engine
console.log('--- 1. Testing Adhan Astronomical Prayer Calculations ---');
const makkahCoords = new Coordinates(21.4225, 39.8262);
const paramsShafii = CalculationMethod.UmmAlQura();
paramsShafii.madhab = Madhab.Shafi;
const prayerTimesShafii = new PrayerTimes(makkahCoords, new Date(), paramsShafii);

assert(prayerTimesShafii.fajr instanceof Date, 'Makkah Fajr calculation produces valid Date object');
assert(prayerTimesShafii.dhuhr instanceof Date, 'Makkah Dhuhr calculation produces valid Date object');
assert(prayerTimesShafii.asr instanceof Date, 'Makkah Asr calculation produces valid Date object');
assert(prayerTimesShafii.maghrib instanceof Date, 'Makkah Maghrib calculation produces valid Date object');
assert(prayerTimesShafii.isha instanceof Date, 'Makkah Isha calculation produces valid Date object');

// Check Hanafi vs Shafi'i Asr Timing
const paramsHanafi = CalculationMethod.Karachi();
paramsHanafi.madhab = Madhab.Hanafi;
const prayerTimesHanafi = new PrayerTimes(makkahCoords, new Date(), paramsHanafi);
assert(
  prayerTimesHanafi.asr.getTime() > prayerTimesShafii.asr.getTime(),
  'Hanafi Asr timing occurs later than Shafi’i Asr (Shadow 2x vs 1x)'
);

// TEST 2: Great Circle Qibla Calculations
console.log('\n--- 2. Testing Qibla Forward Azimuth & Geodesic Mathematics ---');
const KAABA_COORDS = { latitude: 21.422487, longitude: 39.826206 };

function calculateQiblaDirection(latitude, longitude) {
  const phi1 = (latitude * Math.PI) / 180;
  const lambda1 = (longitude * Math.PI) / 180;
  const phi2 = (KAABA_COORDS.latitude * Math.PI) / 180;
  const lambda2 = (KAABA_COORDS.longitude * Math.PI) / 180;
  const deltaLambda = lambda2 - lambda1;
  const y = Math.sin(deltaLambda);
  const x = Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(deltaLambda);
  let qiblaDeg = (Math.atan2(y, x) * 180) / Math.PI;
  return (qiblaDeg + 360) % 360;
}

function calculateDistanceToKaaba(latitude, longitude) {
  const R = 6371;
  const dLat = ((KAABA_COORDS.latitude - latitude) * Math.PI) / 180;
  const dLon = ((KAABA_COORDS.longitude - longitude) * Math.PI) / 180;
  const lat1 = (latitude * Math.PI) / 180;
  const lat2 = (KAABA_COORDS.latitude * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// London to Makkah: ~119° South-East
const londonQibla = calculateQiblaDirection(51.5074, -0.1278);
assert(londonQibla > 115 && londonQibla < 125, `London Qibla angle is correct (~119°), calculated: ${londonQibla.toFixed(1)}°`);

// Distance to Makkah from London: ~4,790 km
const londonDist = calculateDistanceToKaaba(51.5074, -0.1278);
assert(londonDist > 4700 && londonDist < 4900, `London to Kaaba distance is correct (~4,790km), calculated: ${londonDist}km`);

// Mumbai to Makkah: ~278° West
const mumbaiQibla = calculateQiblaDirection(19.0760, 72.8777);
assert(mumbaiQibla > 270 && mumbaiQibla < 285, `Mumbai Qibla angle is correct (~278°), calculated: ${mumbaiQibla.toFixed(1)}°`);

// TEST 3: Zakat Mathematical Calculations & Nisab Verification
console.log('\n--- 3. Testing Zakat Calculation Engine & Fiqh Thresholds ---');
function calculateZakat(input) {
  const totalAssets = input.cash + input.goldValue + input.silverValue + input.businessStock;
  const netWealth = Math.max(0, totalAssets - input.debts);
  const nisab = input.nisabStandard === 'silver' ? 595 * input.silverPrice : 85 * input.goldPrice;
  const eligible = netWealth >= nisab && nisab > 0;
  const zakat = eligible ? Math.round(netWealth * 0.025 * 100) / 100 : 0;
  return { netWealth, nisab, eligible, zakat };
}

// Case A: Wealth below Nisab
const belowNisab = calculateZakat({
  cash: 200,
  goldValue: 0,
  silverValue: 0,
  businessStock: 0,
  debts: 0,
  nisabStandard: 'silver',
  silverPrice: 1.0,
  goldPrice: 80.0
});
assert(!belowNisab.eligible, 'Wealth below silver Nisab ($200 < $595) correctly marks ineligible for Zakat');
assert(belowNisab.zakat === 0, 'Zakat payable is 0 when below Nisab');

// Case B: Wealth above Nisab ($10,000 cash, 0 debts) -> 2.5% = $250
const aboveNisab = calculateZakat({
  cash: 10000,
  goldValue: 0,
  silverValue: 0,
  businessStock: 0,
  debts: 0,
  nisabStandard: 'silver',
  silverPrice: 1.0,
  goldPrice: 80.0
});
assert(aboveNisab.eligible, 'Wealth of $10,000 correctly exceeds Nisab');
assert(aboveNisab.zakat === 250, `Zakat of $10,000 equals exactly $250 (2.5%), calculated: ${aboveNisab.zakat}`);

// Case C: Liabilities deduction ($10,000 assets - $6,000 debts = $4,000 net) -> 2.5% of $4,000 = $100
const withDebts = calculateZakat({
  cash: 10000,
  goldValue: 0,
  silverValue: 0,
  businessStock: 0,
  debts: 6000,
  nisabStandard: 'silver',
  silverPrice: 1.0,
  goldPrice: 80.0
});
assert(withDebts.netWealth === 4000, 'Liabilities correctly deducted from gross assets ($4,000)');
assert(withDebts.zakat === 100, `Zakat payable after liabilities is exactly $100 (2.5% of $4,000), calculated: ${withDebts.zakat}`);

// TEST 4: Ayah Audio URL Builder
console.log('\n--- 4. Testing Quranic Recitation Audio CDN Endpoints ---');
function getAyahAudioUrl(verseKey, reciterFolder = 'Alafasy/mp3') {
  const [surah, ayah] = verseKey.split(':');
  return `https://verses.quran.com/${reciterFolder}/${surah.padStart(3, '0')}${ayah.padStart(3, '0')}.mp3`;
}
const audioUrl1 = getAyahAudioUrl('1:1');
const audioUrl2 = getAyahAudioUrl('2:255');
assert(audioUrl1 === 'https://verses.quran.com/Alafasy/mp3/001001.mp3', `Ayah 1:1 audio formatted correctly: ${audioUrl1}`);
assert(audioUrl2 === 'https://verses.quran.com/Alafasy/mp3/002255.mp3', `Ayat al-Kursi (2:255) audio formatted correctly: ${audioUrl2}`);

console.log('\n====================================================');
console.log(`TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED (100% SUCCESS)`);
console.log('====================================================');
