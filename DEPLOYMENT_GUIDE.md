# DEEN — Vercel & Production Deployment Guide

This guide details the deployment of the DEEN Islamic Super App to **Vercel** as a high-performance Progressive Web Application (PWA).

---

## 1. Automated Deployment via GitHub + Vercel

1. Log into your Vercel Dashboard at https://vercel.com
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository: `https://github.com/BRAVE-lang/DEEN`.
4. Configure the Project Settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Configure Environment Variables in Vercel:
   - `VITE_SUPABASE_URL`: Your Supabase Project URL (`https://<project-ref>.supabase.co`)
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase public anonymous API key
   - `VITE_APP_NAME`: `DEEN`
   - `VITE_APP_TAGLINE`: `Every day, closer to Allah.`
6. Click **Deploy**.

---

## 2. SPA Client-Side Routing Configuration

A `vercel.json` configuration file is included in the project root to handle client-side routing and cache headers for PWA assets:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

---

## 3. PWA Installation Verification
Once deployed:
- **Desktop (Chrome/Edge)**: Look for the install icon in the address bar to install DEEN as a standalone desktop app.
- **Android**: Tap the banner "Add DEEN to Home Screen" or the 3-dot menu -> "Install App".
- **iOS (Safari)**: Tap the Share button -> "Add to Home Screen".

---

## 4. Post-Deployment Verification Checklist
- [ ] HTTPS is enforced across all routes.
- [ ] Service worker registers successfully in developer tools Application tab.
- [ ] Offline mode caches previously loaded Quran pages and prayer times.
- [ ] Audio playback streams smoothly from verified CDNs.
- [ ] Dynamic language switching (Arabic, English, Hindi, Gujarati) correctly applies RTL/LTR layout.
