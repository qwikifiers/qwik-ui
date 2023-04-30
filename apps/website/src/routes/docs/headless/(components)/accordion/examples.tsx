import { component$, Slot } from '@builder.io/qwik';
import { Accordion, AccordionItem, Checkbox } from '@qwik-ui/headless';
import { PreviewCodeExample } from '../../../../../components/preview-code-example/preview-code-example';

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

export const Example02 = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Accordion class="mt-4 p-4 bg-slate-800">
          <AccordionItem label="Is Qwik production-ready?">
            Yes, Qwik just hit a major milestone and launched v1.0! All API
            features are considered stable. Start building the future, today!
          </AccordionItem>
          <AccordionItem label="Is there a UI library I can use with Qwik?">
            You're looking at one right now!
          </AccordionItem>
          <AccordionItem label="How can I contribute to Qwik UI?">
            We're glad you asked. Come join us at the Qwikifiers Discord server
            or find the
            <a
              class="text-[var(--qwik-light-blue)] inline"
              href="https://github.com/qwikifiers/qwik-ui"
            >
              Qwik UI repository
            </a>
            on GitHub!
          </AccordionItem>
        </Accordion>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const Example03 = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Accordion class="mt-4 p-4 bg-slate-800">
          <AccordionItem label="Availability">
            <ul>
              <li>
                <Checkbox.Label class="flex" htmlFor="in-stock">
                  <Checkbox.Root id="in-stock" />
                  In stock
                </Checkbox.Label>
              </li>
              <li>
                <Checkbox.Label class="flex" htmlFor="out-of-stock">
                  <Checkbox.Root id="out-of-stock" />
                  Out of stock
                </Checkbox.Label>
              </li>
              <li>
                <Checkbox.Label class="flex" htmlFor="coming-soon">
                  <Checkbox.Root id="coming-soon" />
                  Coming soon
                </Checkbox.Label>
              </li>
            </ul>
          </AccordionItem>
          <AccordionItem label="Promotions">
            <ul>
              <li>
                <Checkbox.Label class="flex" htmlFor="fifty-off">
                  <Checkbox.Root id="fifty-off" />
                  50% off on selected products
                </Checkbox.Label>
              </li>
              <li>
                <Checkbox.Label class="flex" htmlFor="winter-special">
                  <Checkbox.Root id="winter-special" />
                  Winter specials
                </Checkbox.Label>
              </li>
            </ul>
          </AccordionItem>
          <AccordionItem label="Category">
            <ul>
              <li>
                <Checkbox.Label class="flex" htmlFor="books">
                  <Checkbox.Root id="books" />
                  Books
                </Checkbox.Label>
              </li>
              <li>
                <Checkbox.Label class="flex" htmlFor="stationery">
                  <Checkbox.Root id="stationery" />
                  Stationery
                </Checkbox.Label>
              </li>
              <li>
                <Checkbox.Label class="flex" htmlFor="storage">
                  <Checkbox.Root id="storage" />
                  Storage
                </Checkbox.Label>
              </li>
            </ul>
          </AccordionItem>
        </Accordion>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});
