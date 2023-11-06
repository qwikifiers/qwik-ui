import { component$ } from '@builder.io/qwik';
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from '@qwik-ui/headless';
import { SVG } from './svg';

export default component$(() => {
  return (
    <>
      <div class="flex w-full justify-center">
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
    </>
  );
});
