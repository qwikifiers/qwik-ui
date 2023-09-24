import { component$, Slot, type PropsOf, type Signal } from '@builder.io/qwik';
import { FloatingPopover } from './floating';
import { PopoverImpl } from './popover-impl';

type PopoverProps = (
  | {
      floating?: false | undefined;
      anchorRef?: never;
    }
  | { floating: true; anchorRef: Signal<HTMLElement> }
) &
  PropsOf<typeof PopoverImpl>;

/* This component determines whether the popover needs floating behavior, a common example where it doesn't, would be a toast. */
export const Popover = component$(({ floating, ...props }: PopoverProps) => {
  if (floating) {
    return (
      <FloatingPopover {...props}>
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
