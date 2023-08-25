import { component$, useSignal } from '@builder.io/qwik';
import { mount } from 'cypress-ct-qwik';
import { Modal } from './modal';
import { ModalApi } from './types';
import { ModalHeader } from './modal-header';
import { ModalContent } from './modal-content';
import { ModalFooter } from './modal-footer';

/**
 * SUT - System under test
 * Reference: https://en.wikipedia.org/wiki/System_under_test
 */
const Sut = component$(() => {
  const modalApi = useSignal<ModalApi>();
  return (
    <>
      <button onClick$={() => modalApi.value?.open$()}>Open Dialog</button>

      <Modal api={modalApi}>
        <ModalHeader>
          <h2>Hello 👋</h2>
        </ModalHeader>
        <ModalContent>I am a simple Modal</ModalContent>
        <ModalFooter>
          <button
            data-test="dialog-close-button"
            onClick$={() => modalApi.value?.close$()}
          >
            Close Dialog
          </button>
        </ModalFooter>
      </Modal>
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
