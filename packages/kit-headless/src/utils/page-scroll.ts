import { type Signal, useTask$ } from '@builder.io/qwik';
import { isServer } from '@builder.io/qwik/build';
import { createNoScroll, markScrollable } from '@fluejs/noscroll';
import { initTouchHandler, resetTouchHandler } from '@fluejs/noscroll/touch';

export const pageScroll = createNoScroll({
  onInitScrollDisable: initTouchHandler,
  onResetScrollDisable: resetTouchHandler,
});

// noscroll only lets touch gestures scroll elements it has marked.
// Mark the panel and any inner scroll container (e.g. a scrollable body
// with a sticky header/footer) so they remain touch-scrollable on iOS;
// otherwise the gesture resolves to the non-scrollable panel and gets
// prevented. Re-scanned on each open to pick up the current content.
export const markScrollableElements = (panel: HTMLElement) => {
  markScrollable(panel);
  panel.querySelectorAll<HTMLElement>('*').forEach((el) => {
    const { overflowX, overflowY } = getComputedStyle(el);
    if (/(auto|scroll|overlay)/.test(`${overflowX} ${overflowY}`)) {
      markScrollable(el);
    }
  });
};

export const useModalPageScrollLock = (
  isOpenSig: Signal<boolean>,
  props: { modal?: boolean; manual?: boolean },
  panelRef: { readonly value: HTMLElement | undefined },
) => {
  useTask$(({ track, cleanup }) => {
    const isLocked = track(() => isOpenSig.value && props.modal && !props.manual);

    if (isServer || !isLocked) return;

    if (panelRef.value) markScrollableElements(panelRef.value);
    pageScroll.disablePageScroll();

    cleanup(() => pageScroll.enablePageScroll());
  });
};
