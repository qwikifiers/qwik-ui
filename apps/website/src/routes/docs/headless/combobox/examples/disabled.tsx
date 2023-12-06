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
  type DisabledExample = {
    value: string;
    label: string;
    myDisabledKey: boolean;
  };

  const disabledExample: Array<DisabledExample> = [
    { value: '0', label: 'Enabled', myDisabledKey: false },
    { value: '1', label: 'Enabled', myDisabledKey: false },
    { value: '2', label: 'Disabled', myDisabledKey: true },
    { value: '3', label: 'Enabled', myDisabledKey: false },
    { value: '4', label: 'Disabled', myDisabledKey: true },
    { value: '5', label: 'Disabled', myDisabledKey: true },
    { value: '6', label: 'Disabled', myDisabledKey: true },
    { value: '7', label: 'Enabled', myDisabledKey: false },
  ];

  return (
    <Combobox class="w-fit" options={disabledExample} optionDisabledKey="myDisabledKey">
      <ComboboxLabel class=" font-semibold">Disabled ⛔</ComboboxLabel>
      <ComboboxControl class="relative flex items-center rounded-sm border">
        <ComboboxInput class="px-d2 bg-background placeholder:text-muted-foreground w-44 px-2 pr-6" />
        <ComboboxTrigger class="group absolute right-0 h-6 w-6">
          <ComboboxIcon class="stroke-foreground transition-transform duration-[450ms] group-aria-expanded:-rotate-180" />
        </ComboboxTrigger>
      </ComboboxControl>
      <ComboboxPortal>
        <ComboboxListbox
          flip={true}
          gutter={8}
          class="bg-background w-44 rounded-sm border px-4 py-2"
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
  );
});
