import { Signal, createContextId } from '@builder.io/qwik';
import { TItemsMap } from './combobox-inline';

export const comboboxContextId = createContextId<ComboboxContext>('qui-combobox');

export type ComboboxContext = {
  isListboxOpenSig: Signal<boolean>;
  itemsMapSig: Readonly<Signal<TItemsMap>>;
  scrollOptions: ScrollIntoViewOptions;
  localId: string;

  // refs
  triggerRef: Signal<HTMLButtonElement | undefined>;
  inputRef: Signal<HTMLInputElement | undefined>;
  popoverRef: Signal<HTMLElement | undefined>;
  listboxRef: Signal<HTMLUListElement | undefined>;
  groupRef: Signal<HTMLDivElement | undefined>;
  labelRef: Signal<HTMLDivElement | undefined>;
  selectedIndexSetSig: Signal<Set<number>>;
  highlightedIndexSig: Signal<number | null>;
  currDisplayValueSig: Signal<string | string[] | undefined>;

  loop: boolean;
  multiple: boolean | undefined;
};

// export const groupContextId = createContextId<GroupContext>('Combobox-Group');

// export type GroupContext = {
//   groupLabelId: string;
// };

export const comboboxItemContextId =
  createContextId<ComboboxItemContext>('Combobox-Option');

export type ComboboxItemContext = {
  isSelectedSig: Signal<boolean>;
  itemLabelId: string;
};
