/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is render outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
import { renderToStream, type RenderToStreamOptions } from '@builder.io/qwik/server';
import { manifest } from '@qwik-client-manifest';
import Root from './root';

// You can pass these as query parameters, as well as `preloadDebug`
const preloaderSettings = [
  'maxPreloads',
  'minProbability',
  'maxSimultaneousPreloads',
  'minPreloadProbability',
] as const;

export default function (opts: RenderToStreamOptions) {
  const { serverData } = opts;
  const urlStr = serverData?.url;
  if (urlStr) {
    const { searchParams } = new URL(urlStr);
    if (searchParams.size) {
      opts = {
        ...opts,
        prefetchStrategy: {
          ...opts.prefetchStrategy,
          implementation: { ...opts.prefetchStrategy?.implementation },
        },
      };
      if (searchParams.has('preloadDebug')) {
        opts.prefetchStrategy!.implementation!.debug = true;
      }
      for (const type of preloaderSettings) {
        if (searchParams.has(type)) {
          opts.prefetchStrategy!.implementation![type] = Number(searchParams.get(type));
        }
      }
    }
  }
  return renderToStream(<Root />, {
    manifest,
    ...opts,
    // Use container attributes to set attributes on the html tag.
    containerAttributes: {
      lang: 'en-us',
      ...opts.containerAttributes,
    },
  });
}
