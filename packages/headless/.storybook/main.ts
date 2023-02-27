import { defineConfig } from '@qwik-ui/storybook';
import { qwikNxVite } from 'qwik-nx/plugins';

export default defineConfig({
  watchMode: 'polling',
  stories: [`../src/**/*.stories.@(js|jsx|ts|tsx)`, `../src/**/*.mdx`],
  plugins: [qwikNxVite()],
  framework: '@storybook/html-vite',
});
