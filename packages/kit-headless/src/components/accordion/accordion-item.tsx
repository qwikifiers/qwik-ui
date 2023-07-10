import {
  QwikIntrinsicElements,
  component$,
  useSignal,
  Slot,
  useId,
  useContextProvider,
} from '@builder.io/qwik';

import { accordionItemContextId } from './accordion-context-id';

import { type AccordionItemContext } from './accordion-context.type';

export type AccordionItemProps = QwikIntrinsicElements['div'];

export const AccordionItem = component$(({ ...props }: AccordionItemProps) => {
  const itemId = useId();
  const itemRef = useSignal<HTMLElement>();
  const isTriggerExpandedSig = useSignal<boolean>(false);

  const itemContext: AccordionItemContext = {
    itemId,
    isTriggerExpandedSig,
  };

  useContextProvider(accordionItemContextId, itemContext);

  return (
    <div
      ref={itemRef}
      data-type="item"
      id={itemId}
      data-item-id={itemId}
      {...props}
    >
      <Slot />
    </div>
  );
});
