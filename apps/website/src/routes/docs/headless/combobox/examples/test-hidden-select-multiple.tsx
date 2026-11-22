import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { Combobox } from '@qwik-ui/headless';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);
  const location = useLocation();
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];
  const initial = location.url.searchParams.get('value');
  const selectedUsers = useSignal<string[]>(initial ? initial.split(',') : []);
  const sets = useSignal(0);

  return (
    <form preventdefault:submit>
      <Combobox.Root
        name="users"
        bind:value={selectedUsers}
        multiple
        class="combobox-root"
      >
        <Combobox.Label class="combobox-label">Logged in users</Combobox.Label>
        <Combobox.HiddenNativeSelect />
        <Combobox.Control class="combobox-control">
          <Combobox.Input class="combobox-input" />
          <Combobox.Trigger class="combobox-trigger">
            <LuChevronDown class="combobox-icon" />
          </Combobox.Trigger>
        </Combobox.Control>
        <Combobox.Popover class="combobox-popover" gutter={8}>
          {users.map((name) => (
            <Combobox.Item key={name} class="combobox-item">
              <Combobox.ItemLabel>{name}</Combobox.ItemLabel>
            </Combobox.Item>
          ))}
        </Combobox.Popover>
      </Combobox.Root>
      <button
        type="button"
        onClick$={() => {
          selectedUsers.value = ['Tim', 'Abby'];
          sets.value++;
        }}
      >
        Set to Tim and Abby
      </button>
      <p data-testid="sets">Sets: {sets.value}</p>
    </form>
  );
});

// internal
import styles from '../snippets/combobox.css?inline';
