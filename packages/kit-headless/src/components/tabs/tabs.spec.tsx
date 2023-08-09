import { $, component$, useSignal, useStore } from '@builder.io/qwik';
import { Tab } from './tab';
import { TabPanel } from './tab-panel';
import { Tabs } from './tabs';
import { TabList } from './tabs-list';

describe('Tabs', () => {
  it('INIT', () => {
    cy.mount(<ThreeTabsComponent />);

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
    cy.mount(<ThreeTabsComponent changeIndexTo={1} />);

    cy.findByRole('tabpanel').should('contain', 'Panel 1');

    cy.findByRole('button', { name: /Change index/i }).click();

    cy.findByRole('tabpanel').should('contain', 'Panel 2');
  });

  it(`GIVEN 3 tabs
      WHEN clicking the middle one
      THEN onSelectedIndexChange should be called`, () => {
    cy.mount(<ThreeTabsComponent />);

    cy.findByRole('tab', { name: /Tab 2/i }).click();

    cy.findByTestId('selected-index-from-event').should('contain.text', 1);
  });

  it(`GIVEN a tab with a custom onClick$ handler
      WHEN tab is clicked on
      THEN the handler should be called`, () => {
    const TabsWithCustomOnClick = component$(() => {
      const wasSelectedSig = useSignal(false);
      return (
        <Tabs>
          <TabList>
            <Tab onClick$={() => (wasSelectedSig.value = true)}>Tab 1</Tab>
          </TabList>
          <TabPanel>Custom onClick was called: {`${wasSelectedSig.value}`}</TabPanel>
        </Tabs>
      );
    });

    cy.mount(<TabsWithCustomOnClick />);

    cy.findByRole('tab', { name: /Tab 1/i }).click();

    cy.findByRole('tabpanel').should('contain', 'Custom onClick was called: true');
  });

  describe('Dynamic Tabs', () => {
    it(`GIVEN 3 tabs,
        WHEN removing the last one dynamically
        THEN only 2 should remain`, () => {
      cy.mount(<DynamicTabsComponent tabsLength={3} tabIndexToDelete={2} />);

      cy.findByRole('button', { name: /remove tab/i }).click();

      cy.findAllByRole('tab').should('have.length', 2);
    });

    it(`GIVEN 3 tabs,
        WHEN selecting 3rd
        AND removing 1st dynamically
        AND clicking 2nd (now 1st)
        THEN the correct tab should be displayed`, () => {
      cy.mount(<DynamicTabsComponent tabsLength={3} tabIndexToDelete={0} />);

      cy.findByRole('tab', { name: /Tab 3/i }).click();
      cy.findByTestId('selected-index-from-event').should('contain.text', 2);

      cy.findByRole('button', { name: /remove tab/i }).click();

      cy.findAllByRole('tab').should('have.length', 2);

      cy.findByRole('tab', { name: /Tab 2/i }).click();

      cy.findByTestId('selected-index-from-event').should('contain.text', 0);
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
        WHEN selecting the 3rd one and adding a tab at the second one
        THEN the correct tab should be displayed`, () => {
      cy.mount(<DynamicTabsComponent tabsLength={4} tabIndexToAdd={1} />);
      cy.findByRole('tab', { name: /Dynamic Tab 3/i }).click();
      cy.findByRole('button', { name: /add tab/i }).click();

      cy.findByRole('tabpanel').should('contain', 'Dynamic Tab 3 Panel');
    });

    interface DynamicTabsProps {
      tabIndexToDelete?: number;
      tabIndexToAdd?: number;
      tabsLength: number;
    }

    const DynamicTabsComponent = component$(
      ({ tabIndexToDelete = 0, tabIndexToAdd = 0, tabsLength }: DynamicTabsProps) => {
        const tabNames = Array(tabsLength)
          .fill(1)
          .map((_, index) => `Dynamic Tab ${index + 1}`);

        const tabsState = useStore(tabNames);
        const selectedIndexSig = useSignal(0);

        return (
          <>
            <Tabs bind:selectedIndex={selectedIndexSig}>
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
            <button onClick$={() => tabsState.splice(tabIndexToAdd, 0, 'new added tab')}>
              Add Tab
            </button>
            {selectedIndexSig.value !== undefined && (
              <div data-testid="selected-index-from-event">
                Selected index from event: {selectedIndexSig.value}
              </div>
            )}
          </>
        );
      }
    );
  });

  describe('Tabs inside of tabs', () => {
    it(`GIVEN tabs inside of tabs
        WHEN clicking on the root second tab
        THEN it should show only the selected root panel`, () => {
      cy.mount(<TabsInsideOfTabs />);

      cy.findAllByRole('tab', { name: /Tab 2/i }).first().click();

      cy.findByRole('tabpanel').should('be.visible').should('contain', 'Root Panel 2');
    });

    it(`GIVEN tabs inside of tabs
        WHEN clicking on the child second tab
        THEN it should show only the selected child panel`, () => {
      cy.mount(<TabsInsideOfTabs />);

      cy.findAllByRole('tab', { name: /Tab 2/i }).eq(1).as('childTab');
      cy.get('@childTab').click();

      cy.findAllByRole('tabpanel').eq(1).should('contain', 'Child Panel 2');
    });

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
    });

    describe('Manual behavior', () => {
      it(`GIVEN 3 tabs
          WHEN clicking the first one and triggering the right arrow key and then "enter"
          THEN the middle panel should be selected`, () => {
        cy.mount(<ThreeTabsComponent />);

        cy.findByRole('tab', { name: /Tab 1/i }).click().type('{rightarrow}');

        const secondTab = cy.findByRole('tab', { name: /Tab 2/i });
        secondTab.should('be.focused');
        cy.findByRole('tabpanel').should('contain', 'Panel 1');

        secondTab.type('{enter}');

        cy.findByRole('tabpanel').should('contain', 'Panel 2');
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

      it(`GIVEN 3 vertical tabs and the focus is on the first,
          WHEN triggering the right arrow key or left arrow key
          THEN the focus should stay on the first tab`, () => {
        cy.mount(<ThreeTabsComponent isVertical={true} />);

        cy.findByRole('tab', { name: /Tab 1/i }).type('{rightarrow}');

        cy.findByRole('tab', { name: /Tab 1/i }).should('have.focus');

        cy.findByRole('tab', { name: /Tab 1/i }).type('{leftarrow}');

        cy.findByRole('tab', { name: /Tab 1/i }).should('have.focus');
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

    it(`GIVEN 3 tabs and the focus is on the third,
        WHEN triggering the 'end' key
        THEN the focus should be on the first tab`, () => {
      cy.mount(<ThreeTabsComponent />);

      cy.findByRole('tab', { name: /Tab 1/i }).type('{pageDown}');

      cy.findByRole('tab', { name: /Tab 3/i }).should('have.focus');
    });
  });

  interface ThreeTabsCompProps {
    isVertical?: boolean;
    changeIndexTo?: number;
  }

  const ThreeTabsComponent = component$(
    ({ isVertical = false, changeIndexTo = 0 }: ThreeTabsCompProps) => {
      const displayedSelectedIndexSig = useSignal<number>();
      const onSelectedIndexChange$ = $((index: number) => {
        displayedSelectedIndexSig.value = index;
      });
      const selectedIndex = useSignal(0);

      return (
        <>
          <Tabs
            data-testid="tabs"
            vertical={isVertical}
            onSelectedIndexChange$={onSelectedIndexChange$}
            selectedIndex={selectedIndex.value}
          >
            <TabList
              style={{
                display: 'flex',
                flexDirection: isVertical ? 'column' : 'row'
              }}
            >
              <Tab>Tab 1</Tab>
              <Tab>Tab 2</Tab>
              <Tab>Tab 3</Tab>
            </TabList>

            <TabPanel>Panel 1</TabPanel>
            <TabPanel>Panel 2</TabPanel>
            <TabPanel>Panel 3</TabPanel>
          </Tabs>

          <br />

          <button
            onClick$={() => {
              selectedIndex.value = changeIndexTo;
            }}
          >
            Change index to {changeIndexTo}
          </button>

          <br />

          {displayedSelectedIndexSig.value !== undefined && (
            <div data-testid="selected-index-from-event">
              Selected index from event: {displayedSelectedIndexSig.value}
            </div>
          )}
        </>
      );
    }
  );

  describe('Disabled tabs', () => {
    it(`GIVEN 3 tabs and the first one is disabled
        WHEN loading the component
        THEN the selected tab should be the middle`, () => {
      cy.mount(<PotentiallyDisabledThreeTabs disabledIndex={0} />);

      cy.findByRole('tabpanel').should('contain', 'Panel 2');
    });

    it(`GIVEN 5 tabs with tab 3 selected and tabs 3-5 are disabled
          WHEN loading the component
          THEN the selected tab should be the second tab`, () => {
      cy.mount(
        <Tabs selectedIndex={2}>
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab disabled={true}>Tab 3</Tab>
            <Tab disabled={true}>Tab 4</Tab>
            <Tab disabled={true}>Tab 5</Tab>
          </TabList>
          <TabPanel>Panel 1</TabPanel>
          <TabPanel>Panel 2</TabPanel>
          <TabPanel>Panel 3</TabPanel>
          <TabPanel>Panel 4</TabPanel>
          <TabPanel>Panel 5</TabPanel>
        </Tabs>
      );

      cy.findByRole('tabpanel').should('contain', 'Panel 2');
    });

    it(`GIVEN 1 disabled tab
          WHEN loading the component
          THEN no panel or tab should be selected`, () => {
      cy.mount(
        <Tabs>
          <TabList>
            <Tab disabled={true}>Tab 1</Tab>
          </TabList>
          <TabPanel>Panel 1</TabPanel>
        </Tabs>
      );

      cy.findByRole('tabpanel').should('not.exist');
    });

    it(`GIVEN 3 horizontal tabs and the focus is on the first,
        WHEN disabling the middle dynamically and triggering the right arrow key
        THEN the focus should be on the third tab`, () => {
      cy.mount(<PotentiallyDisabledThreeTabs disabledIndex={1} />);

      cy.findByRole('tab', { name: /Tab 2/i }).should('be.disabled');

      cy.findByRole('tab', { name: /Tab 1/i }).type('{rightarrow}');

      cy.findByRole('tab', { name: /Tab 3/i }).should('have.focus');
    });

    it(`GIVEN 3 horizontal tabs with the first one disabled and last one is focused
        WHEN triggering the right arrow key
        THEN the focus should be on the second tab`, () => {
      cy.mount(<PotentiallyDisabledThreeTabs disabledIndex={0} />);

      cy.findByRole('tab', { name: /Tab 3/i }).type('{rightarrow}');

      cy.findByRole('tab', { name: /Tab 2/i }).should('have.focus');
    });

    it(`GIVEN 3 horizontal tabs with the first one disabled and last one is focused
        WHEN triggering the right arrow key
        THEN the focus should be on the second tab`, () => {
      cy.mount(<PotentiallyDisabledThreeTabs disabledIndex={2} />);

      cy.findByRole('tab', { name: /Tab 2/i }).type('{rightarrow}');

      cy.findByRole('tab', { name: /Tab 1/i }).should('have.focus');
    });

    it(`GIVEN 3 tabs and the last is disabled and the focus is on the first,
        WHEN triggering the 'end' key
        THEN the focus should be on the second tab`, () => {
      cy.mount(<PotentiallyDisabledThreeTabs disabledIndex={2} />);

      cy.findByRole('tab', { name: /Tab 1/i }).type('{end}');

      cy.findByRole('tab', { name: /Tab 2/i }).should('have.focus');
    });

    it(`GIVEN 3 tabs and the first is disabled and the focus is on the third,
        WHEN triggering the 'home' key
        THEN the focus should be on the second tab`, () => {
      cy.mount(<PotentiallyDisabledThreeTabs disabledIndex={0} />);

      cy.findByRole('tab', { name: /Tab 3/i }).type('{home}');

      cy.findByRole('tab', { name: /Tab 2/i }).should('have.focus');
    });

    it(`GIVEN 3 tabs and the second is disabled and the focus is on the first,
        WHEN triggering the right arrow key
        THEN the focus should be on the third tab`, () => {
      cy.mount(<PotentiallyDisabledThreeTabs disabledIndex={1} />);

      cy.findByRole('tab', { name: /Tab 1/i }).type('{rightarrow}');

      cy.findByRole('tab', { name: /Tab 3/i }).should('have.focus');
    });

    it(`GIVEN 3 tabs and the focus is on the first,
        WHEN disabling the middle dynamically and triggering the down arrow key
        THEN the focus should be on the third tab`, () => {
      cy.mount(<PotentiallyDisabledThreeTabs showDisableButton={true} />);

      cy.findByRole('button', { name: 'Toggle middle tab disabled' }).click();

      cy.findByRole('tab', { name: /Tab 1/i }).type('{rightarrow}');

      cy.findByRole('tab', { name: /Tab 3/i }).should('have.focus');
    });

    it(`GIVEN 3 tabs and the second is disabled and the focus is on the third,
        WHEN triggering the left arrow key
        THEN the focus should be on the first tab`, () => {
      cy.mount(<PotentiallyDisabledThreeTabs disabledIndex={1} />);

      cy.findByRole('tab', { name: /Tab 3/i }).type('{leftarrow}');

      cy.findByRole('tab', { name: /Tab 1/i }).should('have.focus');
    });

    it(`GIVEN 3 vertical tabs and the second is disabled and the focus is on the first,
        WHEN triggering the down arrow key
        THEN the focus should be on the third tab`, () => {
      cy.mount(<PotentiallyDisabledThreeTabs isVertical={true} disabledIndex={1} />);

      cy.findByRole('tab', { name: /Tab 1/i }).type('{downarrow}');

      cy.findByRole('tab', { name: /Tab 3/i }).should('have.focus');
    });

    it(`GIVEN 3 vertical tabs and the second is disabled and the focus is on the third,
        WHEN triggering the up arrow key
        THEN the focus should be on the first tab`, () => {
      cy.mount(<PotentiallyDisabledThreeTabs isVertical={true} disabledIndex={1} />);

      cy.findByRole('tab', { name: /Tab 3/i }).type('{uparrow}');

      cy.findByRole('tab', { name: /Tab 1/i }).should('have.focus');
    });

    const PotentiallyDisabledThreeTabs = component$(
      (props: {
        disabledIndex?: number;
        isVertical?: boolean;
        showDisableButton?: boolean;
      }) => {
        const isMiddleDisabledSig = useSignal(false);
        return (
          <div>
            <Tabs
              vertical={!!props.isVertical}
              style={{
                display: 'flex',
                flexDirection: props.isVertical ? 'row' : 'column'
              }}
            >
              <TabList
                style={{
                  display: 'flex',
                  flexDirection: props.isVertical ? 'column' : 'row'
                }}
              >
                <Tab disabled={props.disabledIndex === 0}>Tab 1</Tab>
                <Tab disabled={props.disabledIndex === 1 || isMiddleDisabledSig.value}>
                  Tab 2
                </Tab>
                <Tab disabled={props.disabledIndex === 2}>Tab 3</Tab>
              </TabList>
              <TabPanel>Panel 1</TabPanel>
              <TabPanel>Panel 2</TabPanel>
              <TabPanel>Panel 3</TabPanel>
            </Tabs>
            {props.showDisableButton && (
              <button
                onClick$={() => (isMiddleDisabledSig.value = !isMiddleDisabledSig.value)}
              >
                Toggle middle tab disabled
              </button>
            )}
          </div>
        );
      }
    );
  });
});
