import {
  QwikIntrinsicElements,
  component$,
  useSignal,
  useContext,
  Slot,
} from '@builder.io/qwik';
import SelectContextId from './select-context-id';

export type SelectTriggerProps = QwikIntrinsicElements['button'];

export const SelectTrigger = component$((props: SelectTriggerProps) => {
  const ref = useSignal<HTMLElement>();
  const selectContext = useContext(SelectContextId);
  selectContext.triggerRef = ref;

  return (
    <button
      ref={ref}
      aria-expanded={selectContext.isExpanded.value}
      onClick$={(e) => {
        e.stopPropagation();
        selectContext.isExpanded.value = !selectContext.isExpanded.value;
      }}
      onKeyDown$={(e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          selectContext.isExpanded.value = true;
        }
      }}
      {...props}
    >
      <Slot />
    </button>
  );
});
