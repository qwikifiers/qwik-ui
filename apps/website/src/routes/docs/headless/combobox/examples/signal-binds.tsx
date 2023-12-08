import {
  Combobox,
  ComboboxControl,
  ComboboxIcon,
  ComboboxInput,
  ComboboxListbox,
  ComboboxOption,
  ComboboxPortal,
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
          bind:isListboxOpenSig={isListboxOpenSig}
          bind:highlightedIndexSig={highlightedIndexSig}
        >
          <ComboboxControl class="relative flex items-center rounded-sm border">
            <ComboboxInput
              class="px-d2 placeholder:text-muted-foreground w-fit px-2 pr-6"
              onClick$={() => (isListboxOpenSig.value = !isListboxOpenSig.value)}
            />
            <ComboboxTrigger class="group absolute right-0 h-6 w-6">
              <ComboboxIcon class="stroke-foreground transition-transform duration-[450ms] group-aria-expanded:-rotate-180" />
            </ComboboxTrigger>
          </ComboboxControl>
          <ComboboxPortal>
            <ComboboxListbox
              gutter={8}
              class="bg-background w-fit rounded-sm border px-4 py-2"
              hide="escaped"
              optionRenderer$={(option: ResolvedOption, index: number) => (
                <ComboboxOption
                  key={option.key}
                  class="hover:bg-accent aria-disabled:text-muted-foreground aria-disabled:hover:bg-muted aria-selected:border-border aria-selected:bg-accent group flex justify-between rounded-sm border border-transparent px-2 aria-disabled:font-light aria-selected:cursor-pointer"
                  index={index}
                  resolved={option}
                >
                  {option.label}
                </ComboboxOption>
              )}
            />
          </ComboboxPortal>
        </Combobox>
      </div>
    </>
  );
});
