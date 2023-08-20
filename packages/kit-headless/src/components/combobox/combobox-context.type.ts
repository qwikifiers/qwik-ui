import { Signal } from '@builder.io/qwik';

export interface ComboboxContext {
  selectedOptionIndexSig: Signal<number>;
  isListboxOpenSig: Signal<boolean | undefined>;
  isInputFocusedSig: Signal<boolean | undefined>;
  isTriggerFocusedSig: Signal<boolean | undefined>;
  listboxRef: Signal<HTMLUListElement | undefined>;
}

export interface ComboboxControlContext {
  inputRef: Signal<HTMLInputElement | undefined>;
  triggerRef: Signal<HTMLButtonElement | undefined>;
}
