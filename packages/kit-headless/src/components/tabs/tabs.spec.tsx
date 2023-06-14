import { component$, useSignal, useStore } from '@builder.io/qwik';
import { Tab } from './tab';
import { Tabs } from './tabs';
import { TabList } from './tabs-list';
import { TabPanel } from './tabs-panel';

interface ThreeTabsCompProps {
  isMiddleDisabled?: boolean;
  showDisableButton?: boolean;
  disabledIndex?: number;
  isVertical?: boolean;
}

const ThreeTabsComponent = component$(
  ({
    isMiddleDisabled = false,
    showDisableButton = false,
    isVertical = false,
    disabledIndex,
  }: ThreeTabsCompProps) => {
    const isMiddleDisabledSignal = useSignal(isMiddleDisabled);

    return (
      <>
        <Tabs data-testid="tabs" vertical={isVertical}>
          <TabList
            style={{
              display: 'flex',
              flexDirection: isVertical ? 'column' : 'row',
            }}
          >
            <Tab disabled={disabledIndex === 0}>Tab 1</Tab>
            <Tab disabled={disabledIndex === 1 || isMiddleDisabledSignal.value}>
              Tab 2
            </Tab>
            <Tab disabled={disabledIndex === 2}>Tab 3</Tab>
          </TabList>

          <TabPanel>Panel 1</TabPanel>
          <TabPanel>Panel 2</TabPanel>
          <TabPanel>Panel 3</TabPanel>
        </Tabs>

        <br />

        {showDisableButton && (
          <button
            onClick$={() =>
              (isMiddleDisabledSignal.value = !isMiddleDisabledSignal.value)
            }
          >
            Toggle middle tab disabled
          </button>
        )}
      </>
    );
  }
);

interface DynamicTabsProps {
  tabIndexToDelete?: number;
  tabIndexToAdd?: number;
  tabsLength: number;
  selectedIndex?: number;
  changeIndexTo?: number;
}

const DynamicTabsComponent = component$(
  ({
    tabIndexToDelete = 0,
    tabIndexToAdd = 0,
    tabsLength,
    changeIndexTo = 0,
  }: DynamicTabsProps) => {
    const tabNames = Array(tabsLength)
      .fill(1)
      .map((_, index) => `Dynamic Tab ${index + 1}`);

    const tabsState = useStore(tabNames);

    const selectedIndex = useSignal(0);

    return (
      <>
        <Tabs selectedIndex={selectedIndex.value}>
          <TabList>
            {tabsState.map((tab) => (
              <Tab key={tab}>{tab}</Tab>
            ))}
          </TabList>
          {tabsState.map((tab) => (
            <TabPanel key={tab}>{tab} Panel</TabPanel>
          ))}
        </Tabs>
        <button onClick$={() => tabsState.splice(tabIndexToDelete, 1)}>
          Remove Tab
        </button>
        <button
          onClick$={() => tabsState.splice(tabIndexToAdd, 0, 'new added tab')}
        >
          Add Tab
        </button>
        <button
          onClick$={() => {
            selectedIndex.value = changeIndexTo;
          }}
        >
          Change index to {changeIndexTo}
        </button>
      </>
    );
  }
);

const TabsInsideOfTabs = component$(() => {
  return (
    <Tabs>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>

      <TabPanel>
        <Tabs>
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>

          <TabPanel>Panel 1</TabPanel>
          <TabPanel>Child Panel 2</TabPanel>
          <TabPanel>Panel 3</TabPanel>
        </Tabs>
      </TabPanel>
      <TabPanel>Root Panel 2</TabPanel>
      <TabPanel>Panel 3</TabPanel>
    </Tabs>
  );
});

