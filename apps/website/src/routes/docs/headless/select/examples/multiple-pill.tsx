import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Select } from '@qwik-ui/headless';
import { LuCheck, LuX } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];
  const display = useSignal<string[]>(['Jim']);
  const selected = useSignal<string[]>(['Jim']);

  return (
    <Select.Root multiple bind:display={display} bind:value={selected} class="select">
      <Select.Label>Logged in users</Select.Label>
      <Select.Trigger class="select-trigger">
        <Select.Value>
          {display.value.map((opt) => (
            <span class="select-pill" key={opt}>
              {opt}
              <span
                onClick$={() =>
                  (selected.value = selected.value?.filter(
                    (selectedOpt) => selectedOpt !== opt,
                  ))
                }
              >
                <LuX aria-hidden="true" />
              </span>
            </span>
          ))}
        </Select.Value>
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
