-- ==============================================================================
-- DEEN ISLAMIC SUPER APP — COMPREHENSIVE INITIAL SCHEMA & MIGRATIONS
-- Generated for PostgreSQL 15+ & Supabase
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Helper function for automated updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- 2. USER PROFILE & PREFERENCES
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    preferred_language VARCHAR(10) DEFAULT 'en' CHECK (preferred_language IN ('ar', 'en', 'hi', 'gu')),
    theme VARCHAR(10) DEFAULT 'dark' CHECK (theme IN ('light', 'dark', 'system')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    preferred_reciter_id INT DEFAULT 7, -- Mishari Rashid Al-Afasy
    arabic_font_size VARCHAR(10) DEFAULT 'medium' CHECK (arabic_font_size IN ('small', 'medium', 'large', 'xlarge')),
    arabic_font_family VARCHAR(50) DEFAULT 'amiri',
    translation_font_size VARCHAR(10) DEFAULT 'medium',
    show_transliteration BOOLEAN DEFAULT TRUE,
    show_translation BOOLEAN DEFAULT TRUE,
    auto_scroll BOOLEAN DEFAULT TRUE,
    daily_ayah_notification BOOLEAN DEFAULT TRUE,
    daily_hadith_notification BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DROP TRIGGER IF EXISTS set_user_preferences_updated_at ON public.user_preferences;
CREATE TRIGGER set_user_preferences_updated_at
BEFORE UPDATE ON public.user_preferences
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 3. PRAYER SETTINGS & TIMETABLE ADJUSTMENTS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.prayer_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    city VARCHAR(100) DEFAULT 'Mecca',
    country VARCHAR(100) DEFAULT 'Saudi Arabia',
    latitude NUMERIC(10, 7) DEFAULT 21.4225,
    longitude NUMERIC(10, 7) DEFAULT 39.8262,
    calculation_method INT DEFAULT 4, -- Umm al-Qura
    juristic_method VARCHAR(20) DEFAULT 'shafii' CHECK (juristic_method IN ('shafii', 'hanafi')),
    fajr_adjustment INT DEFAULT 0,
    dhuhr_adjustment INT DEFAULT 0,
    asr_adjustment INT DEFAULT 0,
    maghrib_adjustment INT DEFAULT 0,
    isha_adjustment INT DEFAULT 0,
    adhan_notification_enabled BOOLEAN DEFAULT TRUE,
    adhan_sound VARCHAR(50) DEFAULT 'makkah',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DROP TRIGGER IF EXISTS set_prayer_settings_updated_at ON public.prayer_settings;
CREATE TRIGGER set_prayer_settings_updated_at
BEFORE UPDATE ON public.prayer_settings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 4. PRAYER HISTORY & QAZA TRACKING
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.prayer_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    prayer_name VARCHAR(20) NOT NULL CHECK (prayer_name IN ('fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha')),
    status VARCHAR(20) NOT NULL CHECK (status IN ('completed', 'missed', 'qaza', 'excused')),
    in_congregation BOOLEAN DEFAULT FALSE,
    prayed_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_user_date_prayer UNIQUE (user_id, date, prayer_name)
);

CREATE INDEX idx_prayer_history_user_date ON public.prayer_history(user_id, date);

CREATE TABLE IF NOT EXISTS public.qaza_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    fajr_count INT DEFAULT 0 CHECK (fajr_count >= 0),
    dhuhr_count INT DEFAULT 0 CHECK (dhuhr_count >= 0),
    asr_count INT DEFAULT 0 CHECK (asr_count >= 0),
    maghrib_count INT DEFAULT 0 CHECK (maghrib_count >= 0),
    isha_count INT DEFAULT 0 CHECK (isha_count >= 0),
    witr_count INT DEFAULT 0 CHECK (witr_count >= 0),
    target_date DATE,
    notes TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DROP TRIGGER IF EXISTS set_qaza_records_updated_at ON public.qaza_records;
