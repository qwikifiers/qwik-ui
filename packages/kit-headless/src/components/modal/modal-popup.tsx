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
    const { class: modalPopupClass, ...htmlDialogProps } = props;
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
      if ((event.target as Element).nodeName !== 'DIALOG') {
        return;
      }

      modalContext.showSig.value = false;
    });

    return (
      <dialog
        {...htmlDialogProps}
        ref={refSig}
        onClick$={(event) => closeOnBackdropClick$(event)}
        onClose$={() => (modalContext.showSig.value = false)}
      >
        <div class={modalPopupClass}>
          <Slot />
        </div>
      </dialog>
    );
  },
);
