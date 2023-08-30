const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/*.{js,ts,jsx,tsx,mdx}'),
    join(__dirname, '../../packages/kit-tailwind/src/**/*.{js,ts,jsx,tsx,mdx}')
  ],
  plugins: [require('daisyui')],
  darkMode: 'class',
  daisyui: {
    themes: ['light', 'dark'],
    base: true
  },
  theme: {
    extend: {
      backgroundImage: {
        'optional-theme-bg': "url('/Button-bg.svg')"
      },
      boxShadow: {
        depth: 'var(--shadow-elevation-medium)',
        'depth-dark': 'var(--dark-shadow-elevation-medium)'
      },
      colors: {
        'qwik-blue': {
          50: 'hsl(204, 100%, 96%)',
          100: 'hsl(203, 100%, 94%)',
          200: 'hsl(199, 97%, 86%)',
          300: 'hsl(198, 100%, 74%)',
          400: 'hsl(197, 97%, 60%)',
          500: 'hsl(197, 93%, 53%)',
          600: 'hsl(199, 100%, 40%)',
          700: 'hsl(200, 100%, 32%)',
          800: 'hsl(200, 94%, 25%)',
          900: 'hsl(201, 84%, 17%)',
          950: 'hsl(204, 83%, 9%)'
        },
        'qwik-purple': {
          50: 'hsl(260, 100%, 90%)',
          100: 'hsl(262, 83%, 91%)',
          200: 'hsl(259, 85%, 92%)',
          300: 'hsl(261, 87%, 85%)',
          400: 'hsl(263, 84%, 73%)',
          500: 'hsl(266, 83%, 66%)',
          600: 'hsl(270, 77%, 58%)',
          700: 'hsl(272, 64%, 50%)',
          800: 'hsl(271, 64%, 42%)',
          900: 'hsl(272, 62%, 30%)',
          950: 'hsl(269, 67%, 13%)'
        },

        primary: {
          DEFAULT: 'var(--color-primary)',
          forground: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          light: 'var(--color-primary-light)'
        }
      }
    }
  }
};
