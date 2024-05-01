import { component$, useContext, Slot, useTask$, PropsOf } from '@builder.io/qwik';
import { usePopover } from '../popover/popover-trigger';
import { PopoverPanel } from '../popover/popover-panel';

import SelectContextId from './select-context';
import { isServer } from '@builder.io/qwik/build';
import { PopoverRoot } from '../popover/popover-root';

export const SelectPopover = component$<PropsOf<typeof PopoverRoot>>((props) => {
  const context = useContext(SelectContextId);
  const { showPopover, hidePopover } = usePopover(context.localId);

  const { floating, flip, hover, gutter, ...rest } = props;

  useTask$(async ({ track }) => {
    track(() => context.isListboxOpenSig.value);

    if (isServer) return;

    if (context.isListboxOpenSig.value) {
      await showPopover();
    } else {
      await hidePopover();
    }
  });

  return (
    <PopoverRoot
      floating={floating}
      flip={flip}
      hover={hover}
      gutter={gutter}
      bind:anchor={context.triggerRef}
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
