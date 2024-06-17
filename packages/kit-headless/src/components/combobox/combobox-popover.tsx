import {
  component$,
  useContext,
  Slot,
  useTask$,
  PropsOf,
  useSignal,
} from '@builder.io/qwik';
import { usePopover } from '../popover/use-popover';
import { HPopoverPanel } from '../popover/popover-panel';

import { comboboxContextId } from './combobox-context';
import { HPopoverRoot } from '../popover/popover-root';
import { isServer } from '@builder.io/qwik/build';

export const HComboboxPopover = component$<PropsOf<typeof HPopoverRoot>>((props) => {
  const context = useContext(comboboxContextId);
  const { showPopover, hidePopover } = usePopover(context.localId);

  const { floating, flip, hover, gutter, ...rest } = props;
  const initialLoadSig = useSignal<boolean>(true);

  useTask$(async ({ track }) => {
    track(() => context.isListboxOpenSig.value);

    if (isServer) return;

    if (!initialLoadSig.value) {
      if (context.isListboxOpenSig.value) {
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
