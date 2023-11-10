import {
  Component,
  QwikIntrinsicElements,
  component$,
  useSignal,
  useStyles$,
  useTask$,
} from '@builder.io/qwik';
import styles from './index.css?inline';

import { Tab, TabList, TabPanel, Tabs } from '@qwik-ui/headless';
import { Highlight } from '../highlight';
import { useLocation } from '@builder.io/qwik-city';
import { removeDocsFromPath } from '~/lib/utils';
import { isDev } from '@builder.io/qwik/build';

const components: any = import.meta.glob('/src/examples/**/**/*', {
  import: 'default',
  eager: isDev ? false : true,
});

const componentsRaw: any = import.meta.glob('/src/examples/**/**/*', {
  as: 'raw',
  eager: isDev ? false : true,
});

type ExampleProps = QwikIntrinsicElements['div'] & {
  name?: string;
};

export const Example = component$<ExampleProps>(({ name, ...props }) => {
  const location = useLocation();

  const dynamicPath = removeDocsFromPath(location.url.pathname);
  const componentPath = `/src/examples/${dynamicPath}${name}.tsx`;

  const Component = useSignal<Component<any>>();
  const ComponentRaw = useSignal<string>();

  useTask$(async () => {
    if (isDev) {
      Component.value = await components[componentPath]();
      ComponentRaw.value = await componentsRaw[componentPath]();
    } else {
      Component.value = components[componentPath];
      ComponentRaw.value = componentsRaw[componentPath];
    }
  });

  useStyles$(styles);
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
          {Component.value && <Component.value />}
        </section>
      </TabPanel>
      <TabPanel class="border-qwikui-blue-300 dark:border-qwikui-purple-200 relative rounded-b-xl border-[1.5px]">
        <Highlight class="rounded-b-xl rounded-t-none" code={ComponentRaw.value || ''} />
      </TabPanel>
    </Tabs>
  );
});
