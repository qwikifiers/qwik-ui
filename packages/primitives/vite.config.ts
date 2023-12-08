import { qwikVite } from '@builder.io/qwik/optimizer';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { join } from 'path';
import { qwikNxVite } from 'qwik-nx/plugins';

export default defineConfig({
  plugins: [
    qwikNxVite(),
    qwikVite(),
    tsconfigPaths({ root: '../../' }),
    dts({
      tsconfigPath: join(__dirname, 'tsconfig.lib.json'),
    }),
  ],
  mode: 'lib',
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'primitives',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [],
    },
  },
});
