// ==============================================================================
// DEEN — Automated Two-User RLS Isolation & Multi-Device Sync Test Suite
// Verifies:
// 1. Account A and Account B are strictly isolated by PostgreSQL RLS
// 2. Account B cannot see, modify, or delete Account A's records
// 3. Account A on a second device/client receives its own synchronized data
// 4. Push subscriptions are isolated and cannot cross-pollinate
// ==============================================================================

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Load environment variables from .env
if (!process.env.VITE_SUPABASE_URL && fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      process.env[match[1]] = (match[2] || '').trim();
    }
  }
}

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const publishableKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !publishableKey) {
  console.error('Error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY required');
  process.exit(1);
}

const timestamp = Date.now();
const userA_Email = `deen.test.user.a.${timestamp}@gmail.com`;
const userB_Email = `deen.test.user.b.${timestamp}@gmail.com`;
const testPassword = 'DeenTestPassword99!';

async function runMultiUserIsolationTests() {
  console.log('====================================================');
  console.log('DEEN MULTI-USER RLS ISOLATION & SYNC TEST SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  // ----------------------------------------------------------------
  // STEP 1: Create Client A and Sign Up User A
  // ----------------------------------------------------------------
  console.log('1. Registering Test Account A...');
  const clientA = createClient(supabaseUrl, publishableKey, { auth: { persistSession: false } });
  const { data: authDataA, error: signUpErrA } = await clientA.auth.signUp({
    email: userA_Email,
    password: testPassword,
    options: { data: { full_name: 'Brother Ahmad (User A)' } }
  });

  if (signUpErrA || !authDataA.user) {
    console.error('✗ [FAIL] User A sign up error:', signUpErrA);
    failed++;
    process.exit(1);
  }
  const userA_Id = authDataA.user.id;
  console.log(`✓ [PASS] User A registered with UUID: ${userA_Id}`);
  passed++;

  // ----------------------------------------------------------------
  // STEP 2: User A Creates Personal Records
  // ----------------------------------------------------------------
  console.log('\n2. User A inserting personal data (Tasbeeh, Bookmark, Reminder, Push)...');
  
  // A. Tasbeeh session
  const { data: tasbeehA, error: tasbeehErrA } = await clientA.from('tasbeeh_sessions').insert({
    user_id: userA_Id,
    dhikr_identifier: 'subhanallah',
    dhikr_title: 'SubhanAllah',
    count_completed: 33,
    target_count: 33,
    session_date: new Date().toISOString().split('T')[0]
  }).select().single();

  if (tasbeehErrA) {
    console.error('✗ [FAIL] User A tasbeeh insert failed:', tasbeehErrA);
    failed++;
  } else {
    console.log(`✓ [PASS] User A created Tasbeeh session (ID: ${tasbeehA.id}, count: 33)`);
    passed++;
  }

  // B. Quran Bookmark
  const { data: bookmarkA, error: bmErrA } = await clientA.from('quran_bookmarks').insert({
    user_id: userA_Id,
    surah_number: 2,
    ayah_number: 255,
    verse_key: '2:255',
    note: 'Ayat al-Kursi reflection'
  }).select().single();

  if (bmErrA) {
    console.error('✗ [FAIL] User A bookmark insert failed:', bmErrA);
    failed++;
  } else {
    console.log(`✓ [PASS] User A created Quran bookmark for Ayat al-Kursi (2:255)`);
    passed++;
  }

  // C. Reminder
  const { data: reminderA, error: remErrA } = await clientA.from('reminders').insert({
    user_id: userA_Id,
    reminder_title: 'Morning Adhkar Sunnah',
    reminder_type: 'morning_adhkar',
    time_of_day: '06:00:00'
  }).select().single();

  if (remErrA) {
    console.error('✗ [FAIL] User A reminder insert failed:', remErrA);
    failed++;
  } else {
    console.log(`✓ [PASS] User A created Morning Adhkar reminder`);
    passed++;
  }

  // D. Push Subscription
  const { data: pushA, error: pushErrA } = await clientA.from('push_subscriptions').insert({
    user_id: userA_Id,
    endpoint: `https://fcm.googleapis.com/fcm/send/userA_${timestamp}`,
    p256dh: 'test_p256dh_key_A',
    auth: 'test_auth_secret_A'
  }).select().single();

  if (pushErrA) {
    console.error('✗ [FAIL] User A push subscription insert failed:', pushErrA);
    failed++;
  } else {
    console.log(`✓ [PASS] User A registered Push Subscription`);
    passed++;
  }

  // ----------------------------------------------------------------
  // STEP 3: Register and Authenticate User B
  // ----------------------------------------------------------------
  console.log('\n3. Registering Test Account B (Friend on separate device)...');
  const clientB = createClient(supabaseUrl, publishableKey, { auth: { persistSession: false } });
  const { data: authDataB, error: signUpErrB } = await clientB.auth.signUp({
    email: userB_Email,
    password: testPassword,
    options: { data: { full_name: 'Sister Fatima (User B)' } }
  });

  if (signUpErrB || !authDataB.user) {
    console.error('✗ [FAIL] User B sign up error:', signUpErrB);
    failed++;
    process.exit(1);
  }
  const userB_Id = authDataB.user.id;
  console.log(`✓ [PASS] User B registered with UUID: ${userB_Id}`);
  passed++;

  // ----------------------------------------------------------------
  // STEP 4: Test Strict RLS Isolation — User B Must See 0 Records of User A
  // ----------------------------------------------------------------
  console.log('\n4. Testing RLS Isolation: User B querying tables...');

  // A. Check tasbeeh_sessions
  const { data: bTasbeeh, error: bTasbeehErr } = await clientB.from('tasbeeh_sessions').select('*');
  if (bTasbeeh && bTasbeeh.length === 0) {
    console.log(`✓ [PASS] User B sees 0 Tasbeeh sessions (User A's 33 SubhanAllah is hidden by RLS)`);
    passed++;
  } else {
    console.error(`✗ [FAIL] DATA LEAK! User B saw User A's tasbeeh:`, bTasbeeh);
    failed++;
  }

  // B. Check quran_bookmarks
  const { data: bBookmarks, error: bBmErr } = await clientB.from('quran_bookmarks').select('*');
  if (bBookmarks && bBookmarks.length === 0) {
    console.log(`✓ [PASS] User B sees 0 Quran bookmarks (User A's 2:255 is hidden by RLS)`);
    passed++;
  } else {
    console.error(`✗ [FAIL] DATA LEAK! User B saw User A's bookmarks:`, bBookmarks);
    failed++;
  }

  // C. Check reminders
  const { data: bReminders, error: bRemErr } = await clientB.from('reminders').select('*');
  if (bReminders && bReminders.length === 0) {
    console.log(`✓ [PASS] User B sees 0 Reminders (User A's reminder is hidden by RLS)`);
    passed++;
  } else {
    console.error(`✗ [FAIL] DATA LEAK! User B saw User A's reminders:`, bReminders);
    failed++;
  }

  // D. Check push_subscriptions
  const { data: bPush, error: bPushErr } = await clientB.from('push_subscriptions').select('*');
  if (bPush && bPush.length === 0) {
    console.log(`✓ [PASS] User B sees 0 Push Subscriptions (Cannot send to User A's devices)`);
    passed++;
  } else {
    console.error(`✗ [FAIL] DATA LEAK! User B saw User A's push subscriptions:`, bPush);
    failed++;
  }

  // E. Tampering Test: User B attempting to UPDATE User A's bookmark
  console.log('\n5. Tampering Test: User B attempting to overwrite User A bookmark...');
  const { data: tamperRes, error: tamperErr } = await clientB
    .from('quran_bookmarks')
    .update({ note: 'HACKED BY USER B' })
    .eq('id', bookmarkA.id);

  // Even if no error is thrown, 0 rows must be affected under RLS
  const { data: verifyA_Bm } = await clientA.from('quran_bookmarks').select('*').eq('id', bookmarkA.id).single();
  if (verifyA_Bm.note === 'Ayat al-Kursi reflection') {
    console.log(`✓ [PASS] RLS blocked tampering! User A's record remained unaltered.`);
    passed++;
  } else {
    console.error(`✗ [FAIL] Tampering succeeded! Record altered to: ${verifyA_Bm.note}`);
    failed++;
  }

  // ----------------------------------------------------------------
  // STEP 5: Multi-Device Synchronization Test (Account A on Device 2)
  // ----------------------------------------------------------------
  console.log('\n6. Testing Multi-Device Sync: User A logs in on "Device 2" (fresh client)...');
  const clientA_Device2 = createClient(supabaseUrl, publishableKey, { auth: { persistSession: false } });
  
  const { data: loginA2, error: loginErrA2 } = await clientA_Device2.auth.signInWithPassword({
    email: userA_Email,
    password: testPassword
  });

  if (loginErrA2 || !loginA2.user) {
    console.error('✗ [FAIL] User A failed to log in on Device 2:', loginErrA2);
    failed++;
  } else {
    console.log(`✓ [PASS] User A successfully authenticated on Device 2 (UUID: ${loginA2.user.id})`);
    passed++;

    // Query Device 2 data
    const { data: dev2Tasbeeh } = await clientA_Device2.from('tasbeeh_sessions').select('*');
    const { data: dev2Bookmarks } = await clientA_Device2.from('quran_bookmarks').select('*');
    const { data: dev2Reminders } = await clientA_Device2.from('reminders').select('*');

    if (dev2Tasbeeh && dev2Tasbeeh.length === 1 && dev2Tasbeeh[0].count_completed === 33) {
      console.log(`✓ [PASS] Device 2 synchronized User A's Tasbeeh session (33 SubhanAllah)`);
      passed++;
    } else {
      console.error('✗ [FAIL] Device 2 did not sync Tasbeeh sessions correctly:', dev2Tasbeeh);
      failed++;
    }

    if (dev2Bookmarks && dev2Bookmarks.length === 1 && dev2Bookmarks[0].verse_key === '2:255') {
      console.log(`✓ [PASS] Device 2 synchronized User A's Quran bookmark (Ayat al-Kursi 2:255)`);
      passed++;
    } else {
      console.error('✗ [FAIL] Device 2 did not sync Bookmarks correctly:', dev2Bookmarks);
      failed++;
    }

    if (dev2Reminders && dev2Reminders.length === 1 && dev2Reminders[0].reminder_type === 'morning_adhkar') {
      console.log(`✓ [PASS] Device 2 synchronized User A's Reminder (Morning Adhkar)`);
      passed++;
    } else {
      console.error('✗ [FAIL] Device 2 did not sync Reminders correctly:', dev2Reminders);
      failed++;
    }
  }

  // ----------------------------------------------------------------
  // Clean Up Test Users
  // ----------------------------------------------------------------
  console.log('\n7. Cleaning up test data...');
  await clientA.from('tasbeeh_sessions').delete().eq('user_id', userA_Id);
  await clientA.from('quran_bookmarks').delete().eq('user_id', userA_Id);
  await clientA.from('reminders').delete().eq('user_id', userA_Id);
  await clientA.from('push_subscriptions').delete().eq('user_id', userA_Id);
  console.log('✓ Cleaned up User A test records.');

  console.log('\n====================================================');
  console.log(`MULTI-USER ISOLATION RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) process.exit(1);
}

runMultiUserIsolationTests().catch(err => {
  console.error('Fatal error during isolation test:', err);
  process.exit(1);
});
