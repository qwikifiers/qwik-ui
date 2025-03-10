import {
  component$,
  useContext,
  $,
  type PropsOf,
  Slot,
  useSignal,
  useTask$,
} from '@qwik.dev/core';
import { ChecklistContext } from './checklist-context';
import { CheckboxRoot } from '../checkbox/checkbox-root';

export const ChecklistSelectAll = component$((props: PropsOf<'div'>) => {
  const context = useContext(ChecklistContext);
  const isInitiallySelected = context.initialStates.every(Boolean);
  const allSelected = useSignal(isInitiallySelected);
  const items = useSignal(context.items.value);
  const toggleAll = $(() => {
    const newState = !allSelected.value;
    allSelected.value = newState;
    items.value = items.value.map(() => newState);
    context.toggleAllSelected();
  });

  useTask$(({ track }) => {
    track(() => context.items.value);
  });

  /**
   *  When in mixed state, it should show the mixed state indicator
   *
   *  When in all selected state, it should show the checked indicator
   */
  return (
    <CheckboxRoot
      as="li"
      bind:checked={allSelected}
      // @ts-expect-error annoying type issue
      onClick$={toggleAll}
      id="selectAll"
      data-qds-selectall
      {...props}
    >
      <Slot />
    </CheckboxRoot>
  );
});
