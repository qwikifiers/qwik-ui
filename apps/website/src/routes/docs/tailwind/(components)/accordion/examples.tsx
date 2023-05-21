import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik';
import { PreviewCodeExample } from '../../../../../components/preview-code-example/preview-code-example';
import { Accordion, AccordionItem } from '@qwik-ui/tailwind';

export const Example01 = component$(() => {
  useStylesScoped$(`
    h1 { margin: 2rem 0; padding-top: 1rem; font-weight: bold; border-top: 1px dotted #222}
    .container { width: 300px } Accordion {border: 1px solid white}
  `);
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Accordion>
          <AccordionItem label="Heading 1">
            <div class="p-2">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusamus aliquid architecto delectus deleniti dolor
              </p>
            </div>
          </AccordionItem>
          <AccordionItem label="Heading 2">
            <div class="p-2">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusamus aliquid architecto delectus deleniti dolor
              </p>
            </div>
          </AccordionItem>
        </Accordion>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const Example02 = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Accordion>
          <AccordionItem label="Heading 1">
            <div class="p-2">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusamus aliquid architecto delectus deleniti dolor
              </p>
            </div>
          </AccordionItem>
          <AccordionItem label="Heading 2 - Disabled" disabled>
            <div class="p-2">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusamus aliquid architecto delectus deleniti dolor
              </p>
            </div>
          </AccordionItem>
        </Accordion>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});
