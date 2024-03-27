import { component$ } from '@builder.io/qwik';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@qwik-ui/headless';

export default component$(() => (
  <Collapsible>
    <CollapsibleTrigger>Trigger</CollapsibleTrigger>
    <CollapsibleContent>Content</CollapsibleContent>
  </Collapsible>
));
