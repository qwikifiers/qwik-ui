import { component$, useContext, Slot, useTask$, useId } from '@builder.io/qwik';
import { Popover, usePopover } from '../popover';

import ComboboxContextId from './combobox-context-id';
import { FloatingProps } from '../popover/floating';
import { PopoverImplProps } from '../popover/popover-impl';

export const ComboboxPopover = component$(
  (props: Partial<FloatingProps & PopoverImplProps>) => {
    const context = useContext(ComboboxContextId);
    const customPopoverId = useId();
    console.log('customPopoverId:', customPopoverId);
    const { initPopover$ } = usePopover(customPopoverId);

    /* REMEMBER, whenever an option is selected or onMouseDown$ the listbox is closed, and the popover should sync to that */
    useTask$(async ({ track }) => {
      track(() => context.isListboxOpenSig.value);
      track(() => context.popoverRef.value);

      console.log('POPOVER REF:', context.popoverRef.value);

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
        id={customPopoverId}
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
