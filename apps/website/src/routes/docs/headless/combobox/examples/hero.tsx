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
  const objectExample = [
    { testValue: 'alice', testLabel: 'Alice', disabled: true },
    { testValue: 'joana', testLabel: 'Joana', disabled: true },
    { testValue: 'malcolm', testLabel: 'Malcolm', disabled: false },
    { testValue: 'zack', testLabel: 'Zack', disabled: true },
    { testValue: 'brian', testLabel: 'Brian', disabled: false },
    { testValue: 'ryan', testLabel: 'Ryan', disabled: false },
    { testValue: 'joe', testLabel: 'Joe', disabled: false },
    { testValue: 'randy', testLabel: 'Randy', disabled: false },
    { testValue: 'david', testLabel: 'David', disabled: true },
    { testValue: 'joseph', testLabel: 'Joseph', disabled: false },
  ];

  type MyData = {
    testValue: string;
    testLabel: string;
    disabled: boolean;
  };

  return (
    <Combobox
      options={objectExample}
      optionValueKey="testValue"
      optionLabelKey="testLabel"
      optionDisabledKey="disabled"
      class="relative"
    >
      <ComboboxLabel class="font-semibold">Personal Trainers ⚡</ComboboxLabel>
      <ComboboxControl class="relative flex items-center rounded-sm border">
        <ComboboxInput
          placeholder="Jim"
          class="px-d2 bg-background placeholder:text-muted-foreground w-44 px-2 pr-6"
        />
        <ComboboxTrigger class="group absolute right-0 h-6 w-6">
          <ComboboxIcon class="stroke-foreground transition-transform duration-[450ms] group-aria-expanded:-rotate-180" />
        </ComboboxTrigger>
      </ComboboxControl>
      <ComboboxPortal>
        <ComboboxListbox
          gutter={8}
          class="bg-background w-44 rounded-sm border px-4 py-2"
          optionRenderer$={(option: ResolvedOption, index: number) => {
            const myData = option.option as MyData;
            return (
              <ComboboxOption
                key={option.key}
                resolved={option}
                index={index}
                class="hover:bg-accent aria-disabled:text-muted-foreground aria-disabled:hover:bg-muted aria-selected:border-border aria-selected:bg-accent group flex justify-between rounded-sm border border-transparent px-2 aria-disabled:font-light aria-selected:cursor-pointer"
              >
                <span class="duration-350 block transition-transform group-aria-selected:translate-x-[3px]">
                  {myData.testLabel}
                </span>
              </ComboboxOption>
            );
          }}
        />
      </ComboboxPortal>
    </Combobox>
  );
});
