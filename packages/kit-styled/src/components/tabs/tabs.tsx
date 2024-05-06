import { Slot, component$, PropsOf } from '@builder.io/qwik';
import { Tabs as QwikUITabs } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';

export const TabsRoot = (props: PropsOf<typeof QwikUITabs.Root>) => (
  <QwikUITabs.Root
    {...props}
    tabListComponent={TabsList}
    tabComponent={Tab}
    tabPanelComponent={TabsPanel}
  />
);

export const TabsList = component$<PropsOf<typeof QwikUITabs.List>>((props) => {
  return (
    <QwikUITabs.List
      {...props}
      class={cn(
        'inline-flex items-center justify-center rounded-lg border-base bg-muted p-1 text-muted-foreground shadow-sm',
        props.class,
      )}
    >
      <Slot />
    </QwikUITabs.List>
  );
});

export const Tab = component$<PropsOf<typeof QwikUITabs.Tab>>((props) => {
  return (
    <QwikUITabs.Tab
      {...props}
      class={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=selected]:border-base data-[state=selected]:bg-background data-[state=selected]:text-foreground data-[state=selected]:shadow-inner',
        props.class,
      )}
    >
      <Slot />
    </QwikUITabs.Tab>
  );
});

export const TabsPanel = component$<PropsOf<typeof QwikUITabs.Panel>>((props) => {
  return (
    <QwikUITabs.Panel
      {...props}
      class={cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        props.class,
      )}
    >
      <Slot />
    </QwikUITabs.Panel>
  );
});
