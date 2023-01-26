import { component$, Slot } from '@builder.io/qwik';

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
