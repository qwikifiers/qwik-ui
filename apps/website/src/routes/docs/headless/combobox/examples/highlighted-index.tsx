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
          <ComboboxInput class="px-d2 placeholder:text-muted-foreground w-fit px-2 pr-6" />
          <ComboboxTrigger class="group absolute right-0 h-6 w-6">
            <ComboboxIcon class="stroke-foreground transition-transform duration-[450ms] group-aria-expanded:-rotate-180" />
          </ComboboxTrigger>
        </ComboboxControl>
        <ComboboxPortal>
          <ComboboxListbox
            gutter={8}
            size={true}
            class="bg-background w-fit rounded-sm border px-4 py-2"
            hide="escaped"
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
    </>
  );
});
