import { component$, Slot } from '@builder.io/qwik';
import { Tabs } from '@qwik-ui/headless';
import { Highlight } from '../highlight/highlight';

type ShowcaseProps = {
  vertical?: boolean;
  rawCode: string;
};

export const Showcase = component$<ShowcaseProps>(({ rawCode, ...props }) => {
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
              <Slot />
            </section>
          </Tabs.Panel>
          <Tabs.Panel class="relative rounded-b-md border">
            <Highlight class="rounded-t-none" code={rawCode || ''} />
          </Tabs.Panel>
        </Tabs.Root>
      ) : (
        <div data-pagefind-ignore="all">
          <section class="flex justify-center space-x-6 rounded-t-md border p-8">
            <Slot />
          </section>
          <Highlight class="rounded-none rounded-b-md border p-8" code={rawCode || ''} />
        </div>
      )}
    </div>
  );
});
