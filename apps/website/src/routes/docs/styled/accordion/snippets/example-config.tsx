/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      animation: {
        'accordion-down': '0.2s ease-out 0s 1 normal forwards accordion-open',
        'accordion-up': '0.2s ease-out 0s 1 normal forwards accordion-close',
      },
    },
  },
};
