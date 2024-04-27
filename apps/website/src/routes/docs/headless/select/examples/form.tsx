import { component$, useStyles$ } from '@builder.io/qwik';
import { Select } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];

  return (
    <form preventdefault:submit>
      <Select.Root required class="select">
        <Select.Label>Logged in users</Select.Label>
        <Select.Trigger class="select-trigger">
          <Select.Value placeholder="Select an option" />
        </Select.Trigger>
        <Select.Popover class="select-popover">
          <Select.Listbox class="select-listbox">
            {users.map((user) => (
              <Select.Item key={user}>
                <Select.ItemLabel>{user}</Select.ItemLabel>
              </Select.Item>
            ))}
          </Select.Listbox>
        </Select.Popover>
      </Select.Root>
      <label style={{ display: 'flex', flexDirection: 'column' }}>
        Your favorite cat name
        <input />
      </label>
      <button type="submit">Submit my form!</button>
    </form>
  );
});

// internal
import styles from '../snippets/select.css?inline';
