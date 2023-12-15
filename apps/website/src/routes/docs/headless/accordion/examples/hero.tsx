import { component$ } from '@builder.io/qwik';
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from '@qwik-ui/headless';
import SVG from './svg';

export default component$(() => {
  return (
    <>
      <div class="flex w-full justify-center">
        <AccordionRoot
          animated
          enhance={true}
          class="w-[min(400px,_100%)] bg-slate-950 text-slate-50"
        >
          <AccordionItem class="border-b border-slate-950">
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between rounded-t-sm bg-slate-700 p-4 py-4 text-left hover:underline">
                <span>Can I add headings inside the accordion?</span>
                <span class="pl-2">
                  <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion-animation-1 overflow-hidden">
              <p class="bg-slate-950 p-4 pb-4">
                Yes, if you wrap the <strong>AccordionHeader</strong> component around the
                trigger, screen readers will announce it properly.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem class="border-b border-slate-950">
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between bg-slate-700 p-4 py-4 text-left hover:underline">
                <span>Is it easy to animate?</span>
                <span class="pl-2">
                  <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion-animation-1 overflow-hidden">
              <p class="bg-slate-950 p-4 pb-4">
                Yup! You can even use animations or CSS transitions using the{' '}
                <strong>animated</strong> prop on the accordion root!
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem class="border-b border-slate-950">
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between bg-slate-700 p-4 py-4 text-left hover:underline aria-expanded:rounded-none">
                <span>How about opening multiple items?</span>
                <span class="pl-2">
                  <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion-animation-1 overflow-hidden">
              <p class="bg-slate-950 p-4 pb-4">
                You can do that by setting the <strong>behavior</strong> prop to "multi"
                on the Accordion
              </p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>
    </>
  );
});
