import { Slot, component$, useContext } from '@builder.io/qwik';
import { dialogContext } from './dialog.context';

export const Title = component$(() => {
  const context = useContext(dialogContext);
  const ariaLabeledBy = context.dialogProps['aria-labelledby'];

  return (
    <span aria-labelledby={ariaLabeledBy}>
      <Slot />
    </span>
  );
});
