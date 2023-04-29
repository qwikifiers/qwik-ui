import { component$ } from '@builder.io/qwik';
import { Accordion, AccordionItem, Checkbox } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <h1 class="text-6xl font-bold mx-auto w-fit">Accordion</h1>
      <p class="text-xl mt-6 mx-auto w-fit">
        A vertically stacked set of interactive headings which reveal or hide
        their associated content.
      </p>

      {/* SHAI */}
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

        {/* MARCUS */}
        <section>
          <h2 class="text-2xl mt-6 font-medium">Building blocks</h2>
          <section class="mt-6 p-12 rounded-xl bg-slate-900 flex flex-col items-center">
            <pre class="flex flex-col self-start">
              <code>{`import { component$ } from '@builder.io/qwik';`}</code>
              <code>{`import { Accordion, AccordionItem } from '@qwik-ui/headless';`}</code>
              <code>{` `}</code>
              <code>{`export default component$(() => (`}</code>
              <code>{`  <Accordion>`}</code>
              <code>{`    <AccordionItem>`}</code>
              <code>{`      <p>Content</p>`}</code>
              <code>{`    </AccordionItem>`}</code>
              <code>{`  </Accordion>`}</code>
              <code>{`));`}</code>
            </pre>
          </section>
        </section>

        <section class="mt-6">
          <h2 class="text-2xl mt-6 font-medium">Examples</h2>
          <div class="flex flex-col gap-6 mt-6 p-8 bg-slate-700 rounded-xl">
            <article class="">
              <h3>Frequently Asked Questions</h3>
              <Accordion class="mt-4 p-4 bg-slate-800">
                <AccordionItem label="Is Qwik production-ready?">
                  <p>
                    Yes, Qwik just hit a major milestone and launched v1.0! All
                    API features are considered stable. Start building the
                    future, today!
                  </p>
                </AccordionItem>
                <AccordionItem label="Is there a UI library I can use with Qwik?">
                  <p>You're looking at one right now!</p>
                </AccordionItem>
                <AccordionItem label="How can I contribute to Qwik UI?">
                  <p>
                    We're glad you asked. Come join us at the Qwikifiers Discord
                    server or find the{' '}
                    <a
                      class="text-[var(--qwik-light-blue)]"
                      href="https://github.com/qwikifiers/qwik-ui"
                    >
                      Qwik UI repository
                    </a>{' '}
                    on GitHub!
                  </p>
                </AccordionItem>
              </Accordion>
            </article>
            <article>
              <h3>Filter</h3>
              <Accordion class="mt-4 p-4 bg-slate-800">
                <AccordionItem label="Availability">
                  <ul>
                    <li>
                      <Checkbox.Label htmlFor="in-stock">
                        <Checkbox.Root id="in-stock" />
                        In stock
                      </Checkbox.Label>
                    </li>
                    <li>
                      <Checkbox.Label htmlFor="in-stock">
                        <Checkbox.Root id="in-stock" />
                        Out of stock
                      </Checkbox.Label>
                    </li>
                    <li>
                      <Checkbox.Label htmlFor="in-stock">
                        <Checkbox.Root id="in-stock" />
                        Coming soon
                      </Checkbox.Label>
                    </li>
                  </ul>
                </AccordionItem>
                <AccordionItem label="Promotions">
                  <ul>
                    <li>
                      <Checkbox.Label htmlFor="in-stock">
                        <Checkbox.Root id="in-stock" />
                        50% off on selected products
                      </Checkbox.Label>
                    </li>
                    <li>
                      <Checkbox.Label htmlFor="in-stock">
                        <Checkbox.Root id="in-stock" />
                        Winter specials
                      </Checkbox.Label>
                    </li>
                  </ul>
                </AccordionItem>
                <AccordionItem label="Category">
                  <ul>
                    <li>
                      <Checkbox.Label htmlFor="in-stock">
                        <Checkbox.Root id="in-stock" />
                        Books
                      </Checkbox.Label>
                    </li>
                    <li>
                      <Checkbox.Label htmlFor="in-stock">
                        <Checkbox.Root id="in-stock" />
                        Stationery
                      </Checkbox.Label>
                    </li>
                    <li>
                      <Checkbox.Label htmlFor="in-stock">
                        <Checkbox.Root id="in-stock" />
                        Storage
                      </Checkbox.Label>
                    </li>
                  </ul>
                </AccordionItem>
              </Accordion>
            </article>
          </div>
        </section>

        {/* ITAI */}

        <section>
          <h2>Accessibility</h2>

          <h3>Keyboard interaction</h3>
        </section>

        <section>
          <h2>API</h2>
        </section>
      </article>
    </>
  );
});
