import { Signal } from '@builder.io/qwik';

export type SelectContext = {
  optionsStore: HTMLElement[];
  selectedOptionSig: Signal<string | undefined>;
  isOpenSig: Signal<boolean>;
  triggerRef: Signal<HTMLElement | undefined>;
  listboxRef: Signal<HTMLElement | undefined>;
  isListboxHiddenSig: Signal<boolean>;
};
