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
      <ComboboxLabel>Label Element</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput />
        <ComboboxTrigger>Opens Listbox</ComboboxTrigger>
      </ComboboxControl>
      <ComboboxPopover>
        <ComboboxListbox
          optionRenderer$={(option: ResolvedOption, index: number) => (
            <ComboboxOption index={index} resolved={option}>
              Option Label
            </ComboboxOption>
          )}
        />
      </ComboboxPopover>
    </Combobox>
  );
});
