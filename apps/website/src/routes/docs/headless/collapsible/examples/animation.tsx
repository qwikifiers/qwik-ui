import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Collapsible } from '@qwik-ui/headless';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);
  const isOpen = useSignal(true);

  return (
    <div>
      <Collapsible.Root class="collapsible" bind:open={isOpen} animated>
        <Collapsible.Trigger class="collapsible-trigger">
          <span>Trigger</span>
          <LuChevronDown class="collapsible-transition" />
        </Collapsible.Trigger>
        <Collapsible.Content class="collapsible-animation collapsible-content">
          <p class="collapsible-content-outline">Content</p>
        </Collapsible.Content>
      </Collapsible.Root>
      <button onClick$={() => (isOpen.value = !isOpen.value)}>Toggle Animation</button>
    </div>
  );
});

// internal
import styles from '../snippets/collapsible.css?inline';
