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

import { component$ } from '@builder.io/qwik';

export default component$(() => {
  const planets = [
    'Mercury',
    'Venus',
    'Earth',
    'Mars',
    'Jupiter',
    'Saturn',
    'Uranus',
    'Neptune',
  ];

  return (
    <div class="flex flex-col items-center">
      <p class="text-center text-white">
        I have blur disabled! Inspect me in the dev tools.
      </p>
      <Combobox
        class="w-fit"
        options={planets}
        filter$={(value: string, options) =>
          options.filter(({ option }) => {
            return option.toLowerCase().startsWith(value.toLowerCase());
          })
        }
      >
        <ComboboxControl class="relative flex items-center rounded-sm border-[1px] border-slate-400 bg-[#1f2532]">
          <ComboboxInput
            disableOnBlur={true}
            class="px-d2 w-44 bg-slate-900 px-2 pr-6 text-white placeholder:text-slate-500"
          />
          <ComboboxTrigger class="group absolute right-0 h-6 w-6">
            <ComboboxIcon class="stroke-white transition-transform duration-[450ms] group-aria-expanded:-rotate-180" />
          </ComboboxTrigger>
        </ComboboxControl>
        <ComboboxPortal>
          <ComboboxListbox
            gutter={8}
            class="w-44 rounded-sm border-[1px] border-slate-400 bg-slate-900 px-4 py-2"
            hide="referenceHidden"
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
  );
});
