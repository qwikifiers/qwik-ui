import { component$, useSignal } from '@builder.io/qwik';
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
          class="w-[min(400px,_100%)]"
          onFocusIndexChange$={(index) => {
            focusedIndexSig.value = index;
          }}
        >
          <AccordionItem class="border-b">
            <AccordionHeader>
              <AccordionTrigger class="group flex w-full items-center justify-between rounded-t-sm py-4 text-left hover:underline">
                <span>Is Qwik Production Ready?</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="pb-4">
                Yes! Since 1.0 back in May, Qwik apps are great for production.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem class="border-b">
            <AccordionHeader>
              <AccordionTrigger class="group flex w-full items-center justify-between py-4 text-left hover:underline">
                <span>Why is Qwik so fast?</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="pb-4">
                Because you're doing less work! Thanks to resumability we execute
                JavaScript on interaction.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem class="border-b">
            <AccordionHeader>
              <AccordionTrigger class="group flex w-full items-center justify-between py-4 text-left hover:underline aria-expanded:rounded-none">
                <span>What if I want to use React?</span>
                <span class="flex pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <p class="pb-4">
                Check out Qwik-React! It allows you to partially hydrate React components
                into your Qwik app.
              </p>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>

        <p>Focused Index: {focusedIndexSig.value === -1 ? 'X' : focusedIndexSig.value}</p>
      </div>
    </>
  );
});
