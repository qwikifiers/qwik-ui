import { Combobox } from '@qwik-ui/headless';
import { component$ } from '@builder.io/qwik';

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

export default component$(() => {
  return (
    <Combobox
      options={pokemonExample}
      optionValueKey="pokedex"
      optionLabelKey="pokemon"
      optionDisabledKey="isPokemonCaught"
    />
  );
});
