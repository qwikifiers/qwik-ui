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

const stringsExample = [
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

type Trainer = {
  testValue: string;
  testLabel: string;
  disabled: boolean;
};

const objectExample: Array<Trainer> = [
  { testValue: 'alice', testLabel: 'Alice', disabled: false },
  { testValue: 'joana', testLabel: 'Joana', disabled: false },
  { testValue: 'malcolm', testLabel: 'Malcolm', disabled: false },
  { testValue: 'zack', testLabel: 'Zack', disabled: true },
  { testValue: 'brian', testLabel: 'Brian', disabled: false }
];

export const Example01 = component$(() => {
  const stringsExampleSig = useSignal(stringsExample);
  const objectExampleSig = useSignal(objectExample);
  const isComboboxVisibleSig = useSignal(true);

  const onInputChange$ = $((value: string) => {
    objectExampleSig.value = objectExample.filter((option) => {
      return option.testLabel.toLowerCase().includes(value.toLowerCase());
    });
  });

  return (
    <PreviewCodeExample>
      <div class="flex flex-col gap-4" q:slot="actualComponent">
        <button
          onClick$={() => {
            isComboboxVisibleSig.value = !isComboboxVisibleSig.value;
          }}
        >
          Toggle Client Side
        </button>
        {isComboboxVisibleSig.value && (
          <Combobox
            options={objectExampleSig}
            onInputChange$={onInputChange$}
            optionValueKey="testValue"
            optionLabelKey="testLabel"
            optionDisabledKey="disabled"
            optionComponent$={$((option: Trainer, index: number) => (
              <ComboboxOption
                index={index}
                option={option}
                style={option.disabled ? { color: 'gray' } : {}}
                class="rounded-sm px-2 hover:bg-[#496080] aria-selected:bg-[#496080]  border-2 border-transparent aria-selected:border-[#abbbce] group"
              >
                <span class="block group-aria-selected:translate-x-[3px] transition-transform duration-350">
                  {option.testLabel}
                </span>
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
