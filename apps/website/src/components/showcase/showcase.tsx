import {
  Component,
  QwikIntrinsicElements,
  component$,
  useSignal,
  useStyles$,
  useTask$,
} from '@builder.io/qwik';
import styles from './showcase.css?inline';
import { Tab, TabList, TabPanel, Tabs } from '@qwik-ui/headless';
import { useLocation } from '@builder.io/qwik-city';
import { isDev } from '@builder.io/qwik/build';
import { Highlight } from '../highlight/highlight';

// The below `/src/routes/docs/**/**/examples/*.tsx` patterns are here so that import.meta.glob works both for fluffy and headless routes.
// For example:
// /src/routes/docs/components/fluffy/modal/examples/hero.tsx
// /src/routes/docs/components/headless/modal/examples/hero.tsx

const metaGlobComponents: any = import.meta.glob(
  '/src/routes/docs/**/**/examples/*.tsx',
  {
    import: 'default',
    eager: isDev ? false : true,
  },
);

const rawComponents: any = import.meta.glob('/src/routes/docs/**/**/examples/*.tsx', {
  as: 'raw',
  eager: isDev ? false : true,
});

type ShowcaseProps = QwikIntrinsicElements['div'] & {
  name?: string;
};

export const Showcase = component$<ShowcaseProps>(({ name, ...props }) => {
  const location = useLocation();
  const componentPath = `/src/routes${location.url.pathname}examples/${name}.tsx`;

  const MetaGlobComponentSig = useSignal<Component<any>>();
  const componentCodeSig = useSignal<string>();

  useTask$(async () => {
    MetaGlobComponentSig.value = isDev
      ? await metaGlobComponents[componentPath]() // We need to call `await metaGlobComponents[componentPath]()` in development as it is `eager:false`
      : metaGlobComponents[componentPath]; // We need to directly access the `metaGlobComponents[componentPath]` expression in preview/production as it is `eager:true`
    componentCodeSig.value = isDev
      ? await rawComponents[componentPath]()
      : rawComponents[componentPath];
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
      <TabPanel class="shadow-light-medium dark:shadow-dark-medium border-qwikui-blue-300 dark:border-qwikui-purple-200 rounded-b-xl border-[1.5px] bg-slate-200 bg-slate-800 p-4 dark:bg-slate-900 md:p-12">
        <section class="flex flex-col items-center">
          {MetaGlobComponentSig.value && <MetaGlobComponentSig.value />}
        </section>
      </TabPanel>
      <TabPanel class="border-qwikui-blue-300 dark:border-qwikui-purple-200 relative rounded-b-xl border-[1.5px]">
        <Highlight
          class="rounded-b-xl rounded-t-none"
          code={componentCodeSig.value || ''}
        />
      </TabPanel>
    </Tabs>
  );
});