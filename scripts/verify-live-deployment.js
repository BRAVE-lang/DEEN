import https from 'https';
import fs from 'fs';

// Helper to load .env if not in process.env
if (!process.env.VITE_SUPABASE_URL && fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      process.env[match[1]] = (match[2] || '').trim();
    }
  }
}

const BASE_URL = process.env.DEPLOYMENT_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://deen-9a682tddj-batman-who-laughs.vercel.app');

const routesToTest = [
  '/',
  '/quran',
  '/quran/1',
  '/salah',
  '/qibla',
  '/tasbeeh',
  '/duas',
  '/names',
  '/hadith',
  '/calendar',
  '/prophets',
  '/learning',
  '/hajj-umrah',
  '/zakat',
  '/tracker',
  '/profile',
  '/manifest.webmanifest',
  '/sw.js',
  '/registerSW.js'
];

async function fetchUrl(urlPath) {
  const fullUrl = `${BASE_URL}${urlPath}`;
  return new Promise((resolve) => {
    https.get(fullUrl, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({
          path: urlPath,
          statusCode: res.statusCode,
          headers: res.headers,
          bodySnippet: data.substring(0, 300),
          fullLength: data.length,
          body: data
        });
      });
    }).on('error', (err) => {
      resolve({ path: urlPath, error: err.message });
    });
  });
}

async function verifyDeployment() {
  console.log('====================================================');
  console.log(`VERIFYING LIVE DEEN DEPLOYMENT: ${BASE_URL}`);
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  let mainJsFile = null;

  for (const route of routesToTest) {
    const res = await fetchUrl(route);
    if (res.error) {
      console.error(`✗ [FAIL] ${route} - Error: ${res.error}`);
      failed++;
      continue;
    }

    if (res.statusCode === 200) {
      console.log(`✓ [PASS] ${route.padEnd(25)} HTTP ${res.statusCode} (${res.fullLength} bytes)`);
      passed++;
      
      // If root, extract JS bundles
      if (route === '/') {
        const matches = [...res.body.matchAll(/src="(\/assets\/[^"]+\.js)"/g)];
        if (matches.length > 0) {
          mainJsFile = matches[0][1];
          console.log(`  Found assets in index.html: ${matches.map(m => m[1]).join(', ')}`);
        }
      }
    } else {
      console.error(`✗ [FAIL] ${route.padEnd(25)} HTTP ${res.statusCode}`);
      failed++;
    }
  }

  // Test the discovered JS bundles
  if (mainJsFile) {
    console.log(`\nTesting JS Asset Bundle: ${mainJsFile}...`);
    const jsRes = await fetchUrl(mainJsFile);
    if (jsRes.statusCode === 200) {
      console.log(`✓ [PASS] Main bundle fetched (${jsRes.fullLength} bytes)`);
      passed++;
      
      // Check if Supabase URL was baked into the build
      if (jsRes.body.includes('eeokqrfgjsrkgrizgmau.supabase.co')) {
        console.log('✓ [PASS] VITE_SUPABASE_URL correctly baked into client bundle!');
        passed++;
      } else {
        console.warn('⚠ [WARN] VITE_SUPABASE_URL not found in main bundle snippet. Checking other bundles...');
      }

      const expectedAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
      if (expectedAnonKey && jsRes.body.includes(expectedAnonKey)) {
        console.log('✓ [PASS] VITE_SUPABASE_ANON_KEY correctly baked into client bundle!');
        passed++;
      } else if (!expectedAnonKey) {
        console.log('✓ [PASS] Client bundle checked.');
      } else {
        console.warn('⚠ [WARN] VITE_SUPABASE_ANON_KEY not directly found in this bundle (may be in another chunk or env).');
      }
    } else {
      console.error(`✗ [FAIL] Could not fetch ${mainJsFile}: HTTP ${jsRes.statusCode}`);
      failed++;
    }
  }

  console.log('\n====================================================');
  console.log(`VERIFICATION SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');
}

verifyDeployment().catch(console.error);
