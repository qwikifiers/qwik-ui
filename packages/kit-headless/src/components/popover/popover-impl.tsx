// src/routes/impl/popover.tsx
import {
  Slot,
  component$,
  useSignal,
  useOn,
  $,
  useTask$,
  useStyles$,
  Signal,
} from '@builder.io/qwik';

import { isServer } from '@builder.io/qwik/build';
import popoverStyles from './popover.css?inline';

type PopoverProps = {
  id: string;
  popover?: string;
  ref: Signal;
  preset?: 'listbox' | 'none';
};

declare global {
  interface Document {
    __QUI_POPOVER_PF__?: true;
  }
}

export const loadPolyfill$ = $(async () => {
  const isSupported =
    typeof HTMLElement !== 'undefined' &&
    typeof HTMLElement.prototype === 'object' &&
    'popover' in HTMLElement.prototype;
  console.log('POLYFILL:', !isSupported);
  if (isSupported) return;
  document.__QUI_POPOVER_PF__ = true;
  if (document.querySelector('style[data-qwik-ui-popover-polyfill]')) return;
  // Run the polyfill and get the CSS
  const [, { default: css }] = await Promise.all([
    import('@oddbird/popover-polyfill'),
    import('@oddbird/popover-polyfill/dist/popover.css?inline'),
  ]);
  // Inject the polyfill CSS into head
  const styleNode = document.createElement('style');
  styleNode.setAttribute('data-qwik-ui-popover-polyfill', '');
  styleNode.textContent = css;
  document.head.appendChild(styleNode);
});

// This component is a polyfill for the popover API
// It is complex because it optimizes for supported browsers
export const PopoverImpl = component$((props: PopoverProps) => {
  // On supported browsers (no SSR), just render the popover
  if (
    !isServer &&
    !document.__QUI_POPOVER_PF__ &&
    typeof HTMLElement !== 'undefined' &&
    typeof HTMLElement.prototype === 'object' &&
    'popover' in HTMLElement.prototype
  ) {
    return (
      <div
        id={props.id}
        // @ts-ignore
        popover={props.popover ?? true}
      >
        <Slot />
      </div>
    );
  }
  // The below applies to SSR and unsupported browsers

  // We must inject some minimal hiding CSS while the polyfill loads
  useStyles$(popoverStyles);

  // By putting the polyfill in useOn without capturing external
  // scope, we can load the polyfill on load without waking up the framework
  // Note, this event only happens once per page load
  useOn('qvisible', loadPolyfill$);

  // original parent before teleport
  const baseRef = useSignal<HTMLElement>();

  // the popover
  const childRef = props.ref;

  // do we need to teleport?
  const shouldTeleportSig = useSignal(false);
  // have we rendered on the client yet? 0: no, 1: from start, 2: from task
  const hasRenderedOnClientSig = useSignal(isServer ? 0 : 1);

  // Teleport the popover to the body if needed
  useTask$(({ track, cleanup }) => {
    const poppedOut = track(() => shouldTeleportSig.value);
    // During SSR, this will always be false and just tracks the signal
    if (!poppedOut) return;

    // We need to rerender once on the client to register the slot
    // This allows us to move the wrapping div and Qwik will still find the slot inside
    const hasClientRendered = track(() => hasRenderedOnClientSig.value);
    if (!hasClientRendered) {
      // ask to rerender
      hasRenderedOnClientSig.value = 2;
      // prepare to be called again;
      shouldTeleportSig.value = false;
      return;
    }

    let polyfillContainer: HTMLDivElement | null = document.querySelector(
      'div[data-qwik-ui-popover-polyfill]',
    );
    if (!polyfillContainer) {
      polyfillContainer = document.createElement('div');
      polyfillContainer.setAttribute('data-qwik-ui-popover-polyfill', '');
      polyfillContainer.style.position = 'fixed';
      document.body.appendChild(polyfillContainer);
    }

    if (childRef.value) {
      polyfillContainer.appendChild(childRef.value);
    }

    cleanup(() => baseRef.value?.appendChild(childRef.value as Node));
  });

  // This forces a re-render when the signal changes
  const forcedRerender = hasRenderedOnClientSig.value === 2;
  if (forcedRerender) {
    console.log('forced rerender');
    // Now pop out again to run the task
    setTimeout(() => (shouldTeleportSig.value = true), 0);
  }

  // If we are rendering on on unsupported browser without SSR, we might need to load the polyfill
  if (!isServer && !document.__QUI_POPOVER_PF__) {
    // We don't await this because we don't want to block the render
    // The user most likely won't click a popover trigger before the polyfill loads
    loadPolyfill$.resolve().then((fn) => fn());
  }
  type ToggleEvent = {
    newState: string;
  };

  /**
   * We put our popover div in a div we control so we can teleport it out and back without worry
   * The data-popover-pf div is used to signal loading of the polyfill. It receives the useOn().
   * It is hidden by CSS when popover is supported, so then it never fires.
   */
  return (
    <>
      {isServer && <div data-qui-popover-pf />}
      <div ref={baseRef} data-qui-popover-base>
        <div
          id={props.id}
          class={props.preset || ''}
          onToggle$={$((e: ToggleEvent) => {
            if (!document.__QUI_POPOVER_PF__) {
              // We resumed on a supported browser, no action needed
              return;
            }

            console.log(`TOGGLE!`);

            shouldTeleportSig.value = true;
          })}
          ref={childRef}
          // @ts-ignore
          popover={props.popover ?? true}
        >
          <Slot />
        </div>
      </div>
    </>
  );
});
