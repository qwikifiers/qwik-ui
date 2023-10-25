import { component$ } from '@builder.io/qwik';
import { Popover } from './popover';

/**
 * SUT - System under test
 * Reference: https://en.wikipedia.org/wiki/System_under_test
 */
const Sut = component$(() => {
  return (
    <>
      <button
        // @ts-ignore
        popovertarget="example-id"
        data-test="popover-trigger"
        class="rounded-md border-2 border-slate-300 bg-slate-800 px-3 py-1 text-white"
      >
        Open Popover
      </button>
      <Popover
        id="example-id"
        data-test="popover-content"
        class="shadow-dark-medium rounded-md border-2 border-slate-300 bg-slate-800 px-3 py-1"
      >
        Hello 👋
      </Popover>
    </>
  );
});

describe('Popover', () => {
  it(`Given a Popover
      WHEN opening it with a button
      THEN it passes a11y-Tests`, () => {
    cy.mount(<Sut />);

    cy.checkA11yForComponent();
  });

  it(`GIVEN a Popover
      WHEN opening it
      AND being visible
      AND showing its heading
      AND hitting the Esc-Key on the keyboard
      THEN it is not visible any more`, () => {
    cy.mount(<Sut />);

    cy.get('[data-test=popover-trigger]').click();

    cy.get('[data-test=popover-content]')
      .should('be.visible')
      .should('contain', 'Hello 👋');

    cy.realPress('Escape');

    cy.get('[data-test=popover-content]').should('not.be.visible');
  });
});
