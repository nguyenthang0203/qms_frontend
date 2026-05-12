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
          50: '#e7eef4',
          100: '#cfdeea',
          200: '#9fbed5',
          300: '#6f9fc0',
          400: '#3f7fab',
          500: '#124874',
          600: '#103f66',
          700: '#0d3657',
          800: '#0a2d49',
          900: '#08243a',
        },
        secondary: {
          50: '#faebec',
          100: '#f5d7d8',
          200: '#ebb0b3',
          300: '#e18a8f',
          400: '#d7636a',
          500: '#cf373d',
          600: '#b02f34',
          700: '#91272b',
          800: '#731f22',
          900: '#541719',
        },
      },
    },
  },
  plugins: [],
}
