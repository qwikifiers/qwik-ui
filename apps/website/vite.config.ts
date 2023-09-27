import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikNxVite } from 'qwik-nx/plugins';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import inspect from 'vite-plugin-inspect';
export default defineConfig({
  plugins: [
    qwikNxVite(),
    qwikCity(),
    qwikVite({
      client: {
        outDir: '../../dist/apps/website/client',
      },
      ssr: {
        outDir: '../../dist/apps/website/server',
      },
    }),
    tsconfigPaths({ root: '../../' }),
    inspect(),
  ],
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
  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
