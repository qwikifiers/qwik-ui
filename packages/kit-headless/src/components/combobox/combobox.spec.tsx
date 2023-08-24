import { component$, useSignal } from '@builder.io/qwik';
import {
  Combobox,
  ComboboxLabel,
  ComboboxTrigger,
  ComboboxInput,
  ComboboxControl,
  ComboboxListbox,
  ComboboxOption
} from './index';

import TestData from './test-data';

type RegularComboboxProps = {
  defaultValue?: string;
  autoFocus?: boolean;
};

const RegularCombobox = component$(
  ({ defaultValue, autoFocus }: RegularComboboxProps) => {
    const fruits = TestData();
    const fruitsSig = useSignal(TestData());
    return (
      <>
        <button
          onClick$={() => {
            fruitsSig.value = ['testy', 'testy2', 'testy3'];
          }}
        >
          Testy testy
        </button>
        <Combobox defaultValue={defaultValue} style="width: fit-content">
          <ComboboxLabel>Label</ComboboxLabel>
          <ComboboxControl>
            <ComboboxInput autoFocus={autoFocus} placeholder="random placeholder" />
            <ComboboxTrigger data-testid="trigger">
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
            </ComboboxTrigger>
          </ComboboxControl>
          <ComboboxListbox class="listboxStyle">
            {fruitsSig.value.map((fruit) => (
              <ComboboxOption optionValue={fruit} key={fruit}>
                {fruit}
              </ComboboxOption>
            ))}
          </ComboboxListbox>
        </Combobox>
      </>
    );
  }
);

describe('Gang gang', () => {
  it(`GIVEN an Combobox component
      WHEN there is no default value,
      THEN it should display without a default value
  `, () => {
    cy.mount(<RegularCombobox />);

    cy.get('input').should('have.value', '');
  });

  it(`GIVEN an Combobox component
      WHEN there is a default value,
      THEN it should display the default value within the input
  `, () => {
    cy.mount(<RegularCombobox defaultValue="hi there!" />);

    cy.get('input').should('have.value', 'hi there!');
  });

  it(`GIVEN an Combobox component
      WHEN there is a default value and it exactly matches an option
      THEN it should display the default value within the input AND the listbox should be closed.
  `, () => {
    cy.mount(<RegularCombobox defaultValue="apple" />);

    cy.get('input').should('have.value', 'apple');

    cy.findByRole('listbox').should('not.exist');
  });

  it.only(`GIVEN an Combobox component
      WHEN there is a default value and it doesn't exactly match an option
      THEN it should open the listbox
  `, () => {
    cy.mount(<RegularCombobox autoFocus={true} defaultValue="appl" />);

    cy.get('input').should('have.value', 'appl');

    cy.findByRole('listbox').should('exist');
  });

  // it(`GIVEN an Combobox component
  //     WHEN there is a placeholder and the input is empty or undefined
  //     THEN it should display the default value within the input
  // `, () => {
  //   cy.mount(<RegularCombobox />);

  //   cy.get('input').should('have.value', '');
  // });
});

