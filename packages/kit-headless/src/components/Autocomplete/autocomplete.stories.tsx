import { Meta, StoryObj } from 'storybook-framework-qwik';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import './autocompleteTest.css';

/*

    Didn't finish setting up storybook in time.
    Want to test QwikIntrinsicElements & HTMLAttributes

*/

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
  'Custard apple',
  'Damson',
  'Date',
  'Dragonfruit',
  'Durian',
  'Elderberry',
  'Feijoa',
  'Fig',
  'Gooseberry',
  'Grape',
  'Raisin',
  'Grapefruit',
  'Guava',
  'Honeyberry',
  'Huckleberry',
  'Jabuticaba',
  'Jackfruit',
  'Jambul',
  'Juniper berry',
  'Kiwifruit',
  'Kumquat',
  'Lemon',
  'Lime',
  'Loquat',
  'Longan',
  'Lychee',
  'Mango',
  'Mangosteen',
  'Marionberry',
  'Melon',
  'Cantaloupe',
  'Honeydew',
  'Watermelon',
  'Miracle fruit',
  'Mulberry',
  'Nectarine',
  'Nance',
  'Olive',
  'Orange',
  'Clementine',
  'Mandarine',
  'Tangerine',
  'Papaya',
  'Passionfruit',
  'Peach',
  'Pear',
  'Persimmon',
  'Plantain',
  'Plum',
  'Pineapple',
  'Pomegranate',
  'Pomelo',
  'Quince',
  'Raspberry',
  'Salmonberry',
  'Rambutan',
  'Redcurrant',
  'Salak',
  'Satsuma',
  'Soursop',
  'Star fruit',
  'Strawberry',
  'Tamarillo',
  'Tamarind',
  'Yuzu',
];

import {
  AutocompleteRoot,
  AutocompleteLabel,
  AutocompleteTrigger,
  AutocompleteInput,
  AutocompleteButton,
  AutocompleteListbox,
  AutocompleteOption,
  type AutocompleteRootProps,
} from './autocomplete';

const meta: Meta<AutocompleteRootProps> = {
  args: {},
  component: AutocompleteRoot,
};

type Story = StoryObj<AutocompleteRootProps>;

const RegularAutocomplete = () => (
  <>
    <AutocompleteRoot style="width: fit-content">
      <AutocompleteLabel>Label</AutocompleteLabel>
      <AutocompleteTrigger>
        <AutocompleteInput />
        <AutocompleteButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="width: 20px; height: 20px;"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </AutocompleteButton>
      </AutocompleteTrigger>
      <AutocompleteListbox class="listboxStyle">
        {fruits.map((fruit, index) => (
          <AutocompleteOption optionValue={fruit} key={index}>
            {fruit}
          </AutocompleteOption>
        ))}
      </AutocompleteListbox>
    </AutocompleteRoot>
    <AutocompleteRoot style="width: fit-content">
      <AutocompleteLabel>Label</AutocompleteLabel>
      <AutocompleteTrigger>
        <AutocompleteInput />
        <AutocompleteButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="width: 20px; height: 20px;"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </AutocompleteButton>
      </AutocompleteTrigger>
      <AutocompleteListbox class="listboxStyle">
        {fruits.map((fruit, index) => (
          <AutocompleteOption optionValue={fruit} key={index}>
            {fruit}
          </AutocompleteOption>
        ))}
      </AutocompleteListbox>
    </AutocompleteRoot>
    <AutocompleteRoot style="width: fit-content">
      <AutocompleteLabel>Label</AutocompleteLabel>
      <AutocompleteTrigger>
        <AutocompleteInput />
        <AutocompleteButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="width: 20px; height: 20px;"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </AutocompleteButton>
      </AutocompleteTrigger>
      <AutocompleteListbox class="listboxStyle">
        {fruits.map((fruit, index) => (
          <AutocompleteOption optionValue={fruit} key={index}>
            {fruit}
          </AutocompleteOption>
        ))}
      </AutocompleteListbox>
    </AutocompleteRoot>
  </>
);

export const Primary: Story = {
  render: () => RegularAutocomplete(),
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};

export default meta;
