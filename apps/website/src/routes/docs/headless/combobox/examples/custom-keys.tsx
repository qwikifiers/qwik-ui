import { Combobox, ResolvedOption } from '@qwik-ui/headless';

import { component$, useSignal } from '@builder.io/qwik';
import { LuChevronDown } from '@qwikest/icons/lucide';

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
      <Combobox.Root
        options={pokemonExample}
        optionValueKey="pokedex"
        optionLabelKey="pokemon"
        optionDisabledKey="isPokemonCaught"
        class="combobox-root"
      >
        <Combobox.Label class="combobox-label">Pokemon 🦏</Combobox.Label>
        <Combobox.Control class="combobox-control">
          <Combobox.Input placeholder="Bulbasaur" class="combobox-input" />
          <Combobox.Trigger class="combobox-trigger">
            <LuChevronDown class="combobox-icon" />
          </Combobox.Trigger>
        </Combobox.Control>
        <Combobox.Popover class="combobox-popover" gutter={8}>
          <Combobox.Listbox
            class="combobox-listbox"
            optionRenderer$={(option: ResolvedOption, index: number) => {
              const pokemonOption = option.option as Pokemon;
              return (
                <Combobox.Option
                  class="combobox-option"
                  key={option.key}
                  resolved={option}
                  index={index}
                  onMouseEnter$={() => {
                    if (pokemonOption.isPokemonCaught) {
                      isPokemonCaught.value = true;
                    }
                  }}
                  onMouseLeave$={() => {
                    isPokemonCaught.value = false;
                  }}
                >
                  <span>{option.label}</span>
                </Combobox.Option>
              );
            }}
          />
        </Combobox.Popover>
      </Combobox.Root>
    </div>
  );
});
