import { PropsOf, Slot, component$ } from '@qwik.dev/core';

type SelectOptionLabelProps = PropsOf<'span'>;

export const HSelectItemLabel = component$((props: SelectOptionLabelProps) => {
  return (
    <span tabIndex={-1} {...props}>
      <Slot />
    </span>
  );
});
