import {
  $,
  QRL,
  QwikIntrinsicElements,
  QwikMouseEvent,
  Signal,
  Slot,
  component$,
  createContextId,
  useContext,
  useContextProvider,
  useOn,
  useSignal,
  useStore,
} from '@builder.io/qwik';

export type DialogState = {
  opened: boolean;
  dialogRef: Signal<HTMLDialogElement | undefined>;
};

export type DialogContext = {
  state: DialogState;

  open: QRL<() => void>;
  close: QRL<() => void>;
  closeOnDialogClick: QRL<
    (
      event: QwikMouseEvent<HTMLDialogElement, MouseEvent>,
      element: HTMLDialogElement
    ) => void
  >;
};

export const dialogContext = createContextId<DialogContext>('dialog');

export const Root = component$(() => {
  const state = useStore({
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
    state,

    open: openDialog$,
    close: closeDialog$,
    closeOnDialogClick: closeOnDialogClick$,
  };

  useContextProvider(dialogContext, context);

  return <Slot />;
});

export const Trigger = component$(() => {
  const context = useContext(dialogContext);

  useOn(
    'click',
    $(() => context.open())
  );

  return (
    <div role="button">
      <Slot />
    </div>
  );
});

export const Close = component$(() => {
  const context = useContext(dialogContext);

  useOn(
    'click',
    $(() => context.close())
  );

  return (
    <div role="button">
      <Slot />
    </div>
  );
});

type PortalProps = QwikIntrinsicElements['dialog'];

export const Portal = component$((props: PortalProps) => {
  const context = useContext(dialogContext);

  return (
    <dialog
      {...props}
      ref={context.state.dialogRef}
      onClick$={context.closeOnDialogClick}
    >
      <Slot />
    </dialog>
  );
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
