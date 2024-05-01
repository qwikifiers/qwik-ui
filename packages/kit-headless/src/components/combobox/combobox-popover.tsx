import { component$, useContext, Slot, useTask$, PropsOf } from '@builder.io/qwik';
import { PopoverPanel } from '../popover/popover-panel';
import { usePopover } from '../popover/popover-trigger';
import { PopoverRoot } from '../popover/popover-root';

import ComboboxContextId from './combobox-context-id';
import { isServer } from '@builder.io/qwik/build';

export const ComboboxPopover = component$<PropsOf<typeof PopoverRoot>>((props) => {
  const context = useContext(ComboboxContextId);
  const { showPopover, hidePopover } = usePopover(context.localId);
  const { floating, flip, hover, gutter, ...rest } = props;

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
    <PopoverRoot
      floating={floating}
      flip={flip}
      hover={hover}
      gutter={gutter}
      bind:anchor={context.inputRef}
      manual
      id={context.localId}
    >
      <PopoverPanel
        data-open={context.isListboxOpenSig.value ? '' : undefined}
        data-closed={!context.isListboxOpenSig.value ? '' : undefined}
        {...rest}
      >
        <Slot />
      </PopoverPanel>
    </PopoverRoot>
  );
});
