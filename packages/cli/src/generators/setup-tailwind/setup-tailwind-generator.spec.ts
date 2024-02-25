import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { ThemeStyle } from '@qwik-ui/utils';
import { SetupTailwindGeneratorSchema } from './schema';
import { setupTailwindGenerator } from './setup-tailwind-generator';

const tailwindConfigContent = `
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
`;

function wrapWithCommonJs(content: string) {
  return `
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ${content}
};
  `;
}

function wrapWithEsm(content: string) {
  return `
/** @type {import('tailwindcss').Config} */
export default {
  ${content}
};
  `;
}

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

    tree.write('tailwind.config.cjs', wrapWithCommonJs(tailwindConfigContent));

    return {
      tree,
      options,
    };
  }

  test(`
  GIVEN global.css and tailwind config exist in commonjs format
  THEN it should generate the proper tailwind config values`, async () => {
    const { tree, options } = setupWithProperFiles();

    options.rootCssPath = 'src/global.css';

    await setupTailwindGenerator(tree, options);

    const updatedTailwindConfigContent = tree.read('tailwind.config.cjs', 'utf-8');

    expect(updatedTailwindConfigContent).toMatchInlineSnapshot(`
      "const { join } = require('path');

      /** @type {import('tailwindcss').Config} */
      module.exports = {
        plugins: [
          plugin(function ({ addUtilities }) {
            addUtilities({
              '.press': {
                transform: 'var(--transform-press)',
              },
            });
          }),
        ],

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
              alert: {
                DEFAULT: 'hsl(var(--alert))',
                foreground: 'hsl(var(--alert-foreground))',
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
              base: 'var(--border-radius)',
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
              base: 'var(--border-width)',
              DEFAULT: 'calc(var(--border-width) + 1px)',
              2: 'calc(var(--border-width) + 2px)',
              4: 'calc(var(--border-width) + 4px)',
              8: 'calc(var(--border-width) + 8px)',
            },
            boxShadow: {
              base: 'var(--shadow-base)',
              sm: 'var(--shadow-sm)',
              DEFAULT: 'var(--shadow)',
              md: 'var(--shadow-md)',
              lg: 'var(--shadow-lg)',
              xl: 'var(--shadow-xl)',
              '2xl': 'var(--shadow-2xl)',
              inner: 'var(--shadow-inner)',
            },
            fontFamily: {
              sans: ['Inter Variable', 'sans-serif'],
            },
          },
        },
      };
      "
    `);
  });

  test(`
  GIVEN tailwind config exist in esm format
  WHEN running the generator
  THEN it should generate the proper tailwind config values`, async () => {
    const { tree, options } = setupWithProperFiles();
    tree.write('tailwind.config.js', wrapWithEsm(tailwindConfigContent));

    options.rootCssPath = 'src/global.css';

    await setupTailwindGenerator(tree, options);

    const updatedTailwindConfigContent = tree.read('tailwind.config.js', 'utf-8');

    expect(updatedTailwindConfigContent).toMatchInlineSnapshot(`
      "/** @type {import('tailwindcss').Config} */
      export default {
        plugins: [
          plugin(function ({ addUtilities }) {
            addUtilities({
              '.press': {
                transform: 'var(--transform-press)',
              },
            });
          }),
        ],

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
              alert: {
                DEFAULT: 'hsl(var(--alert))',
                foreground: 'hsl(var(--alert-foreground))',
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
              base: 'var(--border-radius)',
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
              base: 'var(--border-width)',
              DEFAULT: 'calc(var(--border-width) + 1px)',
              2: 'calc(var(--border-width) + 2px)',
              4: 'calc(var(--border-width) + 4px)',
              8: 'calc(var(--border-width) + 8px)',
            },
            boxShadow: {
              base: 'var(--shadow-base)',
              sm: 'var(--shadow-sm)',
              DEFAULT: 'var(--shadow)',
              md: 'var(--shadow-md)',
              lg: 'var(--shadow-lg)',
              xl: 'var(--shadow-xl)',
              '2xl': 'var(--shadow-2xl)',
              inner: 'var(--shadow-inner)',
            },
            fontFamily: {
              sans: ['Inter Variable', 'sans-serif'],
            },
          },
        },
      };
      "
    `);
  });

  test(`
    GIVEN no options are passed
    THEN it should generate "simple" style with primary color "cyan-600", base color "neutral" and border-radios 0.25`, async () => {
    const { tree, options } = setupWithProperFiles();

    options.rootCssPath = 'src/global.css';

    await setupTailwindGenerator(tree, options);

    const updatedGlobalCssContent = tree.read('src/global.css', 'utf-8');

    expect(updatedGlobalCssContent).toMatchInlineSnapshot(`
      "@tailwind components;
      @tailwind base;
      @tailwind utilities;
      @layer base {
        :root {
          --background: 0 0% 100%;
          --foreground: 0 0% 9%;
          --muted: 0 0% 96.1%;
          --muted-foreground: 0 0% 45.1%;
          --popover: 0 0% 100%;
          --popover-foreground: 0 0% 9%;
          --card: 0 0% 100%;
          --card-foreground: 0 0% 9%;
          --border: 0 0% 89.8%;
          --input: 0 0% 89.8%;
          --primary: 191.6 91.4% 36.5%;
          --primary-foreground: 0 0% 100%;
          --secondary: 0 0% 83.1%;
          --secondary-foreground: 0 0% 9%;
          --accent: 0 0% 96.1%;
          --accent-foreground: 0 0% 9%;
          --alert: 0 84.2% 60.2%;
          --alert-foreground: 0 0% 98%;
          --ring: 0 0% 9%;
          --border-width: 0px;
          --border-radius: 0.25rem;
          --shadow-base: 0 1px 2px 0 rgba(0, 0, 0, 0.01);
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0px rgba(0, 0, 0, 0.1);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -2px rgba(0, 0, 0, 0.1);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -4px rgba(0, 0, 0, 0.1);
          --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 8px 10px -6px rgba(0, 0, 0, 0.1);
          --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 1);
          --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.01);
          --transform-press: scale(0.95);
        }
        .dark {
          --background: 0 0% 9%;
          --foreground: 0 0% 98%;
          --muted: 0 0% 14.9%;
          --muted-foreground: 0 0% 63.9%;
          --popover: 0 0% 9%;
          --popover-foreground: 0 0% 98%;
          --card: 0 0% 9%;
          --card-foreground: 0 0% 98%;
          --border: 0 0% 14.9%;
          --input: 0 0% 14.9%;
          --primary: 191.6 91.4% 36.5%;
          --primary-foreground: 0 0% 100%;
          --secondary: 0 0% 25.1%;
          --secondary-foreground: 0 0% 98%;
          --accent: 0 0% 14.9%;
          --accent-foreground: 0 0% 98%;
          --alert: 0 84.2% 60.2%;
          --alert-foreground: 0 0% 98%;
          --ring: 0 0% 83.1%;
          --border-width: 0px;
          --border-radius: 0.25rem;
          --shadow-base: 0 1px 2px 0 rgba(0, 0, 0, 0.01);
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0px rgba(0, 0, 0, 0.1);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -2px rgba(0, 0, 0, 0.1);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -4px rgba(0, 0, 0, 0.1);
          --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 8px 10px -6px rgba(0, 0, 0, 0.1);
          --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 1);
          --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.01);
          --transform-press: scale(0.95);
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
  test(`
    GIVEN style is "brutalist" and primary color is "red-600" and border-radios is 1
    THEN it should generate the correct theme`, async () => {
    const { tree, options } = setupWithProperFiles();

    options.rootCssPath = 'src/global.css';
    options.borderRadius = 'border-radius-1';
    options.primaryColor = 'red-600';
    options.style = ThemeStyle.BRUTALIST;

    await setupTailwindGenerator(tree, options);

    const updatedGlobalCssContent = tree.read('src/global.css', 'utf-8');

    expect(updatedGlobalCssContent).toMatchInlineSnapshot(`
      "@tailwind components;
      @tailwind base;
      @tailwind utilities;
      @layer base {
        :root {
          --background: 0 0% 100%;
          --foreground: 0 0% 9%;
          --muted: 0 0% 96.1%;
          --muted-foreground: 0 0% 45.1%;
          --popover: 0 0% 100%;
          --popover-foreground: 0 0% 9%;
          --card: 0 0% 100%;
          --card-foreground: 0 0% 9%;
          --border: 0 0% 0%;
          --input: 0 0% 0%;
          --primary: 0 72.2% 50.6%;
          --primary-foreground: 0 0% 100%;
          --secondary: 0 0% 83.1%;
          --secondary-foreground: 0 0% 9%;
          --accent: 0 0% 96.1%;
          --accent-foreground: 0 0% 9%;
          --alert: 0 84.2% 60.2%;
          --alert-foreground: 0 0% 98%;
          --ring: 0 0% 0%;
          --border-width: 2px;
          --border-radius: 1rem;
          --shadow-base: 0px 0px 0px 0 rgba(0, 0, 0, 1);
          --shadow-sm: 4px 4px 0px 0 rgba(0, 0, 0, 1);
          --shadow: 5px 5px 0px 0px rgba(0, 0, 0, 1);
          --shadow-md: 6px 6px 0px 0px rgba(0, 0, 0, 1);
          --shadow-lg: 8px 8px 0px 0px rgba(0, 0, 0, 1);
          --shadow-xl: 11px 11px 0px 0px rgba(0, 0, 0, 1);
          --shadow-2xl: 13px 13px 0px 0px rgba(0, 0, 0, 1);
          --shadow-inner: inset 2px 2px 0px 0px rgba(0, 0, 0, 0);
          --transform-press: translate(4px, 4px);
        }
        .dark {
          --background: 0 0% 9%;
          --foreground: 0 0% 98%;
          --muted: 0 0% 14.9%;
          --muted-foreground: 0 0% 63.9%;
          --popover: 0 0% 9%;
          --popover-foreground: 0 0% 98%;
          --card: 0 0% 9%;
          --card-foreground: 0 0% 98%;
          --border: 0 0% 0%;
          --input: 0 0% 0%;
          --primary: 0 72.2% 50.6%;
          --primary-foreground: 0 0% 100%;
          --secondary: 0 0% 25.1%;
          --secondary-foreground: 0 0% 98%;
          --accent: 0 0% 14.9%;
          --accent-foreground: 0 0% 98%;
          --alert: 0 84.2% 60.2%;
          --alert-foreground: 0 0% 98%;
          --ring: 0 0% 0%;
          --border-width: 3px;
          --border-radius: 1rem;
          --shadow-base: 0px 0px 0px 0 rgba(0, 0, 0, 1);
          --shadow-sm: 4px 4px 0px 0 rgba(0, 0, 0, 1);
          --shadow: 5px 5px 0px 0px rgba(0, 0, 0, 1);
          --shadow-md: 6px 6px 0px 0px rgba(0, 0, 0, 1);
          --shadow-lg: 8px 8px 0px 0px rgba(0, 0, 0, 1);
          --shadow-xl: 11px 11px 0px 0px rgba(0, 0, 0, 1);
          --shadow-2xl: 13px 13px 0px 0px rgba(0, 0, 0, 1);
          --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.01);
          --transform-press: translate(4px, 4px);
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
