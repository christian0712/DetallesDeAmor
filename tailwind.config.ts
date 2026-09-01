import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
        },
        romantic: {
          bg: '#0d0714',
          card: '#1a0b26',
          gold: '#e2b86b',
          blush: '#ffd6e0',
          wine: '#2c0719',
        }
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'sans-serif'],
        cursive: ['var(--font-great-vibes)', 'cursive'],
        handwritten: ['var(--font-dancing-script)', 'cursive'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(244, 63, 94, 0.4)' },
          '50%': { boxShadow: '0 0 35px rgba(244, 63, 94, 0.8)' },
        },
        heartBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '70%': { transform: 'scale(1)' },
        }
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'heart-beat': 'heartBeat 1.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};

export default config;
