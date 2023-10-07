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
import { isServer } from '@builder.io/qwik/build';

export type ModalProps = Omit<QwikIntrinsicElements['dialog'], 'open'> & {
  onShow$?: QRL<() => void>;
  onHide$?: QRL<() => void>;
  show?: boolean;
  'bind:show'?: Signal<boolean | undefined>;
};

export const ModalRoot = component$((props: ModalProps) => {
  const { 'bind:show': givenOpenSig, ...rest } = props;

  const refSig = useSignal<HTMLDialogElement>();

  const defaultOpenSig = useSignal(false);
  const openSig = givenOpenSig || defaultOpenSig;

  const closeOnBackdropClick$ = $(
    (event: QwikMouseEvent<HTMLDialogElement, MouseEvent>) => {
      const dialogRect = (event.target as HTMLDialogElement).getBoundingClientRect();

      const wasClickTriggeredOutsideDialogRect =
        dialogRect.left > event.clientX ||
        dialogRect.right < event.clientX ||
        dialogRect.top > event.clientY ||
        dialogRect.bottom < event.clientY;

      if (wasClickTriggeredOutsideDialogRect) {
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

    const dialog = refSig.value;

    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      await props.onShow$?.();
    } else {
      await props.onHide$?.();
      dialog.close();
    }
  });

  useTask$(async function lockScrollingWhenModalIsOpened({ track }) {
    if (isServer) return;

    // TODO: Make this work with SSR
    //       Idea: using useVisibleTask$ and check whether Modal has been opened
    //             on the server. If it has been opened lock scrolling.
    const isOpened = track(() => openSig.value);

    window.document.body.style.overflow = isOpened ? 'hidden' : '';
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
