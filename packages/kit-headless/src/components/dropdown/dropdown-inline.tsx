import { type JSXNode, Component } from '@builder.io/qwik';
import { HDropdownImpl, type DropdownProps } from './dropdown-root';
import { HDropdownItem as InternalDropdownItem } from './dropdown-item';
import { HDropdownRadioItem as InternalDropdownRadioItem } from './dropdown-radio-item';
import { HDropdownCheckboxItem as InternalDropdownCheckboxItem } from './dropdown-checkbox-item';

type InlineCompProps = {
  dropdownRadioItemComponent?: typeof InternalDropdownRadioItem;
  dropdownItemComponent?: typeof InternalDropdownItem;
  dropdownCheckboxItemComponent?: typeof InternalDropdownCheckboxItem;
};

/*
  This is an inline component. An example use case of an inline component to get the proper indexes with CSR. See issue #4757
  for more information.
*/
export const HDropdownRoot: Component<DropdownProps & InlineCompProps> = (
  props: DropdownProps & InlineCompProps,
) => {
  const {
    children: myChildren,
    dropdownRadioItemComponent: UserRadioItem,
    dropdownItemComponent: UserItem,
    dropdownCheckboxItemComponent: UserCheckboxItem,
    ...rest
  } = props;

  /**
   * When creating reusable component pieces, DropdownRoot needs to know the existence of these components. See the styled tabs for as an example.
   **/
  const DropdownRadioItem = UserRadioItem ?? InternalDropdownRadioItem;
  const DropdownItem = UserItem ?? InternalDropdownItem;
  const DropdownCheckboxItem = UserCheckboxItem ?? InternalDropdownCheckboxItem;

  // source of truth
  const itemsMap = new Map();
  let currItemIndex = 0;
  let isItemDisabled = false;

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
      case DropdownRadioItem:
      case DropdownCheckboxItem:
      case DropdownItem: {
        // get the index of the current option
        child.props._index = currItemIndex;

        isItemDisabled = child.props.disabled === true;

        // add the item to the map
        itemsMap.set(currItemIndex, {
          value: child.props.value,
          disabled: isItemDisabled,
        });

        // increment after processing children
        currItemIndex++;

        // the default case isn't handled here, so we need to process the children to get to the label component
        if (child.props.children) {
          const childChildren = Array.isArray(child.props.children)
            ? [...child.props.children]
            : [child.props.children];
          childrenToProcess.unshift(...childChildren);
        }

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
    <HDropdownImpl {...rest} _itemsMap={itemsMap}>
      {props.children}
    </HDropdownImpl>
  );
};
