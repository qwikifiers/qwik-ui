import {
  $,
  component$,
  QRL,
  QwikIntrinsicElements,
  QwikMouseEvent,
  Signal,
  Slot,
  useSignal,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import { isServer } from '@builder.io/qwik/build';
import styles from './modal-root.css?inline';

/**
 * Todo-List
 * ---------
 *
 * [ ] Have a look at Radix-Dialog to get inspired by features/examples
 *     * What is important for BETA
 *     * What might be implemented later
 * [ ] Think about more tests
 */

export type ModalProps = Omit<QwikIntrinsicElements['dialog'], 'open'> & {
  open: Signal<boolean>;

  fullScreen?: Signal<boolean>;

  onOpen$?: QRL<() => void>;
  onClose$?: QRL<() => void>;
};

export const Modal = component$((props: ModalProps) => {
  useStylesScoped$(styles);

  /** Contains reference to the rendered HTMLDialogElement. */
  const refSig = useSignal<HTMLDialogElement>();

  /** Indicates whether the modal is open. */
  const openSig = props.open;

  const closeOnBackdropClick$ = $(
    (event: QwikMouseEvent<HTMLDialogElement, MouseEvent>) => {
      if (hasDialogBackdropBeenClicked(event)) {
        openSig.value = false;
      }
    },
  );

  useTask$(async function openOrCloseModal({ track }) {
    const isOpen = track(() => openSig.value);

    const dialog = refSig.value;

    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      await props.onOpen$?.();
    } else {
      await props.onClose$?.();
      dialog.close();
    }
  });

  useTask$(async function lockScrollingWhenModalIsOpened({ track }) {
    if (isServer) return;

    const isOpened = track(() => openSig.value);

    window.document.body.style.overflow = isOpened ? 'hidden' : '';
  });

  return (
    <dialog
      class={`${props.class} ${props.fullScreen ? 'full-screen' : ''}`}
      ref={refSig}
      onClick$={closeOnBackdropClick$}
      onClose$={() => (openSig.value = false)}
    >
      <Slot />
    </dialog>
  );
});

function hasDialogBackdropBeenClicked(
  event: QwikMouseEvent<HTMLDialogElement, MouseEvent>,
) {
  const rect = (event.target as HTMLDialogElement).getBoundingClientRect();

  return (
    rect.left > event.clientX ||
    rect.right < event.clientX ||
    rect.top > event.clientY ||
    rect.bottom < event.clientY
  );
}
