import { type Signal } from '@builder.io/qwik';

import { createContextId } from '@builder.io/qwik';
import { TItemsMap } from './select-root';

const SelectContextId = createContextId<SelectContext>('Select');

export default SelectContextId;

export type SelectContext = {
  // refs
  triggerRef: Signal<HTMLButtonElement | undefined>;
  popoverRef: Signal<HTMLElement | undefined>;
  listboxRef: Signal<HTMLUListElement | undefined>;
  groupRef: Signal<HTMLDivElement | undefined>;
  labelRef: Signal<HTMLDivElement | undefined>;
  firstEnabledItemRef: Signal<HTMLLIElement | undefined>;

  // core state
  itemsMapSig: Readonly<Signal<TItemsMap>>;
  selectedIndexSetSig: Signal<Set<number>>;
  highlightedIndexSig: Signal<number | null>;
  currDisplayValueSig: Signal<string | string[] | undefined>;
  isListboxOpenSig: Signal<boolean>;
  localId: string;

  // user configurable
  scrollOptions?: ScrollIntoViewOptions;
  loop: boolean;
  multiple: boolean | undefined;

  /**
   * The name of the select element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#name).
   */
  name?: string;

  /**
   * Specifies that the user must select a value before submitting the form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#required).
   */
  required?: boolean;

  /**
   * If `true`, prevents the user from interacting with the select.
   */
  disabled?: boolean;
};

export const groupContextId = createContextId<GroupContext>('Select-Group');

export type GroupContext = {
  groupLabelId: string;
};

export const selectItemContextId = createContextId<SelectItemContext>('Select-Option');

export type SelectItemContext = {
  isSelectedSig: Signal<boolean>;
};
