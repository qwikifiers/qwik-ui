import { HSeparator } from './separator';

describe('Critical Functionality', () => {
  it('INIT', () => {
    cy.mount(<HSeparator />);

    cy.checkA11yForComponent();
  });

  it('GIVEN no orientation prop THEN aria-orientation is set unset', () => {
    cy.mount(<HSeparator />);

    cy.findByRole('separator').should('not.have.attr', 'aria-orientation');
  });

  it("GIVEN orientation prop 'horizontal' THEN aria-orientation is unset", () => {
    cy.mount(<HSeparator orientation="horizontal" />);

    cy.findByRole('separator').should('not.have.attr', 'aria-orientation');
  });

  it("GIVEN orientation prop 'vertical' THEN aria-orientation is set to 'vertical'", () => {
    cy.mount(<HSeparator orientation="vertical" />);

    cy.findByRole('separator').should('have.attr', 'aria-orientation', 'vertical');
  });

  it("GIVEN no orientation prop THEN data-orientation is set to 'horizontal'", () => {
    cy.mount(<HSeparator />);

    cy.findByRole('separator').should('not.have.attr', 'aria-orientation');
  });

  it("GIVEN orientation prop 'horizontal' THEN data-orientation is set to 'horizontal'", () => {
    cy.mount(<HSeparator orientation="horizontal" />);

    cy.findByRole('separator').should('not.have.attr', 'aria-orientation');
  });

  it("GIVEN orientation prop 'vertical' THEN data-orientation is set to 'vertical'", () => {
    cy.mount(<HSeparator orientation="vertical" />);

    cy.findByRole('separator').should('have.attr', 'aria-orientation', 'vertical');
  });

  it("GIVEN decorative prop THEN role is set to 'none' AND aria-orientation is unset", () => {
    cy.mount(<HSeparator decorative />);

    cy.findByRole('none').should('not.have.attr', 'aria-orientation');
  });

  it('GIVEN invalid orientation prop THEN console.warn is called', () => {
    const consoleSpy = cy.spy(console, 'warn');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cy.mount(<HSeparator orientation={'invalid' as any} />);

    cy.wrap(consoleSpy).should('have.been.calledWithMatch', /Invalid prop 'orientation'/);
  });
});
