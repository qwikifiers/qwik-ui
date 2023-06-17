import { component$ } from '@builder.io/qwik';
import {
  AutocompleteRoot,
  AutocompleteLabel,
  AutocompleteTrigger,
  AutocompleteInput,
  AutocompleteButton,
  AutocompleteListbox,
  AutocompleteOption,
} from './autocomplete';

const RegularAutocomplete = component$(() => {
  return (
    <>
      <AutocompleteLabel>Label</AutocompleteLabel>
      <AutocompleteRoot>
        <AutocompleteTrigger>
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
        </AutocompleteTrigger>
        <AutocompleteListbox>
          <AutocompleteOption>Option 1</AutocompleteOption>
          <AutocompleteOption>Option 2</AutocompleteOption>
          <AutocompleteOption>Option 3</AutocompleteOption>
        </AutocompleteListbox>
      </AutocompleteRoot>
    </>
  );
});

describe('Autocomplete', () => {
  it('INIT', () => {
    cy.mount(<RegularAutocomplete />);

    cy.checkA11yForComponent();
  });
});
