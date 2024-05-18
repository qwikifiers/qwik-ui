import { component$ } from '@builder.io/qwik';
import { Select } from '~/components/ui';

export default component$(() => {
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];

  return (
    <Select.Root>
      <Select.Label>Logged in users</Select.Label>
      <Select.Trigger>
        <Select.DisplayText placeholder="Select an option" />
      </Select.Trigger>
      <Select.Popover>
        <Select.Listbox>
          {users.map((user) => (
            <Select.Item key={user}>{user}</Select.Item>
          ))}
        </Select.Listbox>
      </Select.Popover>
    </Select.Root>
  );
});
