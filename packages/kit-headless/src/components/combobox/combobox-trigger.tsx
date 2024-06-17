import { PropsOf, Slot, component$, useContext, $ } from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';

type HComboboxTriggerImplProps = PropsOf<'button'>;

export const HComboboxTrigger = component$((props: HComboboxTriggerImplProps) => {
  const context = useContext(comboboxContextId);

  const handleClick$ = $(() => {
    context.inputRef.value?.focus();
    context.isListboxOpenSig.value = !context.isListboxOpenSig.value;
  });

  const handleMouseDown$ = $(() => {
    context.inputRef.value?.focus();
  });

  return (
    <button
      ref={context.triggerRef}
      aria-expanded={context.isListboxOpenSig.value}
      onClick$={[handleClick$, props.onClick$]}
      onMouseDown$={[handleMouseDown$, props.onMouseDown$]}
      preventdefault:mousedown
      tabIndex={-1}
      {...props}
    >
      <Slot />
    </button>
  );
});
