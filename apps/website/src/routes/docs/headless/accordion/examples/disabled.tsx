import { component$ } from '@builder.io/qwik';
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from '@qwik-ui/headless';

// disabled
export default component$(() => {
  return (
    <>
      <div class="flex w-full justify-center">
        <AccordionRoot class="w-[min(400px,_100%)]">
          <AccordionItem class="border-b">
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between rounded-t-sm py-4 text-left hover:underline">
                <span>I'm enabled!</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="py-4 pt-0">
                Hey, I'm enabled! This is because I don't use the{' '}
                <strong>disabled</strong> prop on the trigger.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem class="border-b">
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between py-4 text-left hover:underline">
                <span>I'm enabled!</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="py-4 pt-0">
                Hey, I'm enabled! This is because I don't use the{' '}
                <strong>disabled</strong> prop on the trigger.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem class="border-b">
            <h3>
              <AccordionTrigger
                disabled
                class="hover:bg-accent/50 group flex w-full items-center justify-between py-4 text-left aria-disabled:cursor-not-allowed aria-expanded:rounded-none"
              >
                <span>
                  I'm{' '}
                  <span class="font-bold" style="color: red">
                    disabled!
                  </span>
                </span>
                <span class="flex pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </h3>
            <AccordionContent>
              <p class="py-4 pt-0">You shouldn't be able to see this!</p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>
    </>
  );
});
