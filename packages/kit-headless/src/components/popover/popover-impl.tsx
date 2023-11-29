// src/routes/impl/popover.tsx
import {
  Slot,
  component$,
  useSignal,
  $,
  useStyles$,
  useContext,
  type Signal,
  type ClassList,
  type QwikAnimationEvent,
  type QwikTransitionEvent,
  createContextId,
} from '@builder.io/qwik';

import { isServer } from '@builder.io/qwik/build';
import popoverStyles from './popover.css?inline';
import { useTask$ } from '@builder.io/qwik';

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

// We don't need a provider, that way we connect all context to the root
const ensureContextId = createContextId('qui-popover');

/**
 *
 * Portal Context in Qwik, akin to React's Portal, enables element teleportation. Rendering this component forces Qwik to parse the vDOM, enabling efficient context retrieval.
 * *
 * 1. Render on client -> don't need anything
 *
 * 2. SSR -> click -> force context the one time.
 *
 */
export const EnsuredContext = component$(() => {
  // @ts-expect-error 2769
  useContext(ensureContextId, null);
  return null;
});

const isSupported =
  !isServer &&
  !document.__QUI_POPOVER_PF__ &&
  typeof HTMLElement !== 'undefined' &&
  typeof HTMLElement.prototype === 'object' &&
  'popover' in HTMLElement.prototype;

/**
 *  This component is a polyfill for MDN's popover API. It enables the usage of popovers across browsers.
 *
 */
export const PopoverImpl = component$<PopoverImplProps>((props) => {
  // We must inject some minimal hiding CSS while the polyfill loads, and the preset class
  useStyles$(popoverStyles);

  const baseRef = useSignal<HTMLElement | undefined>(undefined);
  // the popover
  const childRef = useSignal<HTMLElement | undefined>(undefined);
  // animations
  const isPopoverOpenSig = useSignal<boolean>(false);

  /** have we rendered on the client yet? 0: no, 1: force, 2: yes */
  const hasRenderedOnClientSig = useSignal(isServer ? 0 : 2);
  const shouldTeleportSig = useSignal(false);

  // This forces a re-render when the signal changes
  if (hasRenderedOnClientSig.value === 1) {
    // Now run the task again after we force-rendered the contex
    setTimeout(() => (shouldTeleportSig.value = true), 0);
  }

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

  useTask$(({ track, cleanup }) => {
    if (!track(() => shouldTeleportSig.value)) return;

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
  });

  return (
    <div ref={baseRef}>
      <div
        {...props}
        {...animationHandlers}
        // @ts-expect-error bad types
        popover={props.manual || props.popover === 'manual' ? 'manual' : 'auto'}
        ref={childRef}
        onToggle$={(e) => {
          const popover = childRef.value!;
          // @ts-expect-error bad types
          console.log('toggled!', e.newState === 'open');
          if (props.transition && props.entryAnimation) {
            isPopoverOpenSig.value
              ? popover.classList.add(props.entryAnimation)
              : popover.classList.remove(props.entryAnimation);
          }

          // move opened polyfill popovers are always above the other
          if (
            !isSupported &&
            popover.classList.contains(':popover-open') &&
            popover.parentElement &&
            !popover.classList.contains('animating')
          ) {
            popover.parentElement.appendChild(popover);
          }

          // @ts-expect-error bad types
          props.onToggle$?.(e);
        }}
        // This gets called when the polyfill loads and we need to pop out
        document:onQuipoppolyloaded$={() => {
          console.log('I run in popoly!');
          // prevents animation flickers across browsers
          // if (props.animation && props.entryAnimation) {
          //   childRef.value?.classList.add(props.entryAnimation);
          // }

          if (hasRenderedOnClientSig.value === 0) {
            // Force re-render and wait for teleport signal
            hasRenderedOnClientSig.value = 1;
            return;
          }
        }}
      >
        {hasRenderedOnClientSig.value === 1 && <EnsuredContext />}
        <Slot />
      </div>
    </div>
  );
});
