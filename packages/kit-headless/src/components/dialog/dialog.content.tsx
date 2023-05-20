import {
  Slot,
  component$,
  useContext,
  useStylesScoped$,
} from '@builder.io/qwik';
import { dialogContext } from './dialog.context';

export const Content = component$(() => {
  useStylesScoped$(`
    .full-screen {
      width: 100vw;
      height: 100vh;
    }
  `);

  const context = useContext(dialogContext);
  const props = context.dialogProps;

  return (
    <dialog
      {...props}
      class={
        context.state.fullScreen ? `${props.class} full-screen` : props.class
      }
      ref={context.state.dialogRef}
      onClick$={context.closeOnDialogClick}
    >
      <Slot />
    </dialog>
  );
});
