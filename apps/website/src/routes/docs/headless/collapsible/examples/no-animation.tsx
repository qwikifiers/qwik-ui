import { component$ } from '@builder.io/qwik';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@qwik-ui/headless';
import './collapsible.css';

export default component$(() => {
  return (
    <div>
      <Collapsible>
        <CollapsibleTrigger>Without animation</CollapsibleTrigger>
        <CollapsibleContent>I am the content 2!</CollapsibleContent>
      </Collapsible>
    </div>
  );
});
