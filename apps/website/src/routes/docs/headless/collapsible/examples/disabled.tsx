import { component$, useStyles$ } from '@qwik.dev/core';
import { Collapsible } from '@qwik-ui/headless';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);

  return (
    <Collapsible.Root class="collapsible" disabled>
      <Collapsible.Trigger class="collapsible-trigger">
        <span>Trigger</span>
        <LuChevronDown />
      </Collapsible.Trigger>
      <Collapsible.Content class="collapsible-content collapsible-content-outline ">
        Content
      </Collapsible.Content>
    </Collapsible.Root>
  );
});

// internal
import styles from '../snippets/collapsible.css?inline';
