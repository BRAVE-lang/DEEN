// ==============================================================================
// DEEN — Islamic Super App Main Application Component
// ==============================================================================

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AudioProvider } from '@/context/AudioContext';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { BottomNav } from '@/components/layout/BottomNav';
import { AudioFloatingPlayer } from '@/components/layout/AudioFloatingPlayer';
import { InstallPwaPrompt } from '@/components/layout/InstallPwaPrompt';

// Pages
import { Home } from '@/pages/Home';
import { Quran } from '@/pages/Quran';
import { SurahView } from '@/pages/SurahView';
import { Salah } from '@/pages/Salah';
import { Qibla } from '@/pages/Qibla';
import { Explore } from '@/pages/Explore';
import { Tasbeeh } from '@/pages/Tasbeeh';
import { Duas } from '@/pages/Duas';
import { Hadith } from '@/pages/Hadith';
import { NamesOfAllah } from '@/pages/NamesOfAllah';
import { Calendar } from '@/pages/Calendar';
import { Prophets } from '@/pages/Prophets';
import { Learning } from '@/pages/Learning';
import { HajjUmrah } from '@/pages/HajjUmrah';
import { Zakat } from '@/pages/Zakat';
import { Tracker } from '@/pages/Tracker';
import { Profile } from '@/pages/Profile';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AudioProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-deen-ivory dark:bg-deen-charcoal text-stone-900 dark:text-stone-100 flex flex-col transition-colors selection:bg-deen-emerald selection:text-white">
                <Navbar />
                <InstallPwaPrompt />

                <main className="flex-1 w-full">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/quran" element={<Quran />} />
                    <Route path="/quran/surah/:id" element={<SurahView />} />
                    <Route path="/salah" element={<Salah />} />
                    <Route path="/qibla" element={<Qibla />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/tasbeeh" element={<Tasbeeh />} />
                    <Route path="/duas" element={<Duas />} />
                    <Route path="/hadith" element={<Hadith />} />
                    <Route path="/names" element={<NamesOfAllah />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/prophets" element={<Prophets />} />
                    <Route path="/learning" element={<Learning />} />
                    <Route path="/hajj-umrah" element={<HajjUmrah />} />
                    <Route path="/zakat" element={<Zakat />} />
                    <Route path="/tracker" element={<Tracker />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>

                <AudioFloatingPlayer />
                <BottomNav />
              </div>
            </BrowserRouter>
          </AudioProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
