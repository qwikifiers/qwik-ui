import { Slot, component$ } from '@builder.io/qwik';
import { HPopoverRoot } from '../popover/popover-root';

export const HTooltipRoot = component$(() => {
  return (
    <HPopoverRoot hover>
      <Slot />
    </HPopoverRoot>
  );
});
