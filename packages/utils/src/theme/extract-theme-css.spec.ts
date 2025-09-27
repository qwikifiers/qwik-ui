import { extractThemeCSS } from './extract-theme-css';

function generateStringInAllPossibleOrders(str: string): string[] {
  const result: string[] = [];

  // Split the string into parts based on spaces
  const parts = str.split(' ');

  // Recursive function to generate permutations
  function permute(arr: string[], m: string[] = []) {
    if (arr.length === 0) {
      result.push(m.join(' '));
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice();
        const next = curr.splice(i, 1);
        permute(curr, m.concat(next));
      }
    }
  }

  permute(parts);

  return result;
}

describe('Extract theme from css', () => {
  test(`GIVEN theme string is 'simple base-neutral primary-cyan-600 border-radius-0'
        THEN generate the right css variables`, () => {
    const inputThemeString = 'simple base-neutral primary-cyan-600 border-radius-0';

    const theme = extractThemeCSS(inputThemeString, exampleRootCssContent);

    expect(theme).toMatchInlineSnapshot(`
      "@layer base, qwik-ui, popover-polyfill, theme, components, utilities;
      @import 'tailwindcss';
      @import 'tw-animate-css';

      @custom-variant dark (&:is(.dark *));

      @layer base {
        :root {
          --background: white;
          --foreground: var(--color-neutral-900);
          --muted: var(--color-neutral-100);
          --muted-foreground: var(--color-neutral-700);
          --popover: white;
          --popover-foreground: var(--color-neutral-900);
          --card: white;
          --card-foreground: var(--color-neutral-900);
          --border: var(--color-neutral-200);
          --input: var(--color-neutral-200);
          --secondary: var(--color-neutral-900);
          --secondary-foreground: white;
          --accent: var(--color-neutral-100);
          --accent-foreground: var(--color-neutral-900);
          --alert: var(--color-red-500);
          --alert-foreground: var(--color-neutral-50);
          --ring: var(--color-neutral-900);
          --border-width: 0px;
          --border-radius: 0rem;
          --shadow-2xs: 0 1px 2px 0 rgba(0, 0, 0, 0.01);
          --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.01);
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
          --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 1);
          --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.01);
          --transform-press: scale(0.95);
        }
        .dark {
          --background: var(--color-neutral-950);
          --foreground: var(--color-neutral-50);
          --muted: var(--color-neutral-800);
          --muted-foreground: var(--color-neutral-300);
          --popover: var(--color-neutral-950);
          --popover-foreground: var(--color-neutral-50);
          --card: var(--color-neutral-950);
          --card-foreground: var(--color-neutral-50);
          --border: var(--color-neutral-800);
          --input: var(--color-neutral-800);
          --secondary: var(--color-neutral-100);
          --secondary-foreground: black;
          --accent: var(--color-neutral-700);
          --accent-foreground: var(--color-neutral-50);
          --alert: var(--color-red-500);
          --alert-foreground: var(--color-neutral-50);
          --ring: var(--color-neutral-300);
          --border-width: 0px;
          --border-radius: 0rem;
          --shadow-2xs: 0 1px 2px 0 rgba(0, 0, 0, 0.01);
          --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.01);
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
          --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 1);
          --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.01);
          --transform-press: scale(0.95);
        }
      }

      @theme {
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
        --shadow-2xs: var(--shadow-2xs);
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
      "
    `);
  });

  test(`GIVEN primary color is "cyan-600", 
        border-radius is 0,
        base color is "neutral",
        and style is "simple",
        in whatever order,
        THEN generate the right css variables`, () => {
    const themeStringInEveryOrder = generateStringInAllPossibleOrders(
      'simple base-neutral primary-cyan-600 border-radius-0',
    );

    themeStringInEveryOrder.forEach((themeString) => {
      const theme = extractThemeCSS(themeString, exampleRootCssContent);
      expect(theme).toMatchInlineSnapshot(`
        "@layer base, qwik-ui, popover-polyfill, theme, components, utilities;
        @import 'tailwindcss';
        @import 'tw-animate-css';

        @custom-variant dark (&:is(.dark *));

        @layer base {
          :root {
            --background: white;
            --foreground: var(--color-neutral-900);
            --muted: var(--color-neutral-100);
            --muted-foreground: var(--color-neutral-700);
            --popover: white;
            --popover-foreground: var(--color-neutral-900);
            --card: white;
            --card-foreground: var(--color-neutral-900);
            --border: var(--color-neutral-200);
            --input: var(--color-neutral-200);
            --secondary: var(--color-neutral-900);
            --secondary-foreground: white;
            --accent: var(--color-neutral-100);
            --accent-foreground: var(--color-neutral-900);
            --alert: var(--color-red-500);
            --alert-foreground: var(--color-neutral-50);
            --ring: var(--color-neutral-900);
            --border-width: 0px;
            --border-radius: 0rem;
            --shadow-2xs: 0 1px 2px 0 rgba(0, 0, 0, 0.01);
            --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.01);
            --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
            --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
            --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
            --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 1);
            --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.01);
            --transform-press: scale(0.95);
          }
          .dark {
            --background: var(--color-neutral-950);
            --foreground: var(--color-neutral-50);
            --muted: var(--color-neutral-800);
            --muted-foreground: var(--color-neutral-300);
            --popover: var(--color-neutral-950);
            --popover-foreground: var(--color-neutral-50);
            --card: var(--color-neutral-950);
            --card-foreground: var(--color-neutral-50);
            --border: var(--color-neutral-800);
            --input: var(--color-neutral-800);
            --secondary: var(--color-neutral-100);
            --secondary-foreground: black;
            --accent: var(--color-neutral-700);
            --accent-foreground: var(--color-neutral-50);
            --alert: var(--color-red-500);
            --alert-foreground: var(--color-neutral-50);
            --ring: var(--color-neutral-300);
            --border-width: 0px;
            --border-radius: 0rem;
            --shadow-2xs: 0 1px 2px 0 rgba(0, 0, 0, 0.01);
            --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.01);
            --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
            --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
            --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
            --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 1);
            --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.01);
            --transform-press: scale(0.95);
          }
        }

        @theme {
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
          --shadow-2xs: var(--shadow-2xs);
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
        "
      `);
    });
  });
});

