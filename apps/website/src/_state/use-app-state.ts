import { useContext, useContextProvider, useStore } from '@builder.io/qwik';
import { APP_STATE_CONTEXT_ID } from './app-state-context-id';
import { AppState } from './app-state.type';

export const useAppStateProvider = () => {
  const appState = useStore<AppState>({
    mode: 'light',
    isSidebarOpened: false,
    featureFlags: {
      showFluffy: import.meta.env.DEV,
    },
  });

  // useTask$(async function createHighlighter() {
  //   const highlighter = await shiki.getHighlighter({ theme: 'css-variables' });
  //   appState.highlighter = highlighter;
  // });

  useContextProvider(APP_STATE_CONTEXT_ID, appState);

  return appState;
};

export const useAppState = () => {
  const appState = useContext(APP_STATE_CONTEXT_ID);
  return appState;
};
