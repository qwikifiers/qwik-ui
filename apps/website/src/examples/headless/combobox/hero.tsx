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
      <ComboboxLabel class="font-semibold text-white">Personal Trainers ⚡</ComboboxLabel>
      <ComboboxControl class="relative flex items-center rounded-sm border-[1px] border-slate-400 bg-[#1f2532]">
        <ComboboxInput
          placeholder="Jim"
          class="px-d2 w-44 bg-slate-900 px-2 pr-6 text-white placeholder:text-slate-500"
        />
        <ComboboxTrigger class="group absolute right-0 h-6 w-6">
          <ComboboxIcon class="stroke-white transition-transform duration-[450ms] group-aria-expanded:-rotate-180" />
        </ComboboxTrigger>
      </ComboboxControl>
      <ComboboxPortal>
        <ComboboxListbox
          gutter={8}
          class="w-44 rounded-sm border-[1px] border-slate-400 bg-slate-900 px-4 py-2"
          optionRenderer$={(option: ResolvedOption, index: number) => {
            const myData = option.option as MyData;
            return (
              <ComboboxOption
                key={option.key}
                resolved={option}
                index={index}
                class="group rounded-sm border-2 border-transparent px-2 text-white hover:bg-slate-500  aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 aria-selected:border-slate-200 aria-selected:bg-slate-500"
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
