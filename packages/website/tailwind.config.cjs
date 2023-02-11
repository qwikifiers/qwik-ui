/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', '../daisy/src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  plugins: [require('daisyui')],
};
