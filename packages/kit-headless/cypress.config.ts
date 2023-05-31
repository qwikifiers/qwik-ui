import { defineConfig } from 'cypress';
import { initPlugin } from '@frsource/cypress-plugin-visual-regression-diff/plugins';

export default defineConfig({
  component: {
    specPattern: '**/*.spec.{js,jsx,ts,tsx}',
    screenshotOnRunFailure: true,
    video: false,
    devServer: {
      framework: 'cypress-ct-qwik',
      bundler: 'vite',
    } as any,
    setupNodeEvents(on, config) {
      initPlugin(on, config);
    },
  },
});
