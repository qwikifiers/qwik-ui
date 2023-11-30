import { QwikIntrinsicElements } from '@builder.io/qwik';
import { Slot, component$, useSignal, $ } from '@builder.io/qwik';
import { isServer } from '@builder.io/qwik/build';
import { polyStyles } from './utils';
import './polyfill/popover.js';

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
 * DONT USE onToggle, do use onQuiPopPolyEvent - can only ever run when the polyfill has to run, so never runs on support browsers
 */

declare global {
  interface Document {
    /** We needed the polyfill */
    __QUI_POPOVER_PF__?: true;
  }
}

const isSupported =
  !isServer &&
  typeof HTMLElement !== 'undefined' &&
  typeof HTMLElement.prototype === 'object' &&
  'popover' in HTMLElement.prototype;
const loadPolyfill$ = $(async () => {
  if (document.__QUI_POPOVER_PF__) return;
  console.log('POLYFILL:', !isSupported);
  if (isSupported) return;

  document.__QUI_POPOVER_PF__ = true;

  // Run the polyfill and get the CSS

  // Inject the polyfill CSS into head BEFORE everything else so that users can override it without important or inline
  const styleNode = document.createElement('style');
  styleNode.setAttribute('data-qwik-ui-popover-polyfill', '');
  styleNode.textContent = polyStyles;
  document.head.insertBefore(styleNode, document.head.firstChild);

  // Emit custom event to indicate polyfill load
  document.dispatchEvent(new CustomEvent('quipoppolyloaded'));
});

type PopoverTriggerProps = {
  popovertarget: string;
  // TODO anchor for floatingui
  // TODO toggle? on/off?
} & QwikIntrinsicElements['button'];

export const PopoverTrigger = component$<PopoverTriggerProps>(
  ({ popovertarget, ...rest }: PopoverTriggerProps) => {
    const didClickSig = useSignal<boolean>(!isServer);

    if (!isServer) {
      console.log('rendering Trigger in client');
      // only run when rendering fresh on the client
      loadPolyfill$();
    }

    return (
      <button
        {...rest}
        // @ts-expect-error bad types
        popovertarget={didClickSig.value ? popovertarget : null}
        onClick$={[
          rest.onClick$,
          $(async () => {
            // TODO floating ui
            if (didClickSig.value) return;
            didClickSig.value = true;

            await loadPolyfill$();
            const myPopover = document.querySelector(`#${popovertarget}`);
            // @ts-expect-error bad types
            await myPopover.togglePopover();
          }),
        ]}
      >
        <Slot />
      </button>
    );
  },
);
