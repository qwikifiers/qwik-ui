/// <reference types="vitest" />

import { qwikVite } from '@builder.io/qwik/optimizer';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { dirname, join } from 'path';
import { qwikNxVite } from 'qwik-nx/plugins';
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [
    qwikNxVite(),
    qwikVite(),
    tsconfigPaths({ root: '../../' }),
    dts({
      tsconfigPath: join(dirname(fileURLToPath(import.meta.url)), 'tsconfig.lib.json'),
    }),
  ],
  server: {
    fs: {
      // Allow serving files from the project root
      allow: ['../../'],
    },
  },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    target: 'es2020',
    lib: {
      entry: './src/index.ts',
      // Could also be a dictionary or array of multiple entry points.
      name: 'headless',
      fileName: (format) => `index.qwik.${format === 'es' ? 'mjs' : 'cjs'}`,
      // fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: ['@floating-ui/dom', 'country-list-json', 'libphonenumber-js'],
    },
  },
  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      reportsDirectory: '../../coverage/packages/kit-headless',
    },
  },
});
