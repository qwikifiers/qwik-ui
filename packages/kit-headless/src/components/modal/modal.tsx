import {
  $,
  component$,
  QRL,
  QwikIntrinsicElements,
  QwikMouseEvent,
  Signal,
  Slot,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import {
  activateFocusTrap,
  preventScrollbarFlickering as adjustScrollbar,
  closeModal,
  deactivateFocusTrap,
  lockScroll,
  showModal,
  trapFocus,
  unlockScroll,
  wasModalBackdropClicked,
  WidthElement as WidthState,
} from './modal-behavior';

export type ModalProps = Omit<QwikIntrinsicElements['dialog'], 'open'> & {
  onShow$?: QRL<() => void>;
  onClose$?: QRL<() => void>;
  'bind:show'?: Signal<boolean>;
  closeOnBackdropClick?: boolean;
};

export const Modal = component$((props: ModalProps) => {
  const modalRefSig = useSignal<HTMLDialogElement>();
  const scrollbarWidth: WidthState = { width: null };

  const { 'bind:show': givenOpenSig } = props;

  const defaultShowSig = useSignal(false);
  const showSig = givenOpenSig || defaultShowSig;

  const closeOnBackdropClickSig = useSignal(true);

  useTask$(async function bindCloseOnBackdropClick({ track }) {
    closeOnBackdropClickSig.value = track(() =>
      props.closeOnBackdropClick === undefined ? true : false,
    );
  });

  useTask$(async function toggleModal({ track, cleanup }) {
    const isOpen = track(() => showSig.value);
    const modal = modalRefSig.value;

    if (!modal) return;

    const focusTrap = trapFocus(modal);

    if (isOpen) {
      adjustScrollbar(scrollbarWidth);
      showModal(modal, props.onShow$);
      activateFocusTrap(focusTrap);
      lockScroll();
    } else {
      closeModal(modal, props.onClose$);
    }

    cleanup(() => {
      deactivateFocusTrap(focusTrap);
      unlockScroll();

      // cleanup the scroll padding
      const currentPadding = parseInt(document.body.style.paddingRight);
      if (scrollbarWidth.width) {
        document.body.style.paddingRight = `${currentPadding - scrollbarWidth.width}px`;
      }
    });
  });

  const closeOnBackdropClick$ = $((event: QwikMouseEvent) => {
    if (!closeOnBackdropClickSig.value) {
      return;
    }

    if (wasModalBackdropClicked(modalRefSig.value, event)) {
      showSig.value = false;
    }
  });

  return (
    <dialog
      class="preventScrollFlicker"
      {...props}
      ref={modalRefSig}
      onClick$={(event) => closeOnBackdropClick$(event)}
      onClose$={() => (showSig.value = false)}
    >
      <Slot />
    </dialog>
  );
});
