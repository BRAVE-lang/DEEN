/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        deen: {
          emerald: '#059669',
          'emerald-light': '#10b981',
          'emerald-dark': '#047857',
          forest: '#022c22',
          'forest-light': '#064e3b',
          gold: '#d97706',
          'gold-light': '#f59e0b',
          'gold-dark': '#b45309',
          'gold-accent': '#fbbf24',
          ivory: '#fdfbf7',
          'ivory-dark': '#f4efe6',
          charcoal: '#0f172a',
          'charcoal-light': '#1e293b',
          'charcoal-card': '#131e33',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['"Amiri"', '"Scheherazade New"', '"Traditional Arabic"', 'serif'],
        quran: ['"Amiri Quran"', '"KFGQPC Uthmanic Script HAFS"', '"Scheherazade New"', 'serif'],
        hindi: ['"Noto Sans Devanagari"', 'sans-serif'],
        gujarati: ['"Noto Sans Gujarati"', 'sans-serif']
      },
      boxShadow: {
        'glow-gold': '0 0 20px -3px rgba(217, 119, 6, 0.3)',
        'glow-emerald': '0 0 25px -4px rgba(5, 150, 105, 0.3)',
      }
    },
  },
  plugins: [],
}
