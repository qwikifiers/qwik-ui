import { component$, useContextProvider, useStore, useStyles$ } from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';

import { APP_STATE_CONTEXT_ID } from './_state/app-state-context-id';
import { AppState } from './_state/app-state.type';
import { RouterHead } from './components/router-head/router-head';
import globalStyles from './global.css?inline';

import { ThemeProvider } from 'qwik-themes';
import {
  baseOptions,
  borderRadiusOptions,
  contrastOptions,
  modeOptions,
  primaryOptions,
  styleOptions,
} from './_state/make-it-yours';

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */
  useStyles$(globalStyles);

  const appState = useStore<AppState>({
    isSidebarOpened: false,
    featureFlags: {
      showStyled: import.meta.env.DEV,
    },
  });

  useContextProvider(APP_STATE_CONTEXT_ID, appState);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body
        lang="en"
        class={{
          'overflow-y-hidden': appState.isSidebarOpened,
        }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          themes={[
            ...modeOptions,
            ...styleOptions,
            ...baseOptions,
            ...primaryOptions,
            ...borderRadiusOptions,
            ...contrastOptions,
          ]}
        >
          <RouterOutlet />
        </ThemeProvider>
      </body>
    </QwikCityProvider>
  );
});
