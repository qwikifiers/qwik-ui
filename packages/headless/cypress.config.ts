import { defineConfig } from 'cypress';
import { mergeConfig } from 'vite';
import viteConfig from './vite.config';

const cypressConfig = {
  component: {
    specPattern: '**/*.spec.{js,jsx,ts,tsx}',
    devServer: {
      bundler: 'vite',
      viteConfig,
    },
  },
};

export default defineConfig(
  cypressConfig as Cypress.ConfigOptions<typeof cypressConfig>
);
