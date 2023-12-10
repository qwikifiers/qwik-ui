import { QwikIntrinsicElements, useOnDocument, useTask$ } from '@builder.io/qwik';
import { Slot, component$, useSignal, $ } from '@builder.io/qwik';
import { isBrowser } from '@builder.io/qwik/build';

type PopoverTriggerProps = {
  popovertarget: string;
  disableClickInitPopover?: boolean;
} & QwikIntrinsicElements['button'];

export function usePopover(popovertarget: string) {
  const hasPolyfillLoadedSig = useSignal<boolean>(false);
  const isSupportedSig = useSignal<boolean>(false);

  const didInteractSig = useSignal<boolean>(false);
  const popoverSig = useSignal<HTMLElement | null>(null);

  const hookExecutedSig = useSignal<boolean>(false);

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
      const popover = popoverSig.value;

      if (!popover) return;

      if (popover && popover.hasAttribute('popover')) {
        popover.showPopover();
      }
    }

    console.log('HOOK EXECUTED');
    hookExecutedSig.value = true;
  });

  // event is created after teleported properly
  useOnDocument(
    'showpopover',
    $(() => {
      if (!didInteractSig.value) return;

      const popover = popoverSig.value;

      if (!popover) return;

      // calls code in here twice for some reason, we think it's because of the client re-render, but it still works

      // so it only runs once on first click
      if (!popover.classList.contains(':popover-open')) {
        popover.showPopover();
      }
    }),
  );

  return { initPopover$ };
}

export const PopoverTrigger = component$<PopoverTriggerProps>(
  ({ popovertarget, disableClickInitPopover = false, ...rest }: PopoverTriggerProps) => {
    const { initPopover$ } = usePopover(popovertarget);

    return (
      <button
        {...rest}
        // @ts-expect-error bad types
        popovertarget={popovertarget}
        onClick$={[
          rest.onClick$,
          !disableClickInitPopover
            ? $(() => {
                initPopover$();
              })
            : undefined,
        ]}
      >
        <Slot />
      </button>
    );
  },
);
