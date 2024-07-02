import { component$ } from '@builder.io/qwik';
import { Combobox } from '@qwik-ui/headless';
import { LuCheck } from '@qwikest/icons/lucide';

export default component$(() => {
  return (
    <Combobox.Root>
      <Combobox.Label>label</Combobox.Label>

      <Combobox.Control>
        <Combobox.Input />
        <Combobox.Trigger>trigger</Combobox.Trigger>
      </Combobox.Control>

      <Combobox.Popover>
        <Combobox.Item>
          <Combobox.ItemLabel>item label</Combobox.ItemLabel>
          <Combobox.ItemIndicator>
            <LuCheck />
          </Combobox.ItemIndicator>
        </Combobox.Item>
      </Combobox.Popover>
    </Combobox.Root>
  );
});
