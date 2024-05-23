import { Component, JSXNode, PropsOf, QRL, Signal } from '@builder.io/qwik';
import { HAccordionItem } from './accordion-item';
import { HAccordionRootImpl } from './accordion-root';

export type AccordionRootProps = PropsOf<'div'> & {
  /** If true, multiple items can be open at the same time. */
  multiple?: boolean;

  /** The reactive value controlling which item is open. */
  'bind:value'?: Signal<string | null>;

  /** The initial value of the currently open item. */
  value?: string;

  /** The initial index of the currently open item. */
  initialIndex?: number;

  /** A QRL that is called when the selected item changes. */
  onChange$?: QRL<(value: string) => void>;

  /** A map of the item indexes and their disabled state. */
  itemsMap?: Map<number, boolean>;

  /** If true, the accordion is disabled. */
  disabled?: boolean;
};

export const HAccordionRoot: Component<AccordionRootProps> = (
  props: AccordionRootProps,
) => {
  const { children: accordionChildren, ...rest } = props;

  let currItemIndex = 0;
  let initialIndex = null;
  const itemsMap = new Map();

  const childrenToProcess = (
    Array.isArray(accordionChildren) ? [...accordionChildren] : [accordionChildren]
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
      case HAccordionItem: {
        child.props._index = currItemIndex;
        if (props.value !== undefined && props.value === child.props.value) {
          initialIndex = currItemIndex;
        }
        itemsMap.set(currItemIndex, child.props.disabled === true);

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
