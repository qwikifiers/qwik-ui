import { component$, type PropsOf, useContext, sync$, $ } from '@builder.io/qwik';
import SelectContextId from './select-context';

type SelectTriggerProps = PropsOf<'button'>;
export type DisabledArr = Array<{ disabled: boolean }>;
export const SelectTrigger = component$<SelectTriggerProps>((props) => {
  const context = useContext(SelectContextId);

  const handleClick$ = $(() => {
    context.isListboxOpenSig.value = !context.isListboxOpenSig.value;
  });

  const handleKeyDownSync$ = sync$((e: KeyboardEvent) => {
    const keys = ['ArrowUp', 'ArrowDown', 'Home', 'End', 'PageDown', 'PageUp'];
    if (keys.includes(e.key)) {
      e.preventDefault();
    }
  });

  return (
    <button
      {...props}
      ref={context.triggerRef}
      onClick$={[handleClick$, props.onClick$]}
      onKeyDown$={[handleKeyDownSync$, props.onKeyDown$]}
      data-open={context.isListboxOpenSig.value ? '' : undefined}
      data-closed={!context.isListboxOpenSig.value ? '' : undefined}
      aria-expanded={context.isListboxOpenSig.value}
    >
      {context.selectedOptionRef.value?.textContent ?? 'Select an option'}
    </button>
  );
});
