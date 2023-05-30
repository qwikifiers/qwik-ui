import {
  $,
  QwikMouseEvent,
  Slot,
  component$,
  useSignal,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import styles from './dialog.element.css?inline';
import { DialogState, RootProps } from './types';
import { hasDialogBackdropBeenClicked } from './utils';

export const Element = component$((props: RootProps) => {
  useStylesScoped$(styles);

  const dialogRef = useSignal<HTMLDialogElement>();

  const state = useStore<DialogState>({
    opened: false,
  });

  const open$ = $(() => {
    const dialog = dialogRef.value;

    if (!dialog) {
      throw new Error(
        '[Qwik UI Dialog]: Cannot open the Dialog. <dialog>-Element not found.'
      );
    }

    dialog.showModal();
    state.opened = true;
  });

  const close$ = $(() => {
    const dialog = dialogRef.value;

    if (!dialog) {
      throw new Error(
        '[Qwik UI Dialog]: Cannot close the Dialog. <dialog>-Element not found.'
      );
    }

    dialog.close();
    state.opened = false;
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
  useVisibleTask$(({ track }) => {
    const opened = track(() => state.opened);

    if (!props.ref) return;

    props.ref.value = {
      opened,
      open$,
      close$,
    };
  });

  /**
   *
   * Lock Scrolling on page when Dialog is opened.
   *
   */
  useVisibleTask$(({ track }) => {
    const opened = track(() => state.opened);

    const overflow = opened ? 'hidden' : '';

    window.document.body.style.overflow = overflow;
  });

  /**
   *
   * When dialog is closed by pressing the Escape-Key,
   * we set the opened state to false.
   *
   */
  useVisibleTask$(() => {
    const dialog = dialogRef.value;

    if (!dialog) {
      throw new Error(
        '[Qwik UI Dialog]: Cannot update the Dialog state. <dialog>-Element not found.'
      );
    }

    dialog.addEventListener('close', () => (state.opened = false));
  });

  return (
    <dialog
      {...props}
      class={props.fullScreen ? `${props.class} full-screen` : `${props.class}`}
      ref={dialogRef}
      onClick$={closeOnBackdropClick$}
    >
      <Slot />
    </dialog>
  );
});
