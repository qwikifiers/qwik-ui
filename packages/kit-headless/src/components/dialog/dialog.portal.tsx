import {
  QwikIntrinsicElements,
  Slot,
  component$,
  useContext,
} from '@builder.io/qwik';
import { dialogContext } from './dialog.context';

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
