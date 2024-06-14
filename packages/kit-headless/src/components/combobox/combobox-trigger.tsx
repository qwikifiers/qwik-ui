import { PropsOf, Slot, component$, useContext, $ } from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';

type HComboboxTriggerImplProps = PropsOf<'button'>;

export const HComboboxTrigger = component$((props: HComboboxTriggerImplProps) => {
  const context = useContext(comboboxContextId);

  const handleClick$ = $(() => {
    context.isListboxOpenSig.value = !context.isListboxOpenSig.value;
  });

  return (
    <button
      aria-expanded={context.isListboxOpenSig.value}
      onClick$={handleClick$}
      {...props}
    >
      <Slot />
    </button>
  );
});
