import { Slot, component$, type PropsOf } from '@builder.io/qwik';
import { Tabs as HeadlessTabs } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';

const Root = (props: PropsOf<typeof HeadlessTabs.Root>) => (
  <HeadlessTabs.Root
    {...props}
    tabListComponent={List}
    tabComponent={Tab}
    tabPanelComponent={Panel}
  />
);

const List = component$<PropsOf<typeof HeadlessTabs.List>>((props) => {
  return (
    <HeadlessTabs.List
      {...props}
      class={cn(
        'border-base bg-muted text-muted-foreground inline-flex items-center justify-center rounded-lg p-1 shadow-sm',
        props.class,
      )}
    >
      <Slot />
    </HeadlessTabs.List>
  );
});

const Tab = component$<PropsOf<typeof HeadlessTabs.Tab>>((props) => {
  return (
    <HeadlessTabs.Tab
      {...props}
      class={cn(
        'ring-offset-background focus-visible:ring-ring data-[state=selected]:border-base data-[state=selected]:bg-background data-[state=selected]:text-foreground inline-flex items-center justify-center rounded-md px-3 py-2 font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-[state=selected]:shadow-inner',
        props.class,
      )}
    >
      <Slot />
    </HeadlessTabs.Tab>
  );
});

const Panel = component$<PropsOf<typeof HeadlessTabs.Panel>>((props) => {
  return (
    <HeadlessTabs.Panel
      {...props}
      class={cn(
        'ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden',
        props.class,
      )}
    >
      <Slot />
    </HeadlessTabs.Panel>
  );
});

export const Tabs = {
  Root,
  List,
  Tab,
  Panel,
};
