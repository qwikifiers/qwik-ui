import { component$ } from '@builder.io/qwik';
import { Menu, MenuItem } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <h2>This is the documentation for the Menu</h2>
      <div class="py-8">
        <Menu>
          <MenuItem onClick$={() => alert('clicked 1')}>Menu item 1</MenuItem>
          <MenuItem onClick$={() => alert('clicked 2')}>Menu item 2</MenuItem>
          <MenuItem onClick$={() => alert('clicked 3')}>Menu item 3</MenuItem>
        </Menu>
      </div>
    </>
  );
});
