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

import { component$, useSignal } from '@builder.io/qwik';

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

  return (
    <div>
      {isPokemonCaught.value && (
        <p class="absolute max-w-[180px] translate-y-[-105%] rounded-base border-2 bg-background p-4 shadow-md">
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
        <ComboboxControl class="relative flex items-center rounded-base border">
          <ComboboxInput class="px-d2 w-44 rounded-base bg-background px-2 pr-6 placeholder:text-muted-foreground" />
          <ComboboxTrigger class="group absolute right-0 h-6 w-6">
            <ComboboxIcon class="stroke-foreground transition-transform duration-500 group-aria-expanded:-rotate-180" />
          </ComboboxTrigger>
        </ComboboxControl>
        <ComboboxPopover flip={true} gutter={8}>
          <ComboboxListbox
            class="w-44 rounded-base border-[1px] border-slate-400 bg-slate-900 px-4 py-2"
            optionRenderer$={(option: ResolvedOption, index: number) => {
              const pokemonOption = option.option as Pokemon;
              return (
                <ComboboxOption
                  key={option.key}
                  class="group flex justify-between rounded-base border border-transparent px-2 hover:bg-accent aria-disabled:font-light aria-disabled:text-muted-foreground aria-disabled:hover:bg-muted aria-selected:cursor-pointer aria-selected:border-border aria-selected:bg-accent"
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
        </ComboboxPopover>
      </Combobox>
    </div>
  );
});
