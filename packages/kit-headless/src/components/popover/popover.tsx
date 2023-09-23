import { component$, Slot } from '@builder.io/qwik';
import { FloatingPopover } from './floating';
import { PopoverImpl } from './popover-impl';

type PopoverProps = {
  floating?: boolean;
};

/* This component determines whether the popover needs floating behavior, a common example where it doesn't, would be a toast. */
export const Popover = component$(
  ({ popoverRef, floating = false, ...props }: PopoverProps) => {
    if (floating) {
      return (
        <FloatingPopover popoverRef={popoverRef} {...props}>
          <Slot />
        </FloatingPopover>
      );
    }

    return (
      <PopoverImpl popoverRef={popoverRef} {...props}>
        <Slot />
      </PopoverImpl>
    );
  },
);
