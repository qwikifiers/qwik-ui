import { HPagination } from './pagination';
import { component$, useSignal } from '@builder.io/qwik';

/**
 * SUT - System under test
 * Reference: https://en.wikipedia.org/wiki/System_under_test
 */
const Sut = component$(() => {
  const selectedPage = useSignal(1);
  const totalPages = useSignal(10);

  return (
    <>
      hello pagination
      <HPagination
        selectedPage={selectedPage.value}
        totalPages={totalPages.value}
        onPageChange$={(page) => {
          selectedPage.value = page;
        }}
        class="flex gap-3"
      />
    </>
  );
});

describe('Pagination', () => {
  it(`Given a Pagination
      WHEN opening it
      THEN it passes a11y-Tests`, () => {
    cy.mount(<Sut />);

    cy.checkA11yForComponent();
  });

  it(`Given a Pagination
      WHEN opening it 
      THEN it displays the correct amount of items
    `, () => {
    cy.mount(<Sut />);
    testItems(['1', '2', '3', '4', '...', '10']);
  });

  it(`Given a Pagination
      WHEN opening it 
      AND clicking each item
      THEN it does display the correct amount of items
      AND the selected item is disabled
    `, () => {
    cy.mount(<Sut />);

    const tests: [number, (number | string)[]][] = [
      // avoid the first element because already selected
      // [1, [1, 2, 3, 4, '...', 10]],
      [2, [1, 2, 3, 4, '...', 10]],
      [3, [1, 2, 3, 4, '...', 10]],
      [4, [1, '...', 3, 4, 5, '...', 10]],
      [5, [1, '...', 4, 5, 6, '...', 10]],
      [6, [1, '...', 5, 6, 7, '...', 10]],
      [7, [1, '...', 6, 7, 8, '...', 10]],
      [8, [1, '...', 7, 8, 9, 10]],
      [9, [1, '...', 7, 8, 9, 10]],
      [10, [1, '...', 7, 8, 9, 10]],
    ];

    tests.forEach(([selectedPage, expectedResult]) => {
      // click and item to change page
      cy.contains(selectedPage).click();

      // element is disabled
      cy.contains(selectedPage).should('be.disabled');

      // pagination contains the expected items
      testItems(expectedResult);
    });
  });

  it(`Given a Pagination
      WHEN opening it 
      AND first button is selected
      THEN the "previous" button is disabled
    `, () => {
    cy.mount(<Sut />);

    cy.get('[data-testid="pagination"]').contains('PREV').should('be.disabled');
  });

  it(`Given a Pagination
      WHEN opening it 
      AND last button is selected
      THEN the "next" button is disabled
    `, () => {
    cy.mount(<Sut />);
    cy.contains('10').click();
    cy.get('[data-testid="pagination"]').contains('NEXT').should('be.disabled');
  });

  it(`Given a Pagination
      WHEN it's disabled
      THEN all buttons are disabled
    `, () => {
    cy.mount(<HPagination selectedPage={5} totalPages={10} disabled />);

    cy.get('[data-testid="pagination"]')
      .find('button')
      .each(($el) => {
        cy.wrap($el).should('be.disabled');
      });
  });

  it(`Given a Pagination
      WHEN the 'customArrowTexts' is set
      THEN it should display the custom labels
    `, () => {
    cy.mount(
      <HPagination
        selectedPage={5}
        totalPages={10}
        customArrowTexts={{
          previous: 'LEFT',
          next: 'RIGHT',
        }}
      />,
    );

    cy.contains('LEFT').should('be.visible');
    cy.contains('RIGHT').should('be.visible');
  });

  it(`Given a Pagination
      WHEN 'hidePrevButton' and 'hideNextButton' are set   
      THEN 'prev' and 'next' buttons are not visible
    `, () => {
    cy.mount(
      <HPagination selectedPage={4} totalPages={10} hidePrevButton hideNextButton />,
    );

    cy.contains('LEFT').should('not.exist');
    cy.contains('RIGHT').should('not.exist');
  });

  it(`Given a Pagination
      WHEN 'prefix' and 'suffix' elements are passed as children  
      THEN they should be visible close to the labels
    `, () => {
    cy.mount(
      <HPagination selectedPage={4} totalPages={10}>
        <span q:slot="prefix"> 👈 </span>
        <span q:slot="suffix"> 👉 </span>
      </HPagination>,
    );

    cy.contains('PREV').children().first().contains('👈').should('be.visible');

    cy.contains('NEXT').children().last().contains('👉').should('be.visible');
  });
});

/*
 * Helper to check if items are visible in the paginator
 *
 * expectedItems  the pagination item that should be visible, i.e. [1, 2, 3, '...', 10]
 */
function testItems(expectedItems: (string | number)[]) {
  cy.get('[data-testid="pagination"]').within(() => {
    expectedItems.forEach((item) => {
      cy.contains(item).should('be.visible');
    });
  });
}
