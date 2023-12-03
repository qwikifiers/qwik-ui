import { QwikIntrinsicElements, useOnDocument, useTask$ } from '@builder.io/qwik';
import { Slot, component$, useSignal, $ } from '@builder.io/qwik';
import { isBrowser } from '@builder.io/qwik/build';

type PopoverTriggerProps = {
  popovertarget: string;
  // TODO anchor for floatingui
  // TODO toggle? on/off?
} & QwikIntrinsicElements['button'];

export function usePopover(popovertarget: string) {
  const hasPolyfillLoadedSig = useSignal<boolean>(false);
  const didInteractSig = useSignal<boolean>(false);
  const isSupportedSig = useSignal<boolean>(false);

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
    console.log('INSIDE HERE: ', isSupportedSig.value);

    if (!hasPolyfillLoadedSig.value && !isSupported) {
      await loadPolyfill$();
      hasPolyfillLoadedSig.value = true;
    }
    didInteractSig.value = true;
  });

  useTask$(({ track }) => {
    track(() => didInteractSig.value);

    if (isBrowser && isSupportedSig.value) {
      const popover = document.getElementById(popovertarget);

      if (!popover) return;

      console.log('inside interact task: ', popover);
      console.log('popover id: ', popovertarget);

      if (popover && popover.hasAttribute('popover')) {
        popover.showPopover();
      }
    }
  });

  // event is created after teleported properly
  useOnDocument(
    'showpopover',
    $(() => {
      if (!didInteractSig.value) return;

      const popover = document.querySelector(`#${popovertarget}`);

      if (!popover) return;

      // calls code in here twice for some reason, we think it's because of the client re-render, but it still works

      // so it only runs once on first click
      if (!popover.classList.contains(':popover-open')) {
        // @ts-ignore
        popover.showPopover();
      }
    }),
  );

  return { initPopover$, isSupportedSig };
}

export const PopoverTrigger = component$<PopoverTriggerProps>(
  ({ popovertarget, ...rest }: PopoverTriggerProps) => {
    const { initPopover$, isSupportedSig } = usePopover(popovertarget);

    return (
      <button
        {...rest}
        // @ts-expect-error bad types
        popovertarget={popovertarget}
        onClick$={[
          rest.onClick$,
          $(() => {
            console.log('isSupported: ', isSupportedSig.value);
            initPopover$();
          }),
        ]}
      >
        <Slot />
      </button>
    );
  },
);
