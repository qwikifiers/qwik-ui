import { Combobox, ResolvedOption } from '@qwik-ui/headless';

import { component$ } from '@builder.io/qwik';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  const planets = [
    'Mercury',
    'Venus',
    'Earth',
    'Mars',
    'Jupiter',
    'Saturn',
    'Uranus',
    'Neptune',
  ];

  return (
    <div class="flex flex-col items-center">
      <p class="text-center">I have blur disabled! Inspect me in the dev tools.</p>
      <Combobox.Root options={planets} class="combobox-root">
        <Combobox.Label class="combobox-label">Planets</Combobox.Label>
        <Combobox.Control class="combobox-control">
          <Combobox.Input
            disableOnBlur={true}
            placeholder="Mercury"
            class="combobox-input"
          />
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
    </div>
  );
});
