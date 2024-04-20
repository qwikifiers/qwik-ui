import { Slot, component$, useContext, useId, useTask$ } from '@builder.io/qwik';
import { Popover, usePopover } from '../popover';
import comboboxContextId from './combobox-context';

import { isServer } from '@builder.io/qwik/build';
import { FloatingProps } from '../popover/floating';
import { PopoverImplProps } from '../popover/popover-impl';

export const ComboboxPopover = component$(
  (props: Partial<FloatingProps & PopoverImplProps>) => {
    const context = useContext(comboboxContextId);
    const customPopoverId = useId();
    const { showPopover, hidePopover } = usePopover(customPopoverId);

    /* REMEMBER, whenever an option is selected or onMouseDown$ the listbox is closed, and the popover should sync to that */
    useTask$(async ({ track }) => {
      track(() => context.isListboxOpenSig.value);

      if (isServer) return;

      if (context.isListboxOpenSig.value) {
        showPopover();
      } else {
        hidePopover();
      }
    });

    return (
      <Popover
        {...props}
        id={customPopoverId}
        floating={true}
        anchorRef={context.inputRef}
        ref={context.popoverRef}
        manual
      >
        <Slot />
      </Popover>
    );
  },
);
