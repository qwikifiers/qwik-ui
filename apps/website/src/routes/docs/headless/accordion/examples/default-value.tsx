import { component$ } from '@builder.io/qwik';
import { Accordion } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <div class="flex w-full justify-center">
        <Accordion.Root class="w-full">
          <Accordion.Item class="border-b">
            <Accordion.Header as="h3">
              <Accordion.Trigger class="group flex w-full items-center justify-between rounded-t-sm py-4 text-left hover:underline">
                <span>Not open by default.</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <p class="pb-4">I wasn't open by default!</p>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item defaultValue>
            <Accordion.Header as="h3">
              <Accordion.Trigger class="group flex w-full items-center justify-between py-4 text-left hover:underline">
                <span>I'm open!</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <p class="pb-4">
                You can open me by default by putting the <strong>defaultValue</strong>{' '}
                prop on the Accordion Item.
              </p>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item class="border-b">
            <h3>
              <Accordion.Trigger class="group flex w-full items-center justify-between py-4 text-left hover:underline aria-expanded:rounded-none">
                <span>Not open by default.</span>
                <span class="flex pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </Accordion.Trigger>
            </h3>
            <Accordion.Content>
              <p class="pb-4">I wasn't open by default!</p>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    </>
  );
});
