import { Slot, component$, useStyles$ } from '@builder.io/qwik';

export const Actions = component$(() => {
  useStyles$(`
    .dialog-actions {
      position: sticky;
      bottom: 0;
    }
  `);

  return (
    <div class="dialog-actions">
      <Slot />
    </div>
  );
});
