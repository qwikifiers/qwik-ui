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
              class="px-d2 w-fit px-2 pr-6 placeholder:text-slate-500"
              onClick$={() => (isListboxOpenSig.value = !isListboxOpenSig.value)}
            />
            <ComboboxTrigger class="group absolute right-0 h-6 w-6">
              <ComboboxIcon class="stroke-slate-50 transition-transform duration-[450ms] group-aria-expanded:-rotate-180" />
            </ComboboxTrigger>
          </ComboboxControl>
          <ComboboxPortal>
            <ComboboxListbox
              gutter={8}
              class="w-fit rounded-sm border bg-slate-950 px-4 py-2 text-slate-50"
              hide="escaped"
              optionRenderer$={(option: ResolvedOption, index: number) => (
                <ComboboxOption
                  key={option.key}
                  class="group flex justify-between rounded-sm border border-transparent px-2 hover:bg-slate-400 aria-disabled:font-light aria-disabled:text-slate-500 aria-disabled:hover:bg-slate-300 aria-selected:cursor-pointer aria-selected:border-slate-500 aria-selected:bg-slate-400"
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
