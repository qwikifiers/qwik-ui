import { cloudflarePagesAdapter } from '@builder.io/qwik-city/adapters/cloudflare-pages/vite';
import { extendConfig } from '@builder.io/qwik-city/vite';
import baseConfig from '../../vite.config';

/** 
  Vite 5.1.6 breaks the cloudflare build when deploying. 
  This is a workaround until the issue is fixed.
*/
// @ts-expect-error
export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ['apps/website/src/entry.cloudflare-pages.tsx', '@qwik-city-plan'],
      },
    },
    plugins: [
      cloudflarePagesAdapter({
        ssg: {
          include: ['/*'],
        },
      }),
    ],
  };
});
