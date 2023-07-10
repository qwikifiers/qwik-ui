import {
  $,
  component$,
  Slot,
  useContextProvider,
  useSignal,
  type QwikIntrinsicElements,
} from '@builder.io/qwik';

import { type AccordionRootContext } from './accordion-context.type';
import { accordionRootContextId } from './accordion-context-id';

export type AccordionRootProps = {
  behavior?: 'single' | 'multi';
} & QwikIntrinsicElements['div'];

export const AccordionRoot = component$(
  ({ behavior = 'single', ...props }: AccordionRootProps) => {
    const rootRef = useSignal<HTMLDivElement | undefined>();

    // const selectedIndexSig = useSignal<number | null>(null);
    const selectedTriggerIdSig = useSignal<string>('');

    const getSelectedTriggerId$ = $((triggerId: string) => {
      return (selectedTriggerIdSig.value = triggerId);
    });

    // const updateTriggerStore$ = $((isExpanded: boolean) => {
    //   triggerStore.push(isExpanded);

    //   if (!seenElements.has(ref)) {
    //     seenElements.add(ref);
    //   }

    //   console.log(seenElements);
    // });

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
      rootRef,
      getSelectedTriggerId$,
      selectedTriggerIdSig,
      behavior,
    };

    useContextProvider(accordionRootContextId, contextService);

    return (
      <div {...props} ref={rootRef}>
        <Slot />
      </div>
    );
  }
);
