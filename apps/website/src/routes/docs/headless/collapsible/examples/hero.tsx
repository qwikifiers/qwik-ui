import { component$, useStyles$ } from '@builder.io/qwik';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@qwik-ui/headless';
import styles from './collapsible.css?inline';
import SVG from './svg';

export default component$(() => {
  useStyles$(styles);

  return (
    <Collapsible class="collapsible">
      <CollapsibleTrigger class="collapsible-trigger">
        <span>Trigger</span>
        <SVG />
      </CollapsibleTrigger>
      <CollapsibleContent class="collapsible-content collapsible-content-outline ">
        Content
      </CollapsibleContent>
    </Collapsible>
  );
});
