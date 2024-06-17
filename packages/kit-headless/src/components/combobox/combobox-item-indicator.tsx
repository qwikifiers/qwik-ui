import { PropsOf, Slot, component$ } from '@builder.io/qwik';

type HComboboxItemIndicatorProps = PropsOf<'span'>;

export const HComboboxItemIndicator = component$((props: HComboboxItemIndicatorProps) => {
  return (
    <span aria-hidden="true" {...props}>
      <Slot />
    </span>
  );
});
