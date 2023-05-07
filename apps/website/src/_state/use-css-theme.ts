import { useTask$ } from '@builder.io/qwik';
import { isBrowser } from '@builder.io/qwik/build';
import { AppState } from './app-state.type';

export const THEME_STORAGE_KEY = 'theme-preference';

export const useCSSTheme = (appState: AppState) => {
  useTask$(({ track }) => {
    track(() => appState.mode);

    if (isBrowser) {
      document.documentElement.setAttribute('class', appState.mode);
      localStorage.setItem(THEME_STORAGE_KEY, appState.mode);
    }
  });
};
