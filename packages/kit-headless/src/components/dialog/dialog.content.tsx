import {
  $,
  QwikMouseEvent,
  Slot,
  component$,
  useContext,
  useStylesScoped$,
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
  const props = context.dialogProps;

  const closeOnBackdropClick$ = $(
    (event: QwikMouseEvent<HTMLDialogElement, MouseEvent>) =>
      hasDialogBackdropBeenClicked(event) ? context.close$() : Promise.resolve()
  );

  return (
    <dialog
      {...props}
      class={
        context.state.fullScreen ? `${props.class} full-screen` : props.class
      }
      ref={context.state.dialogRef}
      onClick$={closeOnBackdropClick$}
    >
      <Slot />
    </dialog>
  );
});
