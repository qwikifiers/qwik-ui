import { component$, Slot, useContext } from '@builder.io/qwik';
import { drawerContext } from './drawer';

export interface DrawerTriggerProps {
  class?: string;
  label?: string;
  drawerId?: string;
}

export const DrawerTrigger = component$((props: DrawerTriggerProps) => (
  <Slot />
));
