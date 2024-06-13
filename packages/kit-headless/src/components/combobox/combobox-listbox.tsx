import { PropsOf, Slot, component$ } from '@builder.io/qwik';

type HComboboxListboxProps = PropsOf<'ul'>;

export const HComboboxListbox = component$((props: HComboboxListboxProps) => {
  return (
    <ul {...props}>
      <Slot />
    </ul>
  );
});
