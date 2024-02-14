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
        <ComboboxControl class="rounded-base relative flex items-center border">
          <ComboboxInput class="px-d2 bg-background placeholder:text-muted-foreground rounded-base w-fit px-2 pr-6" />
          <ComboboxTrigger class="group absolute right-0 h-6 w-6">
            <ComboboxIcon class="stroke-foreground transition-transform duration-[450ms] group-aria-expanded:-rotate-180" />
          </ComboboxTrigger>
        </ComboboxControl>
        <ComboboxPopover hide="escaped" gutter={8} size={true}>
          <ComboboxListbox
            class="rounded-base w-fit border-[1px] border-slate-400 bg-slate-900 px-4 py-2"
            optionRenderer$={(option: ResolvedOption, index: number) => (
              <ComboboxOption
                key={option.key}
                class="aria-selected:bg-accent rounded-base group cursor-pointer px-2"
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
