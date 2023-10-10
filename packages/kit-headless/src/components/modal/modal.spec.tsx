import { component$, useSignal } from '@builder.io/qwik';
import { Modal } from './modal';
import { ModalContent } from './modal-content';
import { ModalFooter } from './modal-footer';
import { ModalHeader } from './modal-header';

/**
 * SUT - System under test
 * Reference: https://en.wikipedia.org/wiki/System_under_test
 */
const Sut = component$(() => {
  const showSig = useSignal(false);
  return (
    <>
      <button onClick$={() => (showSig.value = true)} data-test="modal-trigger">
        Open Modal
      </button>
      <Modal bind:show={showSig}>
        <ModalHeader>
          <h2 data-test="modal-header">Hello 👋</h2>
        </ModalHeader>
        <ModalContent>I am a simple Modal</ModalContent>
        <ModalFooter>
          <button onClick$={() => (showSig.value = false)} data-test="modal-close-button">
            Close Modal
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
});

describe('Modal', () => {
  it(`GIVEN a Modal
      WHEN opening it
      AND being visible
      AND showing its heading
      AND clicking the close button
      THEN it is not visible any more`, () => {
    cy.mount(<Sut />);

    cy.get('[data-test=modal-trigger]').click();

    cy.get('[data-test=modal-header]').should('be.visible').should('contain', 'Hello 👋');

    cy.get('[data-test=modal-close-button]').click();

    cy.get('dialog').should('not.be.visible');
  });

  it(`GIVEN a Modal
      WHEN opening it
      AND clicking the backdrop
      THEN it is not visible any more`, () => {
    cy.mount(<Sut />);

    cy.get('[data-test=modal-trigger]').click();

    cy.get('body').click('top');

    cy.get('dialog').should('not.be.visible');
  });

  it(`GIVEN a Modal
      WHEN opening it
      AND hitting ESC on the keyboard
      THEN it is not visible any more`, () => {
    cy.mount(<Sut />);

    cy.get('[data-test=modal-trigger]').click();

    cy.realPress('Escape');

    cy.get('dialog').should('not.be.visible');
  });

  it(`GIVEN a Modal
      WHEN not opened
      THEN it is not visible`, () => {
    cy.mount(<Sut />);

    cy.get('dialog').should('not.be.visible');
  });
});
