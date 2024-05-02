import {
  Combobox,
  ComboboxControl,
  ComboboxIcon,
  ComboboxInput,
  ComboboxListbox,
  ComboboxOption,
  ComboboxPopover,
  ComboboxTrigger,
  ResolvedOption,
} from '@qwik-ui/headless';

import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const isListboxOpenSig = useSignal(false);
  const highlightedIndexSig = useSignal(2);

  const signalsExample = [
    'bind:isListboxOpenSig',
    'bind:isInputFocusedSig',
    'bind:isTriggerFocusedSig',
    'bind:inputValueSig',
  ];

  return (
    <>
      <p class="text-center">I love signals! 🗼</p>
      <div>
        <Combobox
          class="w-fit"
          options={signalsExample}
          bind:isListboxOpen={isListboxOpenSig}
          bind:highlightedIndex={highlightedIndexSig}
        >
          <Combobox.Control class="relative flex items-center rounded-base border">
            <Combobox.Input
              class="px-d2 w-fit rounded-base px-2 pr-6 placeholder:text-muted-foreground"
              onClick$={() => (isListboxOpenSig.value = !isListboxOpenSig.value)}
            />
            <Combobox.Trigger class="group absolute right-0 h-6 w-6">
              <Combobox.Icon class="stroke-foreground transition-transform duration-500 group-aria-expanded:-rotate-180" />
            </Combobox.Trigger>
          </Combobox.Control>
          <Combobox.Popover hide="escaped" gutter={8}>
            <Combobox.Listbox
              class="w-fit rounded-base border-[1px] border-slate-400 bg-slate-900 px-4 py-2"
              optionRenderer$={(option: ResolvedOption, index: number) => (
                <Combobox.Option
                  key={option.key}
                  class="group flex justify-between rounded-base border border-transparent px-2 hover:bg-accent aria-disabled:font-light aria-disabled:text-muted-foreground aria-disabled:hover:bg-muted aria-selected:cursor-pointer aria-selected:border-border aria-selected:bg-accent"
                  index={index}
                  resolved={option}
                >
                  {option.label}
                </Combobox.Option>
              )}
            />
          </Combobox.Popover>
        </Combobox>
      </div>
    </>
  );
});
