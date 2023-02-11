/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', '../daisy/src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [require('daisyui')],
  darkMode: 'class',
  daisyui: {
    themes: ["light", "dark"],
    base: true,
  },
};
