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
  },
});
