import { Component, PropsOf, component$, useSignal, useTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { isDev } from '@builder.io/qwik/build';
import { Tab, TabList, TabPanel, Tabs } from '@qwik-ui/headless';
import { Highlight } from '../highlight/highlight';
import { metaGlobComponents, rawComponents } from './component-impots';

type ShowcaseProps = PropsOf<'div'> & {
  name?: string;
  vertical?: boolean;
};

export const Showcase = component$<ShowcaseProps>(({ name, ...props }) => {
  const location = useLocation();
  const componentPath = `/src/routes${location.url.pathname}examples/${name}.tsx`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  return !props.vertical ? (
    <Tabs
      {...props}
      class="mb-12 rounded-xl shadow-lg "
      selectedClassName="bg-primary hover:bg-primary text-primary-foreground hover:text-primary-foreground  border-t-1 font-medium "
    >
      <TabList class="bg-accent flex rounded-t-xl border border-b-0">
        <Tab class="hover:bg-primary/90 hover:text-primary-foreground rounded-tl-xl px-3 py-2   ">
          Preview
        </Tab>
        <Tab class="hover:bg-primary/90 hover:text-primary-foreground px-3 py-2 ">
          Code
        </Tab>
      </TabList>
      <TabPanel class="rounded-b-xl border p-8 shadow-lg md:p-24">
        <section class="flex flex-col items-center">
          {MetaGlobComponentSig.value && <MetaGlobComponentSig.value />}
        </section>
      </TabPanel>
      <TabPanel class="relative rounded-b-xl border">
        <Highlight class="rounded-t-none" code={componentCodeSig.value || ''} />
      </TabPanel>
    </Tabs>
  ) : (
    <div>
      <section class="flex flex-col items-center rounded-t-xl border p-8 shadow-lg">
        {MetaGlobComponentSig.value && <MetaGlobComponentSig.value />}
      </section>

      <Highlight
        class="rounded-none rounded-b-xl border p-8 shadow-lg"
        code={componentCodeSig.value || ''}
      />
    </div>
  );
});
