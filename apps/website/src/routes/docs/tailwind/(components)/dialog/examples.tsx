import { component$, Slot } from '@builder.io/qwik';
import {
  Accordion,
  AccordionItem,
  Button,
  Checkbox,
  Dialog,
} from '@qwik-ui/tailwind';
import { PreviewCodeExample } from '../../../../../components/preview-code-example/preview-code-example';

export const Example01 = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Dialog.Root>
          <Dialog.Trigger>
            <button>Open Dialog</button>
          </Dialog.Trigger>
          <Dialog.Portal>
            Hello World
            <Dialog.Close>
              <Button>Close</Button>
            </Dialog.Close>
          </Dialog.Portal>
        </Dialog.Root>
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
        <Accordion class="bg-slate-100 dark:bg-gray-700 w-80 rounded-xl border-slate-200 dark:border-gray-600 border-[1px] overflow-hidden">
          <AccordionItem
            class="px-4 py-2 w-full hover:bg-slate-300 dark:hover:bg-gray-800 border-slate-200 dark:border-gray-600 border-[1px] text-left"
            label="Is Qwik production-ready?"
          >
            <p class="bg-slate-200 dark:bg-gray-900 p-4">
              Yes, Qwik just hit a major milestone and launched v1.0! All API
              features are considered stable. Start building the future, today!
            </p>
          </AccordionItem>
          <AccordionItem
            class="px-4 py-2 w-full hover:bg-slate-300 dark:hover:bg-gray-800 border-slate-200 dark:border-gray-600 border-[1px] text-left"
            label="Is there a UI library I can use with Qwik?"
          >
            <p class="bg-slate-200 dark:bg-gray-900 p-4">
              You're looking at one right now!
            </p>
          </AccordionItem>
          <AccordionItem
            class="px-4 py-2 w-full hover:bg-slate-300 dark:hover:bg-gray-800 border-slate-200 dark:border-gray-600 border-[1px] text-left"
            label="How can I contribute to Qwik UI?"
          >
            <p class="bg-slate-200 dark:bg-gray-900 p-4">
              We're glad you asked. Come join us at the Qwikifiers Discord
              server or find the{` `}
              <a
                class="text-[var(--qwik-light-blue)] inline"
                href="https://github.com/qwikifiers/qwik-ui"
              >
                Qwik UI repository
              </a>
              {` `}
              on GitHub!
            </p>
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
                <Checkbox.Label class="flex" for="in-stock">
                  <Checkbox.Root id="in-stock" />
                  In stock
                </Checkbox.Label>
              </li>
              <li>
                <Checkbox.Label class="flex" for="out-of-stock">
                  <Checkbox.Root id="out-of-stock" />
                  Out of stock
                </Checkbox.Label>
              </li>
              <li>
                <Checkbox.Label class="flex" for="coming-soon">
                  <Checkbox.Root id="coming-soon" />
                  Coming soon
                </Checkbox.Label>
              </li>
            </ul>
          </AccordionItem>
          <AccordionItem label="Promotions">
            <ul>
              <li>
                <Checkbox.Label class="flex" for="fifty-off">
                  <Checkbox.Root id="fifty-off" />
                  50% off on selected products
                </Checkbox.Label>
              </li>
              <li>
                <Checkbox.Label class="flex" for="winter-special">
                  <Checkbox.Root id="winter-special" />
                  Winter specials
                </Checkbox.Label>
              </li>
            </ul>
          </AccordionItem>
          <AccordionItem label="Category">
            <ul>
              <li>
                <Checkbox.Label class="flex" for="books">
                  <Checkbox.Root id="books" />
                  Books
                </Checkbox.Label>
              </li>
              <li>
                <Checkbox.Label class="flex" for="stationery">
                  <Checkbox.Root id="stationery" />
                  Stationery
                </Checkbox.Label>
              </li>
              <li>
                <Checkbox.Label class="flex" for="storage">
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
