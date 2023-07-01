import { Signal, QRL } from '@builder.io/qwik';

export interface AutocompleteContext {
  options: Signal<HTMLElement | undefined>[];
  filteredOptions: Signal<HTMLElement | undefined>[];
  selectedOption: Signal<string>;
  isExpanded: Signal<boolean>;
  triggerRef: Signal<HTMLElement | undefined>;
  listBoxRef: Signal<HTMLElement | undefined>;
  labelRef: Signal<HTMLElement | undefined>;
  listBoxId: string;
  inputId: string;
  buttonId: string;
  activeOptionId: Signal<string | null>;
  inputValue: Signal<string>;
  focusInput$: QRL<(inputId: string) => void>;
}
