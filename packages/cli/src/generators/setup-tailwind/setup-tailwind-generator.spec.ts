import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { ThemeBorderRadiuses, ThemePrimaryColors, ThemeStyles } from '@qwik-ui/utils';
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

    return {
      tree,
      options,
    };
  }

  test(`
    GIVEN no options are passed
    THEN it should generate "simple" style with primary color "cyan-600", base color "slate" and border-radius 0`, async () => {
    const { tree, options } = setupWithProperFiles();

    options.rootCssPath = 'src/global.css';

    await setupTailwindGenerator(tree, options);

    const updatedGlobalCssContent = tree.read('src/global.css', 'utf-8');

    expect(updatedGlobalCssContent).toMatchInlineSnapshot(`
      "@tailwind components;
      @tailwind base;
      @tailwind utilities;
      @layer qwik-ui, popover-polyfill, theme, base, components, utilities;
      @import 'tailwindcss';
      @import 'tw-animate-css';

      @custom-variant dark (&:is(.dark *));

      @layer base {
        :root {
          --background: white;
          --foreground: var(--color-slate-950);
          --muted: var(--color-slate-100);
          --muted-foreground: var(--color-slate-700);
          --popover: white;
          --popover-foreground: var(--color-slate-900);
          --card: white;
          --card-foreground: var(--color-slate-900);
          --border: var(--color-slate-200);
          --input: var(--color-slate-200);
          --primary: var(--color-cyan-600);
          --primary-foreground: white;
          --secondary: var(--color-slate-900);
          --secondary-foreground: white;
          --accent: var(--color-slate-100);
          --accent-foreground: var(--color-slate-900);
          --alert: var(--color-red-500);
          --alert-foreground: var(--color-slate-50);
          --ring: var(--color-slate-900);
          --border-width: 0px;
          --border-radius: 0rem;
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0px rgba(0, 0, 0, 0.1);
          --shadow-md:
            0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
          --shadow-lg:
            0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
          --shadow-xl:
            0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 1);
          --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.01);
          --transform-press: scale(0.95);
        }
        .dark {
          --background: var(--color-slate-950);
          --foreground: var(--color-slate-50);
          --muted: var(--color-slate-800);
          --muted-foreground: var(--color-slate-300);
          --popover: var(--color-slate-950);
          --popover-foreground: var(--color-slate-50);
          --card: var(--color-slate-950);
          --card-foreground: var(--color-slate-50);
          --border: var(--color-slate-800);
          --input: var(--color-slate-800);
          --primary: var(--color-cyan-600);
          --primary-foreground: white;
          --secondary: var(--color-slate-100);
          --secondary-foreground: black;
          --accent: var(--color-slate-700);
          --accent-foreground: var(--color-slate-50);
          --alert: var(--color-red-500);
          --alert-foreground: var(--color-slate-50);
          --ring: var(--color-slate-300);
          --border-width: 0px;
          --border-radius: 0rem;
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0px rgba(0, 0, 0, 0.1);
          --shadow-md:
            0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
          --shadow-lg:
            0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
          --shadow-xl:
            0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 1);
          --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.01);
          --transform-press: scale(0.95);
        }
      }

      @theme inline {
        --color-background: var(--background);
        --color-foreground: var(--foreground);
        --color-card: var(--card);
        --color-card-foreground: var(--card-foreground);
        --color-popover: var(--popover);
        --color-popover-foreground: var(--popover-foreground);
        --color-primary: var(--primary);
        --color-primary-foreground: var(--primary-foreground);
        --color-secondary: var(--secondary);
        --color-secondary-foreground: var(--secondary-foreground);
        --color-muted: var(--muted);
        --color-muted-foreground: var(--muted-foreground);
        --color-accent: var(--accent);
        --color-accent-foreground: var(--accent-foreground);
        --color-alert: var(--alert);
        --color-alert-foreground: var(--alert-foreground);
        --color-border: var(--border);
        --color-input: var(--input);
        --color-ring: var(--ring);
        --radius-xs: var(--border-radius);
        --radius-sm: calc(var(--border-radius) + 0.125rem);
        --radius-md: calc(var(--border-radius) + 0.375rem);
        --radius-lg: calc(var(--border-radius) + 0.5rem);
        --radius-xl: calc(var(--border-radius) + 0.75rem);
        --radius-2xl: calc(var(--border-radius) + 1rem);
        --radius-3xl: calc(var(--border-radius) + 1.5rem);
        --shadow-base: var(--shadow-base);
        --shadow-xs: var(--shadow-xs);
        --shadow-sm: var(--shadow-sm);
        --shadow-md: var(--shadow-md);
        --shadow-lg: var(--shadow-lg);
        --shadow-xl: var(--shadow-xl);
        --shadow-2xl: var(--shadow-2xl);
        --shadow-inner: var(--shadow-inner);
        --default-border-width: calc(var(--border-width) + 1px);
        --border-width-base: var(--border-width);
        --border-width-2: calc(var(--border-width) + 2px);
        --border-width-4: calc(var(--border-width) + 4px);
        --border-width-8: calc(var(--border-width) + 8px);
        --stroke-width-0: 0px;
        --stroke-width-base: var(--stroke-width);
        --stroke-width-1: calc(var(--stroke-width) + 1px);
        --stroke-width-2: calc(var(--stroke-width) + 2px);
        --animate-accordion-down: collapsible-down 0.2s ease-out forwards;
        --animate-accordion-up: collapsible-up 0.2s ease-out forwards;

        @keyframes collapsible-down {
          from {
            height: 0;
          }
          to {
            height: var(--qwikui-collapsible-content-height);
          }
        }
        @keyframes collapsible-up {
          from {
            height: var(--qwikui-collapsible-content-height);
          }
          to {
            height: 0;
          }
        }
      }

      @utility press {
        transform: var(--transform-press);
      }
      @utility border-width-* {
        /* prettier-ignore */
        border: --value(--border-width-*);
      }
      @utility stroke-width-* {
        /* prettier-ignore */
        stroke: --value(--stroke-width-*);
      }
      @utility shadow-* {
        /* prettier-ignore */
        box-shadow: --value(--shadow-*);
      }

      @layer base {
        * {
          @apply border-border outline-ring/50;
        }
        body {
          @apply bg-background text-foreground;
        }
      }

      @layer components {
        * {
          @apply border-border outline-ring/50;
        }
        body {
          @apply bg-background text-foreground;
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
    GIVEN style is "brutalist" and primary color is "red-600" and border-radius is 1
    THEN it should generate the correct theme`, async () => {
    const { tree, options } = setupWithProperFiles();

    options.rootCssPath = 'src/global.css';
    options.borderRadius = ThemeBorderRadiuses['BORDER-RADIUS-1'];
    options.primaryColor = ThemePrimaryColors.RED600;
    options.style = ThemeStyles.BRUTALIST;

    await setupTailwindGenerator(tree, options);

    const updatedGlobalCssContent = tree.read('src/global.css', 'utf-8');

    expect(updatedGlobalCssContent).toMatchInlineSnapshot(`
      "@tailwind components;
      @tailwind base;
      @tailwind utilities;
      @layer qwik-ui, popover-polyfill, theme, base, components, utilities;
      @import 'tailwindcss';
      @import 'tw-animate-css';

      @custom-variant dark (&:is(.dark *));

      @layer base {
        :root {
          --background: white;
          --foreground: var(--color-slate-950);
          --muted: var(--color-slate-100);
          --muted-foreground: var(--color-slate-700);
          --popover: white;
          --popover-foreground: var(--color-slate-900);
          --card: white;
          --card-foreground: var(--color-slate-900);
          --border: black;
          --input: black;
          --primary: var(--color-red-600);
          --primary-foreground: white;
          --secondary: var(--color-slate-900);
          --secondary-foreground: white;
          --accent: var(--color-slate-100);
          --accent-foreground: var(--color-slate-900);
          --alert: var(--color-red-500);
          --alert-foreground: var(--color-slate-50);
          --ring: black;
          --border-width: 2px;
          --border-radius: 1rem;
          --shadow-sm: 4px 4px rgba(0, 0, 0, 1);
          --shadow: 5px 5px rgba(0, 0, 0, 1);
          --shadow-md: 6px 6px rgba(0, 0, 0, 1);
          --shadow-lg: 8px 8px rgba(0, 0, 0, 1);
          --shadow-xl: 11px 11px rgba(0, 0, 0, 1);
          --shadow-2xl: 13px 13px rgba(0, 0, 0, 1);
          --transform-press: translate(4px, 4px);
        }
        .dark {
          --background: var(--color-slate-950);
          --foreground: var(--color-slate-50);
          --muted: var(--color-slate-800);
          --muted-foreground: var(--color-slate-300);
          --popover: var(--color-slate-950);
          --popover-foreground: var(--color-slate-50);
          --card: var(--color-slate-950);
          --card-foreground: var(--color-slate-50);
          --border: black;
          --input: black;
          --primary: var(--color-red-600);
          --primary-foreground: white;
          --secondary: var(--color-slate-100);
          --secondary-foreground: black;
          --accent: var(--color-slate-700);
          --accent-foreground: var(--color-slate-50);
          --alert: var(--color-red-500);
          --alert-foreground: var(--color-slate-50);
          --ring: black;
          --border-width: 3px;
          --border-radius: 1rem;
          --shadow-sm: 4px 4px rgba(0, 0, 0, 1);
          --shadow: 5px 5px rgba(0, 0, 0, 1);
          --shadow-md: 6px 6px rgba(0, 0, 0, 1);
          --shadow-lg: 8px 8px rgba(0, 0, 0, 1);
          --shadow-xl: 11px 11px rgba(0, 0, 0, 1);
          --shadow-2xl: 13px 13px rgba(0, 0, 0, 1);
          --transform-press: translate(4px, 4px);
        }
      }

      @theme inline {
        --color-background: var(--background);
        --color-foreground: var(--foreground);
        --color-card: var(--card);
        --color-card-foreground: var(--card-foreground);
        --color-popover: var(--popover);
        --color-popover-foreground: var(--popover-foreground);
        --color-primary: var(--primary);
        --color-primary-foreground: var(--primary-foreground);
        --color-secondary: var(--secondary);
        --color-secondary-foreground: var(--secondary-foreground);
        --color-muted: var(--muted);
        --color-muted-foreground: var(--muted-foreground);
        --color-accent: var(--accent);
        --color-accent-foreground: var(--accent-foreground);
        --color-alert: var(--alert);
        --color-alert-foreground: var(--alert-foreground);
        --color-border: var(--border);
        --color-input: var(--input);
        --color-ring: var(--ring);
        --radius-xs: var(--border-radius);
        --radius-sm: calc(var(--border-radius) + 0.125rem);
        --radius-md: calc(var(--border-radius) + 0.375rem);
        --radius-lg: calc(var(--border-radius) + 0.5rem);
        --radius-xl: calc(var(--border-radius) + 0.75rem);
        --radius-2xl: calc(var(--border-radius) + 1rem);
        --radius-3xl: calc(var(--border-radius) + 1.5rem);
        --shadow-base: var(--shadow-base);
        --shadow-xs: var(--shadow-xs);
        --shadow-sm: var(--shadow-sm);
        --shadow-md: var(--shadow-md);
        --shadow-lg: var(--shadow-lg);
        --shadow-xl: var(--shadow-xl);
        --shadow-2xl: var(--shadow-2xl);
        --shadow-inner: var(--shadow-inner);
        --default-border-width: calc(var(--border-width) + 1px);
        --border-width-base: var(--border-width);
        --border-width-2: calc(var(--border-width) + 2px);
        --border-width-4: calc(var(--border-width) + 4px);
        --border-width-8: calc(var(--border-width) + 8px);
        --stroke-width-0: 0px;
        --stroke-width-base: var(--stroke-width);
        --stroke-width-1: calc(var(--stroke-width) + 1px);
        --stroke-width-2: calc(var(--stroke-width) + 2px);
        --animate-accordion-down: collapsible-down 0.2s ease-out forwards;
        --animate-accordion-up: collapsible-up 0.2s ease-out forwards;

        @keyframes collapsible-down {
          from {
            height: 0;
          }
          to {
            height: var(--qwikui-collapsible-content-height);
          }
        }
        @keyframes collapsible-up {
          from {
            height: var(--qwikui-collapsible-content-height);
          }
          to {
            height: 0;
          }
        }
      }

      @utility press {
        transform: var(--transform-press);
      }
      @utility border-width-* {
        /* prettier-ignore */
        border: --value(--border-width-*);
      }
      @utility stroke-width-* {
        /* prettier-ignore */
        stroke: --value(--stroke-width-*);
      }
      @utility shadow-* {
        /* prettier-ignore */
        box-shadow: --value(--shadow-*);
      }

      @layer base {
        * {
          @apply border-border outline-ring/50;
        }
        body {
          @apply bg-background text-foreground;
        }
      }

      @layer components {
        * {
          @apply border-border outline-ring/50;
        }
        body {
          @apply bg-background text-foreground;
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
