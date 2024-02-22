import { cloudflarePagesAdapter } from '@builder.io/qwik-city/adapters/cloudflare-pages/vite';
import { extendConfig } from '@builder.io/qwik-city/vite';
import baseConfig from '../../vite.config';

/** 
  @builder.io/qwik & @builder.io/qwik-city 1.4.5 seem to be using vite 5.1.4 as a dep, which causes a build hang, we downgraded, but still an interesting type mismatch because of that here.
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
        // ssg: {
        //   include: ['/*'],
        // }
      }),
    ],
  };
});
