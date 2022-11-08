import { component$, Slot } from '@builder.io/qwik';

interface ModalActionsProps {
  class?: string;
  className?: string;
  id: string;
}

export const DrawerSide = component$(({ id, ...props }: ModalActionsProps) => {
  return (
    <div className="drawer-side" {...props}>
      <label for={id} className="drawer-overlay" />
      <Slot />
    </div>
  );
});
