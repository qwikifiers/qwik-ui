import { type Signal } from '@builder.io/qwik';
import { TItemsMap } from './select-root';
declare const SelectContextId: import('@builder.io/qwik').ContextId<SelectContext>;
export default SelectContextId;
export type SelectContext = {
  triggerRef: Signal<HTMLButtonElement | undefined>;
  popoverRef: Signal<HTMLElement | undefined>;
  listboxRef: Signal<HTMLUListElement | undefined>;
  groupRef: Signal<HTMLDivElement | undefined>;
  labelRef: Signal<HTMLDivElement | undefined>;
  highlightedItemRef: Signal<HTMLLIElement | undefined>;
  itemsMapSig: Readonly<Signal<TItemsMap>>;
  selectedIndexSetSig: Signal<Set<number>>;
  highlightedIndexSig: Signal<number | null>;
  currDisplayValueSig: Signal<string | string[] | undefined>;
  isListboxOpenSig: Signal<boolean>;
  isDisabledSig: Signal<boolean>;
  localId: string;
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
  isInvalidSig?: Signal<boolean>;
};
export declare const groupContextId: import('@builder.io/qwik').ContextId<GroupContext>;
export type GroupContext = {
  groupLabelId: string;
};
export declare const selectItemContextId: import('@builder.io/qwik').ContextId<SelectItemContext>;
export type SelectItemContext = {
  isSelectedSig: Signal<boolean>;
};
