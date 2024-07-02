import { $, component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Select } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  const users = useSignal<string[]>(['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby']);
  const hasAddedUsers = useSignal<boolean>(false);

  return (
    <>
      <Select.Root class="select">
        <Select.Label>Logged in users</Select.Label>
        <Select.Trigger class="select-trigger">
          <Select.DisplayValue placeholder="Select an option" />
        </Select.Trigger>
        <Select.Popover class="select-popover">
          {users.value.map((user) => (
            <Select.Item key={user}>
              <Select.ItemLabel>{user}</Select.ItemLabel>
            </Select.Item>
          ))}
        </Select.Popover>
      </Select.Root>
      <button
        onClick$={$(() => {
          if (!hasAddedUsers.value) {
            users.value = [...users.value, 'John', 'Jane', 'Bob'];
            hasAddedUsers.value = true;
          }
        })}
      >
        Add Users
      </button>
    </>
  );
});

// internal
import styles from '../snippets/select.css?inline';
