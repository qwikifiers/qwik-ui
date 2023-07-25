import {
  component$,
  Slot,
  useContext,
  useSignal,
  useTask$,
  useVisibleTask$,
  $,
  type QwikIntrinsicElements,
  type QwikKeyboardEvent
} from '@builder.io/qwik';

import { accordionItemContextId, accordionRootContextId } from './accordion-context-id';

import { KeyCode } from '../../utils/key-code.type';

export const accordionPreventedKeys = [
  KeyCode.Home,
  KeyCode.End,
  KeyCode.PageDown,
  KeyCode.PageUp,
  KeyCode.ArrowDown,
  KeyCode.ArrowUp
];

export type AccordionTriggerProps = QwikIntrinsicElements['button'];

export const AccordionTrigger = component$(
  ({ disabled, ...props }: AccordionTriggerProps) => {
    const contextService = useContext(accordionRootContextId);
    const itemContext = useContext(accordionItemContextId);

    const ref = useSignal<HTMLButtonElement>();
    const triggerElement = ref.value;

    const behavior = contextService.behavior;
    const collapsible = contextService.collapsible;
    const defaultValue = itemContext.defaultValue;

    const triggerStore = contextService.triggerStore;
    const triggerId = `${itemContext.itemId}-trigger`;

    /* content panel id for aria-controls */
    const contentId = `${itemContext.itemId}-content`;

    const selectedTriggerIdSig = contextService.selectedTriggerIdSig;
    const currFocusedTriggerIndexSig = contextService.currFocusedTriggerIndexSig;
    const currSelectedTriggerIndexSig = contextService.currSelectedTriggerIndexSig;

    const isTriggerExpandedSig = itemContext.isTriggerExpandedSig;
    const isDefaultValueOpenedSig = itemContext.isDefaultValueOpenedSig;

    const setSelectedTriggerIndexSig$ = $(() => {
      if (behavior === 'single' && triggerElement) {
        currSelectedTriggerIndexSig.value = triggerStore.indexOf(triggerElement);
      }
    });

    /* selectedTriggerIdSig is updated when getSelectedTriggerId$ runs */
    useTask$(function resetTriggersTask({ track }) {
      track(() => selectedTriggerIdSig.value);

      if (behavior === 'single' && triggerId !== selectedTriggerIdSig.value) {
        isTriggerExpandedSig.value = false;
      }
    });

    useTask$(function openDefaultValueTask() {
      if (defaultValue && !isDefaultValueOpenedSig.value) {
        isTriggerExpandedSig.value = true;
        isDefaultValueOpenedSig.value = true;
      }
    });

    useVisibleTask$(function navigateTriggerVisibleTask({ cleanup }) {
      if (triggerElement && !disabled) {
        triggerStore.push(triggerElement);
      }

      function keyHandler(e: KeyboardEvent) {
        if (accordionPreventedKeys.includes(e.key as KeyCode)) {
          e.preventDefault();
        }
      }

      triggerElement?.addEventListener('keydown', keyHandler);
      cleanup(() => {
        triggerElement?.removeEventListener('keydown', keyHandler);
      });
    });

    // cleans up trigger element
    useVisibleTask$(
      function cleanupTriggersTask({ cleanup }) {
        cleanup(() => {
          if (triggerElement) {
            triggerStore.splice(triggerStore.indexOf(triggerElement), 1);
          }
        });
      },
      { strategy: 'document-idle' }
    );

    return (
      <button
        ref={ref}
        id={triggerId}
        data-trigger-id={triggerId}
        disabled={disabled}
        aria-disabled={disabled}
        onClick$={[
          $(() => {
            selectedTriggerIdSig.value = triggerId;

            setSelectedTriggerIndexSig$();

            collapsible
              ? (isTriggerExpandedSig.value = !isTriggerExpandedSig.value)
              : (isTriggerExpandedSig.value = true);
          }),
          props.onClick$
        ]}
        aria-expanded={isTriggerExpandedSig.value}
        aria-controls={contentId}
        onKeyDown$={[
          $(async (e: QwikKeyboardEvent) => {
            if (e.key === 'ArrowUp') {
              await contextService.focusPreviousTrigger$();
            }

            if (e.key === 'ArrowDown') {
              await contextService.focusNextTrigger$();
            }

            if (e.key === 'Home') {
              await contextService.focusFirstTrigger$();
            }

            if (e.key === 'End') {
              await contextService.focusLastTrigger$();
            }
          }),
          props.onKeyDown$
        ]}
        onFocus$={() => {
          if (triggerElement) {
            currFocusedTriggerIndexSig.value = triggerStore.indexOf(triggerElement);
          }
        }}
        {...props}
      >
        <Slot />
      </button>
    );
  }
);
