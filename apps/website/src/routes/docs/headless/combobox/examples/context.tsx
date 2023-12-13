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

export default component$(() => {
  const animals = ['Armadillo', 'Donkey', 'Baboon', 'Badger', 'Barracuda', 'Bat', 'Bear'];
  // Provide the animals array to the context under the context ID
  useContextProvider(AnimalContext, animals);

  return <ContextChild />;
});

export const ContextChild = component$(() => {
  const animals = useContext(AnimalContext);

  return (
    <Combobox options={animals} class="relative">
      <ComboboxLabel class=" font-semibold">Animals 🐖</ComboboxLabel>
      <ComboboxControl class="relative flex items-center rounded-sm border">
        <ComboboxInput class="px-d2 w-44 bg-slate-950 px-2 pr-6 text-slate-50 placeholder:text-slate-500" />
        <ComboboxTrigger class="group absolute right-0 h-6 w-6">
          <ComboboxIcon class="stroke-slate-50 transition-transform duration-[450ms] group-aria-expanded:-rotate-180" />
        </ComboboxTrigger>
      </ComboboxControl>
      <ComboboxPortal>
        <ComboboxListbox
          flip={true}
          gutter={8}
          class="w-44 rounded-sm border bg-slate-950 px-4 py-2 text-slate-50"
          optionRenderer$={(option: ResolvedOption, index: number) => (
            <ComboboxOption
              index={index}
              resolved={option}
              class="group flex justify-between rounded-sm border border-transparent px-2 hover:bg-slate-400 aria-disabled:font-light aria-disabled:text-slate-500 aria-disabled:hover:bg-slate-300 aria-selected:cursor-pointer aria-selected:border-slate-500 aria-selected:bg-slate-400"
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
