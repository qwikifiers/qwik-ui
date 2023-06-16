import { component$ } from '@builder.io/qwik';
import { Tooltip } from './tooltip';

const TooltipComponent = component$(() => {
  return <Tooltip content="tooltip message">Please hover me</Tooltip>;
});

describe('Tooltip', () => {
  it('INIT', () => {
    cy.mount(<TooltipComponent />);

    cy.checkA11yForComponent();
  });
  it('should render the component', () => {
    cy.mount(<TooltipComponent />);

    cy.findByRole('tooltip').should('contain', 'tooltip message');
  });
});
