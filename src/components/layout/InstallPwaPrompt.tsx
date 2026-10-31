// ==============================================================================
// DEEN — Install PWA Banner / Modal Component
// ==============================================================================

import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export const InstallPwaPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Only show if user hasn't dismissed in current session
      if (!sessionStorage.getItem('deen_pwa_dismissed')) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('deen_pwa_dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed top-16 left-3 right-3 max-w-md mx-auto z-50 bg-deen-forest text-deen-ivory rounded-2xl p-3.5 shadow-2xl border border-deen-gold/40 flex items-center justify-between gap-3 animate-in slide-in-from-top-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-deen-gold/20 flex items-center justify-center shrink-0">
          <Download className="w-5 h-5 text-deen-gold-light" />
        </div>
        <div>
          <p className="text-xs font-bold text-white">Install DEEN App</p>
          <p className="text-[11px] text-stone-300">Fast offline prayer times & Quran</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleInstall}
          className="px-3 py-1.5 rounded-lg bg-deen-gold hover:bg-deen-gold-light text-white text-xs font-semibold shadow transition-transform active:scale-95"
        >
          Install
        </button>
        <button
          onClick={handleDismiss}
          className="p-1 text-stone-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
