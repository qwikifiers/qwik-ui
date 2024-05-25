import { PropsOf, Slot, component$ } from '@builder.io/qwik';
import { HPopoverTrigger } from '../popover/popover-trigger';

export const HTooltipTrigger = component$((props: PropsOf<typeof HPopoverTrigger>) => {
  return (
    <HPopoverTrigger {...props}>
      <Slot />
    </HPopoverTrigger>
  );
});
