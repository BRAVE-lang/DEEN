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

  // Step 2: Read migration file
  const migrationPath = path.resolve('supabase/migrations/20261031000000_deen_initial_schema.sql');
  console.log(`\n2. Reading migration SQL from: ${migrationPath}`);
  const migrationSql = fs.readFileSync(migrationPath, 'utf8');

  // Step 3: Execute migration
  console.log('3. Applying initial schema migration...');
  const migrationRes = await runQuery(migrationSql);
  console.log('✓ Migration applied successfully!');

  // Step 4: Verification of Tables
  console.log('\n4. Verifying created tables...');
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
    'content_verification_logs'
  ];

  const missing = expectedTables.filter(t => !createdTables.includes(t));
  if (missing.length === 0) {
    console.log(`\n✓ All ${expectedTables.length} required tables are present!`);
  } else {
    console.error(`\n✗ Missing tables:`, missing);
    process.exit(1);
  }

  // Step 5: Verification of Row Level Security
  console.log('\n5. Verifying Row Level Security (RLS) status...');
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
  } else {
    console.warn('\n⚠ Some tables do not have RLS enabled.');
  }

  // Step 6: Verification of Policies
  console.log('\n6. Verifying RLS policies count...');
  const policiesRes = await runQuery(`
    SELECT policyname, tablename, cmd, permissive 
    FROM pg_policies 
    WHERE schemaname = 'public'
    ORDER BY tablename, policyname;
  `);
  console.log(`✓ Found ${policiesRes.length} active security policies.`);
  policiesRes.slice(0, 10).forEach(p => console.log(`  - [${p.tablename}] ${p.policyname} (${p.cmd})`));
  if (policiesRes.length > 10) console.log(`  ... and ${policiesRes.length - 10} more policies.`);

  // Step 7: Check Seeded verification logs
  console.log('\n7. Checking Seed Data in content_sources & verification logs...');
  const seedRes = await runQuery(`SELECT id, name FROM public.content_sources;`);
  console.log('✓ Content Sources registered:', seedRes);

  const logsRes = await runQuery(`SELECT module, dataset_version, verification_status FROM public.content_verification_logs;`);
  console.log('✓ Content Verification Logs registered:', logsRes);

  console.log('\n====================================================');
  console.log('DATABASE MIGRATION & SECURITY AUDIT COMPLETED 100%');
  console.log('====================================================');
}

main().catch(err => {
  console.error('Fatal error during migration:', err);
  process.exit(1);
});
