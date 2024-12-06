import {
  PropsOf,
  Slot,
  component$,
  sync$,
  useContext,
  useSignal,
  $,
} from '@builder.io/qwik';
import { HCollapsibleTrigger } from '../collapsible/collapsible-trigger';
import { accordionContextId, accordionItemContextId } from './accordion-context';
import { useEnabledIndex } from '../../hooks/use-enabled-index';

type KeyboardDirection = 'next' | 'prev' | 'first' | 'last';

export const HAccordionTrigger = component$(
  (props: PropsOf<typeof HCollapsibleTrigger>) => {
    const context = useContext(accordionContextId);
    const itemContext = useContext(accordionItemContextId);
    const { getNextEnabledItemIndex$, getPrevEnabledItemIndex$ } = useEnabledIndex();
    const focusedIndexSig = useSignal<number | null>(null);

    /** Determines and focuses the next enabled item. */
    const focusManager$ = $(async (direction: KeyboardDirection) => {
      if (!context.itemsMapSig?.value) {
        throw new Error(
          'Qwik UI: Accordion item does not have a map of the available item info.',
        );
      }

      let index: number | null = null;

      switch (direction) {
        case 'next':
          if (focusedIndexSig.value === itemContext.localIndexSig.value) {
            index = await getNextEnabledItemIndex$(
              itemContext.localIndexSig.value,
              context.itemsMapSig.value,
            );
          }
          break;

        case 'prev':
          if (focusedIndexSig.value === itemContext.localIndexSig.value) {
            index = await getPrevEnabledItemIndex$(
              itemContext.localIndexSig.value,
              context.itemsMapSig.value,
            );
          }
          break;

        case 'first':
          index = await getNextEnabledItemIndex$(-1, context.itemsMapSig.value);
          break;

        case 'last':
          index = await getPrevEnabledItemIndex$(
            context.itemsMapSig.value.size,
            context.itemsMapSig.value,
            false,
          );
          break;
      }

      if (index !== null) {
        context.triggerRefsArray.value[index].value.focus();
      }
    });

    const handleKeyDown$ = $(async (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          await focusManager$('next');
          break;

        case 'ArrowUp':
          await focusManager$('prev');
          break;

        case 'Home':
          await focusManager$('first');
          break;

        case 'End':
          await focusManager$('last');
          break;
      }
    });

    const handleKeyDownSync$ = sync$((e: KeyboardEvent) => {
      const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End'];

      if (keys.includes(e.key)) {
        e.preventDefault();
      }
    });

    return (
      <HCollapsibleTrigger
        onClick$={() => {
          context.selectedIndexSig.value = itemContext.localIndexSig.value;
        }}
        onFocus$={() => (focusedIndexSig.value = itemContext.localIndexSig.value)}
        onKeyDown$={[handleKeyDownSync$, handleKeyDown$]}
        {...props}
      >
        <Slot />
      </HCollapsibleTrigger>
    );
  },
);
