import { PropsOf, Slot, component$ } from '@builder.io/qwik';

import { HPopoverPanelArrow } from '../popover/popover-panel-arrow';

export const HDropdownArrow = component$((props: PropsOf<'div'>) => {
  return (
    <HPopoverPanelArrow {...props}>
      <Slot />
    </HPopoverPanelArrow>
  );
});
