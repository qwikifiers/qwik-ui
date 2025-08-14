import {
  component$,
  useContext,
  Slot,
  useTask$,
  PropsOf,
  $,
  useSignal,
  useStyles$,
} from '@builder.io/qwik';
import { usePopover } from '../popover/use-popover';
import { HPopoverPanel } from '../popover/popover-panel';

import { dropdownContextId } from './dropdown-context';
import { HPopoverRoot } from '../popover/popover-root';
import { isServer } from '@builder.io/qwik/build';
import { useDebouncer } from '../../hooks/use-debouncer';
import styles from './dropdown.css?inline';

export const HDropdownPopover = component$<PropsOf<typeof HPopoverRoot>>((props) => {
  useStyles$(styles);
  const context = useContext(dropdownContextId);
  const { showPopover, hidePopover } = usePopover(context.localId);
  const initialLoadSig = useSignal<boolean>(true);

  const { floating, flip, hover, gutter, shift, ...rest } = props;

  useTask$(async ({ track }) => {
    track(() => context.isOpenSig.value);

    if (isServer) return;

    if (!initialLoadSig.value) {
      if (context.isOpenSig.value) {
        await showPopover();
      } else {
        await hidePopover();
      }
    }
  });

  const menuId = `${context.localId}-panel`;

  const isOutside = $((rect: DOMRect, x: number, y: number) => {
    return x < rect.left || x > rect.right || y < rect.top || y > rect.bottom;
  });

  const handleDismiss$ = $(async (e: PointerEvent) => {
    if (!context.isOpenSig.value) {
      return;
    }

    if (!context.panelRef.value || !context.triggerRef.value) {
      return;
    }

    const menuRect = context.panelRef.value.getBoundingClientRect();
    const triggerRect = context.triggerRef.value.getBoundingClientRect();
    const { clientX, clientY } = e;

    const isOutsideMenu = await isOutside(menuRect, clientX, clientY);
    const isOutsideTrigger = await isOutside(triggerRect, clientX, clientY);

    if (isOutsideMenu && isOutsideTrigger) {
      context.isOpenSig.value = false;
    }
  });

  // Dismiss code should only matter when the menu is open
  useTask$(({ track, cleanup }) => {
    track(() => context.isOpenSig.value);

    if (isServer) return;

    if (context.isOpenSig.value) {
      window.addEventListener('pointerdown', handleDismiss$);
    }

    cleanup(() => {
      window.removeEventListener('pointerdown', handleDismiss$);
    });
  });

  useTask$(() => {
    initialLoadSig.value = false;
  });

  const resetScrollMove = useDebouncer(
    $(() => {
      context.isMouseOverPopupSig.value = false;
    }),
    650,
  );

  return (
    <HPopoverRoot
      floating={floating}
      flip={flip}
      hover={hover}
      gutter={gutter}
      bind:anchor={props['bind:anchor'] ?? context.triggerRef}
      bind:panel={context.panelRef}
      manual
      id={context.localId}
      style={{ display: 'contents' }}
      shift={shift}
    >
      <HPopoverPanel
        id={menuId}
        data-open={context.isOpenSig.value ? '' : undefined}
        data-closed={!context.isOpenSig.value ? '' : undefined}
        role="menu"
        aria-expanded={context.isOpenSig.value ? 'true' : 'false'}
        onMouseMove$={async () => {
          context.isMouseOverPopupSig.value = true;

          await resetScrollMove();
        }}
        onMouseOut$={() => (context.isMouseOverPopupSig.value = false)}
        onKeyDown$={() => (context.isMouseOverPopupSig.value = true)}
        {...rest}
      >
        <Slot />
      </HPopoverPanel>
    </HPopoverRoot>
  );
});
