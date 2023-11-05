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
import { getOrCreateHighlighter } from '../highlight/get-or-create-highlighter';

const components = import.meta.glob('/src/examples/headless/**/*', {
  import: 'default',
});

const componentsRaw = import.meta.glob('/src/examples/headless/**/*', {
  as: 'raw',
});

type ComponentPreviewProps = QwikIntrinsicElements['div'] & {
  name?: string;
  language?: 'tsx' | 'html' | 'css';
};

export const ComponentPreview = component$<ComponentPreviewProps>(
  ({ name, language = 'tsx', ...props }) => {
    const highlighterSignal = useSignal<string>();

    const componentPath = `/src/examples/headless/accordion/${name}.tsx`;

    const Component = useSignal<Component<any>>();
    const ComponentRaw = useSignal<string>();

    useTask$(async () => {
      const highlighter = await getOrCreateHighlighter();

      Component.value = (await components[componentPath]()) as Component<any>;
      ComponentRaw.value = (await componentsRaw[componentPath]()) as string;

      console.log('Component.value', Component.value);
      console.log('ComponentRaw.value', ComponentRaw.value);

      highlighterSignal.value = highlighter.codeToHtml(ComponentRaw.value || '', {
        lang: language,
      });
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
            <div class={'tabs-example mx-auto'}>
              {Component.value && <Component.value />}
            </div>
          </section>
        </TabPanel>
        <TabPanel class="border-qwikui-blue-300 dark:border-qwikui-purple-200 relative rounded-b-xl border-[1.5px]">
          <Highlight
            class="rounded-b-xl rounded-t-none"
            code={highlighterSignal.value || ''}
          />
        </TabPanel>
      </Tabs>
    );
  },
);
