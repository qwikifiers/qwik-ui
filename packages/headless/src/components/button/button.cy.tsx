import { mount } from 'cypress-ct-qwik';
import { Button } from './button';

describe('button', () => {
  it('should be clickable', () => {
    // cy.pause();

    mount(<Button>hellobtn</Button>);

    cy.contains('hellobtn').should('exist');
  });
});
