import { component$, Slot } from '@builder.io/qwik';
import {
  Drawer as DrawerHeadless,
  DrawerContent,
  DrawerTrigger,
} from '@qwik-ui/headless';

export interface DrawerProps {
  class?: string;
  label: string;
  drawerId: string;
}

export type DrawerState = 'open' | 'closed' | 'closing';

export const Drawer = component$((props: DrawerProps) => {
  return (
    <DrawerHeadless class="drawer">
      <DrawerTrigger>
        <input id={props.drawerId} type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          <label for={props.drawerId} class="btn btn-primary drawer-button">
            {props.label}
          </label>
        </div>
      </DrawerTrigger>
      <DrawerContent class="drawer-side">
        <Slot />
      </DrawerContent>
    </DrawerHeadless>
  );
});
