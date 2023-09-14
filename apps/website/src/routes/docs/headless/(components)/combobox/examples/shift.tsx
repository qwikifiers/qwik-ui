import {
  Combobox,
  ComboboxControl,
  ComboboxInput,
  ComboboxLabel,
  ComboboxListbox,
  ComboboxOption,
  ComboboxPortal,
  ComboboxTrigger,
  ResolvedOption,
} from '@qwik-ui/headless';

import { component$, useSignal } from '@builder.io/qwik';

export const ShiftExample = component$(() => {
  const shiftExample = ['Example1', 'Example2', 'Example3'];
  const isListboxOpenSig = useSignal(true);

  return (
    <div
      class="relative flex h-[10rem] w-full flex-col items-center gap-4"
      style={{ overflow: 'auto', width: '100%' }}
    >
      <div class="h-[1px] w-[2000px]"></div>
      <div class="flex justify-center">
        <Combobox
          class="w-fit"
          options={shiftExample}
          bind:isListboxOpenSig={isListboxOpenSig}
        >
          <ComboboxLabel class=" font-semibold text-white">Fruits 🍓</ComboboxLabel>
          <ComboboxControl class="relative flex items-center rounded-sm border-[1px] border-slate-400 bg-[#1f2532]">
            <ComboboxInput
              class="px-d2 w-44 bg-slate-900 px-2 pr-6 text-white placeholder:text-slate-500"
              placeholder="Papaya"
            />
            <ComboboxTrigger class="group absolute right-0 h-6 w-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                class="stroke-white transition-transform duration-[450ms] group-aria-expanded:-rotate-180"
                stroke-linecap="round"
                stroke-width="2"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </ComboboxTrigger>
          </ComboboxControl>
          <ComboboxPortal>
            <ComboboxListbox
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
              class="left:0 top:0 absolute w-fit rounded-sm border-[1px] border-slate-400 bg-slate-900 px-4 py-2"
            />
          </ComboboxPortal>
        </Combobox>
      </div>
    </div>
  );
});
