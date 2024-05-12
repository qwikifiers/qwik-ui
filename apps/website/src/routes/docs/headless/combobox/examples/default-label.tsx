import { Combobox, ResolvedOption } from '@qwik-ui/headless';

import { component$ } from '@builder.io/qwik';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  const names = ['Jim', 'Joanna', 'John', 'Jessica'];

  return (
    <Combobox.Root options={names} defaultLabel={names[2]} class="combobox-root">
      <Combobox.Label class="combobox-label">Names</Combobox.Label>
      <Combobox.Control class="combobox-control">
        <Combobox.Input placeholder="Jim" class="combobox-input" />
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
