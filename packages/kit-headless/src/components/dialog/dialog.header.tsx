import { Slot, component$, useStyles$ } from '@builder.io/qwik';

export const Header = component$(() => {
  useStyles$(`
    .dialog-content-title {
      position: sticky;
      top: 0;
    }
  `);

  return (
    <header class="dialog-content-title">
      <Slot />
    </header>
  );
});
