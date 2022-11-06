import { component$, Slot } from '@builder.io/qwik';

interface DrawerContentProps {
  class?: string;
  className?: string;
}

export const DrawerContent = component$((props: DrawerContentProps) => {
  return (
    <div className="drawer-content" {...props}>
      <Slot name="drawer-content" />
      <Slot name="drawer-trigger" />
    </div>
  );
});
