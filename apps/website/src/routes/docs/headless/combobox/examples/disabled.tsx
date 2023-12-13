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
  type DisabledExample = {
    value: string;
    label: string;
    myDisabledKey: boolean;
  };

  const disabledExample: Array<DisabledExample> = [
    { value: '0', label: 'Enabled', myDisabledKey: false },
    { value: '1', label: 'Enabled', myDisabledKey: false },
    { value: '2', label: 'Disabled', myDisabledKey: true },
    { value: '3', label: 'Enabled', myDisabledKey: false },
    { value: '4', label: 'Disabled', myDisabledKey: true },
    { value: '5', label: 'Disabled', myDisabledKey: true },
    { value: '6', label: 'Disabled', myDisabledKey: true },
    { value: '7', label: 'Enabled', myDisabledKey: false },
  ];

  return (
    <Combobox class="w-fit" options={disabledExample} optionDisabledKey="myDisabledKey">
      <ComboboxLabel class=" font-semibold">Disabled ⛔</ComboboxLabel>
      <ComboboxControl class="relative flex items-center rounded-sm border">
        <ComboboxInput class="px-d2 w-44 bg-slate-950 px-2 pr-6 text-slate-50 placeholder:text-slate-500" />
        <ComboboxTrigger class="group absolute right-0 h-6 w-6">
          <ComboboxIcon class="stroke-slate-50 transition-transform duration-[450ms] group-aria-expanded:-rotate-180" />
        </ComboboxTrigger>
      </ComboboxControl>
      <ComboboxPortal>
        <ComboboxListbox
          flip={true}
          gutter={8}
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
  );
});
