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
import styles from './dialog.root.css?inline';
import { DialogState, RootProps } from './types';
import { ensureDialog, hasDialogBackdropBeenClicked } from './utils';

export const Root = component$((props: RootProps) => {
  useStylesScoped$(styles);

  const dialogElement = useSignal<HTMLDialogElement>();

  const state = useStore<DialogState>({
    opened: false,
  });

  const open = $(() => {
    const dialog = dialogElement.value;

    ensureDialog(dialog);

    dialog.showModal();
    state.opened = true;
  });

  const close = $(() => {
    const dialog = dialogElement.value;

    ensureDialog(dialog);

    dialog.close();
    state.opened = false;
  });

  const closeOnBackdropClick = $(
    (event: QwikMouseEvent<HTMLDialogElement, MouseEvent>) =>
      hasDialogBackdropBeenClicked(event) ? close() : Promise.resolve()
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
      open,
      close,
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
    const dialog = dialogElement.value;

    ensureDialog(dialog);

    dialog.addEventListener('close', () => (state.opened = false));
  });

  return (
    <dialog
      {...props}
      class={props.fullScreen ? `${props.class} full-screen` : `${props.class}`}
      ref={dialogElement}
      onClick$={closeOnBackdropClick}
    >
      <Slot />
    </dialog>
  );
});
