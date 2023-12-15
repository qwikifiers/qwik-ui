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
        <AccordionRoot class="w-[min(400px,_100%)] bg-slate-950 text-slate-50">
          <AccordionItem class="border-b border-slate-950">
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between rounded-t-sm bg-slate-700 p-4  text-left hover:underline">
                <span>I'm enabled!</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class=" bg-slate-950 p-4">
                Hey, I'm enabled! This is because I don't use the{' '}
                <strong>disabled</strong> prop on the trigger.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem class="border-b border-slate-950">
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between bg-slate-700 p-4  text-left hover:underline">
                <span>I'm enabled!</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class=" bg-slate-950 p-4">
                Hey, I'm enabled! This is because I don't use the{' '}
                <strong>disabled</strong> prop on the trigger.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem class="border-b border-slate-950 bg-slate-700">
            <h3>
              <AccordionTrigger
                disabled
                class="group flex w-full items-center justify-between p-4 text-left  hover:bg-slate-500 aria-disabled:cursor-not-allowed aria-expanded:rounded-none"
              >
                <span>
                  I'm <span class="bg-red-600 p-1 font-bold">disabled!</span>
                </span>
                <span class="flex pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </h3>
            <AccordionContent>
              <p class=" bg-slate-950 p-4">You shouldn't be able to see this!</p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>
    </>
  );
});
