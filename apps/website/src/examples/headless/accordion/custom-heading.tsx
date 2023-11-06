import { component$ } from '@builder.io/qwik';
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <div class="flex w-full justify-center">
        <AccordionRoot class="box-border w-[min(400px,_100%)] rounded-sm border-[1px] border-slate-600 bg-slate-700 text-white">
          <AccordionItem>
            <AccordionHeader as="h4">
              <AccordionTrigger class="group flex w-full items-center justify-between rounded-t-sm border-b-[1px] border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                <span>I'm an h4</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-slate-900 p-4 ">My Heading is an h4!</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader as="h5">
              <AccordionTrigger class="group flex w-full items-center justify-between border-b-[1px] border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                <span>I'm an h5</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-slate-900 p-4">My Heading is an h5!</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader as="h6">
              <AccordionTrigger class="group flex w-full items-center justify-between bg-slate-700 px-4 py-2 text-left hover:bg-slate-800 aria-expanded:rounded-none">
                <span>I'm an h6</span>
                <span class="flex pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="border-t-[1px] border-slate-600 bg-slate-900 p-4">
                My Heading is an h6!
              </p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>
    </>
  );
});
