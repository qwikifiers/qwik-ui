import { QwikIntrinsicElements } from '@builder.io/qwik';
import { Slot, component$, useSignal, $ } from '@builder.io/qwik';
import { isServer } from '@builder.io/qwik/build';
// import './polyfill/popover.js';
// import { isSupported } from './polyfill/popover.js';

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
 *   - send quiPopoverPoly event (new custom event) => all Popover components render and pop out but stay hidden
 * 3. Load floating ui
 * 4. Call .showPopover() on the popovertarget
 * 5. add popovertarget attribute to button and remove onClick$
 *
 *
 * DONT USE onToggle, do use onPopPolyLoad$ - can only ever run when the polyfill has to run, so never runs on support browsers
 */

declare global {
  interface Document {
    /** We needed the polyfill */
    __QUI_POPOVER_PF__?: true;
  }
}

/* NEEDS TO RUN BEFORE POLYFILL LOAD, ALSO ONLY DYNAMIC IMPORT */
const isSupported =
  typeof HTMLElement !== 'undefined' &&
  typeof HTMLElement.prototype === 'object' &&
  'popover' in HTMLElement.prototype;

const loadPolyfill$ = $(async () => {
  if (document.__QUI_POPOVER_PF__) return;

  /* TODO: Get correct polyfill conditional */
  // console.log('POLYFILL:', !isSupported);
  // if (isSupported) return;

  document.__QUI_POPOVER_PF__ = true;

  await import('@oddbird/popover-polyfill');

  // Emit custom event to indicate polyfill load
  document.dispatchEvent(new CustomEvent('poppolyload'));
  console.log('inside polyfill!');
});

type PopoverTriggerProps = {
  popovertarget: string;
  // TODO anchor for floatingui
  // TODO toggle? on/off?
} & QwikIntrinsicElements['button'];

export const PopoverTrigger = component$<PopoverTriggerProps>(
  ({ popovertarget, ...rest }: PopoverTriggerProps) => {
    const didClickSig = useSignal<boolean>(!isServer);
    const hasPolyfillLoadedSig = useSignal<boolean>(false);

    return (
      <button
        {...rest}
        // @ts-expect-error bad types
        popovertarget={didClickSig.value ? popovertarget : null}
        onClick$={[
          rest.onClick$,
          $(async () => {
            if (didClickSig.value) return;
            didClickSig.value = true;

            console.log('click!');

            console.log(isSupported);

            if (!hasPolyfillLoadedSig.value && !isSupported) {
              await loadPolyfill$();
              hasPolyfillLoadedSig.value = true;
            }

            // TODO: floating ui
          }),
        ]}
      >
        <Slot />
      </button>
    );
  },
);
