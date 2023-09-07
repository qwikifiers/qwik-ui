import {
  component$,
  QwikIntrinsicElements,
  Slot,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import {
  Combobox,
  ComboboxControl,
  ComboboxInput,
  ComboboxLabel,
  ComboboxListbox,
  ComboboxPortal,
  ComboboxTrigger,
  ComboboxIcon,
  ComboboxOption,
  type ResolvedOption,
} from '@qwik-ui/headless';

// import {
//   ComboboxOption,
//   type ResolvedOption,
// } from '../../../../../../../../packages/kit-headless/src/components/combobox';

import { PreviewCodeExample } from '../../../_components/preview-code-example/preview-code-example';

const objectExample = [
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
  type MyData = {
    testValue: string;
    testLabel: string;
    disabled: boolean;
  };

  return (
    <>
      <PreviewCodeExample>
        <div class="flex flex-col gap-4" q:slot="actualComponent">
          <Combobox
            options={objectExample}
            optionValueKey="testValue"
            optionLabelKey="testLabel"
            optionDisabledKey="disabled"
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
                <ComboboxIcon class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]" />
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxListbox
                gutter={8}
                class="w-44 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
                optionRenderer$={(option: ResolvedOption, index: number) => {
                  const myData = option.option as MyData;
                  return (
                    <ComboboxOption
                      key={option.key}
                      resolved={option}
                      index={index}
                      class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
                    >
                      <span class="block group-aria-selected:translate-x-[3px] transition-transform duration-350">
                        {myData.testLabel}
                      </span>
                    </ComboboxOption>
                  );
                }}
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
          >
            <ComboboxLabel class=" font-semibold text-white">Fruits 🍓</ComboboxLabel>
            <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative">
              <ComboboxInput
                class="px-2 w-44 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500"
                placeholder="Papaya"
              />
              <ComboboxTrigger class="w-6 h-6 group absolute right-0">
                <ComboboxIcon class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]" />
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxListbox
                gutter={8}
                class="w-44 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
                optionRenderer$={(option: ResolvedOption, index: number) => (
                  <ComboboxOption
                    key={option.key}
                    class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
                    index={index}
                    resolved={option}
                  >
                    {option.label}
                  </ComboboxOption>
                )}
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
          <Combobox class="w-fit" options={objectExample}>
            <ComboboxLabel class=" font-semibold text-white">Jedi ⚔️</ComboboxLabel>
            <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative">
              <ComboboxInput class="px-2 w-44 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500" />
              <ComboboxTrigger class="w-6 h-6 group absolute right-0">
                <ComboboxIcon class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]" />
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxListbox
                gutter={8}
                class="w-44 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
                optionRenderer$={(option: ResolvedOption, index: number) => (
                  <ComboboxOption
                    key={option.key}
                    class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
                    index={index}
                    resolved={option}
                  >
                    {option.label}
                  </ComboboxOption>
                )}
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
          >
            <ComboboxLabel class=" font-semibold text-white">Countries 🚩</ComboboxLabel>
            <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative">
              <ComboboxInput class="px-2 w-44 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500" />
              <ComboboxTrigger class="w-6 h-6 group absolute right-0">
                <ComboboxIcon class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]" />
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxListbox
                flip={true}
                gutter={8}
                class="w-44 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
                optionRenderer$={(option: ResolvedOption, index: number) => (
                  <ComboboxOption
                    key={option.key}
                    class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
                    index={index}
                    resolved={option}
                  >
                    {option.label}
                  </ComboboxOption>
                )}
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
          >
            <ComboboxLabel class=" font-semibold text-white">Countries 🚩</ComboboxLabel>
            <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative">
              <ComboboxInput class="px-2 w-44 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500" />
              <ComboboxTrigger class="w-6 h-6 group absolute right-0">
                <ComboboxIcon class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]" />
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxListbox
                flip={true}
                gutter={8}
                class="w-44 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
                optionRenderer$={(option: ResolvedOption, index: number) => (
                  <ComboboxOption
                    key={option.key}
                    class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
                    index={index}
                    resolved={option}
                  >
                    {option.label}
                  </ComboboxOption>
                )}
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
    <PreviewCodeExample>
      <div class="flex flex-col items-center gap-4 p-4" q:slot="actualComponent">
        <div>
          <Combobox
            class="w-fit"
            options={disabledExample}
            optionDisabledKey="myDisabledKey"
          >
            <ComboboxLabel class=" font-semibold text-white">Disabled ⛔</ComboboxLabel>
            <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative">
              <ComboboxInput class="px-2 w-44 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500" />
              <ComboboxTrigger class="w-6 h-6 group absolute right-0">
                <ComboboxIcon class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]" />
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxListbox
                flip={true}
                gutter={8}
                class="w-44 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
                optionRenderer$={(option: ResolvedOption, index: number) => (
                  <ComboboxOption
                    key={option.key}
                    class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
                    index={index}
                    resolved={option}
                  >
                    {option.label}
                  </ComboboxOption>
                )}
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
    <PreviewCodeExample>
      <div class="flex flex-col items-center gap-4 p-4" q:slot="actualComponent">
        <div class="relative">
          {isPokemonCaught.value && (
            <p class="absolute translate-x-[-105%] w-full text-white bg-slate-800 p-4 shadow-dark-medium rounded-md border-2 border-slate-400">
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
            <ComboboxLabel class=" font-semibold text-white">Pokemon 🦏</ComboboxLabel>
            <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative">
              <ComboboxInput class="px-2 w-44 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500" />
              <ComboboxTrigger class="w-6 h-6 group absolute right-0">
                <ComboboxIcon class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]" />
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxListbox
                flip={true}
                gutter={8}
                class="w-44 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
                optionRenderer$={(option: ResolvedOption, index: number) => {
                  const pokemonOption = option.option as Pokemon;
                  return (
                    <ComboboxOption
                      key={option.key}
                      class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group flex justify-between"
                      index={index}
                      resolved={option}
                      onMouseEnter$={() => {
                        if (option.disabled === true) {
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
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const DisableBlur = component$(() => {
  const planets = [
    'Mercury',
    'Venus',
    'Earth',
    'Mars',
    'Jupiter',
    'Saturn',
    'Uranus',
    'Neptune',
  ];

  return (
    <PreviewCodeExample>
      <div class="flex flex-col items-center gap-4 p-4" q:slot="actualComponent">
        <p class="text-white text-center">
          I have blur disabled! Inspect me in the dev tools.
        </p>
        <div>
          <Combobox
            class="w-fit"
            options={planets}
            filter$={(value: string, options) =>
              options.filter(({ option }) => {
                return option.toLowerCase().startsWith(value.toLowerCase());
              })
            }
          >
            <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative">
              <ComboboxInput
                disableOnBlur={true}
                class="px-2 w-44 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500"
              />
              <ComboboxTrigger class="w-6 h-6 group absolute right-0">
                <ComboboxIcon class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]" />
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxListbox
                gutter={8}
                class="w-44 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
                hide="referenceHidden"
                optionRenderer$={(option: ResolvedOption, index: number) => (
                  <ComboboxOption
                    key={option.key}
                    class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
                    index={index}
                    resolved={option}
                  >
                    {option.label}
                  </ComboboxOption>
                )}
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

export const PlacementExample = component$(() => {
  const inputValueSig = useSignal('');
  type PlacementExample = {
    value: string;
    label: string;
  };

  const placementExample: Array<PlacementExample> = [
    { value: '0', label: 'Up' },
    { value: '1', label: 'Down' },
    { value: '2', label: 'Left' },
    { value: '3', label: 'Right' },
  ];

  return (
    <PreviewCodeExample>
      <div class="flex flex-col items-center gap-4 p-4" q:slot="actualComponent">
        <div class="flex flex-col items-center">
          <p class="text-white text-center">Positions</p>
          <Combobox
            class="w-fit"
            options={placementExample}
            optionDisabledKey="myDisabledKey"
            bind:inputValueSig={inputValueSig}
          >
            <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative mt-2">
              <ComboboxInput class="w-44 px-2 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500" />
              <ComboboxTrigger class="w-6 h-6 group absolute right-0">
                <ComboboxIcon class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]" />
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxListbox
                gutter={8}
                placement="top"
                class="w-44 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
                optionRenderer$={(option: ResolvedOption, index: number) => (
                  <ComboboxOption
                    key={option.key}
                    class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
                    index={index}
                    resolved={option}
                  >
                    {option.label}
                  </ComboboxOption>
                )}
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

export const FlipExample = component$(() => {
  type FlipExample = {
    value: string;
    label: string;
  };

  const flipExample: Array<FlipExample> = [
    { value: '0', label: 'Up! ☝️' },
    { value: '1', label: 'Up! ☝️' },
    { value: '2', label: 'Down! 👇' },
    { value: '3', label: 'Up! ☝️' },
    { value: '4', label: 'Down! 👇' },
    { value: '5', label: 'Down! 👇' },
    { value: '6', label: 'Down! 👇' },
    { value: '7', label: 'Up! ☝️' },
  ];

  return (
    <PreviewCodeExample>
      <div class="flex flex-col items-center gap-4 p-4" q:slot="actualComponent">
        <div class="flex flex-col items-center">
          <p class="text-white text-center">☝️ Scroll up and down with me open! 👇</p>
          <Combobox class="w-fit" options={flipExample} optionDisabledKey="myDisabledKey">
            <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative mt-2">
              <ComboboxInput class="w-44 px-2 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500" />
              <ComboboxTrigger class="w-6 h-6 group absolute right-0">
                <ComboboxIcon class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]" />
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxListbox
                flip={true}
                gutter={8}
                class="w-44 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
                optionRenderer$={(option: ResolvedOption, index: number) => (
                  <ComboboxOption
                    key={option.key}
                    class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
                    index={index}
                    resolved={option}
                  >
                    {option.label}
                  </ComboboxOption>
                )}
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

export const GutterExample = component$(() => {
  const streets = [
    'Baker Street',
    'Fleet Street',
    'Wall Street',
    'Broadway',
    'Sunset Boulevard',
    'Rodeo Drive',
    'Abbey Road',
  ];

  return (
    <PreviewCodeExample>
      <div class="flex flex-col items-center gap-4 p-4" q:slot="actualComponent">
        <div>
          <Combobox
            class="w-fit"
            options={streets}
            filter$={(value: string, options) =>
              options.filter(({ option }) => {
                return option.toLowerCase().startsWith(value.toLowerCase());
              })
            }
          >
            <ComboboxLabel class="w-44 font-semibold text-white">
              I'm between gutters!
            </ComboboxLabel>
            <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative">
              <ComboboxInput
                class="px-2 w-44 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500"
                placeholder="Wallaby Rd."
              />
              <ComboboxTrigger class="w-6 h-6 group absolute right-0">
                <ComboboxIcon class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]" />
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxListbox
                gutter={24}
                class="w-44 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
                optionRenderer$={(option: ResolvedOption, index: number) => (
                  <ComboboxOption
                    key={option.key}
                    class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
                    index={index}
                    resolved={option}
                  >
                    {option.label}
                  </ComboboxOption>
                )}
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

export const HideExample = component$(() => {
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
        <p class="text-white text-center">☝️ Scroll up and down with me open! 👇</p>
        <div>
          <Combobox
            class="w-fit"
            options={fruits}
            filter$={(value: string, options) =>
              options.filter(({ option }) => {
                return option.toLowerCase().startsWith(value.toLowerCase());
              })
            }
          >
            <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative">
              <ComboboxInput class="px-2 w-44 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500" />
              <ComboboxTrigger class="w-6 h-6 group absolute right-0">
                <ComboboxIcon class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]" />
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxListbox
                gutter={8}
                class="w-44 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
                hide="escaped"
                optionRenderer$={(option: ResolvedOption, index: number) => (
                  <ComboboxOption
                    key={option.key}
                    class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
                    index={index}
                    resolved={option}
                  >
                    {option.label}
                  </ComboboxOption>
                )}
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

export const AnimationExample = component$(() => {
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
    <PreviewCodeExample>
      <div class="flex flex-col items-center gap-4 p-4" q:slot="actualComponent">
        <div>
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
            <ComboboxLabel class=" font-semibold text-white">Streets 🛣️</ComboboxLabel>
            <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative">
              <ComboboxInput
                disableOnBlur={true}
                class="px-2 w-44 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500"
                placeholder="Wallaby Rd."
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
                gutter={8}
                class={`w-44 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px] transition-opacity duration-[500ms] ${
                  isListboxOpenSig.value ? 'opacity-100' : 'opacity-0'
                }`}
                optionRenderer$={(option: ResolvedOption, index: number) => (
                  <ComboboxOption
                    key={option.key}
                    class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
                    index={index}
                    resolved={option}
                  >
                    {option.label}
                  </ComboboxOption>
                )}
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

export const CustomState = component$(() => {
  const isListboxOpenSig = useSignal(false);
  const highlightedIndexSig = useSignal(2);

  const signalsExample = [
    'bind:isListboxOpenSig',
    'bind:isInputFocusedSig',
    'bind:isTriggerFocusedSig',
    'bind:inputValueSig',
  ];

  return (
    <PreviewCodeExample>
      <div class="flex flex-col items-center gap-4 p-4" q:slot="actualComponent">
        <p class="text-white text-center">I love signals! 🗼</p>
        <div>
          <Combobox
            class="w-fit"
            options={signalsExample}
            bind:isListboxOpenSig={isListboxOpenSig}
            bind:highlightedIndexSig={highlightedIndexSig}
          >
            <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative">
              <ComboboxInput
                class="px-2 w-fit bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500"
                onClick$={() => (isListboxOpenSig.value = !isListboxOpenSig.value)}
              />
              <ComboboxTrigger class="w-6 h-6 group absolute right-0">
                <ComboboxIcon class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]" />
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxListbox
                gutter={8}
                class="w-fit bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
                hide="escaped"
                optionRenderer$={(option: ResolvedOption, index: number) => (
                  <ComboboxOption
                    key={option.key}
                    class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
                    index={index}
                    resolved={option}
                  >
                    {option.label}
                  </ComboboxOption>
                )}
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

export const DefaultLabel = component$(() => {
  const names = ['Jim', 'Joanna', 'John', 'Jessica'];

  return (
    <PreviewCodeExample>
      <div class="flex flex-col items-center gap-4 p-4" q:slot="actualComponent">
        <div>
          <Combobox class="w-fit" defaultLabel={names[2]} options={names}>
            <ComboboxLabel class="text-white">Default Label</ComboboxLabel>
            <ComboboxControl class="bg-[#1f2532] rounded-sm border-slate-400 border-[1px] relative">
              <ComboboxInput class="px-2 w-44 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500" />
              <ComboboxTrigger class="w-6 h-6 group absolute right-0">
                <ComboboxIcon class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]" />
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxListbox
                gutter={8}
                class="w-44 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
                hide="escaped"
                optionRenderer$={(option: ResolvedOption, index: number) => (
                  <ComboboxOption
                    key={option.key}
                    class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
                    index={index}
                    resolved={option}
                  >
                    {option.label}
                  </ComboboxOption>
                )}
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

export const HighlightedExample = component$(() => {
  const highlightedIndexSig = useSignal(2);

  const highlightedExample = [
    'not highlighted',
    'not highlighted',
    'highlighted by default!',
    'not highlighted',
  ];

  return (
    <PreviewCodeExample>
      <div class="flex flex-col items-center gap-4 p-4" q:slot="actualComponent">
        <p class="text-white text-center">Third option highlighted! 🚨</p>
        <div>
          <Combobox
            class="w-fit"
            options={highlightedExample}
            bind:highlightedIndexSig={highlightedIndexSig}
          >
            <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative">
              <ComboboxInput class="px-2 w-fit bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500" />
              <ComboboxTrigger class="w-6 h-6 group absolute right-0">
                <ComboboxIcon class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]" />
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxListbox
                gutter={8}
                size={true}
                class="w-fit bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
                hide="escaped"
                optionRenderer$={(option: ResolvedOption, index: number) => (
                  <ComboboxOption
                    key={option.key}
                    class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
                    index={index}
                    resolved={option}
                  >
                    {option.label}
                  </ComboboxOption>
                )}
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

// export const ShiftExample = component$(() => {
//   const shiftExample = ['Example1', 'Example2', 'Example3'];
//   const isListboxOpenSig = useSignal(true);

//   return (
//     <PreviewCodeExample>
//       <div
//         class="flex flex-col w-full items-center gap-4 h-[10rem] relative"
//         style={{ overflow: 'auto', width: '100%' }}
//         q:slot="actualComponent"
//       >
//         <div class="w-[2000px] h-[1px]"></div>
//         <div class="flex justify-center">
//           <Combobox
//             class="w-fit"
//             options={shiftExample}
//             bind:isListboxOpenSig={isListboxOpenSig}
//           >
//             <ComboboxLabel class=" font-semibold text-white">Fruits 🍓</ComboboxLabel>
//             <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative">
//               <ComboboxInput
//                 class="px-2 w-44 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500"
//                 placeholder="Papaya"
//               />
//               <ComboboxTrigger class="w-6 h-6 group absolute right-0">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]"
//                   stroke-linecap="round"
//                   stroke-width="2"
//                   stroke-linejoin="round"
//                 >
//                   <polyline points="6 9 12 15 18 9"></polyline>
//                 </svg>
//               </ComboboxTrigger>
//             </ComboboxControl>
//             <ComboboxPortal>
//               <ComboboxListbox
//                 optionRenderer$={(option: ResolvedOption, index: number) => (
//                   <ComboboxOption
//                     key={option.key}
//                     class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
//                     index={index}
//                     resolved={option}
//                   >
//                     {option.label}
//                   </ComboboxOption>
//                 )}
//                 class="w-fit absolute left:0 top:0 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
//               />
//             </ComboboxPortal>
//           </Combobox>
//         </div>
//       </div>

//       <div q:slot="codeExample">
//         <Slot />
//       </div>
//     </PreviewCodeExample>
//   );
// });

// // Using context example.

import { createContextId, useContext, useContextProvider } from '@builder.io/qwik';
import { StatusBadge } from '../../../_components/component-status-badge/component-status-badge';
import { statusByComponent } from 'apps/website/src/_state/component-statuses';

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
    <PreviewCodeExample>
      <div class="flex flex-col gap-4" q:slot="actualComponent">
        <Combobox options={animals} class="relative">
          <ComboboxLabel class=" font-semibold text-white">Animals 🐖</ComboboxLabel>
          <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative">
            <ComboboxInput class="px-2 w-44 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500" />
            <ComboboxTrigger class="w-6 h-6 group absolute right-0">
              <ComboboxIcon class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]" />
            </ComboboxTrigger>
          </ComboboxControl>
          <ComboboxPortal>
            <ComboboxListbox
              flip={true}
              gutter={8}
              class="w-44 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
              optionRenderer$={(option: ResolvedOption, index: number) => (
                <ComboboxOption
                  index={index}
                  resolved={option}
                  class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
                >
                  <span class="block group-aria-selected:translate-x-[3px] transition-transform duration-350">
                    <span>{option.label}</span>
                  </span>
                </ComboboxOption>
              )}
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

export const SearchBar = component$(() => {
  const inputValueSig = useSignal('');
  const highlightedIndexSig = useSignal(0);
  const inputRef = useSignal<HTMLInputElement>();
  const isListboxOpenSig = useSignal(false);

  type MyComponents = {
    component: string;
    label: string;
  };

  const docsPrefix = '/docs/headless';
  const components = [
    { component: 'accordion', label: 'Accordion' },
    { component: 'combobox', label: 'Combobox' },
    { component: 'popover', label: 'Popover' },
    { component: 'select', label: 'Select' },
    { component: 'separator', label: 'Separator' },
    { component: 'tabs', label: 'Tabs' },
    { component: 'toggle', label: 'Toggle' },
    { component: 'tooltip', label: 'Tooltip' },
  ];

  return (
    <PreviewCodeExample>
      <div class="flex flex-col items-center gap-4 p-4" q:slot="actualComponent">
        <div>
          <Combobox
            bind:inputValueSig={inputValueSig}
            bind:inputRef={inputRef}
            bind:highlightedIndexSig={highlightedIndexSig}
            bind:isListboxOpenSig={isListboxOpenSig}
            optionValueKey="component"
            class="w-fit"
            options={components}
          >
            <ComboboxLabel class="text-white">Qwik UI ⚡</ComboboxLabel>
            <ComboboxControl class="bg-[#1f2532] rounded-sm border-slate-400 border-[1px] relative">
              <ComboboxInput
                onClick$={() => (isListboxOpenSig.value = !isListboxOpenSig.value)}
                class="pl-6 w-44 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500"
                onKeyDown$={(e) => {
                  if (e.key === 'Enter') {
                    const inputElement = e.target as HTMLInputElement;
                    window.location.href = `${docsPrefix}/${inputElement.value.toLowerCase()}`;
                  }
                }}
              />
              <ComboboxTrigger class="w-6 h-6 group absolute left-[4px]">
                <SearchIcon />
              </ComboboxTrigger>
              {inputValueSig.value.length > 0 && (
                // give separate id if two triggers
                <button
                  id="close-button"
                  aria-label="clear search"
                  onMouseDown$={() => {
                    inputValueSig.value = '';
                    inputRef.value?.focus();
                  }}
                  class="w-6 h-6 flex justify-center items-center absolute top-0 right-0"
                >
                  <ClearIcon class="w-4 h-4" />
                </button>
              )}
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxListbox
                gutter={8}
                class="w-44 bg-slate-900 px-1 py-2 rounded-sm border-slate-400 border-[1px]"
                hide="escaped"
                optionRenderer$={(option: ResolvedOption, index: number) => {
                  const searchOption = option.option as MyComponents;
                  return (
                    <a
                      href={`${docsPrefix}/${searchOption.component}`}
                      aria-label={option.label}
                    >
                      <ComboboxOption
                        key={option.key}
                        class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group flex justify-between items-start gap-4"
                        index={index}
                        resolved={option}
                      >
                        <span>{searchOption.label}</span>
                        <span class="scale-[0.9]">
                          <StatusBadge
                            status={statusByComponent.headless[option.label]}
                          />
                        </span>
                      </ComboboxOption>
                    </a>
                  );
                }}
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

export function SearchIcon(props: QwikIntrinsicElements['svg'], key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
      key={key}
    >
      <path
        fill="white"
        d="m228.24 219.76l-51.38-51.38a86.15 86.15 0 1 0-8.48 8.48l51.38 51.38a6 6 0 0 0 8.48-8.48ZM38 112a74 74 0 1 1 74 74a74.09 74.09 0 0 1-74-74Z"
      ></path>
    </svg>
  );
}

export function ClearIcon(props: QwikIntrinsicElements['svg'], key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
      key={key}
    >
      <path
        fill="white"
        d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm37.66 130.34a8 8 0 0 1-11.32 11.32L128 139.31l-26.34 26.35a8 8 0 0 1-11.32-11.32L116.69 128l-26.35-26.34a8 8 0 0 1 11.32-11.32L128 116.69l26.34-26.35a8 8 0 0 1 11.32 11.32L139.31 128Z"
      ></path>
    </svg>
  );
}

export const AutoPlacementExample = component$(() => {
  const isListboxOpenSig = useSignal(true);

  type AutoPlacementExample = {
    value: string;
    label: string;
  };

  const autoPlacementExample: Array<AutoPlacementExample> = [
    { value: '0', label: 'Audi 🚗' },
    { value: '1', label: 'BMW 🚙' },
    { value: '2', label: 'Mercedes 🚕' },
    { value: '3', label: 'Tesla 🚓' },
  ];

  return (
    <PreviewCodeExample>
      <div
        class="flex flex-col items-center gap-4 p-4"
        style={{ overflow: 'auto', width: '100%' }}
        q:slot="actualComponent"
      >
        <div class="flex flex-col items-center justify-center h-[10rem]">
          <p class="text-white text-center">My Car Collection 🚘</p>
          <Combobox
            bind:isListboxOpenSig={isListboxOpenSig}
            class="w-fit"
            options={autoPlacementExample}
            optionDisabledKey="myDisabledKey"
          >
            <ComboboxControl class="bg-[#1f2532] flex items-center rounded-sm border-slate-400 border-[1px] relative mt-2">
              <ComboboxInput class="w-44 px-2 bg-slate-900 px-d2 pr-6 text-white placeholder:text-slate-500" />
              <ComboboxTrigger class="w-6 h-6 group absolute right-0">
                <ComboboxIcon class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]" />
              </ComboboxTrigger>
            </ComboboxControl>
            <ComboboxPortal>
              <ComboboxListbox
                flip={false}
                autoPlacement={true}
                gutter={8}
                class="w-44 bg-slate-900 px-4 py-2 rounded-sm border-slate-400 border-[1px]"
                optionRenderer$={(option: ResolvedOption, index: number) => (
                  <ComboboxOption
                    key={option.key}
                    class="aria-disabled:text-slate-600 aria-disabled:hover:bg-slate-700 rounded-sm px-2 hover:bg-slate-500 aria-selected:bg-slate-500 text-white  border-2 border-transparent aria-selected:border-slate-200 group"
                    index={index}
                    resolved={option}
                  >
                    {option.label}
                  </ComboboxOption>
                )}
              />
            </ComboboxPortal>
          </Combobox>
        </div>
        <div class="w-[calc(100%+200px)] h-[1px]"></div>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});
