import {
  Slot,
  component$,
  useSignal,
  useStyles$,
  useContext,
  useTask$,
  $,
  createContextId,
  type PropsOf,
  type CorrectedToggleEvent,
} from '@builder.io/qwik';

import { isServer } from '@builder.io/qwik/build';
import popoverStyles from './popover.css?inline';
import { popoverContextId } from './popover-context';
import { supportShowAnimation, supportClosingAnimation } from './utils';
import { useCombinedRef } from '../../hooks/combined-refs';

// We don't need a provider, that way we connect all context to the root
const ensureContextId = createContextId('qui-popover-null-context');

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
  useContext(ensureContextId, null);
  return null;
});

export const HPopoverPanelImpl = component$((props: PropsOf<'div'>) => {
  const context = useContext(popoverContextId);
  const panelId = `${context.compId}-panel`;
  const contextRefOpts = { context, givenContextRef: context.panelRef };
  const panelRef = useCombinedRef(props.ref, contextRefOpts);

  // We must inject some minimal hiding CSS while the polyfill loads, and the preset class
  useStyles$(popoverStyles);
  const isPolyfillSig = useSignal<boolean>(false);

  /** have we rendered on the client yet? 0: no, 1: force, 2: yes */
  const hasRenderedOnClientSig = useSignal(isServer ? 0 : 2);
  const teleportSig = useSignal(false);
  const hasTopLayerAncestorSig = useSignal(false);

  // This forces a re-render on each popover instance when the signal changes
  if (hasRenderedOnClientSig.value === 1) {
    // Now run the task again after we force-rendered the contex
    setTimeout(() => {
      teleportSig.value = true;
    }, 0);
  }

  useTask$(async ({ track, cleanup }) => {
    track(() => teleportSig.value);

    if (isServer) return;

    isPolyfillSig.value = true;

    const findTopLayerAncestor$ = $((element: HTMLElement | null): HTMLElement | null => {
      while (element?.parentElement) {
        if (
          element.parentElement?.tagName === 'DIALOG' ||
          element.parentElement?.hasAttribute('popover')
        ) {
          return element.parentElement;
        }
        element = element.parentElement;
      }
      return null;
    });

    let polyfillContainer: HTMLDivElement | null = document.querySelector(
      'div[data-qwik-ui-popover-polyfill]',
    );

    if (!polyfillContainer) {
      polyfillContainer = document.createElement('div');
      polyfillContainer.setAttribute('data-qwik-ui-popover-polyfill', '');
      document.body.appendChild(polyfillContainer);
    }

    if (context.panelRef?.value) {
      const topLayerAncestor = await findTopLayerAncestor$(context.panelRef.value);

      if (topLayerAncestor === null) {
        polyfillContainer.appendChild(context.panelRef.value);
      } else {
        hasTopLayerAncestorSig.value = true;
      }

      document.dispatchEvent(new CustomEvent('showpopoverpoly'));

      cleanup(() => context.panelRef?.value);
    }
  });

  return (
    <div
      {...props}
      id={panelId}
      ref={panelRef}
      popover={
        (context.manual && 'manual') || props.popover === 'manual'
          ? 'manual'
          : 'auto' || 'auto'
      }
      onBeforeToggle$={[
        $(async (e) => {
          if (!context.panelRef?.value) return;

          if (e.newState === 'open' && context.panelRef.value) {
            await supportShowAnimation(context.panelRef.value, isPolyfillSig.value);
          }
          if (e.newState === 'closed') {
            supportClosingAnimation(context.panelRef.value);
          }
        }),
        props.onBeforeToggle$,
      ]}
      onToggle$={[
        $((e: CorrectedToggleEvent) => {
          context.isOpenSig.value = e.newState === 'open';

          if (!context.panelRef?.value) return;

          // move opened polyfill popovers are always above the other
          if (
            context.panelRef?.value.classList.contains(':popover-open') &&
            context.panelRef?.value.parentElement &&
            // TODO: Get the top layer ancestor popovers to be above the other when the next one is opened.
            !hasTopLayerAncestorSig.value
          ) {
            context.panelRef.value.parentElement.appendChild(context.panelRef.value);
          }
        }),
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
