import {
  component$,
  QwikIntrinsicElements,
  Slot,
  useSignal,
  useStore,
} from '@builder.io/qwik';
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from '@qwik-ui/headless';
import { PreviewCodeExampleTabsDeprecated } from '~/components/preview-code-example/preview-code-example-tabs-deprecated';

export const HeroAccordion = component$(() => {
  return (
    <PreviewCodeExampleTabsDeprecated>
      <div class="flex w-full justify-center" q:slot="actualComponent">
        <AccordionRoot
          animated
          enhance={true}
          class="box-border w-[min(400px,_100%)] rounded-sm border-[1px] border-slate-600 bg-slate-700 text-white"
        >
          <AccordionItem>
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between  rounded-t-sm border-b-[1px] border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                <span>Can I add headings inside the accordion?</span>
                <span class="pl-2">
                  <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion-animation-1 overflow-hidden">
              <p class="bg-slate-900 p-4 ">
                Yes, if you wrap the <strong>AccordionHeader</strong> component around the
                trigger, screen readers will announce it properly.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between border-b-[1px] border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                <span>Is it easy to animate?</span>
                <span class="pl-2">
                  <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion-animation-1 overflow-hidden">
              <p class="bg-slate-900 p-4">
                Yup! You can even use animations or CSS transitions using the{' '}
                <strong>animated</strong> prop on the accordion root!
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between bg-slate-700 px-4 py-2 text-left hover:bg-slate-800 aria-expanded:rounded-none">
                <span>How about opening multiple items?</span>
                <span class="pl-2">
                  <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion-animation-1 overflow-hidden">
              <p class="border-t-[1px] border-slate-600 bg-slate-900 p-4">
                You can do that by setting the <strong>behavior</strong> prop to "multi"
                on the Accordion
              </p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExampleTabsDeprecated>
  );
});

export const MultiAccordion = component$(() => {
  return (
    <PreviewCodeExampleTabsDeprecated>
      <div class="flex w-full justify-center" q:slot="actualComponent">
        <AccordionRoot
          collapsible
          animated
          behavior="multi"
          class="box-border w-[min(400px,_100%)] rounded-sm border-[1px] border-slate-600 bg-slate-700 text-white"
        >
          <AccordionItem>
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between  rounded-t-sm border-b-[1px] border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                <span>Can I style based on the trigger state?</span>
                <span class="pl-2">
                  <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion-animation-1 overflow-hidden">
              <p class="bg-slate-900 p-4 ">
                100%. The trigger has a <strong>[data-state]</strong> selector that can be
                styled when equal to the <strong>open</strong> or <strong>closed</strong>{' '}
                values.
                <br />
                <br />
                For example, [data-state="open"]
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between border-b-[1px] border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                <span>What about applying attributes?</span>
                <span class="pl-2">
                  <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion-animation-1 overflow-hidden">
              <p class="bg-slate-900 p-4">
                It's typed using <strong>QwikIntrinsicElements</strong>, meaning you can
                treat it like an element!
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between bg-slate-700 px-4 py-2 text-left hover:bg-slate-800 aria-expanded:rounded-none">
                <span>How about using event handlers?</span>
                <span class="pl-2">
                  <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion-animation-1 overflow-hidden">
              <p class="border-t-[1px] border-slate-600 bg-slate-900 p-4">
                You can use onClick$, onKeyDown$, any handlers you'd normally use with
                Qwik!
              </p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExampleTabsDeprecated>
  );
});

// non-collapsible
export const NonCollapsibleAccordion = component$(() => {
  return (
    <PreviewCodeExampleTabsDeprecated>
      <div class="flex w-full justify-center" q:slot="actualComponent">
        <AccordionRoot
          animated
          collapsible={false}
          class="box-border w-[min(400px,_100%)] rounded-sm border-[1px] border-slate-600 bg-slate-700 text-white"
        >
          <AccordionItem>
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between  rounded-t-sm border-b-[1px] border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                <span>How do I turn off collapsing?</span>
                <span class="pl-2">
                  <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion-animation-1 overflow-hidden">
              <p class="bg-slate-900 p-4 ">
                You can turn it off by setting the <strong>collapsible</strong> prop to
                false.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between border-b-[1px] border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                <span>Can it be dynamic?</span>
                <span class="pl-2">
                  <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion-animation-1 overflow-hidden">
              <p class="bg-slate-900 p-4">
                Yes, there's a dynamic section further below.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <h3>
              <AccordionTrigger class="group flex w-full items-center justify-between bg-slate-700 px-4 py-2 text-left hover:bg-slate-800 aria-expanded:rounded-none">
                <span>Can I reactively change stuff?</span>
                <span class="pl-2">
                  <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
                </span>
              </AccordionTrigger>
            </h3>
            <AccordionContent class="accordion-animation-1 overflow-hidden">
              <p class="border-t-[1px] border-slate-600 bg-slate-900 p-4">
                Of course! You can also use the onFocusIndexChange$ and
                onSelectedIndexChange$ custom events.
              </p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExampleTabsDeprecated>
  );
});

