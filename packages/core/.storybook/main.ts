import { qwikVite } from '@builder.io/qwik/optimizer';
import type { StorybookViteConfig } from '@storybook/builder-vite';
import { rootMain } from '../../../.storybook/main';

const config: StorybookViteConfig = {
  ...rootMain,
  stories: [
    ...rootMain.stories,
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [...(rootMain.addons || [])],
  framework: '@storybook/html',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  viteFinal: async (config) => {
    config.plugins?.unshift(qwikVite());
    return config;
  },
};

export default config;
