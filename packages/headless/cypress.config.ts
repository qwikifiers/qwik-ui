import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    specPattern: '**/*.spec.{js,jsx,ts,tsx}',
    devServer: {
      framework: 'cypress-ct-qwik',
      bundler: 'vite',
    },
  },
});
