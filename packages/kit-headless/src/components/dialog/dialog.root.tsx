import {
  $,
  QwikIntrinsicElements,
  QwikMouseEvent,
  Slot,
  component$,
  useContextProvider,
  useSignal,
  useStore,
} from '@builder.io/qwik';
import { dialogContext } from './dialog.context';
import { DialogContext, DialogState } from './types';

export type RootProps = Pick<
  QwikIntrinsicElements['dialog'],
  'class' | 'aria-labelledby' | 'aria-describedby'
> & {
  fullScreen?: boolean;
};

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

  const closeOnDialogClick$ = $(
    (event: QwikMouseEvent<HTMLDialogElement, MouseEvent>) =>
      hasBackdropBeenClicked(event) ? closeDialog$() : Promise.resolve()
  );

  const context: DialogContext = {
    dialogProps,
    state,

    open: openDialog$,
    close: closeDialog$,
    closeOnDialogClick: closeOnDialogClick$,
  };

  useContextProvider(dialogContext, context);

  return <Slot />;
});

function hasBackdropBeenClicked(
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
