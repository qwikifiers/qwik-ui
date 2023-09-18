import { component$, Slot } from '@builder.io/qwik';
import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
  Checkbox,
} from '@qwik-ui/headless';
import { PreviewCodeExampleTabs } from '../../../_components/preview-code-example/preview-code-example-tabs';

export const Example01 = component$(() => {
  return (
    <PreviewCodeExampleTabs>
      <div q:slot="actualComponent">
        <AccordionRoot
          behavior="single"
          class="max-w-[25rem] overflow-hidden rounded-xl border-[1px] border-slate-200 bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
        >
          <AccordionItem>
            <AccordionTrigger class="w-full border-b-[1px] bg-violet-50 px-4 py-2 text-left hover:bg-violet-100  dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800">
              Can I add headings inside the accordion?
            </AccordionTrigger>
            <AccordionContent class="">
              <p class="bg-violet-200 p-4 dark:bg-gray-900">
                Yes, if you wrap a heading around the trigger, screen readers will
                announce it properly.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger class="w-full border-b-[1px] bg-violet-50 px-4 py-2 text-left hover:bg-violet-100  dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800">
              Is it easy to animate?
            </AccordionTrigger>
            <AccordionContent>
              <p class="bg-violet-200 p-4 dark:bg-gray-900">
                Yup! Whether you'd like to use CSS transitions with flex-basis,
                grid-template columns, or use a JavaScript animation library, it's easy
                out of the box!
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger class="w-full bg-violet-50 px-4 py-2 text-left hover:bg-violet-100 dark:bg-gray-700 dark:hover:bg-gray-800">
              How about opening multiple items at once?
            </AccordionTrigger>
            <AccordionContent>
              <p class="border-t-[1px] bg-violet-200 p-4 dark:border-gray-600 dark:bg-gray-900">
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
    </PreviewCodeExampleTabs>
  );
});

export const Example02 = component$(() => {
  return (
    <PreviewCodeExampleTabs>
      <div q:slot="actualComponent">
        <AccordionRoot class="w-80 overflow-hidden rounded-xl border-[1px] border-slate-200 bg-slate-100 dark:border-gray-600 dark:bg-gray-700">
          <AccordionItem class="w-full border-[1px] border-slate-200 px-4 py-2 text-left hover:bg-slate-300 dark:border-gray-600 dark:hover:bg-gray-800">
            <AccordionTrigger>Is Qwik production-ready?</AccordionTrigger>
            <AccordionContent>
              <p class="bg-slate-200 p-4 dark:bg-gray-900">
                Yes, Qwik just hit a major milestone and launched v1.0! All API features
                are considered stable. Start building the future, today!
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem class="w-full border-[1px] border-slate-200 px-4 py-2 text-left hover:bg-slate-300 dark:border-gray-600 dark:hover:bg-gray-800">
            <AccordionTrigger>
              Is there a UI library I can use with Qwik?
            </AccordionTrigger>
            <AccordionContent>
              <p class="bg-slate-200 p-4 dark:bg-gray-900">
                You're looking at one right now!
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem class="w-full border-[1px] border-slate-200 px-4 py-2 text-left hover:bg-slate-300 dark:border-gray-600 dark:hover:bg-gray-800">
            <AccordionTrigger>How can I contribute to Qwik UI?</AccordionTrigger>
            <p class="bg-slate-200 p-4 dark:bg-gray-900">
              We're glad you asked. Come join us at the Qwikifiers Discord server or find
              the{` `}
              <a
                class="inline text-[var(--qwik-light-blue)]"
                href="https://github.com/qwikifiers/qwik-ui"
              >
                Qwik UI repository
              </a>
              {` `}
              on GitHub!
            </p>
          </AccordionItem>
        </AccordionRoot>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExampleTabs>
  );
});

export const Example03 = component$(() => {
  return (
    <PreviewCodeExampleTabs>
      <div q:slot="actualComponent">
        <AccordionRoot class="mt-4 bg-slate-800 p-4">
          <AccordionItem>
            <AccordionTrigger>Availability</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <Checkbox.Label class="flex" htmlFor="in-stock">
                    <Checkbox.Root id="in-stock" />
                    In stock
                  </Checkbox.Label>
                </li>
                <li>
                  <Checkbox.Label class="flex" htmlFor="out-of-stock">
                    <Checkbox.Root id="out-of-stock" />
                    Out of stock
                  </Checkbox.Label>
                </li>
                <li>
                  <Checkbox.Label class="flex" htmlFor="coming-soon">
                    <Checkbox.Root id="coming-soon" />
                    Coming soon
                  </Checkbox.Label>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>Promotions</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  <Checkbox.Label class="flex" htmlFor="fifty-off">
                    <Checkbox.Root id="fifty-off" />
                    50% off on selected products
                  </Checkbox.Label>
                </li>
                <li>
                  <Checkbox.Label class="flex" htmlFor="winter-special">
                    <Checkbox.Root id="winter-special" />
                    Winter specials
                  </Checkbox.Label>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>Category</AccordionTrigger>
            <ul>
              <li>
                <Checkbox.Label class="flex" htmlFor="books">
                  <Checkbox.Root id="books" />
                  Books
                </Checkbox.Label>
              </li>
              <li>
                <Checkbox.Label class="flex" htmlFor="stationery">
                  <Checkbox.Root id="stationery" />
                  Stationery
                </Checkbox.Label>
              </li>
              <li>
                <Checkbox.Label class="flex" htmlFor="storage">
                  <Checkbox.Root id="storage" />
                  Storage
                </Checkbox.Label>
              </li>
            </ul>
          </AccordionItem>
        </AccordionRoot>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExampleTabs>
  );
});
