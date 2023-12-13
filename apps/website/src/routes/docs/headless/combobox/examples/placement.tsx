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
          <ComboboxInput class="px-d2 w-44 bg-slate-950 px-2 pr-6 text-slate-50 placeholder:text-slate-500" />
          <ComboboxTrigger class="group absolute right-0 h-6 w-6">
            <ComboboxIcon class="stroke-slate-50 transition-transform duration-[450ms] group-aria-expanded:-rotate-180" />
          </ComboboxTrigger>
        </ComboboxControl>
        <ComboboxPortal>
          <ComboboxListbox
            gutter={8}
            placement="top"
            class="w-44 rounded-sm border bg-slate-950 px-4 py-2 text-slate-50"
            optionRenderer$={(option: ResolvedOption, index: number) => (
              <ComboboxOption
                key={option.key}
                class="group flex justify-between rounded-sm border border-transparent px-2 hover:bg-slate-400 aria-disabled:font-light aria-disabled:text-slate-500 aria-disabled:hover:bg-slate-300 aria-selected:cursor-pointer aria-selected:border-slate-500 aria-selected:bg-slate-400"
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
