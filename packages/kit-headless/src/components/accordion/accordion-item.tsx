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
      id={itemId}
      data-type="item"
      data-item-id={itemId}
      {...props}
    >
      <Slot />
    </div>
  );
});
