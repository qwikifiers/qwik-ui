import {
  Slot,
  component$,
  useSignal,
  useStyles$,
  useContext,
  type Signal,
  type ClassList,
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

// const isSupported =
//   !document.__QUI_POPOVER_PF__ &&
//   typeof HTMLElement !== 'undefined' &&
//   typeof HTMLElement.prototype === 'object' &&
//   'popover' in HTMLElement.prototype;

export const PopoverImpl = component$<PopoverImplProps>((props) => {
  // We must inject some minimal hiding CSS while the polyfill loads, and the preset class
  useStyles$(popoverStyles);

  const beforeTeleportParentRef = useSignal<HTMLElement | undefined>(undefined);
  const popoverRef = useSignal<HTMLElement | undefined>(undefined);

  /** have we rendered on the client yet? 0: no, 1: force, 2: yes */
  const hasRenderedOnClientSig = useSignal(isServer ? 0 : 2);
  const shouldTeleportSig = useSignal(false);

  // This forces a re-render on each popover instance when the signal changes
  if (hasRenderedOnClientSig.value === 1) {
    // Now run the task again after we force-rendered the contex
    setTimeout(() => (shouldTeleportSig.value = true), 0);
  }

  useTask$(async ({ track, cleanup }) => {
    if (!track(() => shouldTeleportSig.value)) return;

    let polyfillContainer: HTMLDivElement | null = document.querySelector(
      'div[data-qwik-ui-popover-polyfill]',
    );

    if (!polyfillContainer) {
      polyfillContainer = document.createElement('div');
      polyfillContainer.setAttribute('data-qwik-ui-popover-polyfill', '');
      document.body.appendChild(polyfillContainer);
    }

    if (popoverRef.value) {
      // user passed in popover ref (context, state, etc.)
      if (props.popoverRef) props.popoverRef.value = popoverRef.value;

      polyfillContainer.appendChild(popoverRef.value);

      const triggerElement = document.querySelector(`[popovertarget="${props.id}"]`);

      if (triggerElement) {
        popoverRef.value.showPopover();
      }

      cleanup(
        () =>
          popoverRef.value &&
          beforeTeleportParentRef.value?.appendChild(popoverRef.value),
      );
    }
  });

  return (
    <div ref={beforeTeleportParentRef}>
      <div
        {...props}
        // @ts-expect-error bad types
        popover={props.manual || props.popover === 'manual' ? 'manual' : 'auto'}
        ref={popoverRef}
        onToggle$={(e) => {
          if (!popoverRef.value) return;

          const popover = popoverRef.value;

          // move opened polyfill popovers are always above the other
          if (
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
        document:onPopPolyLoad$={() => {
          console.log('I run in popoly!');

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
