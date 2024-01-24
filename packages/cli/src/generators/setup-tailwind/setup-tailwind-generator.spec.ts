import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { StyledTheme } from '../../_shared/styled-theme.enum';
import { SetupTailwindGeneratorSchema } from './schema';
import { setupTailwindGenerator } from './setup-tailwind-generator';

describe('Setup Tailwind generator', () => {
  function setupWithProperFiles() {
    const options: SetupTailwindGeneratorSchema = {};
    const tree = createTreeWithEmptyWorkspace();

    tree.write(
      'src/global.css',
      `@tailwind components;
@tailwind base;
@tailwind utilities;

html {
  height: 100%;
  min-height: 100%;
  scroll-behavior: smooth;
  background-color: var(--color-bg) !important;
  color: var(--color-text) !important;
}`,
    );

    tree.write(
      'tailwind.config.js',
      `
    const { join } = require('path');

    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        join(__dirname, 'src/**/*.{js,ts,jsx,tsx,mdx}'),
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
          fontFamily: {
            sans: ['Inter Variable', 'sans-serif'],
          },
        },
      },
    };

    `,
    );

    return {
      tree,
      options,
    };
  }

  test(`
    GIVEN global.css and tailwind config exist
    WHEN running the generator
    THEN it should add the proper config to both files`, async () => {
    const { tree, options } = setupWithProperFiles();

    options.rootCssPath = 'src/global.css';
    options.styledTheme = StyledTheme.FLUFFY;

    await setupTailwindGenerator(tree, options);

    const updatedTailwindConfigContent = tree.read('tailwind.config.js', 'utf-8');

    expect(updatedTailwindConfigContent).toMatchInlineSnapshot(`
      "const { join } = require('path');

      /** @type {import('tailwindcss').Config} */
      module.exports = {
        content: [join(__dirname, 'src/**/*.{js,ts,jsx,tsx,mdx}')],
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
            colors: {
              border: 'hsl(var(--color-border) / <alpha-value>)',
              input: 'hsl(var(--color-input) / <alpha-value>)',
              ring: 'hsl(var(--color-ring) / <alpha-value>)',
              background: 'hsl(var(--color-background) / <alpha-value>)',
              foreground: 'hsl(var(--color-foreground) / <alpha-value>)',

              primary: {
                DEFAULT: 'hsl(var(--color-primary) / <alpha-value>)',
                foreground: 'hsl(var(--color-primary-foreground) / <alpha-value>)',
              },
              secondary: {
                DEFAULT: 'hsl(var(--color-secondary) / <alpha-value>)',
                foreground: 'hsl(var(--color-secondary-foreground) / <alpha-value>)',
              },
              accent: {
                DEFAULT: 'hsl(var(--color-accent) / <alpha-value>)',
                foreground: 'hsl(var(--color-accent-foreground) / <alpha-value>)',
              },
              muted: {
                DEFAULT: 'hsl(var(--color-muted) / <alpha-value>)',
                foreground: 'hsl(var(--color-muted-foreground) / <alpha-value>)',
              },
              destructive: {
                DEFAULT: 'hsl(var(--color-destructive) / <alpha-value>)',
                foreground:
                  'hsl(var(--color-destructive-foreground) / <alpha-value>)',
              },
              popover: {
                DEFAULT: 'hsl(var(--color-popover) / <alpha-value>)',
                foreground: 'hsl(var(--color-popover-foreground) / <alpha-value>)',
              },
              card: {
                DEFAULT: 'hsl(var(--color-card) / <alpha-value>)',
                foreground: 'hsl(var(--color-card-foreground) / <alpha-value>)',
              },
            },
            borderRadius: {
              lg: 'var(--border-radius)',
              md: 'calc(var(--border-radius) - 2px)',
              sm: 'calc(var(--border-radius) - 4px)',
            },
            fontFamily: {
              sans: ['Inter Variable', 'sans-serif'],
            },
          },
        },
      };
      "
    `);

    const updatedGlobalCssContent = tree.read('src/global.css', 'utf-8');

    expect(updatedGlobalCssContent).toMatchInlineSnapshot(`
      "@tailwind components;
      @tailwind base;
      @tailwind utilities;
      @layer base {
        :root {
          --color-background: 0 0% 100%;
          --color-foreground: 263 84% 5%;

          --color-primary: 263 56% 52%;
          --color-primary-foreground: 0 0% 100%;

          --color-secondary: 202 91% 52%;
          --color-secondary-foreground: 0 0% 100%;

          --color-muted: 210 40% 96%;
          --color-muted-foreground: 263 16% 47%;

          --color-accent: 0 0% 89%;
          --color-accent-foreground: 263 47% 11%;

          --color-destructive: 0 84% 60%;
          --color-destructive-foreground: 263 0% 100%;

          --color-card: 0 0% 100%;
          --color-card-foreground: 263 84% 5%;

          --color-popover: 0 0% 100%;
          --color-popover-foreground: 263 84% 5%;

          --color-border: 263 32% 91%;

          --color-input: 263 32% 91%;

          --color-ring: 263 18% 61%;

          --border-radius: 0.375rem;
        }

        .dark {
          --color-background: 222 47% 11%;
          --color-foreground: 263 40% 98%;

          --color-primary: 263 70% 58%;
          --color-primary-foreground: 190 40% 98%;

          --color-secondary: 202 97% 55%;
          --color-secondary-foreground: 190 40% 98%;

          --color-muted: 218 32.6% 17.5%;
          --color-muted-foreground: 263 20.2% 65.1%;

          --color-accent: 0 0% 23%;
          --color-accent-foreground: 263 40% 98%;

          --color-destructive: 0 70% 40%;
          --color-destructive-foreground: 263 40% 98%;

          --color-card: 263 84% 4.9%;
          --color-card-foreground: 263 40% 98%;

          --color-popover: 263 84% 4.9%;
          --color-popover-foreground: 263 40% 98%;

          --color-border: 263 32.6% 17.5%;

          --color-input: 263 32.6% 17.5%;

          --color-ring: 263 26.8% 83.9%;
        }
      }

      html {
        height: 100%;
        min-height: 100%;
        scroll-behavior: smooth;
        background-color: var(--color-bg) !important;
        color: var(--color-text) !important;
      }
      "
    `);
  });
});
