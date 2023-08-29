import { component$, useSignal, $ } from '@builder.io/qwik';
import {
  Combobox,
  ComboboxLabel,
  ComboboxTrigger,
  ComboboxInput,
  ComboboxControl,
  ComboboxListbox,
  ComboboxOption,
  ComboboxPortal
} from './index';

import TestData from './test-data';
import { QwikUIProvider } from '../qwik-ui-provider';
import './combobox-test.css';

type StringCombobox = {
  defaultLabel?: string;
};

const StringCombobox = component$(({ defaultLabel, ...props }: StringCombobox) => {
  const fruits = TestData();

  const fruitsSig = useSignal(fruits);

  const onInputChange$ = $((value: string) => {
    fruitsSig.value = fruits.filter((option) => {
      return option.toLowerCase().includes(value.toLowerCase());
    });
  });

  return (
    <>
      <QwikUIProvider>
        <Combobox
          options={fruitsSig}
          defaultLabel={defaultLabel && defaultLabel}
          onInputChange$={onInputChange$}
          optionComponent$={$((option: string, index: number) => (
            <ComboboxOption class="option" index={index} option={option}>
              {option}
            </ComboboxOption>
          ))}
          {...props}
        >
          <ComboboxLabel>Fruits</ComboboxLabel>
          <ComboboxControl style={{ display: 'flex' }}>
            <ComboboxInput />
            <ComboboxTrigger data-testid="trigger">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20px"
                style="stroke: black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </ComboboxTrigger>
          </ComboboxControl>
          <ComboboxPortal>
            <ComboboxListbox style={{ width: 'fit-content' }} />
          </ComboboxPortal>
        </Combobox>
      </QwikUIProvider>
    </>
  );
});

describe('Critical Functionality', () => {
  it('INIT', () => {
    cy.mount(<StringCombobox />);

    cy.checkA11yForComponent();
  });

  it(`GIVEN a Combobox component with a trigger
      WHEN the trigger is clicked,
      THEN the listbox should open`, () => {
    cy.mount(<StringCombobox />);

    cy.get('button').click();

    cy.findByRole('listbox').should('be.visible');
  });

  it(`GIVEN a Combobox component with a trigger
      WHEN the trigger is clicked
      THEN the trigger should have aria-expanded set to true
  `, () => {
    cy.mount(<StringCombobox />);

    cy.get('button').click().should('have.attr', 'aria-expanded', 'true');
  });

  it(`GIVEN a Combobox component with an open listbox and trigger
      WHEN the trigger is clicked,
      THEN the listbox should close`, () => {
    cy.mount(<StringCombobox />);

    cy.get('button').click();

    cy.findByRole('listbox').should('exist');

    cy.get('button').click();

    cy.findByRole('listbox').should('not.exist');
  });

  it(`GIVEN a Combobox component with an open listbox and trigger
      WHEN the trigger is clicked,
      THEN the trigger should have aria-expanded set to false`, () => {
    cy.mount(<StringCombobox />);

    cy.get('button').click().click().should('have.attr', 'aria-expanded', 'false');
  });

  it(`GIVEN a Combobox component with a listbox and an input
      WHEN a value is entered into the input field,
      THEN the listbox should open.`, () => {
    cy.mount(<StringCombobox />);

    cy.get('input').type(`Ap`);

    cy.findByRole('listbox').should('be.visible');
  });

  it(`GIVEN a Combobox component with a listbox and an input
      WHEN a value is entered into the input field, and the 1st option visible is selected.
      THEN the 1st visible value should populate the input field.`, () => {
    cy.mount(<StringCombobox />);

    cy.get('input').type(`Ap`);

    cy.findByRole('listbox').should('be.visible');

    cy.get('li').first().click();

    cy.get('input').should('have.value', 'Apple');
  });

  it(`GIVEN a Combobox component with an open listbox and an input
      WHEN a value is selected from the listbox,
      THEN the listbox should close.`, () => {
    cy.mount(<StringCombobox />);

    cy.get('input').type(`Ap`);

    cy.findByRole('listbox').should('be.visible');

    cy.get('li').first().click();

    cy.findByRole('listbox').should('not.exist');
  });

  it(`GIVEN a Combobox component with an open listbox
      WHEN the user clicks outside of the Combobox component
      THEN the listbox should close.`, () => {
    cy.mount(
      <>
        <StringCombobox />
        <button>Random Element</button>
      </>
    );

    cy.get('button').first().focus().click();

    cy.findByRole('listbox').should('be.visible');

    cy.findByRole('button', { name: 'Random Element' }).focus().click();

    cy.findByRole('listbox').should('not.exist');
  });

  it(`GIVEN a Combobox component with an open listbox
  WHEN the user hits the downarrow with the input focused
  THEN input should remain focused`, () => {
    cy.mount(<StringCombobox />);

    cy.get('input').type(`{downarrow}`).should('have.focus');
  });

  it(`GIVEN a Combobox component with a trigger
  WHEN the user clicks on the trigger
  THEN the input should remain focused`, () => {
    cy.mount(<StringCombobox />);

    cy.get('button').click();

    cy.get('input').should('have.focus');
  });
});

