import { component$ } from '@builder.io/qwik';
import { Dropdown } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger>Actions</Dropdown.Trigger>
      <Dropdown.Popover strategy="fixed">
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item>Delete</Dropdown.Item>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
});
