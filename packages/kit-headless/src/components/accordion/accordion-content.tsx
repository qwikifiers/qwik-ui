import {
  component$,
  useStylesScoped$,
  Slot,
  type QwikIntrinsicElements,
  useContext,
} from '@builder.io/qwik';

import { accordionItemContextId } from './accordion-context-id';

export type ContentProps = QwikIntrinsicElements['div'];

export const AccordionContent = component$(({ ...props }: ContentProps) => {
  const itemContext = useContext(accordionItemContextId);
  const itemId = itemContext.itemId;
  const contentId = `${itemId}-content`;
  const isTriggerExpandedSig = itemContext.isTriggerExpandedSig;

  useStylesScoped$(`
    [data-state="closed"] {
      display: none;
    }

    [data-state="open"] {
      display: revert;
    }
  `);

  return (
    <div
      role="region"
      id={contentId}
      data-content-id={contentId}
      {...props}
      data-state={isTriggerExpandedSig.value ? 'open' : 'closed'}
    >
      <Slot />
    </div>
  );
});
