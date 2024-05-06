import { component$ } from '@builder.io/qwik';
import { Tabs } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Tabs.Root selectedIndex={1}>
      <Tabs.List>
        <Tabs.Tab>Tab 1</Tabs.Tab>
        <Tabs.Tab>Tab 2</Tabs.Tab>
        <Tabs.Tab>Tab 3</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel>Content 1</Tabs.Panel>
      <Tabs.Panel>Content 2</Tabs.Panel>
      <Tabs.Panel>Content 3</Tabs.Panel>
    </Tabs.Root>
  );
});
