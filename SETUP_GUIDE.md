# DEEN — Local Setup & Development Guide

Follow this guide to run and develop the DEEN Islamic Super App on your local machine.

---

## 1. Prerequisites
- **Node.js**: v18.0.0 or later (v20+ or v24 recommended)
- **Package Manager**: npm (v9+)
- **Modern Browser**: Chrome, Edge, Safari, or Firefox with Service Worker and PWA support
- **Git**: For source version control

---

## 2. Installation & Quick Start

```bash
# Clone the repository
git clone https://github.com/BRAVE-lang/DEEN.git
cd DEEN

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start the Vite development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 3. Environment Configuration

Edit your `.env` file with your Supabase credentials:

```env
# Client-side configuration (Public / Anon key only)
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-publishable-anon-key

# App details
VITE_APP_NAME=DEEN
VITE_APP_TAGLINE="Every day, closer to Allah."
VITE_APP_VERSION=1.0.0
```

> **Security Note**: Never paste your Supabase privileged administrative secret key into `.env` or any client-facing file. The DEEN frontend operates strictly with the publishable `anon` key protected by PostgreSQL Row Level Security (RLS).

---

## 4. Applying Database Migrations (Supabase)

You can apply the schema migrations to your Supabase project in two ways:

### Option A: Using the Supabase Web Dashboard
1. Go to your Supabase project: https://supabase.com/dashboard/org/iophkxldjwsrxhkgoujh
2. Navigate to **SQL Editor** in the left sidebar.
3. Open `supabase/migrations/20261031000000_deen_initial_schema.sql` from this repository.
4. Paste the contents into the SQL Editor and click **Run**.
5. All 21 tables, triggers, indexes, and Row Level Security policies will be created immediately.

### Option B: Using Supabase CLI
```bash
# Login to Supabase
npx supabase login

# Link your remote project (replace [project-ref] with your project reference ID)
npx supabase link --project-ref [project-ref]

# Push the migrations
npx supabase db push
```

---

## 5. Offline & Guest Functionality
Even without any Supabase credentials or network connection:
- The app operates in **Offline / Guest Mode** seamlessly.
- Prayer times are calculated locally using astronomical mathematics (`adhan` engine).
- Quran surah lists, verses, and bundled authentic adhkar are stored in IndexedDB.
- Bookmarks, Tasbeeh sessions, Qaza records, and Journal entries are persisted in IndexedDB and automatically synchronize to Supabase when the user signs in.

---

## 6. Building for Production

```bash
# Run TypeScript check and production build
npm run build

# Preview the production build locally
npm run preview
```
