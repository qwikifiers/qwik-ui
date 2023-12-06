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
      <p class="text-center text-white">I love signals! 🗼</p>
      <div>
        <Combobox
          class="w-fit"
          options={signalsExample}
          bind:isListboxOpenSig={isListboxOpenSig}
          bind:highlightedIndexSig={highlightedIndexSig}
        >
          <ComboboxControl class="relative flex items-center rounded-sm border-[1px] border-slate-400 bg-[#1f2532]">
            <ComboboxInput
              class="px-d2 w-fit bg-slate-900 px-2 pr-6 text-white placeholder:text-slate-500"
              onClick$={() => (isListboxOpenSig.value = !isListboxOpenSig.value)}
            />
            <ComboboxTrigger class="group absolute right-0 h-6 w-6">
              <ComboboxIcon class="stroke-white transition-transform duration-[450ms] group-aria-expanded:-rotate-180" />
            </ComboboxTrigger>
          </ComboboxControl>
          <ComboboxPortal>
            <ComboboxListbox
              gutter={8}
              class="w-fit rounded-sm border-[1px] border-slate-400 bg-slate-900 px-4 py-2"
              hide="escaped"
              optionRenderer$={(option: ResolvedOption, index: number) => (
                <ComboboxOption
                  key={option.key}
                  class="group rounded-sm border-2 border-transparent px-2 text-white hover:bg-slate-500  aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 aria-selected:border-slate-200 aria-selected:bg-slate-500"
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
