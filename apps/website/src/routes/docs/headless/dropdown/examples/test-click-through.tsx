import { component$, useSignal } from '@builder.io/qwik';
import { Dropdown } from '@qwik-ui/headless';

export default component$(() => {
  const isOn = useSignal(true);
  const outsideClicks = useSignal(0);
  const itemClicks = useSignal(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <label>
        <input type="checkbox" bind:checked={isOn} /> preventClickThrough
      </label>
      <button data-testid="outside" onClick$={() => outsideClicks.value++}>
        outside clicks: {outsideClicks.value}
      </button>
      <p data-testid="item-clicks">item clicks: {itemClicks.value}</p>
      <Dropdown.Root preventClickThrough={isOn.value}>
        <Dropdown.Trigger>Actions</Dropdown.Trigger>
        <Dropdown.Popover
          floating="right"
          style={{ padding: '1rem', border: '1px solid' }}
        >
          <Dropdown.Item onClick$={() => itemClicks.value++}>Edit</Dropdown.Item>
          <Dropdown.Item>Delete</Dropdown.Item>
        </Dropdown.Popover>
      </Dropdown.Root>
    </div>
  );
});