test(`GIVEN theme string is 'brutalist base-stone primary-pink-700 border-radius-dot-75'
      THEN generate the right css variables`, () => {
  const inputThemeString = 'brutalist base-stone primary-pink-700 border-radius-dot-75';

  const theme = extractThemeCSS(inputThemeString, exampleRootCssContent);

  expect(theme).toMatchInlineSnapshot(`
    "@layer base, qwik-ui, popover-polyfill, theme, components, utilities;
    @import 'tailwindcss';
    @import 'tw-animate-css';

    @custom-variant dark (&:is(.dark *));

    @layer base {
      :root {
        --background: white;
        --foreground: var(--color-stone-900);
        --muted: var(--color-stone-100);
        --muted-foreground: var(--color-stone-700);
        --popover: white;
        --popover-foreground: var(--color-stone-900);
        --card: white;
        --card-foreground: var(--color-stone-900);
        --border: black;
        --input: black;
        --secondary: var(--color-stone-900);
        --secondary-foreground: white;
        --accent: var(--color-stone-100);
        --accent-foreground: var(--color-stone-900);
        --alert: var(--color-red-500);
        --alert-foreground: var(--color-stone-50);
        --ring: black;
        --border-width: 2px;
        --stroke-width: 2px;
        --border-radius: 0.75rem;
        --shadow-2xs: 1px 1px rgba(0, 0, 0, 1);
        --shadow-xs: 2px 2px rgba(0, 0, 0, 1);
        --shadow-sm: 4px 4px rgba(0, 0, 0, 1);
        --shadow-md: 6px 6px rgba(0, 0, 0, 1);
        --shadow-lg: 8px 8px rgba(0, 0, 0, 1);
        --shadow-xl: 11px 11px rgba(0, 0, 0, 1);
        --shadow-2xl: 13px 13px rgba(0, 0, 0, 1);
        --transform-press: translate(4px, 4px);
      }
      .dark {
        --background: var(--color-stone-950);
        --foreground: var(--color-stone-50);
        --muted: var(--color-stone-800);
        --muted-foreground: var(--color-stone-300);
        --popover: var(--color-stone-950);
        --popover-foreground: var(--color-stone-50);
        --card: var(--color-stone-950);
        --card-foreground: var(--color-stone-50);
        --border: black;
        --input: black;
        --secondary: var(--color-stone-100);
        --secondary-foreground: black;
        --accent: var(--color-stone-700);
        --accent-foreground: var(--color-stone-50);
        --alert: var(--color-red-500);
        --alert-foreground: var(--color-stone-50);
        --ring: black;
        --border-width: 3px;
        --stroke-width: 2px;
        --border-radius: 0.75rem;
        --shadow-2xs: 1px 1px rgba(0, 0, 0, 1);
        --shadow-xs: 2px 2px rgba(0, 0, 0, 1);
        --shadow-sm: 4px 4px rgba(0, 0, 0, 1);
        --shadow-md: 6px 6px rgba(0, 0, 0, 1);
        --shadow-lg: 8px 8px rgba(0, 0, 0, 1);
        --shadow-xl: 11px 11px rgba(0, 0, 0, 1);
        --shadow-2xl: 13px 13px rgba(0, 0, 0, 1);
        --transform-press: translate(4px, 4px);
      }
    }

    @theme {
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
      --shadow-2xs: var(--shadow-2xs);
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
    "
  `);
});

