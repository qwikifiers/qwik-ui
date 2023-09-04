import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import { Tab, TabList, TabPanel, Tabs } from '@qwik-ui/headless';

export const PreviewCodeExample = component$(({ ...props }) => {
  useStyles$(`
    .dark .previewCodeExampleSelectedTab{
      background-color: var(--qwikui-purple-600);
      font-weight: 600;
    }
    
    .previewCodeExampleSelectedTab{
      background-color: var(--qwikui-blue-500);
      font-weight: 600;
    }
  `);
  return (
    <Tabs
      {...props}
      class="mb-12 shadow-light-medium dark:shadow-dark-medium rounded-xl"
      selectedClassName="previewCodeExampleSelectedTab"
    >
      <TabList class="text-white flex rounded-t-xl bg-qwikui-blue-700 dark:bg-qwikui-purple-800 border-qwikui-blue-300 dark:border-qwikui-purple-200 border-[1.5px] border-b-0 shadow-light-medium dark:shadow-dark-medium">
        <Tab class="px-4 py-2 rounded-tl-[.625rem] hover:bg-qwikui-blue-500 dark:hover:bg-qwikui-purple-600">
          Preview
        </Tab>
        <Tab class="px-4 py-2 hover:bg-qwikui-blue-500 dark:hover:bg-qwikui-purple-600">
          Code
        </Tab>
      </TabList>
      <TabPanel class="rounded-b-xl shadow-light-medium bg-slate-800 dark:shadow-dark-medium border-qwikui-blue-300 border-[1.5px] p-4 dark:border-qwikui-purple-200  md:p-12 bg-slate-200 dark:bg-slate-950">
        <section class="flex flex-col items-center">
          <Slot name="actualComponent" />
        </section>
      </TabPanel>
      <TabPanel class="rounded-b-xl p-4 md:p-12 bg-slate-900 border-[1.5px]  border-qwikui-blue-300 dark:border-qwikui-purple-200">
        <section class="overflow-auto">
          <Slot name="codeExample" />
        </section>
      </TabPanel>
    </Tabs>
  );
});
