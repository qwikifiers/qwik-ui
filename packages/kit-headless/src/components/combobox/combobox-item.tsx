import { PropsOf, Slot, component$ } from '@builder.io/qwik';

type HComboboxItemProps = PropsOf<'li'>;

export const HComboboxItem = component$((props: HComboboxItemProps) => {
  return (
    <li {...props}>
      <Slot />
    </li>
  );
});
