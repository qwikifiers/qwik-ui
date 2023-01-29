import { component$, Slot } from '@builder.io/qwik';

export interface DrawerTriggerProps {
  class?: string;
  label?: string;
  drawerId?: string;
}

export const DrawerTrigger = component$(() => (
  <Slot />
));
