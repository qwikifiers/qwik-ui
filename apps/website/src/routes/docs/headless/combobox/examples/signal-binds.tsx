import { Combobox, ResolvedOption } from '@qwik-ui/headless';

import { component$, useSignal } from '@builder.io/qwik';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  const isListboxOpenSig = useSignal(false);
  const highlightedIndexSig = useSignal(2);

  const signalsExample = [
    'bind:isListboxOpen',
    'bind:isInputFocused',
    'bind:isTriggerFocused',
    'bind:inputValue',
  ];

  return (
    <Combobox.Root
      bind:isListboxOpen={isListboxOpenSig}
      bind:highlightedIndex={highlightedIndexSig}
      options={signalsExample}
      class="combobox-root"
    >
      <Combobox.Label class="combobox-label">I love signals! 🗼</Combobox.Label>
      <Combobox.Control class="combobox-control">
        <Combobox.Input
          onClick$={() => (isListboxOpenSig.value = !isListboxOpenSig.value)}
          placeholder="bind:isListboxOpen"
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
  );
});
