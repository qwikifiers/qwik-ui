import { defineConfig } from 'cypress';
import { mergeConfig } from 'vite';
import viteConfig from './vite.config';

export default defineConfig({
  component: {
    devServer: {
      bundler: 'vite',
      viteConfig: mergeConfig(viteConfig, { mode: 'test' }),
    } as any,
  },
});
