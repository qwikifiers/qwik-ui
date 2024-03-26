import { component$ } from '@builder.io/qwik';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@qwik-ui/headless';
import './collapsible.css';
import SVG from './svg';

export default component$(() => {
  return (
    <Collapsible class="collapsible">
      <CollapsibleTrigger class="collapsible-trigger">
        <span>Trigger</span>
        <SVG class="collapsible-transition" />
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible-animation collapsible-content">
        Content
      </CollapsibleContent>
    </Collapsible>
  );
});
