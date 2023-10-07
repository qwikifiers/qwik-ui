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
  useVisibleTask$,
} from '@builder.io/qwik';
import { createFocusTrap, FocusTrap } from 'focus-trap';

export type ModalProps = Omit<QwikIntrinsicElements['dialog'], 'open'> & {
  onShow$?: QRL<() => void>;
  onHide$?: QRL<() => void>;
  show?: boolean;
  'bind:show'?: Signal<boolean | undefined>;
};

export const ModalRoot = component$((props: ModalProps) => {
  const { 'bind:show': givenOpenSig, ...rest } = props;

  const refSig = useSignal<HTMLDialogElement>();
  const focusTrapSig = useSignal<FocusTrap>();

  const defaultOpenSig = useSignal(false);
  const openSig = givenOpenSig || defaultOpenSig;

  const closeOnBackdropClick$ = $(
    (event: QwikMouseEvent<HTMLDialogElement, MouseEvent>) => {
      const modalRect = (event.target as HTMLDialogElement).getBoundingClientRect();

      const wasClickTriggeredOutsideModalRect =
        modalRect.left > event.clientX ||
        modalRect.right < event.clientX ||
        modalRect.top > event.clientY ||
        modalRect.bottom < event.clientY;

      if (wasClickTriggeredOutsideModalRect) {
        openSig.value = false;
      }
    },
  );

  useTask$(async function syncOpenProp({ track }) {
    const openPropValue = track(() => props.show);

    openSig.value = openPropValue;
  });

  useTask$(async function openOrCloseModal({ track }) {
    const isOpen = track(() => openSig.value);

    const modal = refSig.value;

    if (!modal) return;

    if (isOpen) {
      modal.showModal();

      await props.onShow$?.();
    } else {
      await props.onHide$?.();

      modal.close();
    }
  });

  useVisibleTask$(function setupFocusTrap({ track }) {
    const isOpen = track(() => openSig.value);
    const modal = refSig.value;

    if (!modal) return;

    if (isOpen) {
      focusTrapSig.value = createFocusTrap(modal);
      focusTrapSig.value?.activate();
    } else {
      focusTrapSig.value?.deactivate();
    }
  });

  useVisibleTask$(function lockScrollingWhenModalIsOpen({ track }) {
    const isOpen = track(() => openSig.value);

    window.document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  return (
    <dialog
      {...rest}
      ref={refSig}
      onClick$={closeOnBackdropClick$}
      onClose$={() => (openSig.value = false)}
    >
      <Slot />
    </dialog>
  );
});
