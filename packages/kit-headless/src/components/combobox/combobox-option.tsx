import { PropsOf, Slot, component$ } from '@builder.io/qwik';

export type ComboboxOptionProps = PropsOf<'li'>;

export const ComboboxOption = component$((props: ComboboxOptionProps) => {
  return (
    <li {...props}>
      <Slot />
    </li>
  );
});
