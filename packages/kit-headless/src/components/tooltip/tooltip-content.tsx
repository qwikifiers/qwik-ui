import { Slot, component$ } from '@builder.io/qwik';
import { HPopoverPanel } from '../popover/popover-panel';

export const HTooltipContent = component$(() => {
  return (
    <HPopoverPanel>
      <Slot />
    </HPopoverPanel>
  );
});
