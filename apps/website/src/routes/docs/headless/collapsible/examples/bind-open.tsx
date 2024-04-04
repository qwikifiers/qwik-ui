import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@qwik-ui/headless';
import styles from '../snippets/collapsible.css?inline';

export default component$(() => {
  useStyles$(styles);
  const isOpen = useSignal<boolean>(false);

  return (
    <>
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
