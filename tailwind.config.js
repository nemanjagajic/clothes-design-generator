/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#102E4A',
        'light-blue': '#0090F8',
        'main-black': '#2C2C2C'
      }
    }
  },
  plugins: [],
}

