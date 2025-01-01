import { Component, component$, useSignal, useTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { Tabs } from '@qwik-ui/headless';
import { Highlight } from '../highlight/highlight';
import { metaGlobComponents, rawComponents } from './component-imports';

type ShowcaseProps = {
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
    try {
      // eslint-disable-next-line qwik/valid-lexical-scope
      MetaGlobComponentSig.value = await metaGlobComponents[componentPath](); // We need to call `await metaGlobComponents[componentPath]()` in development as it is `eager:false`
      componentCodeSig.value = await rawComponents[componentPath]();
    } catch (e) {
      throw new Error(`Unable to load path ${componentPath}`);
    }
  });

  return (
    <div class="mb-12 rounded-xl shadow-lg">
      {!props.vertical ? (
        <Tabs.Root
          {...props}
          selectedClassName="bg-primary hover:bg-primary text-primary-foreground hover:text-primary-foreground border-t-1 font-medium "
        >
          <Tabs.List class="flex rounded-t-lg border border-b-0 bg-accent">
            <Tabs.Tab class="h-[44px] rounded-tl-md px-3 py-2 hover:bg-primary/90 hover:text-primary-foreground">
              Preview
            </Tabs.Tab>
            <Tabs.Tab class="h-[44px] px-3 py-2 hover:bg-primary/90 hover:text-primary-foreground">
              Code
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel class="rounded-b-md border px-8 py-32 md:px-32">
            <section class="flex flex-col items-center">
              {MetaGlobComponentSig.value && <MetaGlobComponentSig.value />}
            </section>
          </Tabs.Panel>
          <Tabs.Panel class="relative rounded-b-md border">
            <Highlight class="rounded-t-none" code={componentCodeSig.value || ''} />
          </Tabs.Panel>
        </Tabs.Root>
      ) : (
        <div data-pagefind-ignore="all">
          <section class="flex justify-center space-x-6 rounded-t-md border p-8">
            {MetaGlobComponentSig.value && <MetaGlobComponentSig.value />}
          </section>
          <Highlight
            class="rounded-none rounded-b-md border p-8"
            code={componentCodeSig.value || ''}
          />
        </div>
      )}
    </div>
  );
});
