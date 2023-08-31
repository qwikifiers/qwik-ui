/// <reference types="vitest" />
import { qwikVite } from '@builder.io/qwik/optimizer';
import { macroPlugin } from '@builder.io/vite-plugin-macro';
import { join } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    macroPlugin({
      filter: (ident, id) => {
        return (
          id.includes('/styled-system/') &&
          !id.includes('/jsx') &&
          (id.startsWith('.') || id.startsWith('~'))
        );
      },
    }),
    qwikVite({
      vendorRoots: [join(__dirname, '../kit-headless/src')],
    }),
    tsconfigPaths(),
    dts({
      tsconfigPath: join(__dirname, 'tsconfig.lib.json'),
    }),
  ],
  server: {
    fs: {
      // Allow serving files from the project root
      allow: ['../../'],
    },
  },
  mode: 'lib',
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'fluffy',
      fileName: (format) => `index.qwik.${format === 'es' ? 'mjs' : 'cjs'}`,
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [],
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
      reportsDirectory: '../../coverage/packages/kit-fluffy',
    },
  },
});
