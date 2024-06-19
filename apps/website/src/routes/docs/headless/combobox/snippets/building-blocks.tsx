import { component$ } from '@builder.io/qwik';
import { Combobox, ResolvedOption } from '@qwik-ui/headless';

export default component$(() => {
  const data = ['a', 'b', 'c'];

  return (
    <Combobox.Root options={data}>
      <Combobox.Label>Label Element</Combobox.Label>
      <Combobox.Hub>
        <Combobox.Input />
        <Combobox.Trigger>Opens Listbox</Combobox.Trigger>
      </Combobox.Hub>
      <Combobox.Popover>
        <Combobox.Listbox
          optionRenderer$={(option: ResolvedOption, index: number) => (
            <Combobox.Option index={index} resolved={option}>
              Option Label
            </Combobox.Option>
          )}
        />
      </Combobox.Popover>
    </Combobox.Root>
  );
});
