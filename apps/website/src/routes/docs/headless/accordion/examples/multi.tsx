import { component$ } from '@builder.io/qwik';
import { Accordion } from '@qwik-ui/headless';
import SVG from './svg';

export default component$(() => {
  return (
    <>
      <div class="flex w-full justify-center">
        <Accordion.Root class="w-full" collapsible animated behavior="multi">
          <Accordion.Item class="border-b">
            <Accordion.Header as="h3">
              <Accordion.Trigger class="group flex w-full items-center justify-between rounded-t-sm  py-4 text-left hover:underline">
                <span>Can I style based on the trigger state?</span>
                <span class="pl-2">
                  <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content class="accordion-animation-1 overflow-hidden">
              <p class="pb-4">
                100%. The trigger has a <strong>[data-state]</strong> selector that can be
                styled when equal to the <strong>open</strong> or <strong>closed</strong>{' '}
                values.
                <br />
                <br />
                For example, [data-state="open"]
              </p>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item class="border-b">
            <Accordion.Header as="h3">
              <Accordion.Trigger class="group flex w-full items-center justify-between py-4 text-left hover:underline">
                <span>What about applying attributes?</span>
                <span class="pl-2">
                  <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content class="accordion-animation-1 overflow-hidden">
              <p class="pb-4">
                It's typed using <strong>PropsOf</strong>, meaning you can treat it like
                an element!
              </p>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item class="border-b">
            <Accordion.Header as="h3">
              <Accordion.Trigger class="group flex w-full items-center justify-between py-4 text-left hover:underline aria-expanded:rounded-none">
                <span>How about using event handlers?</span>
                <span class="pl-2">
                  <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content class="accordion-animation-1 overflow-hidden">
              <p class="pb-4">
                You can use onClick$, onKeyDown$, any handlers you'd normally use with
                Qwik!
              </p>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    </>
  );
});
