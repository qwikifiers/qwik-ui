import { component$, useStore } from '@builder.io/qwik';
import { Tab } from './tab';
import { Tabs } from './tabs';
import { TabList } from './tabs-list';
import { TabPanel } from './tabs-panel';

interface DynamicTabsProps {
  tabIndexToDelete?: number;
  tabIndexToAdd?: number;
  tabsLength: number;
  selectedIndex?: number;
}

const ThreeTabsComponent = component$(() => {
  return (
    
    <Tabs data-testid='tabs'>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabList>

      <TabPanel>Panel 1</TabPanel>
      <TabPanel>Panel 2</TabPanel>
      <TabPanel>Panel 3</TabPanel>
    </Tabs>
    
  )
});

const DynamicTabsComponent = component$(
  ({
    tabIndexToDelete = 0,
    tabIndexToAdd = 0,
    tabsLength,
    selectedIndex = 0,
  }: DynamicTabsProps) => {
    const tabNames = Array(tabsLength)
      .fill(1)
      .map((_, index) => `Dynamic Tab ${index + 1}`);

    const tabsState = useStore(tabNames);

    return (
      <>
        <Tabs selectedIndex={selectedIndex}>
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
      </>
    );
  }
);

describe('Tabs', () => {
  it('should render the component and check if its accessible', () => {
    cy.mount(
      <Tabs>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>

describe('Tabs', () => {

  it('INIT', () => {
    cy.mount(
      <ThreeTabsComponent/>
    );
    cy.findByTestId('tabs').matchImage();
    
    cy.checkA11yForComponent();
  })
  it('should render the component', () => {
    cy.mount(
      <ThreeTabsComponent/>
    );

    cy.findByRole('tab', { name: /Tab 2/i }).click();

    cy.findByRole('tabpanel').should('contain', 'Panel 2');

    
  });

  it('Given 3 tabs, when removing the last one dynamically, only 2 should remain', () => {
    cy.mount(<DynamicTabsComponent tabsLength={3} tabIndexToDelete={2} />);

    cy.findByRole('button', { name: /remove tab/i }).click();

    cy.findAllByRole('tab').should('have.length', 2);
  });

  it('Given 3 tabs, when clicking on the last one and then removing it, tab 2 should be shown', () => {
    cy.mount(<DynamicTabsComponent tabsLength={3} tabIndexToDelete={2} />);
    cy.findByRole('tab', { name: /Dynamic Tab 3/i }).click();
    cy.findByRole('button', { name: /remove tab/i }).click();

    cy.findByRole('tabpanel').should('contain', 'Dynamic Tab 2 Panel');
  });

  it('Given 4 tabs, when clicking on the last one and then removing the 3rd, tab 4 should be shown', () => {
    cy.mount(<DynamicTabsComponent tabsLength={4} tabIndexToDelete={2} />);
    cy.findByRole('tab', { name: /Dynamic Tab 4/i }).click();
    cy.findByRole('button', { name: /remove tab/i }).click();

    cy.findByRole('tabpanel').should('contain', 'Dynamic Tab 4 Panel');
  });

  it('Given 4 tabs, when selecting the 3rd one and adding a tab at the start, the correct tab should be displayed', () => {
    cy.mount(<DynamicTabsComponent tabsLength={4} tabIndexToAdd={1} />);
    cy.findByRole('tab', { name: /Dynamic Tab 3/i }).click();
    cy.findByRole('button', { name: /add tab/i }).click();

    cy.findByRole('tabpanel').should('contain', 'Dynamic Tab 3 Panel');
  });
});
