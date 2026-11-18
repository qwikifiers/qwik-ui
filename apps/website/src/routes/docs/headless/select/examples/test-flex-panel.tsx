import { component$, useStyles$ } from '@builder.io/qwik';
import { Select } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(`.test-flex { display: flex; flex-direction: column; }`);

  return (
    <Select.Root>
      <Select.Trigger>
        <Select.DisplayValue placeholder="Select an option" />
      </Select.Trigger>
      <Select.Popover class="test-flex">
        <Select.Item>
          <Select.ItemLabel>Tim</Select.ItemLabel>
        </Select.Item>
        <Select.Item>
          <Select.ItemLabel>Ryan</Select.ItemLabel>
        </Select.Item>
      </Select.Popover>
    </Select.Root>
  );
});
