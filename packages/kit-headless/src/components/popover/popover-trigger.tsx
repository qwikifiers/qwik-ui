import { QwikIntrinsicElements, useOnDocument } from '@builder.io/qwik';
import { Slot, component$, useSignal, $ } from '@builder.io/qwik';

/**
 * A Trigger toggles a Popover given by targetId.
 *
 * On first click in a browser after SSR, it will load a polyfill if needed
 *
 * Scenarios:
 * - render SSR: do not set popovertarget, add onClick for polyfill. This way we have time to load the polyfill
 * - render in client: ensure polyfill, set popovertarget
 *
 * Two libraries are loaded: polyfill if needed, and floating-ui.
 * After we load the polyfill, we send a custom event so that all Popover components do their popout, which is needed to fake a toplayer.
 *
 * Loading timeline:
 * 1. User clicks trigger after SSR
 * 2. onClick$ checks if polyfill needed
 *   - await polyfill
 *   - send onPopPoly event (new custom event) => all Popover components render and pop out but stay hidden
 * 3. Load floating ui
 * 4. Call .showPopover() on the popovertarget
 * 5. add popovertarget attribute to button and remove onClick$
 *
 *
 * DONT USE onToggle, do use onPopPolyLoad$ - can only ever run when the polyfill has to run, so never runs on support browsers
 */

/* NEEDS TO RUN BEFORE POLYFILL LOAD, ALSO ONLY DYNAMIC IMPORT */
const isSupported =
  typeof HTMLElement !== 'undefined' &&
  typeof HTMLElement.prototype === 'object' &&
  'popover' in HTMLElement.prototype;

const loadPolyfill$ = $(async () => {
  await import('@oddbird/popover-polyfill');

  // Emit custom event to indicate polyfill load
  document.dispatchEvent(new CustomEvent('poppolyload'));
});

type PopoverTriggerProps = {
  popovertarget: string;
  // TODO anchor for floatingui
  // TODO toggle? on/off?
} & QwikIntrinsicElements['button'];

export const PopoverTrigger = component$<PopoverTriggerProps>(
  ({ popovertarget, ...rest }: PopoverTriggerProps) => {
    const hasPolyfillLoadedSig = useSignal<boolean>(false);
    const didClickSig = useSignal<boolean>(false);

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

    return (
      <button
        {...rest}
        // @ts-expect-error bad types
        popovertarget={popovertarget}
        onClick$={[
          rest.onClick$,
          $(async () => {
            console.log('click!');

            console.log(isSupported);

            if (!hasPolyfillLoadedSig.value && !isSupported) {
              await loadPolyfill$();
              hasPolyfillLoadedSig.value = true;
            }

            didClickSig.value = true;
          }),
        ]}
      >
        <Slot />
      </button>
    );
  },
);
