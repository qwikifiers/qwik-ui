import { component$ } from '@builder.io/qwik';

import {
  AccordionRoot,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@qwik-ui/headless';

export const Accordion = component$(() => {
  return (
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
            grid-template columns, or use a JavaScript animation library, it's
            easy out of the box!
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger class="bg-violet-50 hover:bg-violet-100 dark:bg-gray-700 px-4 py-2 w-full dark:hover:bg-gray-800 text-left">
          How about opening multiple items at once?
        </AccordionTrigger>
        <AccordionContent>
          <p class="bg-violet-200 dark:bg-gray-900 p-4 dark:border-gray-600 border-t-[1px]">
            You can do that by setting the <strong>behavior</strong> prop to
            "multi" on the Accordion
          </p>
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  );
});
