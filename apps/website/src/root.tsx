import {
  component$,
  useContextProvider,
  useStore,
  useStyles$,
  useVisibleTask$
} from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister
} from '@builder.io/qwik-city';
import { RouterHead } from './routes/_components/router-head/router-head';

import { AppState } from './_state/app-state.type';
import { ROOT_STORE_CONTEXT_ID } from './_state/root-store-context-id';
import { THEME_STORAGE_KEY, useCSSTheme } from './_state/use-css-theme';
import { OLD_APP_STATE_CONTEXT_ID } from './constants';
import globalStyles from './global.css?inline';
import { OldAppState } from './types';

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */
  useStyles$(globalStyles);

  const rootStore = useStore<AppState>({
    mode: 'light',
    isSidebarOpened: false,
    featureFlags: {
      showTailwind: import.meta.env.DEV
    }
  });

  useContextProvider(ROOT_STORE_CONTEXT_ID, rootStore);

  useVisibleTask$(() => {
    rootStore.mode =
      localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
  });

  // TODO: remove this old state once refactored
  const state = useStore<OldAppState>({
    darkMode: false
  });
  useContextProvider(OLD_APP_STATE_CONTEXT_ID, state);

  useCSSTheme(rootStore);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body
        lang="en"
        class={{
          'overflow-y-hidden': rootStore.isSidebarOpened
        }}
      >
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
