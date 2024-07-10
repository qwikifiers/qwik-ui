import { component$, useStyles$ } from '@builder.io/qwik';
import { Select } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  const users = ['Tim', 'Ryan', 'Jim', 'Abby'];
  const animals = ['Dog', 'Cat', 'Bird'];

  return (
    <Select.Root class="select">
      <Select.Trigger class="select-trigger">
        <Select.DisplayValue placeholder="Select an option" />
      </Select.Trigger>
      <Select.Popover class="select-popover">
        <Select.Group>
          <Select.GroupLabel class="select-label">People</Select.GroupLabel>
          {users.map((user) => (
            <Select.Item key={user}>
              <Select.ItemLabel>{user}</Select.ItemLabel>
            </Select.Item>
          ))}
        </Select.Group>
        <Select.Group>
          <Select.GroupLabel class="select-group-label">Animals</Select.GroupLabel>
          {animals.map((animal) => (
            <Select.Item key={animal}>
              <Select.ItemLabel>{animal}</Select.ItemLabel>
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Popover>
    </Select.Root>
  );
});

// internal
import styles from '../snippets/select.css?inline';
