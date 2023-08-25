import { Slot, component$ } from '@builder.io/qwik';

export const Footer = component$(() => {
  return (
    <footer>
      <Slot />
    </footer>
  );
});
