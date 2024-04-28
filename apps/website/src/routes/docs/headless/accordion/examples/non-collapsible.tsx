import { component$ } from '@builder.io/qwik';
import { Accordion } from '@qwik-ui/headless';
import SVG from './svg';

// non-collapsible
export default component$(() => {
  return (
    <>
      <div class="flex w-full justify-center">
        <Accordion.Root class="w-full" animated collapsible={false}>
          <Accordion.Item class="border-b">
            <Accordion.Header as="h3">
              <Accordion.Trigger class="group flex w-full items-center justify-between rounded-t-sm  py-4 text-left hover:underline">
                <span>How do I turn off collapsing?</span>
                <span class="pl-2">
                  <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content class="accordion-animation-1 overflow-hidden">
              <p class="pb-4">
                You can turn it off by setting the <strong>collapsible</strong> prop to
                false.
              </p>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item class="border-b">
            <Accordion.Header as="h3">
              <Accordion.Trigger class="group flex w-full items-center justify-between py-4 text-left hover:underline">
                <span>Can it be dynamic?</span>
                <span class="pl-2">
                  <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content class="accordion-animation-1 overflow-hidden">
              <p class="pb-4">Yes, there's a dynamic section further below.</p>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item class="border-b">
            <h3>
              <Accordion.Trigger class="group flex w-full items-center justify-between py-4 text-left hover:underline aria-expanded:rounded-none">
                <span>Can I reactively change stuff?</span>
                <span class="pl-2">
                  <SVG class="ease transition-transform duration-500 group-aria-expanded:rotate-180 group-aria-expanded:transform" />
                </span>
              </Accordion.Trigger>
            </h3>
            <Accordion.Content class="accordion-animation-1 overflow-hidden">
              <p class="pb-4">
                Of course! You can also use the onFocusIndexChange$ and
                onSelectedIndexChange$ custom events.
              </p>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    </>
  );
});
