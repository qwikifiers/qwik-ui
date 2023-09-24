import { component$, useContext, Slot, useTask$ } from '@builder.io/qwik';
import { Popover } from '../popover';

import ComboboxContextId from './combobox-context-id';
import type { ComboboxContext, Option } from './combobox-context.type';

export const ComboboxPopover = component$<ComboboxContext<Option>>(({ ...props }) => {
  const context = useContext<ComboboxContext<Option>>(ComboboxContextId);
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
      anchorRef={context.inputRef}
      popoverRef={context.popoverRef}
      preset="listbox"
      popover="manual"
      floating={true}
    >
      <Slot />
    </Popover>
  );
});
