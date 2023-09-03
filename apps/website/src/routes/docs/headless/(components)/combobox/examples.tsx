import { component$, Slot, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import {
  Combobox,
  ComboboxControl,
  ComboboxInput,
  ComboboxLabel,
  ComboboxListbox,
  ComboboxPortal,
  ComboboxTrigger,
  Tooltip,
} from '@qwik-ui/headless';

import {
  ComboboxOption,
  type ResolvedOption,
} from '../../../../../../../../packages/kit-headless/src/components/combobox';

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
  { testValue: 'alice', testLabel: 'Alice', disabled: true },
  { testValue: 'joana', testLabel: 'Joana', disabled: true },
  { testValue: 'malcolm', testLabel: 'Malcolm', disabled: false },
  { testValue: 'zack', testLabel: 'Zack', disabled: true },
  { testValue: 'brian', testLabel: 'Brian', disabled: false },
  { testValue: 'ryan', testLabel: 'Ryan', disabled: false },
  { testValue: 'joe', testLabel: 'Joe', disabled: false },
  { testValue: 'randy', testLabel: 'Randy', disabled: false },
  { testValue: 'david', testLabel: 'David', disabled: true },
  { testValue: 'joseph', testLabel: 'Joseph', disabled: false },
];

export const HeroExample = component$(() => {
  return (
    <>
      <PreviewCodeExample>
        <div class="flex flex-col gap-4" q:slot="actualComponent">
          <Combobox<Trainer>
            options={objectExample}
            optionValueKey="testValue"
            optionLabelKey="testLabel"
            optionDisabledKey="disabled"
            renderOption$={(resolved, index: number) => (
              <ComboboxOption
                key={resolved.key}
                resolved={resolved}
                index={index}
                class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
              >
                <span class="block group-aria-selected:translate-x-[3px] transition-transform duration-350">
                  {resolved.option.testLabel}
                </span>
              </ComboboxOption>
            )}
            class="relative"
          >
            <ComboboxLabel class=" font-semibold text-white">
              Personal Trainers ⚡
            </ComboboxLabel>
            <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative">
              <ComboboxInput
                placeholder="Jim"
                class="px-2 w-44 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500"
              />
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
              <ComboboxListbox
                offset={8}
                class="w-44 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
              />
            </ComboboxPortal>
          </Combobox>
        </div>

        <div q:slot="codeExample">
          <Slot />
        </div>
      </PreviewCodeExample>
    </>
  );
});

