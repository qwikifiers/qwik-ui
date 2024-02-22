import { type Signal } from '@builder.io/qwik';

import { createContextId } from '@builder.io/qwik';

const SelectContextId = createContextId<SelectContext>('Select');

export default SelectContextId;

export type SelectContext = {
  // refs
  triggerRef: Signal<HTMLButtonElement | undefined>;
  popoverRef: Signal<HTMLElement | undefined>;
  listboxRef: Signal<HTMLUListElement | undefined>;
  optionRefsArray: Signal<Array<Signal<HTMLLIElement | undefined>>>;
  selectedOptionRef: Signal<HTMLLIElement | null>;

  // core state
  highlightedIndexSig: Signal<number>;
  isListboxOpenSig: Signal<boolean>;
  selectedIndexSig: Signal<number | null>;
};
