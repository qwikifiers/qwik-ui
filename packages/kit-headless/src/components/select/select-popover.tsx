import {
  component$,
  useContext,
  Slot,
  useTask$,
  PropsOf,
  useSignal,
  $,
} from '@builder.io/qwik';
import { usePopover } from '../popover/use-popover';
import { HPopoverPanel } from '../popover/popover-panel';

import selectContextId from './select-context';
import { HPopoverRoot } from '../popover/popover-root';
import { isServer } from '@builder.io/qwik/build';
import { useCombinedRef } from '../../hooks/combined-refs';

export const HSelectPopover = component$<PropsOf<typeof HPopoverRoot>>((props) => {
  const context = useContext(selectContextId);
  const { showPopover, hidePopover } = usePopover(context.localId);
  const contextRefOpts = { context, givenContextRef: context.popoverRef };
  const panelRef = useCombinedRef(props.ref, contextRefOpts);

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

  const listboxId = `${context.localId}-panel`;
  const triggerId = `${context.localId}-trigger`;

  const isOutside = $((rect: DOMRect, x: number, y: number) => {
    return x < rect.left || x > rect.right || y < rect.top || y > rect.bottom;
  });

  const handleDismiss$ = $(async (e: PointerEvent) => {
    if (!context.isListboxOpenSig.value) {
      return;
    }

    if (!context.popoverRef.value || !context.triggerRef.value) {
      return;
    }

    const listboxRect = context.popoverRef.value.getBoundingClientRect();
    const boxRect = context.triggerRef.value.getBoundingClientRect();
    const { clientX, clientY } = e;

    const isOutsideListbox = await isOutside(listboxRect, clientX, clientY);
    const isOutsideBox = await isOutside(boxRect, clientX, clientY);

    if (isOutsideListbox && isOutsideBox) {
      context.isListboxOpenSig.value = false;
    }
  });

  // Dismiss code should only matter when the listbox is open
  useTask$(({ track, cleanup }) => {
    track(() => context.isListboxOpenSig.value);

    if (isServer) return;

    if (context.isListboxOpenSig.value) {
      window.addEventListener('pointerdown', handleDismiss$);
    }

    cleanup(() => {
      window.removeEventListener('pointerdown', handleDismiss$);
    });
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
      bind:anchor={props['bind:anchor'] ?? context.triggerRef}
      bind:panel={panelRef}
      manual
      id={context.localId}
    >
      <HPopoverPanel
        id={listboxId}
        data-open={context.isListboxOpenSig.value ? '' : undefined}
        data-closed={!context.isListboxOpenSig.value ? '' : undefined}
        data-invalid={context.isInvalidSig?.value ? '' : undefined}
        role="listbox"
        aria-expanded={context.isListboxOpenSig.value ? 'true' : undefined}
        aria-multiselectable={context.multiple ? 'true' : undefined}
        aria-labelledby={triggerId}
        {...rest}
      >
        <Slot />
      </HPopoverPanel>
    </HPopoverRoot>
  );
});
