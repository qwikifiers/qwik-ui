import { PropsOf, Slot, component$ } from '@builder.io/qwik';

type HComboboxErrorMessageProps = PropsOf<'div'>;

export const HComboboxErrorMessage = component$((props: HComboboxErrorMessageProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
