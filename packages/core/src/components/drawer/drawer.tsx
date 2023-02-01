import { component$, Slot } from '@builder.io/qwik';

interface DrawerProps {
  class?: string;
  className?: string;
  id: string;
}

export const Drawer = component$(({ id, ...props }: DrawerProps) => {
  return (
    <div class="drawer" {...props}>
      <input id={id} type="checkbox" class="drawer-toggle" />
      <Slot />
    </div>
  );
});
