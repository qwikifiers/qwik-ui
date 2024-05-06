import { Combobox, ResolvedOption } from '@qwik-ui/headless';

import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const selectedOptionIndexSig = useSignal<number>(-1);

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
    <Combobox.Root
      options={objectExample}
      optionValueKey="testValue"
      optionLabelKey="testLabel"
      optionDisabledKey="disabled"
      bind:selectedIndex={selectedOptionIndexSig}
    >
      <Combobox.Label class="font-semibold">Personal Trainers ⚡</Combobox.Label>
      <Combobox.Control class="relative flex items-center rounded-base border">
        <Combobox.Input
          placeholder="Jim"
          class="px-d2 w-44 rounded-base bg-background px-2 pr-6 placeholder:text-muted-foreground"
        />
        <Combobox.Trigger class="group absolute right-0 h-6 w-6">
          <Combobox.Icon class="stroke-white transition-transform duration-500 group-aria-expanded:-rotate-180" />
        </Combobox.Trigger>
      </Combobox.Control>
      <Combobox.Popover class="rounded-sm" gutter={8}>
        <Combobox.Listbox
          class="w-44 rounded-base border-[1px] border-slate-400 bg-slate-900 px-4 py-2"
          optionRenderer$={(option: ResolvedOption, index: number) => {
            const myData = option.option as MyData;
            return (
              <Combobox.Option
                key={option.key}
                resolved={option}
                index={index}
                class="group flex justify-between rounded-base border border-transparent px-2 hover:bg-accent aria-disabled:font-light aria-disabled:text-muted-foreground aria-disabled:hover:bg-muted aria-selected:cursor-pointer aria-selected:border-border aria-selected:bg-accent"
              >
                <span>{myData.testLabel}</span>
                {selectedOptionIndexSig.value === index && <span>Selected</span>}
              </Combobox.Option>
            );
          }}
        />
      </Combobox.Popover>
    </Combobox.Root>
  );
});
