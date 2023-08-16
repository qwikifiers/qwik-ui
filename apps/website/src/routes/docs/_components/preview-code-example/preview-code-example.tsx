import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import { Tab, TabList, TabPanel, Tabs } from '@qwik-ui/headless';

export const PreviewCodeExample = component$(() => {
  useStyles$(`
    .dark .previewCodeExampleSelectedTab{
      background-color: #423dff;
    }
    .previewCodeExampleSelectedTab{
      background-color: #6daeff;
    }
  `);
  return (
    <Tabs class="mb-12" selectedClassName="previewCodeExampleSelectedTab">
      <TabList class="flex rounded-t-xl bg-blue-200 dark:bg-indigo-900">
        <Tab class="px-4 py-2 rounded-tl-xl hover:bg-[#6daeff] dark:hover:bg-[#423dff]">
          Preview
        </Tab>
        <Tab class="px-4 py-2 hover:bg-[#6daeff] dark:hover:bg-[#423dff]">Code</Tab>
      </TabList>
      <TabPanel class="rounded-b-xl p-4  md:p-12 bg-slate-200 dark:bg-slate-900">
        <section class="flex flex-col items-center">
          <Slot name="actualComponent" />
        </section>
      </TabPanel>
      <TabPanel class="rounded-b-xl p-4 md:p-12 bg-slate-900">
        <section class="overflow-auto">
          <Slot name="codeExample" />
        </section>
      </TabPanel>
    </Tabs>
  );
});
