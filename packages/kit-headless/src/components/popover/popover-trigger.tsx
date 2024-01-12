import {
  useOnDocument,
  useTask$,
  Slot,
  component$,
  useSignal,
  $,
  PropsOf,
} from '@builder.io/qwik';
import { isBrowser } from '@builder.io/qwik/build';

type PopoverTriggerProps = {
  popovertarget: string;
  disableClickInitPopover?: boolean;
} & PropsOf<'button'>;

export function usePopover(popovertarget: string) {
  const hasPolyfillLoadedSig = useSignal<boolean>(false);
  const isSupportedSig = useSignal<boolean>(false);

  const didInteractSig = useSignal<boolean>(false);
  const popoverSig = useSignal<HTMLElement | null>(null);

  const loadPolyfill$ = $(async () => {
    await import('@oddbird/popover-polyfill');
    document.dispatchEvent(new CustomEvent('poppolyload'));
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
      hasPolyfillLoadedSig.value = true;
    }
    didInteractSig.value = true;
  });

  useTask$(({ track }) => {
    track(() => didInteractSig.value);

    if (!isBrowser) return;

    // get popover
    if (!popoverSig.value) {
      popoverSig.value = document.getElementById(popovertarget);
    }

    // so it only runs once on click for supported browsers
    if (isSupportedSig.value) {
      if (!popoverSig.value) return;

      if (popoverSig.value && popoverSig.value.hasAttribute('popover')) {
        /* opens manual on any event */
        popoverSig.value.showPopover();
      }
    }
  });

  // event is created after teleported properly
  useOnDocument(
    'showpopover',
    $(() => {
      if (!didInteractSig.value) return;

      if (!popoverSig.value) return;

      // calls code in here twice for some reason, we think it's because of the client re-render, but it still works

      // so it only runs once on first click
      if (!popoverSig.value.classList.contains(':popover-open')) {
        popoverSig.value.showPopover();
      }
    }),
  );

  const showPopover = $(async () => {
    if (!didInteractSig.value) {
      await initPopover$();
    }
    popoverSig.value?.showPopover();
  });

  const togglePopover = $(async () => {
    if (!didInteractSig.value) {
      await initPopover$();
    }
    popoverSig.value?.togglePopover();
  });

  const hidePopover = $(async () => {
    if (!didInteractSig.value) {
      await initPopover$();
    }
    popoverSig.value?.hidePopover();
  });

  return { showPopover, togglePopover, hidePopover, initPopover$ };
}

export const PopoverTrigger = component$<PopoverTriggerProps>(
  ({ popovertarget, disableClickInitPopover = false, ...rest }: PopoverTriggerProps) => {
    const { initPopover$ } = usePopover(popovertarget);

    return (
      <button
        {...rest}
        popovertarget={popovertarget}
        onClick$={[
          rest.onClick$,
          !disableClickInitPopover
            ? $(async () => {
                await initPopover$();
              })
            : undefined,
        ]}
      >
        <Slot />
      </button>
    );
  },
);
