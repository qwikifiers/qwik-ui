import { Signal, QRL } from '@builder.io/qwik';

export interface AutocompleteContext {
  optionsStore: Signal<HTMLElement | undefined>[];
  filteredOptionsStore: Signal<HTMLElement | undefined>[];
  selectedOptionSig: Signal<string>;
  isTriggerExpandedSig: Signal<boolean>;
  inputRefSig: Signal<HTMLElement | undefined>;
  triggerRefSig: Signal<HTMLElement | undefined>;
  listBoxRefSig: Signal<HTMLElement | undefined>;
  labelRef: Signal<HTMLElement | undefined>;
  listBoxId: string;
  inputId: string;
  triggerId: string;
  activeOptionId: Signal<string | null>;
  inputValueSig: Signal<string>;
  focusInput$: QRL<(inputId: string) => void>;
  isInputFocusedSig: Signal<boolean>;
  dataHolder: Signal<
    Array<{ value: string; id: string; ref: Signal<HTMLElement | undefined> }>
  >;
}
