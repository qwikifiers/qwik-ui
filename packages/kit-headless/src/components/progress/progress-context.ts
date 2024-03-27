import { createContextId } from '@builder.io/qwik';

export interface ProgressContext {
  value: number | null;
  max: number;
}

export const ProgressContext = createContextId<ProgressContext>('progress');
