import { component$, useStyles$ } from '@builder.io/qwik';
import { Collapsible } from '@qwik-ui/headless';
import styles from '../snippets/collapsible.css?inline';
import SVG from './svg';

export default component$(() => {
  useStyles$(styles);

  return (
    <Collapsible.Root class="collapsible" disabled>
      <Collapsible.Trigger class="collapsible-trigger">
        <span>Trigger</span>
        <SVG />
      </Collapsible.Trigger>
      <Collapsible.Content class="collapsible-content collapsible-content-outline ">
        Content
      </Collapsible.Content>
    </Collapsible.Root>
  );
});
