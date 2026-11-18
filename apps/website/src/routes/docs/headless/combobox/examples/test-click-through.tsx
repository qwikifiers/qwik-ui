import { component$, useSignal } from '@builder.io/qwik';
import { Combobox } from '@qwik-ui/headless';

export default component$(() => {
  const isOn = useSignal(true);
  const outsideClicks = useSignal(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <label>
        <input type="checkbox" bind:checked={isOn} /> preventClickThrough
      </label>
      <button data-testid="outside" onClick$={() => outsideClicks.value++}>
        outside clicks: {outsideClicks.value}
      </button>
      <Combobox.Root preventClickThrough={isOn.value}>
        <Combobox.Control>
          <Combobox.Input style={{ border: '1px solid' }} />
          <Combobox.Trigger>Open</Combobox.Trigger>
        </Combobox.Control>
        <Combobox.Popover
          floating="right"
          style={{ padding: '1rem', border: '1px solid' }}
        >
          <Combobox.Item>
            <Combobox.ItemLabel>Apple</Combobox.ItemLabel>
          </Combobox.Item>
          <Combobox.Item>
            <Combobox.ItemLabel>Cherry</Combobox.ItemLabel>
          </Combobox.Item>
        </Combobox.Popover>
      </Combobox.Root>
    </div>
  );
});
