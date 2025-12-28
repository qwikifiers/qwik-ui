import { createContextId } from '@qwik.dev/core';
import { AppState } from './app-state.type';

export const APP_STATE_CONTEXT_ID = createContextId<AppState>('app-state-context-id');
