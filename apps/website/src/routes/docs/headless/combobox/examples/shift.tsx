import {
  Combobox,
  ComboboxControl,
  ComboboxInput,
  ComboboxLabel,
  ComboboxListbox,
  ComboboxOption,
  ComboboxPopover,
  ComboboxTrigger,
  ResolvedOption,
} from '@qwik-ui/headless';

import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const shiftExample = ['Example1', 'Example2', 'Example3'];
  const isListboxOpenSig = useSignal(true);

  return (
    <div
      class="flex h-[10rem] w-full flex-col items-center gap-4"
      style={{ overflow: 'auto', width: '100%' }}
    >
      <div class="h-[1px] w-[2000px]"></div>
      <div class="flex justify-center">
        <Combobox.Root
          class="w-fit"
          options={shiftExample}
          bind:isListboxOpen={isListboxOpenSig}
        >
          <Combobox.Label class=" font-semibold">Fruits 🍓</Combobox.Label>
          <Combobox.Control class="relative flex items-center rounded-base border">
            <Combobox.Input
              class="px-d2 w-44 rounded-base bg-background px-2 pr-6 placeholder:text-muted-foreground"
              placeholder="Papaya"
            />
            <Combobox.Trigger class="group absolute right-0 h-6 w-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                class="stroke-foreground transition-transform duration-500 group-aria-expanded:-rotate-180"
                stroke-linecap="round"
                stroke-width="2"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Combobox.Trigger>
          </Combobox.Control>
          <Combobox.Popover>
            <Combobox.Listbox
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
              class="left:0 top:0 absolute w-fit rounded-base border px-4 py-2"
            />
          </Combobox.Popover>
        </Combobox.Root>
      </div>
    </div>
  );
});
