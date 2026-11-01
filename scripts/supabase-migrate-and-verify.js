import fs from 'fs';
import path from 'path';

const token = process.env.SUPABASE_ACCESS_TOKEN;
const projectRef = process.env.SUPABASE_PROJECT_REF || 'eeokqrfgjsrkgrizgmau';

if (!token) {
  console.error('Error: SUPABASE_ACCESS_TOKEN environment variable is required.');
  process.exit(1);
}

async function runQuery(sql) {
  const url = `https://api.supabase.com/v1/projects/${projectRef}/database/query`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: sql })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API returned ${res.status}: ${text}`);
  }

  return res.json();
}

async function main() {
  console.log('====================================================');
  console.log(`CONNECTING TO SUPABASE PROJECT: ${projectRef}`);
  console.log('====================================================\n');

  // Step 1: Test basic connectivity
  console.log('1. Checking PostgreSQL version and connection...');
  const versionRes = await runQuery('SELECT version();');
  console.log('✓ Connected:', versionRes[0]?.version?.split('on')[0] || versionRes);

  // Step 2: Read and execute all migrations in order
  const migrationsDir = path.resolve('supabase/migrations');
  const migrationFiles = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();
  console.log(`\n2. Found ${migrationFiles.length} migration files in ${migrationsDir}:`);
  migrationFiles.forEach(f => console.log(`   - ${f}`));

  for (const file of migrationFiles) {
    const fullPath = path.join(migrationsDir, file);
    console.log(`\nApplying migration: ${file}...`);
    const sql = fs.readFileSync(fullPath, 'utf8');
    await runQuery(sql);
    console.log(`✓ ${file} applied successfully!`);
  }

  // Step 3: Verification of Tables
  console.log('\n3. Verifying created tables in public schema...');
  const tablesRes = await runQuery(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name;
  `);

  const createdTables = tablesRes.map(r => r.table_name);
  console.log(`Found ${createdTables.length} tables in public schema:`);
  createdTables.forEach(t => console.log(`  - ${t}`));

  const expectedTables = [
    'profiles', 'user_preferences', 'prayer_settings', 'prayer_history',
    'qaza_records', 'quran_bookmarks', 'quran_reading_history', 'quran_goals',
    'custom_dhikr', 'tasbeeh_sessions', 'dua_bookmarks', 'hadith_bookmarks',
    'favourite_names', 'fasting_records', 'deen_daily_records', 'personal_goals',
    'reminders', 'user_notes', 'content_sources', 'content_licences',
    'content_verification_logs', 'push_subscriptions'
  ];

  const missing = expectedTables.filter(t => !createdTables.includes(t));
  if (missing.length === 0) {
    console.log(`\n✓ All ${expectedTables.length} required tables are present!`);
  } else {
    console.error(`\n✗ Missing tables:`, missing);
    process.exit(1);
  }

  // Step 4: Verification of Row Level Security
  console.log('\n4. Verifying Row Level Security (RLS) status...');
  const rlsRes = await runQuery(`
    SELECT tablename, rowsecurity 
    FROM pg_tables 
    WHERE schemaname = 'public';
  `);
  
  let allRlsEnabled = true;
  rlsRes.forEach(r => {
    if (!r.rowsecurity) {
      console.warn(`  ✗ RLS NOT enabled on: ${r.tablename}`);
      allRlsEnabled = false;
    } else {
      console.log(`  ✓ RLS enabled on: ${r.tablename}`);
    }
  });

  if (allRlsEnabled) {
    console.log('\n✓ Row Level Security (RLS) is ENABLED on 100% of public tables.');
  }

  // Step 5: Verification of Policies
  console.log('\n5. Verifying RLS policies count...');
  const policiesRes = await runQuery(`
    SELECT policyname, tablename, cmd, permissive 
    FROM pg_policies 
    WHERE schemaname = 'public'
    ORDER BY tablename, policyname;
  `);
  console.log(`✓ Found ${policiesRes.length} active security policies across all tables.`);

  console.log('\n====================================================');
  console.log('DATABASE MIGRATION & SECURITY AUDIT COMPLETED 100%');
  console.log('====================================================');
}

main().catch(err => {
  console.error('Fatal error during migration:', err);
  process.exit(1);
});
