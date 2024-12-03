import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { ThemeBorderRadiuses, ThemePrimaryColors, ThemeStyles } from '@qwik-ui/utils';
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

    expect(updatedTailwindConfigContent).toMatchSnapshot();
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

    expect(updatedTailwindConfigContent).toMatchSnapshot()
  });
  test(`
  GIVEN tailwind config has already a plugins array
  THEN it should add the plugin with the right plugin and import`, async () => {
    const { tree, options } = setupWithProperFiles();
    const tailwindConfig = wrapWithEsm(`plugins: [somePlugin],${tailwindConfigContent}`);
    tree.write('tailwind.config.js', tailwindConfig);

    options.rootCssPath = 'src/global.css';

    await setupTailwindGenerator(tree, options);

    const updatedTailwindConfigContent = tree.read('tailwind.config.js', 'utf-8');

    expect(updatedTailwindConfigContent).toMatchSnapshot()
  });

  test(`
    GIVEN no options are passed
    THEN it should generate "simple" style with primary color "cyan-600", base color "slate" and border-radius 0`, async () => {
    const { tree, options } = setupWithProperFiles();

    options.rootCssPath = 'src/global.css';

    await setupTailwindGenerator(tree, options);

    const updatedGlobalCssContent = tree.read('src/global.css', 'utf-8');

    expect(updatedGlobalCssContent).toMatchSnapshot();

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

    expect(updatedGlobalCssContent).toMatchSnapshot()

  });
});
