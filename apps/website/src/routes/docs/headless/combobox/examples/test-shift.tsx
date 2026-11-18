import { component$ } from '@builder.io/qwik';
import { Combobox } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <div style={{ position: 'fixed', top: '1rem', right: '0' }}>
      <Combobox.Root>
        <Combobox.Control>
          <Combobox.Input style={{ width: '6rem', border: '1px solid black' }} />
          <Combobox.Trigger>Open</Combobox.Trigger>
        </Combobox.Control>
        <Combobox.Popover
          floating="bottom-start"
          shift
          flip={false}
          style={{ width: '400px', border: '2px solid black', padding: '0.5rem' }}
        >
          <Combobox.Item>
            <Combobox.ItemLabel>A listbox that is wider than its control</Combobox.ItemLabel>
          </Combobox.Item>
        </Combobox.Popover>
      </Combobox.Root>
    </div>
  );
});
