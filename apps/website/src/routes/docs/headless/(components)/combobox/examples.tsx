import { $, component$, Slot, useSignal } from '@builder.io/qwik';
import {
  Combobox,
  ComboboxControl,
  ComboboxInput,
  ComboboxLabel,
  ComboboxListbox,
  ComboboxOption,
  ComboboxPortal,
  ComboboxTrigger,
} from '@qwik-ui/headless';

import { PreviewCodeExample } from '../../../_components/preview-code-example/preview-code-example';

const trainers = [
  'Caleb',
  'Olivia',
  'James',
  'Ava',
  'Noah',
  'Emma',
  'Oliver',
  'Amelia',
  'Theodore',
  'Elizabeth',
];

interface Trainer {
  testValue: string;
  testLabel: string;
  disabled: boolean;
}

const ALL_OPTIONS: Array<Trainer> = [
  { testValue: 'alice', testLabel: 'Alice', disabled: false },
  { testValue: 'joana', testLabel: 'Joana', disabled: false },
  { testValue: 'malcolm', testLabel: 'Malcolm', disabled: false },
  { testValue: 'zack', testLabel: 'Zack', disabled: true },
  { testValue: 'brian', testLabel: 'Brian', disabled: false }
];

export const Example01 = component$(() => {
  // const trainersSig = useSignal(trainers);
  const optionsSig = useSignal(ALL_OPTIONS);
  const showExample = useSignal(true);

  const onInputChange$ = $((value: string) => {
    optionsSig.value = ALL_OPTIONS.filter((option) => {
      return option.testLabel.toLowerCase().includes(value.toLowerCase());
    });

    console.log(optionsSig.value);
  });

  return (
    <PreviewCodeExample>
      <div class="flex flex-col gap-4" q:slot="actualComponent">
        <button
          onClick$={() => {
            showExample.value = !showExample.value;
          }}
        >
          Show them
        </button>
        {showExample.value === true && (
          <Combobox
            options={optionsSig}
            onInputChange$={onInputChange$}
            optionValueKey="testValue"
            optionLabelKey="testLabel"
            optionComponent$={$((option: string | Trainer, index: number) => (
              <ComboboxOption
                index={index}
                option={option}
                class="rounded-sm px-2 hover:bg-[#496080] focus:bg-[#496080]"
              >
                {typeof option === 'string' ? option : option.testLabel}
              </ComboboxOption>
            ))}
            class="relative"
          >
            <ComboboxLabel class=" font-semibold dark:text-white text-[#333333]">
              Personal Trainers ⚡
            </ComboboxLabel>
            <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-[#7d95b3] border-[1px] relative">
              <ComboboxInput class="px-2 w-44 bg-inherit px-d2 pr-6 text-white" />
              <ComboboxTrigger class="w-6 h-6 group absolute right-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke-width="2"
                  class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxListbox class="text-white w-44 bg-[#1f2532] px-4 py-2 rounded-sm border-[#7d95b3] border-[1px]" />
            </ComboboxPortal>
          </Combobox>
        )}
        <button
        // onClick$={() => {
        //   trainersSig.value = ['One', 'Two', 'Three', 'Four', 'Five'];
        // }}
        >
          Change them
        </button>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const Example02 = component$(() => {
  return <PreviewCodeExample></PreviewCodeExample>;
});

export const Example03 = component$(() => {
  return <PreviewCodeExample></PreviewCodeExample>;
});
