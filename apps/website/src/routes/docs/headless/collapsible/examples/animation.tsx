import { component$, useStyles$ } from '@builder.io/qwik';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@qwik-ui/headless';
import styles from '../snippets/collapsible.css?inline';
import SVG from './svg';

export default component$(() => {
  useStyles$(styles);

  return (
    <Collapsible class="collapsible">
      <CollapsibleTrigger class="collapsible-trigger">
        <span>Trigger</span>
        <SVG class="collapsible-transition" />
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible-animation collapsible-content">
        <p class="collapsible-content-outline">Content</p>
      </CollapsibleContent>
    </Collapsible>
  );
});
