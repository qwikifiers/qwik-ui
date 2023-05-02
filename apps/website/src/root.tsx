import {
  component$,
  useContextProvider,
  useStore,
  useStyles$,
  useVisibleTask$,
} from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';

import globalStyles from './global.css?inline';
import { APP_STATE_CONTEXT_ID } from './_state/app-state-context-id';
import { AppState } from './_state/app-state.type';
import { THEME_STORAGE_KEY, useCSSTheme } from './_state/use-css-theme';
import { OldAppState } from './types';
import { OLD_APP_STATE_CONTEXT_ID } from './constants';

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */
  useStyles$(globalStyles);

  const appState: AppState = useStore(
    {
      mode: 'light',
    },
    { deep: true }
  );

  useContextProvider(APP_STATE_CONTEXT_ID, appState);

  useVisibleTask$(() => {
    appState.mode =
      localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
  });

  // TODO: remove this old state once refactored
  const state = useStore<OldAppState>({
    darkMode: false,
    theme: 'NOT_DEFINED',
  });
  useContextProvider(OLD_APP_STATE_CONTEXT_ID, state);

  useCSSTheme(appState);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