describe('Default Label', () => {
  it(`GIVEN a Combobox component
      WHEN there is no default label,
      THEN it should display without a default label
  `, () => {
    cy.mount(<StringCombobox />);

    cy.get('input').should('have.value', '');
  });

  it(`GIVEN a Combobox component
        WHEN there is a default label,
        THEN it should display the default label within the input
    `, () => {
    cy.mount(<StringCombobox defaultLabel="Cucumber" />);

    cy.get('input').should('have.value', 'Cucumber');
  });

  it(`GIVEN an Combobox component
        WHEN there is a default label and it exactly matches an option label
        THEN it should display the default label within the input AND the listbox should be closed.
    `, () => {
    cy.mount(<StringCombobox defaultLabel="Apple" />);

    cy.get('input').should('have.value', 'Apple');

    cy.findByRole('listbox').should('not.exist');
  });

  it(`GIVEN an Combobox component
        WHEN there is a default label that matches an option label, and the listbox is open
        THEN that option label should be highlighted
    `, () => {
    cy.mount(<StringCombobox defaultLabel="Jabuticaba" />);

    cy.get('input').should('have.value', 'Jabuticaba').type(`{downarrow}`);

    cy.findByRole('option', { name: 'Jabuticaba' }).should(
      'have.attr',
      'aria-selected',
      'true'
    );
  });
});

describe('Keyboard Navigation', () => {
  it(`GIVEN a Combobox component with an open listbox
      WHEN the user presses the 'Escape' key,
      THEN the listbox should close`, () => {
    cy.mount(<StringCombobox />);

    cy.findByTestId('trigger').click();

    cy.findByRole('listbox');

    cy.get('body').type(`{esc}`);

    cy.findByRole('listbox').should('not.exist');
  });

  it(`GIVEN a Combobox component with an input,
      WHEN the user hits the downarrow key twice, then the end key, and then the home key,
      THEN the first option in the listbox should be selected.`, () => {
    cy.mount(<StringCombobox />);

    cy.get('input').type(`{downarrow}{downarrow}{end}{home}`);

    cy.get('li').first().should('have.attr', 'aria-selected', 'true');
  });

  it(`GIVEN a Combobox component with a focused option inside a listbox,
      WHEN the user presses the 'End' key,
      THEN the last option in the listbox should be selected.`, () => {
    cy.mount(<StringCombobox />);

    cy.get('input').type(`{end}{downarrow}`);

    cy.get('li').last().should('have.attr', 'aria-selected', 'true');
  });

  it(`GIVEN a Combobox component and selected text in an input field,
      WHEN the user presses the 'Delete' key,
      THEN the text within the input field should be removed.`, () => {
    cy.mount(<StringCombobox />);

    cy.get('input')
      .type(`Here's some text!`)
      .type(`{selectall}`)
      .type(`{del}`)
      .should('have.value', '');
  });

  it(`GIVEN a Combobox component with an open listbox and multiple filtered options
      WHEN the down arrow key is pressed,
      THEN the focus should move to the next option in the list`, () => {
    cy.mount(<StringCombobox />);

    cy.get('input').type(`A`);

    cy.findByRole('listbox').should('be.visible');

    cy.get('input').type(`{downarrow}{downarrow}`);

    // grabs the 2nd element because the index is 1
    cy.get('li').filter(':visible').eq(1).should('have.attr', 'aria-selected', 'true');
  });

  it(`GIVEN a Combobox component with an open listbox and multiple filtered options
  WHEN the up arrow key is pressed,
  THEN focus should move back to the previous option in the list.`, () => {
    cy.mount(<StringCombobox />);

    cy.get('input').type(`Ba{downarrow}{downarrow}{uparrow}`);

    cy.findByRole('listbox');

    cy.get('li').filter(':visible').first().should('have.attr', 'aria-selected', 'true');
  });

  it(`GIVEN a Combobox component with an open listbox and multiple filtered options
  WHEN the first filtered option is selected and the up arrow key is pressed,
  THEN focus should move to the last option in the list.`, () => {
    cy.mount(<StringCombobox />);

    cy.get('input').type(`Ap{downarrow}{uparrow}`);

    cy.findByRole('listbox');

    cy.get('li').filter(':visible').last().should('have.attr', 'aria-selected', 'true');
  });

  it(`GIVEN a Combobox component with an open listbox and multiple filtered options
  WHEN the last option is in focus and the down arrow key is pressed,
  THEN focus should move to the first option in the list.`, () => {
    cy.mount(<StringCombobox />);

    cy.get('input').type(`Ap{downarrow}{uparrow}{downarrow}`);

    cy.findByRole('listbox');

    cy.get('li').filter(':visible').first().should('have.attr', 'aria-selected', 'true');
  });

  it(`GIVEN a Combobox component with an open listbox and multiple filtered options
  WHEN the down arrow key is pressed,
  THEN the 1st filtered option in the listbox should be selected.`, () => {
    cy.mount(<StringCombobox />);

    cy.get('input').type(`Ba`);

    cy.findByRole('listbox').should('be.visible');

    cy.get('input').type(`{downarrow}`);

    cy.get('li').filter(':visible').first().should('have.attr', 'aria-selected', 'true');
  });

  it(`GIVEN a Combobox component with an open listbox and an option is in focus,
  WHEN the enter key is pressed,
  THEN the focused option should be selected and the listbox should close.`, () => {
    cy.mount(<StringCombobox />);

    cy.get('input').type(`Ba{downarrow}{downarrow}{downarrow}`);

    cy.findByRole('listbox').should('be.visible');

    cy.get('input').type(`{enter}`);

    cy.findByRole('listbox').should('not.exist');
  });
});

