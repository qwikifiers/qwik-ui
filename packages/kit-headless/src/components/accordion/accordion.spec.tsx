import { component$, useStore } from '@builder.io/qwik';
import {
  AccordionRoot,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
  AccordionHeader
} from './index';

import './accordion-cypress.css';

interface AccordionProps {
  behavior?: 'single' | 'multi';
  collapsible?: boolean;
}

const ThreeItemAccordion = component$(
  ({ behavior, collapsible, ...props }: AccordionProps) => {
    return (
      <AccordionRoot behavior={behavior} collapsible={collapsible} {...props}>
        <AccordionItem>
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>
            <p>Content 1</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>
            <p>Content 2</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionTrigger>Trigger 3</AccordionTrigger>
          <AccordionContent>
            <p>Content 3</p>
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
    );
  }
);

describe('Critical Functionality', () => {
  it('INIT', () => {
    cy.mount(<ThreeItemAccordion />);

    cy.checkA11yForComponent();
  });

  it(`GIVEN 3 accordion items
      WHEN clicking the 2nd item's trigger
      THEN the 2nd trigger should have aria expanded set to true
    `, () => {
    cy.mount(<ThreeItemAccordion />);

    cy.findByRole('button', { name: /Trigger 2/i })
      .click()
      .should('have.attr', 'aria-expanded', 'true');
  });

  it(`GIVEN 3 accordion items
      WHEN clicking the 2nd item's trigger twice
      THEN the 2nd trigger should have aria expanded set to false
  `, () => {
    cy.mount(<ThreeItemAccordion />);

    cy.findByRole('button', { name: /Trigger 2/i })
      .click()
      .click()
      .should('have.attr', 'aria-expanded', 'false');
  });

  it(`GIVEN 3 accordion items
      WHEN clicking the 2nd item's trigger
      THEN render the 2nd item's content
  `, () => {
    cy.mount(<ThreeItemAccordion />);

    cy.findByRole('button', { name: /Trigger 2/i }).click();

    cy.findByRole('region').should('contain', 'Content 2');
  });

  it(`GIVEN 3 accordion items
      WHEN clicking the 2nd item's trigger twice
      THEN the 2nd item's content should be hidden.
  `, () => {
    cy.mount(<ThreeItemAccordion />);

    cy.findByRole('button', { name: /Trigger 2/i })
      .click()
      .click();

    cy.findByRole('region').should('not.exist');
  });
});

describe('Keyboard Navigation', () => {
  it(`GIVEN 3 accordion items and the 2nd item's trigger is focused
  WHEN the enter key is pressed
  THEN the content of the 2nd item should render
`, () => {
    cy.mount(<ThreeItemAccordion />);

    cy.findByRole('button', { name: /Trigger 2/i })
      .focus()
      .type(`{enter}`);

    cy.findAllByRole('region').should('contain', 'Content 2');
  });

  it(`GIVEN 3 accordion items and the 3rd item's trigger is focused
    WHEN the space key is pressed
    THEN the content of the 3rd item should render 
  `, () => {
    cy.mount(<ThreeItemAccordion />);

    cy.findByRole('button', { name: /Trigger 3/i })
      .focus()
      .type(' ');

    cy.findAllByRole('region').should('contain', 'Content 3');
  });

  it(`GIVEN 3 accordion items and the focus is on the 1st trigger
    WHEN down arrow key is pressed
    THEN the next trigger should get focus
  `, () => {
    cy.mount(<ThreeItemAccordion behavior="single" />);

    cy.findByRole('button', { name: /Trigger 1/i })
      .focus()
      .type('{downArrow}');

    cy.findByRole('button', { name: /Trigger 2/i }).should('have.focus');
  });

  it(`GIVEN 3 accordion items and the focus is on the 2nd trigger
  WHEN the up arrow key is pressed
  THEN the previous trigger should get focus
  `, () => {
    cy.mount(<ThreeItemAccordion behavior="single" />);

    cy.findByRole('button', { name: /Trigger 1/i })
      .focus()
      .type('{downArrow}');

    cy.findByRole('button', { name: /Trigger 2/i })
      .focus()
      .type('{upArrow}');

    cy.findByRole('button', { name: /Trigger 1/i }).should('have.focus');
  });
});

