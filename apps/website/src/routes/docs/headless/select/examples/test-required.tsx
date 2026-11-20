import { component$, useStyles$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { Select } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  const location = useLocation();
  const hasError = location.url.searchParams.get('error') === 'on';

  return (
    <Select.Root class="select" required>
      <Select.Label>Logged in users</Select.Label>
      <Select.Trigger class="select-trigger">
        <Select.DisplayValue placeholder="Select an option" />
      </Select.Trigger>
      <Select.Popover class="select-popover">
        {['Tim', 'Ryan', 'Jim'].map((user) => (
          <Select.Item key={user}>
            <Select.ItemLabel>{user}</Select.ItemLabel>
          </Select.Item>
        ))}
      </Select.Popover>
      {hasError && (
        <Select.ErrorMessage>Make sure to select an option</Select.ErrorMessage>
      )}
    </Select.Root>
  );
});

// internal
import styles from '../snippets/select.css?inline';
