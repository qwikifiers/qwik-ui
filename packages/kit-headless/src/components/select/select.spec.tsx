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
                      <SelectOption optionValue={option.name} key={index} />
                    )
                )}
              </SelectGroup>
            </>
          ))}
          <SelectOption optionValue="disabled" disabled />
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
                      <SelectOption optionValue={option.name} key={index} />
                    )
                )}
              </SelectGroup>
            </>
          ))}
          <SelectOption optionValue="disabled" disabled />
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

  it(`
    GIVEN a BasicSelect component
    WHEN the required attribute is added
    THEN there should be no visual regressions.
  `, () => {
    cy.mount(<BasicSelect />).then(() => {
      cy.matchImage();
      cy.get('[data-testid="select-root"]').then(($select) => {
        $select.attr('required', 'true');
      });
      cy.matchImage();
    });
  });

  it(`
    GIVEN a form with the native select, it is required, and a value is selected
    WHEN clicking on the form submission button
    THEN the form should submit
  `, () => {
    cy.mount(<SelectInForm />);
    cy.get('button').last().click();
  });
});
