import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Select } from '@qwik-ui/headless';
import { LuCheck } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];
  const display = useSignal<string[]>([]);

  return (
    <Select.Root bind:displayValue={display} multiple class="select">
      <Select.Trigger class="select-trigger">
        <Select.DisplayValue>{display.value.join(', ')}</Select.DisplayValue>
      </Select.Trigger>
      <Select.Popover class="select-popover">
        {users.map((user, index) => (
          <Select.Item value={index.toString()} class="select-item" key={user}>
            <Select.ItemLabel>{user}</Select.ItemLabel>
            <Select.ItemIndicator>
              <LuCheck />
            </Select.ItemIndicator>
          </Select.Item>
        ))}
      </Select.Popover>
    </Select.Root>
  );
});

// internal
import styles from '../snippets/select.css?inline';
