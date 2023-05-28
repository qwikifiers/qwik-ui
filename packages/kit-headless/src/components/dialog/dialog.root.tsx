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
  const state = useStore<DialogState>({
    props,
    opened: false,
    dialogRef: useSignal<HTMLDialogElement>(),
  });

  const open$ = $(() => {
    const dialog = state.dialogRef.value;

    if (!dialog) {
      throw new Error(
        '[Qwik UI Dialog]: Cannot open the Dialog. <dialog>-Element not found.'
      );
    }

    dialog.showModal();
    state.opened = true;
  });

  const close$ = $(() => {
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
    state,

    open$,
    close$,
  };

  useContextProvider(dialogContext, context);

  // useVisibleTask$(({ track }) => {
  //   const dialogClass = track(() => props.class);
  //   console.log('Class changed', dialogClass);
  //   context.dialogProps.class = dialogClass;
  // });

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
