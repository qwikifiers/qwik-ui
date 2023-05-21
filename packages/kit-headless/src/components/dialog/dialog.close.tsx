import { $, Slot, component$, useContext, useOn } from '@builder.io/qwik';
import { dialogContext } from './dialog.context';

export const Close = component$(() => {
  const context = useContext(dialogContext);

  useOn(
    'click',
    $(() => context.close$())
  );

  return (
    <section>
      <Slot />
    </section>
  );
});
