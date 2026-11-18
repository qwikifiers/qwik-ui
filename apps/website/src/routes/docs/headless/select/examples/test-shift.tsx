import { component$ } from '@builder.io/qwik';
import { Select } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <div style={{ position: 'fixed', top: '1rem', right: '0' }}>
      <Select.Root>
        <Select.Trigger>
          <Select.DisplayValue placeholder="Select an option" />
        </Select.Trigger>
        <Select.Popover
          floating="bottom-start"
          shift
          flip={false}
          style={{ width: '400px', border: '2px solid black', padding: '0.5rem' }}
        >
          <Select.Item>
            <Select.ItemLabel>A listbox that is wider than its trigger</Select.ItemLabel>
          </Select.Item>
        </Select.Popover>
      </Select.Root>
    </div>
  );
});
