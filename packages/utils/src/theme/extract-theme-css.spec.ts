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
      "@layer base {
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
      }"
    `);
  });

  test(`GIVEN primary color is "cyan-600", 
        border-radius is 0,
        base color is "neutral",
        and style is "simple",
        in whatever order,
        THEN generate the right css variables`, () => {
    const output = `
      "@layer base {
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
      }"
    `;

    const themeStringInEveryOrder = generateStringInAllPossibleOrders(
      'simple base-neutral primary-cyan-600 border-radius-0',
    );

    themeStringInEveryOrder.forEach((themeString) => {
      const theme = extractThemeCSS(themeString, exampleRootCssContent);
      expect(theme).toMatchInlineSnapshot(output);
    });
  });
});

test(`GIVEN theme string is 'brutalist base-stone primary-pink-700 border-radius-dot-75'
      THEN generate the right css variables`, () => {
  const inputThemeString = 'brutalist base-stone primary-pink-700 border-radius-dot-75';

  const theme = extractThemeCSS(inputThemeString, exampleRootCssContent);

  expect(theme).toMatchInlineSnapshot(`
    "@layer base {
      :root {
        --background: 0 0% 100%;
        --foreground: 24 9.8% 10%;
        --muted: 60 4.8% 95.9%;
        --muted-foreground: 25 5.3% 44.7%;
        --popover: 0 0% 100%;
        --popover-foreground: 24 9.8% 10%;
        --card: 0 0% 100%;
        --card-foreground: 24 9.8% 10%;
        --border: 0 0% 0%;
        --input: 0 0% 0%;
        --primary: 335.1 77.6% 42%;
        --primary-foreground: 0 0% 100%;
        --secondary: 24 5.7% 82.9%;
        --secondary-foreground: 24 9.8% 10%;
        --accent: 60 4.8% 95.9%;
        --accent-foreground: 24 9.8% 10%;
        --alert: 0 84.2% 60.2%;
        --alert-foreground: 60 9.1% 97.8%;
        --ring: 0 0% 0%;
        --border-width: 2px;
        --border-radius: 0.75rem;
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
        --background: 24 9.8% 10%;
        --foreground: 60 9.1% 97.8%;
        --muted: 12 6.5% 15.1%;
        --muted-foreground: 24 5.4% 63.9%;
        --popover: 24 9.8% 10%;
        --popover-foreground: 60 9.1% 97.8%;
        --card: 24 9.8% 10%;
        --card-foreground: 60 9.1% 97.8%;
        --border: 0 0% 0%;
        --input: 0 0% 0%;
        --primary: 335.1 77.6% 42%;
        --primary-foreground: 0 0% 100%;
        --secondary: 30 6.3% 25.1%;
        --secondary-foreground: 60 9.1% 97.8%;
        --accent: 12 6.5% 15.1%;
        --accent-foreground: 60 9.1% 97.8%;
        --alert: 0 84.2% 60.2%;
        --alert-foreground: 0 0% 98%;
        --ring: 0 0% 0%;
        --border-width: 3px;
        --border-radius: 0.75rem;
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
    }"
  `);
});

test(`GIVEN primary color is "pink-700", 
      border-radius is 0.75,
      base color is "stone",
      and style is "brutalist",
      in whatever order,
      THEN generate the right css variables`, () => {
  const output = `
    "@layer base {
      :root {
        --background: 0 0% 100%;
        --foreground: 24 9.8% 10%;
        --muted: 60 4.8% 95.9%;
        --muted-foreground: 25 5.3% 44.7%;
        --popover: 0 0% 100%;
        --popover-foreground: 24 9.8% 10%;
        --card: 0 0% 100%;
        --card-foreground: 24 9.8% 10%;
        --border: 0 0% 0%;
        --input: 0 0% 0%;
        --primary: 335.1 77.6% 42%;
        --primary-foreground: 0 0% 100%;
        --secondary: 24 5.7% 82.9%;
        --secondary-foreground: 24 9.8% 10%;
        --accent: 60 4.8% 95.9%;
        --accent-foreground: 24 9.8% 10%;
        --alert: 0 84.2% 60.2%;
        --alert-foreground: 60 9.1% 97.8%;
        --ring: 0 0% 0%;
        --border-width: 2px;
        --border-radius: 0.75rem;
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
        --background: 24 9.8% 10%;
        --foreground: 60 9.1% 97.8%;
        --muted: 12 6.5% 15.1%;
        --muted-foreground: 24 5.4% 63.9%;
        --popover: 24 9.8% 10%;
        --popover-foreground: 60 9.1% 97.8%;
        --card: 24 9.8% 10%;
        --card-foreground: 60 9.1% 97.8%;
        --border: 0 0% 0%;
        --input: 0 0% 0%;
        --primary: 335.1 77.6% 42%;
        --primary-foreground: 0 0% 100%;
        --secondary: 30 6.3% 25.1%;
        --secondary-foreground: 60 9.1% 97.8%;
        --accent: 12 6.5% 15.1%;
        --accent-foreground: 60 9.1% 97.8%;
        --alert: 0 84.2% 60.2%;
        --alert-foreground: 0 0% 98%;
        --ring: 0 0% 0%;
        --border-width: 3px;
        --border-radius: 0.75rem;
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
    }"
  `;

  const themeStringInEveryOrder = generateStringInAllPossibleOrders(
    'brutalist base-stone primary-pink-700 border-radius-dot-75',
  );

  themeStringInEveryOrder.forEach((themeString) => {
    const theme = extractThemeCSS(themeString, exampleRootCssContent);
    expect(theme).toMatchInlineSnapshot(output);
  });
});

const exampleRootCssContent = `

