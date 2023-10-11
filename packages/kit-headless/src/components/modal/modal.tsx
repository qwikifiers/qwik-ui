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
  show?: boolean;
  'bind:show'?: Signal<boolean>;
};

export const Modal = component$((props: ModalProps) => {
  const modalRefSig = useSignal<HTMLDialogElement>();
  const scrollbarWidth: WidthState = { width: null };

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
      document.body.style.paddingRight = `${currentPadding - scrollbarWidth.width}px`;
    });
  });

  const closeOnBackdropClick$ = $((event: QwikMouseEvent) => {
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
