import { component$ } from '@qwik.dev/core';
import { Collapsible } from '@qwik-ui/headless';

export default component$(() => (
  <Collapsible.Root>
    <Collapsible.Trigger>Button</Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible.Root>
));
