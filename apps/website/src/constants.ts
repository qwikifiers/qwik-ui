import { createContextId } from '@builder.io/qwik';
import { OldAppState } from './types';

export const OLD_APP_STATE_CONTEXT_ID =
  createContextId<OldAppState>('app_state');
