import { mount } from 'cypress-ct-qwik';
import { Accordion, AccordionItem } from './accordion';

describe('Accordion', () => {
  it('should render an Accordion', () => {
    mount(
      <Accordion>
        <AccordionItem label="Heading 1">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
            aliquid architecto delectus deleniti dolor
          </p>
        </AccordionItem>
        <AccordionItem label="Heading 2">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
            aliquid architecto delectus deleniti dolor
          </p>
        </AccordionItem>
      </Accordion>
    );

    // cy.injectAxe();

    cy.contains(/Heading 1/i).click();
    cy.get('.content').should('exist');
    cy.contains(/Heading 2/i).should('exist');

    // cy.checkA11y();
  });
});
