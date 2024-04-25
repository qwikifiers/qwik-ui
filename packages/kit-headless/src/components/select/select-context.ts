import { type Signal } from '@builder.io/qwik';

import { createContextId } from '@builder.io/qwik';
import { Opt } from './select-inline';

const SelectContextId = createContextId<SelectContext>('Select');

export default SelectContextId;

export type SelectContext = {
  // refs
  triggerRef: Signal<HTMLButtonElement | undefined>;
  popoverRef: Signal<HTMLElement | undefined>;
  listboxRef: Signal<HTMLUListElement | undefined>;
  groupRef: Signal<HTMLDivElement | undefined>;

  // core state
  localId: string;
  optionsSig: Signal<Opt[]>;
  highlightedIndexSig: Signal<number | null>;
  isListboxOpenSig: Signal<boolean>;
  selectedIndexesSig: Signal<Array<number | null>>;

  // user configurable
  scrollOptions?: ScrollIntoViewOptions;
  loop: boolean;
  multiple: boolean | undefined;
};

export const groupContextId = createContextId<GroupContext>('Select-Group');

export type GroupContext = {
  groupLabelId: string;
};
