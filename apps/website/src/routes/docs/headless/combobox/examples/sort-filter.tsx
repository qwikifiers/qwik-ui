import { Combobox, ResolvedOption } from '@qwik-ui/headless';

import { component$ } from '@builder.io/qwik';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  type Countries = {
    value: string;
    label: string;
  };

  const objectExample: Array<Countries> = [
    { value: 'usa', label: 'United States' },
    { value: 'canada', label: 'Canada' },
    { value: 'mexico', label: 'Mexico' },
    { value: 'brazil', label: 'Brazil' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'germany', label: 'Germany' },
    { value: 'france', label: 'France' },
    { value: 'italy', label: 'Italy' },
  ];

  return (
    <Combobox.Root
      filter$={(value: string, options) =>
        options
          .filter(({ option }) => {
            return option.label.toLowerCase().startsWith(value.toLowerCase());
          })
          .sort((country1, country2) =>
            country1.option.label.localeCompare(country2.option.label),
          )
      }
      options={objectExample}
      class="combobox-root"
    >
      <Combobox.Label class="combobox-label">Countries 🚩</Combobox.Label>
      <Combobox.Control class="combobox-control">
        <Combobox.Input placeholder="United States" class="combobox-input" />
        <Combobox.Trigger class="combobox-trigger">
          <LuChevronDown class="combobox-icon" />
        </Combobox.Trigger>
      </Combobox.Control>
      <Combobox.Popover class="combobox-popover" gutter={8}>
        <Combobox.Listbox
          class="combobox-listbox"
          optionRenderer$={(option: ResolvedOption, index: number) => {
            return (
              <Combobox.Option
                class="combobox-option"
                key={option.key}
                resolved={option}
                index={index}
              >
                <span>{option.label}</span>
              </Combobox.Option>
            );
          }}
        />
      </Combobox.Popover>
    </Combobox.Root>
  );
});
