import { QRL, Signal, createContextId } from '@builder.io/qwik';
import { TItemsMap } from './combobox-inline';

export const comboboxContextId = createContextId<ComboboxContext>('qui-combobox');

export type ComboboxContext = {
  isListboxOpenSig: Signal<boolean>;
  inputValueSig: Signal<string>;
  itemsMapSig: Signal<TItemsMap>;
  scrollOptions: ScrollIntoViewOptions;
  localId: string;

  // refs
  triggerRef: Signal<HTMLButtonElement | undefined>;
  inputRef: Signal<HTMLInputElement | undefined>;
  panelRef: Signal<HTMLDivElement | undefined>;
  groupRef: Signal<HTMLDivElement | undefined>;
  labelRef: Signal<HTMLDivElement | undefined>;
  controlRef: Signal<HTMLDivElement | undefined>;
  selectedValueSetSig: Signal<Set<string>>;
  highlightedIndexSig: Signal<number | null>;
  currDisplayValueSig: Signal<string | string[] | undefined>;
  isMouseOverPopupSig: Signal<boolean>;
  disabledIndexSetSig: Signal<Set<number>>;
  removeOnBackspace: boolean;
  hasVisibleItemsSig: Signal<boolean>;
  initialLoadSig: Signal<boolean>;
  _value: string | undefined;

  loop: boolean;
  multiple: boolean | undefined;
  filter?: boolean;
  onInput$?: QRL<(value: string) => void>;
  placeholder?: string;
  name?: string;
  required?: boolean;
  isDisabledSig: Signal<boolean>;
  isInvalidSig: Signal<boolean>;
};

export const groupContextId = createContextId<GroupContext>('qui-combobox-group');

export type GroupContext = {
  groupLabelId: string;
};

export const comboboxItemContextId =
  createContextId<ComboboxItemContext>('qui-combobox-item');

export type ComboboxItemContext = {
  isSelectedSig: Signal<boolean>;
  itemLabelId: string;
  _index: number | undefined;
};
