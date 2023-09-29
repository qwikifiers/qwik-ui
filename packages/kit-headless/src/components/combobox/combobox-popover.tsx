import { component$, useContext, Slot, useTask$ } from '@builder.io/qwik';
import { Popover } from '../popover';

import ComboboxContextId from './combobox-context-id';
import { FloatingProps } from '../popover/floating';
import { PopoverImplProps } from '../popover/popover-impl';

export const ComboboxPopover = component$(
  (props: Partial<FloatingProps & PopoverImplProps>) => {
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
        class={`listbox ${props.class}`}
        manual
      >
        <Slot />
      </Popover>
    );
  },
);
