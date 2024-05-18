import {
  Component,
  JSXNode,
  PropsOf,
  Signal,
  Slot,
  component$,
  useContextProvider,
  useSignal,
} from '@builder.io/qwik';
import { accordionContextId } from './accordion-context';
import { HAccordionItem } from './accordion-item';

export type AccordionRootProps = PropsOf<'div'> & {
  /** If true, multiple items can be open at the same time. */
  multiple?: boolean;

  /** The reactive value controlling which item is open. */
  'bind:value'?: Signal<string | null>;
};

export const HAccordionRoot: Component<AccordionRootProps> = (
  props: AccordionRootProps,
) => {
  const { children: accordionChildren, ...rest } = props;

  let currItemIndex = 0;

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

  return <HAccordionRootImpl {...rest}>{props.children}</HAccordionRootImpl>;
};

export const HAccordionRootImpl = component$((props: AccordionRootProps) => {
  const { multiple, 'bind:value': givenValueSig, ...rest } = props;

  const selectedIndexSig = useSignal<number>(-1);

  const context = {
    selectedIndexSig,
    givenValueSig,
    multiple,
  };

  useContextProvider(accordionContextId, context);

  return (
    <div {...rest} data-accordion>
      <Slot />
    </div>
  );
});
