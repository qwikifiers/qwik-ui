import { component$, Slot } from '@builder.io/qwik';

export const MaterialProvider = component$(() => {
  return (
    <div class="qwik-ui-material-theme">
      <Slot />
    </div>
  );
});
