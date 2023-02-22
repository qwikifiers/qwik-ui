import { mount } from 'cypress-ct-qwik';

describe('button', () => {
  it('should be clickable', () => {
    // cy.pause();

    mount(<div>Hey</div>);

    cy.contains('hey').should('exist');
  });
});
