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
        <AccordionRoot class="w-[min(400px,_100%)] bg-slate-950 text-slate-50">
          <AccordionItem class="border-b border-slate-950">
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between rounded-t-sm bg-slate-700 p-4  text-left hover:underline">
                <span>Not open by default.</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class=" bg-slate-950 p-4">I wasn't open by default!</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem defaultValue class="border-b border-slate-950">
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between bg-slate-700 p-4  text-left hover:underline">
                <span>I'm open!</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class=" bg-slate-950 p-4">
                You can open me by default by putting the <strong>defaultValue</strong>{' '}
                prop on the Accordion Item.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem class="border-b border-slate-950">
            <h3>
              <AccordionTrigger class="group flex w-full items-center justify-between bg-slate-700 p-4  text-left hover:underline aria-expanded:rounded-none">
                <span>Not open by default.</span>
                <span class="flex pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </h3>
            <AccordionContent>
              <p class=" bg-slate-950 p-4">I wasn't open by default!</p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>
    </>
  );
});
