import { component$ } from '@builder.io/qwik';
import { Tabs } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Tabs.Root>
      <Tabs.Panel title="Tab 1">Content 1</Tabs.Panel>
      <Tabs.Panel title="Tab 2" selected>
        Content 2
      </Tabs.Panel>
      <Tabs.Panel title="Tab 3">Content 3</Tabs.Panel>
    </Tabs.Root>
  );
});
