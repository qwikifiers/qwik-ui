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

import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const highlightedIndexSig = useSignal(2);

  const highlightedExample = [
    'not highlighted',
    'not highlighted',
    'highlighted by default!',
    'not highlighted',
  ];

  return (
    <>
      <p class="text-center">Third option highlighted! 🚨</p>
      <Combobox
        class="w-fit"
        options={highlightedExample}
        bind:highlightedIndexSig={highlightedIndexSig}
      >
        <ComboboxControl class="relative flex items-center rounded-sm border">
          <ComboboxInput class="px-d2 w-fit bg-slate-950 px-2 pr-6 text-slate-50 placeholder:text-slate-500" />
          <ComboboxTrigger class="group absolute right-0 h-6 w-6">
            <ComboboxIcon class="stroke-slate-50 transition-transform duration-[450ms] group-aria-expanded:-rotate-180" />
          </ComboboxTrigger>
        </ComboboxControl>
        <ComboboxPortal>
          <ComboboxListbox
            gutter={8}
            size={true}
            class="w-fit rounded-sm border bg-slate-950 px-4 py-2 text-slate-50"
            hide="escaped"
            optionRenderer$={(option: ResolvedOption, index: number) => (
              <ComboboxOption
                key={option.key}
                class="group cursor-pointer rounded-sm px-2 aria-selected:bg-slate-400"
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
