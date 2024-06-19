import { component$, useStyles$ } from '@builder.io/qwik';
import { Combobox } from '@qwik-ui/headless';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);
  const activeUsers = ['Tim', 'Ryan', 'Jim', 'Abby'];
  const offlineUsers = ['Joey', 'Bob', 'Jack', 'John'];

  return (
    <Combobox.Root class="combobox-root">
      <Combobox.Label class="combobox-label">User count</Combobox.Label>
      <Combobox.Hub class="combobox-hub">
        <Combobox.Input class="combobox-input" />
        <Combobox.Trigger class="combobox-trigger">
          <LuChevronDown class="combobox-icon" />
        </Combobox.Trigger>
      </Combobox.Hub>
      <Combobox.Popover class="combobox-popover" gutter={8}>
        <Combobox.Listbox class="combobox-listbox combobox-max-height">
          <Combobox.Group>
            <Combobox.GroupLabel class="combobox-group-label">Active</Combobox.GroupLabel>
            {activeUsers.map((user) => (
              <Combobox.Item key={user}>
                <Combobox.ItemLabel>{user}</Combobox.ItemLabel>
              </Combobox.Item>
            ))}
          </Combobox.Group>
          <Combobox.Group>
            <Combobox.GroupLabel class="combobox-group-label">
              Offline
            </Combobox.GroupLabel>
            {offlineUsers.map((user) => (
              <Combobox.Item key={user}>
                <Combobox.ItemLabel>{user}</Combobox.ItemLabel>
              </Combobox.Item>
            ))}
          </Combobox.Group>
        </Combobox.Listbox>
      </Combobox.Popover>
    </Combobox.Root>
  );
});

// internal
import styles from '../snippets/combobox.css?inline';
