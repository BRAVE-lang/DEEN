// ==============================================================================
// DEEN — Global Audio Player Context
// Seamless Quran Recitations, Adhan & Dua Audio Playback
// ==============================================================================

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { QuranReciter } from '@/types';
import { QURAN_RECITERS, getAyahAudioUrl } from '@/services/quranService';

interface AudioContextType {
  isPlaying: boolean;
  currentVerseKey: string | null;
  currentTrackTitle: string;
  reciter: QuranReciter;
  setReciter: (r: QuranReciter) => void;
  playAyah: (verseKey: string, title?: string) => void;
  playCustomUrl: (url: string, title: string) => void;
  pauseAudio: () => void;
  resumeAudio: () => void;
  togglePlay: () => void;
  repeatAyah: boolean;
  setRepeatAyah: (r: boolean) => void;
  progress: number;
  duration: number;
  seek: (seconds: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentVerseKey, setCurrentVerseKey] = useState<string | null>(null);
  const [currentTrackTitle, setCurrentTrackTitle] = useState<string>('');
  const [reciter, setReciterState] = useState<QuranReciter>(QURAN_RECITERS[0]);
  const [repeatAyah, setRepeatAyah] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    const onEnded = () => {
      if (repeatAyah && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(console.warn);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
    };
  }, [repeatAyah]);

  const setReciter = (r: QuranReciter) => {
    setReciterState(r);
    localStorage.setItem('deen_reciter_id', String(r.id));
  };

  const playAyah = (verseKey: string, title: string = '') => {
    if (!audioRef.current) return;
    const url = getAyahAudioUrl(verseKey, reciter);
    setCurrentVerseKey(verseKey);
    setCurrentTrackTitle(title || `Ayah ${verseKey} (${reciter.name})`);

    audioRef.current.src = url;
    audioRef.current.play().catch(e => {
      console.warn('Playback error (user interaction may be needed):', e);
      setIsPlaying(false);
    });
  };

  const playCustomUrl = (url: string, title: string) => {
    if (!audioRef.current) return;
    setCurrentVerseKey(null);
    setCurrentTrackTitle(title);
    audioRef.current.src = url;
    audioRef.current.play().catch(e => {
      console.warn('Audio playback error:', e);
      setIsPlaying(false);
    });
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
  };

  const resumeAudio = () => {
    audioRef.current?.play().catch(console.warn);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      resumeAudio();
    }
  };

  const seek = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setProgress(seconds);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentVerseKey,
        currentTrackTitle,
        reciter,
        setReciter,
        playAyah,
        playCustomUrl,
        pauseAudio,
        resumeAudio,
        togglePlay,
        repeatAyah,
        setRepeatAyah,
        progress,
        duration,
        seek
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export function useAudio(): AudioContextType {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
