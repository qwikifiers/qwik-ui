import { PopoverPanelImpl } from './popover-panel-impl';

import { component$, useTask$, Slot, PropsOf, useContext } from '@builder.io/qwik';
import {
  ReferenceElement,
  autoUpdate,
  computePosition,
  offset as _offset,
  flip as _flip,
  shift as _shift,
  hide as _hide,
  Placement,
} from '@floating-ui/dom';
import { popoverContextId } from './popover-context';
import { isServer } from '@builder.io/qwik/build';

export const FloatingPopover = component$((props: PropsOf<'div'>) => {
  const context = useContext(popoverContextId);
  // sets floating UI config
  useTask$(async ({ track, cleanup }) => {
    track(() => context.isOpenSig.value);

    if (isServer) return;

    const anchor = context.triggerRef?.value;
    const popover = context.panelRef?.value;

    if (!popover || !anchor) return;

    const updatePosition = async () => {
      const middleware = [
        _offset(context.gutter),
        _hide({ strategy: context.hide }),
        context.flip && _flip(),
        context.shift && _shift(),
      ];

      let placement;
      if (typeof context.floating === 'boolean') {
        placement = 'bottom';
      } else {
        placement = context.floating;
      }

      if (popover) {
        // ensures there is no brief flash of the popover before its placement
        popover.hidden = false;
      }

      await computePosition(anchor as ReferenceElement, popover, {
        placement: placement as Placement,
        middleware,
      }).then(async (resolvedData) => {
        const { x, y } = resolvedData;

        Object.assign(popover.style, {
          left: `${x}px`,
          top: `${y}px`,
          transform: context.transform,
        });
      });
    };

    const cleanupFunc = autoUpdate(anchor as ReferenceElement, popover, updatePosition, {
      ancestorScroll: context.ancestorScroll,
      ancestorResize: context.ancestorResize,
      elementResize: context.elementResize,
      animationFrame: context.animationFrame,
    });
    cleanup(cleanupFunc);
  });

  return (
    <PopoverPanelImpl ref={context.panelRef} {...props}>
      <Slot />
    </PopoverPanelImpl>
  );
});
