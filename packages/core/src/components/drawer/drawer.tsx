import { component$, Slot } from '@builder.io/qwik';

interface DrawerProps {
  class?: string;
  className?: string;
  id: string;
}

export const Drawer = component$(({id, ...props} : DrawerProps) => {
  return (
    <div className="drawer" {...props}>
      <input id={id} type="checkbox" className="drawer-toggle" />
      <Slot />
    </div>
  );
});
