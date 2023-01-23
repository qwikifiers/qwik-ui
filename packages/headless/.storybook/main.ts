import { qwikVite } from '@builder.io/qwik/optimizer';
import { rootMain } from '../../../.storybook/main';

import type { StorybookViteConfig } from '@storybook/builder-vite';

import { mergeConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const config: StorybookViteConfig = {
  ...rootMain,
  core: {
    ...rootMain.core,
    builder: '@storybook/builder-vite',
  },
  stories: [
    ...rootMain.stories,
    '../src/lib/**/*.stories.mdx',
    '../src/lib/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [...(rootMain.addons || [])],
  framework: {
    name: 'storybook-framework-qwik',
  },
  viteFinal: async (config: any) => {
    return mergeConfig(config, {
      plugins: [
        viteTsConfigPaths({
          root: '../../../',
        }),
        qwikVite(),
      ],
    });
  },
};

export default config;
