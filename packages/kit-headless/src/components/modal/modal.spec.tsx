import { component$, useSignal } from '@builder.io/qwik';
import { mount } from 'cypress-ct-qwik';
import { ModalContent } from './modal-content';
import { ModalFooter } from './modal-footer';
import { ModalHeader } from './modal-header';
import { ModalRoot } from './modal-root';

/**
 * SUT - System under test
 * Reference: https://en.wikipedia.org/wiki/System_under_test
 */
const Sut = component$(() => {
  const openSig = useSignal(false);
  return (
    <>
      <button onClick$={() => (openSig.value = true)}>Open Dialog</button>

      <ModalRoot show={openSig}>
        <ModalHeader>
          <h2>Hello 👋</h2>
        </ModalHeader>
        <ModalContent>I am a simple Modal</ModalContent>
        <ModalFooter>
          <button
            data-test="dialog-close-button"
            onClick$={() => (openSig.value = false)}
          >
            Close Dialog
          </button>
        </ModalFooter>
      </ModalRoot>
    </>
  );
});

describe('Modal', () => {
  it('renders an opened Modal', () => {
    mount(<Sut />);

    cy.get('button')
      .contains(/Open Modal/i)
      .click();

    cy.get('[data-test=modal-header]').should('be.visible').should('contain', 'Hello 👋');
  });

  it('closes on button-click', () => {
    mount(<Sut />);

    cy.get('button')
      .contains(/Open Modal/i)
      .click();

    cy.get('[data-test=modal-close-button]').click();

    cy.get('dialog').should('not.be.visible');
  });

  it('closes on backdrop-click', () => {
    mount(<Sut />);

    cy.get('button')
      .contains(/Open Modal/i)
      .click();

    cy.get('body').click('top');

    cy.get('dialog').should('not.be.visible');
  });

  it('does not show if Modal is closed', () => {
    mount(<Sut />);

    cy.get('dialog').should('not.be.visible');
  });
});
