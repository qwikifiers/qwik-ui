import {
  Slot,
  component$,
  useContextProvider,
  useId,
  useSignal,
  type QwikIntrinsicElements,
} from '@builder.io/qwik';

import { accordionItemContextId } from './accordion-context-id';

import { type AccordionItemContext } from './accordion-context.type';

export type AccordionItemProps = {
  defaultValue?: boolean;
} & QwikIntrinsicElements['div'];

export const AccordionItem = component$(
  ({ defaultValue = false, id, ...props }: AccordionItemProps) => {
    const localId = useId();
    const itemId = id || localId;

    const isTriggerExpandedSig = useSignal<boolean>(defaultValue);

    const itemContext: AccordionItemContext = {
      itemId,
      isTriggerExpandedSig,
      defaultValue,
    };

    useContextProvider(accordionItemContextId, itemContext);

    return (
      <div id={itemId} data-type="item" data-item-id={itemId} {...props}>
        <Slot />
      </div>
    );
  },
);