test(`GIVEN primary color is "pink-700", 
      border-radius is 0.75,
      base color is "stone",
      and style is "brutalist",
      in whatever order,
      THEN generate the right css variables`, () => {
  const themeStringInEveryOrder = generateStringInAllPossibleOrders(
    'brutalist base-stone primary-pink-700 border-radius-dot-75',
  );

  themeStringInEveryOrder.forEach((themeString) => {
    const theme = extractThemeCSS(themeString, exampleRootCssContent);
    expect(theme).toMatchInlineSnapshot(`
      "@layer base, qwik-ui, popover-polyfill, theme, components, utilities;
      @import 'tailwindcss';
      @import 'tw-animate-css';

      @custom-variant dark (&:is(.dark *));

      @layer base {
        :root {
          --background: white;
          --foreground: var(--color-stone-900);
          --muted: var(--color-stone-100);
          --muted-foreground: var(--color-stone-700);
          --popover: white;
          --popover-foreground: var(--color-stone-900);
          --card: white;
          --card-foreground: var(--color-stone-900);
          --border: black;
          --input: black;
          --secondary: var(--color-stone-900);
          --secondary-foreground: white;
          --accent: var(--color-stone-100);
          --accent-foreground: var(--color-stone-900);
          --alert: var(--color-red-500);
          --alert-foreground: var(--color-stone-50);
          --ring: black;
          --border-width: 2px;
          --stroke-width: 2px;
          --border-radius: 0.75rem;
          --shadow-2xs: 1px 1px rgba(0, 0, 0, 1);
          --shadow-xs: 2px 2px rgba(0, 0, 0, 1);
          --shadow-sm: 4px 4px rgba(0, 0, 0, 1);
          --shadow-md: 6px 6px rgba(0, 0, 0, 1);
          --shadow-lg: 8px 8px rgba(0, 0, 0, 1);
          --shadow-xl: 11px 11px rgba(0, 0, 0, 1);
          --shadow-2xl: 13px 13px rgba(0, 0, 0, 1);
          --transform-press: translate(4px, 4px);
        }
        .dark {
          --background: var(--color-stone-950);
          --foreground: var(--color-stone-50);
          --muted: var(--color-stone-800);
          --muted-foreground: var(--color-stone-300);
          --popover: var(--color-stone-950);
          --popover-foreground: var(--color-stone-50);
          --card: var(--color-stone-950);
          --card-foreground: var(--color-stone-50);
          --border: black;
          --input: black;
          --secondary: var(--color-stone-100);
          --secondary-foreground: black;
          --accent: var(--color-stone-700);
          --accent-foreground: var(--color-stone-50);
          --alert: var(--color-red-500);
          --alert-foreground: var(--color-stone-50);
          --ring: black;
          --border-width: 3px;
          --stroke-width: 2px;
          --border-radius: 0.75rem;
          --shadow-2xs: 1px 1px rgba(0, 0, 0, 1);
          --shadow-xs: 2px 2px rgba(0, 0, 0, 1);
          --shadow-sm: 4px 4px rgba(0, 0, 0, 1);
          --shadow-md: 6px 6px rgba(0, 0, 0, 1);
          --shadow-lg: 8px 8px rgba(0, 0, 0, 1);
          --shadow-xl: 11px 11px rgba(0, 0, 0, 1);
          --shadow-2xl: 13px 13px rgba(0, 0, 0, 1);
          --transform-press: translate(4px, 4px);
        }
      }

      @theme {
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
        --shadow-2xs: var(--shadow-2xs);
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
      "
    `);
  });
});

