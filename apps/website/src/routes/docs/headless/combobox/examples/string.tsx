import { Combobox, ResolvedOption } from '@qwik-ui/headless';

import { component$ } from '@builder.io/qwik';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  const fruits = [
    'Apple',
    'Apricot',
    'Avocado 🥑',
    'Banana',
    'Bilberry',
    'Blackberry',
    'Blackcurrant',
    'Blueberry',
    'Boysenberry',
    'Currant',
    'Cherry',
    'Coconut',
    'Cranberry',
    'Cucumber',
  ];

  return (
    <Combobox.Root options={fruits} class="combobox-root">
      <Combobox.Label class="combobox-label">Fruits 🍓</Combobox.Label>
      <Combobox.Control class="combobox-control">
        <Combobox.Input placeholder="Cucumber" class="combobox-input" />
        <Combobox.Trigger class="combobox-trigger">
          <LuChevronDown class="combobox-icon" />
        </Combobox.Trigger>
      </Combobox.Control>
      <Combobox.Popover class="combobox-popover" gutter={8}>
        <Combobox.Listbox
          class="combobox-listbox"
          optionRenderer$={(option: ResolvedOption, index: number) => {
            const myData = option.option as string;
            return (
              <Combobox.Option
                class="combobox-option"
                key={option.key}
                resolved={option}
                index={index}
              >
                <span>{myData}</span>
              </Combobox.Option>
            );
          }}
        />
      </Combobox.Popover>
    </Combobox.Root>
  );
});
