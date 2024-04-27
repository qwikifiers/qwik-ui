import { $, component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Select } from '@qwik-ui/headless';
export default component$(() => {
  useStyles$(styles);
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];
  const selected = useSignal<string>('Ryan');

  return (
    <>
      <Select.Root bind:value={selected} class="select">
        <Select.Label>Logged in users</Select.Label>
        <Select.Trigger class="select-trigger">
          <Select.Value placeholder="Select an option" />
        </Select.Trigger>
        <Select.Popover class="select-popover">
          <Select.Listbox class="select-listbox">
            {users.map((user, index) => (
              <Select.Item value={index.toString()} key={user}>
                <Select.ItemLabel>{user}</Select.ItemLabel>
              </Select.Item>
            ))}
          </Select.Listbox>
        </Select.Popover>
      </Select.Root>
      <button onClick$={$(() => (selected.value = '4'))}>Change to Abby</button>
    </>
  );
});

// internal
import styles from '../snippets/select.css?inline';
