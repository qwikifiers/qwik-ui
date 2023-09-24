import { component$, Slot, type Signal } from '@builder.io/qwik';
import { FloatingPopover } from './floating';
import { PopoverImpl } from './popover-impl';
import { PopoverImplProps } from './popover-impl';

type PopoverProps = (
  | {
      floating?: false | undefined;
      anchorRef?: never;
    }
  | { floating: true; anchorRef: Signal<HTMLElement | undefined> }
) &
  PopoverImplProps;

/* This component determines whether the popover needs floating behavior, a common example where it doesn't, would be a toast. */
export const Popover = component$(({ floating, anchorRef, ...props }: PopoverProps) => {
  if (floating) {
    if (!anchorRef) {
      throw new Error('anchorRef is required when floating is true');
    }

    return (
      <FloatingPopover anchorRef={anchorRef} {...props}>
        <Slot />
      </FloatingPopover>
    );
  }

  return (
    <PopoverImpl {...props}>
      <Slot />
    </PopoverImpl>
  );
});
