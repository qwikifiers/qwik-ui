import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Accordion, AccordionItem } from '@qwik-ui/tailwind';

export default component$(() => {
  useStylesScoped$(`
    h1 { margin: 2rem 0; padding-top: 1rem; font-weight: bold; border-top: 1px dotted #222}
    .container { width: 300px } Accordion {border: 1px solid white}
  `);
  return (
    <>
      <div class="container">
        <h2>This is the documentation for the Accordion</h2>

        <h1>Accordion Example</h1>
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

        <h1>Accordion with Disabled Item Example</h1>
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
    </>
  );
});