@layer base {
  :root {
    --border-width: 0px;
    --shadow-base: 0 1px 2px 0 rgba(0, 0, 0, 0.01);
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 1);
    --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.01);
  }

  /* CSS PARSER: START - DO NOT REMOVE */

  .simple {
    --border-width: 0px;
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

  .brutalist.brutalist {
    --border-width: 2px;
    --border: 0 0% 0%;
    --input: 0 0% 0%;
    --ring: 0 0% 0%;
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

  .dark.brutalist.brutalist {
    --border-width: 3px;
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

  .neumorphic.neumorphic {
    --border-width: 0px;
    --background: 0 0 88%;
    --foreground: 240 5.9% 10%;
    --popover: 0 0 88%;
    --popover-foreground: 240 5.9% 10%;
    --card: 0 0 88%;
    --card-foreground: 240 5.9% 10%;
    --border: 0 0% 80%;
    --ring: 222.2 47.4% 80.2%;
    --shadow-base: -3px -3px 6px #bebebe, 3px 3px 6px #ffffff, inset 1px 1px 2px #bebebe,
      inset -1px -1px 2px rgba(255, 255, 255, 0.5);
    --shadow-sm: 3px 3px 6px #bebebe, -3px -3px 6px #ffffff, inset 1px 1px 2px #bebebe,
      inset -1px -1px 2px rgba(255, 255, 255, 0.5);
    --shadow: 4px 4px 8px #bebebe, -4px -4px 8px #ffffff, inset 1px 1px 2px #bebebe,
      inset -1px -1px 2px rgba(255, 255, 255, 0.5);
    --shadow-md: 5px 5px 10px #bebebe, -5px -5px 10px #ffffff, inset 1px 1px 2px #bebebe,
      inset -1px -1px 2px rgba(255, 255, 255, 0.5);
    --shadow-lg: 6px 6px 12px #bebebe, -6px -6px 12px #ffffff, inset 1px 1px 2px #bebebe,
      inset -1px -1px 2px rgba(255, 255, 255, 0.5);
    --shadow-xl: 8px 8px 15px #bebebe, -8px -8px 15px #ffffff, inset 1px 1px 2px #bebebe,
      inset -1px -1px 2px rgba(255, 255, 255, 0.5);
    --shadow-2xl: 10px 10px 20px #bebebe, -10px -10px 20px #ffffff,
      inset 1px 1px 2px #bebebe, inset -1px -1px 2px rgba(255, 255, 255, 0.5);
    --shadow-inner: inset 4px 4px 8px #bebebe, inset -2px -2px 4px #ffffff;
    --transform-press: scale(0.95);
  }

  .dark.neumorphic.neumorphic {
    --border-width: 0px;
    --background: 240 5.3% 26.1%;
    --foreground: 240 5.9% 90%;
    --popover: 240 5.3% 26.1%;
    --popover-foreground: 240 5.9% 90%;
    --card: 240 5.3% 26.1%;
    --card-foreground: 240 5.9% 90%;
    --border: 240 5.9% 20%;
    --ring: 222.2 47.4% 20.2%;
    --shadow-base: -3px -3px 6px #2c2c31, 3px 3px 6px #52525b, inset 1px 1px 2px #2c2c31,
      inset -1px -1px 2px #52525b;
    --shadow-sm: 3px 3px 6px #2c2c31, -3px -3px 6px #52525b, inset 1px 1px 2px #2c2c31,
      inset -1px -1px 2px #52525b;
    --shadow: 4px 4px 8px #2c2c31, -4px -4px 8px #52525b, inset 1px 1px 2px #2c2c31,
      inset -1px -1px 2px #52525b;
    --shadow-md: 5px 5px 10px #2c2c31, -5px -5px 10px #52525b, inset 1px 1px 2px #2c2c31,
      inset -1px -1px 2px #52525b;
    --shadow-lg: 6px 6px 12px #2c2c31, -6px -6px 12px #52525b, inset 1px 1px 2px #2c2c31,
      inset -1px -1px 2px #52525b;
    --shadow-xl: 8px 8px 15px #2c2c31, -8px -8px 15px #52525b, inset 1px 1px 2px #2c2c31,
      inset -1px -1px 2px #52525b;
    --shadow-2xl: 10px 10px 20px #2c2c31, -10px -10px 20px #52525b,
      inset 1px 1px 2px #2c2c31, inset -1px -1px 2px #52525b;
    --shadow-inner: inset 2px 2px 4px #2c2c31, inset -2px -2px 4px #52525b;
    --transform-press: scale(0.95);
  }

  .border-radius-0 {
    --border-radius: 0;
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

  .base-neutral {
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
    --secondary: 0 0% 83.1%;
    --secondary-foreground: 0 0% 9%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --alert: 0 84.2% 60.2%;
    --alert-foreground: 0 0% 98%;
    --ring: 0 0% 9%;
  }
  .dark.base-neutral {
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
    --secondary: 0 0% 25.1%;
    --secondary-foreground: 0 0% 98%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --alert: 0 84.2% 60.2%;
    --alert-foreground: 0 0% 98%;
    --ring: 0 0% 83.1%;
  }

  .base-stone {
    --background: 0 0% 100%;
    --foreground: 24 9.8% 10%;
    --muted: 60 4.8% 95.9%;
    --muted-foreground: 25 5.3% 44.7%;
    --popover: 0 0% 100%;
    --popover-foreground: 24 9.8% 10%;
    --card: 0 0% 100%;
    --card-foreground: 24 9.8% 10%;
    --border: 20 5.9% 90%;
    --input: 20 5.9% 90%;
    --secondary: 24 5.7% 82.9%;
    --secondary-foreground: 24 9.8% 10%;
    --accent: 60 4.8% 95.9%;
    --accent-foreground: 24 9.8% 10%;
    --alert: 0 84.2% 60.2%;
    --alert-foreground: 60 9.1% 97.8%;
    --ring: 24 9.8% 10%;
  }
  .dark.base-stone {
    --background: 24 9.8% 10%;
    --foreground: 60 9.1% 97.8%;
    --muted: 12 6.5% 15.1%;
    --muted-foreground: 24 5.4% 63.9%;
    --popover: 24 9.8% 10%;
    --popover-foreground: 60 9.1% 97.8%;
    --card: 24 9.8% 10%;
    --card-foreground: 60 9.1% 97.8%;
    --border: 12 6.5% 15.1%;
    --input: 12 6.5% 15.1%;
    --secondary: 30 6.3% 25.1%;
    --secondary-foreground: 60 9.1% 97.8%;
    --accent: 12 6.5% 15.1%;
    --accent-foreground: 60 9.1% 97.8%;
    --alert: 0 84.2% 60.2%;
    --alert-foreground: 0 0% 98%;
    --ring: 24 5.7% 82.9%;
  }

  .primary-cyan-600 {
    --primary: 191.6 91.4% 36.5%;
    --primary-foreground: 0 0% 100%;
  }

  .primary-pink-700 {
    --primary: 335.1 77.6% 42%;
    --primary-foreground: 0 0% 100%;
  }

  /* CSS PARSER: END - DO NOT REMOVE */

}
`;
