import {
  $,
  component$,
  Slot,
  useContextProvider,
  useSignal,
  useTask$,
  type QwikIntrinsicElements,
  type PropFunction,
  useVisibleTask$,
} from '@builder.io/qwik';

import { type AccordionRootContext } from './accordion-context.type';
import { accordionRootContextId } from './accordion-context-id';

export type AccordionRootProps = {
  behavior?: 'single' | 'multi';
  animated?: boolean;
  enhance?: boolean;
  collapsible?: boolean;
  onSelectedIndexChange$?: PropFunction<(index: number) => void>;
  onFocusIndexChange$?: PropFunction<(index: number) => void>;
} & QwikIntrinsicElements['div'];

export const AccordionRoot = component$(
  ({
    collapsible = true,
    behavior = 'single',
    animated = false,
    onSelectedIndexChange$,
    onFocusIndexChange$,
    ...props
  }: AccordionRootProps) => {
    const rootRef = useSignal<HTMLDivElement | undefined>();
    const rootElement = rootRef.value;
    const currFocusedTriggerIndexSig = useSignal<number>(-1);
    const currSelectedTriggerIndexSig = useSignal<number>(-1);
    const selectedTriggerIdSig = useSignal<string>('');
    const triggerElementsSig = useSignal<HTMLButtonElement[]>([]);

    useTask$(({ track }) => {
      track(() => currSelectedTriggerIndexSig.value);
      if (onSelectedIndexChange$) {
        onSelectedIndexChange$(currSelectedTriggerIndexSig.value);
      }
    });

    useTask$(({ track }) => {
      track(() => currFocusedTriggerIndexSig.value);
      if (onFocusIndexChange$) {
        onFocusIndexChange$(currFocusedTriggerIndexSig.value);
      }
    });

    const updateTriggers$ = $(() => {
      if (!rootElement) {
        return;
      }

      // needs to grab a new array when adding or removing elements dynamically.
      const getLatestTriggers = Array.from(
        rootElement.querySelectorAll('[data-trigger-id]'),
      ) as HTMLButtonElement[];

      triggerElementsSig.value = getLatestTriggers.filter((element) => {
        if (element.getAttribute('aria-disabled') === 'true') {
          return false;
        }

        return true;
      });
    });

    const focusPreviousTrigger$ = $(() => {
      if (currFocusedTriggerIndexSig.value === 0) {
        currFocusedTriggerIndexSig.value = triggerElementsSig.value.length - 1;
        return triggerElementsSig.value[triggerElementsSig.value.length - 1].focus();
      }

      currFocusedTriggerIndexSig.value--;

      return triggerElementsSig.value[currFocusedTriggerIndexSig.value].focus();
    });

    const focusNextTrigger$ = $(() => {
      if (currFocusedTriggerIndexSig.value === triggerElementsSig.value.length - 1) {
        currFocusedTriggerIndexSig.value = 0;
        return triggerElementsSig.value[0].focus();
      }

      currFocusedTriggerIndexSig.value++;

      return triggerElementsSig.value[currFocusedTriggerIndexSig.value].focus();
    });

    const focusFirstTrigger$ = $(() => {
      return triggerElementsSig.value[0].focus();
    });

    const focusLastTrigger$ = $(() => {
      return triggerElementsSig.value[triggerElementsSig.value.length - 1].focus();
    });

    // takes a role call of its children (reactive b/c it's a signal)
    useVisibleTask$(function reIndexTriggers() {
      updateTriggers$();
    });

    const contextService: AccordionRootContext = {
      updateTriggers$,
      focusFirstTrigger$,
      focusPreviousTrigger$,
      focusNextTrigger$,
      focusLastTrigger$,
      currFocusedTriggerIndexSig,
      currSelectedTriggerIndexSig,
      selectedTriggerIdSig,
      triggerElementsSig,
      collapsible,
      behavior,
      animated,
    };

    useContextProvider(accordionRootContextId, contextService);

    return (
      <div {...props} ref={rootRef}>
        <Slot />
      </div>
    );
  },
);
