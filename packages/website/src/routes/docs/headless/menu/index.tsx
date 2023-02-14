import { component$ } from '@builder.io/qwik';
import { Menu, MenuItem } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <h2>This is the documentation for the Menu</h2>
      <Menu isOpen={true}>
        <MenuItem onClick$={() => alert('clicked 1')}>button 1</MenuItem>
        <MenuItem onClick$={() => alert('clicked 2')}>button 2</MenuItem>
        <MenuItem onClick$={() => alert('clicked 3')}>button 3</MenuItem>
      </Menu>
    </>
  );
});
