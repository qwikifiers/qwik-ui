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

export default component$(() => {
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
          <ComboboxLabel class=" font-semibold">Fruits 🍓</ComboboxLabel>
          <ComboboxControl class="relative flex items-center rounded-sm border">
            <ComboboxInput
              class="px-d2 bg-background placeholder:text-muted-foreground w-44 px-2 pr-6"
              placeholder="Papaya"
            />
            <ComboboxTrigger class="group absolute right-0 h-6 w-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                class="stroke-foreground transition-transform duration-[450ms] group-aria-expanded:-rotate-180"
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
                  class="hover:bg-accent aria-disabled:text-muted-foreground aria-disabled:hover:bg-muted aria-selected:border-border aria-selected:bg-accent group flex justify-between rounded-sm border border-transparent px-2 aria-disabled:font-light aria-selected:cursor-pointer"
                  index={index}
                  resolved={option}
                >
                  {option.label}
                </ComboboxOption>
              )}
              class="left:0 top:0 absolute w-fit rounded-sm border px-4 py-2"
            />
          </ComboboxPortal>
        </Combobox>
      </div>
    </div>
  );
});
