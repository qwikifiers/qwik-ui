import { QwikIntrinsicElements, useOnDocument } from '@builder.io/qwik';
import { Slot, component$, useSignal, $ } from '@builder.io/qwik';

type PopoverTriggerProps = {
  popovertarget: string;
  // TODO anchor for floatingui
  // TODO toggle? on/off?
} & QwikIntrinsicElements['button'];

export function usePopover(popovertarget: string) {
  /* NEEDS TO RUN BEFORE POLYFILL LOAD, ALSO ONLY DYNAMIC IMPORT */
  const isSupported =
    typeof HTMLElement !== 'undefined' &&
    typeof HTMLElement.prototype === 'object' &&
    'popover' in HTMLElement.prototype;

  const hasPolyfillLoadedSig = useSignal<boolean>(false);
  const didClickSig = useSignal<boolean>(false);

  const loadPolyfill$ = $(async () => {
    await import('@oddbird/popover-polyfill');
    document.dispatchEvent(new CustomEvent('poppolyload'));
  });

  const initPopover$ = $(async () => {
    if (!hasPolyfillLoadedSig.value && !isSupported) {
      await loadPolyfill$();
      hasPolyfillLoadedSig.value = true;
    }
    didClickSig.value = true;
  });

  // event is created after teleported properly
  useOnDocument(
    'showpopover',
    $(() => {
      if (!didClickSig.value) return;

      const popover = document.querySelector(`#${popovertarget}`);

      if (!popover) return;

      // calls code in here twice for some reason, we think it's because of the client re-render, but it still works

      // so it only runs once on first click
      if (!popover.classList.contains(':popover-open')) {
        // @ts-ignore
        popover.showPopover();
        console.log('inside the showpopover doc');
      }
    }),
  );

  return { initPopover$ };
}

export const PopoverTrigger = component$<PopoverTriggerProps>(
  ({ popovertarget, ...rest }: PopoverTriggerProps) => {
    const { initPopover$ } = usePopover(popovertarget);

    return (
      <button
        {...rest}
        // @ts-expect-error bad types
        popovertarget={popovertarget}
        onClick$={[rest.onClick$, $(() => initPopover$())]}
      >
        <Slot />
      </button>
    );
  },
);
