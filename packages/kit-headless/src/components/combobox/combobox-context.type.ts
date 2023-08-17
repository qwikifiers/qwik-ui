import { Signal } from '@builder.io/qwik';

export interface ComboboxContext {
  selectedOptionIndexSig: Signal<number>;
  isListboxOpenSig: Signal<boolean | undefined>;
}
