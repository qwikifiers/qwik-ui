import { component$, useContext, Slot, useTask$ } from '@builder.io/qwik';
import { Popover, usePopover } from '../popover';

import ComboboxContextId from './combobox-context-id';
import { FloatingProps } from '../popover/floating';
import { PopoverImplProps } from '../popover/popover-impl';

export const ComboboxPopover = component$(
  (props: Partial<FloatingProps & PopoverImplProps>) => {
    const context = useContext(ComboboxContextId);
    const popoverId = `${context.localId}-popover`;
    const { initPopover$ } = usePopover(popoverId);

    /* REMEMBER, whenever an option is selected or onMouseDown$ the listbox is closed, and the popover should sync to that */
    useTask$(async ({ track }) => {
      track(() => context.isListboxOpenSig.value);
      track(() => context.popoverRef.value);

      console.log('LISTBOX OPEN: ', context.isListboxOpenSig.value);

      if (context.isListboxOpenSig.value) {
        await initPopover$();
        context.popoverRef.value?.showPopover();
      } else {
        context.popoverRef.value?.hidePopover();
      }
    });

    return (
      <Popover
        {...props}
        id={popoverId}
        floating={true}
        anchorRef={context.inputRef}
        popoverRef={context.popoverRef}
        class={['listbox', props.class]}
        manual
      >
        <Slot />
      </Popover>
    );
  },
);
