import { Slot, component$ } from '@builder.io/qwik';

export const Title = component$(() => {
  return (
    <span>
      <Slot />
    </span>
  );
});
