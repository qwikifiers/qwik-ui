// src/routes/impl/popover.tsx
import {
  Slot,
  component$,
  useSignal,
  $,
  useStyles$,
  useVisibleTask$,
  Signal,
} from '@builder.io/qwik';

import { isServer } from '@builder.io/qwik/build';
import popoverStyles from './popover.css?inline';

type PopoverImplProps = {
  id: string;
  popover?: 'manual' | 'auto' | true;
  ref: Signal;
  preset: 'listbox' | 'none';
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
export const PopoverImpl = component$((props: PopoverImplProps) => {
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

  // the popover
  const childRef = props.ref;

  /** have we rendered on the client yet? 0: no, 1: force, 2: yes */
  const hasRenderedOnClientSig = useSignal(isServer ? 0 : 2);
  const shouldTeleportSig = useSignal(false);

  useVisibleTask$(async ({ track, cleanup }) => {
    // polyfill missing?
    if (!document.__QUI_POPOVER_PF__) {
      // supported browser, no action needed
      if (
        typeof HTMLElement !== 'undefined' &&
        typeof HTMLElement.prototype === 'object' &&
        'popover' in HTMLElement.prototype
      ) {
        return;
      }

      await loadPolyfill$.resolve().then((fn) => fn());
    }
    if (hasRenderedOnClientSig.value === 0) {
      // Force re-render and wait for teleport signal
      hasRenderedOnClientSig.value = 1;
      track(() => shouldTeleportSig.value);
      return;
    }

    let polyfillContainer: HTMLDivElement | null = document.querySelector(
      'div[data-qwik-ui-popover-polyfill]',
    );

    if (!polyfillContainer) {
      polyfillContainer = document.createElement('div');
      polyfillContainer.setAttribute('data-qwik-ui-popover-polyfill', '');
      document.body.appendChild(polyfillContainer);
    }

    if (childRef.value) {
      polyfillContainer.appendChild(childRef.value);
    }

    // TODO test if children's Qwik cleanup runs
    cleanup(() => childRef.value?.remove());
  });

  // This forces a re-render when the signal changes
  if (hasRenderedOnClientSig.value === 1) {
    console.log('yey rerendered');
    // Now run the task again
    setTimeout(() => (shouldTeleportSig.value = true), 0);
  }

  // If we are rendering on on unsupported browser without SSR, we might need to load the polyfill
  if (!isServer && !document.__QUI_POPOVER_PF__) {
    // We don't await this because we don't want to block the render
    // The user most likely won't click a popover trigger before the polyfill loads
    loadPolyfill$.resolve().then((fn) => fn());
  }

  /**
   * We put our popover div in a div we control so we can teleport it out and back without worry
   * The data-popover-pf div is used to signal loading of the polyfill. It receives the useVisibleTask$() handler.
   * It is hidden by CSS when popover is supported, so then it never fires.
   */
  return (
    <>
      {isServer && <div data-qui-popover-pf />}
      <div
        class={props.preset || ''}
        id={props.id}
        ref={childRef}
        // @ts-ignore
        popover={props.popover ?? true}
      >
        <Slot />
      </div>
    </>
  );
});
