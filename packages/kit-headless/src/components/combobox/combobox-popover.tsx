import { component$, useContext, Slot, useTask$, useId } from '@builder.io/qwik';
import { Popover, usePopover } from '../popover';

import ComboboxContextId from './combobox-context-id';
import { FloatingProps } from '../popover/floating';
import { PopoverImplProps } from '../popover/popover-impl';
import { isServer } from '@builder.io/qwik/build';

export const ComboboxPopover = component$(
  (props: Partial<FloatingProps & PopoverImplProps>) => {
    const context = useContext(ComboboxContextId);
    const customPopoverId = useId();
    console.log('customPopoverId:', customPopoverId);
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
        class={['listbox', props.class]}
        manual
      >
        <Slot />
      </Popover>
    );
  },
);
