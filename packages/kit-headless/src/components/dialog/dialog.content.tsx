import {
  $,
  QwikMouseEvent,
  Slot,
  component$,
  useContext,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { dialogContext } from './dialog.context';
import { hasDialogBackdropBeenClicked } from './utils';

export const Content = component$(() => {
  useStylesScoped$(`
    .full-screen {
      width: 100vw;
      height: 100vh;
    }
  `);

  const context = useContext(dialogContext);
  const props = context.state.props;

  const closeOnBackdropClick$ = $(
    (event: QwikMouseEvent<HTMLDialogElement, MouseEvent>) =>
      hasDialogBackdropBeenClicked(event) ? context.close$() : Promise.resolve()
  );

  /**
   *
   * When dialog is closed by pressing the Escape-Key,
   * we set the opened state to false.
   *
   */
  useVisibleTask$(() => {
    const dialog = context.state.dialogRef.value;

    if (!dialog) {
      throw new Error(
        '[Qwik UI Dialog]: Cannot update the Dialog state. <dialog>-Element not found.'
      );
    }

    dialog.addEventListener('close', () => (context.state.opened = false));
  });

  return (
    <dialog
      {...props}
      class={
        context.state.props.fullScreen
          ? `${context.state.props.class} full-screen`
          : `${context.state.props.class}`
      }
      ref={context.state.dialogRef}
      onClick$={closeOnBackdropClick$}
    >
      <Slot />
    </dialog>
  );
});
