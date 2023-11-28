import { component$ } from '@builder.io/qwik';
import { TabPanel, Tabs } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Tabs>
      <TabPanel title="Tab 1">Content 1</TabPanel>
      <TabPanel title="Tab 2" selected>
        Content 2
      </TabPanel>
      <TabPanel title="Tab 3">Content 3</TabPanel>
    </Tabs>
  );
});
