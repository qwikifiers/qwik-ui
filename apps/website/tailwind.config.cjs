const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/*.{js,ts,jsx,tsx,mdx}'),
    join(__dirname, '../../packages/kit-tailwind/src/**/*.{js,ts,jsx,tsx,mdx}'),
    join(__dirname, '../../packages/kit-fluffy/src/**/*.{js,ts,jsx,tsx,mdx}'),
    join(__dirname, '../../packages/kit-simple/src/**/*.{js,ts,jsx,tsx,mdx}'),
    join(__dirname, '../../packages/kit-styled/src/**/*.{js,ts,jsx,tsx,mdx}'),
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    important: true,
    extend: {
      // arbitrary cols create multiple grids
      gridTemplateColumns: {
        'custom-lg': '320px 1fr',
        'custom-2xl': '320px 1fr 320px',
      },
      fontFamily: {
        sans: ['Inter Variable', 'sans-serif'],
      },
      backgroundImage: {
        'optional-theme-bg': "url('/Button-bg.svg')",
      },
      boxShadow: {
        depth: 'var(--shadow-elevation-medium)',
        'depth-dark': 'var(--dark-shadow-elevation-medium)',
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
          950: 'hsl(204, 83%, 9%)',
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
          950: 'hsl(269, 67%, 13%)',
        },

        'qwikui-purple-50': '#f9f5ff',
        'qwikui-purple-100': '#f2e8ff',
        'qwikui-purple-200': '#e7d6fe',
        'qwikui-purple-300': '#d4b5fd',
        'qwikui-purple-400': '#b37bfa',
        'qwikui-purple-500': '#9f57f5',
        'qwikui-purple-600': '#8835e8',
        'qwikui-purple-700': '#7424cc',
        'qwikui-purple-800': '#6323a6',
        'qwikui-purple-900': '#521d86',
        'qwikui-purple-950': '#360863',
        'qwikui-blue-50': '#effaff',
        'qwikui-blue-100': '#def3ff',
        'qwikui-blue-200': '#b6eaff',
        'qwikui-blue-300': '#76dbff',
        'qwikui-blue-400': '#2dcaff',
        'qwikui-blue-500': '#02b9fc',
        'qwikui-blue-600': '#0090d2',
        'qwikui-blue-700': '#0073aa',
        'qwikui-blue-800': '#00618c',
        'qwikui-blue-900': '#075073',
        'qwikui-blue-950': '#04334d',

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        alert: {
          DEFAULT: 'hsl(var(--alert))',
          foreground: 'hsl(var(--alert-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        sm: 'calc(var(--border-radius) + 0.125rem)',
        DEFAULT: 'calc(var(--border-radius) + 0.25rem)',
        md: 'calc(var(--border-radius) + 0.375rem)',
        lg: 'calc(var(--border-radius) + 0.5rem)',
        xl: 'calc(var(--border-radius) + 0.75rem)',
        '2xl': 'calc(var(--border-radius) + 1rem)',
        '3xl': 'calc(var(--border-radius) + 1.5rem)',
        preset: 'var(--border-radius)',
      },
      borderWidth: {
        DEFAULT: 'var(--border-width)',
        2: 'calc(var(--border-width) + 2px)',
        4: 'calc(var(--border-width) + 4px)',
        8: 'calc(var(--border-width) + 8px)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        inner: 'var(--shadow-inner)',
      },
      transitionTimingFunction: {
        step: 'cubic-bezier(0.6, 0.6, 0, 1)',
        jumpy: 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
    },
  },
};
