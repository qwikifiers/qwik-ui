import {
  Combobox,
  ComboboxControl,
  ComboboxIcon,
  ComboboxInput,
  ComboboxLabel,
  ComboboxListbox,
  ComboboxOption,
  ComboboxPopover,
  ComboboxTrigger,
  ResolvedOption,
} from '@qwik-ui/headless';

import { component$ } from '@builder.io/qwik';

export default component$(() => {
  const fruits = [
    'Apple',
    'Apricot',
    'Avocado 🥑',
    'Banana',
    'Bilberry',
    'Blackberry',
    'Blackcurrant',
    'Blueberry',
    'Boysenberry',
    'Currant',
    'Cherry',
    'Coconut',
    'Cranberry',
    'Cucumber',
  ];

  return (
    <Combobox
      class="w-fit"
      options={fruits}
      filter$={(value: string, options) =>
        options.filter(({ option }) => {
          return option.toLowerCase().startsWith(value.toLowerCase());
        })
      }
    >
      <ComboboxLabel class=" font-semibold">Fruits 🍓</ComboboxLabel>
      <ComboboxControl class="rounded-base relative flex items-center border">
        <ComboboxInput
          class="px-d2 bg-background placeholder:text-muted-foreground rounded-base w-44 px-2 pr-6"
          placeholder="Papaya"
        />
        <ComboboxTrigger class="group absolute right-0 h-6 w-6">
          <ComboboxIcon class="stroke-foreground transition-transform duration-500 group-aria-expanded:-rotate-180" />
        </ComboboxTrigger>
      </ComboboxControl>
      <ComboboxPopover gutter={8}>
        <ComboboxListbox
          class="rounded-base w-44 border-[1px] border-slate-400 px-4 py-2 dark:bg-slate-900 dark:text-white"
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
  );
});
