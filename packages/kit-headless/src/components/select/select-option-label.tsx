import { PropsOf, Slot, component$ } from '@builder.io/qwik';

type SelectOptionLabelProps = PropsOf<'span'>;

export const SelectItemLabel = component$((props: SelectOptionLabelProps) => {
  return (
    <span {...props}>
      <Slot />
    </span>
  );
});
