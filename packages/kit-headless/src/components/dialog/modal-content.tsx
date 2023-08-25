import { Slot, component$ } from '@builder.io/qwik';

export const ModalContent = component$(() => {
  return (
    <div>
      <Slot />
    </div>
  );
});
