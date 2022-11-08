import { component$, Slot } from '@builder.io/qwik';

interface ModalTriggerProps {
  class?: string;
  className?: string;
  id: string;
}

export const ModalTrigger = component$(({ id }: ModalTriggerProps) => {
  return (
    <label for={id} className="btn">
      <Slot />
    </label>
  );
});
