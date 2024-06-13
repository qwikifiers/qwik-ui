import { PropsOf, Slot, component$ } from '@builder.io/qwik';

type HComboboxPopoverProps = PropsOf<'div'>;

export const HComboboxPopover = component$((props: HComboboxPopoverProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
