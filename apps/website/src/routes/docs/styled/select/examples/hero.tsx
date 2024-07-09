import { component$ } from '@builder.io/qwik';
import { LuCheck } from '@qwikest/icons/lucide';
import { Select } from '~/components/ui';

export default component$(() => {
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];

  return (
    <Select.Root>
      <Select.Label>Logged in users</Select.Label>
      <Select.Trigger>
        <Select.DisplayValue placeholder="Select an option" />
      </Select.Trigger>
      <Select.Popover gutter={8}>
        {users.map((user) => (
          <Select.Item key={user}>
            <Select.ItemLabel>{user}</Select.ItemLabel>
            <Select.ItemIndicator>
              <LuCheck class="h-4 w-4" />
            </Select.ItemIndicator>
          </Select.Item>
        ))}
      </Select.Popover>
    </Select.Root>
  );
});
