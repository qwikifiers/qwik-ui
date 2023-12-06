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
      <p class="text-center">I have blur disabled! Inspect me in the dev tools.</p>
      <Combobox
        class="w-fit"
        options={planets}
        filter$={(value: string, options) =>
          options.filter(({ option }) => {
            return option.toLowerCase().startsWith(value.toLowerCase());
          })
        }
      >
        <ComboboxControl class="relative flex items-center rounded-sm border">
          <ComboboxInput
            disableOnBlur={true}
            class="px-d2 bg-background placeholder:text-muted-foreground w-44 px-2 pr-6"
          />
          <ComboboxTrigger class="group absolute right-0 h-6 w-6">
            <ComboboxIcon class="stroke-foreground transition-transform duration-[450ms] group-aria-expanded:-rotate-180" />
          </ComboboxTrigger>
        </ComboboxControl>
        <ComboboxPortal>
          <ComboboxListbox
            gutter={8}
            class="bg-background w-44 rounded-sm border px-4 py-2"
            hide="referenceHidden"
            optionRenderer$={(option: ResolvedOption, index: number) => (
              <ComboboxOption
                key={option.key}
                class="hover:bg-accent group rounded-sm border-2 border-transparent px-2"
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
