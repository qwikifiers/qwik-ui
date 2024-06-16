import { PropsOf, Slot, component$ } from '@builder.io/qwik';

type HComboboxGroupLabelProps = PropsOf<'li'>;

export const HComboboxGroupLabel = component$((props: HComboboxGroupLabelProps) => {
  return (
    <li {...props}>
      <Slot />
    </li>
  );
});
