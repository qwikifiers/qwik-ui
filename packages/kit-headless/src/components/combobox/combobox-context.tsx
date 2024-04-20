import { Signal, createContextId } from '@builder.io/qwik';

export interface ComboboxContext {
  // refs
  rootRef: Signal<HTMLElement | undefined>;
  inputRef: Signal<HTMLInputElement | undefined>;
  triggerRef: Signal<HTMLButtonElement | undefined>;
  popoverRef: Signal<HTMLElement | undefined>;

  // core state
  isListboxOpenSig: Signal<boolean | undefined>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const comboboxContextId = createContextId<ComboboxContext>('qui-combobox');

export default comboboxContextId;
