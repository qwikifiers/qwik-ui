import { Slot, component$ } from '@builder.io/qwik';

export const Content = component$(() => {
  return (
    <div>
      <Slot />
    </div>
  );
});
