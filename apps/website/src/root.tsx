import { component$, useContextProvider, useStore, useStyles$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet } from '@builder.io/qwik-city';
import { PrefetchServiceWorker, PrefetchGraph } from '@builder.io/qwik';

import { APP_STATE_CONTEXT_ID } from './_state/app-state-context-id';
import { AppState } from './_state/app-state.type';
import { RouterHead } from './components/router-head/router-head';
import globalStyles from './global.css?inline';

import { ThemeProvider } from 'qwik-themes';

import '@fontsource-variable/inter';
import {
  ThemeBaseColor,
  ThemeBorderRadius,
  ThemeFont,
  ThemeMode,
  ThemePrimaryColor,
  ThemeStyle,
} from '@qwik-ui/utils';

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

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <PrefetchGraph />
        <PrefetchServiceWorker />
      </head>
      <body lang="en">
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          themes={[
            ...Object.values(ThemeFont),
            ...Object.values(ThemeMode),
            ...Object.values(ThemeStyle),
            ...Object.values(ThemeBaseColor),
            ...Object.values(ThemePrimaryColor),
            ...Object.values(ThemeBorderRadius),
          ]}
        >
          <RouterOutlet />
        </ThemeProvider>
      </body>
    </QwikCityProvider>
  );
});
