import { component$ } from '@builder.io/qwik';
import { Select } from '@qwik-ui/headless';

export default component$(() => {
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];

  return (
    <Select.Root>
      <Select.Label>label</Select.Label>
      <Select.Trigger>
        <Select.DisplayValue placeholder="Select an option" />
      </Select.Trigger>
      <Select.Popover>
        {users.map((user) => (
          <Select.Item key={user}>
            <Select.ItemLabel>{user}</Select.ItemLabel>
            <Select.ItemIndicator>{/* Icon */}</Select.ItemIndicator>
          </Select.Item>
        ))}
      </Select.Popover>
    </Select.Root>
  );
});
