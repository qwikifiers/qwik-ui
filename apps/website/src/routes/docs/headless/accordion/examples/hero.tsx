import { component$ } from '@builder.io/qwik';
import { Accordion } from '@qwik-ui/headless';
import SVG from './svg';

export default component$(() => {
  return (
    <>
      <div class="flex w-full justify-center">
        <Accordion.Root class="w-full" animated enhance={true}>
          <Accordion.Item class="border-b">
            <Accordion.Header as="h3">
              <Accordion.Trigger class="group flex w-full items-center justify-between rounded-t-sm py-4 text-left hover:underline">
                <span>Can I add headings inside the accordion?</span>
                <span class="pl-2">
                  <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content class="accordion-animation-1 overflow-hidden">
              <p class="pb-4">
                Yes, if you wrap the <strong>Accordion.Header</strong> component around
                the trigger, screen readers will announce it properly.
              </p>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item class="border-b">
            <Accordion.Header as="h3">
              <Accordion.Trigger class="group flex w-full items-center justify-between py-4 text-left hover:underline">
                <span>Is it easy to animate?</span>
                <span class="pl-2">
                  <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content class="accordion-animation-1 overflow-hidden">
              <p class="pb-4">
                Yup! You can even use animations or CSS transitions using the{' '}
                <strong>animated</strong> prop on the accordion root!
              </p>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item class="border-b">
            <Accordion.Header as="h3">
              <Accordion.Trigger class="group flex w-full items-center justify-between py-4 text-left hover:underline aria-expanded:rounded-none">
                <span>How about opening multiple items?</span>
                <span class="pl-2">
                  <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content class="accordion-animation-1 overflow-hidden">
              <p class="pb-4">
                You can do that by setting the <strong>behavior</strong> prop to "multi"
                on the Accordion
              </p>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    </>
  );
});