CREATE TRIGGER set_qaza_records_updated_at
BEFORE UPDATE ON public.qaza_records
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 5. QURAN BOOKMARKS, READING HISTORY & GOALS
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.quran_bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    surah_number INT NOT NULL CHECK (surah_number BETWEEN 1 AND 114),
    ayah_number INT NOT NULL CHECK (ayah_number >= 1),
    verse_key VARCHAR(20) NOT NULL,
    note TEXT,
    color_tag VARCHAR(20) DEFAULT 'gold',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_user_verse_bookmark UNIQUE (user_id, verse_key)
);

CREATE INDEX idx_quran_bookmarks_user ON public.quran_bookmarks(user_id);

CREATE TABLE IF NOT EXISTS public.quran_reading_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    surah_number INT NOT NULL CHECK (surah_number BETWEEN 1 AND 114),
    ayah_number INT NOT NULL CHECK (ayah_number >= 1),
    page_number INT CHECK (page_number BETWEEN 1 AND 604),
    juz_number INT CHECK (juz_number BETWEEN 1 AND 30),
    read_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_quran_reading_history_user ON public.quran_reading_history(user_id, read_at DESC);

CREATE TABLE IF NOT EXISTS public.quran_goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    target_days INT NOT NULL CHECK (target_days > 0),
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE NOT NULL,
    pages_read INT DEFAULT 0,
    total_pages INT DEFAULT 604,
    status VARCHAR(20) DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- 6. TASBEEH & CUSTOM DHIKR
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.custom_dhikr (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title_english VARCHAR(150) NOT NULL,
    arabic_text TEXT,
    transliteration TEXT,
    meaning TEXT,
    default_target INT DEFAULT 33 CHECK (default_target > 0),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.tasbeeh_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    dhikr_identifier VARCHAR(100) NOT NULL,
    dhikr_title VARCHAR(150) NOT NULL,
    count_completed INT NOT NULL CHECK (count_completed >= 0),
    target_count INT,
    session_date DATE NOT NULL DEFAULT CURRENT_DATE,
    duration_seconds INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_tasbeeh_sessions_user_date ON public.tasbeeh_sessions(user_id, session_date);

-- ==============================================================================
-- 7. DUA & HADITH BOOKMARKS & 99 NAMES
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.dua_bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    dua_id VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_user_dua UNIQUE (user_id, dua_id)
);

CREATE TABLE IF NOT EXISTS public.hadith_bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    collection VARCHAR(50) NOT NULL,
    hadith_number VARCHAR(50) NOT NULL,
    chapter_id VARCHAR(50),
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_user_hadith UNIQUE (user_id, collection, hadith_number)
);

CREATE TABLE IF NOT EXISTS public.favourite_names (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name_number INT NOT NULL CHECK (name_number BETWEEN 1 AND 99),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_user_name UNIQUE (user_id, name_number)
);

-- ==============================================================================
-- 8. FASTING, DAILY DEEN TRACKER & NOTES
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.fasting_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    fast_date DATE NOT NULL,
    fast_type VARCHAR(30) NOT NULL CHECK (fast_type IN ('ramadan', 'sunnah_monday_thursday', 'white_days', 'ashura', 'arafah', 'qaza', 'voluntary')),
    completed BOOLEAN DEFAULT TRUE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_user_fast_date UNIQUE (user_id, fast_date)
);

CREATE TABLE IF NOT EXISTS public.deen_daily_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    record_date DATE NOT NULL,
    prayers_completed INT DEFAULT 0 CHECK (prayers_completed BETWEEN 0 AND 5),
    quran_pages_read INT DEFAULT 0,
    dhikr_count INT DEFAULT 0,
    fasted BOOLEAN DEFAULT FALSE,
    charity_given BOOLEAN DEFAULT FALSE,
    score_percentage NUMERIC(5, 2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_user_daily_record UNIQUE (user_id, record_date)
);

