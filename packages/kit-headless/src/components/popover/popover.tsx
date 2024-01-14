import { component$, Slot } from '@builder.io/qwik';
import { FloatingPopover } from './floating';
import { PopoverImpl } from './popover-impl';
import { PopoverImplProps } from './popover-impl';
import { FloatingProps } from './floating';

type PopoverProps = PopoverImplProps & ({ floating?: true } & FloatingProps);

/* This component determines whether the popover needs floating behavior, a common example where it doesn't, would be a toast. */
export const Popover = component$<PopoverProps>(
  ({ floating, anchorRef, ref, ...props }) => {
    if (floating) {
      if (!anchorRef) {
        throw new Error(
          'Qwik UI Popover: anchorRef is required on the popover when floating is true',
        );
      }

      return (
        <FloatingPopover ref={ref} anchorRef={anchorRef} {...props}>
          <Slot />
        </FloatingPopover>
      );
    }

    return (
      <PopoverImpl {...props}>
        <Slot />
      </PopoverImpl>
    );
  },
);
