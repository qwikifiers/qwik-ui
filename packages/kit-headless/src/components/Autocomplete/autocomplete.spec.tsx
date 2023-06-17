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
import './autocompleteTest.css';

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

const RegularAutocomplete = component$(() => {
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

  it('Should open the listbox and aria-expanded is true on the button', () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('button').click().should('have.attr', 'aria-expanded', 'true');

    cy.findByRole('listbox').should('be.visible');
  });

  it('Should close the listbox and aria-expanded is false on the button', () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('button')
      .click()
      .click()
      .should('have.attr', 'aria-expanded', 'false');

    cy.findByRole('listbox').should('not.exist');
  });

  it('Should input a value and the listbox should open', () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('input').type(`Ap`);

    cy.findByRole('listbox').should('be.visible');
  });

  it('Should input a value and select a value, with the input value as the option', () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('input').type(`Ap`);

    cy.findByRole('listbox').should('be.visible');

    cy.get('li').first().click();

    cy.get('input').should('have.value', 'Apple');
  });

  it('Should close the listbox when a value is selected', () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('input').type(`Ap`);

    cy.findByRole('listbox').should('be.visible');

    cy.get('li').first().click();

    cy.findByRole('listbox').should('not.exist');
  });

  it('Should focus the first filtered option when the down arrow is prssed', () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('input').type(`Ba`);

    cy.findByRole('listbox').should('be.visible');

    cy.get('input').type(`{downarrow}`);

    cy.get('li').filter(':visible').first().should('have.focus');
  });

  it('Should select an option using the enter key, closing the listbox', () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('input').type(`Ba`);

    cy.findByRole('listbox').should('be.visible');

    cy.get('input').type(`{downarrow}`);

    cy.get('li').filter(':visible').first().type(`{enter}`);

    cy.get('input').should('have.value', 'Banana');

    cy.findByRole('listbox').should('not.exist');
  });

  it('Should go down an option and back up, using the up & down arrow keys', () => {
    cy.mount(<RegularAutocomplete />);

    cy.get('input').type(`A`);

    cy.findByRole('listbox').should('be.visible');

    cy.get('input').type(`{downarrow}`);

    cy.get('li').filter(':visible').first().type(`{downarrow}`);

    // grabs the 2nd element because the index is 1
    cy.get('li').filter(':visible').eq(1).should('have.focus');

    cy.get('li').filter(':visible').eq(1).type(`{uparrow}`);

    cy.get('li').filter(':visible').first().should('have.focus');
  });
});