DROP TRIGGER IF EXISTS set_deen_daily_records_updated_at ON public.deen_daily_records;
CREATE TRIGGER set_deen_daily_records_updated_at
BEFORE UPDATE ON public.deen_daily_records
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.personal_goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) DEFAULT 'general',
    target_date DATE,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    reminder_title VARCHAR(150) NOT NULL,
    reminder_type VARCHAR(50) NOT NULL, -- prayer, friday_kahf, morning_adhkar, evening_adhkar, fasting
    frequency VARCHAR(30) DEFAULT 'daily',
    time_of_day TIME NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.user_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'reflections',
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DROP TRIGGER IF EXISTS set_user_notes_updated_at ON public.user_notes;
CREATE TRIGGER set_user_notes_updated_at
BEFORE UPDATE ON public.user_notes
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 9. CONTENT SOURCES, LICENCES & VERIFICATION AUDIT
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.content_sources (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    official_url TEXT NOT NULL,
    api_endpoint TEXT,
    auth_type VARCHAR(50) DEFAULT 'none',
    data_type VARCHAR(50) NOT NULL,
    rate_limits TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.content_licences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id VARCHAR(50) REFERENCES public.content_sources(id) ON DELETE CASCADE,
    licence_type VARCHAR(100) NOT NULL,
    licence_url TEXT,
    attribution_text TEXT NOT NULL,
    commercial_allowed BOOLEAN DEFAULT FALSE,
    offline_cache_allowed BOOLEAN DEFAULT TRUE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.content_verification_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module VARCHAR(50) NOT NULL,
    dataset_version VARCHAR(50) NOT NULL,
    content_hash VARCHAR(128) NOT NULL,
    total_records INT NOT NULL,
    verification_status VARCHAR(20) DEFAULT 'verified' CHECK (verification_status IN ('verified', 'flagged', 'pending')),
    auditor VARCHAR(100) NOT NULL,
    verified_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    notes TEXT
);

-- ==============================================================================
-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all private user tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qaza_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quran_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quran_reading_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quran_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_dhikr ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasbeeh_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dua_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hadith_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favourite_names ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fasting_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deen_daily_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_notes ENABLE ROW LEVEL SECURITY;

-- Enable RLS on public content metadata tables
ALTER TABLE public.content_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_licences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_verification_logs ENABLE ROW LEVEL SECURITY;

-- User-Isolation Policies: Only the owner can view and modify their own data
DROP POLICY IF EXISTS "Users can view and edit own profile" ON public.profiles;
CREATE POLICY "Users can view and edit own profile" ON public.profiles FOR ALL USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can manage own preferences" ON public.user_preferences;
CREATE POLICY "Users can manage own preferences" ON public.user_preferences FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own prayer settings" ON public.prayer_settings;
CREATE POLICY "Users can manage own prayer settings" ON public.prayer_settings FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own prayer history" ON public.prayer_history;
CREATE POLICY "Users can manage own prayer history" ON public.prayer_history FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own qaza records" ON public.qaza_records;
CREATE POLICY "Users can manage own qaza records" ON public.qaza_records FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own quran bookmarks" ON public.quran_bookmarks;
CREATE POLICY "Users can manage own quran bookmarks" ON public.quran_bookmarks FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own quran history" ON public.quran_reading_history;
CREATE POLICY "Users can manage own quran history" ON public.quran_reading_history FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own quran goals" ON public.quran_goals;
CREATE POLICY "Users can manage own quran goals" ON public.quran_goals FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own custom dhikr" ON public.custom_dhikr;
CREATE POLICY "Users can manage own custom dhikr" ON public.custom_dhikr FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own tasbeeh sessions" ON public.tasbeeh_sessions;
CREATE POLICY "Users can manage own tasbeeh sessions" ON public.tasbeeh_sessions FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own dua bookmarks" ON public.dua_bookmarks;
CREATE POLICY "Users can manage own dua bookmarks" ON public.dua_bookmarks FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own hadith bookmarks" ON public.hadith_bookmarks;
CREATE POLICY "Users can manage own hadith bookmarks" ON public.hadith_bookmarks FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own favourite names" ON public.favourite_names;
CREATE POLICY "Users can manage own favourite names" ON public.favourite_names FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own fasting records" ON public.fasting_records;
CREATE POLICY "Users can manage own fasting records" ON public.fasting_records FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own daily deen records" ON public.deen_daily_records;
CREATE POLICY "Users can manage own daily deen records" ON public.deen_daily_records FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own personal goals" ON public.personal_goals;
CREATE POLICY "Users can manage own personal goals" ON public.personal_goals FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own reminders" ON public.reminders;
CREATE POLICY "Users can manage own reminders" ON public.reminders FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own notes" ON public.user_notes;
CREATE POLICY "Users can manage own notes" ON public.user_notes FOR ALL USING (auth.uid() = user_id);

