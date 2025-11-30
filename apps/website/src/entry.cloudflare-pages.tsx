/*
 * WHAT IS THIS FILE?
 *
 * It's the  entry point for cloudflare-pages when building for production.
 *
 * Learn more about the cloudflare integration here:
 * - https://qwik.builder.io/integrations/deployments/cloudflare-pages/
 *
 */
import {
  createQwikRouter,
  type PlatformCloudflarePages,
} from '@qwik.dev/router/middleware/cloudflare-pages';
import qwikRouterConfig from '@qwik-router-config';
import render from './entry.ssr';

declare global {
  type QwikCityPlatform = PlatformCloudflarePages;
}

const fetch = createQwikRouter({ render, qwikRouterConfig });

export { fetch };
