import { PropsOf, Slot, component$ } from '@builder.io/qwik';

type SelectOptionLabelProps = PropsOf<'span'>;

export const SelectOptionLabel = component$((props: SelectOptionLabelProps) => {
  return (
    <span {...props}>
      <Slot />
    </span>
  );
});
