/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors:{
          'primary-bg' : 'var(--primary-bg)',
        }
    },
  },
  plugins: [],
  darkMode : 'class',
}