// disabled
export const DisabledAccordion = component$(() => {
  return (
    <PreviewCodeExampleTabsDeprecated>
      <div class="flex w-full justify-center" q:slot="actualComponent">
        <AccordionRoot class="box-border w-[min(400px,_100%)] rounded-sm border-[1px] border-slate-600 bg-slate-700 text-white">
          <AccordionItem>
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between rounded-t-sm border-b-[1px] border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                <span>I'm enabled!</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-slate-900 p-4">
                Hey, I'm enabled! This is because I don't use the{' '}
                <strong>disabled</strong> prop on the trigger.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between border-b-[1px] border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                <span>I'm enabled!</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-slate-900 p-4">
                Hey, I'm enabled! This is because I don't use the{' '}
                <strong>disabled</strong> prop on the trigger.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <h3>
              <AccordionTrigger
                disabled
                class="group flex w-full items-center justify-between bg-slate-700 px-4 py-2 text-left hover:bg-slate-800 aria-disabled:cursor-not-allowed aria-expanded:rounded-none"
              >
                <span>
                  I'm{' '}
                  <span class="font-bold" style="color: red">
                    disabled!
                  </span>
                </span>
                <span class="flex pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </h3>
            <AccordionContent>
              <p class="border-t-[1px] border-slate-600 bg-slate-900 p-4">
                You shouldn't be able to see this!
              </p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExampleTabsDeprecated>
  );
});

export const DefaultValueAccordion = component$(() => {
  return (
    <PreviewCodeExampleTabsDeprecated>
      <div class="flex w-full justify-center" q:slot="actualComponent">
        <AccordionRoot class="box-border w-[min(400px,_100%)] rounded-sm border-[1px] border-slate-600 bg-slate-700 text-white">
          <AccordionItem>
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between rounded-t-sm border-b-[1px] border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                <span>Not open by default.</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-slate-900 p-4 ">I wasn't open by default!</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem defaultValue>
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between border-b-[1px] border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                <span>I'm open!</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-slate-900 p-4">
                You can open me by default by putting the <strong>defaultValue</strong>{' '}
                prop on the Accordion Item.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <h3>
              <AccordionTrigger class="group flex w-full items-center justify-between bg-slate-700 px-4 py-2 text-left hover:bg-slate-800 aria-expanded:rounded-none">
                <span>Not open by default.</span>
                <span class="flex pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </h3>
            <AccordionContent>
              <p class="border-t-[1px] border-slate-600 bg-slate-900 p-4">
                I wasn't open by default!
              </p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExampleTabsDeprecated>
  );
});

export const PolymorphicHeadingAccordion = component$(() => {
  return (
    <PreviewCodeExampleTabsDeprecated>
      <div class="flex w-full justify-center" q:slot="actualComponent">
        <AccordionRoot class="box-border w-[min(400px,_100%)] rounded-sm border-[1px] border-slate-600 bg-slate-700 text-white">
          <AccordionItem>
            <AccordionHeader as="h4">
              <AccordionTrigger class="group flex w-full items-center justify-between rounded-t-sm border-b-[1px] border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                <span>I'm an h4</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-slate-900 p-4 ">My Heading is an h4!</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader as="h5">
              <AccordionTrigger class="group flex w-full items-center justify-between border-b-[1px] border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                <span>I'm an h5</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-slate-900 p-4">My Heading is an h5!</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader as="h6">
              <AccordionTrigger class="group flex w-full items-center justify-between bg-slate-700 px-4 py-2 text-left hover:bg-slate-800 aria-expanded:rounded-none">
                <span>I'm an h6</span>
                <span class="flex pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="border-t-[1px] border-slate-600 bg-slate-900 p-4">
                My Heading is an h6!
              </p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExampleTabsDeprecated>
  );
});

