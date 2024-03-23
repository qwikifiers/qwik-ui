import {
  Combobox,
  ComboboxControl,
  ComboboxIcon,
  ComboboxInput,
  ComboboxLabel,
  ComboboxListbox,
  ComboboxOption,
  ComboboxPopover,
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
    <Combobox options={animals}>
      <ComboboxLabel class=" font-semibold">Animals 🐖</ComboboxLabel>
      <ComboboxControl class="rounded-base relative flex items-center border">
        <ComboboxInput class="px-d2 bg-background placeholder:text-muted-foreground w-44 px-2 pr-6" />
        <ComboboxTrigger class="group absolute right-0 h-6 w-6">
          <ComboboxIcon class="stroke-foreground transition-transform duration-500 group-aria-expanded:-rotate-180" />
        </ComboboxTrigger>
      </ComboboxControl>
      <ComboboxPopover flip={true} gutter={8}>
        <ComboboxListbox
          class="rounded-base w-44 border-[1px] border-slate-400 px-4 py-2 dark:bg-slate-900 dark:text-white"
          optionRenderer$={(option: ResolvedOption, index: number) => (
            <ComboboxOption
              index={index}
              resolved={option}
              class="hover:bg-accent aria-disabled:text-muted-foreground aria-disabled:hover:bg-muted aria-selected:border-border aria-selected:bg-accent rounded-base group flex justify-between border border-transparent px-2 aria-disabled:font-light aria-selected:cursor-pointer"
            >
              <span class="duration-350 block transition-transform group-aria-selected:translate-x-[3px]">
                <span>{option.label}</span>
              </span>
            </ComboboxOption>
          )}
        />
      </ComboboxPopover>
    </Combobox>
  );
});
