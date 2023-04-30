import { component$, Slot } from '@builder.io/qwik';
import { Accordion, AccordionItem } from '@qwik-ui/headless';
import { PreviewCodeExample } from 'apps/website/src/components/preview-code-example/preview-code-example';

export const Example01 = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Accordion class="p-4 bg-slate-800 w-60">
          <AccordionItem class="" label="Heading 1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
            aliquid architecto delectus deleniti dolor
          </AccordionItem>
          <AccordionItem class="" label="Heading 2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
            aliquid architecto delectus deleniti dolor
          </AccordionItem>
          <AccordionItem
            label="Heading 3"
            disabled
            class="disabled:cursor-not-allowed text-gray-400"
          >
            You can't see me!
          </AccordionItem>
        </Accordion>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});
