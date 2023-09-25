import { component$, useContext, Slot, useTask$ } from '@builder.io/qwik';
import { Popover } from '../popover';

import ComboboxContextId from './combobox-context-id';

export const ComboboxPopover = component$(({ ...props }) => {
  const context = useContext(ComboboxContextId);
  const popoverId = `${context.localId}-popover`;

  /* REMEMBER, whenever an option is selected or onMouseDown$ the listbox is closed, and the popover should sync to that */
  useTask$(function syncPopoverStateTask({ track }) {
    track(() => context.isListboxOpenSig.value);

    if (!context.popoverRef.value) {
      return;
    }

    context.isListboxOpenSig.value
      ? context.popoverRef.value.showPopover()
      : context.popoverRef.value.hidePopover();
  });

  return (
    <Popover
      {...props}
      id={popoverId}
      floating={true}
      anchorRef={context.inputRef}
      popoverRef={context.popoverRef}
      preset="listbox"
      popover="manual"
    >
      <Slot />
    </Popover>
  );
});
