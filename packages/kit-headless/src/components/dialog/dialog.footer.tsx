import { Slot, component$, useStyles$ } from '@builder.io/qwik';

export const Footer = component$(() => {
  useStyles$(`
    .dialog-actions {
      position: sticky;
      bottom: 0;
    }
  `);

  return (
    <footer class="dialog-actions">
      <Slot />
    </footer>
  );
});
