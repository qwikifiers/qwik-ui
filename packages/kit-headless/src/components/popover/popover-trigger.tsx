import { Slot, component$, $, PropsOf, useContext } from '@builder.io/qwik';
import { popoverContextId } from './popover-context';
import { usePopover } from './use-popover';

type PopoverTriggerProps = {
  popovertarget?: string;
  disableClickInitPopover?: boolean;
} & PropsOf<'button'>;

export const PopoverTrigger = component$<PopoverTriggerProps>(
  (props: PopoverTriggerProps) => {
    const context = useContext(popoverContextId);

    const triggerId = `${context.compId}-trigger`;
    const panelId = `${context.compId}-panel`;

    const {
      initPopover$,
      showPopover,
      hidePopover,
      hasPolyfillLoadedSig,
      isSupportedSig,
    } = usePopover(context.compId);

    const handleClick$ = $(async () => {
      if (context.hover) return;

      if (isSupportedSig.value) return;

      await initPopover$();

      while (!hasPolyfillLoadedSig.value) {
        await new Promise((resolve) => setTimeout(resolve, 10)); // Poll every 10ms
      }

      // for the first click, we need to programmatically open the popover. The spec toggles the popover on click anyways.
      if (!isSupportedSig.value) {
        if (!context.isOpenSig.value) {
          context.panelRef?.value?.showPopover();
        } else {
          context.panelRef?.value?.hidePopover();
        }
      }
    });

    const handlePointerOver$ = $(async () => {
      if (!context.hover) return;

      await showPopover();
    });

    const handlePointerOut$ = $(async () => {
      if (!context.hover) return;

      await hidePopover();
    });

    return (
      <button
        {...props}
        ref={context.triggerRef}
        id={triggerId}
        popovertarget={panelId}
        onClick$={[handleClick$, props.onClick$]}
        onPointerOver$={[handlePointerOver$, props.onPointerOver$]}
        onPointerOut$={[handlePointerOut$, props.onPointerOut$]}
        popoverTargetAction={context.hover ? 'show' : undefined}
      >
        <Slot />
      </button>
    );
  },
);
