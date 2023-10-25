/// <reference types="vitest" />

import { qwikVite } from '@builder.io/qwik/optimizer';
import { dirname, join } from 'path';
import { qwikNxVite } from 'qwik-nx/plugins';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    qwikNxVite(),
    qwikVite(),
    tsconfigPaths({ root: '../../' }),
    dts({
      tsconfigPath: join(dirname(fileURLToPath(import.meta.url)), 'tsconfig.lib.json'),
      entryRoot: 'src',
      afterDiagnostic(ds) {
        // ensure DTS errors are still visible - otherwise get swallowed and silent
        console.log((ds ?? []).map((d) => d.messageText));

        const nonPortableTypeErrors = ds.filter((d) => d.code === 2742);
        if (nonPortableTypeErrors.length > 0) {
          // stop the build for 2742 specifically
          return Promise.reject(nonPortableTypeErrors);
        }

        return;
      },
    }),
    viteStaticCopy({
      targets: [{ src: './README.md', dest: './' }],
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
      fileName: (format, entryName) =>
        `${entryName}.qwik.${format === 'es' ? 'mjs' : 'cjs'}`,
      // fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: ['@floating-ui/dom', 'country-list-json', 'libphonenumber-js'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'packages/kit-headless/src',
      },
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
