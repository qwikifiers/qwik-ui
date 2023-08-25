import { Slot, component$ } from '@builder.io/qwik';

export const ModalHeader = component$(() => {
  return (
    <header>
      <Slot />
    </header>
  );
});
