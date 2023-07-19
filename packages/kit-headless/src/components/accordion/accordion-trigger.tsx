import {
  component$,
  Slot,
  useContext,
  useSignal,
  useTask$,
  useVisibleTask$,
  $,
  type QwikIntrinsicElements,
  type QwikKeyboardEvent,
} from '@builder.io/qwik';

import {
  accordionItemContextId,
  accordionRootContextId,
} from './accordion-context-id';

import { KeyCode } from '../../utils/key-code.type';

export const accordionPreventedKeys = [
  KeyCode.Home,
  KeyCode.End,
  KeyCode.PageDown,
  KeyCode.PageUp,
  KeyCode.ArrowDown,
  KeyCode.ArrowUp,
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

    useVisibleTask$(function navigateTriggerVisibleTask({ cleanup }) {
      if (triggerElement && !disabled) {
        triggerStore.push(triggerElement);
      }

      function handler(e: KeyboardEvent) {
        if (accordionPreventedKeys.includes(e.key as KeyCode)) {
          e.preventDefault();
        }
      }

      triggerElement?.addEventListener('keydown', handler);
      cleanup(() => {
        triggerElement?.removeEventListener('keydown', handler);
      });

      if (behavior === 'single' && defaultValue) {
        isTriggerExpandedSig.value = true;
      }
    });

    return (
      <button
        ref={ref}
        id={triggerId}
        data-trigger-id={triggerId}
        disabled={disabled}
        aria-disabled={disabled}
        onClick$={[
          $(() => {
            getSelectedTriggerId$(triggerId);

            collapsible
              ? (isTriggerExpandedSig.value = !isTriggerExpandedSig.value)
              : (isTriggerExpandedSig.value = true);
          }),
          props.onClick$,
        ]}
        tabIndex={disabled ? -1 : 0}
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
