import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { join } from 'path';

export default defineConfig(() => {
  return {
    plugins: [
      qwikCity(),
      qwikVite({
        vendorRoots: [
          join(__dirname, '../headless/src'),
          join(__dirname, '../material/src'),
          join(__dirname, '../daisy/src'),
        ],
      }),
      tsconfigPaths(),
    ],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
  };
});
