import { $, component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Select } from '@qwik-ui/headless';
import styles from '../snippets/select.css?inline';
export default component$(() => {
  useStyles$(styles);
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];
  const counter = useSignal(0);

  const handleChange$ = $((): void => {
    counter.value++;
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
            <Select.Item key={user}>
              <Select.ItemLabel>{user}</Select.ItemLabel>
            </Select.Item>
          ))}
        </Select.Popover>
      </Select.Root>
      <p>You have changed {counter.value} times</p>
    </>
  );
});
