const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/*.{js,ts,jsx,tsx,mdx}'),
    join(__dirname, '../../packages/daisy/src/**/*.{js,ts,jsx,tsx,mdx}'),
  ],
  plugins: [require('daisyui')],
  darkMode: 'class',
  daisyui: {
    themes: ['light', 'dark'],
    base: true,
  },
};
