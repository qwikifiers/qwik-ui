import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Select } from '@qwik-ui/headless';
import { LuCheck } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];
  const selected = useSignal<string[]>([]);

  return (
    <Select.Root multiple bind:value={selected} class="select">
      <Select.Trigger class="select-trigger">
        <Select.Value>{selected.value.join(', ')}</Select.Value>
      </Select.Trigger>
      <Select.Popover class="select-popover">
        <Select.Listbox class="select-listbox">
          {users.map((user) => (
            <Select.Item class="select-item" key={user}>
              <Select.ItemLabel>{user}</Select.ItemLabel>
              <Select.ItemIndicator>
                <LuCheck />
              </Select.ItemIndicator>
            </Select.Item>
          ))}
        </Select.Listbox>
      </Select.Popover>
    </Select.Root>
  );
});

// internal
import styles from '../snippets/select.css?inline';
