import {
  $,
  QwikIntrinsicElements,
  QwikMouseEvent,
  Signal,
  Slot,
  component$,
  useSignal,
  useStylesScoped$,
  useVisibleTask$
} from '@builder.io/qwik';
import styles from './dialog-root.css?inline';
import { DialogRef } from './types';

/**
 * Todo-List
 * ---------
 *
 * [ ] Rename Root to ModalRoot
 * [ ] Drop dot-Notation. e.g. = Dialog.Root = ModalDialogRoot
 * [ ] Rename ref since it is a Qwik reserved word
 * [ ] Have a look at Radix-Dialog to get inspired by features/examples
 *     * What is important for BETA
 *     * What might be implemented later
 * [ ] Think about more tests
 */

export type RootProps = QwikIntrinsicElements['dialog'] & {
  fullScreen?: boolean;
  dialogRef?: Signal<DialogRef | undefined>;
};

export const Root = component$((props: RootProps) => {
  useStylesScoped$(styles);

  /** Contains reference to the rendered HTMLDialogElement. */
  const dialogElementSig = useSignal<HTMLDialogElement>();

  /** Indicates whether the dialog is open. */
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
   * Share the public API of the Dialog if the dialog-caller is interested.
   *
   */
  useVisibleTask$(() => {
    if (!props.dialogRef) return;

    props.dialogRef.value = { isOpen: isOpenSig, open$, close$ };
  });

  /**
   *
   * Lock Scrolling on page when Dialog is opened.
   *
   */
  useVisibleTask$(({ track }) => {
    const isOpened = track(() => isOpenSig.value);

    const overflow = isOpened ? 'hidden' : '';

    window.document.body.style.overflow = overflow;
  });

  /**
   *
   * When dialog is closed by pressing the Escape-Key,
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
