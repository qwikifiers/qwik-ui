import { component$, useContext, Slot, useTask$, PropsOf } from '@builder.io/qwik';
import { HPopoverPanel } from '../popover/popover-panel';
import { usePopover } from '../popover/use-popover';
import { HPopoverRoot } from '../popover/popover-root';

import ComboboxContextId from './combobox-context-id';
import { isServer } from '@builder.io/qwik/build';

export const HComboboxPopover = component$<PropsOf<typeof HPopoverRoot>>((props) => {
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
    <HPopoverRoot
      floating={floating}
      flip={flip}
      hover={hover}
      gutter={gutter}
      bind:anchor={context.inputRef}
      manual
      id={context.localId}
    >
      <HPopoverPanel
        data-open={context.isListboxOpenSig.value ? '' : undefined}
        data-closed={!context.isListboxOpenSig.value ? '' : undefined}
        {...rest}
      >
        <Slot />
      </HPopoverPanel>
    </HPopoverRoot>
  );
});
