import { Slot, component$, useStyles$ } from '@builder.io/qwik';
import { Tab, TabList, TabPanel, Tabs } from '@qwik-ui/headless';
import { PreviewCodeExampleProps } from './preview-code-example-props.type';
import { Highlight } from '../highlight/highlight';

export const PreviewCodeExampleTabs = component$((props: PreviewCodeExampleProps) => {
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
      class="shadow-light-medium dark:shadow-dark-medium mb-12 rounded-xl"
      selectedClassName="previewCodeExampleSelectedTab"
    >
      <TabList class="bg-qwikui-blue-700 dark:bg-qwikui-purple-800 border-qwikui-blue-300 dark:border-qwikui-purple-200 flex rounded-t-xl border-[1.5px] border-b-0 text-white">
        <Tab class="hover:bg-qwikui-blue-500 dark:hover:bg-qwikui-purple-600 text-outline-lg rounded-tl-[.625rem] px-4 py-2">
          Preview
        </Tab>
        <Tab class="hover:bg-qwikui-blue-500 dark:hover:bg-qwikui-purple-600 text-outline-lg px-4 py-2">
          Code
        </Tab>
      </TabList>
      <TabPanel class="shadow-light-medium dark:shadow-dark-medium border-qwikui-blue-300 dark:border-qwikui-purple-200 rounded-b-xl border-[1.5px] bg-slate-200 bg-slate-800  p-4 dark:bg-slate-900 md:p-12">
        <section class="flex flex-col items-center">
          <Slot name="actualComponent" />
        </section>
      </TabPanel>
      <TabPanel class="border-qwikui-blue-300 dark:border-qwikui-purple-200 relative rounded-b-xl border-[1.5px]">
        <Highlight class="rounded-b-xl rounded-t-none" code={props.code} />
      </TabPanel>
    </Tabs>
  );
});
