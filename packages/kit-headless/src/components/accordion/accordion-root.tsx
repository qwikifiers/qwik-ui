import {
  $,
  component$,
  Slot,
  useContextProvider,
  useSignal,
  useStore,
  useTask$,
  type QwikIntrinsicElements,
  type PropFunction
} from '@builder.io/qwik';

import { type AccordionRootContext } from './accordion-context.type';
import { accordionRootContextId } from './accordion-context-id';

export type AccordionRootProps = {
  behavior?: 'single' | 'multi';
  animated?: boolean;
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
    const triggerStore = useStore<HTMLButtonElement[]>([]);
    const currFocusedTriggerIndexSig = useSignal<number>(-1);
    const currSelectedTriggerIndexSig = useSignal<number>(-1);

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

    const selectedTriggerIdSig = useSignal<string>('');

    const focusPreviousTrigger$ = $(() => {
      if (currFocusedTriggerIndexSig.value === 0) {
        currFocusedTriggerIndexSig.value = triggerStore.length - 1;
        return triggerStore[triggerStore.length - 1].focus();
      }

      currFocusedTriggerIndexSig.value--;

      return triggerStore[currFocusedTriggerIndexSig.value].focus();
    });

    const focusNextTrigger$ = $(() => {
      if (currFocusedTriggerIndexSig.value === triggerStore.length - 1) {
        currFocusedTriggerIndexSig.value = 0;
        return triggerStore[0].focus();
      }

      currFocusedTriggerIndexSig.value++;

      return triggerStore[currFocusedTriggerIndexSig.value].focus();
    });

    const focusFirstTrigger$ = $(() => {
      return triggerStore[0].focus();
    });

    const focusLastTrigger$ = $(() => {
      return triggerStore[triggerStore.length - 1].focus();
    });

    const contextService: AccordionRootContext = {
      selectedTriggerIdSig,
      currFocusedTriggerIndexSig,
      currSelectedTriggerIndexSig,
      focusFirstTrigger$,
      focusPreviousTrigger$,
      focusNextTrigger$,
      focusLastTrigger$,
      triggerStore,
      collapsible,
      behavior,
      animated
    };

    useContextProvider(accordionRootContextId, contextService);

    return (
      <div {...props} ref={rootRef}>
        <Slot />
      </div>
    );
  }
);