const DisabledCombobox = component$(() => {
  type Trainer = {
    testValue: string;
    testLabel: string;
    disabled: boolean;
  };

  const objectExample: Array<Trainer> = [
    { testValue: 'alice', testLabel: 'Alice', disabled: true },
    { testValue: 'joana', testLabel: 'Joana', disabled: true },
    { testValue: 'malcolm', testLabel: 'Malcolm', disabled: false },
    { testValue: 'zack', testLabel: 'Zack', disabled: true },
    { testValue: 'brian', testLabel: 'Brian', disabled: false },
    { testValue: 'ryan', testLabel: 'Ryan', disabled: false },
    { testValue: 'joe', testLabel: 'Joe', disabled: false },
    { testValue: 'randy', testLabel: 'Randy', disabled: false },
    { testValue: 'david', testLabel: 'David', disabled: true },
    { testValue: 'joseph', testLabel: 'Joseph', disabled: true },
    { testValue: 'mark', testLabel: 'Mark', disabled: false },
    { testValue: 'sidney', testLabel: 'Sidney', disabled: true }
  ];

  const objectExampleSig = useSignal(objectExample);

  const onInputChange$ = $((value: string) => {
    objectExampleSig.value = objectExample.filter((option) => {
      return option.testLabel.toLowerCase().includes(value.toLowerCase());
    });
  });

  return (
    <>
      <QwikUIProvider>
        <Combobox
          options={objectExampleSig}
          onInputChange$={onInputChange$}
          optionLabelKey="testLabel"
          optionValue="testValue"
          optionDisabledKey="disabled"
          optionComponent$={$((option: Trainer, index: number) => (
            <ComboboxOption
              style={{ color: option.disabled ? 'gray' : '' }}
              class="option"
              index={index}
              option={option}
            >
              {option.testLabel}
            </ComboboxOption>
          ))}
        >
          <ComboboxLabel>Fruits</ComboboxLabel>
          <ComboboxControl style={{ display: 'flex' }}>
            <ComboboxInput />
            <ComboboxTrigger data-testid="trigger">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20px"
                style="stroke: black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </ComboboxTrigger>
          </ComboboxControl>
          <ComboboxPortal>
            <ComboboxListbox style={{ width: 'fit-content' }} />
          </ComboboxPortal>
        </Combobox>
      </QwikUIProvider>
    </>
  );
});

