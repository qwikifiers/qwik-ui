import { component$, Slot } from '@builder.io/qwik';

interface ModalActionsProps {
  class?: string;
  className?: string;
}

export const ModalActions = component$((props: ModalActionsProps) => {
  return (
    <div class="modal-action" {...props}>
      <Slot />
    </div>
  );
});
