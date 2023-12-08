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

import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const inputValueSig = useSignal('');
  type PlacementExample = {
    value: string;
    label: string;
  };

  const placementExample: Array<PlacementExample> = [
    { value: '0', label: 'Up' },
    { value: '1', label: 'Down' },
    { value: '2', label: 'Left' },
    { value: '3', label: 'Right' },
  ];

  return (
    <>
      <Combobox
        class="w-fit"
        options={placementExample}
        optionDisabledKey="myDisabledKey"
        bind:inputValueSig={inputValueSig}
      >
        <ComboboxLabel>Positions</ComboboxLabel>
        <ComboboxControl class="relative mt-2 flex items-center rounded-sm border">
          <ComboboxInput class="px-d2 bg-background placeholder:text-muted-foreground w-44 px-2 pr-6" />
          <ComboboxTrigger class="group absolute right-0 h-6 w-6">
            <ComboboxIcon class="stroke-foreground transition-transform duration-[450ms] group-aria-expanded:-rotate-180" />
          </ComboboxTrigger>
        </ComboboxControl>
        <ComboboxPortal>
          <ComboboxListbox
            gutter={8}
            placement="top"
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
    </>
  );
});
