import { Slot, component$, useStyles$ } from '@builder.io/qwik';

export const ContentTitle = component$(() => {
  useStyles$(`
    .dialog-content-title {
      position: sticky;
      top: 0;
    }
  `);

  return (
    <div class="dialog-content-title">
      <Slot />
    </div>
  );
});
