import { createContextId, Signal } from '@builder.io/qwik';

export interface OTPContext {
  value: string;
  activeIndex: number;
  nativeInputRef: Signal<HTMLInputElement | undefined>;
}

export const OTPContextId = createContextId<OTPContext>('OTPContext');
