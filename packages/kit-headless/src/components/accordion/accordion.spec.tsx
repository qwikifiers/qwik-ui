import { component$ } from '@builder.io/qwik';
import {
  AccordionRoot,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from './index';

const ThreeDisclosureAccordion = component$(() => {
  return (
    <AccordionRoot class="accordion">
      <AccordionItem class="px-4 py-2 disabled:cursor-not-allowed disabled:text-gray-400 w-full hover:bg-slate-300 dark:hover:bg-gray-800 border-slate-200 dark:border-gray-600 border-[1px]">
        <AccordionTrigger>Item 1</AccordionTrigger>
        <AccordionContent>
          <p class="bg-slate-200 dark:bg-gray-900 p-4">
            I'm content inside of item 1!
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger>Item 2</AccordionTrigger>
        <AccordionContent>
          <p class="bg-slate-200 dark:bg-gray-900 p-4">
            I'm content inside of item 2!
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger>Item 3</AccordionTrigger>
        <AccordionContent>
          <p class="bg-slate-200 dark:bg-gray-900 p-4">
            I'm content inside of item 3!
          </p>
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  );
});

describe('Accordion', () => {
  it('INIT', () => {
    cy.mount(<ThreeDisclosureAccordion />);

    cy.checkA11yForComponent();
  });

  it(`GIVEN 3 accordion items
      WHEN clicking the middle one
      THEN the middle trigger should have aria expanded
    `, () => {
    cy.mount(<ThreeDisclosureAccordion />);

    cy.findByRole('button', { name: /Item 2/i })
      .click()
      .should('have.attr', 'aria-expanded', 'true');
  });

  it(`GIVEN 3 accordion items with the first one opened
      WHEN clicking the middle one
      THEN the content of the first item should close, and the middle should open.
    `, () => {
    cy.mount(<ThreeDisclosureAccordion />);

    cy.findByRole('button', { name: /Item 1/i })
      .click()
      .should('have.attr', 'aria-expanded', 'true');

    cy.findByRole('button', { name: /Item 2/i })
      .click()
      .should('have.attr', 'aria-expanded', 'true');

    cy.findByRole('button', { name: /Item 1/i }).should(
      'have.attr',
      'aria-expanded',
      'false'
    );
  });
});
