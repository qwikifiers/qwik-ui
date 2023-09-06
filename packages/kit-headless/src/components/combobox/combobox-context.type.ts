import type { Signal } from '@builder.io/qwik';
import type { ResolvedOption } from './combobox';

export interface ComboboxContext<O extends Option = Option> {
  // user's source of truth
  filteredOptionsSig: Signal<ResolvedOption<O>[]>;

  // element state
  inputValueSig: Signal<string>;
  localId: string;
  labelRef: Signal<HTMLLabelElement | undefined>;
  listboxRef: Signal<HTMLUListElement | undefined>;
  inputRef: Signal<HTMLInputElement | undefined>;
  triggerRef: Signal<HTMLButtonElement | undefined>;

  //uncontrolled state
  defaultLabel?: string;

  // internal state
  isInputFocusedSig: Signal<boolean | undefined>;
  isListboxOpenSig: Signal<boolean | undefined>;
  highlightedIndexSig: Signal<number>;
  selectedOptionIndexSig: Signal<number>;

  // option settings
  optionValueKey: string;
  optionLabelKey: string;
  optionDisabledKey: string;
}

// Whether it is a string or an object we want to be able to access the value
export type Option = string | Record<string, unknown>;
