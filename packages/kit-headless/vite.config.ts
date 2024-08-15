/// <reference types="vitest" />
import { qwikVite } from '@builder.io/qwik/optimizer';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsconfigPaths from 'vite-tsconfig-paths';
import pkg from './package.json';

const { dependencies = {}, peerDependencies = {} } = pkg as any;
const makeRegex = (dep: any) => new RegExp(`^${dep}(/.*)?$`);
const excludeAll = (obj: any) => Object.keys(obj).map(makeRegex);

export default defineConfig({
  plugins: [
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
    target: 'es2022',
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
      external: [
        /^node:.*/,
        ...excludeAll(dependencies),
        ...excludeAll(peerDependencies),
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'packages/kit-headless/src',
      },
    },
  },
});