describe('Prop Behavior', () => {
  it(`GIVEN 3 accordion items with type single
      WHEN clicking the 1st trigger, and soon after the 2nd trigger
      THEN the content of the 1st item should close, and the 2nd should open.
    `, () => {
    cy.mount(<ThreeItemAccordion behavior="single" />);

    cy.findByRole('button', { name: /Trigger 1/i })
      .click()
      .should('have.attr', 'aria-expanded', 'true');

    cy.findByRole('button', { name: /Trigger 2/i })
      .click()
      .should('have.attr', 'aria-expanded', 'true');

    cy.findByRole('button', { name: /Trigger 1/i }).should(
      'have.attr',
      'aria-expanded',
      'false'
    );
  });

  it(`GIVEN 3 accordion items of type multi
      WHEN clicking multiple different triggers
      THEN none of the content should close.
  `, () => {
    cy.mount(<ThreeItemAccordion behavior="multi" />);

    cy.findByRole('button', { name: /Trigger 1/i }).click();
    cy.findByRole('button', { name: /Trigger 2/i }).click();

    cy.findAllByRole('region').eq(0).should('contain', 'Content 1');
    cy.findAllByRole('region').eq(1).should('contain', 'Content 2');
  });

  it(`GIVEN 3 accordion items with the collapsible prop
      WHEN collapsible is set to false
      THEN the item content should not close.
  `, () => {
    cy.mount(<ThreeItemAccordion collapsible={false} />);

    cy.findByRole('button', { name: /Trigger 1/i })
      .click()
      .click()
      .should('have.attr', 'aria-expanded', 'true');
  });

  it(`GIVEN 3 accordion items with the collapsible
      WHEN collapsible is set to true
      THEN the item content should close.
  `, () => {
    cy.mount(<ThreeItemAccordion collapsible={true} />);

    cy.findByRole('button', { name: /Trigger 1/i })
      .click()
      .click()
      .should('have.attr', 'aria-expanded', 'false');
  });

  const DefaultValueAccordion = component$(() => {
    return (
      <AccordionRoot>
        <AccordionItem>
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem defaultValue>
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </AccordionRoot>
    );
  });

  it(`GIVEN 2 accordion items
      WHEN the 2nd item has the defaultValue prop
      THEN the 2nd item's content should be open.
  `, () => {
    cy.mount(<DefaultValueAccordion />);

    cy.findByRole('region').should('contain', 'Content 2');
  });

  it(`GIVEN 2 accordion items of type single
      WHEN the 2nd item has the defaultValue prop, and the 1st trigger is clicked
      THEN the 2nd item's content should be closed, and the 1st opened.
  `, () => {
    cy.mount(<DefaultValueAccordion />);

    cy.findByRole('button', { name: /Trigger 1/i }).click();

    cy.findByRole('region').should('contain', 'Content 1');

    cy.findByRole('region').eq(1).should('not.exist');
  });

  const HeaderAccordion = component$(() => {
    return (
      <AccordionRoot>
        <AccordionItem>
          <AccordionHeader as="h4">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionHeader>
        </AccordionItem>
      </AccordionRoot>
    );
  });

  it(`GIVEN 1 accordion item
      WHEN there is an AccordionHeader wrapped around the item
      THEN it should be a heading
  `, () => {
    cy.mount(<HeaderAccordion />);

    cy.findByRole('heading');
  });

  it(`GIVEN 1 accordion item with the as prop on an accordion header
      WHEN as is set to h4
      THEN AccordionHeader should be rendered as an h4
  `, () => {
    cy.mount(<HeaderAccordion />);

    cy.get('h4');
  });
});

