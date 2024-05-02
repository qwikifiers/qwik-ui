import { component$ } from '@builder.io/qwik';
import {
  Combobox,
  ComboboxLabel,
  ComboboxControl,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxPopover,
  ComboboxListbox,
  ComboboxOption,
  ResolvedOption,
} from '@qwik-ui/headless';

export default component$(() => {
  const data = ['a', 'b', 'c'];

  return (
    <Combobox options={data}>
      <Combobox.Label>Label Element</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.Trigger>Opens Listbox</Combobox.Trigger>
      </Combobox.Control>
      <Combobox.Popover>
        <Combobox.Listbox
          optionRenderer$={(option: ResolvedOption, index: number) => (
            <Combobox.Option index={index} resolved={option}>
              Option Label
            </Combobox.Option>
          )}
        />
      </Combobox.Popover>
    </Combobox>
  );
});
