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
          class="w-[min(400px,_100%)] bg-slate-950 text-slate-50"
        >
          <AccordionItem class="border-b border-slate-950">
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between rounded-t-sm bg-slate-700 p-4   text-left hover:underline">
                <span>How do I turn off collapsing?</span>
                <span class="pl-2">
                  <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion-animation-1 overflow-hidden">
              <p class=" bg-slate-950 p-4">
                You can turn it off by setting the <strong>collapsible</strong> prop to
                false.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem class="border-b border-slate-950">
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between bg-slate-700 p-4  text-left hover:underline">
                <span>Can it be dynamic?</span>
                <span class="pl-2">
                  <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent class="accordion-animation-1 overflow-hidden">
              <p class=" bg-slate-950 p-4">
                Yes, there's a dynamic section further below.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem class="border-b border-slate-950">
            <h3>
              <AccordionTrigger class="group flex w-full items-center justify-between bg-slate-700 p-4  text-left hover:underline aria-expanded:rounded-none">
                <span>Can I reactively change stuff?</span>
                <span class="pl-2">
                  <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
                </span>
              </AccordionTrigger>
            </h3>
            <AccordionContent class="accordion-animation-1 overflow-hidden">
              <p class=" bg-slate-950 p-4">
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
