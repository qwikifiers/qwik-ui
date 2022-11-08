import { component$, Slot } from '@builder.io/qwik';

interface ModalProps {
  class?: string;
  className?: string;
  id: string;
}

export const Modal = component$(({ id, ...props }: ModalProps) => {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" {...props} />
      <label for={id} className="modal">
        <Slot />
      </label>
    </>
  );
});
