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
      class="shadow-light-medium dark:shadow-dark-medium mx-[-24px] mb-12 rounded-lg lg:mx-[-32px]"
      selectedClassName="previewCodeExampleSelectedTab"
    >
      <TabList class="bg-qwikui-blue-700 dark:bg-qwikui-purple-800 border-qwikui-blue-300 dark:border-qwikui-purple-200 flex rounded-t-lg border-[1.5px] border-b-0 text-white">
        <Tab class="hover:bg-qwikui-blue-600 dark:hover:bg-qwikui-purple-500 text-outline-lg ease-step transition-color min-h-[44px] rounded-tl-[.325rem] px-4 px-[28px] py-2 transition">
          Preview
        </Tab>
        <Tab class="hover:bg-qwikui-blue-600 dark:hover:bg-qwikui-purple-500 text-outline-lg ease-step transition-color min-h-[44px] px-4 px-[28px] py-2 transition duration-300">
          Code
        </Tab>
      </TabList>
      <TabPanel class="shadow-light-medium dark:shadow-dark-medium border-qwikui-blue-300 dark:border-qwikui-purple-200 rounded-b-lg border-[1.5px] bg-slate-200 bg-slate-800  py-12 dark:bg-slate-900 md:p-12">
        <section class="flex flex-col items-center">
          <Slot name="actualComponent" />
        </section>
      </TabPanel>
      <TabPanel class="border-qwikui-blue-300 dark:border-qwikui-purple-200 relative rounded-b-lg border-[1.5px]">
        <Highlight class="rounded-b-lg rounded-t-none" code={props.code} />
      </TabPanel>
    </Tabs>
  );
});
