import { Meta, StoryObj } from 'storybook-framework-qwik';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import {
  Autocomplete,
  AutocompleteLabel,
  AutocompleteInput,
  AutocompleteButton,
  AutocompleteListbox,
  AutocompleteOption,
} from './autocomplete';

const meta: Meta<AutocompleteProps> = {
  component: Autocomplete,
};

type Story = StoryObj<{}>;

export const Primary: Story = {
  args: {},
  render: (args) => (
    <>
      <AutocompleteLabel>Label</AutocompleteLabel>
      <Autocomplete>
        <div>
          <AutocompleteInput />
          <AutocompleteButton class="test">
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
        </div>
        <AutocompleteListbox>
          <AutocompleteOption>Option 1</AutocompleteOption>
          <AutocompleteOption>Option 2</AutocompleteOption>
          <AutocompleteOption>Option 3</AutocompleteOption>
        </AutocompleteListbox>
      </Autocomplete>
    </>
  ),
  play: ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
  },
};

export default meta;