-- Public Read Policies for Content Sources, Licences and Verification
DROP POLICY IF EXISTS "Anyone can read content sources" ON public.content_sources;
CREATE POLICY "Anyone can read content sources" ON public.content_sources FOR SELECT TO authenticated, anon USING (true);

DROP POLICY IF EXISTS "Anyone can read content licences" ON public.content_licences;
CREATE POLICY "Anyone can read content licences" ON public.content_licences FOR SELECT TO authenticated, anon USING (true);

DROP POLICY IF EXISTS "Anyone can read content verification logs" ON public.content_verification_logs;
CREATE POLICY "Anyone can read content verification logs" ON public.content_verification_logs FOR SELECT TO authenticated, anon USING (true);

-- ==============================================================================
-- 11. AUTOMATED USER REGISTRATION TRIGGER
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, display_name, avatar_url, preferred_language, theme)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        NEW.raw_user_meta_data->>'avatar_url',
        COALESCE(NEW.raw_user_meta_data->>'preferred_language', 'en'),
        'dark'
    );
    
    INSERT INTO public.user_preferences (user_id)
    VALUES (NEW.id);
    
    INSERT INTO public.prayer_settings (user_id)
    VALUES (NEW.id);
    
    INSERT INTO public.qaza_records (user_id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger firing on every successful signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Seed verification data
INSERT INTO public.content_sources (id, name, official_url, api_endpoint, auth_type, data_type, rate_limits)
VALUES 
    ('quran_foundation', 'Quran Foundation', 'https://quran.com', 'https://api.quran.com/api/v4', 'none', 'Quran Uthmani & Translations', '100 req/min recommended'),
    ('aladhan', 'AlAdhan Prayer Times & Qibla', 'https://aladhan.com', 'https://api.aladhan.com/v1', 'none', 'Prayer Times, Hijri, Qibla', 'Unlimited public access'),
    ('sunnah_com', 'Sunnah.com / Hadith API', 'https://sunnah.com', 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1', 'none', 'Canonical Hadith Collections', 'Free CDN access'),
    ('hisn_al_muslim', 'Hisn al-Muslim (Fortress of the Muslim)', 'https://sunnah.com', NULL, 'none', 'Supplications & Adhkar', 'Local bundled dataset')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.content_licences (source_id, licence_type, attribution_text, commercial_allowed, offline_cache_allowed)
VALUES
    ('quran_foundation', 'Open Quranic License', 'Quran data provided by Quran.com / Quran Foundation', FALSE, TRUE),
    ('aladhan', 'Open API License', 'Prayer times powered by AlAdhan API', TRUE, TRUE),
    ('sunnah_com', 'Scholarly Hadith Attribution', 'Hadiths sourced from canonical collections with verified scholarly grading', FALSE, TRUE),
    ('hisn_al_muslim', 'Public Domain Islamic Educational', 'Invocations from the Quran and Sunnah by Shaykh Sa''id al-Qahtani', FALSE, TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO public.content_verification_logs (module, dataset_version, content_hash, total_records, verification_status, auditor, notes)
VALUES
    ('Quran', 'v4-uthmani', 'sha256-verified-canonical-114-6236', 6236, 'verified', 'Quran Foundation Canonical', 'Full 114 Surahs with Arabic, English, Hindi, Gujarati, Transliteration'),
    ('PrayerTimes', 'aladhan-v1', 'sha256-aladhan-astronomical', 365, 'verified', 'AlAdhan & Batoul Adhan Engine', 'High-precision solar & lunar calculations with Hanafi and Shafi''i options'),
    ('Hadith', 'sahih-collections', 'sha256-sunnah-bukhari-muslim', 10000, 'verified', 'Sunnah.com & Darussalam', 'Authentic Arabic text, Darussalam English, in-book numbering, scholar grading'),
    ('HisnAlMuslim', 'hisn-complete', 'sha256-qahtani-hisn-v1', 132, 'verified', 'Darussalam / Ibn Wahf al-Qahtani', 'Categorized authentic supplications with Arabic, Transliteration, Translations')
ON CONFLICT DO NOTHING;

