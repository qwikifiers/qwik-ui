import { Component } from '@qwik.dev/core';
import { type AccordionRootProps, HAccordionRootImpl } from './accordion-root';
import { findComponent, processChildren } from '../../utils/inline-component';
import { HAccordionItem } from './accordion-item';

type InternalProps = {
  accordionItemComponent?: typeof HAccordionItem;
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
  const Item = GivenItem || HAccordionItem;
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
