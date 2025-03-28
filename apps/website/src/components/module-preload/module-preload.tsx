import { component$, sync$, useOnWindow } from '@builder.io/qwik';

export const ModulePreload = component$(() => {
  useOnWindow(
    'load',
    sync$(async () => {
      // for safari support
      if (!window.requestIdleCallback) {
        window.requestIdleCallback = (
          callback: IdleRequestCallback,
          options?: IdleRequestOptions,
        ): number => {
          const opts = options || {};
          const relaxation = 1;
          const timeout = opts.timeout || relaxation;
          const start = performance.now();
          return setTimeout(() => {
            callback({
              get didTimeout() {
                return opts.timeout
                  ? false
                  : performance.now() - start - relaxation > timeout;
              },
              timeRemaining: () => Math.max(0, relaxation + (performance.now() - start)),
            });
          }, relaxation) as unknown as number;
        };
      }

      const startPreloading = async () => {
        const qChunks = new Set<string>();

        // Check prefetch bundles
        const prefetchScript = document.querySelector(
          'script[q\\:type="prefetch-bundles"]',
        );
        if (prefetchScript?.textContent) {
          const content = prefetchScript.textContent;
          const match = content.match(/\["prefetch","\/build\/","(.*?)"\]/);
          if (match?.[1]) {
            for (const chunk of match[1].split('","')) {
              if (chunk.startsWith('q-')) {
                qChunks.add(chunk);
              }
            }
          }
        }

        // Check qwik/json script
        const qwikJson = document.querySelector('script[type="qwik/json"]');
        if (qwikJson?.textContent) {
          const matches = qwikJson.textContent.match(/q-[A-Za-z0-9_-]+\.js/g);
          if (matches) {
            for (const chunk of matches) {
              qChunks.add(chunk);
            }
          }
        }

        for (const chunk of qChunks) {
          const link = document.createElement('link');
          link.rel = 'modulepreload';
          link.href = `/build/${chunk}`;
          link.fetchPriority = 'low';
          document.head.appendChild(link);
        }
      };

      await requestIdleCallback(await startPreloading);
    }),
  );

  return <></>;
});
