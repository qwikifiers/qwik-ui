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

import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

export default component$(() => {
  type Pokemon = {
    pokedex: string;
    pokemon: string;
    isPokemonCaught: boolean;
  };

  const pokemonExample: Array<Pokemon> = [
    { pokedex: '1', pokemon: 'Bulbasaur', isPokemonCaught: true },
    { pokedex: '2', pokemon: 'Ivysaur', isPokemonCaught: false },
    { pokedex: '3', pokemon: 'Venusaur', isPokemonCaught: false },
    { pokedex: '4', pokemon: 'Charmander', isPokemonCaught: true },
    { pokedex: '5', pokemon: 'Charmeleon', isPokemonCaught: true },
    { pokedex: '6', pokemon: 'Charizard', isPokemonCaught: true },
    { pokedex: '7', pokemon: 'Squirtle', isPokemonCaught: false },
    { pokedex: '8', pokemon: 'Wartortle', isPokemonCaught: false },
  ];

  const isPokemonCaught = useSignal(false);

  useVisibleTask$(({ track }) => {
    track(() => isPokemonCaught.value);
  });

  return (
    <div class="relative">
      {isPokemonCaught.value && (
        <p class="shadow-dark-medium absolute w-full translate-x-[-105%] rounded-md border-2 bg-slate-950 p-4 text-slate-50">
          You've already caught this pokemon!
        </p>
      )}
      <Combobox
        class="w-fit"
        options={pokemonExample}
        optionValueKey="pokedex"
        optionLabelKey="pokemon"
        optionDisabledKey="isPokemonCaught"
      >
        <ComboboxLabel class=" font-semibold">Pokemon 🦏</ComboboxLabel>
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
            optionRenderer$={(option: ResolvedOption, index: number) => {
              const pokemonOption = option.option as Pokemon;
              return (
                <ComboboxOption
                  key={option.key}
                  class="group flex justify-between rounded-sm border border-transparent px-2 hover:bg-slate-400 aria-disabled:font-light aria-disabled:text-slate-500 aria-disabled:hover:bg-slate-300 aria-selected:cursor-pointer aria-selected:border-slate-500 aria-selected:bg-slate-400"
                  index={index}
                  resolved={option}
                  onMouseEnter$={() => {
                    if (pokemonOption.isPokemonCaught) {
                      isPokemonCaught.value = true;
                    }
                  }}
                  onMouseLeave$={() => {
                    isPokemonCaught.value = false;
                  }}
                >
                  <span>{pokemonOption.pokemon}</span>
                  <span>{pokemonOption.pokedex}</span>
                </ComboboxOption>
              );
            }}
          />
        </ComboboxPortal>
      </Combobox>
    </div>
  );
});
