import {
  component$,
  QwikIntrinsicElements,
  Slot,
  useSignal,
  useStore
} from '@builder.io/qwik';
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger
} from '@qwik-ui/headless';
import { PreviewCodeExample } from '../../../_components/preview-code-example/preview-code-example';

export const HeroAccordion = component$(() => {
  return (
    <PreviewCodeExample>
      <div class="w-full flex justify-center" q:slot="actualComponent">
        <AccordionRoot
          animated
          class="bg-gray-100 dark:bg-gray-700 rounded-sm border-slate-200 dark:border-gray-600 border-[1px] box-border w-[min(400px,_100%)]"
        >
          <AccordionItem>
            <AccordionHeader as="h3">
              <AccordionTrigger class="px-4 py-2 w-full bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 dark:hover:bg-gray-800  text-left dark:border-gray-600 border-b-[1px] flex items-center justify-between group rounded-t-sm">
                <span>Can I add headings inside the accordion?</span>
                <span class="pl-2">
                  <SVG class="group-aria-expanded:transform group-aria-expanded:rotate-180 transition-transform duration-500 ease" />
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion-animation-1 overflow-hidden">
              <p class="bg-violet-200 dark:bg-gray-900 p-4 ">
                Yes, if you wrap the <strong>AccordionHeader</strong> component around the
                trigger, screen readers will announce it properly.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader as="h3">
              <AccordionTrigger class="px-4 py-2 w-full bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 dark:hover:bg-gray-800  text-left dark:border-gray-600 border-b-[1px] flex items-center justify-between group">
                <span>Is it easy to animate?</span>
                <span class="pl-2">
                  <SVG class="group-aria-expanded:transform group-aria-expanded:rotate-180 transition-transform duration-500 ease" />
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion-animation-1 overflow-hidden">
              <p class="bg-violet-200 dark:bg-gray-900 p-4">
                Yup! You can even use animations or CSS transitions using the{' '}
                <strong>animated</strong> prop on the accordion root!
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader as="h3">
              <AccordionTrigger class="bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 px-4 py-2 w-full dark:hover:bg-gray-800 text-left flex items-center justify-between group aria-expanded:rounded-none">
                <span>How about opening multiple items?</span>
                <span class="pl-2">
                  <SVG class="group-aria-expanded:transform group-aria-expanded:rotate-180 transition-transform duration-500 ease" />
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion-animation-1 overflow-hidden">
              <p class="bg-violet-200 dark:bg-gray-900 p-4 dark:border-gray-600 border-t-[1px]">
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
    </PreviewCodeExample>
  );
});

export const MultiAccordion = component$(() => {
  return (
    <PreviewCodeExample>
      <div class="w-full flex justify-center" q:slot="actualComponent">
        <AccordionRoot
          collapsible
          animated
          behavior="multi"
          class="bg-gray-100 dark:bg-gray-700 rounded-sm border-slate-200 dark:border-gray-600 border-[1px] box-border w-[min(400px,_100%)]"
        >
          <AccordionItem>
            <AccordionHeader as="h3">
              <AccordionTrigger class="px-4 py-2 w-full bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 dark:hover:bg-gray-800  text-left dark:border-gray-600 border-b-[1px] flex items-center justify-between group rounded-t-sm">
                <span>Can I style based on the trigger state?</span>
                <span class="pl-2">
                  <p class="group-aria-expanded:transform group-aria-expanded:rotate-45 transition-transform duration-500 ease scale-150">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion-animation-1 overflow-hidden">
              <p class="bg-violet-200 dark:bg-gray-900 p-4 ">
                100%. The trigger has a <strong>[data-state]</strong> selector that can be
                styled when opened or closed.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader as="h3">
              <AccordionTrigger class="px-4 py-2 w-full bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 dark:hover:bg-gray-800  text-left dark:border-gray-600 border-b-[1px] flex items-center justify-between group">
                <span>What about applying attributes?</span>
                <span class="pl-2">
                  <p class="group-aria-expanded:transform group-aria-expanded:rotate-45 transition-transform duration-500 ease scale-150">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion-animation-1 overflow-hidden">
              <p class="bg-violet-200 dark:bg-gray-900 p-4">
                It's typed using <strong>QwikIntrinsicElements</strong>, meaning you can
                treat it like an element!
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <h3>
              <AccordionTrigger class="bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 px-4 py-2 w-full dark:hover:bg-gray-800 text-left flex items-center justify-between group aria-expanded:rounded-none">
                <span>How about using event handlers?</span>
                <span class="pl-2 flex">
                  <p class="group-aria-expanded:transform group-aria-expanded:rotate-45 transition-transform duration-500 ease scale-150">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </h3>
            <AccordionContent class="accordion-animation-1 overflow-hidden">
              <p class="bg-violet-200 dark:bg-gray-900 p-4 dark:border-gray-600 border-t-[1px]">
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
    </PreviewCodeExample>
  );
});

