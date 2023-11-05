import { Slot, component$, useSignal } from '@builder.io/qwik';
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from '@qwik-ui/headless';

export default component$(() => {
  const focusedIndexSig = useSignal(0);

  return (
    <>
      <div class="flex w-full flex-col items-center gap-4">
        <AccordionRoot
          class="box-border w-[min(400px,_100%)] rounded-sm border-[1px] border-slate-600 bg-slate-700 text-white"
          onFocusIndexChange$={(index) => {
            focusedIndexSig.value = index;
          }}
        >
          <AccordionItem>
            <AccordionHeader>
              <AccordionTrigger class="group flex w-full items-center justify-between rounded-t-sm border-b-[1px] border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                <span>Is Qwik Production Ready?</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-slate-900 p-4 ">
                Yes! Since 1.0 back in May, Qwik apps are great for production.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader>
              <AccordionTrigger class="group flex w-full items-center justify-between border-b-[1px] border-slate-600 bg-slate-700 px-4 py-2 text-left hover:bg-slate-800">
                <span>Why is Qwik so fast?</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="bg-slate-900 p-4">
                Because you're doing less work! Thanks to resumability we execute
                JavaScript on interaction.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader>
              <AccordionTrigger class="group flex w-full items-center justify-between bg-slate-700 px-4 py-2 text-left hover:bg-slate-800 aria-expanded:rounded-none">
                <span>What if I want to use React?</span>
                <span class="flex pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="border-t-[1px] border-slate-600 bg-slate-900 p-4">
                Check out Qwik-React! It allows you to partially hydrate React components
                into your Qwik app.
              </p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>

        <p class="text-white">
          Focused Index: {focusedIndexSig.value === -1 ? 'X' : focusedIndexSig.value}
        </p>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </>
  );
});
