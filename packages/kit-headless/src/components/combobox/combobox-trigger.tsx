import { PropsOf, Slot, component$ } from '@builder.io/qwik';

export type ComboboxTriggerProps = PropsOf<'button'>;

export const ComboboxTrigger = component$((props: ComboboxTriggerProps) => {
  return (
    <button {...props}>
      <Slot />
    </button>
  );
});
