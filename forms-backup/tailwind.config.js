/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dg': {
          50: '#f0f8f5',
          100: '#d4e8e2',
          200: '#b8d8cf',
          300: '#7ec4a0',
          400: '#4ab070',
          500: '#06a04a',
          600: '#068040',
          700: '#06402B',
          800: '#051f1e',
          900: '#020f0f',
        }
      }
    },
  },
  plugins: [],
}