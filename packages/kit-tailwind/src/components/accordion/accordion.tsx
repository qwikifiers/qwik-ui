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
      class="max-w-[25rem] overflow-hidden rounded-xl border border-slate-200 bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
    >
      <AccordionItem class="border-b">
        <AccordionTrigger class="w-full border-b bg-violet-50 px-4 py-2 text-left hover:bg-violet-100  dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800">
          Can I add headings inside the accordion?
        </AccordionTrigger>
        <AccordionContent>
          <p class="bg-violet-200 p-4 dark:bg-gray-900">
            Yes, if you wrap a heading around the trigger, screen readers will announce it
            properly.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem class="border-b">
        <AccordionTrigger class="w-full border-b bg-violet-50 px-4 py-2 text-left hover:bg-violet-100  dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800">
          Is it easy to animate?
        </AccordionTrigger>
        <AccordionContent>
          <p class="bg-violet-200 p-4 dark:bg-gray-900">
            Yup! Whether you'd like to use CSS transitions with flex-basis, grid-template
            columns, or use a JavaScript animation library, it's easy out of the box!
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem class="border-b">
        <AccordionTrigger class="w-full bg-violet-50 px-4 py-2 text-left hover:bg-violet-100 dark:bg-gray-700 dark:hover:bg-gray-800">
          How about opening multiple items at once?
        </AccordionTrigger>
        <AccordionContent>
          <p class="border-t bg-violet-200 p-4 dark:border-gray-600 dark:bg-gray-900">
            You can do that by setting the <strong>behavior</strong> prop to "multi" on
            the Accordion
          </p>
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  );
});
