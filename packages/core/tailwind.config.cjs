/** @type {import('tailwindcss').Config} */
const path = require('path');

module.exports = {
  safelist: [{
    pattern: /./
  }],
  content: [path.join(__dirname, './src/**/*.{js,ts,jsx,tsx}')],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
