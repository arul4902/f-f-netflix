/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#0B0911',
          900: '#100D19', // Midnight plum
          800: '#1A1428',
          700: '#261C39',
        },
        wine: {
          900: '#321627', // Deep wine
          800: '#481F38',
          700: '#5F284A',
        },
        berry: {
          DEFAULT: '#762D4A', // Muted berry
          light: '#8E3B5C',
          dark: '#5C2239',
        },
        gold: {
          DEFAULT: '#C99B72', // Champagne gold
          light: '#DFC09F',
          dark: '#A67950',
          muted: '#8E6F52',
        },
        ivory: {
          DEFAULT: '#F2E8DD', // Warm ivory
          muted: '#D8CEBF',
          dark: '#B0A697',
        },
        rose: {
          dusty: '#C98A9C',
          soft: '#E5BAC6',
          deep: '#93485E',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cinzel"', '"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'vignette': 'radial-gradient(circle at center, transparent 35%, rgba(16, 13, 25, 0.95) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
