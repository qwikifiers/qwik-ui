import { qwikVite } from '@builder.io/qwik/optimizer';
import { resolve } from 'path';
import { StorybookConfig } from 'storybook-framework-qwik';
// import { rootMain } from '../../../.storybook/main';

import { mergeConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  // ...rootMain,

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
  ],
  // addons: ['@storybook/addon-essentials', ...(rootMain.addons || [])],

  framework: {
    name: 'storybook-framework-qwik',
  },
  core: {
    // ...rootMain.core,
    renderer: 'storybook-framework-qwik',
  },
  stories: [
    // ...rootMain.stories,
    '../src/components/**/*.stories.mdx',
    '../src/components/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  viteFinal: async (config: any) => {
    return mergeConfig(config, {
      plugins: [
        qwikVite({
          vendorRoots: [__dirname],
          srcDir: resolve(__dirname, '../src'),
        }),
        viteTsConfigPaths(),
      ],
    });
  },
};

export default config;
