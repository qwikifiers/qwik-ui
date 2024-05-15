import { component$, useStyles$, useSignal } from '@builder.io/qwik';
import { Collapsible } from '@qwik-ui/headless';
import { LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);
  const isCollapsibleRendered = useSignal(false);

  return (
    <>
      <button onClick$={() => (isCollapsibleRendered.value = true)}>
        Render Collapsible
      </button>
      {isCollapsibleRendered.value && (
        <Collapsible.Root class="collapsible">
          <Collapsible.Trigger class="collapsible-trigger">
            <span>Trigger</span>
            <LuChevronDown />
          </Collapsible.Trigger>
          <Collapsible.Content class="collapsible-content collapsible-content-outline ">
            Content
          </Collapsible.Content>
        </Collapsible.Root>
      )}
    </>
  );
});

// internal
import styles from '../snippets/collapsible.css?inline';
