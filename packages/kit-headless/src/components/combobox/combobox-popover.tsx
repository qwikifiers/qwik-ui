import { component$, useContext, Slot, useTask$ } from '@builder.io/qwik';
import { Popover } from '../popover';

import ComboboxContextId from './combobox-context-id';
import type { ComboboxContext } from './combobox-context.type';

export const ComboboxPopover = component$(({ ...props }) => {
  const context = useContext<ComboboxContext<O>>(ComboboxContextId);

  /* uncomment this - REMEMBER, whenever an option is selected or onMouseDown$ the listbox is closed, and the popover should sync to that */
  //   useTask$(({ track }) => {
  //     track(() => context.isListboxOpenSig.value);

  //     console.log(context.isListboxOpenSig.value);
  //     if (!context.isListboxOpenSig.value && context.popoverRef.value) {
  //       context.popoverRef.value.hidePopover();
  //     }

  //     if (context.isListboxOpenSig.value && context.popoverRef.value) {
  //       context.popoverRef.value.showPopover();
  //     }
  //   });

  return (
    <Popover popoverRef={context.popoverRef} floating={true} {...props}>
      <Slot />
    </Popover>
  );
});
