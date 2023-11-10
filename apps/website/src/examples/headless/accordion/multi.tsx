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
    </>
  );
});