export const StringCombobox = component$(() => {
  const fruits = [
    'Apple',
    'Apricot',
    'Avocado 🥑',
    'Banana',
    'Bilberry',
    'Blackberry',
    'Blackcurrant',
    'Blueberry',
    'Boysenberry',
    'Currant',
    'Cherry',
    'Coconut',
    'Cranberry',
    'Cucumber',
  ];

  return (
    <PreviewCodeExample>
      <div class="flex flex-col items-center gap-4 p-4" q:slot="actualComponent">
        <div>
          <Combobox
            class="w-fit"
            options={fruits}
            filter$={(value: string, options) =>
              options.filter(({ option }) => {
                return option.toLowerCase().startsWith(value.toLowerCase());
              })
            }
            renderOption$={(resolved: ResolvedOption, index: number) => (
              <ComboboxOption
                key={resolved.key}
                class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
                index={index}
                resolved={resolved}
              >
                {resolved.label}
              </ComboboxOption>
            )}
          >
            <ComboboxLabel class=" font-semibold text-white">Fruits 🍓</ComboboxLabel>
            <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative">
              <ComboboxInput
                class="px-2 w-44 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500"
                placeholder="Papaya"
              />
              <ComboboxTrigger class="w-6 h-6 group absolute right-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]"
                  stroke-linecap="round"
                  stroke-width="2"
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxListbox
                offset={8}
                class="w-44 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
              />
            </ComboboxPortal>
          </Combobox>
        </div>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const ObjectCombobox = component$(() => {
  type Jedi = {
    value: string;
    label: string;
  };

  const objectExample: Array<Jedi> = [
    { value: 'anakin', label: 'Anakin Skywalker' },
    { value: 'obi-wan', label: 'Obi-Wan Kenobi' },
    { value: 'mace', label: 'Mace Windu' },
    { value: 'yoda', label: 'Yoda' },
  ];

  return (
    <PreviewCodeExample>
      <div class="flex flex-col items-center gap-4 p-4" q:slot="actualComponent">
        <div>
          <Combobox
            class="w-fit"
            options={objectExample}
            renderOption$={(option: ResolvedOption, index: number) => (
              <ComboboxOption
                key={option.key}
                class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
                index={index}
                resolved={option}
              >
                {option.label}
              </ComboboxOption>
            )}
          >
            <ComboboxLabel class=" font-semibold text-white">Jedi ⚔️</ComboboxLabel>
            <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative">
              <ComboboxInput class="px-2 w-44 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500" />
              <ComboboxTrigger class="w-6 h-6 group absolute right-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]"
                  stroke-linecap="round"
                  stroke-width="2"
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxListbox
                offset={8}
                class="w-44 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
              />
            </ComboboxPortal>
          </Combobox>
        </div>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const CustomFilter = component$(() => {
  type Countries = {
    value: string;
    label: string;
  };

  const objectExample: Array<Countries> = [
    { value: 'usa', label: 'United States' },
    { value: 'canada', label: 'Canada' },
    { value: 'mexico', label: 'Mexico' },
    { value: 'brazil', label: 'Brazil' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'germany', label: 'Germany' },
    { value: 'france', label: 'France' },
    { value: 'italy', label: 'Italy' },
  ];

  return (
    <PreviewCodeExample>
      <div class="flex flex-col items-center gap-4 p-4" q:slot="actualComponent">
        <div>
          <Combobox
            class="w-fit"
            options={objectExample}
            filter$={(value: string, options) =>
              options.filter(({ option }) => {
                return option.label.toLowerCase().startsWith(value.toLowerCase());
              })
            }
            renderOption$={(option: ResolvedOption, index: number) => (
              <ComboboxOption
                key={option.key}
                class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
                index={index}
                resolved={option}
              >
                {option.label}
              </ComboboxOption>
            )}
          >
            <ComboboxLabel class=" font-semibold text-white">Countries 🚩</ComboboxLabel>
            <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative">
              <ComboboxInput class="px-2 w-44 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500" />
              <ComboboxTrigger class="w-6 h-6 group absolute right-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]"
                  stroke-linecap="round"
                  stroke-width="2"
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxListbox
                flip={true}
                offset={8}
                class="w-44 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
              />
            </ComboboxPortal>
          </Combobox>
        </div>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const SortingExample = component$(() => {
  type Countries = {
    value: string;
    label: string;
  };

  const objectExample: Array<Countries> = [
    { value: 'usa', label: 'United States' },
    { value: 'canada', label: 'Canada' },
    { value: 'mexico', label: 'Mexico' },
    { value: 'brazil', label: 'Brazil' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'germany', label: 'Germany' },
    { value: 'france', label: 'France' },
    { value: 'italy', label: 'Italy' },
  ];

  return (
    <PreviewCodeExample>
      <div class="flex flex-col items-center gap-4 p-4" q:slot="actualComponent">
        <div>
          <Combobox
            class="w-fit"
            options={objectExample}
            filter$={(value: string, options) =>
              options
                .filter(({ option }) => {
                  return option.label.toLowerCase().startsWith(value.toLowerCase());
                })
                .sort((country1, country2) =>
                  country1.option.label.localeCompare(country2.option.label),
                )
            }
            renderOption$={(option: ResolvedOption, index: number) => (
              <ComboboxOption
                key={option.key}
                class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
                index={index}
                resolved={option}
              >
                {option.label}
              </ComboboxOption>
            )}
          >
            <ComboboxLabel class=" font-semibold text-white">Countries 🚩</ComboboxLabel>
            <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative">
              <ComboboxInput class="px-2 w-44 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500" />
              <ComboboxTrigger class="w-6 h-6 group absolute right-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]"
                  stroke-linecap="round"
                  stroke-width="2"
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxListbox
                flip={true}
                offset={8}
                class="w-44 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
              />
            </ComboboxPortal>
          </Combobox>
        </div>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const DisabledExample = component$(() => {
  type DisabledExample = {
    value: string;
    label: string;
    myDisabledKey: boolean;
  };

  const objectExample: Array<DisabledExample> = [
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
    <PreviewCodeExample>
      <div class="flex flex-col items-center gap-4 p-4" q:slot="actualComponent">
        <div>
          <Combobox
            class="w-fit"
            options={objectExample}
            optionDisabledKey="myDisabledKey"
            renderOption$={(option: ResolvedOption, index: number) => (
              <ComboboxOption
                key={option.key}
                class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
                index={index}
                resolved={option}
              >
                {option.label}
              </ComboboxOption>
            )}
          >
            <ComboboxLabel class=" font-semibold text-white">Disabled ⛔</ComboboxLabel>
            <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative">
              <ComboboxInput class="px-2 w-44 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500" />
              <ComboboxTrigger class="w-6 h-6 group absolute right-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]"
                  stroke-linecap="round"
                  stroke-width="2"
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxListbox
                flip={true}
                offset={8}
                class="w-44 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
              />
            </ComboboxPortal>
          </Combobox>
        </div>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const CustomKeysExample = component$(() => {
  type Pokemon = {
    pokedex: string;
    pokemon: string;
    isPokemonCaught: boolean;
  };

  const pokemonExample: Array<Pokemon> = [
    { pokedex: '1', pokemon: 'Bulbasaur', isPokemonCaught: false },
    { pokedex: '2', pokemon: 'Ivysaur', isPokemonCaught: true },
    { pokedex: '3', pokemon: 'Venusaur', isPokemonCaught: false },
    { pokedex: '4', pokemon: 'Charmander', isPokemonCaught: true },
    { pokedex: '5', pokemon: 'Charmeleon', isPokemonCaught: false },
    { pokedex: '6', pokemon: 'Charizard', isPokemonCaught: true },
    { pokedex: '7', pokemon: 'Squirtle', isPokemonCaught: false },
    { pokedex: '8', pokemon: 'Wartortle', isPokemonCaught: true },
  ];

  const isTooltipVisibleSig = useSignal(false);

  useVisibleTask$(({ track }) => {
    track(() => isTooltipVisibleSig.value);

    console.log(isTooltipVisibleSig.value);
  });

  return (
    <PreviewCodeExample>
      <div class="flex flex-col items-center gap-4 p-4" q:slot="actualComponent">
        <div>
          <Combobox
            class="w-fit"
            options={pokemonExample}
            optionValueKey="pokedex"
            optionLabelKey="pokemon"
            optionDisabledKey="isPokemonCaught"
            renderOption$={(option: ResolvedOption, index: number) => (
              <ComboboxOption
                key={option.key}
                class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
                index={index}
                resolved={option}
                onMouseEnter$={() => {
                  console.log('Mouse entered');
                  if (option.disabled !== undefined && option.disabled === true) {
                    isTooltipVisibleSig.value = true;
                  }
                }}
                onMouseLeave$={() => {
                  console.log('Mouse left');
                  isTooltipVisibleSig.value = false;
                }}
              >
                {option.label}
              </ComboboxOption>
            )}
          >
            <ComboboxLabel class=" font-semibold text-white">Disabled ⛔</ComboboxLabel>
            <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative">
              <ComboboxInput class="px-2 w-44 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500" />
              <ComboboxTrigger class="w-6 h-6 group absolute right-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]"
                  stroke-linecap="round"
                  stroke-width="2"
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxListbox
                flip={true}
                offset={8}
                class="w-44 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
              />
            </ComboboxPortal>
          </Combobox>
          {isTooltipVisibleSig.value && (
            <Tooltip
              class="w-fit bg-slate-400 text-slate-950 p-4"
              content="This Pokemon has already been caught!"
              position="top"
            />
          )}
        </div>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

// Using context example.

import { createContextId, useContext, useContextProvider } from '@builder.io/qwik';

// Create a context ID
export const AnimalContext = createContextId<string[]>('animal-context');

export const ParentComponent = component$(() => {
  const animals = ['Armadillo', 'Donkey', 'Baboon', 'Badger', 'Barracuda', 'Bat', 'Bear'];
  // Provide the animals array to the context under the context ID
  useContextProvider(AnimalContext, animals);

  return <ContextExample />;
});

export const ContextExample = component$(() => {
  const animals = useContext(AnimalContext);

  return (
    <PreviewCodeExample>
      <div class="flex flex-col gap-4" q:slot="actualComponent">
        <Combobox
          options={animals}
          renderOption$={(resolved: ResolvedOption, index: number) => (
            <ComboboxOption
              index={index}
              resolved={resolved}
              class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
            >
              <span class="block group-aria-selected:translate-x-[3px] transition-transform duration-350">
                {resolved.label}
              </span>
            </ComboboxOption>
          )}
          class="relative"
        >
          <ComboboxLabel class=" font-semibold text-white">Animals 🐖</ComboboxLabel>
          <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative">
            <ComboboxInput class="px-2 w-44 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500" />
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
            <ComboboxListbox
              flip={true}
              offset={8}
              class="w-44 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
            />
          </ComboboxPortal>
        </Combobox>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});
