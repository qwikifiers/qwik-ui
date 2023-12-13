import { component$, useSignal } from '@builder.io/qwik';
import {
  Combobox,
  ComboboxControl,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxPortal,
  ComboboxListbox,
  ComboboxOption,
  ResolvedOption,
  ComboboxIcon,
} from '@qwik-ui/headless';

export default component$(() => {
  const isListboxOpenSig = useSignal(true);

  type AutoPlacementExample = {
    value: string;
    label: string;
  };

  const autoPlacementExample: Array<AutoPlacementExample> = [
    { value: '0', label: 'Audi 🚗' },
    { value: '1', label: 'BMW 🚙' },
    { value: '2', label: 'Mercedes 🚕' },
    { value: '3', label: 'Tesla 🚓' },
  ];

  return (
    <>
      <div class="flex h-[10rem] flex-col items-center justify-center">
        <p class="text-center">My Car Collection 🚘</p>
        <Combobox
          bind:isListboxOpenSig={isListboxOpenSig}
          class="w-fit"
          options={autoPlacementExample}
          optionDisabledKey="myDisabledKey"
        >
          <ComboboxControl class="relative mt-2 flex items-center rounded-sm border">
            <ComboboxInput class="px-d2 w-44 bg-slate-950 px-2 pr-6 text-slate-50 placeholder:text-slate-500" />
            <ComboboxTrigger class="group absolute right-0 h-6 w-6">
              <ComboboxIcon class="stroke-slate-50 transition-transform duration-[450ms] group-aria-expanded:-rotate-180" />
            </ComboboxTrigger>
          </ComboboxControl>
          <ComboboxPortal>
            <ComboboxListbox
              flip={false}
              autoPlacement={true}
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
      </div>
      <div class="h-[1px] w-[calc(100%+200px)]"></div>
    </>
  );
});
