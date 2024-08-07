import { createContextId, Signal } from '@builder.io/qwik';

export interface ProgressContext {
  valueSig: Signal<number | null>;
  maxSig: Signal<number>;
  minSig: Signal<number>;
  dataAttributesSig: Signal<Record<string, string | number | undefined>>;
}

export const ProgressContext = createContextId<ProgressContext>('progress');
