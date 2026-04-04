/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#1B2635',
        'navy-light': '#223044',
        cream: '#FDF8ED',
        gold: '#C5882C',
        'gold-light': '#D4A03C',
        charcoal: '#1A2332',
        slate: '#4B5563',
        muted: '#9CA3AF',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scrollLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
        'scroll-left': 'scrollLeft 40s linear infinite',
      },
    },
  },
  plugins: [],
}