describe('Disabled', () => {
  const FourItemDisabledAccordion = component$(
    ({ behavior, collapsible, ...props }: AccordionProps) => {
      return (
        <AccordionRoot behavior={behavior} collapsible={collapsible} {...props}>
          <AccordionItem>
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>
              <p>Content 1</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger disabled>Trigger 2</AccordionTrigger>
            <AccordionContent>
              <p>Content 2</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>Trigger 3</AccordionTrigger>
            <AccordionContent>
              <p>Content 3</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>Trigger 4</AccordionTrigger>
            <AccordionContent>
              <p>Content 4</p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      );
    }
  );

  it(`GIVEN 4 accordion items
      WHEN the disabled prop is placed on the 2nd item trigger
      THEN the trigger should be disabled
  `, () => {
    cy.mount(<FourItemDisabledAccordion />);

    cy.findByRole('button', { name: /Trigger 2/i }).should('be.disabled');
  });

  it(`GIVEN 4 accordion items and the 1st item is focused
      WHEN the disabled prop is placed on the 2nd trigger 
      THEN keyboard focus should skip over the 2nd trigger and focus the 3rd.
  `, () => {
    cy.mount(<FourItemDisabledAccordion />);

    cy.findByRole('button', { name: /Trigger 1/i })
      .focus()
      .type(`{downArrow}`);

    cy.findByRole('button', { name: /Trigger 3/i }).should('have.focus');
  });

  it(`GIVEN 4 accordion items and the 3rd item is focused
      WHEN the disabled prop is placed on the 2nd trigger 
      THEN keyboard focus should skip over the 2nd trigger and focus the 1st.
  `, () => {
    cy.mount(<FourItemDisabledAccordion />);

    cy.findByRole('button', { name: /Trigger 1/i })
      .focus()
      .type(`{downArrow}`);

    cy.findByRole('button', { name: /Trigger 3/i })
      .focus()
      .type(`{upArrow}`);

    cy.findByRole('button', { name: /Trigger 1/i }).should('have.focus');
  });
});

describe('Dynamic', () => {
  interface DynamicAccordionProps {
    itemIndexToDelete?: number;
    itemIndexToAdd?: number;
    itemsLength: number;
  }

  const DynamicAccordion = component$(
    ({
      itemIndexToDelete = 0,
      itemIndexToAdd = 0,
      itemsLength
    }: DynamicAccordionProps) => {
      const itemNames = Array(itemsLength)
        .fill(1)
        .map((_, index) => `Item ${index + 1}`);

      const itemStore = useStore(itemNames);

      return (
        <>
          <AccordionRoot class="dynamic-root">
            {itemStore.map((itemName, index) => {
              return (
                <AccordionItem key={index}>
                  <AccordionTrigger class="dynamic-trigger">
                    {' '}
                    {itemName} index: {index}
                  </AccordionTrigger>
                  <AccordionContent>index: {index}</AccordionContent>
                </AccordionItem>
              );
            })}
          </AccordionRoot>

          <div>
            <button
              style={{ color: 'green', marginTop: '1rem' }}
              onClick$={() => {
                itemStore.splice(itemIndexToAdd, 0, `new added item`);
              }}
            >
              <strong>Add Item</strong>
            </button>

            <button
              style={{ color: 'red', marginTop: '1rem' }}
              onClick$={() => {
                itemStore.splice(itemIndexToDelete, 1);
              }}
            >
              <strong>Remove Item</strong>
            </button>
          </div>
        </>
      );
    }
  );

  it(`GIVEN 3 accordion items
      WHEN removing the 3rd one dynamically
      THEN only 2 should remain
  `, () => {
    cy.mount(
      <DynamicAccordion itemsLength={3} itemIndexToDelete={2} itemIndexToAdd={0} />
    );

    cy.findByRole('button', { name: /remove item/i }).click();

    cy.get('[data-trigger-id]').should('have.length', 2);
  });

  // it(`GIVEN 3 accordion items
  //     WHEN clicking on the 3rd trigger and adding a new one at the start
  //     THEN the label and content should change, but the index remain the same`, () => {
  //   cy.mount(<DynamicAccordion itemsLength={3} itemIndexToAdd={0} />);

  //   cy.get('[data-trigger-id]').eq(2).click();
  //   cy.findByRole('button', { name: /add item/i }).click();

  //   cy.get('[data-trigger-id]').eq(2);
  // });

  // it(`GIVEN 4 accordion items
  //     WHEN clicking on 3rd trigger and removing it
  //     THEN the 4th trigger's content should be open`, () => {
  //     cy.mount(<DynamicAccordion itemsLength={4} itemIndexToDelete={3} />);

  //     cy.findByRole('button', { name: /Trigger Item 3/i }).click();
  //     cy.findByRole('region').should('contain', 'Content Item 3');

  //     cy.findByRole('button', { name: /Remove Item/i }).click();
  //     cy.findByRole('region').should('contain', 'Content Item 4');
  // });
});
