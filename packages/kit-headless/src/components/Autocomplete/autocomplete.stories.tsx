import { Meta, StoryObj } from 'storybook-framework-qwik';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Test } from './autocomplete';

/*

    Didn't finish setting up storybook in time.
    Want to test QwikIntrinsicElements & HTMLAttributes

*/

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
    <AutocompleteLabel>Label</AutocompleteLabel>
    <AutocompleteRoot>
      <AutocompleteTrigger>
        <AutocompleteInput />
        <AutocompleteButton class="test" onClick$={() => console.log('hi')}>
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
      <AutocompleteListbox>
        <AutocompleteOption>Option 1</AutocompleteOption>
        <AutocompleteOption>Option 2</AutocompleteOption>
        <AutocompleteOption>Option 3</AutocompleteOption>
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
