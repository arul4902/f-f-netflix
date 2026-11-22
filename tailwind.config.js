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
          950: '#07050A', // Pure deep obsidian velvet
          900: '#0D0914', // Rich midnight violet-black
          800: '#140E20', // Sleek card background
          700: '#1C142D', // Elevated surface
        },
        wine: {
          900: '#220818', // Deep velvet ruby
          800: '#3D0D2B', // Rich royal plum
          700: '#5A113E', // Vibrant wine
        },
        berry: {
          DEFAULT: '#E11D48', // Vibrant romantic crimson ruby
          light: '#F43F5E', // Glowing neon rose
          dark: '#9F1239', // Deep royal rose
        },
        gold: {
          DEFAULT: '#F59E0B', // Radiant royal amber gold
          light: '#FDE68A', // Luminous champagne shimmer
          dark: '#D97706', // Polished warm bullion
          muted: '#B45309', // Deep bronze
        },
        ivory: {
          DEFAULT: '#FFFDF9', // Sparkling luminescent pearl
          muted: '#EAE0D5', // Soft warm linen
          dark: '#C8BEB3', // Muted oyster
        },
        rose: {
          dusty: '#FB7185', // Radiant coral rose
          soft: '#FDA4AF', // Soft glowing blossom
          deep: '#BE123C', // Romantic ruby crimson
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
