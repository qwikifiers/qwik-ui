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
        class="w-fit text-white"
        options={placementExample}
        optionDisabledKey="myDisabledKey"
        bind:inputValueSig={inputValueSig}
      >
        <ComboboxLabel>Positions</ComboboxLabel>
        <ComboboxControl class="relative mt-2 flex items-center rounded-sm border-[1px] border-slate-400 bg-[#1f2532]">
          <ComboboxInput class="px-d2 w-44 bg-slate-900 px-2 pr-6 text-white placeholder:text-slate-500" />
          <ComboboxTrigger class="group absolute right-0 h-6 w-6">
            <ComboboxIcon class="stroke-white transition-transform duration-[450ms] group-aria-expanded:-rotate-180" />
          </ComboboxTrigger>
        </ComboboxControl>
        <ComboboxPortal>
          <ComboboxListbox
            gutter={8}
            placement="top"
            class="w-44 rounded-sm border-[1px] border-slate-400 bg-slate-900 px-4 py-2"
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
    </>
  );
});
