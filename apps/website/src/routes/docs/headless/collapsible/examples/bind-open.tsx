import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Collapsible } from '@qwik-ui/headless';
import styles from '../snippets/collapsible.css?inline';

export default component$(() => {
  useStyles$(styles);
  const isOpen = useSignal<boolean>(false);

  return (
    <>
      <p>
        is open: <strong>{isOpen.value ? 'true' : 'false'}</strong>
      </p>

      <Collapsible.Root class="collapsible" bind:open={isOpen}>
        <Collapsible.Trigger class="collapsible-trigger">Trigger</Collapsible.Trigger>
        <Collapsible.Content class="collapsible-content">
          <p class="collapsible-content-outline">Content</p>
        </Collapsible.Content>
      </Collapsible.Root>
    </>
  );
});
