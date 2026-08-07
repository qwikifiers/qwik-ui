import { component$, useStore, useStyles$ } from '@builder.io/qwik';
import { Combobox } from '@qwik-ui/headless';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);

  const state = useStore({
    users: [
      { id: '0', label: 'Tim' },
      { id: '1', label: 'Ryan' },
      { id: '2', label: 'Jim' },
      { id: '3', label: 'Jessie' },
      { id: '4', label: 'Abby' },
    ],
  });

  return (
    <Combobox.Root class="combobox-root">
      <Combobox.Label class="combobox-label">Logged in users</Combobox.Label>
      <Combobox.Control class="combobox-control">
        <Combobox.Input class="combobox-input" />
        <Combobox.Trigger class="combobox-trigger">
          <LuChevronDown class="combobox-icon" />
        </Combobox.Trigger>
      </Combobox.Control>
      <Combobox.Popover class="combobox-popover" gutter={8}>
        {state.users.map((user) => (
          <Combobox.Item value={user.id} key={user.id} class="combobox-item">
            <Combobox.ItemLabel>{user.label}</Combobox.ItemLabel>
          </Combobox.Item>
        ))}
      </Combobox.Popover>
    </Combobox.Root>
  );
});

// internal
import styles from '../snippets/combobox.css?inline';
