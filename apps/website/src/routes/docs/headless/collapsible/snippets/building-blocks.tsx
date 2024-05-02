import { component$ } from '@builder.io/qwik';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@qwik-ui/headless';

export default component$(() => (
  <Collapsible>
    <Collapsible.Trigger>Button</Collapsible.Trigger>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible>
));
