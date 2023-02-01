import { Meta } from '@storybook/html';
import { Drawer } from './drawer';
import { DrawerTrigger } from './drawerTrigger';
import { DrawerContent } from './drawerContent';
import { DrawerSide } from './drawerSide';

export default {
  title: 'Layout / Drawer',
} as Meta;

const drawerName = 'my-drawer';

const Template = (args: any) => (
  <Drawer id={drawerName} {...args}>
    <DrawerContent>
      <div q:slot="drawer-content">
        <h3 class="font-bold text-lg">regular layout</h3>
        <p class="py-4">The content of the regular layout</p>
      </div>
      <div q:slot="drawer-trigger">
        <DrawerTrigger id={drawerName} label="Open Drawer" />
      </div>
    </DrawerContent>
    <DrawerSide id={drawerName}>
      <div class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
        <h3 class="font-bold text-lg">drawer side content</h3>
        <p class="py-4">The content of the drawer side</p>
      </div>
    </DrawerSide>
  </Drawer>
);

export const Default = Template.bind({});