// non-collapsible
export const NonCollapsibleAccordion = component$(() => {
  return (
    <PreviewCodeExample>
      <div class="w-full flex justify-center" q:slot="actualComponent">
        <AccordionRoot
          animated
          collapsible={false}
          class="bg-gray-100 dark:bg-gray-700 rounded-sm border-slate-200 dark:border-gray-600 border-[1px] box-border w-[min(400px,_100%)]"
        >
          <AccordionItem>
            <AccordionHeader as="h3">
              <AccordionTrigger class="px-4 py-2 w-full bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 dark:hover:bg-gray-800  text-left dark:border-gray-600 border-b-[1px] flex items-center justify-between group rounded-t-sm">
                <span>How do I turn off collapsing?</span>
                <span class="pl-2">
                  <p class="group-aria-expanded:transform group-aria-expanded:rotate-45 transition-transform duration-500 ease scale-150">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion-animation-1 overflow-hidden">
              <p class="bg-violet-200 dark:bg-gray-900 p-4 ">
                You can turn it off by setting the <strong>collapsible</strong> prop to
                false.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader as="h3">
              <AccordionTrigger class="px-4 py-2 w-full bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 dark:hover:bg-gray-800  text-left dark:border-gray-600 border-b-[1px] flex items-center justify-between group">
                <span>Can it be dynamic?</span>
                <span class="pl-2">
                  <p class="group-aria-expanded:transform group-aria-expanded:rotate-45 transition-transform duration-500 ease scale-150">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion-animation-1 overflow-hidden">
              <p class="bg-violet-200 dark:bg-gray-900 p-4">
                Yes, there's a dynamic section further below.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <h3>
              <AccordionTrigger class="bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 px-4 py-2 w-full dark:hover:bg-gray-800 text-left flex items-center justify-between group aria-expanded:rounded-none">
                <span>Can I reactively change stuff?</span>
                <span class="pl-2 flex">
                  <p class="group-aria-expanded:transform group-aria-expanded:rotate-45 transition-transform duration-500 ease scale-150">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </h3>
            <AccordionContent class="accordion-animation-1 overflow-hidden">
              <p class="bg-violet-200 dark:bg-gray-900 p-4 dark:border-gray-600 border-t-[1px]">
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
    </PreviewCodeExample>
  );
});

