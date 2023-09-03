import { Signal } from '@builder.io/qwik';

export type SelectContext = {
  optionsStore: HTMLElement[];
  selectedOptionSig: Signal<string | undefined>;
  isOpenSig: Signal<boolean>;
  triggerRefSig: Signal<HTMLElement | undefined>;
  listBoxRefSig: Signal<HTMLElement | undefined>;
  isListboxHiddenSig: Signal<boolean>;
};
