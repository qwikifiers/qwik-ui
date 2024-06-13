import { PropsOf, Slot, component$ } from '@builder.io/qwik';

type HComboboxItemLabelProps = PropsOf<'span'>;

export const HComboboxItemLabel = component$((props: HComboboxItemLabelProps) => {
  return (
    <span {...props}>
      <Slot />
    </span>
  );
});
