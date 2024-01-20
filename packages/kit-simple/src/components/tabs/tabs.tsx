import { Slot, component$ } from '@builder.io/qwik';
import {
  Tabs as QwikUITabs,
  TabList as QwikUITabList,
  Tab as QwikUITab,
  TabPanel as QwikUITabPanel,
  type TabProps,
  type TabPanelProps,
  type TabListProps,
  type TabsProps,
} from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';
const Tabs = (props: TabsProps) => (
  <QwikUITabs {...props} TabList={TabList} Tab={Tab} TabPanel={TabPanel} />
);

const TabList = component$<TabListProps>((props) => {
  return (
    <QwikUITabList
      {...props}
      class={cn(
        'bg-muted text-muted-foreground inline-flex h-9 items-center justify-center rounded-lg p-1',
        props.class,
      )}
    >
      <Slot />
    </QwikUITabList>
  );
});

const Tab = component$<TabProps>((props) => {
  return (
    <QwikUITab
      {...props}
      class={cn(
        'ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow',
        props.class,
      )}
    >
      <Slot />
    </QwikUITab>
  );
});

const TabPanel = component$<TabPanelProps>((props) => {
  return (
    <QwikUITabPanel
      {...props}
      class={cn(
        'ring-offset-background focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        props.class,
      )}
    >
      <Slot />
    </QwikUITabPanel>
  );
});

export { Tabs, TabList, Tab, TabPanel };
