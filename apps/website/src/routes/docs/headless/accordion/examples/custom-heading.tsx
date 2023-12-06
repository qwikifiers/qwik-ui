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
        <AccordionRoot class="w-[min(400px,_100%)]">
          <AccordionItem class="border-b">
            <AccordionHeader as="h4">
              <AccordionTrigger class="group flex w-full items-center justify-between rounded-t-sm py-4 text-left hover:underline">
                <span>I'm an h4</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="py-4 pt-0">My Heading is an h4!</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem class="border-b">
            <AccordionHeader as="h5">
              <AccordionTrigger class="group flex w-full items-center justify-between py-4 text-left hover:underline">
                <span>I'm an h5</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="py-4 pt-0">My Heading is an h5!</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem class="border-b">
            <AccordionHeader as="h6">
              <AccordionTrigger class="group flex w-full items-center justify-between py-4 text-left hover:underline aria-expanded:rounded-none">
                <span>I'm an h6</span>
                <span class="flex pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="py-4 pt-0">My Heading is an h6!</p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>
    </>
  );
});
