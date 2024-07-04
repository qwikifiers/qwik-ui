import { PropsOf, Slot, component$, useContext, $ } from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';
import { useCombinedRef } from '../../hooks/combined-refs';

type HComboboxTriggerImplProps = PropsOf<'button'>;

export const HComboboxTrigger = component$((props: HComboboxTriggerImplProps) => {
  const context = useContext(comboboxContextId);
  const contextRefOpts = { context, givenContextRef: context.triggerRef };
  const triggerRef = useCombinedRef(props.ref, contextRefOpts);

  const handleClick$ = $(() => {
    context.inputRef.value?.focus();
    context.isListboxOpenSig.value = !context.isListboxOpenSig.value;
  });

  return (
    <button
      ref={triggerRef}
      type="button"
      aria-expanded={context.isListboxOpenSig.value}
      onClick$={[handleClick$, props.onClick$]}
      data-open={context.isListboxOpenSig.value ? '' : undefined}
      data-closed={!context.isListboxOpenSig.value ? '' : undefined}
      data-invalid={context.isInvalidSig.value ? '' : undefined}
      preventdefault:mousedown
      tabIndex={-1}
      {...props}
    >
      <Slot />
    </button>
  );
});
