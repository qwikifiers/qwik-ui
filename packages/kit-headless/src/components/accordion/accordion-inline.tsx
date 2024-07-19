import { Component } from '@builder.io/qwik';
import { type AccordionRootProps, HAccordionRootImpl } from './accordion-root';
import { Accordion } from '@qwik-ui/headless';
import { findComponent, processChildren } from '../../utils/inline-component';

type InternalProps = {
  accordionItemComponent?: typeof Accordion.Item;
};

export const HAccordionRoot: Component<AccordionRootProps & InternalProps> = (
  props: AccordionRootProps & InternalProps,
) => {
  const {
    children,
    accordionItemComponent: GivenItem,
    value: initialValue,
    ...rest
  } = props;
  const Item = GivenItem || Accordion.Item;
  let currItemIndex = 0;
  let initialIndex = null;
  const itemsMap = new Map();

  // code executes when the item component's shell is "seen"
  findComponent(Item, (itemProps) => {
    itemProps._index = currItemIndex;

    itemsMap.set(currItemIndex, itemProps.disabled);

    if (initialValue && initialValue === itemProps.value) {
      initialIndex = currItemIndex;
    }

    currItemIndex++;
  });

  processChildren(children);

  return (
    <HAccordionRootImpl
      initialIndex={initialIndex ?? undefined}
      itemsMap={itemsMap}
      {...rest}
    >
      {props.children}
    </HAccordionRootImpl>
  );
};
