import { component$ } from '@builder.io/qwik';
import { Accordion } from '@qwik-ui/headless';

// disabled
export default component$(() => {
  return (
    <>
      <div class="flex w-full justify-center">
        <Accordion.Root class="w-full">
          <Accordion.Item class="border-b">
            <Accordion.Header as="h3">
              <Accordion.Trigger class="group flex w-full items-center justify-between rounded-t-sm py-4 text-left hover:underline">
                <span>I'm enabled!</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <p class="pb-4">
                Hey, I'm enabled! This is because I don't use the{' '}
                <strong>disabled</strong> prop on the trigger.
              </p>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item class="border-b">
            <Accordion.Header as="h3">
              <Accordion.Trigger class="group flex w-full items-center justify-between py-4 text-left hover:underline">
                <span>I'm enabled!</span>
                <span class="pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <p class="pb-4">
                Hey, I'm enabled! This is because I don't use the{' '}
                <strong>disabled</strong> prop on the trigger.
              </p>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item class="border-b">
            <h3>
              <Accordion.Trigger
                disabled
                class="group flex w-full items-center justify-between py-4 text-left hover:bg-accent/50 aria-disabled:cursor-not-allowed aria-expanded:rounded-none"
              >
                <span>
                  I'm{' '}
                  <span class="font-bold" style="color: red">
                    disabled!
                  </span>
                </span>
                <span class="flex pl-2">
                  <p class="scale-150 group-aria-expanded:rotate-45 group-aria-expanded:transform">
                    +
                  </p>
                </span>
              </Accordion.Trigger>
            </h3>
            <Accordion.Content>
              <p class="pb-4">You shouldn't be able to see this!</p>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    </>
  );
});
