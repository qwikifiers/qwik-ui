import { component$, PropsOf, Slot, useContext } from '@qwik.dev/core';
import { FloatingPopover } from './floating';
import { HPopoverPanelImpl } from './popover-panel-impl';
import { popoverContextId } from './popover-context';

// TODO: improve the type so that it only includes FloatingProps when floating is true.

/* This component determines whether the popover needs floating behavior, a common example where it doesn't, would be a toast. */
export const HPopoverPanel = component$((props: PropsOf<'div'>) => {
  const context = useContext(popoverContextId);

  if (context.floating) {
    return (
      <FloatingPopover data-floating {...props}>
        <Slot />
      </FloatingPopover>
    );
  }

  return (
    <HPopoverPanelImpl {...props}>
      <Slot />
    </HPopoverPanelImpl>
  );
});
