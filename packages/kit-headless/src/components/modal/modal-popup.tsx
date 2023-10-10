import {
  $,
  QwikIntrinsicElements,
  QwikMouseEvent,
  Slot,
  component$,
  useContext,
  useSignal,
  useTask$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { FocusTrap, createFocusTrap } from 'focus-trap';
import { modalContextId } from './modal-context-id';

export const ModalPopup = component$(
  (props: Omit<QwikIntrinsicElements['dialog'], 'open'>) => {
    const modalContext = useContext(modalContextId);
    const refSig = useSignal<HTMLDialogElement>();

    useTask$(async function openOrCloseModal({ track }) {
      const isOpen = track(() => modalContext.showSig.value);

      const modal = refSig.value;

      if (!modal) return;

      if (isOpen) {
        modal.showModal();
        await modalContext.handler.onShow$?.();

        let scrollbarWidth: number | null = null;

        // prevents scrollbar flickers
        if (scrollbarWidth === null) {
          scrollbarWidth = window.innerWidth - document.body.offsetWidth;
          document.body.style.overflow = 'hidden';
          document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
      } else {
        await modalContext.handler.onHide$?.();
        modal.close();
      }
    });

    useVisibleTask$(function toggleFocusTrap({ track, cleanup }) {
      const isOpen = track(() => modalContext.showSig.value);
      const modal = refSig.value;

      if (!modal) return;

      let focusTrap: FocusTrap | null = createFocusTrap(modal, {
        escapeDeactivates: false,
      });

      if (isOpen) {
        focusTrap.activate();
      }

      cleanup(() => {
        focusTrap?.deactivate();
        focusTrap = null;
      });
    });

    useVisibleTask$(function lockScrollingWhenModalIsOpen({ track }) {
      const isOpen = track(() => modalContext.showSig.value);

      window.document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    const closeOnBackdropClick$ = $((event: QwikMouseEvent) => {
      const modal = refSig.value;

      if (!modal) {
        return;
      }

      const modalRect = modal.getBoundingClientRect();

      const wasClickTriggeredOutsideModalRect =
        modalRect.left > event.clientX ||
        modalRect.right < event.clientX ||
        modalRect.top > event.clientY ||
        modalRect.bottom < event.clientY;

      if (wasClickTriggeredOutsideModalRect) {
        modalContext.showSig.value = false;
      }
    });

    return (
      <dialog
        {...props}
        ref={refSig}
        onClick$={(event) => closeOnBackdropClick$(event)}
        onClose$={() => (modalContext.showSig.value = false)}
      >
        <Slot />
      </dialog>
    );
  },
);
