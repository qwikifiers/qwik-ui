import { component$, useStyles$ } from '@builder.io/qwik';
import { Select } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  const items = Array.from({ length: 100 }, (_, i) => (i + 1).toString());

  return (
    <Select.Root class="select">
      <Select.Trigger class="select-trigger">
        <Select.DisplayValue placeholder="Select an option" />
      </Select.Trigger>
      <Select.Popover class="select-popover select-max-height">
        {items.map((item) => (
          <Select.Item key={item} class="highlight-hover">
            <Select.ItemLabel>{item}</Select.ItemLabel>
          </Select.Item>
        ))}
      </Select.Popover>
    </Select.Root>
  );
});

// internal
import styles from '../snippets/select.css?inline';
