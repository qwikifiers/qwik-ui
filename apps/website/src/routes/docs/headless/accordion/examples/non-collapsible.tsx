import { component$ } from '@builder.io/qwik';
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from '@qwik-ui/headless';
import SVG from './svg';

// non-collapsible
export default component$(() => {
  return (
    <>
      <div class="flex w-full justify-center">
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
    </>
  );
});