describe('Tabs', () => {
  it('INIT', () => {
    cy.mount(<ThreeTabsComponent />);
    // cy.findByTestId('tabs').matchImage();

    cy.checkA11yForComponent();
  });
  it(`GIVEN 3 tabs
      WHEN clicking the middle one
      THEN render the middle panel`, () => {
    cy.mount(<ThreeTabsComponent />);

    cy.findByRole('tab', { name: /Tab 2/i }).click();

    cy.findByRole('tabpanel').should('contain', 'Panel 2');
  });

  it(`GIVEN 3 tabs
      WHEN changing the selected index programmatically to the middle
      THEN render the middle panel`, () => {
    cy.mount(<DynamicTabsComponent tabsLength={3} changeIndexTo={1} />);

    cy.findByRole('tabpanel').should('contain', 'Dynamic Tab 1 Panel');

    cy.findByRole('button', { name: /Change index/i }).click();

    cy.findByRole('tabpanel').should('contain', 'Dynamic Tab 2 Panel');
  });

  describe('Dynamic Tabs', () => {
    it(`GIVEN 3 tabs,
        WHEN removing the last one dynamically
        THEN only 2 should remain`, () => {
      cy.mount(<DynamicTabsComponent tabsLength={3} tabIndexToDelete={2} />);

      cy.findByRole('button', { name: /remove tab/i }).click();

      cy.findAllByRole('tab').should('have.length', 2);
    });

    it(`GIVEN 3 tabs
        WHEN clicking on the last one and then removing it
        THEN tab 2 should be shown`, () => {
      cy.mount(<DynamicTabsComponent tabsLength={3} tabIndexToDelete={2} />);

      cy.findByRole('tab', { name: /Dynamic Tab 3/i }).click();
      cy.findByRole('tabpanel').should('contain', 'Dynamic Tab 3 Panel');

      cy.findByRole('button', { name: /remove tab/i }).click();

      cy.findByRole('tabpanel').should('contain', 'Dynamic Tab 2 Panel');
    });

    it(`GIVEN 4 tabs
        WHEN clicking on the last one and then removing the 3rd
        THEN tab 4 should be shown`, () => {
      cy.mount(<DynamicTabsComponent tabsLength={4} tabIndexToDelete={2} />);
      cy.findByRole('tab', { name: /Dynamic Tab 4/i }).click();
      cy.findByRole('button', { name: /remove tab/i }).click();

      cy.findByRole('tabpanel').should('contain', 'Dynamic Tab 4 Panel');
    });

    it(`GIVEN 4 tabs
        WHEN selecting the 3rd one and adding a tab at the start
        THEN the correct tab should be displayed`, () => {
      cy.mount(<DynamicTabsComponent tabsLength={4} tabIndexToAdd={1} />);
      cy.findByRole('tab', { name: /Dynamic Tab 3/i }).click();
      cy.findByRole('button', { name: /add tab/i }).click();

      cy.findByRole('tabpanel').should('contain', 'Dynamic Tab 3 Panel');
    });

    it(`GIVEN tabs inside of tabs
        WHEN clicking on the root second tab
        THEN it should show only the selected root panel`, () => {
      cy.mount(<TabsInsideOfTabs />);

      cy.findAllByRole('tab', { name: /Tab 2/i }).first().click();

      cy.findByRole('tabpanel')
        .should('be.visible')
        .should('contain', 'Root Panel 2');
    });

    it(`GIVEN tabs inside of tabs
        WHEN clicking on the child second tab
        THEN it should show only the selected child panel`, () => {
      cy.mount(<TabsInsideOfTabs />);

      cy.findAllByRole('tab', { name: /Tab 2/i }).eq(1).click();

      cy.findAllByRole('tabpanel').eq(1).should('contain', 'Child Panel 2');
    });
  });

  describe('Orientation: Horizontal', () => {
    describe('RIGHT key handling', () => {
      it(`GIVEN 3 tabs and the focus is on the first,
          WHEN triggering the right arrow key
          THEN the focus should be on the next tab`, () => {
        cy.mount(<ThreeTabsComponent />);

        cy.findByRole('tab', { name: /Tab 1/i }).type('{rightarrow}');

        cy.findByRole('tab', { name: /Tab 2/i }).should('have.focus');
      });

      it(`GIVEN 3 tabs and the focus is on the last,
          WHEN triggering the right arrow key
          THEN the focus should be on the first tab`, () => {
        cy.mount(<ThreeTabsComponent />);

        cy.findByRole('tab', { name: /Tab 3/i }).type('{rightarrow}');

        cy.findByRole('tab', { name: /Tab 1/i }).should('have.focus');
      });

      it(`GIVEN 3 tabs and the second is disabled and the focus is on the first,
          WHEN triggering the right arrow key
          THEN the focus should be on the third tab`, () => {
        cy.mount(<ThreeTabsComponent isMiddleDisabled={true} />);

        cy.findByRole('tab', { name: /Tab 1/i }).type('{rightarrow}');

        cy.findByRole('tab', { name: /Tab 3/i }).should('have.focus');
      });

      it(`GIVEN 3 tabs and the focus is on the first,
          WHEN disabling the middle dynamically and triggering the right arrow key
          THEN the focus should be on the third tab`, () => {
        cy.mount(<ThreeTabsComponent showDisableButton={true} />);

        cy.findByRole('button', { name: 'Toggle middle tab disabled' }).click();

        cy.findByRole('tab', { name: /Tab 1/i }).type('{rightarrow}');

        cy.findByRole('tab', { name: /Tab 3/i }).should('have.focus');
      });
    });

    describe('LEFT key handling', () => {
      it(`GIVEN 3 tabs and the focus is on the second,
          WHEN triggering the left arrow key
          THEN the focus should be on the first tab`, () => {
        cy.mount(<ThreeTabsComponent />);

        cy.findByRole('tab', { name: /Tab 2/i }).type('{leftarrow}');

        cy.findByRole('tab', { name: /Tab 1/i }).should('have.focus');
      });

      it(`GIVEN 3 tabs and the focus is on the first,
          WHEN triggering the left arrow key
          THEN the focus should be on the last tab`, () => {
        cy.mount(<ThreeTabsComponent />);

        cy.findByRole('tab', { name: /Tab 1/i }).type('{leftarrow}');

        cy.findByRole('tab', { name: /Tab 3/i }).should('have.focus');
      });

      it(`GIVEN 3 tabs and the second is disabled and the focus is on the third,
          WHEN triggering the left arrow key
          THEN the focus should be on the first tab`, () => {
        cy.mount(<ThreeTabsComponent isMiddleDisabled={true} />);

        cy.findByRole('tab', { name: /Tab 3/i }).type('{leftarrow}');

        cy.findByRole('tab', { name: /Tab 1/i }).should('have.focus');
      });
    });
  });

  describe('Orientation: Vertical', () => {
    describe('DOWN key handling', () => {
      it(`GIVEN 3 vertical tabs and the focus is on the first,
          WHEN triggering the down arrow key
          THEN the focus should be on the next tab`, () => {
        cy.mount(<ThreeTabsComponent isVertical={true} />);

        cy.findByRole('tab', { name: /Tab 1/i }).type('{downarrow}');

        cy.findByRole('tab', { name: /Tab 2/i }).should('have.focus');
      });

      it(`GIVEN 3 vertical tabs and the focus is on the last,
          WHEN triggering the down arrow key
          THEN the focus should be on the first tab`, () => {
        cy.mount(<ThreeTabsComponent isVertical={true} />);

        cy.findByRole('tab', { name: /Tab 3/i }).type('{downarrow}');

        cy.findByRole('tab', { name: /Tab 1/i }).should('have.focus');
      });

      it(`GIVEN 3 vertical tabs and the second is disabled and the focus is on the first,
          WHEN triggering the down arrow key
          THEN the focus should be on the third tab`, () => {
        cy.mount(
          <ThreeTabsComponent isVertical={true} isMiddleDisabled={true} />
        );

        cy.findByRole('tab', { name: /Tab 1/i }).type('{downarrow}');

        cy.findByRole('tab', { name: /Tab 3/i }).should('have.focus');
      });

      it(`GIVEN 3 vertical tabs and the focus is on the first,
          WHEN disabling the middle dynamically and triggering the down arrow key
          THEN the focus should be on the third tab`, () => {
        cy.mount(
          <ThreeTabsComponent isVertical={true} showDisableButton={true} />
        );

        cy.findByRole('button', { name: 'Toggle middle tab disabled' }).click();

        cy.findByRole('tab', { name: /Tab 1/i }).type('{downarrow}');

        cy.findByRole('tab', { name: /Tab 3/i }).should('have.focus');
      });
    });

    describe('UP key handling', () => {
      it(`GIVEN 3 vertical tabs and the focus is on the second,
          WHEN triggering the up arrow key
          THEN the focus should be on the first tab`, () => {
        cy.mount(<ThreeTabsComponent isVertical={true} />);

        cy.findByRole('tab', { name: /Tab 2/i }).type('{uparrow}');

        cy.findByRole('tab', { name: /Tab 1/i }).should('have.focus');
      });

      it(`GIVEN 3 vertical tabs and the focus is on the first,
          WHEN triggering the up arrow key
          THEN the focus should be on the last tab`, () => {
        cy.mount(<ThreeTabsComponent isVertical={true} />);

        cy.findByRole('tab', { name: /Tab 1/i }).type('{uparrow}');

        cy.findByRole('tab', { name: /Tab 3/i }).should('have.focus');
      });

      it(`GIVEN 3 vertical tabs and the second is disabled and the focus is on the third,
          WHEN triggering the up arrow key
          THEN the focus should be on the first tab`, () => {
        cy.mount(
          <ThreeTabsComponent isVertical={true} isMiddleDisabled={true} />
        );

        cy.findByRole('tab', { name: /Tab 3/i }).type('{uparrow}');

        cy.findByRole('tab', { name: /Tab 1/i }).should('have.focus');
      });
    });
  });

  describe('Home, End, PageUp and PageDown keys handling', () => {
    it(`GIVEN 3 tabs and the focus is on the third,
        WHEN triggering the 'home' key
        THEN the focus should be on the first tab`, () => {
      cy.mount(<ThreeTabsComponent />);

      cy.findByRole('tab', { name: /Tab 3/i }).type('{home}');

      cy.findByRole('tab', { name: /Tab 1/i }).should('have.focus');
    });

    it(`GIVEN 3 vertical tabs and the focus is on the third,
        WHEN triggering the 'home' key
        THEN the focus should be on the first tab`, () => {
      cy.mount(<ThreeTabsComponent isVertical={true} />);

      cy.findByRole('tab', { name: /Tab 3/i }).type('{home}');

      cy.findByRole('tab', { name: /Tab 1/i }).should('have.focus');
    });

    it(`GIVEN 3 tabs and the first is disabled and the focus is on the third,
        WHEN triggering the 'home' key
        THEN the focus should be on the second tab`, () => {
      cy.mount(<ThreeTabsComponent disabledIndex={0} />);

      cy.findByRole('tab', { name: /Tab 3/i }).type('{home}');

      cy.findByRole('tab', { name: /Tab 2/i }).should('have.focus');
    });

    it(`GIVEN 3 tabs and the focus is on the third,
        WHEN triggering the 'home' key
        THEN the focus should be on the first tab`, () => {
      cy.mount(<ThreeTabsComponent />);

      cy.findByRole('tab', { name: /Tab 3/i }).type('{pageUp}');

      cy.findByRole('tab', { name: /Tab 1/i }).should('have.focus');
    });

    it(`GIVEN 3 tabs and the focus is on the third,
        WHEN triggering the 'end' key
        THEN the focus should be on the last tab`, () => {
      cy.mount(<ThreeTabsComponent />);

      cy.findByRole('tab', { name: /Tab 1/i }).type('{end}');

      cy.findByRole('tab', { name: /Tab 3/i }).should('have.focus');
    });

    it.skip(
      `GIVEN 3 tabs on a long page and the focus is on the third,
        WHEN triggering the 'end' key
        THEN the focus should be on the last tab and page should not scroll`,
      { scrollBehavior: false },
      () => {
        cy.mount(
          <div>
            <div style="height:900px">
              <ThreeTabsComponent />
            </div>
            <div data-testid="scroll-target">Outside</div>
          </div>
        );

        cy.findByRole('tab', { name: /Tab 1/i }).type('{pageDown}');

        cy.window().its('scrollY').should('equal', 0);
      }
    );

    it(`GIVEN 3 tabs and the first is disabled and the focus is on the third,
        WHEN triggering the 'end' key
        THEN the focus should be on the second tab`, () => {
      cy.mount(<ThreeTabsComponent disabledIndex={2} />);

      cy.findByRole('tab', { name: /Tab 1/i }).type('{end}');

      cy.findByRole('tab', { name: /Tab 2/i }).should('have.focus');
    });

    it(`GIVEN 3 tabs and the focus is on the third,
        WHEN triggering the 'end' key
        THEN the focus should be on the first tab`, () => {
      cy.mount(<ThreeTabsComponent />);

      cy.findByRole('tab', { name: /Tab 1/i }).type('{pageDown}');

      cy.findByRole('tab', { name: /Tab 3/i }).should('have.focus');
    });
  });
});
