import { defineConfig } from 'cypress';
import { mergeConfig } from 'vite';
import viteConfig from './vite.config';

const cypressConfig = {
  component: {
    devServer: {
      bundler: 'vite',
      viteConfig: mergeConfig(viteConfig, { mode: 'test' }),
    },
  },
};

export default defineConfig(
  cypressConfig as Cypress.ConfigOptions<typeof cypressConfig>
);