const exampleRootCssContent = `
@layer base, qwik-ui, popover-polyfill, theme, components, utilities;
@import 'tailwindcss';
@import 'tw-animate-css';

@source "../../../packages/kit-styled";

@custom-variant dark (&:is(.dark *));

@layer base {
  :root {
    --background: white;
    --foreground: var(--color-slate-900);
    --muted: var(--color-slate-100);
    --muted-foreground: var(--color-slate-700);
    --popover: white;
    --popover-foreground: var(--color-slate-900);
    --card: white;
    --card-foreground: var(--color-slate-900);
    --border: var(--color-slate-200);
    --input: var(--color-slate-200);
    --primary: oklch(74.1% 38.5% 234.357);
    --primary-foreground: black;
    --secondary: oklch(69.9% 46.25% 301.823);
    --secondary-foreground: black;
    --accent: var(--color-slate-100);
    --accent-foreground: var(--color-slate-900);
    --alert: var(--color-red-500);
    --alert-foreground: var(--color-slate-50);
    --ring: var(--color-slate-900);
    --border-width: 0px;
    --border-radius: 0;
    --shadow-base: 0 1px 2px 0 rgba(0, 0, 0, 0.01);
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
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
    --primary: oklch(74.1% 38.5% 234.357);
    --primary-foreground: black;
    --secondary: oklch(69.9% 46.25% 301.823);
    --secondary-foreground: black;
    --accent: var(--color-slate-700);
    --accent-foreground: var(--color-slate-50);
    --alert: var(--color-red-500);
    --alert-foreground: var(--color-slate-50);
    --ring: var(--color-slate-300);
    --border-width: 0px;
    --border-radius: 0;
    --shadow-base: 0 1px 2px 0 rgba(0, 0, 0, 0.01);
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 1);
    --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.01);
    --transform-press: scale(0.95);
  }

  @theme {
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

@layer base {
  /* CSS PARSER: START - DO NOT REMOVE */
  .border-radius-0 {
    --border-radius: 0rem;
  }

  .border-radius-dot-25 {
    --border-radius: 0.25rem;
  }

  .border-radius-dot-50 {
    --border-radius: 0.5rem;
  }

  .border-radius-dot-75 {
    --border-radius: 0.75rem;
  }

  .border-radius-1 {
    --border-radius: 1rem;
  }

  .simple {
    --border-width: 0px;
    --shadow-2xs: 0 1px 2px 0 rgba(0, 0, 0, 0.01);
    --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.01);
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1), 0 1px 5px 0px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 1);
    --inset-shadow-2xs: inset 0 1px rgb(0 0 0 / 0.05);
    --inset-shadow-xs: inset 0 1px 1px rgb(0 0 0 / 0.05);
    --inset-shadow-sm: inset 0 2px 4px rgb(0 0 0 / 0.05);
    --drop-shadow-xs: 0 1px 1px rgb(0 0 0 / 0.05);
    --drop-shadow-sm: 0 1px 2px rgb(0 0 0 / 0.15);
    --drop-shadow-md: 0 3px 3px rgb(0 0 0 / 0.12);
    --drop-shadow-lg: 0 4px 4px rgb(0 0 0 / 0.15);
    --drop-shadow-xl: 0 9px 7px rgb(0 0 0 / 0.1);
    --drop-shadow-2xl: 0 25px 25px rgb(0 0 0 / 0.15);
    --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.01);
    --transform-press: scale(0.95);
  }

  .brutalist.brutalist {
    --border-width: 2px;
    --stroke-width: 2px;
    --border: black;
    --input: black;
    --ring: black;
    --shadow-2xs: 1px 1px rgba(0, 0, 0, 1);
    --shadow-xs: 2px 2px rgba(0, 0, 0, 1);
    --shadow-sm: 4px 4px rgba(0, 0, 0, 1);
    --shadow: 5px 5px rgba(0, 0, 0, 1);
    --shadow-md: 6px 6px rgba(0, 0, 0, 1);
    --shadow-lg: 8px 8px rgba(0, 0, 0, 1);
    --shadow-xl: 11px 11px rgba(0, 0, 0, 1);
    --shadow-2xl: 13px 13px rgba(0, 0, 0, 1);
    --inset-shadow-2xs: inset -1px -1px rgba(0, 0, 0, 1);
    --inset-shadow-xs: inset -2px -2px rgba(0, 0, 0, 1);
    --inset-shadow-sm: inset -3px -3px rgba(0, 0, 0, 1);
    --drop-shadow-xs: 0 1px 1px rgb(0 0 0 / 0.5);
    --drop-shadow-sm: 0 1px 2px rgb(0 0 0 / 0.5);
    --drop-shadow-md: 0 3px 3px rgb(0 0 0 / 0.5);
    --drop-shadow-lg: 0 4px 4px rgb(0 0 0 / 0.5);
    --drop-shadow-xl: 0 9px 7px rgb(0 0 0 / 1);
    --drop-shadow-2xl: 0 25px 25px rgb(0 0 0 / 1);
    --transform-press: translate(4px, 4px);
  }

  .dark.brutalist.brutalist {
    --border-width: 3px;
    --stroke-width: 2px;
    --underline: 2px;
    --shadow-2xs: 1px 1px rgba(0, 0, 0, 1);
    --shadow-xs: 2px 2px rgba(0, 0, 0, 1);
    --shadow-sm: 4px 4px rgba(0, 0, 0, 1);
    --shadow: 5px 5px rgba(0, 0, 0, 1);
    --shadow-md: 6px 6px rgba(0, 0, 0, 1);
    --shadow-lg: 8px 8px rgba(0, 0, 0, 1);
    --shadow-xl: 11px 11px rgba(0, 0, 0, 1);
    --shadow-2xl: 13px 13px rgba(0, 0, 0, 1);
    --inset-shadow-2xs: inset -1px -1px rgba(0, 0, 0, 1);
    --inset-shadow-xs: inset -2px -2px rgba(0, 0, 0, 1);
    --inset-shadow-sm: inset -3px -3px rgba(0, 0, 0, 1);
    --drop-shadow-xs: 0 1px 1px rgb(0 0 0 / 0.5);
    --drop-shadow-sm: 0 1px 2px rgb(0 0 0 / 0.5);
    --drop-shadow-md: 0 3px 3px rgb(0 0 0 / 0.5);
    --drop-shadow-lg: 0 4px 4px rgb(0 0 0 / 0.5);
    --drop-shadow-xl: 0 9px 7px rgb(0 0 0 / 1);
    --drop-shadow-2xl: 0 25px 25px rgb(0 0 0 / 1);
    --transform-press: translate(4px, 4px);
  }

  .neumorphic.neumorphic {
    --border-width: 0px;
    --stroke-width: 0px;
    --background: hsl(0 0 88%);
    --foreground: var(--color-zinc-900);
    --popover: hsl(0 0 88%);
    --popover-foreground: var(--color-zinc-900);
    --card: hsl(0 0 88%);
    --card-foreground: var(--color-zinc-900);
    --border: hsl(0 0% 80.2%);
    --ring: hsl(0 0% 80.2%);
    --input: hsl(0 0% 80.2%);
    --shadow-base:
      -3px -3px 6px #bebebe, 3px 3px 6px #ffffff,
      inset 1px 1px 2px rgba(190, 190, 190, 0.5),
      inset -1px -1px 2px rgba(255, 255, 255, 0.5);
    --shadow-sm:
      3px 3px 6px #bebebe, -3px -3px 6px #ffffff,
      inset 1px 1px 2px rgba(190, 190, 190, 0.5),
      inset -1px -1px 2px rgba(255, 255, 255, 0.5);
    --shadow:
      4px 4px 8px #bebebe, -4px -4px 8px #ffffff,
      inset 1px 1px 2px rgba(190, 190, 190, 0.5),
      inset -1px -1px 2px rgba(255, 255, 255, 0.5);
    --shadow-md:
      5px 5px 10px #bebebe, -5px -5px 10px #ffffff,
      inset 1px 1px 2px rgba(190, 190, 190, 0.5),
      inset -1px -1px 2px rgba(255, 255, 255, 0.5);
    --shadow-lg:
      6px 6px 12px #bebebe, -6px -6px 12px #ffffff,
      inset 1px 1px 2px rgba(190, 190, 190, 0.5),
      inset -1px -1px 2px rgba(255, 255, 255, 0.5);
    --shadow-xl:
      8px 8px 15px #bebebe, -8px -8px 15px #ffffff,
      inset 1px 1px 2px rgba(190, 190, 190, 0.5),
      inset -1px -1px 2px rgba(255, 255, 255, 0.5);
    --shadow-2xl:
      10px 10px 20px #bebebe, -10px -10px 20px #ffffff,
      inset 1px 1px 2px rgba(190, 190, 190, 0.5),
      inset -1px -1px 2px rgba(255, 255, 255, 0.5);
    --shadow-inner: inset 4px 4px 8px #bebebe, inset -2px -2px 4px #ffffff;
    --transform-press: scale(0.95);
  }

  .dark.neumorphic.neumorphic {
    --border-width: 0px;
    --stroke-width: 0px;
    --background: var(--color-zinc-700);
    --foreground: var(--color-zinc-200);
    --popover: var(--color-zinc-700);
    --popover-foreground: var(--color-zinc-200);
    --card: var(--color-zinc-700);
    --card-foreground: var(--color-zinc-200);
    --border: hsl(240 5.9% 20%);
    --ring: hsl(240 5.9% 20%);
    --input: hsl(240 5.9% 20%);
    --shadow-base:
      -3px -3px 6px #2c2c31, 3px 3px 6px #52525b, inset 1px 1px 2px #2c2c31,
      inset -1px -1px 2px #52525b;
    --shadow-sm:
      3px 3px 6px #2c2c31, -3px -3px 6px #52525b, inset 1px 1px 2px #2c2c31,
      inset -1px -1px 2px #52525b;
    --shadow:
      4px 4px 8px #2c2c31, -4px -4px 8px #52525b, inset 1px 1px 2px #2c2c31,
      inset -1px -1px 2px #52525b;
    --shadow-md:
      5px 5px 10px #2c2c31, -5px -5px 10px #52525b, inset 1px 1px 2px #2c2c31,
      inset -1px -1px 2px #52525b;
    --shadow-lg:
      6px 6px 12px #2c2c31, -6px -6px 12px #52525b, inset 1px 1px 2px #2c2c31,
      inset -1px -1px 2px #52525b;
    --shadow-xl:
      8px 8px 15px #2c2c31, -8px -8px 15px #52525b, inset 1px 1px 2px #2c2c31,
      inset -1px -1px 2px #52525b;
    --shadow-2xl:
      10px 10px 20px #2c2c31, -10px -10px 20px #52525b, inset 1px 1px 2px #2c2c31,
      inset -1px -1px 2px #52525b;
    --shadow-inner: inset 2px 2px 4px #2c2c31, inset -2px -2px 4px #52525b;
    --transform-press: scale(0.95);
  }

  /* use colors from colors.ts */

  .base-slate {
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
    --secondary: var(--color-slate-900);
    --secondary-foreground: white;
    --accent: var(--color-slate-100);
    --accent-foreground: var(--color-slate-900);
    --alert: var(--color-red-500);
    --alert-foreground: var(--color-slate-50);
    --ring: var(--color-slate-900);
  }
  .dark.base-slate {
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
    --secondary: var(--color-slate-100);
    --secondary-foreground: black;
    --accent: var(--color-slate-700);
    --accent-foreground: var(--color-slate-50);
    --alert: var(--color-red-500);
    --alert-foreground: var(--color-slate-50);
    --ring: var(--color-slate-300);
  }

  .base-gray {
    --background: white;
    --foreground: var(--color-gray-950);
    --muted: var(--color-gray-100);
    --muted-foreground: var(--color-gray-700);
    --popover: white;
    --popover-foreground: var(--color-gray-950);
    --card: white;
    --card-foreground: var(--color-gray-950);
    --border: var(--color-gray-200);
    --input: var(--color-gray-200);
    --secondary: var(--color-gray-950);
    --secondary-foreground: white;
    --accent: var(--color-gray-100);
    --accent-foreground: var(--color-gray-950);
    --alert: var(--color-red-500);
    --alert-foreground: var(--color-gray-50);
    --ring: var(--color-gray-950);
  }
  .dark.base-gray {
    --background: var(--color-gray-950);
    --foreground: var(--color-gray-50);
    --muted: var(--color-gray-800);
    --muted-foreground: var(--color-gray-300);
    --popover: var(--color-gray-950);
    --popover-foreground: var(--color-gray-50);
    --card: var(--color-gray-950);
    --card-foreground: var(--color-gray-50);
    --border: var(--color-gray-800);
    --input: var(--color-gray-800);
    --secondary: var(--color-gray-100);
    --secondary-foreground: black;
    --accent: var(--color-gray-700);
    --accent-foreground: var(--color-gray-50);
    --alert: var(--color-red-500);
    --alert-foreground: var(--color-gray-50);
    --ring: var(--color-gray-300);
  }

  .base-zinc {
    --background: white;
    --foreground: var(--color-zinc-900);
    --muted: var(--color-zinc-100);
    --muted-foreground: var(--color-zinc-700);
    --popover: white;
    --popover-foreground: var(--color-zinc-900);
    --card: white;
    --card-foreground: var(--color-zinc-900);
    --border: var(--color-zinc-200);
    --input: var(--color-zinc-200);
    --secondary: var(--color-zinc-900);
    --secondary-foreground: white;
    --accent: var(--color-zinc-100);
    --accent-foreground: var(--color-zinc-900);
    --alert: var(--color-red-500);
    --alert-foreground: var(--color-zinc-50);
    --ring: var(--color-zinc-900);
  }
  .dark.base-zinc {
    --background: var(--color-zinc-950);
    --foreground: var(--color-zinc-50);
    --muted: var(--color-zinc-800);
    --muted-foreground: var(--color-zinc-300);
    --popover: var(--color-zinc-950);
    --popover-foreground: var(--color-zinc-50);
    --card: var(--color-zinc-950);
    --card-foreground: var(--color-zinc-50);
    --border: var(--color-zinc-800);
    --input: var(--color-zinc-800);
    --secondary: var(--color-zinc-100);
    --secondary-foreground: black;
    --accent: var(--color-zinc-700);
    --accent-foreground: var(--color-zinc-50);
    --alert: var(--color-red-500);
    --alert-foreground: var(--color-zinc-50);
    --ring: var(--color-zinc-300);
  }

  .base-neutral {
    --background: white;
    --foreground: var(--color-neutral-900);
    --muted: var(--color-neutral-100);
    --muted-foreground: var(--color-neutral-700);
    --popover: white;
    --popover-foreground: var(--color-neutral-900);
    --card: white;
    --card-foreground: var(--color-neutral-900);
    --border: var(--color-neutral-200);
    --input: var(--color-neutral-200);
    --secondary: var(--color-neutral-900);
    --secondary-foreground: white;
    --accent: var(--color-neutral-100);
    --accent-foreground: var(--color-neutral-900);
    --alert: var(--color-red-500);
    --alert-foreground: var(--color-neutral-50);
    --ring: var(--color-neutral-900);
  }
  .dark.base-neutral {
    --background: var(--color-neutral-950);
    --foreground: var(--color-neutral-50);
    --muted: var(--color-neutral-800);
    --muted-foreground: var(--color-neutral-300);
    --popover: var(--color-neutral-950);
    --popover-foreground: var(--color-neutral-50);
    --card: var(--color-neutral-950);
    --card-foreground: var(--color-neutral-50);
    --border: var(--color-neutral-800);
    --input: var(--color-neutral-800);
    --secondary: var(--color-neutral-100);
    --secondary-foreground: black;
    --accent: var(--color-neutral-700);
    --accent-foreground: var(--color-neutral-50);
    --alert: var(--color-red-500);
    --alert-foreground: var(--color-neutral-50);
    --ring: var(--color-neutral-300);
  }

  .base-stone {
    --background: white;
    --foreground: var(--color-stone-900);
    --muted: var(--color-stone-100);
    --muted-foreground: var(--color-stone-700);
    --popover: white;
    --popover-foreground: var(--color-stone-900);
    --card: white;
    --card-foreground: var(--color-stone-900);
    --border: var(--color-stone-200);
    --input: var(--color-stone-200);
    --secondary: var(--color-stone-900);
    --secondary-foreground: white;
    --accent: var(--color-stone-100);
    --accent-foreground: var(--color-stone-900);
    --alert: var(--color-red-500);
    --alert-foreground: var(--color-stone-50);
    --ring: var(--color-stone-900);
  }
  .dark.base-stone {
    --background: var(--color-stone-950);
    --foreground: var(--color-stone-50);
    --muted: var(--color-stone-800);
    --muted-foreground: var(--color-stone-300);
    --popover: var(--color-stone-950);
    --popover-foreground: var(--color-stone-50);
    --card: var(--color-stone-950);
    --card-foreground: var(--color-stone-50);
    --border: var(--color-stone-800);
    --input: var(--color-stone-800);
    --secondary: var(--color-stone-100);
    --secondary-foreground: black;
    --accent: var(--color-stone-700);
    --accent-foreground: var(--color-stone-50);
    --alert: var(--color-red-500);
    --alert-foreground: var(--color-stone-50);
    --ring: var(--color-stone-300);
  }

  .primary-slate-100,
  .dark.primary-slate-900 {
    --primary: var(--color-slate-100);
    --primary-foreground: black;
  }
  .primary-slate-200,
  .dark.primary-slate-800 {
    --primary: var(--color-slate-200);
    --primary-foreground: black;
  }
  .primary-slate-300 {
    --primary: var(--color-slate-300);
    --primary-foreground: black;
  }
  .primary-slate-400 {
    --primary: var(--color-slate-400);
    --primary-foreground: black;
  }
  .primary-slate-500 {
    --primary: var(--color-slate-500);
    --primary-foreground: white;
  }
  .primary-slate-600 {
    --primary: var(--color-slate-600);
    --primary-foreground: white;
  }
  .primary-slate-700 {
    --primary: var(--color-slate-700);
    --primary-foreground: white;
  }
  .primary-slate-800 {
    --primary: var(--color-slate-800);
    --primary-foreground: white;
  }
  .primary-slate-900 {
    --primary: var(--color-slate-900);
    --primary-foreground: white;
  }

  .primary-gray-100,
  .dark.primary-gray-900 {
    --primary: var(--color-gray-100);
    --primary-foreground: black;
  }
  .primary-gray-200,
  .dark.primary-gray-800 {
    --primary: var(--color-gray-200);
    --primary-foreground: black;
  }
  .primary-gray-300 {
    --primary: var(--color-gray-300);
    --primary-foreground: black;
  }
  .primary-gray-400 {
    --primary: var(--color-gray-400);
    --primary-foreground: black;
  }
  .primary-gray-500 {
    --primary: var(--color-gray-500);
    --primary-foreground: white;
  }
  .primary-gray-600 {
    --primary: var(--color-gray-600);
    --primary-foreground: white;
  }
  .primary-gray-700 {
    --primary: var(--color-gray-700);
    --primary-foreground: white;
  }
  .primary-gray-800 {
    --primary: var(--color-gray-800);
    --primary-foreground: white;
  }
  .primary-gray-900 {
    --primary: var(--color-gray-950);
    --primary-foreground: white;
  }

  .primary-zinc-100,
  .dark.primary-zinc-900 {
    --primary: var(--color-zinc-100);
    --primary-foreground: black;
  }
  .primary-zinc-200,
  .dark.primary-zinc-800 {
    --primary: var(--color-zinc-200);
    --primary-foreground: black;
  }
  .primary-zinc-300 {
    --primary: var(--color-zinc-300);
    --primary-foreground: black;
  }
  .primary-zinc-400 {
    --primary: var(--color-zinc-400);
    --primary-foreground: black;
  }
  .primary-zinc-500 {
    --primary: var(--color-zinc-500);
    --primary-foreground: white;
  }
  .primary-zinc-600 {
    --primary: var(--color-zinc-600);
    --primary-foreground: white;
  }
  .primary-zinc-700 {
    --primary: var(--color-zinc-700);
    --primary-foreground: white;
  }
  .primary-zinc-800 {
    --primary: var(--color-zinc-800);
    --primary-foreground: white;
  }
  .primary-zinc-900 {
    --primary: var(--color-zinc-900);
    --primary-foreground: white;
  }

  .primary-neutral-100,
  .dark.primary-neutral-900 {
    --primary: var(--color-neutral-100);
    --primary-foreground: black;
  }
  .primary-neutral-200,
  .dark.primary-neutral-800 {
    --primary: var(--color-neutral-200);
    --primary-foreground: black;
  }
  .primary-neutral-300 {
    --primary: var(--color-neutral-300);
    --primary-foreground: black;
  }
  .primary-neutral-400 {
    --primary: var(--color-neutral-400);
    --primary-foreground: black;
  }
  .primary-neutral-500 {
    --primary: var(--color-neutral-500);
    --primary-foreground: white;
  }
  .primary-neutral-600 {
    --primary: var(--color-neutral-600);
    --primary-foreground: white;
  }
  .primary-neutral-700 {
    --primary: var(--color-neutral-700);
    --primary-foreground: white;
  }
  .primary-neutral-800 {
    --primary: var(--color-neutral-800);
    --primary-foreground: white;
  }
  .primary-neutral-900 {
    --primary: var(--color-neutral-900);
    --primary-foreground: white;
  }

  .primary-stone-100,
  .dark.primary-stone-900 {
    --primary: var(--color-stone-100);
    --primary-foreground: black;
  }
  .primary-stone-200,
  .dark.primary-stone-800 {
    --primary: var(--color-stone-200);
    --primary-foreground: black;
  }
  .primary-stone-300 {
    --primary: var(--color-stone-300);
    --primary-foreground: black;
  }
  .primary-stone-400 {
    --primary: var(--color-stone-400);
    --primary-foreground: black;
  }
  .primary-stone-500 {
    --primary: var(--color-stone-500);
    --primary-foreground: white;
  }
  .primary-stone-600 {
    --primary: var(--color-stone-600);
    --primary-foreground: white;
  }
  .primary-stone-700 {
    --primary: var(--color-stone-700);
    --primary-foreground: white;
  }
  .primary-stone-800 {
    --primary: var(--color-stone-800);
    --primary-foreground: white;
  }
  .primary-stone-900 {
    --primary: var(--color-stone-900);
    --primary-foreground: white;
  }

  .primary-red-100 {
    --primary: var(--color-red-100);
    --primary-foreground: black;
  }
  .primary-red-200 {
    --primary: var(--color-red-200);
    --primary-foreground: black;
  }
  .primary-red-300 {
    --primary: var(--color-red-300);
    --primary-foreground: black;
  }
  .primary-red-400 {
    --primary: var(--color-red-400);
    --primary-foreground: black;
  }
  .primary-red-500 {
    --primary: var(--color-red-500);
    --primary-foreground: white;
  }
  .primary-red-600 {
    --primary: var(--color-red-600);
    --primary-foreground: white;
  }
  .primary-red-700 {
    --primary: var(--color-red-700);
    --primary-foreground: white;
  }
  .primary-red-800 {
    --primary: var(--color-red-800);
    --primary-foreground: white;
  }
  .primary-red-900 {
    --primary: var(--color-red-900);
    --primary-foreground: white;
  }
  /* CSS PARSER: END - DO NOT REMOVE */
}
`;
