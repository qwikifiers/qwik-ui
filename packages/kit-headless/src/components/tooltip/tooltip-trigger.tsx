import { Slot, component$ } from '@builder.io/qwik';
import { HPopoverTrigger } from '../popover/popover-trigger';

export const HTooltipTrigger = component$(() => {
  return (
    <HPopoverTrigger>
      <Slot />
    </HPopoverTrigger>
  );
});
