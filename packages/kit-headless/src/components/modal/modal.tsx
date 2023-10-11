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
  WidthElement,
} from './modal-behavior';

export type ModalProps = Omit<QwikIntrinsicElements['dialog'], 'open'> & {
  onShow$?: QRL<() => void>;
  onClose$?: QRL<() => void>;
  show?: boolean;
  'bind:show'?: Signal<boolean>;
};

export const Modal = component$((props: ModalProps) => {
  const modalRefSig = useSignal<HTMLDialogElement>();
  const scrollbar: WidthElement = { width: null };

  const { 'bind:show': givenOpenSig, show: givenShow } = props;

  const defaultOpenSig = useSignal(false);
  const showSig = givenOpenSig || defaultOpenSig;

  useTask$(async function syncOpenProp({ track }) {
    const showPropValue = track(() => givenShow);

    showSig.value = showPropValue || false;
  });

  useTask$(async function toggleModal({ track, cleanup }) {
    const isOpen = track(() => showSig.value);
    const modal = modalRefSig.value;

    if (!modal) return;

    const focusTrap = trapFocus(modal);

    if (isOpen) {
      showModal(modal, props.onShow$);
      activateFocusTrap(focusTrap);
      lockScroll();
      adjustScrollbar(scrollbar);
    } else {
      closeModal(modal, props.onClose$);
    }

    cleanup(() => {
      deactivateFocusTrap(focusTrap);
      unlockScroll();
    });
  });

  const closeOnBackdropClick$ = $((event: QwikMouseEvent) => {
    const modal = modalRefSig.value;

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
      showSig.value = false;
    }
  });

  return (
    <dialog
      {...props}
      ref={modalRefSig}
      onClick$={(event) => closeOnBackdropClick$(event)}
      onClose$={() => (showSig.value = false)}
    >
      <Slot />
    </dialog>
  );
});
