import {
  component$,
  useContext,
  Slot,
  useTask$,
  PropsOf,
  $,
  useSignal,
} from '@builder.io/qwik';
import { usePopover } from '../popover/use-popover';
import { HPopoverPanel } from '../popover/popover-panel';

import { comboboxContextId } from './combobox-context';
import { HPopoverRoot } from '../popover/popover-root';
import { isServer } from '@builder.io/qwik/build';
import { useCombinedRef } from '../../hooks/combined-refs';
import { useDebouncer } from '../../hooks/use-debouncer';

export const HComboboxPopover = component$<PropsOf<typeof HPopoverRoot>>((props) => {
  const context = useContext(comboboxContextId);
  const { showPopover, hidePopover } = usePopover(context.localId);
  const contextRefOpts = { context, givenContextRef: context.panelRef };
  const panelRef = useCombinedRef(props.ref, contextRefOpts);
  const initialLoadSig = useSignal<boolean>(true);

  const { floating, flip, hover, gutter, ...rest } = props;

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

  const isOutside = $((rect: DOMRect, x: number, y: number) => {
    return x < rect.left || x > rect.right || y < rect.top || y > rect.bottom;
  });

  const handleDismiss$ = $(async (e: PointerEvent) => {
    if (!context.isListboxOpenSig.value) {
      return;
    }

    if (!panelRef.value || !context.controlRef.value) {
      return;
    }

    const listboxRect = panelRef.value.getBoundingClientRect();
    const boxRect = context.controlRef.value.getBoundingClientRect();
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
      bind:anchor={props['bind:anchor'] ?? context.controlRef}
      bind:panel={panelRef}
      manual
      id={context.localId}
    >
      <HPopoverPanel
        id={listboxId}
        data-open={context.isListboxOpenSig.value ? '' : undefined}
        data-closed={!context.isListboxOpenSig.value ? '' : undefined}
        data-invalid={context.isInvalidSig.value ? '' : undefined}
        role="listbox"
        aria-expanded={context.isListboxOpenSig.value ? 'true' : 'false'}
        aria-multiselectable={context.multiple ? 'true' : undefined}
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
