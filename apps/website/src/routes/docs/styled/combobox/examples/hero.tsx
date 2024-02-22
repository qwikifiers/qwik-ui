import { component$, useSignal } from '@builder.io/qwik';
import { ResolvedOption } from '@qwik-ui/headless';
import {
  Combobox,
  ComboboxControl,
  ComboboxInput,
  ComboboxLabel,
  ComboboxListbox,
  ComboboxOption,
  ComboboxPopover,
  ComboboxTrigger,
} from '@qwik-ui/styled';

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
    <Combobox
      options={objectExample}
      optionValueKey="testValue"
      optionLabelKey="testLabel"
      optionDisabledKey="disabled"
      bind:selectedIndex={selectedOptionIndexSig}
    >
      <ComboboxLabel>Personal Trainers ⚡</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput placeholder="Jim" />
        <ComboboxTrigger />
      </ComboboxControl>
      <ComboboxPopover gutter={8}>
        <ComboboxListbox
          optionRenderer$={(option: ResolvedOption, index: number) => {
            const myData = option.option as MyData;
            return (
              <ComboboxOption key={option.key} resolved={option} index={index}>
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
