// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
import { addQwikLoader, mount } from 'cypress-ct-qwik';

addQwikLoader();

// Import commands.ts using ES2015 syntax:
import './commands';
import 'cypress-axe';
import 'axe-core';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      checkA11yForComponent: () => void;
    }
  }
}

Cypress.Commands.add('mount', mount);
Cypress.Commands.add('checkA11yForComponent', () => {
  cy.checkA11y('[data-cy-root]');
});

// Example use:
// cy.mount(MyComponent)
