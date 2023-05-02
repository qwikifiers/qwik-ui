import { mount } from 'cypress-ct-qwik';
import * as Dialog from './dialog';

describe('Dialog', () => {
  it('renders an opened Dialog', () => {
    mount(
      <Dialog.Root open={true}>
        <h2>Hello World!</h2>
      </Dialog.Root>
    );

    cy.get('dialog').should('contain', 'Hello World');
  });

  it('does not show if Dialog is closed', () => {
    mount(
      <Dialog.Root open={false}>
        <h2>Hello World!</h2>
      </Dialog.Root>
    );

    cy.get('dialog').should('not.be.visible');
  });
});
