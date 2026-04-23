import { qwikVite } from '@qwik.dev/core/optimizer';
import { qwikRouter } from '@qwik.dev/router/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const qwikLibs = ['@qwikest/icons'];
export default defineConfig({
  root: 'apps/component-tests',
  cacheDir: '../../node_modules/.vite/apps/component-tests',
  plugins: [
    qwikRouter(),
    qwikVite({
      client: {
        outDir: '../../dist/apps/component-tests/client',
      },
      ssr: {
        outDir: '../../dist/apps/component-tests/server',
      },
      tsconfigFileNames: ['tsconfig.app.json'],
    }),
    tsconfigPaths({ root: '../../' }),
  ],

  optimizeDeps: {
    exclude: [...qwikLibs],
  },
  ssr: {
    noExternal: [...qwikLibs],
  },
  server: {
    fs: {
      // Allow serving files from the project root
      allow: ['../../'],
    },
  },
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=600',
    },
  },
});
