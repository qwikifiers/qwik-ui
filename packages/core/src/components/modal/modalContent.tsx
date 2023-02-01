import { component$, Slot } from '@builder.io/qwik';

interface ModalContentProps {
  class?: string;
  className?: string;
}

export const ModalContent = component$((props: ModalContentProps) => {
  return (
    <div class="modal-box" {...props}>
      <Slot />
    </div>
  );
});
