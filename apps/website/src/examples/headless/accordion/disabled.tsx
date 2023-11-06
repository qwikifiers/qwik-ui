import { component$, Slot } from '@builder.io/qwik';
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
        <AccordionRoot class="box-border w-[min(400px,_100%)] rounded-sm border-[1px] border-slate-600 bg-slate-700 text-white">
          <AccordionItem>
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between rounded-t-sm border-b-[1px] border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                <span>I'm enabled!</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-slate-900 p-4">
                Hey, I'm enabled! This is because I don't use the{' '}
                <strong>disabled</strong> prop on the trigger.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader as="h3">
              <AccordionTrigger class="group flex w-full items-center justify-between border-b-[1px] border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                <span>I'm enabled!</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-slate-900 p-4">
                Hey, I'm enabled! This is because I don't use the{' '}
                <strong>disabled</strong> prop on the trigger.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <h3>
              <AccordionTrigger
                disabled
                class="group flex w-full items-center justify-between bg-slate-700 px-4 py-2 text-left hover:bg-slate-800 aria-disabled:cursor-not-allowed aria-expanded:rounded-none"
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
              <p class="border-t-[1px] border-slate-600 bg-slate-900 p-4">
                You shouldn't be able to see this!
              </p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </>
  );
});
