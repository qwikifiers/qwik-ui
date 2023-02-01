import { component$, Slot } from '@builder.io/qwik';

interface ModalActionsProps {
  class?: string;
  className?: string;
  id: string;
}

export const DrawerSide = component$(({ id, ...props }: ModalActionsProps) => {
  return (
    <div class="drawer-side" {...props}>
      <label for={id} class="drawer-overlay" />
      <Slot />
    </div>
  );
});
