import { component$, Slot } from '@builder.io/qwik';
import {
  Drawer as DrawerHeadless,
  DrawerModal,
  DrawerTrigger,
} from '@qwik-ui/headless';

export interface DrawerProps {
  class?: string;
  label: string;
}

export type DrawerState = 'open' | 'closed' | 'closing';

export const Drawer = component$((props: DrawerProps) => {
  return (
    <DrawerHeadless class="drawer">
      <DrawerTrigger
        class="drawer-toggle btn btn-primary drawer-button"
        label={props.label}
      />
      <DrawerModal class="drawer-side">
        <Slot name="drawerContent" />
      </DrawerModal>
    </DrawerHeadless>
  );
});