export const OnSelectedIndexChange = component$(() => {
  const selectedIndexSig = useSignal(0);

  return (
    <PreviewCodeExampleTabsDeprecated>
      <div class="flex w-full flex-col items-center gap-4" q:slot="actualComponent">
        <AccordionRoot
          class="box-border w-[min(400px,_100%)] rounded-sm border-[1px] border-slate-600 bg-slate-700 text-white"
          onSelectedIndexChange$={(index) => {
            selectedIndexSig.value = index;
          }}
        >
          <AccordionItem>
            <AccordionHeader>
              <AccordionTrigger class="group flex w-full items-center justify-between rounded-t-sm border-b-[1px] border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                <span>Can I contribute to Qwik UI?</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-slate-900 p-4 ">
                Absolutely! You can reach out to us in the Qwikifiers discord.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader>
              <AccordionTrigger class="group flex w-full items-center justify-between border-b-[1px] border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                <span>How many people are learning Qwik?</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-slate-900 p-4">
                According to the 2023 <strong>stack overflow survey</strong>, it's close
                to the amount of people learning Remix already!
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader>
              <AccordionTrigger class="group flex w-full items-center justify-between bg-slate-700 px-4 py-2 text-left hover:bg-slate-800 aria-expanded:rounded-none">
                <span>What's the Qwikifiers discord?</span>
                <span class="flex pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="border-t-[1px] border-slate-600 bg-slate-900 p-4">
                A group of active contributors in the Qwik ecosystem!
              </p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>

        <p class="text-white">
          Selected Index: {selectedIndexSig.value === -1 ? 'X' : selectedIndexSig.value}
        </p>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExampleTabsDeprecated>
  );
});
export const OnFocusIndexChange = component$(() => {
  const focusedIndexSig = useSignal(0);

  return (
    <PreviewCodeExampleTabsDeprecated>
      <div class="flex w-full flex-col items-center gap-4" q:slot="actualComponent">
        <AccordionRoot
          class="box-border w-[min(400px,_100%)] rounded-sm border-[1px] border-slate-600 bg-slate-700 text-white"
          onFocusIndexChange$={(index) => {
            focusedIndexSig.value = index;
          }}
        >
          <AccordionItem>
            <AccordionHeader>
              <AccordionTrigger class="group flex w-full items-center justify-between rounded-t-sm border-b-[1px] border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                <span>Is Qwik Production Ready?</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-slate-900 p-4 ">
                Yes! Since 1.0 back in May, Qwik apps are great for production.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader>
              <AccordionTrigger class="group flex w-full items-center justify-between border-b-[1px] border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                <span>Why is Qwik so fast?</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-slate-900 p-4">
                Because you're doing less work! Thanks to resumability we execute
                JavaScript on interaction.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader>
              <AccordionTrigger class="group flex w-full items-center justify-between bg-slate-700 px-4 py-2 text-left hover:bg-slate-800 aria-expanded:rounded-none">
                <span>What if I want to use React?</span>
                <span class="flex pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="border-t-[1px] border-slate-600 bg-slate-900 p-4">
                Check out Qwik-React! It allows you to partially hydrate React components
                into your Qwik app.
              </p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>

        <p class="text-white">
          Focused Index: {focusedIndexSig.value === -1 ? 'X' : focusedIndexSig.value}
        </p>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExampleTabsDeprecated>
  );
});

interface DynamicAccordionProps {
  itemIndexToDelete?: number;
  itemIndexToAdd?: number;
  itemsLength: number;
}

export const DynamicAccordion = component$(
  ({ itemsLength = 3 }: DynamicAccordionProps) => {
    const itemIndexToAdd = useSignal<string>('0');
    const itemIndexToDelete = useSignal<string>('0');

    // start off with some items
    const items = [];
    const newItem = { label: 'New Item', id: Math.random() };

    for (let i = 0; i < itemsLength; i++) {
      items.push({
        label: `Original Item ${i + 1}`,
        id: Math.random(),
      });
    }

    const itemStore = useStore<{ label: string; id: number }[]>(items);

    return (
      <PreviewCodeExampleTabsDeprecated>
        <div
          class="flex w-full flex-col items-center text-white"
          q:slot="actualComponent"
        >
          <div class="flex gap-4">
            <label class="mb-4 flex flex-col-reverse items-center text-center">
              <input
                class="max-w-[50px] rounded-md bg-slate-700 px-2"
                type="text"
                bind:value={itemIndexToAdd}
              />
              <span>Index to Add</span>
            </label>

            <label class="mb-4 flex flex-col-reverse items-center text-center">
              <input
                class="max-w-[50px] rounded-md bg-slate-700 px-2"
                type="text"
                bind:value={itemIndexToDelete}
              />
              <span>Index to Delete</span>
            </label>
          </div>

          <AccordionRoot class="box-border w-[min(400px,_100%)] rounded-sm border-[1px] border-t-0 border-slate-600 bg-slate-700 text-white">
            {itemStore.map(({ label, id }, index) => {
              return (
                <AccordionItem id={`${id}`} key={id}>
                  <AccordionHeader>
                    <AccordionTrigger class="group flex w-full items-center justify-between rounded-t-sm border-t-[1px] border-slate-600 border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                      {label}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent class="border-t-[1px] border-slate-600 bg-slate-900 p-4">
                    index: {index}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </AccordionRoot>
          <div class="flex gap-2 md:gap-4">
            <button
              style={{ color: 'green', marginTop: '1rem' }}
              onClick$={() => {
                if (itemStore.length < 6) {
                  itemStore.splice(parseInt(itemIndexToAdd.value), 0, newItem);
                }
              }}
            >
              <strong>Add Item</strong>
            </button>
            <button
              style={{ color: 'red', marginTop: '1rem' }}
              onClick$={() => {
                if (itemStore.length > 2) {
                  itemStore.splice(parseInt(itemIndexToDelete.value), 1);
                }
              }}
            >
              <strong>Remove Item</strong>
            </button>
          </div>
        </div>

        <div q:slot="codeExample">
          <Slot />
        </div>
      </PreviewCodeExampleTabsDeprecated>
    );
  },
);

export function SVG(props: QwikIntrinsicElements['svg'], key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 1024 1024"
      {...props}
    >
      <path
        fill="currentColor"
        d="M831.872 340.864L512 652.672L192.128 340.864a30.592 30.592 0 0 0-42.752 0a29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728a30.592 30.592 0 0 0-42.752 0z"
      ></path>
    </svg>
  );
}
