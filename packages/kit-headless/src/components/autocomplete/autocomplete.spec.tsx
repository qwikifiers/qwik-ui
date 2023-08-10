import { component$ } from '@builder.io/qwik';
import {
  AutocompleteRoot,
  AutocompleteLabel,
  AutocompleteTrigger,
  AutocompleteInput,
  AutocompleteControl,
  AutocompleteListbox,
  AutocompleteOption
} from './index';

import TestData from './test-data';

const RegularAutocomplete = component$(() => {
  const fruits = TestData();

  return (
    <>
      <AutocompleteRoot style="width: fit-content">
        <AutocompleteLabel>Label</AutocompleteLabel>
        <AutocompleteControl>
          <AutocompleteInput />
          <AutocompleteTrigger>
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
          </AutocompleteTrigger>
        </AutocompleteControl>
        <AutocompleteListbox class="listboxStyle">
          {fruits.map((fruit) => (
            <AutocompleteOption optionValue={fruit} key={fruit}>
              {fruit}
            </AutocompleteOption>
          ))}
        </AutocompleteListbox>
      </AutocompleteRoot>
    </>
  );
});

describe('Critical Functionality', () => {
  it('INIT', () => {
    cy.mount(<RegularAutocomplete />);

    cy.checkA11yForComponent();
  });

  it(`GIVEN an Autocomplete component with a trigger
      WHEN the trigger is clicked,
      THEN the listbox should open`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('button').click();

    cy.findByRole('listbox').should('be.visible');
  });

  it(`GIVEN an Autocomplete component with a trigger
      WHEN the trigger is clicked
      THEN the trigger should have aria-expanded set to true
  `, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('button').click().should('have.attr', 'aria-expanded', 'true');
  });

  it(`GIVEN an Autocomplete component with an open listbox and trigger
      WHEN the trigger is clicked,
      THEN the listbox should close`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('button').click();

    cy.findByRole('listbox').should('exist');

    cy.get('button').click();

    cy.findByRole('listbox').should('not.exist');
  });

  it(`GIVEN an Autocomplete component with an open listbox and trigger
      WHEN the trigger is clicked,
      THEN the trigger should have aria-expanded set to false`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('button').click().click().should('have.attr', 'aria-expanded', 'false');
  });

  it(`GIVEN an Autocomplete component with a listbox and an input
      WHEN a value is entered into the input field,
      THEN the listbox should open.`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('input').type(`Ap`);

    cy.findByRole('listbox').should('be.visible');
  });

  it(`GIVEN an Autocomplete component with a listbox and an input
      WHEN a value is entered into the input field, and the 1st option visible is selected.
      THEN the 1st visible value should populate the input field.`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('input').type(`Ap`);

    cy.findByRole('listbox').should('be.visible');

    cy.get('li').first().click();

    cy.get('input').should('have.value', 'Apple');
  });

  it(`GIVEN an Autocomplete component with an open listbox and an input
      WHEN a value is selected from the listbox,
      THEN the listbox should close.`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('input').type(`Ap`);

    cy.findByRole('listbox').should('be.visible');

    cy.get('li').first().click();

    cy.findByRole('listbox').should('not.exist');
  });

  it(`GIVEN an Autocomplete component with an open listbox and something else in the DOM
    WHEN the user clicks outside of the Autocomplete component
    THEN the listbox should close.`, () => {
    cy.mount(
      <>
        <RegularAutocomplete />
        <button>Random Element</button>
      </>
    );

    cy.get('button').first().focus().click();

    cy.findByRole('button', { name: 'Random Element' }).focus().click();

    cy.findByRole('listbox').should('not.exist');
  });
});

