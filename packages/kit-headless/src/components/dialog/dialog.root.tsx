import {
  $,
  Slot,
  component$,
  useContextProvider,
  useSignal,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik';
import { dialogContext } from './dialog.context';
import { DialogContext, DialogState, RootProps } from './types';

export const Root = component$((props: RootProps) => {
  const { fullScreen, ...dialogProps } = props;

  const state = useStore<DialogState>({
    fullScreen: fullScreen || false,
    opened: false,
    dialogRef: useSignal<HTMLDialogElement>(),
  });

  const openDialog$ = $(() => {
    const dialog = state.dialogRef.value;

    if (!dialog) {
      throw new Error(
        '[Qwik UI Dialog]: Cannot open the Dialog. <dialog>-Element not found.'
      );
    }

    dialog.showModal();
    state.opened = true;
  });

  const closeDialog$ = $(() => {
    const dialog = state.dialogRef.value;

    if (!dialog) {
      throw new Error(
        '[Qwik UI Dialog]: Cannot close the Dialog. <dialog>-Element not found.'
      );
    }

    dialog.close();
    state.opened = false;
  });

  const context: DialogContext = {
    dialogProps,
    state,

    open$: openDialog$,
    close$: closeDialog$,
  };

  useContextProvider(dialogContext, context);

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
      open$: context.open$,
      close$: context.close$,
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

  return <Slot />;
});
