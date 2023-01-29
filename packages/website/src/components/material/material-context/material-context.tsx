import { component$, Slot } from '@builder.io/qwik';

export const MaterialContext = component$(() => {
  return (
    <div class="qwik-ui-material-theme">
      <Slot />
    </div>
  );
});
