import {
  PropsOf,
  Slot,
  component$,
  useContext,
  useSignal,
  useTask$,
} from '@builder.io/qwik';

import { HPopoverPanel } from '../popover/popover-panel';
import { HPopoverRoot } from '../popover/popover-root';
import { dropdownContextId } from './dropdown-context';
import { isServer } from '@builder.io/qwik/build';
import { usePopover } from '../popover/use-popover';

export const HDropdownPopover = component$<PropsOf<typeof HPopoverRoot>>((props) => {
  const context = useContext(dropdownContextId);
  const { showPopover, hidePopover } = usePopover(context.localId);

  const { floating, flip, hover, gutter, ...rest } = props;
  const initialLoadSig = useSignal<boolean>(true);

  useTask$(async ({ track }) => {
    track(() => context.isOpenSig.value);

    if (isServer) return;

    if (!initialLoadSig.value) {
      if (context.isOpenSig.value) {
        showPopover();
      } else {
        hidePopover();
      }
    }
  });

  useTask$(() => {
    initialLoadSig.value = false;
  });

  return (
    <HPopoverRoot
      floating={floating}
      flip={flip}
      hover={hover}
      gutter={gutter}
      bind:anchor={context.triggerRef}
      manual
      id={context.localId}
    >
      <HPopoverPanel
        data-open={context.isOpenSig.value ? true : undefined}
        data-closed={!context.isOpenSig.value ? true : undefined}
        {...rest}
      >
        <Slot />
      </HPopoverPanel>
    </HPopoverRoot>
  );
});
