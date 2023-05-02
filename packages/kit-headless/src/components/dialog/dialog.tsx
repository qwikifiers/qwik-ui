import {
  $,
  QRL,
  QwikMouseEvent,
  Slot,
  component$,
  createContextId,
  useComputed$,
  useContextProvider,
  useSignal,
  useStore,
  useVisibleTask$,
} from '@builder.io/qwik';

export type DialogState = {
  opened: boolean;
};

export type DialogContext = {
  state: DialogState;
  open: QRL<() => void>;
  close: QRL<() => void>;
};

export type RootProps = {
  open: boolean;
  type?: 'modal' | 'bottom-sheet' | 'side-nav';
};

export const dialogContext = createContextId<DialogContext>('dialog');

export const Root = component$((props: RootProps) => {
  const dialogRef = useSignal<HTMLDialogElement>();
  const classes = useComputed$(() => [props.type ?? 'modal']);

  const state = useStore({
    opened: false,
  });

  const openDialog$ = $(() => {
    const dialog = dialogRef.value;

    if (!dialog) {
      throw new Error(
        '[Qwik UI Dialog]: Cannot open the Dialog. <dialog>-Element not found.'
      );
    }

    dialog.showModal();
    state.opened = true;
  });

  const closeDialog$ = $(() => {
    const dialog = dialogRef.value;

    if (!dialog) {
      throw new Error(
        '[Qwik UI Dialog]: Cannot close the Dialog. <dialog>-Element not found.'
      );
    }

    dialog.close();
    state.opened = false;
  });

  const handleClick$ = $(
    (
      event: QwikMouseEvent<HTMLDialogElement, MouseEvent>,
      element: HTMLDialogElement
    ) => {
      if (event.target !== element) return;

      return closeDialog$();
    }
  );

  const context: DialogContext = {
    state,
    open: openDialog$,
    close: closeDialog$,
  };

  useContextProvider(dialogContext, context);

  useVisibleTask$(async ({ track }) => {
    const shallBeOpened = track(() => props.open);

    shallBeOpened ? await openDialog$() : await closeDialog$();
  });

  return (
    <dialog class={classes} ref={dialogRef} onClick$={handleClick$}>
      <Slot></Slot>
    </dialog>
  );
});
