import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Modal, ModalProps } from './modal';
import { ModalContent } from './modal-content';
import { ModalFooter } from './modal-footer';
import { ModalHeader } from './modal-header';

/**
 * SUT - System under test
 * Reference: https://en.wikipedia.org/wiki/System_under_test
 */
const Sut = component$((props?: ModalProps) => {
  const showSig = useSignal(false);

  useStyles$(`
    .modal.modal-opening {
      animation: zoomOut 0.75s forwards cubic-bezier(0.6, 0.6, 0, 1);
    }

    .modal.modal-closing {
      animation: zoomIn 0.45s forwards cubic-bezier(0.6, 0.6, 0, 1);
    }

    @keyframes zoomOut {
      from {
        opacity: 0;
        transform: scale(150%);
      }
      to {
        opacity: 1;
        transform: scale(100%);
      }
    }

    @keyframes zoomIn {
      from {
        opacity: 1;
        transform: translateY(0%);
      }
      to {
        opacity: 0;
        transform: translateY(-200%);
      }
    }
`);

  return (
    <>
      <button onClick$={() => (showSig.value = true)} data-test="modal-trigger">
        Open Modal
      </button>
      <Modal bind:show={showSig} {...props}>
        <ModalHeader>
          <h2 data-test="modal-header">Hello 👋</h2>
        </ModalHeader>
        <ModalContent>
          <input type="text" data-test="modal-input" />
        </ModalContent>
        <ModalFooter>
          <button onClick$={() => (showSig.value = false)} data-test="modal-close-button">
            Close Modal
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
});

const SutNoInteractions = component$(() => {
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
        <ModalContent>
          <span data-test="modal-content">I am a modal dialog.</span>
        </ModalContent>
      </Modal>
    </>
  );
});

describe('Modal', () => {
  it(`Given a Modal
      WHEN opening it
      THEN it passes a11y-Tests`, () => {
    cy.mount(<Sut />);

    cy.checkA11yForComponent();
  });

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

  it(`Given a Modal
      WHEN closing the Modal on backdrop-click is deactivated
      THEN it stays open, after the backdrop has been clicked`, () => {
    cy.mount(<Sut closeOnBackdropClick={false} />);

    cy.get('[data-test=modal-trigger]').click();

    cy.get('body').click('top');

    cy.get('dialog').should('be.visible');

    cy.realPress('Escape');

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

  it(`GIVEN a Modal with one input field & one button
      WHEN opening the Modal
      THEN it focuses the input field`, () => {
    cy.mount(<Sut />);

    cy.get('[data-test=modal-trigger]').click();

    cy.get('[data-test=modal-input]').should('be.focused');
  });

  it(`GIVEN a Modal with one input field & one button
      WHEN opening the Modal
      AND pressing TAB
      THEN it focuses the close button`, () => {
    cy.mount(<Sut />);

    cy.get('[data-test=modal-trigger]').click();

    cy.get('[data-test=modal-input]').should('be.focused');

    cy.realPress('Tab');

    cy.get('[data-test=modal-close-button]').should('be.focused');
  });

  it(`GIVEN a Modal with one input field & one button
      WHEN opening the Modal
      AND pressing TAB
      AND pressing TAB
      THEN it focuses the input field because the focus is trapped`, () => {
    cy.mount(<Sut />);

    cy.get('[data-test=modal-trigger]').click();

    cy.get('[data-test=modal-input]').should('be.focused');

    cy.realPress('Tab');

    cy.get('[data-test=modal-close-button]').should('be.focused');

    cy.realPress('Tab');

    cy.get('[data-test=modal-input]').should('be.focused');

    cy.realPress('Escape');

    cy.get('dialog').should('not.be.visible');
  });

  it(`GIVEN a Modal with no tappable elements
      WHEN opening the Modal
      THEN it works without focus trap`, () => {
    cy.mount(<SutNoInteractions />);

    cy.get('[data-test=modal-trigger]').click();

    cy.get('[data-test=modal-content]').should('be.visible');

    cy.realPress('Escape');

    cy.get('dialog').should('not.be.visible');
  });

  it(`GIVEN a animated Modal
           WHEN opening the Modal
           THEN it applies a CSS-Class allowing to animate the Modal-opening
           AND closing the Modal
           THEN it applies a CSS-Class allowing to animate the Modal-closing
           THEN it remove the CSS-Class`, () => {
    cy.mount(<Sut class="modal" />);

    cy.get('[data-test=modal-trigger]').click();

    cy.get('dialog').should('have.class', 'modal-opening');
    cy.get('[data-test=modal-header]').should('be.visible');

    cy.realPress('Escape');

    cy.get('dialog').should('have.class', 'modal-closing');
    cy.get('dialog').should('not.be.visible');
    cy.get('dialog').should('not.have.class', 'modal-closing');
  });
});
