import {
  component$,
  Slot,
  useContext,
  useSignal,
  useTask$,
  useVisibleTask$,
  $,
  type QwikKeyboardEvent,
  PropsOf,
} from '@builder.io/qwik';

import { accordionItemContextId, accordionRootContextId } from './accordion-context-id';

import { KeyCode } from '../../utils/key-code.type';

const accordionPreventedKeys = [
  KeyCode.Home,
  KeyCode.End,
  KeyCode.PageDown,
  KeyCode.PageUp,
  KeyCode.ArrowDown,
  KeyCode.ArrowUp,
];

export type AccordionTriggerProps = PropsOf<'button'> & {
  disabled?: boolean;
};

export const AccordionTrigger = component$(
  ({ disabled, ...props }: AccordionTriggerProps) => {
    const contextService = useContext(accordionRootContextId);
    const itemContext = useContext(accordionItemContextId);

    const ref = useSignal<HTMLButtonElement>();
    const triggerElement = ref.value;

    const behavior = contextService.behavior;
    const collapsible = contextService.collapsible;
    const defaultValue = itemContext.defaultValue;

    const triggerElementsSig = contextService.triggerElementsSig;
    const triggerId = `${itemContext.itemId}-trigger`;

    const updateTriggers$ = contextService.updateTriggers$;

    /* content panel id for aria-controls */
    const contentId = `${itemContext.itemId}-content`;

    const selectedTriggerIdSig = contextService.selectedTriggerIdSig;
    const isTriggerExpandedSig = itemContext.isTriggerExpandedSig;

    /* The consumer can use these two signals. */
    const currFocusedTriggerIndexSig = contextService.currFocusedTriggerIndexSig;
    const currSelectedTriggerIndexSig = contextService.currSelectedTriggerIndexSig;

    const setSelectedTriggerIndexSig$ = $(() => {
      if (behavior === 'single' && triggerElement) {
        currSelectedTriggerIndexSig.value =
          triggerElementsSig.value.indexOf(triggerElement);
      }
    });

    const setCurrFocusedIndexSig$ = $(() => {
      if (!triggerElement) {
        return;
      }

      currFocusedTriggerIndexSig.value = triggerElementsSig.value.indexOf(triggerElement);
    });

    useTask$(function resetTriggersTask({ track }) {
      track(() => selectedTriggerIdSig.value);

      if (behavior === 'single' && triggerId !== selectedTriggerIdSig.value) {
        isTriggerExpandedSig.value = false;
      }
    });

    useTask$(function openDefaultValueTask() {
      if (defaultValue) {
        isTriggerExpandedSig.value = true;
      }
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(function navigateTriggerVisibleTask({ cleanup }) {
      if (!triggerElement) {
        return;
      }

      /* runs each time a new trigger is added. We need to tell the root it's time to take a role call. */
      if (!disabled) {
        updateTriggers$();
      }

      function keyHandler(e: KeyboardEvent) {
        if (accordionPreventedKeys.includes(e.key as KeyCode)) {
          e.preventDefault();
        }
      }

      triggerElement.addEventListener('keydown', keyHandler);
      cleanup(() => {
        triggerElement?.removeEventListener('keydown', keyHandler);
      });
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(
      function cleanupTriggersTask({ cleanup }) {
        cleanup(() => {
          updateTriggers$();
        });
      },
      { strategy: 'document-ready' },
    );
    return (
      <button
        ref={ref}
        id={triggerId}
        disabled={disabled}
        aria-disabled={disabled}
        data-trigger-id={triggerId}
        data-state={isTriggerExpandedSig.value ? 'open' : 'closed'}
        data-open={isTriggerExpandedSig.value ? '' : undefined}
        data-closed={!isTriggerExpandedSig.value ? '' : undefined}
        onClick$={
          disabled
            ? []
            : [
                $(() => {
                  selectedTriggerIdSig.value = triggerId;

                  setSelectedTriggerIndexSig$();

                  collapsible
                    ? (isTriggerExpandedSig.value = !isTriggerExpandedSig.value)
                    : (isTriggerExpandedSig.value = true);
                }),
                props.onClick$,
              ]
        }
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
          props.onKeyDown$,
        ]}
        onFocus$={[setCurrFocusedIndexSig$, props.onFocus$]}
        {...props}
      >
        <Slot />
      </button>
    );
  },
);
