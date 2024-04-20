import {
  Combobox,
  ComboboxControl,
  ComboboxIcon,
  ComboboxInput,
  ComboboxLabel,
  ComboboxListbox,
  ComboboxOption,
  ComboboxPopover,
  ComboboxTrigger,
  ResolvedOption,
} from '@qwik-ui/headless';

import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const selectedOptionIndexSig = useSignal<number>(-1);

  const objectExample = [
    { testValue: 'alice', testLabel: 'Alice' },
    { testValue: 'joana', testLabel: 'Joana' },
    { testValue: 'malcolm', testLabel: 'Malcolm' },
    { testValue: 'zack', testLabel: 'Zack' },
    { testValue: 'brian', testLabel: 'Brian' },
    { testValue: 'ryan', testLabel: 'Ryan' },
    { testValue: 'joe', testLabel: 'Joe' },
    { testValue: 'randy', testLabel: 'Randy' },
    { testValue: 'david', testLabel: 'David' },
    { testValue: 'joseph', testLabel: 'Joseph' },
  ];

  type MyData = {
    testValue: string;
    testLabel: string;
  };

  return (
    <Combobox
      options={objectExample}
      optionValueKey="testValue"
      optionLabelKey="testLabel"
      bind:selectedIndex={selectedOptionIndexSig}
    >
      <ComboboxLabel class="font-semibold">Personal Trainers ⚡</ComboboxLabel>
      <ComboboxControl class="relative flex items-center rounded-base border">
        <ComboboxInput
          placeholder="Jim"
          class="px-d2 w-44 rounded-base bg-background px-2 pr-6 placeholder:text-muted-foreground"
        />
        <ComboboxTrigger class="group absolute right-0 h-6 w-6">
          <ComboboxIcon class="stroke-white transition-transform duration-500 group-aria-expanded:-rotate-180" />
        </ComboboxTrigger>
      </ComboboxControl>
      <ComboboxPopover class="rounded-sm" gutter={8}>
        <ComboboxListbox
          class="w-44 rounded-base border-[1px] border-slate-400 bg-slate-900 px-4 py-2"
          optionRenderer$={(option: ResolvedOption, index: number) => {
            const myData = option.option as MyData;
            return (
              <ComboboxOption
                key={option.key}
                resolved={option}
                index={index}
                class="group flex justify-between rounded-base border border-transparent px-2 hover:bg-accent aria-disabled:font-light aria-disabled:text-muted-foreground aria-disabled:hover:bg-muted aria-selected:cursor-pointer aria-selected:border-border aria-selected:bg-accent"
              >
                <span>{myData.testLabel}</span>
                {selectedOptionIndexSig.value === index && <span>Selected</span>}
              </ComboboxOption>
            );
          }}
        />
      </ComboboxPopover>
    </Combobox>
  );
});
