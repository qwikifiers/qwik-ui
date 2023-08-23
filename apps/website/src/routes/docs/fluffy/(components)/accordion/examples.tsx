import { component$, Slot } from '@builder.io/qwik';
import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
  Checkbox
} from '@qwik-ui/headless';
import { PreviewCodeExample } from '../../../_components/preview-code-example/preview-code-example';

export const Example01 = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <AccordionRoot
          behavior="single"
          class="bg-gray-100 dark:bg-gray-700 max-w-[25rem] rounded-xl border-slate-200 dark:border-gray-600 border-[1px] overflow-hidden"
        >
          <AccordionItem>
            <AccordionTrigger class="px-4 py-2 w-full bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 dark:hover:bg-gray-800  text-left dark:border-gray-600 border-b-[1px]">
              Can I add headings inside the accordion?
            </AccordionTrigger>
            <AccordionContent class="">
              <p class="bg-violet-200 dark:bg-gray-900 p-4">
                Yes, if you wrap a heading around the trigger, screen readers will
                announce it properly.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger class="px-4 py-2 w-full bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 dark:hover:bg-gray-800  text-left dark:border-gray-600 border-b-[1px]">
              Is it easy to animate?
            </AccordionTrigger>
            <AccordionContent>
              <p class="bg-violet-200 dark:bg-gray-900 p-4">
                Yup! Whether you'd like to use CSS transitions with flex-basis,
                grid-template columns, or use a JavaScript animation library, it's easy
                out of the box!
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger class="bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 px-4 py-2 w-full dark:hover:bg-gray-800 text-left">
              How about opening multiple items at once?
            </AccordionTrigger>
            <AccordionContent>
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

export const Example02 = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <AccordionRoot class="bg-slate-100 dark:bg-gray-700 w-80 rounded-xl border-slate-200 dark:border-gray-600 border-[1px] overflow-hidden">
          <AccordionItem class="px-4 py-2 w-full hover:bg-slate-300 dark:hover:bg-gray-800 border-slate-200 dark:border-gray-600 border-[1px] text-left">
            <AccordionTrigger>Is Qwik production-ready?</AccordionTrigger>
            <AccordionContent>
              <p class="bg-slate-200 dark:bg-gray-900 p-4">
                Yes, Qwik just hit a major milestone and launched v1.0! All API features
                are considered stable. Start building the future, today!
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem class="px-4 py-2 w-full hover:bg-slate-300 dark:hover:bg-gray-800 border-slate-200 dark:border-gray-600 border-[1px] text-left">
            <AccordionTrigger>
              Is there a UI library I can use with Qwik?
            </AccordionTrigger>
            <AccordionContent>
              <p class="bg-slate-200 dark:bg-gray-900 p-4">
                You're looking at one right now!
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem class="px-4 py-2 w-full hover:bg-slate-300 dark:hover:bg-gray-800 border-slate-200 dark:border-gray-600 border-[1px] text-left">
            <AccordionTrigger>How can I contribute to Qwik UI?</AccordionTrigger>
            <p class="bg-slate-200 dark:bg-gray-900 p-4">
              We're glad you asked. Come join us at the Qwikifiers Discord server or find
              the{` `}
              <a
                class="text-[var(--qwik-light-blue)] inline"
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
    </PreviewCodeExample>
  );
});

export const Example03 = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <AccordionRoot class="mt-4 p-4 bg-slate-800">
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
    </PreviewCodeExample>
  );
});