describe('Critical Functionality', () => {
  it('INIT', () => {
    cy.mount(<RegularCombobox />);

    cy.checkA11yForComponent();
  });

  it(`GIVEN an Combobox component with a trigger
      WHEN the trigger is clicked,
      THEN the listbox should open`, () => {
    cy.mount(<RegularCombobox />);

    cy.get('button').click();

    cy.findByRole('listbox').should('be.visible');
  });

  it(`GIVEN an Combobox component with a trigger
      WHEN the trigger is clicked
      THEN the trigger should have aria-expanded set to true
  `, () => {
    cy.mount(<RegularCombobox />);

    cy.get('button').click().should('have.attr', 'aria-expanded', 'true');
  });

  it(`GIVEN an Combobox component with an open listbox and trigger
      WHEN the trigger is clicked,
      THEN the listbox should close`, () => {
    cy.mount(<RegularCombobox />);

    cy.get('button').click();

    cy.findByRole('listbox').should('exist');

    cy.get('button').click();

    cy.findByRole('listbox').should('not.exist');
  });

  it(`GIVEN an Combobox component with an open listbox and trigger
      WHEN the trigger is clicked,
      THEN the trigger should have aria-expanded set to false`, () => {
    cy.mount(<RegularCombobox />);

    cy.get('button').click().click().should('have.attr', 'aria-expanded', 'false');
  });

  it(`GIVEN an Combobox component with a listbox and an input
      WHEN a value is entered into the input field,
      THEN the listbox should open.`, () => {
    cy.mount(<RegularCombobox />);

    cy.get('input').type(`Ap`);

    cy.findByRole('listbox').should('be.visible');
  });

  it(`GIVEN an Combobox component with a listbox and an input
      WHEN a value is entered into the input field, and the 1st option visible is selected.
      THEN the 1st visible value should populate the input field.`, () => {
    cy.mount(<RegularCombobox />);

    cy.get('input').type(`Ap`);

    cy.findByRole('listbox').should('be.visible');

    cy.get('li').first().click();

    cy.get('input').should('have.value', 'Apple');
  });

  it(`GIVEN an Combobox component with an open listbox and an input
      WHEN a value is selected from the listbox,
      THEN the listbox should close.`, () => {
    cy.mount(<RegularCombobox />);

    cy.get('input').type(`Ap`);

    cy.findByRole('listbox').should('be.visible');

    cy.get('li').first().click();

    cy.findByRole('listbox').should('not.exist');
  });

  //   it(`GIVEN an Combobox component with an open listbox and something else in the DOM
  //     WHEN the user clicks outside of the Combobox component
  //     THEN the listbox should close.`, () => {
  //     cy.mount(
  //       <>
  //         <RegularCombobox />
  //         <button>Random Element</button>
  //       </>
  //     );

  //     cy.get('button').first().focus().click();

  //     cy.findByRole('button', { name: 'Random Element' }).focus().click();

  //     cy.findByRole('listbox').should('not.exist');
  //   });
});

