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
  const panelRef = useSignal<HTMLElement | undefined>();

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
      document.dispatchEvent(new CustomEvent('getpopover', { detail: panelRef }));
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
    await initPopover$();

    if (!isSupportedSig.value) {
      // Wait until the polyfill has been loaded if necessary
      while (!hasPolyfillLoadedSig.value) {
        await new Promise((resolve) => setTimeout(resolve, 10)); // Poll every 10ms
      }
    }

    popoverSig.value?.showPopover();
  });

  const togglePopover = $(async () => {
    await initPopover$();

    if (!isSupportedSig.value) {
      // Wait until the polyfill has been loaded if necessary
      while (!hasPolyfillLoadedSig.value) {
        await new Promise((resolve) => setTimeout(resolve, 10)); // Poll every 10ms
      }
    }

    popoverSig.value?.togglePopover();
  });

  const hidePopover = $(async () => {
    await initPopover$();

    if (!isSupportedSig.value) {
      // Wait until the polyfill has been loaded if necessary
      while (!hasPolyfillLoadedSig.value) {
        await new Promise((resolve) => setTimeout(resolve, 10)); // Poll every 10ms
      }
    }

    popoverSig.value?.hidePopover();
  });

  return { showPopover, togglePopover, hidePopover, initPopover$, initialClickSig };
}

export const PopoverTrigger = component$<PopoverTriggerProps>(
  (props: PopoverTriggerProps) => {
    const context = useContext(popoverContextId);

    const triggerId = `${context.compId}-trigger`;
    const panelId = `${context.compId}-panel`;

    const { initPopover$, initialClickSig, showPopover, hidePopover } = usePopover(
      context.compId,
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
