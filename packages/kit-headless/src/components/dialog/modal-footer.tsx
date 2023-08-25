import { Slot, component$ } from '@builder.io/qwik';

export const ModalFooter = component$(() => {
  return (
    <footer>
      <Slot />
    </footer>
  );
});
