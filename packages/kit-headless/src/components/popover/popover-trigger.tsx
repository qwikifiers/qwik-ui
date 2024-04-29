import {
  useOnDocument,
  useTask$,
  Slot,
  component$,
  useSignal,
  $,
  PropsOf,
  useContext,
} from '@builder.io/qwik';
import { isBrowser } from '@builder.io/qwik/build';
import { popoverContextId } from './popover-context';

type PopoverTriggerProps = {
  popovertarget?: string;
  disableClickInitPopover?: boolean;
} & PropsOf<'button'>;

export function usePopover(customId?: string) {
  const hasPolyfillLoadedSig = useSignal<boolean>(false);
  const isSupportedSig = useSignal<boolean>(false);

  const didInteractSig = useSignal<boolean>(false);
  const popoverSig = useSignal<HTMLElement | null>(null);
  const initialClickSig = useSignal<boolean>(false);
  const isCSRSig = useSignal<boolean>(false);

  const loadPolyfill$ = $(async () => {
    document.dispatchEvent(new CustomEvent('poppolyload'));
  });

  useTask$(() => {
    if (isBrowser) {
      isCSRSig.value = true;
    }
  });

  const initPopover$ = $(async () => {
    /* needs to run before poly load */
    const isSupported =
      typeof HTMLElement !== 'undefined' &&
      typeof HTMLElement.prototype === 'object' &&
      'popover' in HTMLElement.prototype;

    isSupportedSig.value = isSupported;

    if (!hasPolyfillLoadedSig.value && !isSupported) {
      await loadPolyfill$();
    }

    if (!didInteractSig.value) {
      if (popoverSig.value === null) {
        popoverSig.value = document.getElementById(`${customId}-panel`);
      }

      didInteractSig.value = true;
    }

    return popoverSig.value;
  });

  // event is created after teleported properly
  useOnDocument(
    'showpopoverpoly',
    $(async () => {
      if (!didInteractSig.value) return;

      // make sure to load the polyfill after the client re-render
      await import('@oddbird/popover-polyfill');

      hasPolyfillLoadedSig.value = true;
    }),
  );

  const showPopover = $(async () => {
    const popover = await initPopover$();

    if (!isSupportedSig.value) {
      // Wait until the polyfill has been loaded if necessary
      while (!hasPolyfillLoadedSig.value) {
        await new Promise((resolve) => setTimeout(resolve, 10)); // Poll every 10ms
      }
    }

    if (popover && 'showPopover' in popover) {
      popover.showPopover();
    }
  });

  const togglePopover = $(async () => {
    const popover = await initPopover$();

    if (!isSupportedSig.value) {
      // Wait until the polyfill has been loaded if necessary
      while (!hasPolyfillLoadedSig.value) {
        await new Promise((resolve) => setTimeout(resolve, 10)); // Poll every 10ms
      }
    }

    if (popover) {
      popover.togglePopover();
    }
  });

  const hidePopover = $(async () => {
    const popover = await initPopover$();

    if (!isSupportedSig.value) {
      // Wait until the polyfill has been loaded if necessary
      while (!hasPolyfillLoadedSig.value) {
        await new Promise((resolve) => setTimeout(resolve, 10)); // Poll every 10ms
      }
    }

    if (popover) {
      popover.hidePopover();
    }
  });

  return { showPopover, togglePopover, hidePopover, initPopover$, initialClickSig };
}

export const PopoverTrigger = component$<PopoverTriggerProps>(
  (props: PopoverTriggerProps) => {
    const context = useContext(popoverContextId);

    const triggerId = `${context.id}-trigger`;
    const panelId = `${context.id}-panel`;

    const { initPopover$, initialClickSig, showPopover, hidePopover } = usePopover(
      context.id,
    );

    const handleClick$ = $(async () => {
      if (context.hover) return;

      initialClickSig.value = true;
      await initPopover$();
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
