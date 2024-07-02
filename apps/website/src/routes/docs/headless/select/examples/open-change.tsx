import { $, component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Select } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];
  const changeCount = useSignal(0);
  const isOpen = useSignal(false);

  const handleOpenChange$ = $((open: boolean): void => {
    isOpen.value = open;
    changeCount.value++;
  });

  return (
    <>
      <span>It is currently: {isOpen.value ? 'open' : 'closed'}</span>
      <Select.Root onOpenChange$={handleOpenChange$} class="select">
        <Select.Label>Logged in users</Select.Label>
        <Select.Trigger class="select-trigger">
          <Select.DisplayValue placeholder="Select an option" />
        </Select.Trigger>
        <Select.Popover class="select-popover">
          {users.map((user) => (
            <Select.Item key={user}>
              <Select.ItemLabel>{user}</Select.ItemLabel>
            </Select.Item>
          ))}
        </Select.Popover>
      </Select.Root>
      <p>The listbox opened and closed {changeCount.value} time(s)</p>
    </>
  );
});

// internal
import styles from '../snippets/select.css?inline';
