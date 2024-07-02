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
      <Combobox.Control class="combobox-control">
        <Combobox.Input class="combobox-input" />
        <Combobox.Trigger class="combobox-trigger">
          <LuChevronDown class="combobox-icon" />
        </Combobox.Trigger>
      </Combobox.Control>
      <Combobox.Popover class="combobox-popover combobox-max-height" gutter={8}>
        <Combobox.Group>
          <Combobox.GroupLabel class="combobox-group-label">Active</Combobox.GroupLabel>
          {activeUsers.map((user) => (
            <Combobox.Item key={user}>
              <Combobox.ItemLabel>{user}</Combobox.ItemLabel>
            </Combobox.Item>
          ))}
        </Combobox.Group>

        <Combobox.Group>
          <Combobox.GroupLabel class="combobox-group-label">Offline</Combobox.GroupLabel>
          {offlineUsers.map((user) => (
            <Combobox.Item key={user}>
              <Combobox.ItemLabel>{user}</Combobox.ItemLabel>
            </Combobox.Item>
          ))}
        </Combobox.Group>
      </Combobox.Popover>
    </Combobox.Root>
  );
});

// internal
import styles from '../snippets/combobox.css?inline';
