import {
  $,
  QwikMouseEvent,
  Slot,
  component$,
  useContextProvider,
  useSignal,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik';
import { dialogContext } from './dialog.context';
import { DialogContext, DialogState, RootProps } from './types';
import { hasDialogBackdropBeenClicked } from './utils';

export const Root = component$((props: RootProps) => {
  const { fullScreen, ...dialogProps } = props;

  const state = useStore<DialogState>({
    fullScreen: fullScreen || false,
    opened: false,
    dialogRef: useSignal<HTMLDialogElement>(),
  });

  /** Opens the Dialog */
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

  /** Opens the Dialog */
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

  /** Closes the Dialog when its Backdrop is clicked */
  const closeOnBackdropClick$ = $(
    (event: QwikMouseEvent<HTMLDialogElement, MouseEvent>) =>
      hasDialogBackdropBeenClicked(event) ? closeDialog$() : Promise.resolve()
  );

  const context: DialogContext = {
    dialogProps,
    state,

    open$: openDialog$,
    close$: closeDialog$,
    closeOnDialogClick$: closeOnBackdropClick$,
  };

  useContextProvider(dialogContext, context);

  useVisibleTask$(({ track }) => {
    const opened = track(() => state.opened);

    // We only share the DialogRef if the dialog's parent is interested.
    if (!props.ref) return;

    props.ref.value = {
      opened,
      open$: context.open$,
      close$: context.close$,
    };
  });

  useVisibleTask$(({ track }) => {
    const opened = track(() => state.opened);

    const overflow = opened ? 'hidden' : '';

    window.document.body.style.overflow = overflow;
  });

  return <Slot />;
});
