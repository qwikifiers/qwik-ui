import { $, component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Select } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  const users = [
    { id: '0', label: 'Tim' },
    { id: '1', label: 'Ryan' },
    { id: '2', label: 'Jim' },
    { id: '3', label: 'Jessie' },
    { id: '4', label: 'Abby' },
  ];

  const selected = useSignal<string | null>(null);

  const handleChange$ = $((value: string) => {
    selected.value = value;
  });

  return (
    <>
      <Select.Root onChange$={handleChange$} class="select">
        <Select.Label>Logged in users</Select.Label>
        <Select.Trigger class="select-trigger">
          <Select.DisplayValue placeholder="Select an option" />
        </Select.Trigger>
        <Select.Popover class="select-popover">
          {users.map((user) => (
            <Select.Item value={user.id} key={user.id}>
              <Select.ItemLabel>{user.label}</Select.ItemLabel>
            </Select.Item>
          ))}
        </Select.Popover>
      </Select.Root>
      <p>The selected value is: {selected.value ?? 'null'}</p>
    </>
  );
});

// internal
import styles from '../snippets/select.css?inline';
