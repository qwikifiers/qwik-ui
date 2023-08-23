import { component$ } from '@builder.io/qwik';
import { Popover, PopoverProps } from './popover';
import { PopoverContent } from './popover-content';
import { PopoverTrigger } from './popover-trigger';

const PopoverComponent = component$((props: PopoverProps) => {
  return (
    <Popover {...props}>
      <PopoverContent>popover content</PopoverContent>
      <PopoverTrigger {...props}>trigger text</PopoverTrigger>
    </Popover>
  );
});

describe('Popover', () => {
  function clickOnTrigger() {
    cy.findByRole('button').click();
  }

  function clickOutside() {
    cy.get('body').click('bottomRight');
  }

  function assertOpen() {
    cy.findByRole('dialog')
      .should('have.class', 'open')
      .should('not.have.class', 'close');
  }

  function assertClosed() {
    cy.findByRole('dialog').should('not.have.class', 'open');
  }

  function hoverOnTrigger() {
    cy.findByRole('button').trigger('mouseover');
  }

  it('INIT', () => {
    cy.mount(<PopoverComponent />);

    cy.checkA11yForComponent();
  });

  it('should render the component', () => {
    cy.mount(<PopoverComponent />);

    cy.findByRole('button').should('contain', 'trigger text');
    cy.findByRole('dialog').should('contain', 'popover content');
    assertClosed();
  });

  it('should render the component with content being open when isOpen is set to true', () => {
    cy.mount(<PopoverComponent isOpen />);

    assertOpen();
  });

  it('should open the content when clicking on trigger', () => {
    cy.mount(<PopoverComponent />);

    assertClosed();

    clickOnTrigger();

    assertOpen();
  });

  it('should close the content when clicking outside', () => {
    cy.mount(<PopoverComponent />);

    clickOnTrigger();

    assertOpen();

    clickOutside();

    assertClosed();
  });

  it('should not close the content when clicking outside and disabledClickOutside is set to true', () => {
    cy.mount(<PopoverComponent disableClickOutSide />);

    clickOnTrigger();

    assertOpen();

    clickOutside();

    assertOpen();
  });

  it('should open the content when hovering over trigger', () => {
    cy.mount(<PopoverComponent triggerEvent="mouseOver" />);

    assertClosed();

    hoverOnTrigger();

    assertOpen();
  });

  it('should close the content when hovering over trigger and exiting', () => {
    cy.mount(<PopoverComponent triggerEvent="mouseOver" />);

    hoverOnTrigger();

    assertOpen();

    clickOutside();

    assertClosed();
  });

  it('should set the arial label', () => {
    const label = 'hello';
    cy.mount(<PopoverComponent aria-label={label} />);
    cy.findByRole('button').should('have.attr', 'aria-label', label);
  });
});
