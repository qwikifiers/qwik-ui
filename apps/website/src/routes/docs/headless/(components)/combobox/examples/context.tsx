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

import { createContextId, useContext, useContextProvider } from '@builder.io/qwik';

// Create a context ID
export const AnimalContext = createContextId<string[]>('animal-context');

export const ContextExample = component$(() => {
  const animals = ['Armadillo', 'Donkey', 'Baboon', 'Badger', 'Barracuda', 'Bat', 'Bear'];
  // Provide the animals array to the context under the context ID
  useContextProvider(AnimalContext, animals);

  return <ContextChild />;
});

export const ContextChild = component$(() => {
  const animals = useContext(AnimalContext);

  return (
    <Combobox options={animals} class="relative">
      <ComboboxLabel class=" font-semibold text-white">Animals 🐖</ComboboxLabel>
      <ComboboxControl class="relative flex items-center rounded-sm border-[1px] border-slate-400 bg-[#1f2532]">
        <ComboboxInput class="px-d2 w-44 bg-slate-900 px-2 pr-6 text-white placeholder:text-slate-500" />
        <ComboboxTrigger class="group absolute right-0 h-6 w-6">
          <ComboboxIcon class="stroke-white transition-transform duration-[450ms] group-aria-expanded:-rotate-180" />
        </ComboboxTrigger>
      </ComboboxControl>
      <ComboboxPortal>
        <ComboboxListbox
          flip={true}
          gutter={8}
          class="w-44 rounded-sm border-[1px] border-slate-400 bg-slate-900 px-4 py-2"
          optionRenderer$={(option: ResolvedOption, index: number) => (
            <ComboboxOption
              index={index}
              resolved={option}
              class="group rounded-sm border-2 border-transparent px-2 text-white hover:bg-slate-500  aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 aria-selected:border-slate-200 aria-selected:bg-slate-500"
            >
              <span class="duration-350 block transition-transform group-aria-selected:translate-x-[3px]">
                <span>{option.label}</span>
              </span>
            </ComboboxOption>
          )}
        />
      </ComboboxPortal>
    </Combobox>
  );
});
