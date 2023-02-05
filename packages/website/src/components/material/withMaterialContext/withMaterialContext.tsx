import { component$, Slot } from '@builder.io/qwik';

export const WithMaterialStyles = component$(() => {
  return (
    <div class="qwik-ui-material-theme">
      <Slot />
    </div>
  );
});
