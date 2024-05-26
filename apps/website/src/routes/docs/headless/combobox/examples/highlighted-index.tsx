import { Combobox, ResolvedOption } from '@qwik-ui/headless';

import { component$, useSignal } from '@builder.io/qwik';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  const highlightedIndexSig = useSignal(2);

  const highlightedExample = [
    'not highlighted',
    'not highlighted',
    'highlighted by default!',
    'not highlighted',
  ];

  return (
    <>
      <p class="text-center">Third option highlighted! 🚨</p>
      <Combobox.Root
        bind:highlightedIndex={highlightedIndexSig}
        options={highlightedExample}
        class="combobox-root"
      >
        <Combobox.Label class="combobox-label">Highlighted 🚨</Combobox.Label>
        <Combobox.Control class="combobox-control">
          <Combobox.Input placeholder="not highlighted" class="combobox-input" />
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
    </>
  );
});
