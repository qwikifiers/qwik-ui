import { Slot, component$, useStyles$ } from '@builder.io/qwik';

export const PreviewCodeExampleVertical = component$(({ ...props }) => {
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
    <div class="flex w-full flex-col">
      <h3>Preview</h3>
      <section class="border-solid border-slate-500 p-4">
        <Slot name="actualComponent" />
      </section>
      <h3>Code</h3>
      <aside class="shadow-light-low dark:shadow-dark-low mb-6 rounded-xl border-2 border-slate-500 bg-slate-800 p-12 dark:border-slate-400 dark:bg-slate-900">
        <Slot name="codeExample" />
      </aside>
    </div>

    // <Tabs
    //   {...props}
    //   class="shadow-light-medium dark:shadow-dark-medium mb-12 rounded-xl"
    //   selectedClassName="previewCodeExampleSelectedTab"
    // >
    //   <TabList class="bg-qwikui-blue-700 dark:bg-qwikui-purple-800 border-qwikui-blue-300 dark:border-qwikui-purple-200 shadow-light-medium dark:shadow-dark-medium flex rounded-t-xl border-[1.5px] border-b-0 text-white">
    //     <Tab class="hover:bg-qwikui-blue-500 dark:hover:bg-qwikui-purple-600 text-outline-lg rounded-tl-[.625rem] px-4 py-2">
    //       Preview
    //     </Tab>
    //     <Tab class="hover:bg-qwikui-blue-500 dark:hover:bg-qwikui-purple-600 text-outline-lg px-4 py-2">
    //       Code
    //     </Tab>
    //   </TabList>
    //   <TabPanel class="shadow-light-medium dark:shadow-dark-medium border-qwikui-blue-300 dark:border-qwikui-purple-200 rounded-b-xl border-[1.5px] bg-slate-200 bg-slate-800  p-4 dark:bg-slate-900 md:p-12">
    //     <section class="flex flex-col items-center">
    //       <Slot name="actualComponent" />
    //     </section>
    //   </TabPanel>
    //   <TabPanel class="border-qwikui-blue-300 dark:border-qwikui-purple-200 rounded-b-xl border-[1.5px] bg-slate-800 p-4  dark:bg-slate-900 md:p-12">
    //     <section class="overflow-auto">
    //       <Slot name="codeExample" />
    //     </section>
    //   </TabPanel>
    // </Tabs>
  );
});
