import {
  Combobox,
  ComboboxControl,
  ComboboxIcon,
  ComboboxInput,
  ComboboxLabel,
  ComboboxListbox,
  ComboboxOption,
  ComboboxPortal,
  ComboboxTrigger,
  ResolvedOption,
} from '@qwik-ui/headless';

import { component$ } from '@builder.io/qwik';

export default component$(() => {
  type Countries = {
    value: string;
    label: string;
  };

  const objectExample: Array<Countries> = [
    { value: 'usa', label: 'United States' },
    { value: 'canada', label: 'Canada' },
    { value: 'mexico', label: 'Mexico' },
    { value: 'brazil', label: 'Brazil' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'germany', label: 'Germany' },
    { value: 'france', label: 'France' },
    { value: 'italy', label: 'Italy' },
  ];

  return (
    <Combobox
      class="w-fit"
      options={objectExample}
      filter$={(value: string, options) =>
        options.filter(({ option }) => {
          return option.label.toLowerCase().startsWith(value.toLowerCase());
        })
      }
    >
      <ComboboxLabel class=" font-semibold">Countries 🚩</ComboboxLabel>
      <ComboboxControl class="relative flex items-center rounded-sm border">
        <ComboboxInput class="px-d2 bg-background placeholder:text-muted-foreground w-44 px-2 pr-6" />
        <ComboboxTrigger class="group absolute right-0 h-6 w-6">
          <ComboboxIcon class="stroke-foreground transition-transform duration-[450ms] group-aria-expanded:-rotate-180" />
        </ComboboxTrigger>
      </ComboboxControl>
      <ComboboxPortal>
        <ComboboxListbox
          flip={true}
          gutter={8}
          class="bg-background w-44 rounded-sm border px-4 py-2"
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
  );
});
