import { PropsOf, Slot, component$, useContext, $ } from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';
import { useMergedRef } from '../../hooks/merge-refs';

type HComboboxTriggerImplProps = PropsOf<'button'>;

export const HComboboxTrigger = component$((props: HComboboxTriggerImplProps) => {
  const context = useContext(comboboxContextId);
  const triggerRef = useMergedRef(props.ref, context, 'triggerRef');

  const handleClick$ = $(() => {
    context.inputRef.value?.focus();
    context.isListboxOpenSig.value = !context.isListboxOpenSig.value;
  });

  return (
    <button
      ref={triggerRef}
      aria-expanded={context.isListboxOpenSig.value}
      onClick$={[handleClick$, props.onClick$]}
      data-open={context.isListboxOpenSig.value ? '' : undefined}
      data-closed={!context.isListboxOpenSig.value ? '' : undefined}
      preventdefault:mousedown
      tabIndex={-1}
      {...props}
    >
      <Slot />
    </button>
  );
});