// disabled
export const DisabledAccordion = component$(() => {
  return (
    <PreviewCodeExample>
      <div class="w-full flex justify-center" q:slot="actualComponent">
        <AccordionRoot class="bg-gray-100 dark:bg-gray-700 rounded-sm border-slate-200 dark:border-gray-600 border-[1px] box-border w-[min(400px,_100%)]">
          <AccordionItem>
            <AccordionHeader as="h3">
              <AccordionTrigger class="px-4 py-2 w-full bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 dark:hover:bg-gray-800  text-left dark:border-gray-600 border-b-[1px] flex items-center justify-between group rounded-t-sm">
                <span>I'm enabled!</span>
                <span class="pl-2">
                  <p class="group-aria-expanded:transform group-aria-expanded:rotate-45 scale-150">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-violet-200 dark:bg-gray-900 p-4">
                Hey, I'm enabled! This is because I don't use the{' '}
                <strong>disabled</strong> prop on the trigger.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader as="h3">
              <AccordionTrigger class="px-4 py-2 w-full bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 dark:hover:bg-gray-800  text-left dark:border-gray-600 border-b-[1px] flex items-center justify-between group">
                <span>I'm enabled!</span>
                <span class="pl-2">
                  <p class="group-aria-expanded:transform group-aria-expanded:rotate-45 scale-150">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-violet-200 dark:bg-gray-900 p-4">
                Hey, I'm enabled! This is because I don't use the{' '}
                <strong>disabled</strong> prop on the trigger.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <h3>
              <AccordionTrigger
                disabled
                class="bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 px-4 py-2 w-full dark:hover:bg-gray-800 text-left flex items-center justify-between group aria-expanded:rounded-none aria-disabled:cursor-not-allowed"
              >
                <span>
                  I'm{' '}
                  <span class="font-bold" style="color: red">
                    disabled!
                  </span>
                </span>
                <span class="pl-2 flex">
                  <p class="group-aria-expanded:transform group-aria-expanded:rotate-45 scale-150">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </h3>
            <AccordionContent>
              <p class="bg-violet-200 dark:bg-gray-900 p-4 dark:border-gray-600 border-t-[1px]">
                You shouldn't be able to see this!
              </p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const DefaultValueAccordion = component$(() => {
  return (
    <PreviewCodeExample>
      <div class="w-full flex justify-center" q:slot="actualComponent">
        <AccordionRoot class="bg-gray-100 dark:bg-gray-700 rounded-sm border-slate-200 dark:border-gray-600 border-[1px] box-border w-[min(400px,_100%)]">
          <AccordionItem>
            <AccordionHeader as="h3">
              <AccordionTrigger class="px-4 py-2 w-full bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 dark:hover:bg-gray-800  text-left dark:border-gray-600 border-b-[1px] flex items-center justify-between group rounded-t-sm">
                <span>Not open by default.</span>
                <span class="pl-2">
                  <p class="group-aria-expanded:transform group-aria-expanded:rotate-45 scale-150">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-violet-200 dark:bg-gray-900 p-4 ">I wasn't open by default!</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem defaultValue>
            <AccordionHeader as="h3">
              <AccordionTrigger class="px-4 py-2 w-full bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 dark:hover:bg-gray-800  text-left dark:border-gray-600 border-b-[1px] flex items-center justify-between group">
                <span>I'm open!</span>
                <span class="pl-2">
                  <p class="group-aria-expanded:transform group-aria-expanded:rotate-45 scale-150">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-violet-200 dark:bg-gray-900 p-4">
                You can open me by default by putting the <strong>defaultValue</strong>{' '}
                prop on the Accordion Item.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <h3>
              <AccordionTrigger class="bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 px-4 py-2 w-full dark:hover:bg-gray-800 text-left flex items-center justify-between group aria-expanded:rounded-none">
                <span>Not open by default.</span>
                <span class="pl-2 flex">
                  <p class="group-aria-expanded:transform group-aria-expanded:rotate-45 scale-150">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </h3>
            <AccordionContent>
              <p class="bg-violet-200 dark:bg-gray-900 p-4 dark:border-gray-600 border-t-[1px]">
                I wasn't open by default!
              </p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const PolymorphicHeadingAccordion = component$(() => {
  return (
    <PreviewCodeExample>
      <div class="w-full flex justify-center" q:slot="actualComponent">
        <AccordionRoot class="bg-gray-100 dark:bg-gray-700 rounded-sm border-slate-200 dark:border-gray-600 border-[1px] box-border w-[min(400px,_100%)]">
          <AccordionItem>
            <AccordionHeader as="h4">
              <AccordionTrigger class="px-4 py-2 w-full bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 dark:hover:bg-gray-800  text-left dark:border-gray-600 border-b-[1px] flex items-center justify-between group rounded-t-sm">
                <span>I'm an h4</span>
                <span class="pl-2">
                  <p class="group-aria-expanded:transform group-aria-expanded:rotate-45 scale-150">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-violet-200 dark:bg-gray-900 p-4 ">My Heading is an h4!</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader as="h5">
              <AccordionTrigger class="px-4 py-2 w-full bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 dark:hover:bg-gray-800  text-left dark:border-gray-600 border-b-[1px] flex items-center justify-between group">
                <span>I'm an h5</span>
                <span class="pl-2">
                  <p class="group-aria-expanded:transform group-aria-expanded:rotate-45 scale-150">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-violet-200 dark:bg-gray-900 p-4">My Heading is an h5!</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader as="h6">
              <AccordionTrigger class="bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 px-4 py-2 w-full dark:hover:bg-gray-800 text-left flex items-center justify-between group aria-expanded:rounded-none">
                <span>I'm an h6</span>
                <span class="pl-2 flex">
                  <p class="group-aria-expanded:transform group-aria-expanded:rotate-45 scale-150">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-violet-200 dark:bg-gray-900 p-4 dark:border-gray-600 border-t-[1px]">
                My Heading is an h6!
              </p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const OnSelectedIndexChange = component$(() => {
  const selectedIndexSig = useSignal(0);

  return (
    <PreviewCodeExample>
      <div class="w-full flex flex-col items-center gap-4" q:slot="actualComponent">
        <AccordionRoot
          class="bg-gray-100 dark:bg-gray-700 rounded-sm border-slate-200 dark:border-gray-600 border-[1px] box-border w-[min(400px,_100%)]"
          onSelectedIndexChange$={(index) => {
            selectedIndexSig.value = index;
          }}
        >
          <AccordionItem>
            <AccordionHeader>
              <AccordionTrigger class="px-4 py-2 w-full bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 dark:hover:bg-gray-800  text-left dark:border-gray-600 border-b-[1px] flex items-center justify-between group rounded-t-sm">
                <span>Can I contribute to Qwik UI?</span>
                <span class="pl-2">
                  <p class="group-aria-expanded:transform group-aria-expanded:rotate-45 scale-150">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-violet-200 dark:bg-gray-900 p-4 ">
                Absolutely! You can reach out to us in the Qwikifiers discord.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader>
              <AccordionTrigger class="px-4 py-2 w-full bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 dark:hover:bg-gray-800  text-left dark:border-gray-600 border-b-[1px] flex items-center justify-between group">
                <span>How many people are learning Qwik?</span>
                <span class="pl-2">
                  <p class="group-aria-expanded:transform group-aria-expanded:rotate-45 scale-150">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-violet-200 dark:bg-gray-900 p-4">
                According to the 2023 <strong>stack overflow survey</strong>, it's close
                to the amount of people learning Remix already!
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader>
              <AccordionTrigger class="bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 px-4 py-2 w-full dark:hover:bg-gray-800 text-left flex items-center justify-between group aria-expanded:rounded-none">
                <span>What's the Qwikifiers discord?</span>
                <span class="pl-2 flex">
                  <p class="group-aria-expanded:transform group-aria-expanded:rotate-45 scale-150">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-violet-200 dark:bg-gray-900 p-4 dark:border-gray-600 border-t-[1px]">
                A group of active contributors in the Qwik ecosystem!
              </p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>

        <p>
          Selected Index: {selectedIndexSig.value === -1 ? 'X' : selectedIndexSig.value}
        </p>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});
export const OnFocusIndexChange = component$(() => {
  const focusedIndexSig = useSignal(0);

  return (
    <PreviewCodeExample>
      <div class="w-full flex flex-col items-center gap-4" q:slot="actualComponent">
        <AccordionRoot
          class="bg-gray-100 dark:bg-gray-700 rounded-sm border-slate-200 dark:border-gray-600 border-[1px] box-border w-[min(400px,_100%)]"
          onFocusIndexChange$={(index) => {
            focusedIndexSig.value = index;
          }}
        >
          <AccordionItem>
            <AccordionHeader>
              <AccordionTrigger class="px-4 py-2 w-full bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 dark:hover:bg-gray-800  text-left dark:border-gray-600 border-b-[1px] flex items-center justify-between group rounded-t-sm">
                <span>Is Qwik Production Ready?</span>
                <span class="pl-2">
                  <p class="group-aria-expanded:transform group-aria-expanded:rotate-45 scale-150">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-violet-200 dark:bg-gray-900 p-4 ">
                Yes! Since 1.0 back in May, Qwik apps are great for production.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader>
              <AccordionTrigger class="px-4 py-2 w-full bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 dark:hover:bg-gray-800  text-left dark:border-gray-600 border-b-[1px] flex items-center justify-between group">
                <span>Why is Qwik so fast?</span>
                <span class="pl-2">
                  <p class="group-aria-expanded:transform group-aria-expanded:rotate-45 scale-150">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-violet-200 dark:bg-gray-900 p-4">
                Because you're doing less work! Thanks to resumability we execute
                JavaScript on interaction.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader>
              <AccordionTrigger class="bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 px-4 py-2 w-full dark:hover:bg-gray-800 text-left flex items-center justify-between group aria-expanded:rounded-none">
                <span>What if I want to use React?</span>
                <span class="pl-2 flex">
                  <p class="group-aria-expanded:transform group-aria-expanded:rotate-45 scale-150">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-violet-200 dark:bg-gray-900 p-4 dark:border-gray-600 border-t-[1px]">
                Check out Qwik-React! It allows you to partially hydrate React components
                into your Qwik app.
              </p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>

        <p>Focused Index: {focusedIndexSig.value === -1 ? 'X' : focusedIndexSig.value}</p>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const DynamicAccordion = component$(() => {
  const itemStore = useStore<number[]>([1, 2]);

  return (
    <PreviewCodeExample>
      <div class="w-full flex flex-col items-center" q:slot="actualComponent">
        <AccordionRoot class="bg-gray-100 dark:bg-gray-700 rounded-sm border-slate-200 dark:border-gray-600 border-[1px] border-t-[0px] box-border w-[min(400px,_100%)]">
          {itemStore.map((itemNumber, index) => {
            return (
              <AccordionItem key={index}>
                <AccordionTrigger class="bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 px-4 py-2 w-full dark:hover:bg-gray-800 text-left flex items-center justify-between group aria-expanded:rounded-none border-t-[1px] border-slate-200 dark:border-gray-600">
                  <span>Trigger {itemNumber}</span>
                  <span class="pl-2 flex">
                    <p class="group-aria-expanded:transform group-aria-expanded:rotate-45 scale-150">
                      +
                    </p>
                  </span>
                </AccordionTrigger>
                <AccordionContent class="bg-violet-200 dark:bg-gray-900 p-4 border-t-[1px] dark:border-gray-600 border-slate-200">
                  Content {itemNumber}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </AccordionRoot>

        <div class="flex flex-col sm:flex-row gap-2 md:gap-4">
          <button
            style={{ color: 'green', marginTop: '1rem' }}
            onClick$={() => {
              if (itemStore.length < 4) {
                itemStore.push(itemStore.length + 1);
              }
            }}
          >
            <strong>Add Item</strong>
          </button>

          <button
            style={{ color: 'red', marginTop: '1rem' }}
            onClick$={() => {
              if (itemStore.length > 1) {
                itemStore.pop();
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
    </PreviewCodeExample>
  );
});

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
