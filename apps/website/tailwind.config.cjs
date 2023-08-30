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
