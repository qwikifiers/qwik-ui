import { PropsOf, Slot, component$ } from '@builder.io/qwik';
import { Tabs } from '@qwik-ui/headless';

const CustomTabs = (props: PropsOf<typeof Tabs.Root>) => (
  <Tabs.Root
    {...props}
    tabListComponent={CustomTabsList}
    tabComponent={CustomTab}
    tabPanelComponent={CustomTabsPanel}
  />
);

const CustomTabsList = component$<PropsOf<typeof Tabs.List>>(() => {
  return (
    <Tabs.List>
      <Slot />
    </Tabs.List>
  );
});

const CustomTab = component$<PropsOf<typeof Tabs.Tab>>(({ ...props }) => {
  return (
    <Tabs.Tab {...props}>
      <span class="text-red-500">Custom</span>
      <Slot />
    </Tabs.Tab>
  );
});

const CustomTabsPanel = component$<PropsOf<typeof Tabs.Panel>>(({ ...props }) => {
  return (
    <Tabs.Panel {...props}>
      <span class="text-red-500">Description:</span>
      <Slot />
    </Tabs.Panel>
  );
});

export default component$(() => {
  return (
    <div class="tabs-example mr-auto">
      <CustomTabs>
        <CustomTabsList>
          <CustomTab>Tab 1</CustomTab>
          <CustomTab>Tab 2</CustomTab>
          <CustomTab>Tab 3</CustomTab>
        </CustomTabsList>
        <CustomTabsPanel>
          <p>Maria Theresia Ahlefeldt (16 January 1755 - 20 December 1810) ...</p>
        </CustomTabsPanel>
        <CustomTabsPanel>
          <p>Carl Joachim Andersen (29 April 1847 - 7 May 1909) ...</p>
        </CustomTabsPanel>
        <CustomTabsPanel>
          <p>Ida Henriette da Fonseca (July 27, 1802 - July 6, 1858) ...</p>
        </CustomTabsPanel>
      </CustomTabs>
    </div>
  );
});