describe('Keyboard Navigation', () => {
  it(`GIVEN an Autocomplete component with an open listbox
      WHEN the user presses the 'Escape' key,
      THEN the listbox should close`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('button').click();

    cy.findByRole('listbox');

    cy.get('body').type(`{esc}`);

    cy.findByRole('listbox').should('not.exist');
  });

  it(`GIVEN an Autocomplete component with a focused option inside a listbox,
      WHEN the user presses the 'Home' key,
      THEN the first option in the listbox should be focused.`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('button').click();

    cy.findByRole('option', { name: 'Yuzu' }).focus().type(`{home}`);

    cy.get('li').first().should('have.focus');
  });

  it(`GIVEN an Autocomplete component with a focused option inside a listbox,
      WHEN the user presses the 'End' key,
      THEN the last option in the listbox should be focused.`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('button').click();

    cy.findByRole('option', { name: 'Apricot' }).focus().type(`{end}`);

    cy.get('li').last().should('have.focus');
  });

  it(`GIVEN an Autocomplete component and selected text in an input field,
      WHEN the user presses the 'Delete' key,
      THEN the text within the input field should be removed.`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('input')
      .type(`Here's some text!`)
      .type(`{selectall}`)
      .type(`{del}`)
      .should('have.value', '');
  });

  it(`GIVEN an Autocomplete component with an open listbox and multiple         filtered options
  WHEN the down arrow key is pressed,
  THEN focus should move to the next option in the list,
  `, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('input').type(`A`);

    cy.findByRole('listbox').should('be.visible');

    cy.get('input').type(`{downarrow}`);

    cy.findByRole('option', { name: 'Apple' }).focus().type(`{downarrow}`);

    // grabs the 2nd element because the index is 1
    cy.get('li').filter(':visible').eq(1).should('have.focus');
  });

  it(`GIVEN an Autocomplete component with an open listbox and multiple         filtered options
  WHEN the up arrow key is pressed,
  THEN focus should move back to the previous option in the list.`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('input').type(`Ba`);

    cy.findByRole('listbox');

    cy.findByRole('option', { name: 'Jabuticaba' }).focus().type(`{uparrow}`);

    cy.get('li').filter(':visible').first().should('have.focus');
  });

  it(`GIVEN an Autocomplete component with an open listbox and multiple         filtered options
  WHEN the first option is in focus and the up arrow key is pressed,
  THEN focus should move to the last option in the list.`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('input').type(`A`);

    cy.findByRole('listbox');

    cy.findByRole('option', { name: 'Apple' }).focus().type(`{uparrow}`);

    cy.get('li').filter(':visible').last().should('have.focus');
  });

  it(`GIVEN an Autocomplete component with an open listbox and multiple         filtered options
  WHEN the last option is in focus and the down arrow key is pressed,
  THEN focus should move to the first option in the list.`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('input').type(`A`);

    cy.findByRole('listbox');

    cy.findByRole('option', { name: 'Tamarind' }).focus().type(`{downarrow}`);

    cy.get('li').filter(':visible').first().should('have.focus');
  });

  it(`GIVEN an Autocomplete component with an open listbox and multiple         filtered options
  WHEN the down arrow key is pressed,
  THEN the 1st filtered option in the listbox should receive focus.`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('input').type(`Ba`);

    cy.findByRole('listbox').should('be.visible');

    cy.get('input').type(`{downarrow}`);

    cy.get('li').filter(':visible').first().should('have.focus');
  });

  it(`GIVEN an Autocomplete component with an open listbox and an option is in focus,
  WHEN the enter key is pressed,
  THEN the focused option should be selected and the listbox should close.`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('button').click();

    cy.findByRole('listbox').should('be.visible');

    cy.findByRole('option', { name: 'Guava' }).focus().type(`{enter}`);

    cy.get('input').should('have.value', 'Guava');

    cy.findByRole('listbox').should('not.exist');
  });
});

const DisabledAutocomplete = component$(() => {
  const fruits = TestData();

  return (
    <>
      <AutocompleteRoot style="width: fit-content">
        <AutocompleteLabel>Label</AutocompleteLabel>
        <AutocompleteControl>
          <AutocompleteInput />
          <AutocompleteTrigger>
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
          </AutocompleteTrigger>
        </AutocompleteControl>
        <AutocompleteListbox class="listboxStyle">
          <AutocompleteOption optionValue="I'm the first option!">
            I'm the first option!
          </AutocompleteOption>
          <AutocompleteOption disabled optionValue="I'm disabled!">
            I'm disabled!
          </AutocompleteOption>
          {fruits.map((fruit, index) => (
            <AutocompleteOption optionValue={fruit} key={index}>
              {fruit}
            </AutocompleteOption>
          ))}
        </AutocompleteListbox>
      </AutocompleteRoot>
    </>
  );
});

describe('Disabled', () => {
  it(`GIVEN an Autocomplete component with an open listbox and a disabled option, 
      WHEN the user clicks on the disabled option, 
      THEN the disabled option should not be selected.`, () => {
    cy.mount(<DisabledAutocomplete />);

    cy.get('button').click();

    cy.findByRole('option', { name: `I'm disabled!` }).click();

    cy.get('input').should('have.value', '');
  });

  // it(`GIVEN an Autocomplete component with an open listbox and a disabled option,
  //     WHEN the user clicks on the disabled option,
  //     THEN the listbox should not close`, () => {
  //   cy.mount(<DisabledAutocomplete />);

  //   cy.get('button').click();

  //   cy.findByRole('option', { name: `I'm disabled!` }).click();

  //   cy.get('listbox').should('exist');
  // });
});
