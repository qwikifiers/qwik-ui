import {
  component$,
  type PropsOf,
  Slot,
  useContext,
  useSignal,
  useTask$,
} from '@qwik.dev/core';
import { CheckboxRoot } from '../checkbox/checkbox-root';
import { ChecklistContext } from './checklist-context';

interface ChecklistItemProps extends PropsOf<'div'> {
  _index?: number;
}

export const ChecklistItem = component$((props: ChecklistItemProps) => {
  const { _index } = props;

  if (_index === undefined) {
    throw new Error('Checklist Item must have an index.');
  }

  const context = useContext(ChecklistContext);
  const isCheckedSig = useSignal(context.items.value[_index]);
  const initialLoadSig = useSignal(true);

  useTask$(({ track }) => {
    track(() => context.allSelected.value);

    if (initialLoadSig.value) {
      return;
    }

    if (context.allSelected.value) {
      isCheckedSig.value = true;
    } else {
      isCheckedSig.value = false;
    }
  });

  useTask$(function syncCheckboxState({ track }) {
    track(() => isCheckedSig.value);

    // itemsSig
    context.items.value[_index] = isCheckedSig.value;

    // root of both checkboxes updating.  context.allselected is updated causing the other useTask$ to run again
    // if (isCheckedSig.value === false) {
    //   context.allSelected.value = false;
    // }

    const isAllSelected = context.items.value.every((item) => item === true);
    // const isAnyChecked = context.items.value.some(Boolean);

    if (isAllSelected) {
      context.allSelected.value = true;
    }
  });

  useTask$(() => {
    initialLoadSig.value = false;
  });

  return (
    <CheckboxRoot as="li" bind:checked={isCheckedSig} index={_index}>
      <Slot />
    </CheckboxRoot>
  );
});
