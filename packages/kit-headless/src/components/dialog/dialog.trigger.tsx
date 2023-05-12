import { $, Slot, component$, useContext, useOn } from '@builder.io/qwik';
import { dialogContext } from './dialog.context';

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
