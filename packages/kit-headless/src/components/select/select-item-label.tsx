import { PropsOf, Slot, component$ } from '@builder.io/qwik';

type SelectOptionLabelProps = PropsOf<'span'>;

export const SelectItemLabel = component$((props: SelectOptionLabelProps) => {
  return (
    <span tabIndex={-1} {...props}>
      <Slot />
    </span>
  );
});
