import {
  Placement,
  ReferenceElement,
  arrow as _arrow,
  flip as _flip,
  hide as _hide,
  offset as _offset,
  shift as _shift,
  autoUpdate,
  computePosition,
} from '@floating-ui/dom';
import { PropsOf, Slot, component$, useContext, useTask$ } from '@builder.io/qwik';

import { HPopoverPanelImpl } from './popover-panel-impl';
import { isServer } from '@builder.io/qwik/build';
import { popoverContextId } from './popover-context';

export const FloatingPopover = component$((props: PropsOf<'div'>) => {
  const context = useContext(popoverContextId);
  // sets floating UI config
  useTask$(async ({ track, cleanup }) => {
    track(() => context.isOpenSig.value);

    if (isServer) return;

    const anchor = context.anchorRef?.value
      ? context.anchorRef.value
      : context.triggerRef?.value;
    const popover = context.panelRef?.value;

    if (!popover || !anchor) return;

    const updatePosition = async () => {
      const middleware = [
        _offset(context.gutter),
        _hide({ strategy: context.hide }),
        context.flip && _flip(),
        context.shift && _shift(),
        context.arrow &&
          _arrow({
            padding: 0,
            element: context.arrowRef?.value as Element,
          }),
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

        if (resolvedData.middlewareData.arrow && context.arrowRef?.value) {
          const { x, y } = resolvedData.middlewareData.arrow;

          Object.assign(context.arrowRef.value.style, {
            left: x != null ? `${x}px` : '',
            top: y != null ? `${y}px` : '',
          });
        }
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
    <HPopoverPanelImpl hidden={true} {...props}>
      <Slot />
    </HPopoverPanelImpl>
  );
});
