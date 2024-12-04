import { useContext } from '@qwik.dev/core';
import { APP_STATE_CONTEXT_ID } from './app-state-context-id';

export const useAppState = () => {
  const appState = useContext(APP_STATE_CONTEXT_ID);
  return appState;
};
