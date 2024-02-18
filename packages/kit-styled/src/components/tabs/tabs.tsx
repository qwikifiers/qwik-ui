import { Slot, component$ } from '@builder.io/qwik';
import {
  Tab as QwikUITab,
  TabList as QwikUITabList,
  TabPanel as QwikUITabPanel,
  Tabs as QwikUITabs,
  type TabListProps,
  type TabPanelProps,
  type TabProps,
  type TabsProps,
} from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';

const Tabs = (props: TabsProps) => (
  <QwikUITabs
    {...props}
    tabListComponent={TabList}
    tabComponent={Tab}
    tabPanelComponent={TabPanel}
  />
);

const TabList = component$<TabListProps>((props) => {
  return (
    <QwikUITabList
      {...props}
      class={cn(
        'bg-muted text-muted-foreground inline-flex items-center justify-center rounded-lg border p-1 shadow-sm',
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
        'ring-offset-background focus-visible:ring-ring data-[state=selected]:bg-background data-[state=selected]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=selected]:border',
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

export { Tab, TabList, TabPanel, Tabs };
