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
    <>
      <p class="text-center">☝️ Scroll up and down with me open! 👇</p>
      <Combobox
        class="w-fit"
        options={fruits}
        filter$={(value: string, options) =>
          options.filter(({ option }) => {
            return option.toLowerCase().startsWith(value.toLowerCase());
          })
        }
      >
        <ComboboxControl class="relative flex items-center rounded-base border">
          <ComboboxInput class="px-d2 w-44 rounded-base bg-background px-2 pr-6 placeholder:text-muted-foreground" />
          <ComboboxTrigger class="group absolute right-0 h-6 w-6">
            <ComboboxIcon class="stroke-foreground transition-transform duration-500 group-aria-expanded:-rotate-180" />
          </ComboboxTrigger>
        </ComboboxControl>
        <ComboboxPopover gutter={8} hide="escaped">
          <ComboboxListbox
            class="w-44 rounded-base border-[1px] border-slate-400 bg-slate-900 px-4 py-2"
            optionRenderer$={(option: ResolvedOption, index: number) => (
              <ComboboxOption
                key={option.key}
                class="group flex justify-between rounded-base border border-transparent px-2 hover:bg-accent aria-disabled:font-light aria-disabled:text-muted-foreground aria-disabled:hover:bg-muted aria-selected:cursor-pointer aria-selected:border-border aria-selected:bg-accent"
                index={index}
                resolved={option}
              >
                {option.label}
              </ComboboxOption>
            )}
          />
        </ComboboxPopover>
      </Combobox>
    </>
  );
});
