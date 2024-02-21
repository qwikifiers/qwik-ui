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
          <ComboboxControl class="rounded-base relative flex items-center border">
            <ComboboxInput
              class="px-d2 placeholder:text-muted-foreground rounded-base w-fit px-2 pr-6"
              onClick$={() => (isListboxOpenSig.value = !isListboxOpenSig.value)}
            />
            <ComboboxTrigger class="group absolute right-0 h-6 w-6">
              <ComboboxIcon class="stroke-foreground transition-transform duration-500 group-aria-expanded:-rotate-180" />
            </ComboboxTrigger>
          </ComboboxControl>
          <ComboboxPopover hide="escaped" gutter={8}>
            <ComboboxListbox
              class="rounded-base w-fit border-[1px] border-slate-400 bg-slate-900 px-4 py-2"
              optionRenderer$={(option: ResolvedOption, index: number) => (
                <ComboboxOption
                  key={option.key}
                  class="hover:bg-accent aria-disabled:text-muted-foreground aria-disabled:hover:bg-muted aria-selected:border-border aria-selected:bg-accent rounded-base group flex justify-between border border-transparent px-2 aria-disabled:font-light aria-selected:cursor-pointer"
                  index={index}
                  resolved={option}
                >
                  {option.label}
                </ComboboxOption>
              )}
            />
          </ComboboxPopover>
        </Combobox>
      </div>
    </>
  );
});
