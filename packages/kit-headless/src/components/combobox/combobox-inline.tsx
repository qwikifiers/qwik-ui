import { type JSXNode, Component } from '@builder.io/qwik';
import { HComboboxRootImpl, HComboboxRootImplProps } from './combobox-root';
import { HComboboxItem as InternalComboboxItem } from './combobox-item';
import { HComboboxItemLabel as InternalComboboxItemLabel } from './combobox-item-label';
import { HComboboxEmpty as InternalComboboxEmpty } from './combobox-empty';
import { HComboboxErrorMessage } from './combobox-error-message';

export type TItemsMap = Map<
  number,
  { value: string; displayValue: string; disabled: boolean }
>;

export type InternalComboboxProps = {
  /** When a value is passed, we check if it's an actual item value, and get its index at pre-render time.
   **/
  _valuePropIndex?: number | null;
  _value?: string;

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
    children: myChildren,
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
  let isItemDisabled = false;
  let givenItemValue = null;
  let valuePropIndex = null;
  let _value;
  let hasEmptyComp = false;
  let hasErrorComp = false;

  const childrenToProcess = (
    Array.isArray(myChildren) ? [...myChildren] : [myChildren]
  ) as Array<JSXNode>;

  while (childrenToProcess.length) {
    const child = childrenToProcess.shift();

    if (!child) {
      continue;
    }

    if (Array.isArray(child)) {
      childrenToProcess.unshift(...child);
      continue;
    }

    switch (child.type) {
      case HComboboxItem: {
        // get the index of the current option
        child.props._index = currItemIndex;

        isItemDisabled = child.props.disabled === true;

        if (child.props.value) {
          givenItemValue = child.props.value;
        }

        // the default case isn't handled here, so we need to process the children to get to the label component
        if (child.props.children) {
          const childChildren = Array.isArray(child.props.children)
            ? [...child.props.children]
            : [child.props.children];
          childrenToProcess.unshift(...childChildren);
        }

        break;
      }

      case HComboboxItemLabel: {
        const displayValue = child.props.children as string;

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
          valuePropIndex = currItemIndex;
          _value = value;
        }

        const isString = typeof child.props.children === 'string';

        if (!isString) {
          throw new Error(
            `Qwik UI: select item label passed was not a string. It was a ${typeof child
              .props.children}.`,
          );
        }

        // increment after processing children
        currItemIndex++;

        break;
      }

      case HComboboxEmpty: {
        hasEmptyComp = true;
        break;
      }

      case HComboboxErrorMessage: {
        hasErrorComp = true;
        break;
      }

      default: {
        if (child) {
          const anyChildren = Array.isArray(child.children)
            ? [...child.children]
            : [child.children];
          childrenToProcess.unshift(...(anyChildren as JSXNode[]));
        }

        break;
      }
    }
  }

  return (
    <HComboboxRootImpl
      {...rest}
      _valuePropIndex={valuePropIndex}
      _value={_value}
      _itemsMap={itemsMap}
      hasEmptyComp={hasEmptyComp}
      hasErrorComp={hasErrorComp}
    >
      {props.children}
    </HComboboxRootImpl>
  );
};
