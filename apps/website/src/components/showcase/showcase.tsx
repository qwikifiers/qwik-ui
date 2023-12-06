import {
  Component,
  QwikIntrinsicElements,
  component$,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
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

  return (
    <Tabs
      {...props}
      class="shadow-light-medium dark:shadow-dark-medium mx-[-24px] mb-12 rounded-xl lg:mx-[-32px]"
      selectedClassName="bg-accent text-accent-foreground border rounded-xl font-medium"
    >
      <TabList class=" flex rounded-t-xl border border-b-0 p-2">
        <Tab class="hover:bg-accent hover:text-accent-foreground mr-2 rounded-xl border px-2 py-1 hover:font-medium">
          Preview
        </Tab>
        <Tab class="hover:bg-accent hover:text-accent-foreground mr-2 rounded-xl border px-2 py-1 hover:font-medium">
          Code
        </Tab>
      </TabList>
      <TabPanel class="shadow-light-medium dark:shadow-dark-medium rounded-b-xl border p-8 md:p-24">
        <section class="flex flex-col items-center">
          {MetaGlobComponentSig.value && <MetaGlobComponentSig.value />}
        </section>
      </TabPanel>
      <TabPanel class="relative rounded-b-xl border">
        <Highlight class="rounded-t-none" code={componentCodeSig.value || ''} />
      </TabPanel>
    </Tabs>
  );
});
