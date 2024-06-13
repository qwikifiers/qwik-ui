import { PropsOf, Slot, component$ } from '@builder.io/qwik';

type HComboboxTriggerImplProps = PropsOf<'button'>;

export const HComboboxTrigger = component$((props: HComboboxTriggerImplProps) => {
  return (
    <button {...props}>
      <Slot />
    </button>
  );
});