describe('Keyboard Navigation', () => {
  it(`GIVEN an Combobox component with an open listbox
      WHEN the user presses the 'Escape' key,
      THEN the listbox should close`, () => {
    cy.mount(<RegularCombobox />);

    cy.findByTestId('trigger').click();

    cy.findByRole('listbox');

    cy.get('body').type(`{esc}`);

    cy.findByRole('listbox').should('not.exist');
  });

  it(`GIVEN an Combobox component with a focused option inside a listbox,
      WHEN the user presses the 'Home' key,
      THEN the first option in the listbox should be focused.`, () => {
    cy.mount(<RegularCombobox />);

    cy.get('button').click();

    cy.findByRole('option', { name: 'Yuzu' }).focus().type(`{home}`);

    cy.get('li').first().should('have.focus');
  });

  it(`GIVEN an Combobox component with a focused option inside a listbox,
      WHEN the user presses the 'End' key,
      THEN the last option in the listbox should be focused.`, () => {
    cy.mount(<RegularCombobox />);

    cy.get('button').click();

    cy.findByRole('option', { name: 'Apricot' }).focus().type(`{end}`);

    cy.get('li').last().should('have.focus');
  });

  it(`GIVEN an Combobox component and selected text in an input field,
      WHEN the user presses the 'Delete' key,
      THEN the text within the input field should be removed.`, () => {
    cy.mount(<RegularCombobox />);

    cy.get('input')
      .type(`Here's some text!`)
      .type(`{selectall}`)
      .type(`{del}`)
      .should('have.value', '');
  });

  it(`GIVEN an Combobox component with an open listbox and multiple         filtered options
  WHEN the down arrow key is pressed,
  THEN focus should move to the next option in the list,
  `, () => {
    cy.mount(<RegularCombobox />);

    cy.get('input').type(`A`);

    cy.findByRole('listbox').should('be.visible');

    cy.get('input').type(`{downarrow}`);

    cy.findByRole('option', { name: 'Apple' }).focus().type(`{downarrow}`);

    // grabs the 2nd element because the index is 1
    cy.get('li').filter(':visible').eq(1).should('have.focus');
  });

  it(`GIVEN an Combobox component with an open listbox and multiple         filtered options
  WHEN the up arrow key is pressed,
  THEN focus should move back to the previous option in the list.`, () => {
    cy.mount(<RegularCombobox />);

    cy.get('input').type(`Ba`);

    cy.findByRole('listbox');

    cy.findByRole('option', { name: 'Jabuticaba' }).focus().type(`{uparrow}`);

    cy.get('li').filter(':visible').first().should('have.focus');
  });

  it(`GIVEN an Combobox component with an open listbox and multiple         filtered options
  WHEN the first option is in focus and the up arrow key is pressed,
  THEN focus should move to the last option in the list.`, () => {
    cy.mount(<RegularCombobox />);

    cy.get('input').type(`A`);

    cy.findByRole('listbox');

    cy.findByRole('option', { name: 'Apple' }).focus().type(`{uparrow}`);

    cy.get('li').filter(':visible').last().should('have.focus');
  });

  it(`GIVEN an Combobox component with an open listbox and multiple         filtered options
  WHEN the last option is in focus and the down arrow key is pressed,
  THEN focus should move to the first option in the list.`, () => {
    cy.mount(<RegularCombobox />);

    cy.get('input').type(`A`);

    cy.findByRole('listbox');

    cy.findByRole('option', { name: 'Tamarind' }).focus().type(`{downarrow}`);

    cy.get('li').filter(':visible').first().should('have.focus');
  });

  it(`GIVEN an Combobox component with an open listbox and multiple         filtered options
  WHEN the down arrow key is pressed,
  THEN the 1st filtered option in the listbox should receive focus.`, () => {
    cy.mount(<RegularCombobox />);

    cy.get('input').type(`Ba`);

    cy.findByRole('listbox').should('be.visible');

    cy.get('input').type(`{downarrow}`);

    cy.get('li').filter(':visible').first().should('have.focus');
  });

  it(`GIVEN an Combobox component with an open listbox and an option is in focus,
  WHEN the enter key is pressed,
  THEN the focused option should be selected and the listbox should close.`, () => {
    cy.mount(<RegularCombobox />);

    cy.get('button').click();

    cy.findByRole('listbox').should('be.visible');

    cy.findByRole('option', { name: 'Guava' }).focus().type(`{enter}`);

    cy.get('input').should('have.value', 'Guava');

    cy.findByRole('listbox').should('not.exist');
  });
});

const DisabledCombobox = component$(() => {
  const fruits = TestData();

  return (
    <>
      <Combobox style="width: fit-content">
        <ComboboxLabel>Label</ComboboxLabel>
        <ComboboxControl>
          <ComboboxInput />
          <ComboboxTrigger>
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
          </ComboboxTrigger>
        </ComboboxControl>
        <ComboboxListbox class="listboxStyle">
          <ComboboxOption optionValue="I'm the first option!">
            I'm the first option!
          </ComboboxOption>
          <ComboboxOption disabled optionValue="I'm disabled!">
            I'm disabled!
          </ComboboxOption>
          {fruits.map((fruit, index) => (
            <ComboboxOption optionValue={fruit} key={index}>
              {fruit}
            </ComboboxOption>
          ))}
        </ComboboxListbox>
      </Combobox>
    </>
  );
});

describe('Disabled', () => {
  it(`GIVEN an Combobox component with an open listbox and a disabled option, 
      WHEN the user clicks on the disabled option, 
      THEN the disabled option should not be selected.`, () => {
    cy.mount(<DisabledCombobox />);

    cy.get('button').click();

    cy.findByRole('option', { name: `I'm disabled!` }).click();

    cy.get('input').should('have.value', '');
  });

  // it(`GIVEN an Combobox component with an open listbox and a disabled option,
  //     WHEN the user clicks on the disabled option,
  //     THEN the listbox should not close`, () => {
  //   cy.mount(<DisabledCombobox />);

  //   cy.get('button').click();

  //   cy.findByRole('option', { name: `I'm disabled!` }).click();

  //   cy.get('listbox').should('exist');
  // });
});
