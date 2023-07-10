import {
  QwikIntrinsicElements,
  Slot,
  component$,
  useContext,
  useSignal,
  useTask$,
} from '@builder.io/qwik';

import {
  accordionItemContextId,
  accordionRootContextId,
} from './accordion-context-id';

export type AccordionTriggerProps = QwikIntrinsicElements['button'];

export const AccordionTrigger = component$(
  ({ ...props }: AccordionTriggerProps) => {
    const contextService = useContext(accordionRootContextId);
    const ref = useSignal<HTMLElement | undefined>();
    const behavior = contextService.behavior;

    const itemContext = useContext(accordionItemContextId);
    const triggerId = `${itemContext.itemId}-trigger`;

    const selectedTriggerIdSig = contextService.selectedTriggerIdSig;
    const isTriggerExpandedSig = itemContext.isTriggerExpandedSig;

    useTask$(({ track }) => {
      track(() => selectedTriggerIdSig.value);

      if (behavior === 'single' && triggerId !== selectedTriggerIdSig.value) {
        isTriggerExpandedSig.value = false;
      }
    });

    return (
      <button
        ref={ref}
        id={triggerId}
        data-trigger-id={triggerId}
        data-type="trigger"
        disabled={props.disabled}
        onClick$={() => {
          contextService.getSelectedTriggerId$(triggerId);
          isTriggerExpandedSig.value = !isTriggerExpandedSig.value;
        }}
        aria-expanded={isTriggerExpandedSig.value}
        {...props}
      >
        <Slot />
      </button>
    );
  }
);
