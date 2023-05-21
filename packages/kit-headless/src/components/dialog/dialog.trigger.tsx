import { Slot, component$, useContext } from '@builder.io/qwik';
import { dialogContext } from './dialog.context';

export const Trigger = component$(() => {
  const context = useContext(dialogContext);

  return (
    <section onClick$={context.open$}>
      <Slot />
    </section>
  );
});
