import { component$, useSignal } from '@builder.io/qwik';
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from '@qwik-ui/headless';

export default component$(() => {
  const selectedIndexSig = useSignal(0);

  return (
    <>
      <div class="flex w-full flex-col items-center gap-4">
        <AccordionRoot
          class="w-[min(400px,_100%)]"
          onSelectedIndexChange$={(index) => {
            selectedIndexSig.value = index;
          }}
        >
          <AccordionItem class="border-b">
            <AccordionHeader>
              <AccordionTrigger class="group flex w-full items-center justify-between rounded-t-sm py-4 text-left hover:underline">
                <span>Can I contribute to Qwik UI?</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="pb-4">
                Absolutely! You can reach out to us in the Qwikifiers discord.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem class="border-b">
            <AccordionHeader>
              <AccordionTrigger class="group flex w-full items-center justify-between py-4 text-left hover:underline">
                <span>How many people are learning Qwik?</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="pb-4">
                According to the 2023 <strong>stack overflow survey</strong>, it's close
                to the amount of people learning Remix already!
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem class="border-b">
            <AccordionHeader>
              <AccordionTrigger class="group flex w-full items-center justify-between py-4 text-left hover:underline aria-expanded:rounded-none">
                <span>What's the Qwikifiers discord?</span>
                <span class="flex pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="pb-4">A group of active contributors in the Qwik ecosystem!</p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>

        <p>
          Selected Index: {selectedIndexSig.value === -1 ? 'X' : selectedIndexSig.value}
        </p>
      </div>
    </>
  );
});
