import {
  $,
  PropsOf,
  QRL,
  Signal,
  Slot,
  component$,
  useSignal,
  useStyles$,
  useTask$,
  sync$,
  useId,
  useContextProvider,
} from '@builder.io/qwik';

import { ModalContext, modalContextId } from './modal-context';

import styles from './modal.css?inline';
import { useModal } from './use-modal';

export type ModalProps = Omit<PropsOf<'dialog'>, 'open'> & {
  onShow$?: QRL<() => void>;
  onClose$?: QRL<() => void>;
  'bind:show': Signal<boolean>;
  closeOnBackdropClick?: boolean;
  alert?: boolean;
};

export const Modal = component$((props: ModalProps) => {
  useStyles$(styles);
  const {
    activateFocusTrap,
    closeModal,
    deactivateFocusTrap,
    showModal,
    trapFocus,
    wasModalBackdropClicked,
  } = useModal();

  const modalRef = useSignal<HTMLDialogElement>();
  const localId = useId();

  const { 'bind:show': showSig } = props;

  useTask$(async function toggleModal({ track, cleanup }) {
    const isOpen = track(() => showSig.value);

    if (!modalRef.value) return;

    const focusTrap = await trapFocus(modalRef.value);

    if (isOpen) {
      // HACK: keep modal scroll position in place with iOS
      const storedRequestAnimationFrame = window.requestAnimationFrame;
      window.requestAnimationFrame = () => 42;

      await showModal(modalRef.value);
      window.requestAnimationFrame = storedRequestAnimationFrame;
      await props.onShow$?.();
      activateFocusTrap(focusTrap);
    } else {
      await closeModal(modalRef.value);
      await props.onClose$?.();
    }

    cleanup(async () => {
      await deactivateFocusTrap(focusTrap);
    });
  });

  const closeOnBackdropClick$ = $(async (e: MouseEvent) => {
    if (props.alert === true || props.closeOnBackdropClick === false) {
      return;
    }

    // We do not want to close elements that dangle outside of the modal
    if (!(e.target instanceof HTMLDialogElement)) {
      return;
    }

    if (await wasModalBackdropClicked(modalRef.value, e)) {
      showSig.value = false;
    }
  });

  const handleKeyDownSync$ = sync$((e: KeyboardEvent) => {
    const keys = [' ', 'Enter'];

    if (e.target instanceof HTMLDialogElement && keys.includes(e.key)) {
      e.preventDefault();
    }

    if (e.key === 'Escape') {
      e.preventDefault();
    }
  });

  const handleKeyDown$ = $((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      showSig.value = false;
      e.stopPropagation();
    }
  });

  const context: ModalContext = {
    localId,
  };

  useContextProvider(modalContextId, context);

  return (
    <dialog
      {...props}
      id={`${localId}-root`}
      aria-labelledby={`${localId}-title`}
      aria-describedby={`${localId}-description`}
      // TODO: deprecate data-state in favor of data-open, data-closing, and data-closed
      data-state={showSig.value ? 'open' : 'closed'}
      data-open={showSig.value && ''}
      data-closed={!showSig.value && ''}
      role={props.alert === true ? 'alertdialog' : 'dialog'}
      ref={modalRef}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$, props.onKeyDown$]}
      onClick$={async (e) => {
        e.stopPropagation();
        await closeOnBackdropClick$(e);
      }}
    >
      <Slot />
    </dialog>
  );
});
