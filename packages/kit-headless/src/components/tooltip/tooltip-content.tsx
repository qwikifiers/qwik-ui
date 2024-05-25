import { PropsOf, Slot, component$ } from '@builder.io/qwik';
import { HPopoverPanel } from '../popover/popover-panel';

export const HTooltipContent = component$((props: PropsOf<typeof HPopoverPanel>) => {
  return (
    <HPopoverPanel {...props}>
      <Slot />
    </HPopoverPanel>
  );
});
