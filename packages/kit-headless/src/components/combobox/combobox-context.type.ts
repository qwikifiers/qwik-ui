import { JSXNode, QRL, Signal } from '@builder.io/qwik';

export interface ComboboxContext {
  selectedOptionIndexSig: Signal<number>;
  isListboxOpenSig: Signal<boolean | undefined>;
  isInputFocusedSig: Signal<boolean | undefined>;
  isTriggerFocusedSig: Signal<boolean | undefined>;
  listboxRef: Signal<HTMLUListElement | undefined>;
  inputRef: Signal<HTMLInputElement | undefined>;
  triggerRef: Signal<HTMLButtonElement | undefined>;
  optionComponent$?: QRL<(option: any, index: number) => JSXNode>;
  onInputChange$?: QRL<(value: string) => void>;
  optionValueKey?: string;
  optionLabelKey?: string;
  optionDisabledKey?: string;
  options: Signal<Array<string | Record<string, any>>>;
  highlightedIndexSig: Signal<number>;
}

// Whether it is a string or an object we want to be able to access the value
export type Option = ComboboxContext['options']['value'][number];
