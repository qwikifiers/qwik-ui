// src/routes/impl/popover.tsx
import {
  Slot,
  component$,
  useSignal,
  $,
  useStyles$,
  useVisibleTask$,
  useContext,
  type Signal,
  type ClassList,
  type QwikAnimationEvent,
  type QwikTransitionEvent,
  createContextId,
} from '@builder.io/qwik';

import { polyStyles } from './utils';

import { isServer } from '@builder.io/qwik/build';
import popoverStyles from './popover.css?inline';

export type PopoverImplProps = {
  id: string;
  popover?: 'manual' | 'auto' | true;
  class?: ClassList;
  popoverRef?: Signal<HTMLElement | undefined>;
  manual?: boolean;
  entryAnimation?: string;
  exitAnimation?: string;
  animation?: boolean;
  transition?: boolean;
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
  await import('@oddbird/popover-polyfill');
  // Inject the polyfill CSS into head BEFORE everything else so that users can override it without important or inline
  let styleNode: HTMLStyleElement | null = document.querySelector(
    'style[data-qwik-ui-popover-polyfill]',
  );

  if (!styleNode) {
    styleNode = document.createElement('style');
    styleNode.setAttribute('data-qwik-ui-popover-polyfill', '');
    styleNode.textContent = polyStyles;
    document.head.insertBefore(styleNode, document.head.firstChild);
  }
});

const portalContextId = createContextId('portal-context-id');

/**
 *
 * Portal Context in Qwik, akin to React's Portal, enables element teleportation. Rendering this component forces Qwik to parse the vDOM, enabling efficient context retrieval.
 *
 * TODO: RENDER PORTAL CONTEXT ON CLICK INSTEAD OF FORCE RERENDER
 *
 * 1. Render on client -> don't need anything
 *
 * 2. SSR -> click -> force context the one time.
 *
 */
export const PortalContext = component$(() => {
  // @ts-expect-error 2769
  useContext(portalContextId, null);
  return null;
});

/**
 *  This component is a polyfill for MDN's popover API. It enables the usage of popovers across browsers.
 *
 */
export const PopoverImpl = component$<PopoverImplProps>((props) => {
  console.log('rendering');
  // We must inject some minimal hiding CSS while the polyfill loads, and the preset class
  useStyles$(popoverStyles);

  // On supported browsers (no SSR), just render the popover
  // TODO: Stick in variable
  if (
    !isServer &&
    !document.__QUI_POPOVER_PF__ &&
    typeof HTMLElement !== 'undefined' &&
    typeof HTMLElement.prototype === 'object' &&
    'popover' in HTMLElement.prototype
  ) {
    return (
      <div
        popover={props.manual || props.popover === 'manual' ? 'manual' : 'auto'}
        // preset to override user agent styles
        class={props.class}
        {...props}
        ref={props.popoverRef}
      >
        <Slot />
      </div>
    );
  }
  // The below applies to SSR and unsupported browsers

  const baseRef = useSignal<HTMLElement | undefined>(undefined);
  // the popover
  const childRef = useSignal<HTMLElement | undefined>(undefined);
  // animations
  const isPopoverOpenSig = useSignal<boolean>(false);

  /** have we rendered on the client yet? 0: no, 1: force, 2: yes */
  const hasRenderedOnClientSig = useSignal(isServer ? 0 : 2);
  const shouldTeleportSig = useSignal(false);

  useVisibleTask$(
    async ({ track, cleanup }) => {
      // prevents animation flickers across browsers
      if (props.animation && props.entryAnimation) {
        childRef.value?.classList.add(props.entryAnimation);
      }
      console.log('visible task');
      // polyfill missing?
      if (!document.__QUI_POPOVER_PF__) {
        if (
          typeof HTMLElement !== 'undefined' &&
          typeof HTMLElement.prototype === 'object' &&
          'popover' in HTMLElement.prototype
        ) {
          if (props.popoverRef) props.popoverRef.value = childRef.value;
          // supported browser, no further action needed
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
        if (props.popoverRef) props.popoverRef.value = childRef.value;
        polyfillContainer.appendChild(childRef.value);

        cleanup(() => childRef.value && baseRef.value?.appendChild(childRef.value));
      }
    },
    { strategy: 'document-idle' },
  );

  // This forces a re-render when the signal changes
  if (hasRenderedOnClientSig.value === 1) {
    console.log('yey rerendered');
    // Now run the task again
    setTimeout(() => (shouldTeleportSig.value = true), 0);
  }

  // // If we are rendering on on unsupported browser without SSR, we might need to load the polyfill
  // if (!isServer && !document.__QUI_POPOVER_PF__) {
  //   // We don't await this because we don't want to block the render
  //   // The user most likely won't click a popover trigger before the polyfill loads
  //   loadPolyfill$.resolve().then((fn) => fn());
  // }

  /**
   * We put our popover div in a div we control so we can teleport it out and back without worry
   * The data-popover-pf div is used to signal loading of the polyfill. It receives the useVisibleTask$() handler.
   * It is hidden by CSS when popover is supported, so then it never fires.
   */

  const animationHandlers =
    props.entryAnimation || props.exitAnimation
      ? {
          onBeforeToggle$: $((event: QwikAnimationEvent<HTMLDivElement>) => {
            const popoverElement = event.target as HTMLElement;
            popoverElement.classList.add('animating');

            if (props.animation) {
              if (!isPopoverOpenSig.value && props.entryAnimation) {
                popoverElement.classList.add(props.entryAnimation);
              } else if (isPopoverOpenSig.value && props.exitAnimation) {
                popoverElement.classList.add(props.exitAnimation);
              }
            }
          }),
          onAnimationEnd$: $((event: QwikAnimationEvent<HTMLDivElement>) => {
            const popoverElement = event.target as HTMLElement;

            if (props.entryAnimation) {
              popoverElement.classList.remove(props.entryAnimation);
            }

            if (props.exitAnimation) {
              popoverElement.classList.remove(props.exitAnimation);
            }

            popoverElement.classList.remove('animating');
          }),
          onTransitionEnd$: $((event: QwikTransitionEvent<HTMLDivElement>) => {
            const popoverElement = event.target as HTMLElement;

            popoverElement.classList.remove('animating');
          }),
        }
      : {};

  return (
    <div
      popover={props.manual || props.popover === 'manual' ? 'manual' : 'auto'}
      class={props.class}
      ref={childRef}
      onToggle$={(event) => {
        const popover = event.target as HTMLElement;

        isPopoverOpenSig.value = !isPopoverOpenSig.value;

        if (props.transition && props.entryAnimation) {
          isPopoverOpenSig.value
            ? popover.classList.add(props.entryAnimation)
            : popover.classList.remove(props.entryAnimation);
        }

        // ensures polyfill popovers are always above the other
        if (
          document.__QUI_POPOVER_PF__ &&
          popover.classList.contains(':popover-open') &&
          popover.parentElement &&
          !popover.classList.contains('animating')
        ) {
          popover.parentElement.appendChild(popover);
        }
      }}
      {...props}
      {...animationHandlers}
    >
      {hasRenderedOnClientSig.value === 1 && <PortalContext />}
      <Slot />
    </div>
  );
});
