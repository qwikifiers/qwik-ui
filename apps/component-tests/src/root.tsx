import {
  component$, useStyles$,
  PrefetchGraph,
  PrefetchServiceWorker
} from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet } from '@builder.io/qwik-city';

import { RouterHead } from './components/router-head/router-head';
import globalStyles from './global.css?inline';

import { ThemeProvider } from '@qwik-ui/themes';

import '@fontsource-variable/inter';
import {
  ThemeBaseColors,
  ThemeBorderRadiuses,
  ThemeFonts,
  ThemeModes,
  ThemePrimaryColors,
  ThemeStyles,
} from '@qwik-ui/utils';

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */
  useStyles$(globalStyles);


  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en">
        <PrefetchGraph />
        <PrefetchServiceWorker />
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
      </body>
    </QwikCityProvider>
  );
});
