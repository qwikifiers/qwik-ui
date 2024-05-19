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

  /** The initial value of the currently open item. */
  value?: string;

  /** The initial index of the currently open item. */
  initialIndexValue?: number;
};

export const HAccordionRoot: Component<AccordionRootProps> = (
  props: AccordionRootProps,
) => {
  const { children: accordionChildren, ...rest } = props;

  let currItemIndex = 0;
  let initialIndexValue = null;

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
          initialIndexValue = currItemIndex;
        }

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
    <HAccordionRootImpl initialIndexValue={initialIndexValue ?? undefined} {...rest}>
      {props.children}
    </HAccordionRootImpl>
  );
};

export const HAccordionRootImpl = component$((props: AccordionRootProps) => {
  const { multiple, 'bind:value': givenValueSig, initialIndexValue, ...rest } = props;

  const selectedIndexSig = useSignal<number>(initialIndexValue ?? -1);

  const context = {
    selectedIndexSig,
    givenValueSig,
    multiple,
    initialIndexValue,
  };

  useContextProvider(accordionContextId, context);

  return (
    <div {...rest} data-accordion>
      <Slot />
    </div>
  );
});
