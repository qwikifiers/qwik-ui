import { component$ } from '@builder.io/qwik';
import { mount } from 'cypress-ct-qwik';
import { Modal } from './modal';
import { ModalClose } from './modal-close';
import { ModalContent } from './modal-content';
import { ModalFooter } from './modal-footer';
import { ModalHeader } from './modal-header';
import { ModalPortal } from './modal-portal';
import { ModalTrigger } from './modal-trigger';

/**
 * SUT - System under test
 * Reference: https://en.wikipedia.org/wiki/System_under_test
 */
const Sut = component$(() => {
  return (
    <Modal>
      <ModalTrigger>
        <button data-test="modal-trigger">Open Modal</button>
      </ModalTrigger>
      <ModalPortal>
        <ModalHeader>
          <h2 data-test="modal-header">Hello 👋</h2>
        </ModalHeader>
        <ModalContent>I am a simple Modal</ModalContent>
        <ModalFooter>
          <ModalClose>
            <button data-test="modal-close-button">Close Modal</button>
          </ModalClose>
        </ModalFooter>
      </ModalPortal>
    </Modal>
  );
});

describe('Modal', () => {
  it('renders an opened Modal', () => {
    mount(<Sut />);

    cy.get('[data-test=modal-trigger]').click();

    cy.get('[data-test=modal-header]').should('be.visible').should('contain', 'Hello 👋');
  });

  it('closes on button-click', () => {
    mount(<Sut />);

    cy.get('[data-test=modal-trigger]').click();

    cy.get('[data-test=modal-close-button]').click();

    cy.get('dialog').should('not.be.visible');
  });

  it('closes on backdrop-click', () => {
    mount(<Sut />);

    cy.get('[data-test=modal-trigger]').click();

    cy.get('body').click('top');

    cy.get('dialog').should('not.be.visible');
  });

  it('does not show if Modal is closed', () => {
    mount(<Sut />);

    cy.get('dialog').should('not.be.visible');
  });
});
