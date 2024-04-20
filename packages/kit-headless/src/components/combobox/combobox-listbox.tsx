import { PropsOf, Slot, component$ } from '@builder.io/qwik';

export type ComboboxListboxProps = PropsOf<'ul'>;

export const ComboboxListbox = component$((props: ComboboxListboxProps) => {
  return (
    <ul {...props}>
      <Slot />
    </ul>
  );
});
