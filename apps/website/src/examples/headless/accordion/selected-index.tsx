import { component$, Slot, useSignal } from '@builder.io/qwik';
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
          class="box-border w-[min(400px,_100%)] rounded-sm border-[1px] border-slate-600 bg-slate-700 text-white"
          onSelectedIndexChange$={(index) => {
            selectedIndexSig.value = index;
          }}
        >
          <AccordionItem>
            <AccordionHeader>
              <AccordionTrigger class="group flex w-full items-center justify-between rounded-t-sm border-b-[1px] border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                <span>Can I contribute to Qwik UI?</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-slate-900 p-4 ">
                Absolutely! You can reach out to us in the Qwikifiers discord.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader>
              <AccordionTrigger class="group flex w-full items-center justify-between border-b-[1px] border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                <span>How many people are learning Qwik?</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-slate-900 p-4">
                According to the 2023 <strong>stack overflow survey</strong>, it's close
                to the amount of people learning Remix already!
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader>
              <AccordionTrigger class="group flex w-full items-center justify-between bg-slate-700 px-4 py-2 text-left hover:bg-slate-800 aria-expanded:rounded-none">
                <span>What's the Qwikifiers discord?</span>
                <span class="flex pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="border-t-[1px] border-slate-600 bg-slate-900 p-4">
                A group of active contributors in the Qwik ecosystem!
              </p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>

        <p class="text-white">
          Selected Index: {selectedIndexSig.value === -1 ? 'X' : selectedIndexSig.value}
        </p>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </>
  );
});
