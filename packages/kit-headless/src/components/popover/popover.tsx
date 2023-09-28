import { component$, Slot } from '@builder.io/qwik';
import { FloatingPopover } from './floating';
import { PopoverImpl } from './popover-impl';
import { PopoverImplProps } from './popover-impl';
import { FloatingProps } from './floating';

type PopoverProps = (
  | {
      floating?: false | undefined;
      anchorRef: never;
    }
  | ({ floating: true } & FloatingProps)
) &
  PopoverImplProps;

/* This component determines whether the popover needs floating behavior, a common example where it doesn't, would be a toast. */
export const Popover = component$(({ floating, anchorRef, ...props }: PopoverProps) => {
  if (floating) {
    if (!anchorRef) {
      throw new Error(
        'Qwik UI Popover: anchorRef is required on the popover when floating is true',
      );
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
