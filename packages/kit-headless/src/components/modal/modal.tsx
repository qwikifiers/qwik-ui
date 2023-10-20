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
  keepModalInPlaceWhileScrollbarReappears as keepModalInPlaceWhenScrollbarReappears,
  lockScroll,
  overrideNativeDialogEscapeBehaviorWith,
  showModal,
  trapFocus,
  wasModalBackdropClicked,
} from './modal-behavior';

import { disableBodyScroll, type BodyScrollOptions } from 'body-scroll-lock';

import styles from './modal.css?inline';

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

  const scrollOptions: BodyScrollOptions = {
    reserveScrollBarGap: true,
  };

  const { 'bind:show': showSig } = props;

  useTask$(async function toggleModal({ track, cleanup }) {
    const isOpen = track(() => showSig.value);
    const modal = modalRefSig.value;

    if (!modal) return;

    const focusTrap = trapFocus(modal);

    window.addEventListener(
      'keydown',
      overrideNativeDialogEscapeBehaviorWith(() => (showSig.value = false)),
      { once: true },
    );

    if (isOpen) {
      showModal(modal);
      disableBodyScroll(modal, scrollOptions);
      props.onShow$?.();
      activateFocusTrap(focusTrap);
    } else {
      closeModal(modal);
      props.onClose$?.();
    }

    cleanup(() => {
      deactivateFocusTrap(focusTrap);
      keepModalInPlaceWhenScrollbarReappears(scrollbar, modalRefSig.value);
    });
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
