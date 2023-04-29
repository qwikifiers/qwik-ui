import { component$ } from '@builder.io/qwik';
import { Accordion, AccordionItem } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <h1 class="text-6xl font-bold mx-auto w-fit">Accordion</h1>
      <p class="text-xl mt-6 mx-auto w-fit">
        A vertically stacked set of interactive headings which reveal or hide
        their associated content.
      </p>
      <article class="max-w-prose mx-auto">
        <section class="sm:-mx-12 mt-6 p-12 rounded-t-xl bg-slate-700 flex flex-col items-center">
          <div>
            <Accordion class="p-4 bg-slate-800 w-60">
              <AccordionItem class="" label="Heading 1">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Accusamus aliquid architecto delectus deleniti dolor
                </p>
              </AccordionItem>
              <AccordionItem class="" label="Heading 2">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Accusamus aliquid architecto delectus deleniti dolor
                </p>
              </AccordionItem>
              <AccordionItem
                label="Heading 3"
                disabled
                class="disabled:cursor-not-allowed text-gray-400"
              >
                <p>You can't see me!</p>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
        <section class="sm:-mx-12 p-12 rounded-b-xl bg-slate-900 flex flex-col items-center">
          <pre class="flex flex-col self-start">
            <code>{`<Accordion class="p-4 bg-slate-800 w-60">`}</code>
            <code>{`  <AccordionItem class="" label="Heading 1">`}</code>
            <code>{`    <p>`}</code>
            <code>{`      Lorem ipsum dolor sit amet, consectetur adipisicing elit.`}</code>
            <code>{`      Accusamus aliquid architecto delectus deleniti dolor`}</code>
            <code>{`    </p>`}</code>
            <code>{`  </AccordionItem>`}</code>
            <code>{`  <AccordionItem class="" label="Heading 2">`}</code>
            <code>{`    <p>`}</code>
            <code>{`      Lorem ipsum dolor sit amet, consectetur adipisicing elit.`}</code>
            <code>{`      Accusamus aliquid architecto delectus deleniti dolor`}</code>
            <code>{`    </p>`}</code>
            <code>{`  </AccordionItem>`}</code>
            <code>{`  <AccordionItem`}</code>
            <code>{`    label="Heading 3"`}</code>
            <code>{`    disabled`}</code>
            <code>{`    class="disabled:cursor-not-allowed text-gray-400"`}</code>
            <code>{`  >`}</code>
            <code>{`    <p>You can't see me!</p>`}</code>
            <code>{`  </AccordionItem>`}</code>
            <code>{`</Accordion>`}</code>
          </pre>
        </section>
      </article>
    </>
  );
});
