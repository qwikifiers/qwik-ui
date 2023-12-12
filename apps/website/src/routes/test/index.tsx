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
      <Slot />
    </Tab>
  );
});

const CustomTabPanel = component$<TabPanelProps>(({ ...props }) => {
  return (
    <TabPanel {...props}>
      <Slot />
    </TabPanel>
  );
});

const CustomThreeTabsComponent = component$(() => {
  return (
    <CustomTabs>
      <CustomTabList>
        <CustomTab>Tab 1</CustomTab>
        <CustomTab>Tab 2</CustomTab>
        <CustomTab>Tab 3</CustomTab>
      </CustomTabList>
      <CustomTabPanel>Panel 1</CustomTabPanel>
      <CustomTabPanel>Panel 2</CustomTabPanel>
      <CustomTabPanel>Panel 3</CustomTabPanel>
    </CustomTabs>
  );
});

export default component$(() => {
  return <CustomThreeTabsComponent />;
});
