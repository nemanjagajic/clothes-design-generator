/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  safelist: ['h-20', 'w-20'],
  theme: {
    extend: {
      textShadow: {
        glow: '0 0 8px rgba(0, 0, 0, 0.8)', // Customize the color and spread as needed
      },
      fontFamily: {
        custom: [
          'Courgette',
          // other fallback fonts
        ],
      },
      colors: {
        'dark-blue': '#102E4A',
        'navy-blue': '#014483',
        'light-blue': '#0090F8',
        'nsm-blue-100': '#2C34FE',
        'very-light-blue': '#d6e8f5',
        'main-black': '#2C2C2C',
        'nsm-gray-100': '#ECEBE4',
        'nsm-gray-200': '#6B6B6B',
        'nsm-gray-300': '#FAF9F1',
        'nsm-gray-400': '#FAF9F5',
        'nsm-gray-500': '#E2E2E2',
        'light-gray': '#6B6B6B',
        'border-gray': '#D9D9D9',
        'nsm-orange': '#FAC43C',
        'nsm-orange-100': '#F8CC5B',
      },
      width: {
        20: '30px',
      },
      height: {
        20: '30px',
      },
      screens: {
        lxl: '1440px',
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        '.text-glow': {
          textShadow: theme('textShadow.glow'),
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
}
