import { component$ } from '@builder.io/qwik';
import { Accordion } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <div class="flex w-full justify-center">
        <Accordion.Root class="w-full">
          <Accordion.Item class="border-b">
            <Accordion.Header as="h4">
              <Accordion.Trigger class="group flex w-full items-center justify-between rounded-t-sm py-4 text-left hover:underline">
                <span>I'm an h4</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <p class="pb-4">My Heading is an h4!</p>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item class="border-b">
            <Accordion.Header as="h5">
              <Accordion.Trigger class="group flex w-full items-center justify-between py-4 text-left hover:underline">
                <span>I'm an h5</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <p class="pb-4">My Heading is an h5!</p>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item class="border-b">
            <Accordion.Header as="h6">
              <Accordion.Trigger class="group flex w-full items-center justify-between py-4 text-left hover:underline aria-expanded:rounded-none">
                <span>I'm an h6</span>
                <span class="flex pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <p class="pb-4">My Heading is an h6!</p>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    </>
  );
});
