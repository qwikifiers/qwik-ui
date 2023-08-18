import { Signal } from '@builder.io/qwik';

export interface ComboboxContext {
  selectedOptionIndexSig: Signal<number>;
  isListboxOpenSig: Signal<boolean | undefined>;
  isInputFocusedSig: Signal<boolean | undefined>;
  isTriggerFocusedSig: Signal<boolean | undefined>;
}

export interface ComboboxControlContext {
  inputRef: Signal<HTMLElement | undefined>;
  triggerRef: Signal<HTMLElement | undefined>;
}
