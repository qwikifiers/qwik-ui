import { component$ } from '@builder.io/qwik';
import {
  AutocompleteRoot,
  AutocompleteLabel,
  AutocompleteTrigger,
  AutocompleteInput,
  AutocompleteButton,
  AutocompleteListbox,
  AutocompleteOption,
} from './index';

const RegularAutocomplete = component$(() => {
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

  return (
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
    </>
  );
});

describe('Autocomplete', () => {
  it('INIT', () => {
    cy.mount(<RegularAutocomplete />);

    cy.checkA11yForComponent();
  });

  it(`GIVEN a button is present that controls the visibility of a listbox 
      WHEN the button is clicked,
      THEN the listbox should open and the attribute 'aria-expanded' on the button should be set to 'true'.`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('button').click().should('have.attr', 'aria-expanded', 'true');

    cy.findByRole('listbox').should('be.visible');
  });

  it(`GIVEN a button is present that controls the visibility of a listbox, and the listbox is currently open,
      WHEN the button is clicked,
      THEN the listbox should close and the attribute 'aria-expanded' on the button should be set to 'false'.`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('button')
      .click()
      .click()
      .should('have.attr', 'aria-expanded', 'false');

    cy.findByRole('listbox').should('not.exist');
  });

  it(`GIVEN an open listbox
      WHEN the user presses the 'Escape' key,
      THEN the listbox should close and the attribute 'aria-expanded' on the button should be set to 'false'.`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('button').click();

    cy.findByRole('listbox');

    cy.get('body').type(`{esc}`);

    cy.findByRole('listbox').should('not.exist');
  });

  it(`GIVEN a focused option in a listbox,
      WHEN the user presses the 'Home' key,
      THEN the first option in the listbox should be focused.`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('button').click();

    cy.findByRole('option', { name: 'Yuzu' }).focus().type(`{home}`);

    cy.get('li').first().should('have.focus');
  });

  it(`GIVEN a focused option in a listbox,
      WHEN the user presses the 'End' key,
      THEN the last option in the listbox should be focused.`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('button').click();

    cy.findByRole('option', { name: 'Apricot' }).focus().type(`{end}`);

    cy.get('li').last().should('have.focus');
  });

  it(`GIVEN selected text in an input field,
      WHEN the user presses the 'Delete' key,
      THEN the text within the input field should be removed.`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('input')
      .type(`Here's some text!`)
      .type(`{selectall}`)
      .type(`{del}`)
      .should('have.value', '');
  });

  it(`GIVEN an input field is present that is connected to a listbox,
      WHEN a value is entered into the input field,
      THEN the listbox should open.`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('input').type(`Ap`);

    cy.findByRole('listbox').should('be.visible');
  });

  it(`GIVEN an input field is present that is connected to a listbox,
      WHEN a value is entered into the input field, and an option matching the input value is selected from the listbox,
      THEN the selected value should populate the input field.`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('input').type(`Ap`);

    cy.findByRole('listbox').should('be.visible');

    cy.get('li').first().click();

    cy.get('input').should('have.value', 'Apple');
  });

  it(`GIVEN a listbox is open and populated with selectable options,
      WHEN a value is selected from the listbox,
      THEN the listbox should close.`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('input').type(`Ap`);

    cy.findByRole('listbox').should('be.visible');

    cy.get('li').first().click();

    cy.findByRole('listbox').should('not.exist');
  });

  it(`GIVEN a listbox is open and populated with filtered options,
      WHEN the down arrow key is pressed,
      THEN the first filtered option in the listbox should receive focus.`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('input').type(`Ba`);

    cy.findByRole('listbox').should('be.visible');

    cy.get('input').type(`{downarrow}`);

    cy.get('li').filter(':visible').first().should('have.focus');
  });

  it(`GIVEN a listbox is open and an option is in focus,
      WHEN the enter key is pressed,
      THEN the focused option should be selected and the listbox should close.`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('button').click();

    cy.findByRole('listbox').should('be.visible');

    cy.findByRole('option', { name: 'Guava' }).focus().type(`{enter}`);

    cy.get('input').should('have.value', 'Guava');

    cy.findByRole('listbox').should('not.exist');
  });

  it(`GIVEN a listbox is open and populated with selectable options,
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

  it(`GIVEN a listbox is open and populated with selectable options,
      WHEN the up arrow key is pressed,
      THEN focus should move back to the previous option in the list.`, () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('input').type(`Ba`);

    cy.findByRole('listbox');

    cy.findByRole('option', { name: 'Jabuticaba' }).focus().type(`{uparrow}`);

    cy.get('li').filter(':visible').first().should('have.focus');
  });
});
