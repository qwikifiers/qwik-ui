import { Component, JSXChildren } from '@builder.io/qwik';
import { HComboboxRootImpl, HComboboxRootImplProps } from './combobox-root';
import { HComboboxItem as InternalComboboxItem } from './combobox-item';
import { HComboboxItemLabel as InternalComboboxItemLabel } from './combobox-item-label';
import { HComboboxEmpty as InternalComboboxEmpty } from './combobox-empty';
import { HComboboxErrorMessage } from './combobox-error-message';
import { findComponent, processChildren } from '../../utils/inline-component';

export type TItemsMap = Map<
  number,
  { value: string; displayValue: string; disabled: boolean }
>;

export type InternalComboboxProps = {
  /** When a value is passed, we check if it's an actual item value, and get its index at pre-render time.
   **/
  initialIndex?: number | null;
  initialValue?: string;

  /** Checks if the consumer added the label in their JSX */
  _label?: boolean;

  /** Our source of truth for the items. We get this at pre-render time in the inline component, that way we do not need to call native methods such as textContent.
   **/
  _itemsMap?: TItemsMap;

  comboboxItemComponent?: typeof InternalComboboxItem;
  comboboxItemLabelComponent?: typeof InternalComboboxItemLabel;
};

/*
  This is an inline component. An example use case of an inline component to get the proper indexes with CSR. See issue #4757
  for more information.
*/
export const HComboboxRoot: Component<InternalComboboxProps & HComboboxRootImplProps> = (
  props: InternalComboboxProps & HComboboxRootImplProps,
) => {
  const {
    children,
    comboboxItemComponent: UserItem,
    comboboxItemLabelComponent: UserItemLabel,
    ...rest
  } = props;

  const HComboboxItem = UserItem ?? InternalComboboxItem;
  const HComboboxItemLabel = UserItemLabel ?? InternalComboboxItemLabel;
  const HComboboxEmpty = InternalComboboxEmpty;

  // source of truth
  const itemsMap = new Map();

  let currItemIndex = 0;
  let initialIndex = null;
  let initialValue;

  let isItemDisabled = false;

  // user adds value prop on Item component
  let givenItemValue: string | null = null;

  let hasEmptyComp = false;
  let hasErrorComp = false;

  findComponent(HComboboxItem, (itemProps) => {
    itemProps._index = currItemIndex;

    isItemDisabled = itemProps.disabled === true;

    if (itemProps.value) {
      givenItemValue = itemProps.value as string;
    }

    // the default case isn't handled here, so we need to process the children to get to the label component
    if (itemProps.children) {
      return processChildren(itemProps.children as JSXChildren);
    }
  });

  findComponent(HComboboxItemLabel, (labelProps) => {
    const displayValue = labelProps.children as string;

    // distinct value, or the display value is the same as the value
    const value = (givenItemValue !== null ? givenItemValue : displayValue) as string;

    itemsMap.set(currItemIndex, { value, displayValue, disabled: isItemDisabled });

    if (props.value && props.multiple) {
      throw new Error(
        `Qwik UI: When in multiple selection mode, the value prop is disabled. Use the bind:value prop's initial signal value instead.`,
      );
    }

    // if the current option value is equal to the initial value
    if (value === props.value) {
      // minus one because it is incremented already in SelectOption
      initialIndex = currItemIndex;
      initialValue = value;
    }

    // increment after processing children
    currItemIndex++;
  });

  findComponent(HComboboxEmpty, () => {
    hasEmptyComp = true;
  });

  findComponent(HComboboxErrorMessage, () => {
    hasErrorComp = true;
  });

  processChildren(children);

  return (
    <HComboboxRootImpl
      {...rest}
      initialIndex={initialIndex}
      initialValue={initialValue}
      _itemsMap={itemsMap}
      hasEmptyComp={hasEmptyComp}
      hasErrorComp={hasErrorComp}
    >
      {children}
    </HComboboxRootImpl>
  );
};
