import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import { Tab, TabList, TabPanel, Tabs } from '@qwik-ui/headless';
import { CodeCopy } from '../code-copy/code-copy';

export const PreviewCodeExampleTabsDeprecated = component$((props: { code?: string }) => {
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
      class="shadow-light-medium dark:shadow-dark-medium mx-[-24px] mb-12 rounded-xl lg:mx-[-32px]"
      selectedClassName="previewCodeExampleSelectedTab"
    >
      <TabList class="bg-qwikui-blue-700 dark:bg-qwikui-purple-800 border-qwikui-blue-300 dark:border-qwikui-purple-200 shadow-light-medium dark:shadow-dark-medium flex rounded-t-xl border-[1.5px] border-b-0 text-white">
        <Tab class="hover:bg-qwikui-blue-500 dark:hover:bg-qwikui-purple-600 text-outline-lg min-h-[44px] rounded-tl-[.625rem] px-4 px-[28px] py-2">
          Preview
        </Tab>
        <Tab class="hover:bg-qwikui-blue-500 dark:hover:bg-qwikui-purple-600 text-outline-lg min-h-[44px] px-4 px-[28px] py-2">
          Code
        </Tab>
      </TabList>
      <TabPanel class="shadow-light-medium dark:shadow-dark-medium border-qwikui-blue-300 dark:border-qwikui-purple-200 rounded-b-xl border-[1.5px] bg-slate-200 bg-slate-800  p-4 dark:bg-slate-900 md:p-12">
        <section class="flex flex-col items-center">
          <Slot name="actualComponent" />
        </section>
      </TabPanel>
      <TabPanel class="border-qwikui-blue-300 dark:border-qwikui-purple-200 relative rounded-b-xl border-[1.5px] bg-slate-800 p-4  dark:bg-slate-900 md:p-12">
        <CodeCopy class="code-copy absolute right-0 top-0" code={props.code} />
        <section class="overflow-auto">
          <Slot name="codeExample" />
        </section>
      </TabPanel>
    </Tabs>
  );
});
