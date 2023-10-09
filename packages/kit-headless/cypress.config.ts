import { initPlugin } from '@frsource/cypress-plugin-visual-regression-diff/plugins';
import { defineConfig } from 'cypress';

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
