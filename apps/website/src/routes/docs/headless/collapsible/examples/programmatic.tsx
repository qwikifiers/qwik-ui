import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@qwik-ui/headless';
import styles from '../snippets/collapsible.css?inline';

export default component$(() => {
  useStyles$(styles);
  const isOpen = useSignal<boolean>(true);

  return (
    <>
      <input
        style={{ width: '20px', height: '20px', accentColor: 'hsl(var(--primary))' }}
        type="checkbox"
        bind:checked={isOpen}
      />

      <p>
        is open: <strong>{isOpen.value ? 'true' : 'false'}</strong>
      </p>

      <Collapsible class="collapsible" bind:open={isOpen}>
        <CollapsibleTrigger class="collapsible-trigger">Trigger</CollapsibleTrigger>
        <CollapsibleContent class="collapsible-content">
          <p class="collapsible-content-outline">Content</p>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
});
