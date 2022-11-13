import { qwikVite } from '@builder.io/qwik/optimizer';
import type { StorybookViteConfig } from '@storybook/builder-vite';
import { rootMain } from '../../../.storybook/main';
import { mergeConfig } from 'vite';

const config: StorybookViteConfig = {
  ...rootMain,
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [...(rootMain.addons || [])],
  framework: '@storybook/html',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  viteFinal: async (config, options) => {
    const overridenConfig = mergeConfig(config, {
      build: {
        target: 'es2020',
        lib: {
          entry: './src/index.ts',
          formats: ['es', 'cjs'],
          fileName: (format: string) =>
            `index.qwik.${format === 'es' ? 'mjs' : 'cjs'}`,
        },
        rollupOptions: {
          external: ['@qwik-city-sw-register', '@qwik-city-plan'],
        },
      },
    });
    overridenConfig.plugins?.unshift(qwikVite());
    return overridenConfig;
  },
};

export default config;
