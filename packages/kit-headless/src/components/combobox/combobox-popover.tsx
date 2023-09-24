import { component$, useContext, Slot, useTask$ } from '@builder.io/qwik';
import { Popover } from '../popover';

import ComboboxContextId from './combobox-context-id';
import type { ComboboxContext } from './combobox-context.type';

export const ComboboxPopover = component$(({ ...props }) => {
  const context = useContext<ComboboxContext<O>>(ComboboxContextId);

  /* uncomment this - REMEMBER, whenever an option is selected or onMouseDown$ the listbox is closed, and the popover should sync to that */
  useTask$(({ track }) => {
    track(() => context.isListboxOpenSig.value);

    console.log(context.isListboxOpenSig.value);
    if (!context.popoverRef.value) {
      return;
    }

    context.isListboxOpenSig.value
      ? context.popoverRef.value.showPopover()
      : context.popoverRef.value.hidePopover();
  });

  return (
    <Popover
      anchorRef={context.inputRef}
      popoverRef={context.popoverRef}
      preset="listbox"
      popover="manual"
      floating={true}
      {...props}
    >
      <Slot />
    </Popover>
  );
});
