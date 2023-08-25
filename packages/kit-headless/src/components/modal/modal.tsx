import {
  $,
  component$,
  QwikIntrinsicElements,
  QwikMouseEvent,
  Signal,
  Slot,
  useSignal,
  useStylesScoped$,
  useVisibleTask$
} from '@builder.io/qwik';
import styles from './modal-root.css?inline';
import { ModalApi } from './types';

/**
 * Todo-List
 * ---------
 *
 * [ ] Have a look at Radix-Dialog to get inspired by features/examples
 *     * What is important for BETA
 *     * What might be implemented later
 * [ ] Think about more tests
 */

export type ModalProps = QwikIntrinsicElements['dialog'] & {
  fullScreen?: boolean;
  api?: Signal<ModalApi | undefined>;
};

export const Modal = component$((props: ModalProps) => {
  useStylesScoped$(styles);

  /** Contains reference to the rendered HTMLDialogElement. */
  const dialogElementSig = useSignal<HTMLDialogElement>();

  /** Indicates whether the modal is open. */
  const isOpenSig = useSignal(false);

  const open$ = $(() => {
    const dialog = dialogElementSig.value;

    if (!dialog) {
      return;
    }
    dialog.showModal();
    isOpenSig.value = true;
  });

  const close$ = $(() => {
    const dialog = dialogElementSig.value;
    if (!dialog) {
      return;
    }
    dialog.close();
    isOpenSig.value = false;
  });

  const closeOnBackdropClick$ = $(
    (event: QwikMouseEvent<HTMLDialogElement, MouseEvent>) =>
      hasDialogBackdropBeenClicked(event) ? close$() : Promise.resolve()
  );

  /**
   *
   * Share the public API of the Modal if the modal-caller is interested.
   *
   */
  useVisibleTask$(() => {
    if (!props.api) return;

    props.api.value = { isOpen: isOpenSig, open$, close$ };
  });

  /**
   *
   * Lock Scrolling on page when Modal is opened.
   *
   */
  useVisibleTask$(({ track }) => {
    const isOpened = track(() => isOpenSig.value);

    const overflow = isOpened ? 'hidden' : '';

    window.document.body.style.overflow = overflow;
  });

  /**
   *
   * When modal is closed by pressing the Escape-Key,
   * we set the opened state to false.
   *
   */
  useVisibleTask$(() => {
    const dialog = dialogElementSig.value;

    if (!dialog) {
      return;
    }

    dialog.addEventListener('close', () => (isOpenSig.value = false));
  });

  return (
    <dialog
      {...props}
      class={`${props.class} ${props.fullScreen ? 'full-screen' : ''}`}
      ref={dialogElementSig}
      onClick$={closeOnBackdropClick$}
    >
      <Slot />
    </dialog>
  );
});

function hasDialogBackdropBeenClicked(
  event: QwikMouseEvent<HTMLDialogElement, MouseEvent>
) {
  const rect = (event.target as HTMLDialogElement).getBoundingClientRect();

  return (
    rect.left > event.clientX ||
    rect.right < event.clientX ||
    rect.top > event.clientY ||
    rect.bottom < event.clientY
  );
}
