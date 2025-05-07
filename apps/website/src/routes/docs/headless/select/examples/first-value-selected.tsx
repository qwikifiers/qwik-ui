import { component$, useStyles$ } from '@qwik.dev/core';
import { Select } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];

  return (
    <Select.Root value="Tim" class="select">
      <Select.Label>Logged in users</Select.Label>
      <Select.Trigger class="select-trigger">
        <Select.DisplayValue placeholder="Select an option" />
      </Select.Trigger>
      <Select.Popover class="select-popover">
        {users.map((user) => (
          <Select.Item key={user}>
            <Select.ItemLabel>{user}</Select.ItemLabel>
          </Select.Item>
        ))}
      </Select.Popover>
    </Select.Root>
  );
});

// internal
import styles from '../snippets/select.css?inline';
