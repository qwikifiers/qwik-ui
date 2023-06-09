import { component$ } from '@builder.io/qwik';
import { Popover } from './popover';
import { PopoverContent } from './popover-content';
import { PopoverTrigger } from './popover-trigger';

const PopoverComponent = component$(() => {
  return (
    <Popover>
      <PopoverContent>popover content</PopoverContent>
      <PopoverTrigger>trigger text</PopoverTrigger>
    </Popover>
  );
});

describe('Popover', () => {
  it('INIT', () => {
    cy.mount(<PopoverComponent />);

    cy.checkA11yForComponent();
  });

  it('should render the component', () => {
    cy.mount(<PopoverComponent />);

    cy.findByRole('button').should('contain', 'trigger text');
    cy.findByRole('dialog').should('not.have.class', 'open');
  });

  it('should open the popover on click', () => {
    cy.mount(<PopoverComponent />);

    cy.findByRole('button').click();

    cy.findByRole('dialog')
      .should('have.class', 'open')
      .should('contain', 'popover content');
  });
});
