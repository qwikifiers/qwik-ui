import { component$, Slot } from '@builder.io/qwik';
import { Tab, TabList, TabPanel, Tabs } from '@qwik-ui/headless';

export const PreviewCodeExample = component$(() => {
  return (
    <Tabs class="mt-6">
      <TabList class="flex justify-between rounded-t-xl sm:-mx-12 p-4 bg-blue-200 dark:bg-indigo-900">
        <Tab class="px-4 py-2 rounded-lg hover:bg-[var(--qwik-light-blue)] dark:hover:bg-[var(--qwik-dark-purple)]">
          Preview
        </Tab>
        <Tab class="px-4 py-2 rounded-lg hover:bg-[var(--qwik-light-blue)] dark:hover:bg-[var(--qwik-dark-purple)]">
          Code
        </Tab>
      </TabList>
      <TabPanel class="rounded-b-xl sm:-mx-12 p-12 bg-slate-700">
        <section class="flex flex-col items-center">
          <Slot name="actualComponent" />
        </section>
      </TabPanel>
      <TabPanel class="rounded-b-xl sm:-mx-12 p-12 bg-slate-900">
        <section class="overflow-auto">
          <Slot name="codeExample" />
        </section>
      </TabPanel>
    </Tabs>
  );
});
