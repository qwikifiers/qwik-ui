import {
  $,
  QRL,
  QwikIntrinsicElements,
  QwikMouseEvent,
  Signal,
  Slot,
  component$,
  useSignal,
  useStyles$,
  useTask$,
} from '@builder.io/qwik';

import {
  activateFocusTrap,
  closeModal,
  deactivateFocusTrap,
  overrideNativeDialogEscapeBehaviorWith,
  showModal,
  trapFocus,
  wasModalBackdropClicked,
} from './modal-behavior';

import { disableBodyScroll } from 'body-scroll-lock-upgrade';

import styles from './modal.css?inline';
import { isServer } from '@builder.io/qwik/build';

export type ModalProps = Omit<QwikIntrinsicElements['dialog'], 'open'> & {
  onShow$?: QRL<() => void>;
  onClose$?: QRL<() => void>;
  'bind:show': Signal<boolean>;
  closeOnBackdropClick?: boolean;
  alert?: boolean;
};

export const Modal = component$((props: ModalProps) => {
  useStyles$(styles);
  const modalRefSig = useSignal<HTMLDialogElement>();
  const scrollPositionSig = useSignal<number>(0);

  const { 'bind:show': showSig } = props;

  useTask$(async function toggleModal({ track, cleanup }) {
    const isOpen = track(() => showSig.value);
    const modal = modalRefSig.value;

    if (!modal) return;

    const focusTrap = trapFocus(modal);

    const escapeKeyListener = overrideNativeDialogEscapeBehaviorWith(() => {
      showSig.value = false;
    });

    window.addEventListener('keydown', escapeKeyListener);

    if (isOpen) {
      // HACK: keep modal scroll position in place with iOS
      const storedRequestAnimationFrame = window.requestAnimationFrame;
      window.requestAnimationFrame = () => 42;

      showModal(modal);
      disableBodyScroll(modal, { reserveScrollBarGap: true });
      window.requestAnimationFrame = storedRequestAnimationFrame;
      props.onShow$?.();
      activateFocusTrap(focusTrap);
    } else {
      closeModal(modal);
      props.onClose$?.();
    }

    cleanup(() => {
      deactivateFocusTrap(focusTrap);
      window.removeEventListener('keydown', escapeKeyListener);
    });
  });

  useTask$(({ track }) => {
    track(() => scrollPositionSig.value);

    if (isServer) return;

    document.documentElement.scrollTop = scrollPositionSig.value;
  });

  const closeOnBackdropClick$ = $((event: QwikMouseEvent) => {
    if (props.alert === true || props.closeOnBackdropClick === false) {
      return;
    }

    if (wasModalBackdropClicked(modalRefSig.value, event)) {
      showSig.value = false;
    }
  });

  return (
    <dialog
      {...props}
      role={props.alert === true ? 'alertdialog' : 'dialog'}
      ref={modalRefSig}
      onClick$={(event) => closeOnBackdropClick$(event)}
    >
      <Slot />
    </dialog>
  );
});
