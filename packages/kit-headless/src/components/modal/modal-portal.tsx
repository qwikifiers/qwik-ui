import {
  $,
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

export const ModalPortal = component$(() => {
  const modalContext = useContext(modalContextId);
  const refSig = useSignal<HTMLDialogElement>();

  useTask$(async function openOrCloseModal({ track }) {
    const isOpen = track(() => modalContext.showSig.value);

    const modal = refSig.value;

    if (!modal) return;

    if (isOpen) {
      modal.showModal();
      await modalContext.handler.onShow$?.();
    } else {
      await modalContext.handler.onHide$?.();
      modal.close();
    }
  });

  useVisibleTask$(function setupFocusTrap({ track, cleanup }) {
    const isOpen = track(() => modalContext.showSig.value);
    const modal = refSig.value;
    let focusTrap: FocusTrap | null = null;

    if (!modal) return;

    if (isOpen) {
      focusTrap = createFocusTrap(modal);
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

  const closeOnBackdropClick$ = $(
    (event: QwikMouseEvent<HTMLDialogElement, MouseEvent>) => {
      const modalRect = (event.target as HTMLDialogElement).getBoundingClientRect();

      const wasClickTriggeredOutsideModalRect =
        modalRect.left > event.clientX ||
        modalRect.right < event.clientX ||
        modalRect.top > event.clientY ||
        modalRect.bottom < event.clientY;

      if (wasClickTriggeredOutsideModalRect) {
        modalContext.showSig.value = false;
      }
    },
  );

  return (
    <dialog
      {...modalContext.htmlDialogProps}
      ref={refSig}
      onClick$={closeOnBackdropClick$}
      onClose$={() => (modalContext.showSig.value = false)}
    >
      <Slot />
    </dialog>
  );
});
