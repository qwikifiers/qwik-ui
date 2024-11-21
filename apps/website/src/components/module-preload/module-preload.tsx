import { component$, sync$, useOnWindow } from '@builder.io/qwik';

export const ModulePreload = component$(() => {
  useOnWindow(
    'load',
    sync$(async () => {
      // for safari support
      if (!window.requestIdleCallback) {
        window.requestIdleCallback = function (
          callback: IdleRequestCallback,
          options?: IdleRequestOptions,
        ): number {
          const opts = options || {};
          const relaxation = 1;
          const timeout = opts.timeout || relaxation;
          const start = performance.now();
          return setTimeout(function () {
            callback({
              get didTimeout() {
                return opts.timeout
                  ? false
                  : performance.now() - start - relaxation > timeout;
              },
              timeRemaining: function () {
                return Math.max(0, relaxation + (performance.now() - start));
              },
            });
          }, relaxation) as unknown as number;
        };
      }

      const startPreloading = async () => {
        const prefetchScript = document.querySelector(
          'script[q\\:type="prefetch-bundles"]',
        );
        if (!prefetchScript?.textContent) return;

        const qChunks = new Set<string>();

        // Check prefetch bundles
        const content = prefetchScript.textContent;
        const match = content.match(/\["prefetch","\/build\/","(.*?)"\]/);
        if (match && match[1]) {
          match[1].split('","').forEach((chunk) => {
            if (chunk.startsWith('q-')) {
              qChunks.add(chunk);
            }
          });
        }

        qChunks.forEach((chunk) => {
          const link = document.createElement('link');
          link.rel = 'modulepreload';
          link.as = 'script';
          link.href = '/' + 'build/' + chunk;
          link.fetchPriority = 'low';
          document.head.appendChild(link);
        });
      };

      await requestIdleCallback(await startPreloading);
    }),
  );

  return <></>;
});
