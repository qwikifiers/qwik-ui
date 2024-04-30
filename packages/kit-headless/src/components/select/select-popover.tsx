import { component$, useContext, Slot, useTask$, PropsOf } from '@builder.io/qwik';
import { usePopover } from '../popover/popover-trigger';
import { PopoverPanel } from '../popover/popover-panel';

import SelectContextId from './select-context';
import { isServer } from '@builder.io/qwik/build';

export const SelectPopover = component$((props: PropsOf<'div'>) => {
  const context = useContext(SelectContextId);
  const { showPopover, hidePopover } = usePopover(context.localId);

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
    <PopoverPanel
      data-open={context.isListboxOpenSig.value ? '' : undefined}
      data-closed={!context.isListboxOpenSig.value ? '' : undefined}
      {...props}
    >
      <Slot />
    </PopoverPanel>
  );
});
