import {
  QwikIntrinsicElements,
  Slot,
  component$,
  useContext,
  useSignal,
  useTask$,
  $,
  useVisibleTask$,
  QwikKeyboardEvent,
} from '@builder.io/qwik';

import {
  accordionItemContextId,
  accordionRootContextId,
} from './accordion-context-id';

export type AccordionTriggerProps = QwikIntrinsicElements['button'];

export const AccordionTrigger = component$(
  ({ ...props }: AccordionTriggerProps) => {
    const contextService = useContext(accordionRootContextId);
    const itemContext = useContext(accordionItemContextId);

    const ref = useSignal<HTMLButtonElement>();
    const behavior = contextService.behavior;
    const collapsible = contextService.collapsible;

    const triggerStore = contextService.triggerStore;
    const triggerId = `${itemContext.itemId}-trigger`;

    /* content panel id for aria-controls */
    const contentId = `${itemContext.itemId}-content`;

    const getSelectedTriggerId$ = contextService.getSelectedTriggerId$;
    const selectedTriggerIdSig = contextService.selectedTriggerIdSig;
    const isTriggerExpandedSig = itemContext.isTriggerExpandedSig;

    /* selectedTriggerIdSig is updated when getSelectedTriggerId$ runs */
    useTask$(function resetTriggersTask({ track }) {
      track(() => selectedTriggerIdSig.value);

      if (behavior === 'single' && triggerId !== selectedTriggerIdSig.value) {
        isTriggerExpandedSig.value = false;
      }
    });

    useVisibleTask$(function navigateTriggerVisibleTask() {
      if (ref.value) {
        triggerStore.push(ref.value);
        console.log(triggerStore);
      }
    });

    return (
      <button
        ref={ref}
        id={triggerId}
        data-trigger-id={triggerId}
        disabled={props.disabled}
        onClick$={[
          $(() => {
            getSelectedTriggerId$(triggerId);

            collapsible
              ? (isTriggerExpandedSig.value = !isTriggerExpandedSig.value)
              : (isTriggerExpandedSig.value = true);
          }),
          props.onClick$,
        ]}
        aria-expanded={isTriggerExpandedSig.value}
        aria-controls={contentId}
        onKeydown$={[
          $((e: QwikKeyboardEvent) => {
            if (e.key === 'ArrowUp') {
              contextService.focusPreviousTrigger$();
            }

            if (e.key === 'ArrowDown') {
              contextService.focusNextTrigger$();
            }

            if (e.key === 'Home') {
              contextService.focusFirstTrigger$();
            }

            if (e.key === 'End') {
              contextService.focusLastTrigger$();
            }
          }),
          props.onKeyDown$,
        ]}
        {...props}
      >
        <Slot />
      </button>
    );
  }
);
