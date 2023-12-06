import { component$, useSignal } from '@builder.io/qwik';
import {
  Combobox,
  ComboboxLabel,
  ComboboxControl,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxPortal,
  ComboboxListbox,
  ComboboxOption,
  ResolvedOption,
} from '@qwik-ui/headless';

export default component$(() => {
  const isListboxOpenSig = useSignal(false);

  const animationExample = [
    'Red',
    'Orange',
    'Yellow',
    'Green',
    'Blue',
    'Indigo',
    'Violet',
  ];

  return (
    <Combobox
      class="w-fit"
      options={animationExample}
      filter$={(value: string, options) =>
        options.filter(({ option }) => {
          return option.toLowerCase().startsWith(value.toLowerCase());
        })
      }
      bind:isListboxOpenSig={isListboxOpenSig}
    >
      <ComboboxLabel class=" font-semibold">Streets 🛣️</ComboboxLabel>
      <ComboboxControl class="relative flex items-center rounded-sm border">
        <ComboboxInput
          disableOnBlur={true}
          class="px-d2 bg-background placeholder:text-muted-foreground w-44 px-2 pr-6"
          placeholder="Wallaby Rd."
        />
        <ComboboxTrigger class="group absolute right-0 h-6 w-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke-width="2"
            class="stroke-foreground transition-transform duration-[450ms] group-aria-expanded:-rotate-180"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </ComboboxTrigger>
      </ComboboxControl>
      <ComboboxPortal>
        <ComboboxListbox
          gutter={8}
          class={`w-44 rounded-sm border px-4 py-2 transition-opacity duration-[500ms] ${
            isListboxOpenSig.value ? 'opacity-100' : 'opacity-0'
          }`}
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
