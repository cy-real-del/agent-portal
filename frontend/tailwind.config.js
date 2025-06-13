/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyprus: {
          50: '#fdf9f3',
          100: '#f5f1eb',
          200: '#e8ddd0',
          300: '#d9c6a8',
          400: '#c5a880',
          500: '#b8956b',
          600: '#a87f59',
          700: '#8b6749',
          800: '#70533e',
          900: '#5a4334',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
