import { component$, useStyles$ } from '@builder.io/qwik';
import { Collapsible } from '@qwik-ui/headless';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);

  return (
    <Collapsible.Root class="collapsible">
      <Collapsible.Trigger class="collapsible-trigger">
        <span>Trigger</span>
        <LuChevronDown class="collapsible-transition" />
      </Collapsible.Trigger>
      <Collapsible.Content class="collapsible-animation collapsible-content">
        <p class="collapsible-content-outline">Content</p>
      </Collapsible.Content>
    </Collapsible.Root>
  );
});

// internal
import styles from '../snippets/collapsible.css?inline';
