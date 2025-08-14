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
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --primary: 191.6 91.4% 36.5%;
    --primary-foreground: 0 0% 100%;
    --secondary: 222.2 47.4% 11.2%;
    --secondary-foreground: 0 0% 100%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --alert: 0 84.2% 60.2%;
    --alert-foreground: 210 40% 98%;
    --ring: 222.2 47.4% 11.2%;
    --border-width: 0px;
    --border-radius: 0;
    --shadow-base: 0 1px 2px 0 rgba(0, 0, 0, 0.01);
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
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --primary: 191.6 91.4% 36.5%;
    --primary-foreground: 0 0% 100%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 0 0% 0%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --alert: 0 84.2% 60.2%;
    --alert-foreground: 210 40% 98%;
    --ring: 212.7 26.8% 83.9;
    --border-width: 0px;
    --border-radius: 0;
    --shadow-base: 0 1px 2px 0 rgba(0, 0, 0, 0.01);
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
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;
    --border: 0 0% 0%;
    --input: 0 0% 0%;
    --primary: 0 72.2% 50.6%;
    --primary-foreground: 0 0% 100%;
    --secondary: 222.2 47.4% 11.2%;
    --secondary-foreground: 0 0% 100%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --alert: 0 84.2% 60.2%;
    --alert-foreground: 210 40% 98%;
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
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --border: 0 0% 0%;
    --input: 0 0% 0%;
    --primary: 0 72.2% 50.6%;
    --primary-foreground: 0 0% 100%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 0 0% 0%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --alert: 0 84.2% 60.2%;
    --alert-foreground: 210 40% 98%;
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
