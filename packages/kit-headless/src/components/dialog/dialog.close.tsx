import { Slot, component$, useContext } from '@builder.io/qwik';
import { dialogContext } from './dialog.context';

export const Close = component$(() => {
  const context = useContext(dialogContext);

  return (
    <section onClick$={context.close$}>
      <Slot />
    </section>
  );
});
