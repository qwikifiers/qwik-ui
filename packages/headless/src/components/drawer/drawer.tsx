import { component$ } from '@builder.io/qwik';

export interface DrawerProps {
  whatever?: string;
}

export const Drawer = component$(({ whatever }: DrawerProps) => {
  return <div>Drawer</div>;
});
