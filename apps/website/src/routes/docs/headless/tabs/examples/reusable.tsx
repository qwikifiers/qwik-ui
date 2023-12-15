import { Slot, component$ } from '@builder.io/qwik';
import {
  Tab,
  TabList,
  TabListProps,
  TabPanel,
  TabPanelProps,
  TabProps,
  Tabs,
  TabsProps,
} from '@qwik-ui/headless';

const CustomTabs = (props: TabsProps) => (
  <Tabs {...props} TabList={CustomTabList} Tab={CustomTab} TabPanel={CustomTabPanel} />
);

const CustomTabList = component$<TabListProps>(() => {
  return (
    <TabList>
      <Slot />
    </TabList>
  );
});

const CustomTab = component$<TabProps>(({ ...props }) => {
  return (
    <Tab {...props}>
      <span class="text-red-500">Custom</span>
      <Slot />
    </Tab>
  );
});

const CustomTabPanel = component$<TabPanelProps>(({ ...props }) => {
  return (
    <TabPanel {...props}>
      <span class="text-red-500">Description:</span>
      <Slot />
    </TabPanel>
  );
});

export default component$(() => {
  return (
    <div class="tabs-example mr-auto">
      <CustomTabs>
        <CustomTabList>
          <CustomTab>Tab 1</CustomTab>
          <CustomTab>Tab 2</CustomTab>
          <CustomTab>Tab 3</CustomTab>
        </CustomTabList>
        <CustomTabPanel>
          <p>Maria Theresia Ahlefeldt (16 January 1755 - 20 December 1810) ...</p>
        </CustomTabPanel>
        <CustomTabPanel>
          <p>Carl Joachim Andersen (29 April 1847 - 7 May 1909) ...</p>
        </CustomTabPanel>
        <CustomTabPanel>
          <p>Ida Henriette da Fonseca (July 27, 1802 - July 6, 1858) ...</p>
        </CustomTabPanel>
      </CustomTabs>
    </div>
  );
});
