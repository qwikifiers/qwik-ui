import { component$, useSignal } from '@builder.io/qwik';
import { mount } from 'cypress-ct-qwik';
import * as Dialog from './public_api';

/**
 * SUT - System under test
 * Reference: https://en.wikipedia.org/wiki/System_under_test
 */
const Sut = component$(() => {
  const dialogRef = useSignal<Dialog.DialogRef>();
  return (
    <>
      <button onClick$={() => dialogRef.value?.open()}>Open Dialog</button>

      <Dialog.Root ref={dialogRef}>
        <Dialog.Header>
          <h2 data-test="dialog-header">Hello 👋</h2>
        </Dialog.Header>
        <Dialog.Content>I am a simple Dialog.</Dialog.Content>
        <Dialog.Footer>
          <button
            data-test="dialog-close-button"
            onClick$={() => dialogRef.value?.close()}
          >
            Close Dialog
          </button>
        </Dialog.Footer>
      </Dialog.Root>
    </>
  );
});

describe('Dialog', () => {
  it('renders an opened Dialog', () => {
    mount(<Sut />);

    cy.get('button')
      .contains(/Open Dialog/i)
      .click();

    cy.get('[data-test=dialog-header]')
      .should('be.visible')
      .should('contain', 'Hello 👋');
  });

  it('closes on button-click', () => {
    mount(<Sut />);

    cy.get('button')
      .contains(/Open Dialog/i)
      .click();

    cy.get('[data-test=dialog-close-button]').click();

    cy.get('dialog').should('not.be.visible');
  });

  it('closes on backdrop-click', () => {
    mount(<Sut />);

    cy.get('button')
      .contains(/Open Dialog/i)
      .click();

    cy.get('body').click('top');

    cy.get('dialog').should('not.be.visible');
  });

  it('does not show if Dialog is closed', () => {
    mount(<Sut />);

    cy.get('dialog').should('not.be.visible');
  });
});
