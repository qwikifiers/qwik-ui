import {
  Slot,
  component$,
  useSignal,
  useStyles$,
  useContext,
  useTask$,
  $,
  type Signal,
  type ClassList,
  createContextId,
} from '@builder.io/qwik';

import { isServer } from '@builder.io/qwik/build';
import popoverStyles from './popover.css?inline';
import { supportShowAnimation, supportClosingAnimation } from './utils';

export type PopoverImplProps = {
  id: string;
  popover?: 'manual' | 'auto';
  class?: ClassList;
  ref?: Signal<HTMLElement | undefined>;
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

export const PopoverImpl = component$<PopoverImplProps>((props) => {
  // We must inject some minimal hiding CSS while the polyfill loads, and the preset class
  useStyles$(popoverStyles);

  const popoverRef = useSignal<HTMLElement | undefined>(undefined);
  const isPolyfillSig = useSignal<boolean>(false);

  /** have we rendered on the client yet? 0: no, 1: force, 2: yes */
  const hasRenderedOnClientSig = useSignal(isServer ? 0 : 2);
  const teleportSig = useSignal(false);

  // This forces a re-render on each popover instance when the signal changes
  if (hasRenderedOnClientSig.value === 1) {
    // Now run the task again after we force-rendered the contex
    setTimeout(() => (teleportSig.value = true), 0);
  }

  useTask$(async ({ track, cleanup }) => {
    track(() => teleportSig.value);

    if (isServer) return;

    isPolyfillSig.value = true;

    let polyfillContainer: HTMLDivElement | null = document.querySelector(
      'div[data-qwik-ui-popover-polyfill]',
    );

    if (!polyfillContainer) {
      polyfillContainer = document.createElement('div');
      polyfillContainer.setAttribute('data-qwik-ui-popover-polyfill', '');
      document.body.appendChild(polyfillContainer);
    }

    if (popoverRef.value) {
      polyfillContainer.appendChild(popoverRef.value);

      document.dispatchEvent(new CustomEvent('showpopover'));

      cleanup(() => popoverRef.value);
    }
  });

  return (
    <div
      {...props}
      popover={props.manual || props.popover === 'manual' ? 'manual' : 'auto'}
      ref={popoverRef}
      onBeforeToggle$={[
        $((e: ToggleEvent) => {
          if (!popoverRef.value) return;

          if (e.newState === 'open' && popoverRef.value) {
            supportShowAnimation(popoverRef.value, isPolyfillSig.value);
          }

          if (e.newState === 'closed') {
            supportClosingAnimation(popoverRef.value);
          }
        }),
        // @ts-expect-error bad types
        props.onBeforeToggle$,
      ]}
      onToggle$={[
        $(() => {
          if (props.ref) {
            props.ref.value = popoverRef.value;
          }

          if (!popoverRef.value) return;

          // move opened polyfill popovers are always above the other
          if (
            popoverRef.value.classList.contains(':popover-open') &&
            popoverRef.value.parentElement
          ) {
            popoverRef.value.parentElement.appendChild(popoverRef.value);
          }
        }),
        // @ts-expect-error bad types
        props.onToggle$,
      ]}
      // This gets called when the polyfill loads and we need to pop out
      document:onPopPolyLoad$={() => {
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
  );
});
