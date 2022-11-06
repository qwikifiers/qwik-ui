import { component$, Slot } from '@builder.io/qwik';

interface ModalTriggerProps {
  class?: string;
  className?: string;
  id: string;
}

export const ModalTrigger = component$(({ id, ...props }: ModalTriggerProps) => {
  return (
    <label htmlFor={id} className="btn"><Slot /></label>
  );
});
