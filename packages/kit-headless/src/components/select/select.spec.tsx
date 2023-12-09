import { component$ } from '@builder.io/qwik';
import {
  SelectListBox,
  SelectMarker,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectOption,
  SelectLabel,
  SelectGroup,
} from '.';
import SelectTestData from './select-test-data';

const BasicSelect = component$(() => {
  const { groups, options } = SelectTestData();

  return (
    <>
      <SelectLabel id="basic-select">Fruits, Vegetables or Meat</SelectLabel>
      <SelectRoot data-testid="select-root">
        <SelectTrigger aria-labelledby="basic-select">
          <SelectValue placeholder="Select an item" />
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
        <SelectListBox aria-labelledby="basic-select">
          {groups.map((group) => (
            <>
              <SelectLabel id={group}>{group}</SelectLabel>
              <SelectGroup aria-labelledby={group}>
                {options.map(
                  (option, index) =>
                    option.type === group && (
                      <SelectOption optionValue={option.name} key={index}>
                        {option.name}
                      </SelectOption>
                    ),
                )}
              </SelectGroup>
            </>
          ))}
          <SelectOption optionValue="disabled" disabled>
            disabled
          </SelectOption>
        </SelectListBox>
      </SelectRoot>
    </>
  );
});

const SelectInForm = component$(() => {
  const { groups, options } = SelectTestData();

  return (
    <form>
      <SelectRoot required data-testid="select-root">
        <SelectTrigger aria-labelledby="basic-select">
          <SelectValue placeholder="Select an item" />
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
        <SelectListBox aria-labelledby="basic-select">
          {groups.map((group) => (
            <>
              <SelectLabel id={group}>{group}</SelectLabel>
              <SelectGroup aria-labelledby={group}>
                {options.map(
                  (option, index) =>
                    option.type === group && (
                      <SelectOption optionValue={option.name} key={index}>
                        {option.name}
                      </SelectOption>
                    ),
                )}
              </SelectGroup>
            </>
          ))}
          <SelectOption optionValue="disabled" disabled>
            disabled
          </SelectOption>
        </SelectListBox>
      </SelectRoot>
      <button type="submit">Submit</button>
    </form>
  );
});

describe('Select', () => {
  it('INIT', () => {
    cy.mount(<BasicSelect />);
    cy.checkA11yForComponent();
  });

  // it(`GIVEN a 'required' attribute and value is undefined,
  //     WHEN the button is clicked,
  //     THEN the submit event should fail with a native prompt autofocusing the Select.`, () => {
  //   cy.mount(<BasicSelect />);
  // });

  // it(`
  //   GIVEN a BasicSelect component
  //   WHEN the required attribute is added
  //   THEN there should be no visual regressions.
  // `, () => {
  //   cy.mount(<BasicSelect />).then(() => {
  //     cy.matchImage();
  //     cy.get('[data-testid="select-root"]').then(($select) => {
  //       $select.attr('required', 'true');
  //     });
  //     cy.matchImage();
  //   });
  // });

  it(`
     GIVEN a form with the native select, it is required, and a value is selected
     WHEN clicking on the form submission button
     THEN the form should submit
   `, () => {
    cy.mount(<SelectInForm />);
    // cy.get('button').last().click();
  });
});

describe('printable chars spec ', () => {
  it(`
   GIVEN the select-list-box is focused, and all keys pressed exist as the first char in any item on the list
   WHEN a key is pressed
   THEN focus on the first item on the list that has its first char be equal to the key pressed
   WHEN a new key is pressed
   THEN focus on the first item on the list, from absolute top to absulute bottom, that has its first char be equal to the key pressed
   `, () => {
    cy.mount(<BasicSelect />);
    // click() is repeated above to stop a cold-start bug
    cy.get('[data-testid="select-root"] > button').click();
    cy.get('[data-testid="select-root"] > button').click();
    cy.get('[data-testid="select-root"] > button').click();
    cy.focused().type('z');
    cy.focused().should('have.attr', 'data-option-value').and('eq', 'zucchini');
    // we must wait after each type bc spec (500ms before searching by char)
    cy.wait(1000).focused().type('a');
    cy.focused().should('have.attr', 'data-option-value').and('eq', 'apple');
    cy.wait(1000).focused().type('c');
    cy.focused().should('have.attr', 'data-option-value').and('eq', 'carrot');
    cy.wait(1000).focused().type('m');
    cy.focused().should('have.attr', 'data-option-value').and('eq', 'mango');
  });

  it(`
   GIVEN the select-list-box is focused, and all keys pressed exist as the first char in any item on the list
   WHEN the same key is pressed multiple times
   THEN focus on all instances where the first char of the item is equal to the key being pressed, starting from absolute top to absoulte bottom, and looping when the last item is met
   `, () => {
    cy.mount(<BasicSelect />);
    // click() is repeated above to stop a cold-start bug
    cy.get('[data-testid="select-root"] > button').click();
    cy.get('[data-testid="select-root"] > button').click();
    cy.get('[data-testid="select-root"] > button').click();
    // we must wait after each type bc spec (500ms before searching by char)
    cy.wait(1000).focused().type('c');
    cy.focused().should('have.attr', 'data-option-value').and('eq', 'carrot');
    cy.wait(1000).focused().type('c');
    cy.focused().should('have.attr', 'data-option-value').and('eq', 'cucumber');
    cy.wait(1000).focused().type('c');
    cy.focused().should('have.attr', 'data-option-value').and('eq', 'chicken');
    cy.wait(1000).focused().type('c');
    cy.focused().should('have.attr', 'data-option-value').and('eq', 'carrot');
  });

  it(`
   GIVEN the select-list-box is focused, all the strg typed exist as items in the list
   WHEN the strg is typed
   THEN focus on the first instance
   `, () => {
    cy.mount(<BasicSelect />);
    // click() is repeated above to stop a cold-start bug
    cy.get('[data-testid="select-root"] > button').click();
    cy.get('[data-testid="select-root"] > button').click();
    cy.get('[data-testid="select-root"] > button').click();
    // we must wait after each type bc spec
    cy.focused().type('bac');
    cy.focused().should('have.attr', 'data-option-value').and('eq', 'bacon');
    cy.wait(1000).focused().type('sa');
  });
});
