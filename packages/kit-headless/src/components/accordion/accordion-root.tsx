import {
  $,
  component$,
  Slot,
  useContextProvider,
  useSignal,
  useStore,
  type QwikIntrinsicElements,
} from '@builder.io/qwik';

import { type AccordionRootContext } from './accordion-context.type';
import { accordionRootContextId } from './accordion-context-id';

export type AccordionRootProps = {
  behavior?: 'single' | 'multi';
  animated?: boolean;
  collapsible?: boolean;
  orientation?: 'vertical' | 'horizontal';
} & QwikIntrinsicElements['div'];

export const AccordionRoot = component$(
  ({
    collapsible = true,
    behavior = 'single',
    animated = false,
    orientation = 'vertical',
    ...props
  }: AccordionRootProps) => {
    const rootRef = useSignal<HTMLDivElement | undefined>();
    const triggerStore = useStore<HTMLButtonElement[]>([]);
    const triggerIndexSig = useSignal(0);

    // const selectedIndexSig = useSignal<number | null>(null);
    const selectedTriggerIdSig = useSignal<string>('');

    const getSelectedTriggerId$ = $((triggerId: string) => {
      return (selectedTriggerIdSig.value = triggerId);
    });

    const focusPreviousTrigger$ = $(() => {
      if (triggerIndexSig.value === 0) {
        triggerIndexSig.value = triggerStore.length - 1;
        return triggerStore[triggerStore.length - 1].focus();
      }

      triggerIndexSig.value--;

      return triggerStore[triggerIndexSig.value].focus();
    });

    const focusNextTrigger$ = $(() => {
      if (triggerIndexSig.value === triggerStore.length - 1) {
        triggerIndexSig.value = 0;
        return triggerStore[0].focus();
      }

      triggerIndexSig.value++;

      return triggerStore[triggerIndexSig.value].focus();
    });

    const focusFirstTrigger$ = $(() => {
      return triggerStore[0].focus();
    });

    const focusLastTrigger$ = $(() => {
      return triggerStore[triggerStore.length - 1].focus();
    });

    // const lastAssignedTriggerIndexSig = useSignal<number>(-1);
    // const lastAssignedContentIndexSig = useSignal<number>(-1);

    // const itemPairs = useStore<ItemPair[]>([]);

    // const getNextServerAssignedTriggerIndex$ = $(() => {
    //   lastAssignedTriggerIndexSig.value++;
    //   return lastAssignedTriggerIndexSig.value;
    // });

    // const getNextServerAssignedContentIndex$ = $(() => {
    //   lastAssignedContentIndexSig.value++;
    //   return lastAssignedContentIndexSig.value;
    // });

    // const isIndexSelected$ = $((index: number) => {
    //   return selectedIndexSig.value === index;
    // });

    const contextService: AccordionRootContext = {
      getSelectedTriggerId$,
      selectedTriggerIdSig,
      focusFirstTrigger$,
      focusPreviousTrigger$,
      focusNextTrigger$,
      focusLastTrigger$,
      triggerStore,
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
  }
);
