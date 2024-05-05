import { type JSXNode, Component } from '@builder.io/qwik';
import { SelectImpl, type SelectProps } from './select-root';
import { SelectItem as InternalSelectItem } from './select-item';
import { SelectLabel as InternalSelectLabel } from './select-label';
import { SelectItemLabel as InternalSelectItemLabel } from './select-item-label';

type InlineCompProps = {
  selectLabelComponent?: typeof InternalSelectLabel;
  selectItemComponent?: typeof InternalSelectItem;
  selectItemLabelComponent?: typeof InternalSelectItemLabel;
};

/*
    This is an inline component. An example use case of an inline component to get the proper indexes with CSR. See issue #4757 
    for more information.
*/
export const SelectRoot: Component<SelectProps & InlineCompProps> = (
  props: SelectProps & InlineCompProps,
) => {
  const {
    children: myChildren,
    selectLabelComponent: UserLabel,
    selectItemComponent: UserItem,
    selectItemLabelComponent: UserItemLabel,
    ...rest
  } = props;

  /**
   * When creating reusable component pieces, SelectRoot needs to know the    existence of these components. See the styled tabs for as an example.
   **/
  const SelectLabel = UserLabel ?? InternalSelectLabel;
  const SelectItem = UserItem ?? InternalSelectItem;
  const SelectItemLabel = UserItemLabel ?? InternalSelectItemLabel;

  // source of truth
  const itemsMap = new Map();
  let currItemIndex = 0;
  let isItemDisabled = false;
  let givenItemValue = null;

  let valuePropIndex = null;
  let isLabelNeeded = false;

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
      case SelectLabel: {
        isLabelNeeded = true;
        break;
      }

      case SelectItem: {
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

      case SelectItemLabel: {
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

  // console warning if a consumer's passed in value does not match an option
  let valueMatch = false;
  if (props.value !== undefined) {
    for (const item of itemsMap.values()) {
      if (!props.value.includes(item.value)) {
        valueMatch = false;
      }
    }

    if (!valueMatch) {
      throw new Error(
        `Qwik UI: a provided option value "${props.value}" does not match any of the option values in the Select.`,
      );
    }
  }

  return (
    <SelectImpl
      {...rest}
      _label={isLabelNeeded}
      _valuePropIndex={valuePropIndex}
      _itemsMap={itemsMap}
    >
      {props.children}
    </SelectImpl>
  );
};
