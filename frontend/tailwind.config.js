/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eaf5ff',
          100: '#d5ebff',
          200: '#b0d7ff',
          300: '#8ac3ff',
          400: '#65affe',
          500: '#409bfe',
          600: '#1a87fd',
          700: '#0073e6',
          800: '#005db9',
          900: '#004792',
        },
        secondary: {
          50: '#eefdf2',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}