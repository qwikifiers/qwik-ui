import { component$, QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import {
  AccordionRoot,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from '@qwik-ui/headless';
import { PreviewCodeExample } from '../../../../../components/preview-code-example/preview-code-example';

// single
export const Example01 = component$(() => {
  return (
    <PreviewCodeExample>
      <div class="w-full flex justify-center" q:slot="actualComponent">
        <AccordionRoot
          collapsible
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
            <AccordionContent class="accordion-animation-1">
              <p class="bg-violet-200 dark:bg-gray-900 p-4 ">
                Yes, if you wrap a heading around the trigger, screen readers
                will announce it properly.
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
            <AccordionContent class="accordion-animation-1">
              <p class="bg-violet-200 dark:bg-gray-900 p-4">
                Yup! You can even use animations or CSS transitions from display
                none, using the <strong>animated</strong> prop on the accordion
                root!
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
            <AccordionContent class="accordion-animation-1">
              <p class="bg-violet-200 dark:bg-gray-900 p-4 dark:border-gray-600 border-t-[1px]">
                You can do that by setting the <strong>behavior</strong> prop to
                "multi" on the Accordion
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

// multiple items
export const Example02 = component$(() => {
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
            <AccordionContent class="accordion-animation-1">
              <p class="bg-violet-200 dark:bg-gray-900 p-4 ">
                100%. The trigger has a <strong>[data-state]</strong> selector
                that can be styled when opened or closed.
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
            <AccordionContent class="accordion-animation-1">
              <p class="bg-violet-200 dark:bg-gray-900 p-4">
                It's typed using <strong>QwikIntrinsicElements</strong>, meaning
                you can treat it like an element!
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
            <AccordionContent class="accordion-animation-1">
              <p class="bg-violet-200 dark:bg-gray-900 p-4 dark:border-gray-600 border-t-[1px]">
                You can use onClick$, onKeyDown$, any handlers you'd normally
                use with Qwik!
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
export const Example03 = component$(() => {
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
            <AccordionContent class="accordion-animation-1">
              <p class="bg-violet-200 dark:bg-gray-900 p-4 ">
                You can turn it off by setting the <strong>collapsible</strong>{' '}
                prop to false.
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
            <AccordionContent class="accordion-animation-1">
              <p class="bg-violet-200 dark:bg-gray-900 p-4">
                It's typed using <strong>QwikIntrinsicElements</strong>, meaning
                you can treat it like an element!
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
            <AccordionContent class="accordion-animation-1">
              <p class="bg-violet-200 dark:bg-gray-900 p-4 dark:border-gray-600 border-t-[1px]">
                You can use onClick$, onKeyDown$, any handlers you'd normally
                use with Qwik!
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
export const Example04 = component$(() => {
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
              <p class="bg-violet-200 dark:bg-gray-900 p-4 ">
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
                  <span class="text-[#f87171] dark:text-[#dc2626] font-bold">
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
          <AccordionItem defaultValue>
            <AccordionHeader as="h3">
              <AccordionTrigger class="px-4 py-2 w-full bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 dark:hover:bg-gray-800  text-left dark:border-gray-600 border-b-[1px] flex items-center justify-between group rounded-t-sm">
                <span>I'm open!</span>
                <span class="pl-2">
                  <p class="group-aria-expanded:transform group-aria-expanded:rotate-45 scale-150">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-violet-200 dark:bg-gray-900 p-4 ">
                Hey, I'm enabled! This is because I don't use the{' '}
                <strong>disabled</strong> prop on the trigger.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader as="h3">
              <AccordionTrigger class="px-4 py-2 w-full bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 dark:hover:bg-gray-800  text-left dark:border-gray-600 border-b-[1px] flex items-center justify-between group">
                <span>Not open by default.</span>
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
