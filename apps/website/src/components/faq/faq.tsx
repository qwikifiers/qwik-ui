import { component$ } from '@qwik.dev/core';
import { Accordion } from '@qwik-ui/styled';

export const FAQ = component$(() => {
  return (
    <Accordion.Root>
      <Accordion.Item>
        <Accordion.Trigger class="text-left">
          What kind of support or resources are available if I encounter issues with Qwik
          UI?
        </Accordion.Trigger>
        <Accordion.Content>
          If you stumble into any problems, please{' '}
          <a
            class="font-semibold underline underline-offset-4 hover:opacity-90"
            href="https://github.com/qwikifiers/qwik-ui/issues"
          >
            create an issue
          </a>{' '}
          on the Qwik UI repository. We also have a{' '}
          <a
            class="font-semibold underline underline-offset-4 hover:opacity-90"
            href="https://discord.gg/PVWUUejrez"
          >
            Discord community
          </a>{' '}
          where you can raise any concerns, propose ideas, or chat all things Qwik UI 😊
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Trigger class="text-left">
          How can I contribute to the project?
        </Accordion.Trigger>
        <Accordion.Content>
          We provide a{' '}
          <a
            class="font-semibold underline underline-offset-4 hover:opacity-90"
            href="../../../contributing"
          >
            contributing guide
          </a>{' '}
          guide to help get familiar with the repository. Additionally, we offer a quick
          start{' '}
          <a
            class="font-semibold underline underline-offset-4 hover:opacity-90"
            href="https://github.com/qwikifiers/qwik-ui/blob/main/CONTRIBUTING.md"
          >
            setup guide
          </a>{' '}
          and a section dedicated to advanced resources below the Components navigation.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Trigger class="text-left">
          How can I migrate my existing application to use Qwik UI from another framework?
        </Accordion.Trigger>
        <Accordion.Content>
          We recommend gradually adding Qwik UI components to your app. Qwik's
          microfrontend architecture allows for seamless integration, reducing migration
          risks and complexity.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
});
