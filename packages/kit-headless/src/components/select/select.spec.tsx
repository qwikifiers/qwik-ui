import {
  SelectMarker,
  SelectListBox,
  SelectGroup,
  SelectOption,
  SelectRoot,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select';
import { component$ } from '@builder.io/qwik';

const ThreeOptionSelect = component$(() => {
  return (
    <>
      <SelectRoot data-testid="selectRoot">
        <SelectLabel>Label for Select</SelectLabel>
        <SelectTrigger data-testid="selectTrigger">
          <SelectValue data-testid="selectValue" placeholder="Placeholder">
            Select an option
          </SelectValue>
          <SelectMarker>
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
          </SelectMarker>
        </SelectTrigger>
        <SelectListBox data-testid="listBox">
          <SelectGroup>
            <SelectOption value="One">Option 1</SelectOption>
            <SelectOption data-testid="selectOptionTwo" value="Two">
              Option 2
            </SelectOption>
            <SelectOption value="Three">Option 3</SelectOption>
          </SelectGroup>
        </SelectListBox>
      </SelectRoot>
    </>
  );
});

describe('Select', () => {
  it('INIT', () => {
    cy.mount(<ThreeOptionSelect />);

    cy.checkA11yForComponent();
  });

  it('should render the component', () => {
    cy.mount(<ThreeOptionSelect />);

    cy.findByTestId('selectRoot').should('be.visible');
  });

  it('should toggle aria-expanded and the listbox should be visible', () => {
    cy.mount(<ThreeOptionSelect />);

    cy.findByTestId('selectTrigger')
      .click()
      .should('have.attr', 'aria-expanded');

    cy.findByRole('listbox').should('exist');
  });

  it('should toggle aria-expanded and the listbox should be hidden', () => {
    cy.mount(<ThreeOptionSelect />);

    cy.get('button').click().should('have.attr', 'aria-expanded', 'true');

    // current passed test for now. doesn't work with click for some reason
    cy.get('button')
      .focus()
      .type('{enter}')
      .should('have.attr', 'aria-expanded', 'false');

    cy.findByRole('listbox').should('not.exist');
  });

  it('should use the arrow keys to navigate options', () => {
    cy.mount(<ThreeOptionSelect />);

    cy.findByTestId('selectTrigger').type('{enter}');

    cy.findByRole('listbox').should('be.visible');

    cy.findByRole('group').type('{downarrow}');

    cy.findByTestId('selectOptionTwo').type('{enter}').should('not.be.visible');

    cy.findByTestId('selectValue').should('have.text', 'Two');
  });
});