describe('Disabled & Object Combobox', () => {
  it(`GIVEN a Combobox component with an open listbox and a disabled option,
      WHEN the user clicks on a disabled option,
      THEN the disabled option should not be selected.`, () => {
    cy.mount(<DisabledCombobox />);

    cy.findByTestId('trigger').click();

    cy.findByRole('option', { name: `David` }).click();

    cy.get('input').should('have.value', '');
  });

  it(`GIVEN a Combobox component with an open listbox and a disabled option,
      WHEN the user clicks on a disabled option,
      THEN the listbox should remain open`, () => {
    cy.mount(<DisabledCombobox />);

    cy.findByTestId('trigger').click();

    cy.findByRole('option', { name: `David` }).click();

    cy.findByRole('listbox').should('be.visible');
  });

  it(`GIVEN a Combobox component with an open listbox and a disabled option,
      WHEN the user clicks on a disabled option,
      THEN the input should remain focused`, () => {
    cy.mount(<DisabledCombobox />);

    cy.findByTestId('trigger').click();

    cy.findByRole('option', { name: `David` }).click();

    cy.get('input').should('have.focus');
  });

  it(`GIVEN a Combobox component with an open listbox and disabled options,
      WHEN the user hits the downarrow with the input focused
      THEN the first enabled option should be selected`, () => {
    cy.mount(<DisabledCombobox />);

    cy.get('input').type(`{downarrow}`);

    cy.findByRole('option', { name: `Malcolm` }).should(
      'have.attr',
      'aria-selected',
      'true'
    );
  });

  it(`GIVEN a Combobox component with an open listbox and disabled options,
      WHEN the user hits the up arrow on the first enabled option
      THEN the last enabled option should be selected`, () => {
    cy.mount(<DisabledCombobox />);

    cy.get('input').type(`{downarrow}{uparrow}`);

    cy.findByRole('option', { name: `Mark` }).should(
      'have.attr',
      'aria-selected',
      'true'
    );
  });

  it(`GIVEN a Combobox component with an open listbox and disabled options,
      WHEN the user is on an option and pressed the Home key
      THEN the first enabled option should be selected`, () => {
    cy.mount(<DisabledCombobox />);

    cy.get('input').type(`{downarrow}{downarrow}{downarrow}`);

    cy.get('input').type(`{home}`);

    cy.findByRole('option', { name: `Malcolm` }).should(
      'have.attr',
      'aria-selected',
      'true'
    );
  });

  it(`GIVEN a Combobox component with an open listbox and disabled options,
      WHEN the user is on an option and pressed the End key
      THEN the first last enabled option should be selected`, () => {
    cy.mount(<DisabledCombobox />);

    cy.get('input').type(`{downarrow}{downarrow}`);

    cy.get('input').type(`{end}`);

    cy.findByRole('option', { name: `Mark` }).should(
      'have.attr',
      'aria-selected',
      'true'
    );
  });

  it(`GIVEN a Combobox component with an open listbox and disabled options,
      WHEN the user is on an option and pressed the down arrow key
      THEN the next enabled index should be selected skipping a disabled option`, () => {
    cy.mount(<DisabledCombobox />);

    // selects Malcolm
    cy.get('input').type(`{downarrow}`);

    cy.get('input').type(`{downarrow}`);

    cy.findByRole('option', { name: `Brian` }).should(
      'have.attr',
      'aria-selected',
      'true'
    );
  });

  it(`GIVEN a Combobox component with an open listbox and disabled options,
      WHEN the user is on an option and pressed the up arrow key
      THEN the previous enabled index should be selected skipping a disabled option`, () => {
    cy.mount(<DisabledCombobox />);

    // selects Malcolm
    cy.get('input').type(`{downarrow}`);

    cy.get('input').type(`{downarrow}`);

    cy.get('input').type(`{uparrow}`);

    cy.findByRole('option', { name: `Malcolm` }).should(
      'have.attr',
      'aria-selected',
      'true'
    );
  });

  it(`GIVEN a Combobox component with an open listbox and disabled options,
      WHEN the user is on an option and pressed the down arrow key
      THEN the next enabled index should be selected skipping multiple disabled options`, () => {
    cy.mount(<DisabledCombobox />);

    // selects Malcolm
    cy.get('input').type(`{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}`);

    cy.findByRole('option', { name: `Randy` }).should(
      'have.attr',
      'aria-selected',
      'true'
    );

    cy.get('input').type(`{downarrow}`);

    cy.findByRole('option', { name: `Mark` }).should(
      'have.attr',
      'aria-selected',
      'true'
    );
  });

  it(`GIVEN a Combobox component with an open listbox and disabled options,
      WHEN the user is on an option and pressed the up arrow key
      THEN the previous enabled index should be selected skipping multiple disabled options`, () => {
    cy.mount(<DisabledCombobox />);

    // selects Malcolm
    cy.get('input').type(`{downarrow}{downarrow}{downarrow}{downarrow}{downarrow}`);

    cy.findByRole('option', { name: `Randy` }).should(
      'have.attr',
      'aria-selected',
      'true'
    );

    cy.get('input').type(`{downarrow}`);

    cy.findByRole('option', { name: `Mark` }).should(
      'have.attr',
      'aria-selected',
      'true'
    );

    cy.get('input').type(`{uparrow}`);

    cy.findByRole('option', { name: `Randy` }).should(
      'have.attr',
      'aria-selected',
      'true'
    );
  });
});
