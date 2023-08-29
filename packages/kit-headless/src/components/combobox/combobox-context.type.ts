import { JSXNode, QRL, Signal } from '@builder.io/qwik';

export interface ComboboxContext {
  // user's source of truth
  options: Signal<Array<string | Record<string, any>>>;
  optionComponent$?: QRL<(option: any, index: number) => JSXNode>;

  // element state
  localId: string;
  labelRef: Signal<HTMLLabelElement | undefined>;
  listboxRef: Signal<HTMLUListElement | undefined>;
  inputRef: Signal<HTMLInputElement | undefined>;
  triggerRef: Signal<HTMLButtonElement | undefined>;
  optionIds: Signal<string[]>;

  //uncontrolled state
  defaultLabel?: string;

  // internal state
  isInputFocusedSig: Signal<boolean | undefined>;
  isTriggerFocusedSig: Signal<boolean | undefined>;
  isListboxOpenSig: Signal<boolean | undefined>;
  highlightedIndexSig: Signal<number>;
  selectedOptionIndexSig: Signal<number>;

  // option settings
  onInputChange$?: QRL<(value: string) => void>;
  optionValueKey?: string;
  optionLabelKey?: string;
  optionDisabledKey?: string;
}

// Whether it is a string or an object we want to be able to access the value
export type Option = ComboboxContext['options']['value'][number];
