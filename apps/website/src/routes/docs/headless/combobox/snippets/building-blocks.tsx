import { component$ } from '@builder.io/qwik';
import { Combobox } from '@qwik-ui/headless';
import { LuCheck } from '@qwikest/icons/lucide';

export default component$(() => {
  return (
    <Combobox.Root>
      <Combobox.Label>label</Combobox.Label>
      <Combobox.Hub>
        <Combobox.Input />
        <Combobox.Trigger>trigger</Combobox.Trigger>
      </Combobox.Hub>
      <Combobox.Popover>
        <Combobox.Listbox>
          <Combobox.Item>
            <Combobox.ItemLabel>item label</Combobox.ItemLabel>
            <Combobox.ItemIndicator>
              <LuCheck />
            </Combobox.ItemIndicator>
          </Combobox.Item>
        </Combobox.Listbox>
      </Combobox.Popover>
    </Combobox.Root>
  );
});
