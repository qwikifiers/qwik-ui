import { component$ } from '@builder.io/qwik';
import { Combobox } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Combobox.Root>
      <Combobox.Label />
      <Combobox.Input />
      <Combobox.Trigger />
      <Combobox.Description />
      <Combobox.ErrorMessage />
      <Combobox.Popover>
        <Combobox.Listbox>
          <Combobox.Item>
            <Combobox.ItemLabel />
            <Combobox.ItemIndicator />
          </Combobox.Item>
        </Combobox.Listbox>
      </Combobox.Popover>
    </Combobox.Root>
  );
});
