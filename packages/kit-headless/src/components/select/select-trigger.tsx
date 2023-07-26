import {
  QwikIntrinsicElements,
  component$,
  useSignal,
  useContext,
  Slot,
  $,
} from '@builder.io/qwik';
import SelectContextId from './select-context-id';

import { KeyCode } from '../../utils/key-code.type';
import { useOn } from '@builder.io/qwik';

export const selectPreventedKeys = [KeyCode.Home, KeyCode.End];

export type SelectTriggerProps = QwikIntrinsicElements['button'];

export const SelectTrigger = component$((props: SelectTriggerProps) => {
  const selectContext = useContext(SelectContextId);
  const triggerRef = useSignal<HTMLElement>();
  selectContext.triggerRef = triggerRef;

  const keyHandler$ = $((event: Event) => {
    const e = event as KeyboardEvent;
    if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
    }

    if (
      e.key === 'ArrowDown' ||
      e.key === 'ArrowUp' ||
      e.key === 'Enter' ||
      e.key === ' '
    ) {
      selectContext.isExpanded.value = true;
    }
  });

  const clickHandler$ = $((e: Event) => {
    e.preventDefault();
    selectContext.isExpanded.value = !selectContext.isExpanded.value;
  });

  useOn('keydown', keyHandler$);
  useOn('click', clickHandler$);

  return (
    <button
      ref={triggerRef}
      aria-expanded={selectContext.isExpanded.value}
      {...props}
    >
      <Slot />
    </button>
  );
});
