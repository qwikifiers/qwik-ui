import { component$, useContextProvider, useStore, useStyles$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet } from '@builder.io/qwik-city';

import { APP_STATE_CONTEXT_ID } from './_state/app-state-context-id';
import { AppState } from './_state/app-state.type';
import { RouterHead } from './components/router-head/router-head';
import globalStyles from './global.css?inline';

import { ThemeProvider } from '@qwik-ui/themes';

import {
  ThemeBaseColors,
  ThemeBorderRadiuses,
  ThemeFonts,
  ThemeModes,
  ThemePrimaryColors,
  ThemeStyles,
} from '@qwik-ui/utils';
import { ModulePreload } from './components/module-preload/module-preload';

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */
  useStyles$(globalStyles);

  const appState = useStore<AppState>({
    featureFlags: {
      showStyled: true,
      showNeumorphic: import.meta.env.DEV,
    },
  });

  useContextProvider(APP_STATE_CONTEXT_ID, appState);

  const unregisterPrefetchServiceWorkers = `
;(function () {
  navigator.serviceWorker?.getRegistrations().then((regs) => {
    for (const reg of regs) {
      if (
        reg.active?.scriptURL.includes('service-worker.js') ||
        reg.active?.scriptURL.includes('qwik-prefetch-service-worker.js')
      ) {
        reg.unregister();
      }
    }
  });
})();
`;

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en">
        <script dangerouslySetInnerHTML={unregisterPrefetchServiceWorkers} />
        <ModulePreload />
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          themes={[
            ...Object.values(ThemeFonts),
            ...Object.values(ThemeModes),
            ...Object.values(ThemeStyles),
            ...Object.values(ThemeBaseColors),
            ...Object.values(ThemePrimaryColors),
            ...Object.values(ThemeBorderRadiuses),
          ]}
        >
          <RouterOutlet />
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={`
window.addEventListener('initPagefind', async () => {
  const pagefind = await import("/pagefind/pagefind.js");
  await pagefind.init();
  window.pagefind = pagefind;
});

          document.querySelector('[data-id="search"]')?.addEventListener('input', async (e) => {
            // Preload indexes while user is typing
            window.pagefind.preload(e.target.value);
            
            // Use built-in debounced search
            const search = await window.pagefind.debouncedSearch(e.target.value);
            
            if (search === null) {
              // A more recent search call was made, ignore this one
              return;
            }

            // Load first 5 results with their data
            const results = await Promise.all(
              search.results.slice(0, 5).map(r => r.data())
            );
            
            window.dispatchEvent(new CustomEvent('searchResults', { detail: results }));
          });
          `}
        ></script>
      </body>
    </QwikCityProvider>
  );
});
