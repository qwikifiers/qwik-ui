import {
  QwikIntrinsicElements,
  Slot,
  component$,
  useContext,
  useStylesScoped$,
} from '@builder.io/qwik';
import { dialogContext } from './dialog.context';

type PortalProps = QwikIntrinsicElements['dialog'];

export const Portal = component$((props: PortalProps) => {
  useStylesScoped$(`
    .full-screen {
      width: 100vw;
      height: 100vh;
    }
  `);

  const context = useContext(dialogContext);

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
