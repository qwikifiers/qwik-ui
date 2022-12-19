import { component$, Slot, useContext } from '@builder.io/qwik';
import { drawerContext } from './drawer';

export interface DrawerContentProps {
  class?: string;
}

export const DrawerContent = component$((props: DrawerContentProps) => {
  return (
    <div class={props.class ? props.class : ''}>
      <Slot />
    </div>
  );
});
