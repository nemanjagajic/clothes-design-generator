/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: ['h-20', 'w-20'],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#102E4A',
        'light-blue': '#0090F8',
        'very-light-blue': '#d6e8f5',
        'main-black': '#2C2C2C',
        'light-gray': '#6B6B6B',
        'border-gray': '#D9D9D9'
      },
      width: {
        '20': "30px"      
      },
      height: {
        '20': "30px"
      }
    }
  },
  plugins: [],
}

